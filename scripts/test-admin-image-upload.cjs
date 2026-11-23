// Isolated route-level tests: never connects to a real Worker, R2 or Production D1.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
if(!globalThis.crypto) globalThis.crypto=require('node:crypto').webcrypto;
const root=path.resolve(__dirname,'..');
const memory=new Map();
let canLogin=false, boundR2=null, d1Enabled=false, ikEnabled=false;
const imageKitCalls=[];
const imagekit={
  imageKitAvailable(){ return ikEnabled; },
  async uploadImageKit(bytes,mime,filename){
    imageKitCalls.push({length:bytes.byteLength,mime,filename});
    return 'https://ik.imagekit.io/cornerspan/cornerspan/'+filename;
  },
};
const d1Objects=new Map();
const d1Images={
  MAX_D1_IMAGE_BYTES:350*1024,
  async d1ImagesReady(){return d1Enabled;},
  async saveImageToD1(filename,bytes,mime){if(!d1Enabled||bytes.byteLength>350*1024)return false;d1Objects.set(filename,{filename,mime_type:mime,data_base64:Buffer.from(bytes).toString('base64'),byte_length:bytes.byteLength});return true;},
  async readImageFromD1(filename){return d1Objects.get(filename)||null;},
};
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
    if(id.endsWith('/lib/cms-d1-images'))return d1Images;
    if(id.endsWith('/lib/cms-imagekit'))return imagekit;
    if(id.endsWith('/lib/cms-branded-image'))return branded;
    throw Error('Unexpected dependency '+id+' in '+filename);
  };
  new Function('require','module','exports',code)(req,module,module.exports);
  return module.exports;
}
const helpers=load('lib/cms-upload.ts');
const branded=load('lib/cms-branded-image.ts');
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
  assert.equal((await upload.POST(request(png))).status,503,'Missing bucket and D1 migration fail closed');
  d1Enabled=true;
  assert.equal((await (await upload.GET()).json()).uploadAvailable,true,'D1 should enable direct uploads');
  const storedInD1=await upload.POST(request(png));
  assert.equal(storedInD1.status,201,'D1 image write should work with no R2 bucket');
  const storedD1Info=await storedInD1.json();
  const filename=storedD1Info.url.split('/').pop();
  assert.equal(d1Objects.size,1);
  const fromD1=await publicImages.GET(new Request('https://www.cornerspan.com'+storedD1Info.url),{params:Promise.resolve({filename})});
  assert.equal(fromD1.status,200,'Small public image readable from D1');
  assert.equal(fromD1.headers.get('content-type'),'image/png');
  assert.deepEqual(new Uint8Array(await fromD1.arrayBuffer()),png);
  assert.equal((await upload.POST(request(new Uint8Array(d1Images.MAX_D1_IMAGE_BYTES+1)))).status,413,'D1 media size limit enforced');
  d1Enabled=false;
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
  assert.equal((await publicImages.GET(null,{params:Promise.resolve({filename:data.url.split('/').pop()})})).status,404,'No image exists in D1 for this filename');
  ikEnabled=true;
  const ikCapability=await (await upload.GET()).json();
  assert.equal(ikCapability.uploadAvailable,true,'ImageKit should enable large image uploads');
  assert.equal(ikCapability.provider,'imagekit');
  assert.equal(ikCapability.maxBytes,helpers.MAX_IMAGE_BYTES);
  const ikSaved=await upload.POST(request(png));
  assert.equal(ikSaved.status,201,'ImageKit upload must work with only private backend key');
  const ikResult=await ikSaved.json();
  assert.match(ikResult.url,/^https:\/\/www\.cornerspan\.com\/media\/images\/[0-9a-f-]{36}\.png$/);
  assert.equal(imageKitCalls.length,1);
  assert.equal(imageKitCalls[0].mime,'image/png');
  assert.equal(d1Objects.size,1,'ImageKit path must not touch D1 image records');
  ikEnabled=false;
  const config=JSON.parse(fs.readFileSync(path.join(root,'wrangler.jsonc'),'utf8'));
  assert.equal(config.r2_buckets,undefined,'Do not require paid R2 activation');
  assert.equal(config.previews.r2_buckets,undefined,'Preview must not require R2 activation');
  assert.equal(config.d1_databases?.find(x=>x.binding==='ADMIN_DB')?.database_name,'cornerspan-admin');
  assert.equal(config.previews.d1_databases?.find(x=>x.binding==='ADMIN_DB')?.database_name,'cornerspan-admin-preview');
  assert.notEqual(config.d1_databases[0].database_id,config.previews.d1_databases[0].database_id,'Preview and Production D1 must remain isolated');
  const ui=fs.readFileSync(path.join(root,'app/admin/media-manager.tsx'),'utf8');
  assert.match(ui,/type="file"/);
  assert.match(ui,/\/api\/admin\/media\/upload/);
  console.log('PASS ImageKit free-plan upload priority; isolated R2/D1 signatures, D1 limit, auth, CSRF, serving.');
})().catch(error=>{console.error(error);process.exitCode=1;});
