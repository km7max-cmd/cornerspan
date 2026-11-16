#!/usr/bin/env bash
# Owner-run guarded rollout of the ALREADY UPLOADED CornerSpan Worker Version.
# Never builds/uploads a new version, changes D1, copies secrets or merges PR #4.
set -euo pipefail
umask 077
ROOT=/workspaces/cornerspan
BRANCH=feature/posts-admin-dashboard
WORKER=cornerspan
ACCOUNT=5a130ac4334b170f3f3472f3449841a8
OLD=da4e7677-f159-4989-a9f1-d3ac60fbfcfc
CANDIDATE_PREFIX=1d3c3256
APP_COMMIT=062419126fa6ecd702823d0d18499de9dae8011f
VERIFIER_COMMIT=6d8ea6e192597224355e1a3c1c9b63236bfd55e6
UUID='^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$'
stop(){ printf 'STOP: %s\n' "$*" >&2; exit 1; }
[[ -t 0 ]] || stop 'Interactive authenticated Codespace terminal required.'
[[ "$(pwd -P)" == "$ROOT" ]] || stop "Run in $ROOT."
[[ "$(git branch --show-current)" == "$BRANCH" ]] || stop "Wrong branch."
[[ "$(git remote get-url origin)" == *km7max-cmd/cornerspan* ]] || stop 'Unexpected Git remote.'
git cat-file -e "$APP_COMMIT^{commit}" 2>/dev/null || stop 'Pinned application commit is not available.'
git cat-file -e "$VERIFIER_COMMIT^{commit}" 2>/dev/null || stop 'Pinned verifier commit is not available.'
[[ -x "$ROOT/node_modules/.bin/wrangler" ]] || stop 'Use the installed project Wrangler.'
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT" CF_ACCOUNT_ID="$ACCOUNT" WRANGLER_SEND_METRICS=false
WR="$ROOT/node_modules/.bin/wrangler"
"$WR" whoami >/dev/null 2>&1 || stop 'Wrangler authentication missing.'
TMP=$(mktemp -d)
chmod 700 "$TMP"
PROMOTED=0
VALIDATED=0
cleanup(){
  if [[ "$PROMOTED" == 1 && "$VALIDATED" != 1 ]]; then
    echo 'ALERT: Live smoke tests did not pass. Attempting to restore the known previous Worker version.'
    if "$WR" versions deploy "$OLD@100%" --name "$WORKER" --config "$TMP/wrangler.json" --yes --message "CornerSpan automatic safety rollback"; then
      echo 'ROLLBACK REQUESTED: check deployments list and the live site.'
    else
      echo "URGENT: automatic rollback failed. Manually deploy previous version: $OLD" >&2
    fi
  fi
  rm -rf -- "$TMP"
}
trap cleanup EXIT
cat > "$TMP/wrangler.json" <<'CONFIG'
{"name":"cornerspan","account_id":"5a130ac4334b170f3f3472f3449841a8","send_metrics":false}
CONFIG
get_active(){
  "$WR" deployments list --name "$WORKER" --config "$TMP/wrangler.json" --json | node -e '
let raw="";process.stdin.on("data",b=>raw+=b);
process.stdin.on("end",()=>{
 const deployments=JSON.parse(raw);
 if(!Array.isArray(deployments)||!deployments.length)process.exit(2);
 const last=[...deployments].sort((a,b)=>Date.parse(a.created_on)-Date.parse(b.created_on)).at(-1);
 const v=last.versions;
 if(!Array.isArray(v)||v.length!==1||v[0].percentage!==100)process.exit(3);
 process.stdout.write(v[0].version_id);
});'
}
BEFORE=$(get_active) || stop 'Unable to read one active Worker at 100%.'
[[ "$BEFORE" == "$OLD" ]] || stop "Active version changed from the reviewed rollback baseline. No release."
echo "PASS: Existing production Worker still $OLD at 100%; release is not yet live."

git show "$VERIFIER_COMMIT:scripts/verify-production-candidate.cjs" > "$TMP/verify.cjs" || stop 'Cannot extract pinned safe verification.'
echo 'Running pre-release Cloudflare binding and public-page comparisons...'
node "$TMP/verify.cjs" || stop 'Candidate pre-release verification did not pass. No release.'

git show "$APP_COMMIT:scripts/admin-release-preflight.cjs" > "$TMP/d1-check.cjs" || stop 'Cannot extract pinned D1 preflight.'
node "$TMP/d1-check.cjs" > "$TMP/d1-report.txt" || stop 'Remote D1 read-only preflight failed.'
sed -n '/^PRODUCTION D1/,/^PREVIEW D1/p' "$TMP/d1-report.txt" | sed '$d' > "$TMP/production-section.txt"
cat "$TMP/production-section.txt"
[[ -s "$TMP/production-section.txt" ]] || stop 'Production section was not found in read-only preflight.'
grep -Fq 'Migration ledger: 1=applied 2=applied 3=applied 4=applied' "$TMP/production-section.txt" || stop 'Four Production migrations not confirmed.'
for table in admin_post_drafts admin_published_posts admin_login_attempts admin_media; do
  grep -Eq "^  $table: expected columns present;" "$TMP/production-section.txt" || stop "Production table schema mismatched: $table"
done
echo 'PASS: Production D1 schema and four applied migrations.'

git show "$APP_COMMIT:wrangler.jsonc" > "$TMP/candidate-wrangler.jsonc"
node - "$TMP/candidate-wrangler.jsonc" <<'NODE' || stop 'Unexpected route or Worker config changes.'
const fs=require('node:fs'),assert=require('node:assert/strict');
const c=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
assert.equal(c.name,'cornerspan');
assert.equal(c.d1_databases?.[0]?.database_id,'4a41a0ba-360b-4c45-8929-1d21445eb5a0');
for(const k of ['routes','route','triggers','workers_dev'])assert.ok(!Object.hasOwn(c,k),'Unexpected trigger/route declaration: '+k);
console.log('PASS: Reviewed app config does not request route/trigger changes.');
NODE

