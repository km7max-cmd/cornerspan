#!/usr/bin/env bash
# ONE opt-in session, after owner creates a no-card ImageKit Forever Free account:
# isolated Preview key/build/real upload/CDN PASS -> upload undeployed Production candidate
# -> inspect real bindings/public routes -> explicitly confirmed 100% release -> read-only live smoke.
# No R2 subscription, D1 migrations, legacy post edits, PR merge, or secret printing.
set -euo pipefail
umask 077
ROOT=/workspaces/cornerspan
LIVE_VERSION=1d3c3256-4f2c-42da-977c-104e61cb0e5a
CONNECT_COMMIT=247e7da4a57fc8ea47b766d830d72f9ff4f27cdd
STOP(){ echo "STOP: $*" >&2; exit 1; }
[[ -t 0 && "$(pwd -P)" == "$ROOT" ]] || STOP "Run in interactive authenticated Codespace under $ROOT."
[[ "$(git branch --show-current)" == feature/posts-admin-dashboard ]] || STOP 'Wrong branch.'
git cat-file -e "$CONNECT_COMMIT^{commit}" 2>/dev/null || STOP 'Fetch feature branch before starting.'
BOOTSTRAP=$(mktemp); chmod 600 "$BOOTSTRAP"
git show "$CONNECT_COMMIT:scripts/connect-imagekit-free-preview.sh" > "$BOOTSTRAP" || STOP 'Could not load pinned Preview setup.'
# Sourcing intentionally retains the hidden private key in memory for the subsequent secure production upload.
source "$BOOTSTRAP"
rm -f -- "$BOOTSTRAP"
[[ -d "$TMP/app" && "$PIN" == 55913f89557425bda6b7999dc54ced6e4197f1a0 ]] || STOP 'Preview build source verification failed.'
echo 'PASS: Real isolated Preview upload acceptance. Production is still the unchanged previous Worker.'

PROD_PASSWORD=''
PROMOTED=0
VALIDATED=0
release_cleanup(){
 if [[ "$PROMOTED" == 1 && "$VALIDATED" != 1 ]]; then
   echo 'ALERT: Live checks failed after promotion; requesting known-good Worker rollback.'
   if "$WR" versions deploy "$LIVE_VERSION@100%" --name cornerspan --yes --message 'CornerSpan automatic ImageKit release rollback'; then
     echo 'ROLLBACK REQUESTED. Verify Cloudflare deployments and the public site.'
   else
     echo 'URGENT: automatic rollback FAILED; restore the old Worker using Cloudflare dashboard.' >&2
   fi
 fi
 unset PROD_PASSWORD IMAGEKIT_KEY PREVIEW_PASSWORD CMS_PREVIEW_TEST_PASSWORD || true
 rm -rf -- "$TMP"
}
trap release_cleanup EXIT
read -r -s -p 'CornerSpan PRODUCTION Admin password (hidden, same or a new private one): ' PROD_PASSWORD
printf '\n'
[[ $(printf '%s' "$PROD_PASSWORD" | wc -c) -ge 20 ]] || STOP 'Production password must have at least 20 bytes.'
printf '%s\0%s' "$PROD_PASSWORD" "$IMAGEKIT_KEY" | node -e '
const crypto=require("node:crypto");let s="";process.stdin.setEncoding("utf8");process.stdin.on("data",b=>s+=b);
process.stdin.on("end",()=>{const p=s.split("\0");if(p.length!==2||p[0].length<20||!/^private_[a-zA-Z0-9_-]{8,200}$/.test(p[1]))process.exit(2);
process.stdout.write(JSON.stringify({ADMIN_LOGIN_PASSWORD:p[0],ADMIN_SESSION_SECRET:crypto.randomBytes(48).toString("base64url"),IMAGEKIT_PRIVATE_KEY:p[1]}));});' > "$TMP/prod-secrets.json" || STOP 'Could not construct private temporary Worker secret file.'
chmod 600 "$TMP/prod-secrets.json"
PROD_PASSWORD=''
BEFORE=$(active) || STOP 'Could not recheck original Production Worker.'
[[ "$BEFORE" == "$LIVE_VERSION" ]] || STOP 'Active Production Worker changed during Preview setup.'
"$WR" versions list --name cornerspan --json > "$TMP/versions-before.json" || STOP 'Cannot list existing Worker versions.'
echo 'Uploading already-built reviewed code and ALL THREE secrets as an UNDEPLOYED version.'
cd "$TMP/app"
"$WR" versions upload --name cornerspan --config "$TMP/app/wrangler.jsonc" \
  --secrets-file "$TMP/prod-secrets.json" --message "CornerSpan ImageKit Forever Free $PIN" || STOP 'Undeployed Worker upload failed.'
