// Own-domain public images: pure mapping + read-only URL-restricted proxy tests.
// No network calls, no Cloudflare, no credentials, no D1 write operations.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
const root=path.join(__dirname,'..');
function transpile(p){return ts.transpileModule(fs.readFileSync(path.join(root,p),'utf8'),{
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}
}).outputText;}
const helper={exports:{}};
new Function('module','exports',transpile('lib/cms-branded-image.ts'))(helper,helper.exports);
const {imageKitBrandedUrl,imageKitUpstreamUrl}=helper.exports;
const name='f0ac6b1d-6e42-46f1-8c55-c4c98070bad0.webp';
const direct='https://ik.imagekit.io/cornerspan/cornerspan/'+name;
const branded='https://www.cornerspan.com/media/images/'+name;
assert.equal(imageKitBrandedUrl(direct,'https://www.cornerspan.com'),branded);
assert.equal(imageKitBrandedUrl(direct,'https://sample-preview.workers.dev'),'https://sample-preview.workers.dev/media/images/'+name);
assert.equal(imageKitBrandedUrl(direct+'?updatedAt=1763791000000','https://www.cornerspan.com'),branded+'?updatedAt=1763791000000');
assert.equal(imageKitBrandedUrl('https://ik.imagekit.io/other/cornerspan/'+name,'https://www.cornerspan.com'),'https://ik.imagekit.io/other/cornerspan/'+name);
for(const evil of [
 'https://ik.imagekit.io.evil.test/cornerspan/cornerspan/'+name,
 'http://ik.imagekit.io/cornerspan/cornerspan/'+name,
 'https://ik.imagekit.io/cornerspan/cornerspan/../../../../../etc/passwd',
 'https://ik.imagekit.io/cornerspan/cornerspan/'+name+'?tr=w-900',
 'https://ik.imagekit.io/cornerspan/cornerspan/evil.svg',
 'https://ik.imagekit.io/cornerspan/cornerspan/'+name+'#unsafe',
 ])assert.equal(imageKitBrandedUrl(evil,'https://www.cornerspan.com'),evil,'Reject arbitrary source '+evil);
assert.equal(imageKitUpstreamUrl(name),direct);
assert.equal(imageKitUpstreamUrl(name,'updatedAt=1763791000000'),direct+'?updatedAt=1763791000000');
for(const bad of ['../secret.png','example.svg','00000000-0000-0000-0000-000000000000.png/else']){
 assert.equal(imageKitUpstreamUrl(bad),null);
}
assert.equal(imageKitUpstreamUrl(name,'tr=w-900'),null);
let status=200,type='image/webp',called=0,expected=direct,remoteBytes=Buffer.from('RIFF0000WEBPABC');
const upstreamFetch=async (url,options)=>{
 called++;
 assert.equal(url,expected);
 assert.equal(options.redirect,'manual');
 return new Response(remoteBytes,{status,headers:{'Content-Type':type,'Content-Length':String(remoteBytes.length)}});
};
const route={exports:{}};
new Function('require','module','exports','fetch',transpile('app/media/images/[filename]/route.ts'))(
  id=>{if(id.endsWith('/lib/cms-branded-image'))return helper.exports;throw Error(id)},
  route,route.exports,upstreamFetch);
const GET=route.exports.GET;
const req=(query='')=>new Request(branded+query);
(async()=>{
 let r=await GET(req(),{params:Promise.resolve({filename:name})});
 assert.equal(r.status,200);assert.equal(r.headers.get('Content-Type'),'image/webp');
 assert.equal(r.headers.get('X-Content-Type-Options'),'nosniff');
 assert.deepEqual(Buffer.from(await r.arrayBuffer()),remoteBytes);
 expected=direct+'?updatedAt=1763791000000';
 r=await GET(req('?updatedAt=1763791000000'),{params:Promise.resolve({filename:name})});
 assert.equal(r.status,200);
 const prev=called;
 r=await GET(req('?tr=w-999'),{params:Promise.resolve({filename:name})});
 assert.equal(r.status,404);
 r=await GET(req(),{params:Promise.resolve({filename:'bad.svg'})});
 assert.equal(r.status,404);
 assert.equal(called,prev,'Invalid requests must never reach ImageKit');
 expected=direct;status=302;
 r=await GET(req(),{params:Promise.resolve({filename:name})});
 assert.equal(r.status,502,'Do not follow upstream CDN redirects');
 status=200;type='text/html';
 r=await GET(req(),{params:Promise.resolve({filename:name})});
 assert.equal(r.status,502,'Reject non-image responses');
 type='image/webp';status=404;
 r=await GET(req(),{params:Promise.resolve({filename:name})});
 assert.equal(r.status,404);
 console.log('PASS branded CornerSpan media URL, safe ImageKit proxy, filename restrictions, cache headers, no redirects or arbitrary sources.');
})().catch(e=>{console.error(e);process.exitCode=1});