CANDIDATE=$("$WR" versions list --name "$WORKER" --config "$TMP/wrangler.json" --json | node -e '
let raw="";process.stdin.on("data",b=>raw+=b);
process.stdin.on("end",()=>{
 let r=JSON.parse(raw), list=Array.isArray(r)?r:Array.isArray(r.versions)?r.versions:r.result;
 if(!Array.isArray(list))process.exit(2);
 const ids=list.map(v=>v.id||v.version_id).filter(x=>typeof x==="string"&&/^1d3c3256-[0-9a-f-]{27}$/i.test(x));
 if(ids.length!==1)process.exit(3);
 process.stdout.write(ids[0]);
});') || stop 'Could not uniquely resolve uploaded candidate.'
[[ "$CANDIDATE" =~ $UUID ]] || stop 'Invalid candidate UUID.'
[[ "$CANDIDATE" != "$OLD" ]] || stop 'Candidate equals the old version.'

echo "Dry-running existing uploaded version $CANDIDATE at 100%..."
"$WR" versions deploy "$CANDIDATE@100%" --name "$WORKER" --config "$TMP/wrangler.json" --dry-run || stop 'Version deploy dry-run failed.'
echo 'CHECK: This uses existing custom-domain triggers; no triggers deploy requested.'
printf '\nProduction promotion is the next action. Rollback target: %s\n' "$OLD"
read -r -p 'Type DEPLOY CORNERSPAN VERSION to promote the reviewed candidate: ' ANSWER
[[ "$ANSWER" == 'DEPLOY CORNERSPAN VERSION' ]] || stop 'Cancelled. Live unchanged.'
LATEST=$(get_active) || stop 'Could not recheck active version.'
[[ "$LATEST" == "$OLD" ]] || stop 'Active Worker changed before promotion. Live unchanged by this script.'
echo 'Deploying ONLY the reviewed uploaded version. Do not interrupt.'
if "$WR" versions deploy "$CANDIDATE@100%" --name "$WORKER" --config "$TMP/wrangler.json" --yes --message "CornerSpan SEO Admin CMS release $APP_COMMIT"; then
  PROMOTED=1
else
  echo "ALERT: Wrangler reported a deployment error. Checking live deployment before cleanup." >&2
  CURRENT=$(get_active || true)
  [[ "$CURRENT" != "$CANDIDATE" ]] || PROMOTED=1
  stop "Promotion command failed. Check active deployments before attempting another release."
fi

AFTER=$(get_active) || stop 'Could not read active deployment after promotion.'
[[ "$AFTER" == "$CANDIDATE" ]] || stop 'Uploaded version is not the active 100% Worker.'
echo 'PASS: Candidate now active at 100%. Running Live read-only smoke tests.'
node - "$CANDIDATE" <<'NODE' || stop 'Live public/auth smoke failed.'
const candidate=process.argv[2];
const origin='https://www.cornerspan.com';
async function check(){
 const pages=['/','/calculators','/calculators/concrete','/blog','/guides','/about','/privacy'];
 for(const p of pages){
  const r=await fetch(origin+p,{redirect:'manual',signal:AbortSignal.timeout(20000)});
  if(r.status!==200)throw Error('GET '+p+' returned '+r.status);
  const html=await r.text();
  if(!/<title[\s>]/i.test(html)||!/<h1[\s>]/i.test(html))throw Error('Missing title/H1 on '+p);
  console.log('PASS Live GET '+p+' HTTP 200 with title and H1');
 }
 const login=await fetch(origin+'/admin/login',{redirect:'manual',signal:AbortSignal.timeout(20000)});
 if(login.status!==200)throw Error('Admin sign-in HTTP '+login.status);
 console.log('PASS Live Admin sign-in page HTTP 200');
 const privateApi=await fetch(origin+'/api/admin/drafts',{redirect:'manual',signal:AbortSignal.timeout(20000)});
 if(privateApi.status!==401)throw Error('Unauthorized Drafts API HTTP '+privateApi.status);
 console.log('PASS unauthenticated Draft API returns HTTP 401');
 const sitemap=await fetch(origin+'/sitemap.xml',{redirect:'manual',signal:AbortSignal.timeout(20000)});
 if(sitemap.status!==200)throw Error('Sitemap HTTP '+sitemap.status);
 const xml=await sitemap.text();
 const count=(xml.match(/<loc>/g)||[]).length;
 if(count<40)throw Error('Sitemap has only '+count+' URLs');
 console.log('PASS Live sitemap HTTP 200; '+count+' URLs');
}
async function main(){
 for(let trial=0;trial<3;trial++){
  try{await check();return}
  catch(e){
   console.error('Attempt '+(trial+1)+' failed: '+e.message);
   if(trial===2)throw e;
   await new Promise(resolve=>setTimeout(resolve,5000));
  }
 }
}
main().catch(e=>{console.error('Live checks failed: '+e.message);process.exitCode=1});
NODE
FINAL=$(get_active) || stop 'Active version unavailable after smoke.'
[[ "$FINAL" == "$CANDIDATE" ]] || stop 'Production version changed after deployment.'
VALIDATED=1
echo "PASS: CornerSpan uploaded version $CANDIDATE is LIVE at 100% with public/auth smoke checks."
echo "Rollback command if needed: $WR versions deploy $OLD@100% --name $WORKER --yes"
echo 'Do not merge PR #4 automatically; check the admin login manually with the private Production password.'
