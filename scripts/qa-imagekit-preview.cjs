// Owner-run real upload acceptance against ONLY the isolated feature Preview.
// Requires secure Preview password in process environment. Never writes Production D1.
const assert=require('node:assert/strict');
const { randomUUID }=require('node:crypto');
const origin='https://feature-posts-admin-dashboard-cornerspan.eenadutech.workers.dev';
const previewUrl=process.env.CMS_PREVIEW_URL;
const pwd=process.env.CMS_PREVIEW_TEST_PASSWORD;
assert.equal(previewUrl,origin,'Exact feature Preview hostname required.');
assert.ok(typeof pwd==='string'&&pwd.length>=20,'Enter your private Preview password in terminal only.');
delete process.env.CMS_PREVIEW_TEST_PASSWORD;
const fetchTimeout=(url,opts={})=>fetch(url,{redirect:'manual',signal:AbortSignal.timeout(30000),...opts});
(async()=>{
  const notAuthorized=await fetchTimeout(origin+'/api/admin/media/upload');
  assert.equal(notAuthorized.status,401,'Anonymous capability lookup must be blocked.');
  const login=await fetchTimeout(origin+'/api/admin/login',{
    method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},
    body:JSON.stringify({password:pwd}),
  });
  assert.equal(login.status,200,'Preview login rejected; do not retry with guesses.');
  const cookie=(login.headers.get('set-cookie')||'').split(';')[0];
  assert.ok(cookie.startsWith('__Host-cornerspan_admin='),'Expected secure signed admin cookie.');
  const headers={Cookie:cookie,Origin:origin};
  const capacity=await fetchTimeout(origin+'/api/admin/media/upload',{headers});
  assert.equal(capacity.status,200);
  const capability=await capacity.json();
  assert.equal(capability.provider,'imagekit','Preview must use free ImageKit, not a D1/R2 fallback.');
  assert.equal(capability.uploadAvailable,true);
  assert.equal(capability.maxBytes,5*1024*1024);
  const badOrigin=await fetchTimeout(origin+'/api/admin/media/upload',{
    method:'POST',headers:{...headers,Origin:'https://evil.example','Content-Type':'image/png'},body:new Uint8Array([1,2,3,4]),
  });
  assert.equal(badOrigin.status,403,'CSRF protection must reject cross-origin uploads.');
  // 1x1 PNG fixture, only a few bytes; the test uses a random object name.
  const image=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScuYXwAAAABJRU5ErkJggg==','base64');
  const upload=await fetchTimeout(origin+'/api/admin/media/upload',{
    method:'POST',headers:{...headers,'Content-Type':'image/png'},
    body:image,
  });
  assert.equal(upload.status,201,'Preview image host upload must return HTTP 201. Actual: '+upload.status);
  const result=await upload.json();
  const url=new URL(result.url);
  assert.equal(url.protocol,'https:');
  assert.equal(url.origin,origin,'Image links must use the Preview site domain.');
  assert.match(url.pathname,/^\/media\/images\/[0-9a-f-]{36}\.png$/);
  let visible=false;
  for(let i=0;i<4;i++){
    try{
      const fetched=await fetchTimeout(result.url,{headers:{Accept:'image/png'}});
      if(fetched.ok&&(fetched.headers.get('content-type')||'').startsWith('image/')){
        const bytes=await fetched.arrayBuffer();
        if(bytes.byteLength>=12){visible=true;break;}
      }
    }catch{}
    if(i<3)await new Promise(resolve=>setTimeout(resolve,1500));
  }
  assert.ok(visible,'CornerSpan public image URL did not deliver the new ImageKit photo.');
  const admin=await fetchTimeout(origin+'/admin',{headers});
  assert.equal(admin.status,200,'Preview Admin page must be available after upload.');
  console.log('PASS authenticated ImageKit FREE Preview upload + CornerSpan-domain image GET + CSRF + private capability.');
  console.log('One tiny disposable test asset was stored under /cornerspan/ in ImageKit; it can be removed from the ImageKit Media Library.');
  console.log('NO Production Worker deployment, existing post modification, or Production D1 writes.');
})().catch(e=>{console.error('STOP Preview upload QA: '+e.message);process.exitCode=1;});
