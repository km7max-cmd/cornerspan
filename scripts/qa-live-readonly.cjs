// CornerSpan production HTTP / SEO / anonymous-security audit.
// Every request is GET. No credentials, cookies, logins, writes, uploads or deployments.
const assert=require('node:assert/strict');
const ORIGIN='https://www.cornerspan.com';
const failures=[];
const warnings=[];
const clean=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
function tags(html,tag){return [...html.matchAll(new RegExp('<'+tag+'(?:\\s|>)','gi'))].length;}
function attr(tag,key){const m=tag.match(new RegExp('(?:^|\\s)'+key+'\\s*=\\s*["\\x27]([^"\\x27]*)["\\x27]','i'));return m?.[1]??null;}
function meta(html,selectorKey,selectorValue){
 const tags=[...html.matchAll(/<meta\s[^>]*>/gi)].map(x=>x[0]);
 const tag=tags.find(t=>attr(t,selectorKey)?.toLowerCase()===selectorValue.toLowerCase());
 return tag?attr(tag,'content'):null;
}
function canonical(html){
 const tags=[...html.matchAll(/<link\s[^>]*>/gi)].map(x=>x[0]);
 return tags.find(t=>(attr(t,'rel')||'').toLowerCase().split(/\s+/).includes('canonical'))?.match(/href=["']([^"']*)["']/i)?.[1]??null;
}
async function get(path){
 const r=await fetch(ORIGIN+path,{method:'GET',redirect:'manual',cache:'no-store',signal:AbortSignal.timeout(22000),headers:{'User-Agent':'CornerSpan-ReadOnly-GitHub-LiveAudit/1.0'}});
 return {status:r.status,headers:r.headers,text:await r.text()};
}
async function check(){
 console.log('Live read-only audit:',ORIGIN);
 const siteMap=await get('/sitemap.xml');
 assert.equal(siteMap.status,200,'Sitemap HTTP status');
 const xml=siteMap.text;
 const locs=[...xml.matchAll(/<loc>(.*?)<\/loc>/gs)].map(m=>m[1].replace(/&amp;/g,'&'));
 const paths=[...new Set(locs.map(u=>{const url=new URL(u);assert.equal(url.hostname,'www.cornerspan.com','Sitemap host');return url.pathname;}))];
 assert.ok(paths.length>=40&&paths.length<=200,'Expected at least 40 sensible public sitemap URLs');
 console.log('Sitemap discovered:',paths.length,'URLs');
 let index=0;
 async function worker(){
  while(index<paths.length){
   const path=paths[index++];
   try{
    const page=await get(path);
    if(page.status!==200){failures.push(path+': HTTP '+page.status);continue;}
    const html=page.text;
    const title=clean((html.match(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/i)||[])[1]||'');
    const h1s=tags(html,'h1');
    const mains=tags(html,'main');
    const desc=meta(html,'name','description');
    const robots=meta(html,'name','robots')||'';
    const canon=canonical(html);
    if(!title||title.length<6) failures.push(path+': missing/short title');
    if(h1s!==1) failures.push(path+': H1 count '+h1s);
    if(mains!==1) warnings.push(path+': main landmarks '+mains);
    if(!desc||desc.length<40) warnings.push(path+': missing/short meta description');
    if(/\bnoindex\b/i.test(robots)) failures.push(path+': noindex appears in public sitemap URL');
    if(!canon)warnings.push(path+': missing canonical');
    else {
     try{const c=new URL(canon,ORIGIN);if(c.hostname!=='www.cornerspan.com'||c.pathname!==path)warnings.push(path+': canonical mismatch '+c.pathname);}
     catch{warnings.push(path+': invalid canonical URL');}
    }
    console.log('CHECK '+path+' HTTP '+page.status+' title '+title.length+' H1 '+h1s+' main '+mains);
   }catch(e){failures.push(path+': '+e.message);}
  }
 }
 await Promise.all(Array.from({length:4},()=>worker()));
 // Owner-only Admin: no credentials and never submit any passwords.
 for(const path of ['/admin','/admin/preview/audit-never-written']){
  try{
   const r=await get(path);
   const location=r.headers.get('location')||'';
   if(![301,302,303,307,308].includes(r.status)||!location.includes('/admin/login'))failures.push(path+': expected login redirect, got '+r.status);
   console.log('ADMIN '+path+' HTTP '+r.status+' login redirect '+location.includes('/admin/login'));
  }catch(e){failures.push('ADMIN '+path+': '+e.message);}
 }
 try{
  const l=await get('/admin/login');
  const robots=meta(l.text,'name','robots')||'';
  if(l.status!==200||tags(l.text,'h1')!==1||!/noindex/i.test(robots))failures.push('/admin/login missing 200, one H1 or noindex');
  console.log('ADMIN /admin/login HTTP '+l.status+', one H1 '+(tags(l.text,'h1')===1)+', noindex '+/noindex/i.test(robots));
 }catch(e){failures.push('ADMIN login: '+e.message);}
 for(const path of ['/api/admin/drafts','/api/admin/publish','/api/admin/media']){
  try{
   const r=await get(path);
   if(r.status!==401)failures.push(path+': anonymous read expected HTTP 401, received '+r.status);
   console.log('API '+path+' anonymous GET '+r.status);
  }catch(e){failures.push('API '+path+': '+e.message);}
 }
 try{const robots=await get('/robots.txt');if(robots.status!==200)failures.push('robots.txt HTTP '+robots.status);else console.log('ROBOTS HTTP 200');}catch(e){warnings.push('robots.txt '+e.message);}
 const fixed=['/','/about','/contact','/privacy','/terms','/disclaimer','/blog','/guides','/calculators'];
 for(const p of fixed)if(!paths.includes(p))warnings.push('Expected public route omitted from sitemap: '+p);
 console.log('TOTAL:',paths.length,'public URLs; failures',failures.length,'warnings',warnings.length);
 for(const f of failures)console.error('FAIL',f);
 for(const w of warnings)console.log('WARN',w);
 if(failures.length)process.exitCode=1;
}
check().catch(err=>{console.error('FAIL audit infrastructure:',err.message);process.exitCode=1;});
