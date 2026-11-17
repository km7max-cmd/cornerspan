// Security-focused isolated ImageKit Forever Free adapter tests. NO network or account API calls.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const path = require('node:path');
const { webcrypto } = require('node:crypto');
const source = fs.readFileSync(path.join(__dirname,'../lib/cms-imagekit.ts'),'utf8');
const code = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
let secret='private_abcDEF1234567890';
let simulated={url:'https://ik.imagekit.io/cornerspan-test/cornerspan/FILENAME',filePath:'/cornerspan/FILENAME'};
let status=200, requests=0;
const uploadFetch=async (url,opts)=>{
  requests++;
  assert.equal(url,'https://upload.imagekit.io/api/v1/files/upload');
  assert.equal(opts.method,'POST');
  assert.equal(opts.redirect,'error');
  assert.equal(opts.headers.Authorization,'Basic '+Buffer.from(secret+':').toString('base64'));
  assert.equal(opts.body.get('folder'),'/cornerspan');
  assert.equal(opts.body.get('useUniqueFileName'),'false');
  assert.ok(opts.body.get('file') instanceof Blob);
  assert.equal(opts.body.get('fileName'),opts.body.get('file').name);
  return Response.json(simulated,{status});
};
const moduleRef={exports:{}};
const req=id=>{
 if(id==='@opennextjs/cloudflare')return{getCloudflareContext:()=>({env:{IMAGEKIT_PRIVATE_KEY:secret}})};
 throw Error('Unexpected dependency '+id);
};
new Function('require','module','exports','fetch','btoa','Blob','FormData','AbortSignal',code)(
 req,moduleRef,moduleRef.exports,uploadFetch,btoa,Blob,FormData,AbortSignal,
);
const {isImageKitPrivateKey,imageKitKey,imageKitAvailable,uploadImageKit,IMAGEKIT_MAX_BYTES}=moduleRef.exports;
(async()=>{
 assert.equal(imageKitKey(),secret);
 assert.equal(imageKitAvailable(),true);
 assert.equal(isImageKitPrivateKey('private_abcdefgh+123/=='),true,'Private-key suffix alphabet should not be guessed');
 for(const invalid of ['', 'public_abcdefgh123', 'private_***', 'private_abc def0123', 'private_abc:def0123', 'private_abc\\ndef0123']) {
   assert.equal(isImageKitPrivateKey(invalid),false,'Reject unsafe/masked/nonprivate key');
 }
 const filename='f0ac6b1d-6e42-46f1-8c55-c4c98070bad0.webp';
 const bytes=Uint8Array.from([82,73,70,70,12,0,0,0,87,69,66,80,10]);
 simulated={url:'https://ik.imagekit.io/cornerspan-test/cornerspan/'+filename,filePath:'/cornerspan/'+filename};
 const good=await uploadImageKit(bytes,'image/webp',filename);
 assert.equal(good,simulated.url);
 assert.equal(requests,1);
 for(const bad of [
   {...simulated,url:'https://attacker.test/cornerspan/'+filename},
   {...simulated,url:'https://ik.imagekit.io.attacker.test/cornerspan/'+filename},
   {...simulated,url:'http://ik.imagekit.io/cornerspan/'+filename},
   {...simulated,url:simulated.url+'?bad=1'},
   {...simulated,filePath:'/different/'+filename},
   {...simulated,url:'https://ik.imagekit.io/cornerspan-test/other/'+filename},
 ]){
   simulated=bad;
   assert.equal(await uploadImageKit(bytes,'image/webp',filename),null,'Untrusted provider URL/file path must be refused');
 }
 status=429;
 assert.equal(await uploadImageKit(bytes,'image/webp',filename),null,'Free plan rate/usage cap must fail closed');
 status=401;
 assert.equal(await uploadImageKit(bytes,'image/webp',filename),null,'Invalid secret must fail closed');
 const before=requests;
 assert.equal(await uploadImageKit(bytes,'image/webp','../unsafe.webp'),null);
 assert.equal(await uploadImageKit(new Uint8Array(IMAGEKIT_MAX_BYTES+1),'image/png',filename),null);
 assert.equal(await uploadImageKit(bytes,'image/webp',filename,'bad-secret'),null);
 assert.equal(requests,before,'Unsafe/oversize input must never call ImageKit');
 secret='';
 assert.equal(imageKitKey(),null);
 assert.equal(imageKitAvailable(),false);
 console.log('PASS ImageKit Basic auth, upload multipart, private-only credential, CDN host/path, free quota failure, input validation.');
})().catch(e=>{console.error(e);process.exitCode=1});
