#!/usr/bin/env bash
# Owner-run CornerSpan release candidate preparation.
# Uploads reviewed code + two encrypted admin secrets in ONE UNDEPLOYED Worker version.
# No deployment, PR merge, D1 mutation, or modification of the owner's local checkout.
set -euo pipefail
umask 077
ROOT=/workspaces/cornerspan
BRANCH=feature/posts-admin-dashboard
PIN=062419126fa6ecd702823d0d18499de9dae8011f
WORKER=cornerspan
ACCOUNT=5a130ac4334b170f3f3472f3449841a8
ACTIVE=da4e7677-f159-4989-a9f1-d3ac60fbfcfc
PROD_DB=4a41a0ba-360b-4c45-8929-1d21445eb5a0
fail() { printf '\nSTOP: %s\n' "$*" >&2; exit 1; }
[[ -t 0 ]] || fail 'Run interactively in the authenticated Codespace.'
[[ "$(pwd -P)" == "$ROOT" ]] || fail "Must run in $ROOT."
[[ "$(git branch --show-current)" == "$BRANCH" ]] || fail 'Not on expected feature branch.'
[[ "$(git remote get-url origin)" == *km7max-cmd/cornerspan* ]] || fail 'Unexpected Git origin.'
git cat-file -e "$PIN^{commit}" 2>/dev/null || fail 'Pinned reviewed commit missing. Fetch feature branch first.'
command -v npm >/dev/null || fail 'npm missing.'
command -v node >/dev/null || fail 'Node.js missing.'
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT" CF_ACCOUNT_ID="$ACCOUNT" WRANGLER_SEND_METRICS=false
[[ -x "$ROOT/node_modules/.bin/wrangler" ]] || fail 'Please install project dependencies in existing Codespace first.'
WR="$ROOT/node_modules/.bin/wrangler"
"$WR" whoami >/dev/null 2>&1 || fail 'Wrangler authentication is not available.'
TMP=$(mktemp -d)
chmod 700 "$TMP"
PASSWORD=''
cleanup() { PASSWORD=''; unset PASSWORD CMS_PREVIEW_TEST_PASSWORD || true; rm -rf -- "$TMP"; }
trap cleanup EXIT
mkdir -p "$TMP/candidate"
git archive "$PIN" | tar -x -C "$TMP/candidate" || fail 'Could not extract clean pinned Git commit.'
node - "$TMP/candidate/wrangler.jsonc" "$PROD_DB" <<'NODE' || fail 'Candidate Wrangler config differs from reviewed production target.'
const fs=require('node:fs'),assert=require('node:assert/strict');
const config=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
assert.equal(config.name,'cornerspan');
const db=config.d1_databases?.find(x=>x.binding==='ADMIN_DB');
assert.equal(db?.database_name,'cornerspan-admin');
assert.equal(db?.database_id,process.argv[3]);
assert.deepEqual([...config.secrets.required].sort(),['ADMIN_LOGIN_PASSWORD','ADMIN_SESSION_SECRET']);
assert.equal(config.previews?.d1_databases?.[0]?.database_name,'cornerspan-admin-preview');
console.log('PASS pinned code config: Production D1 ID, Worker name and required secrets.');
NODE
active_version() {
  "$WR" deployments list --name "$WORKER" --json | node -e '
const fs=require("node:fs");
let raw=JSON.parse(fs.readFileSync(0,"utf8"));if(!Array.isArray(raw)||!raw.length) process.exit(2);
raw.sort((a,b)=>Date.parse(a.created_on)-Date.parse(b.created_on));
let v=raw.at(-1).versions;
if(!Array.isArray(v)||v.length!==1||v[0].percentage!==100) process.exit(3);
process.stdout.write(v[0].version_id);
'
}
ORIGINAL=$(active_version) || fail 'Active version could not be verified.'
[[ "$ORIGINAL" == "$ACTIVE" ]] || fail "Production active version changed; expected $ACTIVE. No upload."
echo "Active Production Worker remains: $ACTIVE (100%)"
echo "Extracted clean reviewed commit: $PIN; working tree and uncommitted files untouched."
cd "$TMP/candidate"
npm install --no-package-lock --no-audit --no-fund || fail 'Clean dependency install failed.'
npm run build:cloudflare || fail 'Clean Cloudflare build failed.'
[[ -s .open-next/worker.js ]] || fail 'Cloudflare Worker output missing.'
printf '\nA new Worker version will be UPLOADED but NOT DEPLOYED.\n'
printf 'Enter a NEW Production Admin login password (20-256 characters). Keep it private.\n'
IFS= read -r -s -p 'Production Admin password (hidden): ' PASSWORD
printf '\n'
[[ ${#PASSWORD} -ge 20 && ${#PASSWORD} -le 256 ]] || fail 'Password must contain 20-256 characters.'
printf '%s' "$PASSWORD" | node -e '
let p="";
process.stdin.on("data",part=>p+=part);
process.stdin.on("end",()=>{
 if(p.length<20||p.length>256) process.exit(2);
 const secret=require("node:crypto").randomBytes(48).toString("base64url");
 process.stdout.write(JSON.stringify({ADMIN_LOGIN_PASSWORD:p,ADMIN_SESSION_SECRET:secret}));
});
' > "$TMP/secrets.json" || fail 'Could not construct temporary encrypted-secret input.'
PASSWORD=''
unset PASSWORD
chmod 600 "$TMP/secrets.json"
printf '\nUploading pinned reviewed candidate WITH both secrets; no traffic change...\n'
"$ROOT/node_modules/.bin/wrangler" versions upload --name "$WORKER" --config "$TMP/candidate/wrangler.jsonc" --secrets-file "$TMP/secrets.json" --message "CornerSpan Admin SEO Content Studio candidate $PIN"
cd "$ROOT"
AFTER=$(active_version) || fail 'Upload finished, but active Production version cannot be rechecked.'
[[ "$AFTER" == "$ORIGINAL" ]] || fail "ALERT: Active Production Worker changed from $ORIGINAL to $AFTER. Inspect immediately."
printf '\nPASS: Candidate uploaded; Production Worker still %s at 100%%.\n' "$ACTIVE"
printf 'Do NOT run wrangler deploy/versions deploy, promote any secret-only version, or merge PR #4.\n'
printf 'Next: inspect uploaded candidate version bindings, code lineage, routes and rollback before release.\n'
