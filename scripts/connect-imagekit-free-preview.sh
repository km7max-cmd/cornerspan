#!/usr/bin/env bash
# Owner-run ImageKit Forever Free hookup and real isolated Preview upload acceptance.
# No subscription, billing, Production deployment, PR merge or Production D1 changes.
set -euo pipefail
umask 077
ROOT=/workspaces/cornerspan
BRANCH=feature/posts-admin-dashboard
PIN=ac7fb9d6e047f923dd2463410ef4d127bed560d5
ACCOUNT=5a130ac4334b170f3f3472f3449841a8
WORKER=cornerspan
LIVE_VERSION=1d3c3256-4f2c-42da-977c-104e61cb0e5a
PREVIEW_URL=https://feature-posts-admin-dashboard-cornerspan.eenadutech.workers.dev
stop(){ printf 'STOP: %s\n' "$*" >&2; exit 1; }
[[ -t 0 && "$(pwd -P)" == "$ROOT" ]] || stop "Use interactive authenticated Codespace in $ROOT."
[[ "$(git branch --show-current)" == "$BRANCH" ]] || stop 'Wrong branch.'
[[ "$(git remote get-url origin)" == *km7max-cmd/cornerspan* ]] || stop 'Wrong repository.'
git cat-file -e "$PIN^{commit}" || stop 'Fetch branch first.'
[[ -x "$ROOT/node_modules/.bin/wrangler" ]] || stop 'Project Wrangler missing.'
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT" CF_ACCOUNT_ID="$ACCOUNT" WRANGLER_SEND_METRICS=false
WR="$ROOT/node_modules/.bin/wrangler"
"$WR" whoami >/dev/null 2>&1 || stop 'Cloudflare authentication unavailable.'
active(){
 "$WR" deployments list --name "$WORKER" --json | node -e '
let s="";process.stdin.on("data",x=>s+=x);process.stdin.on("end",()=>{
 const list=JSON.parse(s);if(!Array.isArray(list)||!list.length)process.exit(2);
 const last=list.sort((a,b)=>Date.parse(a.created_on)-Date.parse(b.created_on)).at(-1);
 if(last.versions?.length!==1||last.versions[0].percentage!==100)process.exit(3);
 process.stdout.write(last.versions[0].version_id);});'
}
[[ "$(active)" == "$LIVE_VERSION" ]] || stop 'Active Production Worker changed. No changes requested.'
TMP=$(mktemp -d); chmod 700 "$TMP"
IMAGEKIT_KEY=''
PREVIEW_PASSWORD=''
cleanup(){ unset IMAGEKIT_KEY PREVIEW_PASSWORD CMS_PREVIEW_TEST_PASSWORD || true; rm -rf -- "$TMP"; }
trap cleanup EXIT
mkdir -p "$TMP/app"
git archive "$PIN" | tar -x -C "$TMP/app" || stop 'Cannot extract clean reviewed commit.'
node - "$TMP/app/wrangler.jsonc" <<'NODE' || stop 'Unexpected Cloudflare resource configuration.'
const a=require('node:assert/strict'),fs=require('node:fs');
const c=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
a.equal(c.name,'cornerspan');a.equal(c.r2_buckets,undefined);
a.equal(c.previews?.r2_buckets,undefined);
a.equal(c.d1_databases[0].database_id,'4a41a0ba-360b-4c45-8929-1d21445eb5a0');
a.equal(c.previews.d1_databases[0].database_id,'971ff2ce-5283-4df7-9ee4-a0deb0d558f9');
a.equal(c.previews?.vars?.CMS_ENVIRONMENT,'preview');
console.log('PASS separate Preview D1, no R2 subscription.');
NODE
echo 'Use only an existing ImageKit FOREVER FREE account. No paid plan, no card.'
IFS= read -r -s -p 'Paste ImageKit PRIVATE key here (hidden), then press Enter: ' IMAGEKIT_KEY
printf '\n'
# Android clipboard pastes can include leading/trailing spaces or CR. Never print the key.
IMAGEKIT_KEY="${IMAGEKIT_KEY#"${IMAGEKIT_KEY%%[![:space:]]*}"}"
IMAGEKIT_KEY="${IMAGEKIT_KEY%"${IMAGEKIT_KEY##*[![:space:]]}"}"
if [[ -z "$IMAGEKIT_KEY" ]]; then
  stop 'No characters received. At the hidden prompt, long-press and tap Paste, then Enter. Nothing is echoed.'
fi
if [[ "$IMAGEKIT_KEY" == public_* ]]; then
  stop 'You copied the PUBLIC key. In ImageKit Developer options → API keys, reveal/copy the PRIVATE key instead.'
fi
if [[ "$IMAGEKIT_KEY" != private_* ]]; then
  stop 'Copied value does not start with private_. Reveal and copy the entire Private API key (not an endpoint, account ID or masked stars).'
fi
if ! printf '%s' "$IMAGEKIT_KEY" | node -e '
let k="";process.stdin.setEncoding("utf8");process.stdin.on("data",s=>k+=s);
process.stdin.on("end",()=>{if(!(k.startsWith("private_")&&k.length>=12&&k.length<=512&&!k.includes(":")&&/^[\x21-\x7e]+$/.test(k)))process.exit(1)});
'; then
  stop 'Private key has whitespace or unsupported characters. Copy the raw key using ImageKit Copy, not the masked text.'
fi
echo 'PASS: Private-key input format accepted (credentials not printed).'

echo 'Set a NEW private PREVIEW Admin password now (20–256 characters). This affects Preview only.'
IFS= read -r -s -p 'New CornerSpan PREVIEW Admin password (hidden): ' PREVIEW_PASSWORD
printf '\n'
[[ $(printf '%s' "$PREVIEW_PASSWORD" | wc -c) -ge 20 && $(printf '%s' "$PREVIEW_PASSWORD" | wc -c) -le 256 ]] || stop 'Preview password must be 20–256 bytes.'
PREVIEW_CONFIRM=''
IFS= read -r -s -p 'Confirm the NEW PREVIEW password (hidden): ' PREVIEW_CONFIRM
printf '\n'
[[ "$PREVIEW_CONFIRM" == "$PREVIEW_PASSWORD" ]] || stop 'Preview passwords do not match; no remote changes.'
unset PREVIEW_CONFIRM
# Build an owner-only encrypted-secret payload before any Preview deployment.
printf '%s\0%s' "$PREVIEW_PASSWORD" "$IMAGEKIT_KEY" | node -e '
const crypto=require("node:crypto");let input="";
process.stdin.setEncoding("utf8");
process.stdin.on("data",b=>input+=b);
process.stdin.on("end",()=>{
 const p=input.split("\0");
 if(p.length!==2||p[0].length<20||p[0].length>256||!p[1].startsWith("private_")||p[1].length<12||p[1].length>512)process.exit(1);
 process.stdout.write(JSON.stringify({
  ADMIN_LOGIN_PASSWORD:p[0],
  ADMIN_SESSION_SECRET:crypto.randomBytes(48).toString("base64url"),
  IMAGEKIT_PRIVATE_KEY:p[1]
 }));
});' > "$TMP/preview-secrets.json" || stop 'Unable to prepare private Preview secrets.'
chmod 600 "$TMP/preview-secrets.json"
echo 'PASS: Preview-only password and ImageKit key prepared; no secrets printed.'
cd "$TMP/app"
npm install --no-package-lock --no-audit --no-fund || stop 'Clean npm install failed.'
npm run prebuild || stop 'Calculator prebuild failed.'
npm run build:cloudflare || stop 'Cloudflare build failed.'
[[ -s .open-next/worker.js ]] || stop 'Worker bundle missing.'
cd "$ROOT"
# A Preview redeploy may discard secrets set by earlier `preview secret put`.
# Deploy the code FIRST; then publish all three secrets together in one
# preview-secret-bulk operation to ensure they belong to the latest deployment.
"$WR" preview --name "$BRANCH" --worker-name "$WORKER" --config "$TMP/app/wrangler.jsonc" --message "ImageKit free image upload Preview $PIN" || stop 'Preview deployment failed.'
"$WR" preview secret bulk "$TMP/preview-secrets.json" --name "$BRANCH" --worker-name "$WORKER" --message "Preview-only authentication and ImageKit secrets after build" || stop 'Preview secret bulk failed; no Production changes.'
"$WR" preview secret list --name "$BRANCH" --worker-name "$WORKER" --json > "$TMP/preview-secret-names.json" || stop 'Cannot inspect Preview secret names.'
node - "$TMP/preview-secret-names.json" <<'NODE' || stop 'Required Preview secret names were not present; do not attempt login or release.'
const fs=require('node:fs'),a=require('node:assert/strict'),input=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const list=Array.isArray(input)?input:Array.isArray(input?.secrets)?input.secrets:input?.result;
a.ok(Array.isArray(list),'Unexpected secret-name listing');
const names=list.map(x=>typeof x==='string'?x:x?.name);
for(const key of ['ADMIN_LOGIN_PASSWORD','ADMIN_SESSION_SECRET','IMAGEKIT_PRIVATE_KEY']){
 a.ok(names.includes(key),'Preview secret not configured: '+key);
 console.log('PASS Preview secret PRESENT: '+key);
}
NODE
git show "$PIN:scripts/qa-imagekit-preview.cjs" > "$TMP/qa-imagekit-preview.cjs"
CMS_PREVIEW_URL="$PREVIEW_URL" CMS_PREVIEW_TEST_PASSWORD="$PREVIEW_PASSWORD" node "$TMP/qa-imagekit-preview.cjs" || stop 'Isolated real upload/CDN QA failed. Do not deploy Production.'
[[ "$(active)" == "$LIVE_VERSION" ]] || stop 'Unexpected Production active version change.'
echo 'PASS: New ImageKit upload works in isolated Preview; Live CornerSpan unchanged.'
echo 'Do not use any older production release script. New version requires an ImageKit key.'
