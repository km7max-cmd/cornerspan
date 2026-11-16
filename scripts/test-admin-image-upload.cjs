// Isolated route-level tests: never connects to a real Worker, R2 or Production D1.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
if(!globalThis.crypto) globalThis.crypto=require('node:crypto').webcrypto;
const root=path.resolve(__dirname,'..');
const memory=new Map();
let canLogin=false, boundR2=null;
let environment={};
function load(filename){
  const full=path.join(root,filename);
  const code=ts.transpileModule(fs.readFileSync(full,'utf8'),{
    compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}
  }).outputText;
  const module={exports:{}};
  const req=id=>{
    if(id==='next/server')return {NextResponse:{json:(data,options)=>Response.json(data,options)}};
    if(id==='@opennextjs/cloudflare')return {getCloudflareContext:()=>({env:environment})};
    if(id.endsWith('/lib/admin-auth'))return {hasAdminAccess:async()=>canLogin};
    if(id.endsWith('/lib/cms-upload'))return helpers;
    if(id.endsWith('/lib/cms-media-bucket'))return bucket;
    throw Error('Unexpected dependency '+id+' in '+filename);
  };
  new Function('require','module','exports',code)(req,module,module.exports);
  return module.exports;
}
const helpers=load('lib/cms-upload.ts');
const bucket=load('lib/cms-media-bucket.ts');
const upload=load('app/api/admin/media/upload/route.ts');
const publicImages=load('app/cms-images/[filename]/route.ts');
const url='https://www.cornerspan.com/api/admin/media/upload';
function request(data,opts={}){
  const headers=new Headers({'Content-Type':opts.mime||'image/png'});
  if(opts.origin!==false)headers.set('Origin',opts.origin||'https://www.cornerspan.com');
  if(opts.length)headers.set('Content-Length',opts.length);
  const req=new Request(url,{method:'POST',headers,body:data});
  Object.defineProperty(req,'nextUrl',{value:new URL(url)});
  return req;
}
const png=Uint8Array.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0,0,0,0x0d,0x49,0x48,0x44,0x52,0,0,0,1,0,0,0,1]);
const jpg=Uint8Array.from([0xff,0xd8,0xff,0xe0,0x00,0x10,0x4a,0x46,0x49,0x46,0,0,0,0]);
const webp=Uint8Array.from([0x52,0x49,0x46,0x46,0x0e,0,0,0,0x57,0x45,0x42,0x50,0x56,0x50,0x38,0x20]);
(async()=>{
  assert.deepEqual(helpers.detectImage(png,'image/png'),{mime:'image/png',extension:'png'});
  assert.deepEqual(helpers.detectImage(jpg,'image/jpeg'),{mime:'image/jpeg',extension:'jpg'});
  assert.deepEqual(helpers.detectImage(webp,'image/webp'),{mime:'image/webp',extension:'webp'});
  assert.equal(helpers.detectImage(png,'image/jpeg'),null,'MIME spoof blocked');
  assert.equal(helpers.detectImage(Uint8Array.from(Buffer.from('<svg onload=alert(1)>')),'image/png'),null,'SVG rejected');
  assert.equal(helpers.detectImage(new Uint8Array(helpers.MAX_IMAGE_BYTES+1),'image/png'),null,'oversized image rejected');
  assert.equal(helpers.isUploadedImageName('../bad.png'),false);
  assert.equal(helpers.isUploadedImageName('foo.svg'),false);
  assert.equal(bucket.mediaBucket(),null,'Missing binding remains unavailable');
  assert.equal((await upload.GET()).status,401,'Anonymous capability check blocked');
  assert.equal((await upload.POST(request(png))).status,401,'Anonymous upload blocked');
  canLogin=true;
  assert.equal((await upload.GET()).status,200);
  assert.equal((await upload.GET()).then,undefined);
  assert.equal((await (await upload.GET()).json()).uploadAvailable,false);
  assert.equal((await upload.POST(request(png))).status,503,'Missing bucket fails closed');
  environment.CMS_MEDIA_BUCKET={};
  assert.equal(bucket.mediaBucket(),null,'Wrong binding type fails closed');
  environment.CMS_MEDIA_BUCKET=boundR2={
    async put(key,bytes,options){memory.set(key,{bytes,contentType:options.httpMetadata.contentType});},
    async get(key){
      const item=memory.get(key);
      if(!item)return null;
      return {body:new ReadableStream({start(controller){controller.enqueue(item.bytes);controller.close();}}),size:item.bytes.byteLength,httpMetadata:{contentType:item.contentType}};
    }
  };
  assert.equal((await (await upload.GET()).json()).uploadAvailable,true);
  assert.equal((await upload.POST(request(png,{origin:'https://evil.example'}))).status,403,'Cross-site origin forbidden');
  assert.equal((await upload.POST(request(png,{origin:false}))).status,403,'Absent Origin forbidden');
  assert.equal((await upload.POST(request(png,{mime:'image/svg+xml'}))).status,415,'SVG content type forbidden');
  assert.equal((await upload.POST(request(png,{mime:'image/jpeg'}))).status,415,'MIME mismatch forbidden');
  assert.equal((await upload.POST(request(png,{length:String(helpers.MAX_IMAGE_BYTES+1)}))).status,413,'Content-Length enforced');
  assert.equal((await upload.POST(request(new Uint8Array(helpers.MAX_IMAGE_BYTES+1)))).status,413,'Streaming cap enforced');
  const invalidSvg = await upload.POST(request(Uint8Array.from(Buffer.from('<svg><script/></svg>'))));
  assert.equal(invalidSvg.status,415,'Magic header enforced');
  const saved=await upload.POST(request(png));
  assert.equal(saved.status,201);
  const data=await saved.json();
  assert.ok(/^\/cms-images\/[0-9a-f-]{36}\.png$/.test(data.url));
  assert.ok(helpers.isUploadedImageName(data.url.split('/').pop()));
  assert.equal(data.size,png.byteLength);
  assert.equal(memory.size,1,'One object only stored after valid upload');
  assert.ok(memory.has('cms/'+data.url.split('/').pop()));
  const served=await publicImages.GET(new Request('https://www.cornerspan.com'+data.url),{params:Promise.resolve({filename:data.url.split('/').pop()})});
  assert.equal(served.status,200,'Uploaded image publicly readable for published articles');
  assert.equal(served.headers.get('content-type'),'image/png');
  assert.equal(served.headers.get('x-content-type-options'),'nosniff');
  assert.deepEqual(new Uint8Array(await served.arrayBuffer()),png);
  assert.equal((await publicImages.GET(null,{params:Promise.resolve({filename:'../wrong.png'})})).status,404);
  assert.equal((await publicImages.GET(null,{params:Promise.resolve({filename:'00000000-0000-0000-0000-000000000000.jpg'})})).status,404);
  environment.CMS_MEDIA_BUCKET=undefined;
  assert.equal((await publicImages.GET(null,{params:Promise.resolve({filename:data.url.split('/').pop()})})).status,503,'Bucket unavailable fails safely');
  const config=JSON.parse(fs.readFileSync(path.join(root,'wrangler.jsonc'),'utf8'));
  const prod=config.r2_buckets.find(x=>x.binding==='CMS_MEDIA_BUCKET');
  const preview=config.previews?.r2_buckets?.find(x=>x.binding==='CMS_MEDIA_BUCKET');
  assert.equal(prod?.bucket_name,'cornerspan-cms-media','Production media bucket must be pinned');
  assert.equal(preview?.bucket_name,'cornerspan-cms-media-preview','Preview media bucket must be isolated');
  assert.notEqual(prod.bucket_name,preview.bucket_name,'Preview may not write to Production R2');
  assert.equal(config.d1_databases?.find(x=>x.binding==='ADMIN_DB')?.database_name,'cornerspan-admin');
  assert.equal(config.previews.d1_databases?.find(x=>x.binding==='ADMIN_DB')?.database_name,'cornerspan-admin-preview');
  const ui=fs.readFileSync(path.join(root,'app/admin/media-manager.tsx'),'utf8');
  assert.match(ui,/type="file"/);
  assert.match(ui,/\/api\/admin\/media\/upload/);
  console.log('PASS isolated R2 image magic/type/size checks, session auth, CSRF, missing storage, upload and public serving.');
})().catch(error=>{console.error(error);process.exitCode=1;});
