#!/usr/bin/env bash
# Preview-only HTTP 401 diagnostic; no secret changes, Production release, or D1 writes.
set -euo pipefail
umask 077
[[ -t 0 ]] || { echo 'STOP: Requires interactive terminal.' >&2; exit 1; }
read -r -s -p 'Current PREVIEW Admin password (hidden): ' PW
printf '\n'
[[ ${#PW} -ge 20 && ${#PW} -le 256 ]] || { echo 'STOP: Preview password must be 20-256 characters.' >&2; exit 1; }
CMS_PREVIEW_TEST_PASSWORD="$PW" node <<'NODE'
const origin='https://feature-posts-admin-dashboard-cornerspan.eenadutech.workers.dev';
const pwd=process.env.CMS_PREVIEW_TEST_PASSWORD;
delete process.env.CMS_PREVIEW_TEST_PASSWORD;
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScuYXwAAAABJRU5ErkJggg==','base64');
const req=async(path,opt={})=>fetch(origin+path,{cache:'no-store',redirect:'manual',signal:AbortSignal.timeout(30000),...opt});
async function describe(name,r){
 let msg='';
 try{if((r.headers.get('content-type')||'').includes('application/json')){
  const obj=await r.clone().json();
  const valid=['Unauthorized','Invalid request origin.','Use a JPG, PNG or WebP image.','File does not contain a supported image.','File content does not match a supported JPG, PNG or WebP image.','The free image host could not accept this photo. Check its monthly limits and account status.','Upload could not be read.'];
  if(valid.includes(obj.error))msg=obj.error;
 }}catch{}
 console.log(name,'HTTP',r.status,'type',String(r.headers.get('content-type')||'').split(';')[0],
 'challenge',r.headers.has('cf-mitigated')?'yes':'no',msg?'reason='+msg:'');
}
(async()=>{
 const login=await req('/api/admin/login',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({password:pwd})});
 console.log('Preview login HTTP',login.status);
 if(login.status!==200){console.log('STOP: Login failed. No guesses or retries.');return;}
 const cookie=(login.headers.get('set-cookie')||'').split(';')[0];
 if(!/^__Host-cornerspan_admin=[\w.-]+$/.test(cookie)){console.log('STOP: Signed session cookie missing.');return;}
 const h={Cookie:cookie,Origin:origin};
 const cap=await req('/api/admin/media/upload',{headers:h});
 console.log('Authenticated capability GET HTTP',cap.status);
 if(cap.status!==200){console.log('STOP: Authenticated capability check failed.');return;}
 const cfg=await cap.json();
 console.log('Provider ImageKit',cfg.provider==='imagekit','Upload enabled',cfg.uploadAvailable===true);
 if(cfg.provider!=='imagekit'||cfg.uploadAvailable!==true){console.log('STOP: ImageKit not active in Preview.');return;}
 const mime=await req('/api/admin/media/upload',{method:'POST',headers:{...h,'Content-Type':'text/plain'},body:png});
 await describe('POST unsupported MIME (no storage)',mime);
 if(mime.status!==415){console.log('STOP: POST rejected before MIME validation. No upload attempted.');return;}
 const fake=await req('/api/admin/media/upload',{method:'POST',headers:{...h,'Content-Type':'image/png'},body:Buffer.from([4,2,0,1,9,9,9,9,9,9,9,9])});
 await describe('POST invalid PNG (no storage)',fake);
 if(fake.status!==415){console.log('STOP: PNG request rejected before image signature validation.');return;}
 const uploaded=await req('/api/admin/media/upload',{method:'POST',headers:{...h,'Content-Type':'image/png'},body:png});
 await describe('POST real tiny PNG',uploaded);
 if(uploaded.status!==201){
  const again=await req('/api/admin/media/upload',{headers:h});
  console.log('Followup authenticated GET HTTP',again.status);
  if(uploaded.status===401&&again.status===200)console.log('DIAG: POST-only 401; check edge/Worker routing rather than password.');
  else if(uploaded.status===401)console.log('DIAG: Session or Preview secret may have changed.');
  else console.log('DIAG: Upload/backend failed; do not guess account credentials.');
  console.log('STOP: Do not deploy Production.');return;
 }
 const result=await uploaded.json();
 if(typeof result.url!=='string'||!result.url.startsWith('https://ik.imagekit.io/')){console.log('STOP: Unexpected image URL.');return;}
 const cdn=await fetch(result.url,{signal:AbortSignal.timeout(20000),redirect:'manual'});
 console.log('Preview image upload 201; ImageKit CDN HTTP',cdn.status);
 if(cdn.ok)console.log('PASS: Disposable Preview image is readable; no Production changes.');
 else console.log('STOP: Uploaded object was not yet readable from CDN; do not deploy.');
})().catch(e=>{console.log('STOP: Preview network failure type:',e?.name||'Unknown');process.exitCode=1});
NODE
unset PW
