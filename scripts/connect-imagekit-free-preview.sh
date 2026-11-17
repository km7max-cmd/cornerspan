#!/usr/bin/env bash
# Owner-run ImageKit Forever Free hookup and real isolated Preview upload acceptance.
# No subscription, billing, Production deployment, PR merge or Production D1 changes.
set -euo pipefail
umask 077
ROOT=/workspaces/cornerspan
BRANCH=feature/posts-admin-dashboard
PIN=55913f89557425bda6b7999dc54ced6e4197f1a0
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
IFS= read -r -s -p 'ImageKit PRIVATE key (hidden, enter only here): ' IMAGEKIT_KEY
printf '\n'
[[ "$IMAGEKIT_KEY" =~ ^private_[a-zA-Z0-9_-]{8,200}$ ]] || stop 'Invalid ImageKit key; no remote changes.'
IFS= read -r -s -p 'CornerSpan PREVIEW Admin password (hidden): ' PREVIEW_PASSWORD
printf '\n'
[[ $(printf '%s' "$PREVIEW_PASSWORD" | wc -c) -ge 20 ]] || stop 'Preview password length incorrect.'
cd "$TMP/app"
npm install --no-package-lock --no-audit --no-fund || stop 'Clean npm install failed.'
npm run prebuild || stop 'Calculator prebuild failed.'
npm run build:cloudflare || stop 'Cloudflare build failed.'
[[ -s .open-next/worker.js ]] || stop 'Worker bundle missing.'
cd "$ROOT"
printf '%s' "$IMAGEKIT_KEY" | "$WR" preview secret put IMAGEKIT_PRIVATE_KEY --name "$BRANCH" --worker-name "$WORKER" || stop 'Preview secret update failed.'
"$WR" preview --name "$BRANCH" --worker-name "$WORKER" --config "$TMP/app/wrangler.jsonc" --message "ImageKit free image upload Preview $PIN" || stop 'Preview deployment failed.'
git show "$PIN:scripts/qa-imagekit-preview.cjs" > "$TMP/qa-imagekit-preview.cjs"
CMS_PREVIEW_URL="$PREVIEW_URL" CMS_PREVIEW_TEST_PASSWORD="$PREVIEW_PASSWORD" node "$TMP/qa-imagekit-preview.cjs" || stop 'Isolated real upload/CDN QA failed. Do not deploy Production.'
[[ "$(active)" == "$LIVE_VERSION" ]] || stop 'Unexpected Production active version change.'
echo 'PASS: New ImageKit upload works in isolated Preview; Live CornerSpan unchanged.'
echo 'Do not use any older production release script. New version requires an ImageKit key.'