cd "$ROOT"
[[ "$(active)" == "$LIVE_VERSION" ]] || STOP 'Production Worker unexpectedly changed during upload.'
"$WR" versions list --name cornerspan --json > "$TMP/versions-after.json" || STOP 'Cannot list uploaded Worker versions.'
CANDIDATE=$(node - "$TMP/versions-before.json" "$TMP/versions-after.json" <<'NODE'
const fs=require('node:fs'),before=JSON.parse(fs.readFileSync(process.argv[2],'utf8')),after=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
const list=x=>Array.isArray(x)?x:Array.isArray(x.versions)?x.versions:Array.isArray(x.result)?x.result:null;
const a=list(before),b=list(after);if(!a||!b)process.exit(2);
const getId=v=>v.id||v.version_id;
const old=new Set(a.map(getId)),fresh=b.map(getId).filter(id=>!old.has(id)&&/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id));
if(fresh.length!==1)process.exit(3);process.stdout.write(fresh[0]);
NODE
) || STOP 'Uploaded candidate cannot be uniquely identified. STOP before deploying.'
echo "Undeployed candidate ID: $CANDIDATE"
"$WR" versions view "$CANDIDATE" --name cornerspan --json > "$TMP/candidate.json" || STOP 'Cannot inspect candidate bindings.'
node - "$TMP/candidate.json" "$CANDIDATE" "$PIN" <<'NODE' || STOP 'Candidate version mismatch; no deployment.'
const fs=require('node:fs'),a=require('node:assert/strict');
const v=JSON.parse(fs.readFileSync(process.argv[2],'utf8')),id=process.argv[3],sha=process.argv[4];
a.equal(v.id,id);const b=v.resources?.bindings;a.ok(Array.isArray(b),'Missing bindings');
for(const name of ['ADMIN_LOGIN_PASSWORD','ADMIN_SESSION_SECRET','IMAGEKIT_PRIVATE_KEY']){
 a.equal(b.filter(x=>x.name===name&&x.type==='secret_text').length,1,'Missing encrypted secret: '+name);
 console.log('PASS '+name+' encrypted binding present');
}
a.equal(b.filter(x=>x.name==='ADMIN_DB'&&x.type==='d1'&&x.id==='4a41a0ba-360b-4c45-8929-1d21445eb5a0').length,1);
a.equal(b.filter(x=>x.name==='CMS_MEDIA_BUCKET').length,0,'Unexpected R2 binding');
a.equal(v.resources?.script_runtime?.compatibility_date,'2026-10-30');
a.ok(v.resources?.script_runtime?.compatibility_flags?.includes('nodejs_compat'));
const msg=v.metadata?.annotations?.['workers/message']||v.annotations?.['workers/message']||'';
a.ok(msg.includes(sha),'Reviewed Git SHA not confirmed in uploaded version.');
console.log('PASS Production D1, source commit marker and runtime; no R2.');
NODE
VERSION_URL="https://$(printf '%s' "$CANDIDATE" | cut -c 1-8)-cornerspan.eenadutech.workers.dev"
node - "$VERSION_URL" <<'NODE' || STOP 'Public Version URL parity smoke failed; keep Live unchanged.'
const assert=require('node:assert/strict'),candidate=process.argv[2],live='https://www.cornerspan.com';
(async()=>{
for(const path of ['/','/calculators','/calculators/concrete','/blog','/guides']){
 const arr=await Promise.all([candidate,live].map(async base=>{const r=await fetch(base+path,{signal:AbortSignal.timeout(25000),redirect:'manual'});const h=await r.text();
 return {status:r.status,title:(h.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||'',h1:(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)||[])[1]||''};}));
 assert.ok(arr.every(x=>x.status===200)&&arr[0].title===arr[1].title&&arr[0].h1===arr[1].h1,'Public regression '+path);
 console.log('PASS candidate/live public '+path);
}})().catch(e=>{console.error(e.message);process.exitCode=1});
NODE
"$WR" versions deploy "$CANDIDATE@100%" --name cornerspan --dry-run || STOP 'Cloudflare deployment dry-run failed.'
printf '\nPreview and candidate checks passed. Live still uses the old version.\n'
read -r -p 'Type DEPLOY CORNERSPAN IMAGEKIT to allow 100% live traffic switch: ' CONFIRM
[[ "$CONFIRM" == 'DEPLOY CORNERSPAN IMAGEKIT' ]] || STOP 'Owner cancelled; Live unchanged.'
[[ "$(active)" == "$LIVE_VERSION" ]] || STOP 'Active Worker changed before final promotion.'
if "$WR" versions deploy "$CANDIDATE@100%" --name cornerspan --yes --message "CornerSpan free ImageKit image uploads $PIN"; then
  PROMOTED=1
else
  CURRENT=$(active || true)
  [[ "$CURRENT" != "$CANDIDATE" ]] || PROMOTED=1
  STOP 'Cloudflare returned a promotion error. Do not rerun without checking active deployment.'
fi
[[ "$(active)" == "$CANDIDATE" ]] || STOP 'Candidate not active at 100% after promotion.'
node <<'NODE' || STOP 'Live smoke failed.'
const assert=require('node:assert/strict'),origin='https://www.cornerspan.com';
(async()=>{
 for(const path of ['/','/calculators','/calculators/concrete','/blog','/guides','/about','/privacy','/admin/login','/sitemap.xml']){
  const r=await fetch(origin+path,{signal:AbortSignal.timeout(25000),redirect:'manual'});
  assert.equal(r.status,200,'Live path not healthy: '+path);console.log('PASS Live GET '+path);
 }
 for(const path of ['/api/admin/drafts','/api/admin/media/upload']){
  const r=await fetch(origin+path,{signal:AbortSignal.timeout(25000),redirect:'manual'});
  assert.equal(r.status,401,'Anonymous admin API must stay private: '+path);
  console.log('PASS anonymous '+path+' blocked');
 }
})().catch(e=>{console.error(e.message);process.exitCode=1});
NODE
[[ "$(active)" == "$CANDIDATE" ]] || STOP 'Production version changed during smoke.'
VALIDATED=1
echo "PASS: ImageKit free image-upload Worker $CANDIDATE LIVE at 100%."
echo 'PR #4 remains draft/unmerged. Never paste a private key or password in chat.'
