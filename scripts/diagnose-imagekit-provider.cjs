// One-shot, owner-run ImageKit provider diagnostic. No Cloudflare/Worker/Preview writes.
// Private key is read from stdin; never printed, recorded, stored, or sent to GitHub.
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const zlib=require('node:zlib');
const {stdin,stdout}=process;
const BASE='https://api.imagekit.io/v1/files?limit=1';
const UPLOAD='https://upload.imagekit.io/api/v1/files/upload';
const P=String.raw;
function classify(status,message){
 const m=String(message||'').toLowerCase();
 if(status===401)return 'authentication-key-rejected';
 if(status===403)return /limit|quota|storage|space/.test(m)?'free-storage-limit-or-access':'permission-or-account-restriction';
 if(status===429)return 'rate-limit-reached';
 if(status===400||status===422){
   if(/auth|token|signature|public key/.test(m))return 'upload-auth-method';
   if(/file|image|content|format|mime|type|size/.test(m))return 'file-or-image-validation';
   if(/folder|path|name/.test(m))return 'folder-or-filename-validation';
   return 'upload-parameters-invalid';
 }
 if(status>=500)return 'provider-server-or-edge-error';
 return 'unknown-response';
}
async function providerMessage(response){
 try{
  if(!(response.headers.get('content-type')||'').includes('json'))return '';
  const j=await response.json();
  return typeof j.message==='string'?j.message:typeof j.error==='string'?j.error:'';
 }catch{return ''}
}
function chunk(type,payload){
 const len=Buffer.alloc(4);len.writeUInt32BE(payload.length);
 const data=Buffer.concat([Buffer.from(type),payload]);
 let crc=0xffffffff;
 for(const b of data){crc^=b;for(let k=0;k<8;k++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}
 const footer=Buffer.alloc(4);footer.writeUInt32BE((crc^0xffffffff)>>>0);
 return Buffer.concat([len,data,footer]);
}
function makePng(){
 const width=64,height=64;
 const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(width,0);ihdr.writeUInt32BE(height,4);ihdr[8]=8;ihdr[9]=2;
 const rows=[];
 for(let y=0;y<height;y++){
  const row=Buffer.alloc(width*3+1);row[0]=0;
  for(let x=0;x<width;x++){const p=1+x*3;row[p]=(x*4)%256;row[p+1]=(y*4)%256;row[p+2]=90;}
  rows.push(row);
 }
 return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',zlib.deflateSync(Buffer.concat(rows))),chunk('IEND',Buffer.alloc(0))]);
}
function safeUrlInfo(raw,filename){
 try{
  const u=new URL(raw);
  const hostOk=u.protocol==='https:'&&u.hostname==='ik.imagekit.io'&&!u.username&&!u.password&&!u.hash;
  const pathOk=u.pathname.endsWith('/cornerspan/'+filename);
  const keys=[...u.searchParams.keys()];
  const queryOk=keys.length===0||(keys.length===1&&keys[0]==='updatedAt'&&/^[0-9]{10,17}$/.test(u.searchParams.get('updatedAt')||''));
  return {hostOk,pathOk,queryOk,url:hostOk&&pathOk&&queryOk?u.toString():null};
 }catch{return {hostOk:false,pathOk:false,queryOk:false,url:null};}
}
async function main(){
 let key='';
 for await(const c of stdin){key+=c.toString('utf8');if(key.length>4096)throw Error('Key input too large');}
 key=key.trim();
 if(!key.startsWith('private_')||key.length<12||key.length>512||key.includes(':')||!/^[\x21-\x7e]+$/.test(key)){
  console.log('STOP: Wrong/masked key format. Copy the Private API Key only. No requests made.');return;
 }
 const auth='Basic '+Buffer.from(key+':').toString('base64');key='';
 const requestOpts={signal:AbortSignal.timeout(25000),redirect:'error'};
 const account=await fetch(BASE,{...requestOpts,headers:{Authorization:auth}});
 console.log('ImageKit read-only account authentication HTTP',account.status);
 if(account.status!==200){
  console.log('DIAG:',classify(account.status,await providerMessage(account)),'— no upload attempted.');
  return;
 }
 console.log('PASS ImageKit Private API Key authenticates for file listing.');
 const filename=crypto.randomUUID()+'.png';
 const file=makePng();
 console.log('Uploading exactly one valid 64x64 PNG fixture to ImageKit /cornerspan (no CornerSpan site changes).');
 const form=new FormData();
 const buf=new ArrayBuffer(file.byteLength);new Uint8Array(buf).set(file);
 form.append('file',new Blob([buf],{type:'image/png'}),filename);
 form.append('fileName',filename);
 form.append('folder','/cornerspan');
 form.append('useUniqueFileName','false');
 const response=await fetch(UPLOAD,{...requestOpts,method:'POST',headers:{Authorization:auth},body:form});
 console.log('ImageKit direct upload HTTP',response.status);
 if(![200,201].includes(response.status)){
  console.log('DIAG:',classify(response.status,await providerMessage(response)),'— ImageKit rejected upload.');
  return;
 }
 let result;
 try{result=await response.json();}catch{console.log('DIAG: Provider returned non-JSON upload success.');return;}
 const details=safeUrlInfo(result.url,filename);
 const pathMatches=result.filePath===undefined||result.filePath==='/cornerspan/'+filename;
 console.log('ImageKit response check: trusted CDN host',details.hostOk,'expected folder/filename',details.pathOk,'allowed query',details.queryOk,'filePath matches',pathMatches);
 if(!details.url||!pathMatches){
  console.log('DIAG: Upload succeeded but CornerSpan strict CDN response validation rejected the returned URL. No API key or full URL printed.');
  return;
 }
 const cdn=await fetch(details.url,{signal:AbortSignal.timeout(25000),redirect:'error'});
 console.log('ImageKit CDN GET HTTP',cdn.status,'image media type',(cdn.headers.get('content-type')||'').startsWith('image/'));
 if(cdn.ok) console.log('PASS: Account, upload, CDN and CornerSpan response validation. Remaining failure is in Worker runtime/transport.');
 console.log('A single diagnostic image now exists in ImageKit /cornerspan; it may be deleted from the Media Library after validation.');
}
main().catch(e=>{console.log('STOP: Network diagnostic failed:',e?.name||'Unknown');process.exitCode=1;});
