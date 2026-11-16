// Read-only verification of staged CornerSpan production Worker candidate.
// Does NOT perform deployment, POST requests, authenticated login, SQL or secret changes.
const {spawnSync}=require('node:child_process');
const {mkdtempSync,writeFileSync,rmSync}=require('node:fs');
const {tmpdir}=require('node:os');
const {join}=require('node:path');
const ACCOUNT='5a130ac4334b170f3f3472f3449841a8';
const WORKER='cornerspan';
const PREFIX='1d3c3256';
const ACTIVE='da4e7677-f159-4989-a9f1-d3ac60fbfcfc';
const SHA='062419126fa6ecd702823d0d18499de9dae8011f';
const DB='4a41a0ba-360b-4c45-8929-1d21445eb5a0';
const VERSION_URL='https://1d3c3256-cornerspan.eenadutech.workers.dev';
const LIVE_URL='https://www.cornerspan.com';
const UUID=/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
function insist(cond,label){if(!cond)throw Error(label);}
function versionId(item){return item&&typeof (item.id||item.version_id)==='string'?(item.id||item.version_id):null;}
function candidateId(input){
 const list=Array.isArray(input)?input:Array.isArray(input?.versions)?input.versions:input?.result;
 insist(Array.isArray(list),'Unexpected versions list format.');
 const found=list.map(versionId).filter(id=>id&&id.startsWith(PREFIX+'-')&&UUID.test(id));
 insist(found.length===1,'Could not identify one recent candidate with expected preview-prefix.');
 return found[0];
}
function deployed(input){
 insist(Array.isArray(input)&&input.length>0,'Invalid deployments response.');
 const last=[...input].sort((a,b)=>Date.parse(a.created_on)-Date.parse(b.created_on)).at(-1);
 insist(last&&Array.isArray(last.versions)&&last.versions.length===1,'Active Worker is split; release hold.');
 const item=last.versions[0];
 insist(item.version_id===ACTIVE&&item.percentage===100,'Active Worker changed; release hold.');
 return item.version_id;
}
function inspect(raw,id){
 insist(raw?.id===id&&Array.isArray(raw?.resources?.bindings),'Incomplete Worker version details.');
 const binds=raw.resources.bindings;
 const db=binds.filter(b=>b.name==='ADMIN_DB'&&b.type==='d1'&&b.id===DB);
 const secret=name=>binds.filter(b=>b.name===name&&b.type==='secret_text').length===1;
 const runtime=raw.resources.script_runtime||{};
 return {
  id,
  source:raw.metadata?.source||'unverified',
  db:db.length===1,
  password:secret('ADMIN_LOGIN_PASSWORD'),
  session:secret('ADMIN_SESSION_SECRET'),
  compatibility:runtime.compatibility_date==='2026-10-30',
  nodeCompat:Array.isArray(runtime.compatibility_flags)&&runtime.compatibility_flags.includes('nodejs_compat'),
  etag:raw.resources.script?.etag||null,
  message:raw.metadata?.annotations?.['workers/message']||raw.annotations?.['workers/message']||null
 };
}
function getTitle(html){
 const m=html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
 return m?m[1].replace(/\s+/g,' ').trim():'';
}
function getH1(html){
 const m=html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
 return m?m[1].replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim():'';
}
async function readOnlyPages(){
 let success=true;
 for(const path of ['/','/calculators','/calculators/concrete','/blog','/guides']){
  try{
   const arr=await Promise.all([VERSION_URL,LIVE_URL].map(async origin=>{
    const r=await fetch(origin+path,{method:'GET',redirect:'manual',signal:AbortSignal.timeout(20000)});
    const html=await r.text();
    return {status:r.status,title:getTitle(html),h1:getH1(html)};
   }));
   const ok=arr.every(x=>x.status===200)&&arr[0].title===arr[1].title&&arr[0].h1===arr[1].h1;
   console.log((ok?'PASS':'CHECK')+' public '+path+': candidate '+arr[0].status+', live '+arr[1].status+', title/H1 parity '+ok);
   if(!ok)success=false;
  }catch{console.log('CHECK public '+path+': request unavailable; no writes.');success=false;}
 }
 return success;
}
async function main(){
 const dir=mkdtempSync(join(tmpdir(),'cornerspan-version-check-'));
 try{
  const cfg=join(dir,'wrangler.json');
  writeFileSync(cfg,JSON.stringify({name:WORKER,account_id:ACCOUNT,send_metrics:false}),{mode:0o600});
  function read(kind,id){
   const args=kind==='deployments'?['deployments','list','--name',WORKER,'--json']:
     kind==='list'?['versions','list','--name',WORKER,'--json']:
     ['versions','view',id,'--name',WORKER,'--json'];
   insist(kind==='deployments'||kind==='list'||(kind==='view'&&UUID.test(id)),'Invalid read task.');
   const result=spawnSync('npx',['--no-install','wrangler',...args,'--config',cfg],{
    cwd:process.cwd(),shell:false,encoding:'utf8',timeout:60000,maxBuffer:4*1024*1024,
    stdio:['ignore','pipe','pipe'],
    env:{...process.env,CI:'true',NO_COLOR:'1',CLOUDFLARE_ACCOUNT_ID:ACCOUNT,WRANGLER_SEND_METRICS:'false'}
   });
   insist(result.status===0,'Wrangler '+kind+' failed; raw output withheld.');
   try{return JSON.parse(result.stdout)}catch{throw Error('Wrangler '+kind+' returned unexpected output; withheld.')}
  }
  const active=deployed(read('deployments'));
  const candidate=candidateId(read('list'));
  insist(candidate!==active,'Candidate is already active; release hold.');
  const fresh=inspect(read('view',candidate),candidate);
  const old=inspect(read('view',active),active);
  const configOk=fresh.db&&fresh.password&&fresh.session&&fresh.compatibility&&fresh.nodeCompat;
  const gitMatch=typeof fresh.message==='string'&&fresh.message.includes(SHA);
  console.log('Production Worker: '+active+' (100% active)');
  console.log('Undeployed candidate: '+candidate);
  console.log('Candidate source: '+String(fresh.source).slice(0,25)+'; Git SHA in upload message: '+(gitMatch?'MATCH':'UNVERIFIED'));
  console.log('ADMIN_DB: '+(fresh.db?'MATCH':'MISMATCH'));
  console.log('ADMIN_LOGIN_PASSWORD: '+(fresh.password?'PRESENT':'MISSING'));
  console.log('ADMIN_SESSION_SECRET: '+(fresh.session?'PRESENT':'MISSING'));
  console.log('Runtime date: '+(fresh.compatibility?'MATCH':'MISMATCH')+'; nodejs_compat: '+fresh.nodeCompat);
  console.log('Rollback version retrievable: '+old.id);
  if(old.etag&&fresh.etag)console.log('Code bundle ETags differ: '+(old.etag!==fresh.etag));
  if(!configOk)throw Error('Candidate bindings or compatibility settings are incorrect. STOP.');
  const publicOk=await readOnlyPages();
  console.log('VERDICT: '+(gitMatch&&publicOk?'VERSION METADATA & PUBLIC SMOKE PASS; release still requires route/build/rollback checks':'HOLD: incomplete commit evidence or public comparison.'));
  console.log('NO PRODUCTION DEPLOYMENT OR DATABASE WRITES PERFORMED.');
 }finally{rmSync(dir,{recursive:true,force:true});}
}
if(require.main===module)main().catch(e=>{console.error('STOP: '+e.message);process.exitCode=1;});
module.exports={candidateId,deployed,inspect,getTitle,getH1};
