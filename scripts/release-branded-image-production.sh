#!/usr/bin/env bash
# Owner-only release of already-staged CornerSpan domain image-link Worker.
# Does not edit secrets/D1, enable billing, or merge PR #4.
set -euo pipefail
umask 077
ROOT=/workspaces/cornerspan
OLD=8dc43ea7-c85c-4991-a3e1-37675b2ea082
PIN=a7d83fae67369bb46033eade986bb22a197085e5
DB=4a41a0ba-360b-4c45-8929-1d21445eb5a0
ACCOUNT=5a130ac4334b170f3f3472f3449841a8
stop(){ echo "STOP: $*" >&2; exit 1; }
[[ -t 0 && "$(pwd -P)" == "$ROOT" ]] || stop 'Run in interactive authenticated Codespace.'
[[ "$(git branch --show-current)" == feature/posts-admin-dashboard ]] || stop 'Wrong branch.'
[[ "$#" == 1 ]] || stop 'Pass one preflight-verified candidate version ID.'
CANDIDATE="$1"
[[ "$CANDIDATE" =~ ^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$ ]] || stop 'Invalid candidate ID.'
[[ "$CANDIDATE" != "$OLD" ]] || stop 'Candidate equals rollback version.'
WR="$ROOT/node_modules/.bin/wrangler"
[[ -x "$WR" ]] || stop 'Wrangler missing.'
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT" CF_ACCOUNT_ID="$ACCOUNT" WRANGLER_SEND_METRICS=false
"$WR" whoami >/dev/null 2>&1 || stop 'Cloudflare authentication missing.'
TMP="$(mktemp -d)"
chmod 700 "$TMP"
PROMOTED=0
VERIFIED=0
cleanup(){
 if [[ "$PROMOTED" == 1 && "$VERIFIED" != 1 ]]; then
  echo 'ALERT: Live tests failed. Attempting rollback.'
  "$WR" versions deploy "$OLD@100%" --name cornerspan --yes --message 'CornerSpan image link safety rollback' ||
    echo "URGENT: Manual rollback to $OLD is needed." >&2
 fi
 rm -rf "$TMP"
}
trap cleanup EXIT
active(){
 "$WR" deployments list --name cornerspan --json | node -e '
 let s="";process.stdin.on("data",x=>s+=x);process.stdin.on("end",()=>{
 const a=JSON.parse(s);if(!Array.isArray(a)||!a.length)process.exit(2);
 const d=[...a].sort((x,y)=>Date.parse(x.created_on)-Date.parse(y.created_on)).at(-1);
 if(d.versions?.length!==1||d.versions[0].percentage!==100)process.exit(3);
 process.stdout.write(d.versions[0].version_id);
 });'
}
[[ "$(active)" == "$OLD" ]] || stop 'Production changed since staging; do not deploy.'
"$WR" versions view "$CANDIDATE" --name cornerspan --json > "$TMP/candidate.json" ||
  stop 'Cannot view candidate.'
"$WR" versions view "$OLD" --name cornerspan --json > "$TMP/rollback.json" ||
  stop 'Cannot view rollback Worker.'
node - "$TMP/candidate.json" "$TMP/rollback.json" "$CANDIDATE" "$PIN" "$DB" <<'NODE' ||
  stop 'Release candidate binding/source gate failed.'
const fs=require('node:fs'),a=require('node:assert/strict');
const v=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const old=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
a.equal(v.id,process.argv[4]);
const b=v.resources?.bindings||[],ob=old.resources?.bindings||[];
const sec=x=>x.filter(y=>y.type==='secret_text').map(y=>y.name).sort();
a.deepEqual(sec(b),sec(ob),'Encrypted secret names changed');
for(const key of ['ADMIN_LOGIN_PASSWORD','ADMIN_SESSION_SECRET','IMAGEKIT_PRIVATE_KEY'])
 a.ok(sec(b).includes(key),'Missing '+key);
