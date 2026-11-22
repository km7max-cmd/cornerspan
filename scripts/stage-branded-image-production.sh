#!/usr/bin/env bash
# CornerSpan owner-only Production preflight for branded ImageKit photo links.
# and upload ONE undeployed Cloudflare Worker version. Never switches Live traffic.
# Does not replace secrets, change D1, enable R2, write CMS posts, or merge PR #4.
set -euo pipefail
umask 077

ROOT=/workspaces/cornerspan
BRANCH=feature/posts-admin-dashboard
PIN=a7d83fae67369bb46033eade986bb22a197085e5
BASE=8dc43ea7-c85c-4991-a3e1-37675b2ea082
ACCOUNT=5a130ac4334b170f3f3472f3449841a8
DB=4a41a0ba-360b-4c45-8929-1d21445eb5a0
WORKER=cornerspan

stop(){ echo "STOP: $*" >&2; exit 1; }
[[ -t 0 && "$(pwd -P)" == "$ROOT" ]] || stop "Use interactive Codespace in $ROOT."
[[ "$(git branch --show-current)" == "$BRANCH" ]] || stop "Wrong branch."
[[ "$(git remote get-url origin)" == *km7max-cmd/cornerspan* ]] || stop "Wrong GitHub repository."
git cat-file -e "$PIN^{commit}" 2>/dev/null || stop "Pinned reviewed commit missing. Fetch the branch first."
[[ -x "$ROOT/node_modules/.bin/wrangler" ]] || stop "Project Wrangler not installed."
WR="$ROOT/node_modules/.bin/wrangler"
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT" CF_ACCOUNT_ID="$ACCOUNT" WRANGLER_SEND_METRICS=false
"$WR" whoami >/dev/null 2>&1 || stop "Cloudflare authentication unavailable."

TMP="$(mktemp -d)"
chmod 700 "$TMP"
cleanup(){ rm -rf -- "$TMP"; }
trap cleanup EXIT

active(){
  "$WR" deployments list --name "$WORKER" --json | node -e '
  let s="";process.stdin.on("data",b=>s+=b);process.stdin.on("end",()=>{
    const x=JSON.parse(s);if(!Array.isArray(x)||!x.length)process.exit(2);
    const d=[...x].sort((a,b)=>Date.parse(a.created_on)-Date.parse(b.created_on)).at(-1);
    const v=d?.versions;if(!Array.isArray(v)||v.length!==1||v[0].percentage!==100)process.exit(3);
    process.stdout.write(v[0].version_id);
  });'
}
BEFORE="$(active)" || stop "Could not read active 100% Worker."
[[ "$BEFORE" == "$BASE" ]] || stop "Live version is $BEFORE, not reviewed baseline $BASE. No upload."

"$WR" versions view "$BASE" --name "$WORKER" --json > "$TMP/live.json" ||
  stop "Cannot read Live version bindings."
node - "$TMP/live.json" "$BASE" "$DB" <<'NODE' || stop "Live binding preflight failed."
const fs=require('node:fs'),a=require('node:assert/strict');
const v=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
a.equal(v.id,process.argv[3]);const b=v.resources?.bindings;
a.ok(Array.isArray(b),'Missing binding list');
for(const key of ['ADMIN_LOGIN_PASSWORD','ADMIN_SESSION_SECRET','IMAGEKIT_PRIVATE_KEY']){
 a.equal(b.filter(x=>x.name===key&&x.type==='secret_text').length,1,key+' missing');
 console.log('PASS existing encrypted '+key+' (value not read)');
}
a.equal(b.filter(x=>x.name==='ADMIN_DB'&&x.type==='d1'&&x.id===process.argv[4]).length,1);
a.equal(b.filter(x=>x.name==='CMS_MEDIA_BUCKET').length,0,'Unexpected R2 binding');
console.log('PASS existing Production D1; R2 absent.');
NODE

mkdir "$TMP/app"
git archive "$PIN" | tar -xf - -C "$TMP/app" || stop "Could not snapshot reviewed source."
node - "$TMP/app/wrangler.jsonc" "$DB" <<'NODE' || stop "Candidate Worker config changed."
const fs=require('node:fs'),a=require('node:assert/strict');
const c=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
a.equal(c.name,'cornerspan');
a.equal(c.d1_databases?.find(x=>x.binding==='ADMIN_DB')?.database_id,process.argv[3]);
a.equal(c.r2_buckets,undefined);
a.equal(c.compatibility_date,'2026-10-30');
a.ok(c.compatibility_flags.includes('nodejs_compat'));
for(const key of ['routes','route','triggers'])a.ok(!Object.hasOwn(c,key),'Unexpected route change');
console.log('PASS reviewed code configuration, no new billing bindings.');
NODE

cd "$TMP/app"
npm install --no-package-lock --no-audit --no-fund || stop "Clean dependency install failed."
npm run prebuild || stop "Calculator prebuild failed."
npm run build:cloudflare || stop "Cloudflare build failed."
[[ -s .open-next/worker.js ]] || stop "Worker bundle missing."
cd "$ROOT"

# Per Cloudflare docs, versions upload inherits existing encrypted secrets.
# Never supply an empty secrets file or rotate Production passwords here.
"$WR" versions list --name "$WORKER" --json > "$TMP/before.json" ||
  stop "Could not read previous versions."