a.equal(b.filter(x=>x.name==='ADMIN_DB'&&x.type==='d1'&&x.id===process.argv[6]).length,1);
a.equal(b.filter(x=>x.name==='CMS_MEDIA_BUCKET').length,0);
a.equal(v.resources?.script_runtime?.compatibility_date,'2026-10-30');
a.ok(v.resources?.script_runtime?.compatibility_flags?.includes('nodejs_compat'));
const msg=v.metadata?.annotations?.['workers/message']||v.annotations?.['workers/message']||'';
a.ok(msg.includes(process.argv[5]),'Pinned code SHA missing');
console.log('PASS verified source, encrypted secret bindings, D1 and rollback version.');
NODE
node - "$CANDIDATE" <<'NODE' || stop 'Candidate public/private read-only checks failed.'
const a=require('node:assert/strict'),base='https://'+process.argv[2].slice(0,8)+'-cornerspan.eenadutech.workers.dev';
(async()=>{
for(const path of ['/','/calculators','/calculators/concrete','/blog','/guides','/about','/privacy','/admin/login','/sitemap.xml']){
 const r=await fetch(base+path,{redirect:'manual',signal:AbortSignal.timeout(25000)});
 a.equal(r.status,200,'Candidate GET '+path);
}
for(const path of ['/api/admin/drafts','/api/admin/media/upload']){
 const r=await fetch(base+path,{redirect:'manual',signal:AbortSignal.timeout(25000)});
 a.equal(r.status,401,'Unauthorized '+path);
}
const invalid=await fetch(base+'/media/images/unsafe.svg',{redirect:'manual',signal:AbortSignal.timeout(25000)});
a.equal(invalid.status,404,'Public image proxy must deny invalid filenames');
console.log('PASS candidate routes and private APIs.');
})().catch(e=>{console.error(e.message);process.exitCode=1});
NODE
"$WR" versions deploy "$CANDIDATE@100%" --name cornerspan --dry-run ||
  stop 'Dry run failed. Not deployed.'
printf '\nProduction remains %s at 100%%.\n' "$OLD"
printf 'New candidate %s is verified by metadata/route checks.\n' "$CANDIDATE"
echo 'New Preview upload must return its own workers.dev/media/images URL and display its ImageKit photo.'
read -r -p 'Type BRANDED IMAGE PREVIEW PASS after new real Preview image GET works: ' PREVIEW_RESULT
[[ "$PREVIEW_RESULT" == 'BRANDED IMAGE PREVIEW PASS' ]] || stop 'Preview upload not confirmed; Live unchanged.'
read -r -p 'Type DEPLOY CORNERSPAN IMAGE LINKS to approve 100% rollout: ' ANSWER
[[ "$ANSWER" == 'DEPLOY CORNERSPAN IMAGE LINKS' ]] || stop 'Owner cancelled. Live unchanged.'
[[ "$(active)" == "$OLD" ]] || stop 'Active Production changed. Release cancelled.'
if "$WR" versions deploy "$CANDIDATE@100%" --name cornerspan --yes --message "CornerSpan branded image links $PIN"; then
 PROMOTED=1
else
 [[ "$(active)" != "$CANDIDATE" ]] || PROMOTED=1
 stop 'Promotion error. Check active deployment before retry.'
fi
[[ "$(active)" == "$CANDIDATE" ]] || stop 'Candidate not 100% active.'
node <<'NODE' || stop 'Live read-only smoke failed.'
const a=require('node:assert/strict'),base='https://www.cornerspan.com';
(async()=>{
for(const path of ['/','/calculators','/calculators/concrete','/blog','/guides','/about','/privacy','/admin/login','/sitemap.xml']){
 const r=await fetch(base+path,{redirect:'manual',signal:AbortSignal.timeout(25000)});
 a.equal(r.status,200,'Live GET '+path);
 console.log('PASS Live '+path);
}
for(const path of ['/api/admin/drafts','/api/admin/media/upload']){
 const r=await fetch(base+path,{redirect:'manual',signal:AbortSignal.timeout(25000)});
 a.equal(r.status,401,'Private API '+path);
 console.log('PASS anonymous blocked '+path);
}
})().catch(e=>{console.error(e.message);process.exitCode=1});
NODE
[[ "$(active)" == "$CANDIDATE" ]] || stop 'Active version changed after smoke.'
VERIFIED=1
echo "PASS: Branded CornerSpan image links $CANDIDATE LIVE at 100%."
echo 'Next: Owner login and verify Production uploads return and display https://www.cornerspan.com/media/images/ URLs.'
echo 'Existing post contents unchanged; PR #4 remains draft/unmerged.'