[[ "$(active)" == "$BASE" ]] || stop "Live changed during build; no candidate upload."
echo "Uploading UNDEPLOYED code $PIN, preserving all existing Worker secrets..."
cd "$TMP/app"
"$WR" versions upload --name "$WORKER" --config "$TMP/app/wrangler.jsonc" \
  --message "CornerSpan website-domain ImageKit images $PIN" ||
  stop "Undeployed upload failed. Live unchanged."
cd "$ROOT"

[[ "$(active)" == "$BASE" ]] || stop "ALERT: Active Worker unexpectedly changed. Inspect deployments."
"$WR" versions list --name "$WORKER" --json > "$TMP/after.json" ||
  stop "Cannot list uploaded candidate."
CANDIDATE="$(node - "$TMP/before.json" "$TMP/after.json" <<'NODE'
const fs=require('node:fs');
const old=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const fresh=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const items=x=>Array.isArray(x)?x:Array.isArray(x.versions)?x.versions:Array.isArray(x.result)?x.result:null;
const a=items(old),b=items(fresh);if(!a||!b)process.exit(2);
const known=new Set(a.map(v=>v.id||v.version_id));
const ids=b.map(v=>v.id||v.version_id).filter(id=>typeof id==='string'&&!known.has(id)&&/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id));
if(ids.length!==1)process.exit(3);
process.stdout.write(ids[0]);
NODE
)" || stop "Could not uniquely identify candidate. Do not deploy."

"$WR" versions view "$CANDIDATE" --name "$WORKER" --json > "$TMP/candidate.json" ||
  stop "Could not read candidate bindings."
node - "$TMP/live.json" "$TMP/candidate.json" "$CANDIDATE" "$PIN" "$DB" <<'NODE' ||
  stop "Candidate bindings or source marker failed validation. Do NOT deploy."
const fs=require('node:fs'),a=require('node:assert/strict');
const live=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const v=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const id=process.argv[4],sha=process.argv[5],db=process.argv[6];
a.equal(v.id,id);
const b=v.resources?.bindings||[],old=live.resources?.bindings||[];
const secret=x=>x.filter(y=>y.type==='secret_text').map(y=>y.name).sort();
a.deepEqual(secret(b),secret(old),'Secret name set changed');
for(const k of ['ADMIN_LOGIN_PASSWORD','ADMIN_SESSION_SECRET','IMAGEKIT_PRIVATE_KEY'])
 a.equal(b.filter(x=>x.name===k&&x.type==='secret_text').length,1,'Missing secret '+k);
a.equal(b.filter(x=>x.name==='ADMIN_DB'&&x.type==='d1'&&x.id===db).length,1);
a.equal(b.filter(x=>x.name==='CMS_MEDIA_BUCKET').length,0,'Unexpected R2 binding');
a.equal(v.resources?.script_runtime?.compatibility_date,'2026-10-30');
a.ok(v.resources?.script_runtime?.compatibility_flags?.includes('nodejs_compat'));
const msg=v.metadata?.annotations?.['workers/message']||v.annotations?.['workers/message']||'';
a.ok(msg.includes(sha),'Pinned source marker missing');
console.log('PASS candidate source marker, all encrypted secret names, Production D1, runtime; no R2.');
NODE

node - "$CANDIDATE" <<'NODE' || stop "Candidate public parity or private-API check failed."
const a=require('node:assert/strict');
const id=process.argv[2];
const test='https://'+id.slice(0,8)+'-cornerspan.eenadutech.workers.dev';
const live='https://www.cornerspan.com';
const fetchInfo=async (base,path)=>{
 const r=await fetch(base+path,{redirect:'manual',signal:AbortSignal.timeout(25000)});
 const h=await r.text();
 return {status:r.status,title:(h.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||'',
         h1:(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[])[1]||''};
};
(async()=>{
 for(const path of ['/','/calculators','/calculators/concrete','/blog','/guides','/about','/privacy']){
  const [c,l]=await Promise.all([fetchInfo(test,path),fetchInfo(live,path)]);
  a.equal(c.status,200,'Candidate route '+path);
  a.equal(l.status,200,'Live route '+path);
  a.equal(c.title,l.title,'Title changed '+path);
  a.equal(c.h1,l.h1,'H1 changed '+path);
  console.log('PASS public parity '+path);
 }
 a.equal((await fetchInfo(test,'/admin/login')).status,200);
 a.equal((await fetchInfo(test,'/sitemap.xml')).status,200);
 for(const path of ['/api/admin/drafts','/api/admin/media/upload']){
  a.equal((await fetchInfo(test,path)).status,401,'Anonymous API must be private: '+path);
 }
 console.log('PASS candidate login, sitemap and private APIs.');
})().catch(e=>{console.error(e.message);process.exitCode=1});
NODE

"$WR" versions deploy "$CANDIDATE@100%" --name "$WORKER" --dry-run ||
  stop "Deploy dry run failed; candidate remains undeployed."
echo "PASS: CANDIDATE=$CANDIDATE"
echo "PASS: Live remains $BASE at 100%. NO DEPLOYMENT."
echo "Keep this candidate ID and share only the PASS lines; do not enter a deploy confirmation."
