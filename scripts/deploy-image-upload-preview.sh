#!/usr/bin/env bash
# Build and deploy only the isolated CornerSpan branch Preview after both private R2 buckets exist.
# Does not deploy Production, modify Production/Preview D1 records, rotate secrets or overwrite local edits.
set -euo pipefail
umask 077
ROOT=/workspaces/cornerspan
BRANCH=feature/posts-admin-dashboard
PIN=c54f1bfbb1960e3b016a8af2859f6a980aad2efd
WORKER=cornerspan
ACCOUNT=5a130ac4334b170f3f3472f3449841a8
PROD=cornerspan-cms-media
PREVIEW=cornerspan-cms-media-preview
stop(){ printf 'STOP: %s\n' "$*" >&2; exit 1; }
[[ -t 0 ]] || stop 'Use an interactive authenticated Codespace terminal.'
[[ "$(pwd -P)" == "$ROOT" ]] || stop "Run from $ROOT."
[[ "$(git branch --show-current)" == "$BRANCH" ]] || stop "Expected $BRANCH."
[[ "$(git remote get-url origin)" == *km7max-cmd/cornerspan* ]] || stop 'Unexpected Git origin.'
git cat-file -e "$PIN^{commit}" 2>/dev/null || stop 'Pinned feature commit unavailable; fetch first.'
[[ -x "$ROOT/node_modules/.bin/wrangler" ]] || stop 'Project Wrangler is missing.'
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT" CF_ACCOUNT_ID="$ACCOUNT" WRANGLER_SEND_METRICS=false
WR="$ROOT/node_modules/.bin/wrangler"
"$WR" whoami >/dev/null 2>&1 || stop 'Cloudflare authentication unavailable.'
for name in "$PREVIEW" "$PROD"; do "$WR" r2 bucket info "$name" >/dev/null || stop "R2 bucket missing/unavailable: $name"; done
echo 'PASS both separate private R2 buckets are available.'
TMP=$(mktemp -d);chmod 700 "$TMP"
trap 'rm -rf -- "$TMP"' EXIT
mkdir -p "$TMP/app"
git archive "$PIN" | tar -x -C "$TMP/app" || stop 'Could not copy clean Git files.'
node - "$TMP/app/wrangler.jsonc" <<'NODE' || stop 'Preview/Production binding mismatch.'
const c=require('node:fs').readFileSync(process.argv[2],'utf8');
const assert=require('node:assert/strict');
const x=JSON.parse(c);
assert.equal(x.name,'cornerspan');
assert.equal(x.r2_buckets?.[0]?.binding,'CMS_MEDIA_BUCKET');
assert.equal(x.r2_buckets[0].bucket_name,'cornerspan-cms-media');
assert.equal(x.previews?.r2_buckets?.[0]?.binding,'CMS_MEDIA_BUCKET');
assert.equal(x.previews.r2_buckets[0].bucket_name,'cornerspan-cms-media-preview');
assert.equal(x.d1_databases?.[0]?.database_name,'cornerspan-admin');
assert.equal(x.previews.d1_databases?.[0]?.database_name,'cornerspan-admin-preview');
console.log('PASS: Preview R2/D1 are isolated from Production.');
NODE
cd "$TMP/app"
npm install --no-package-lock --no-audit --no-fund || stop 'Install failed.'
npm run prebuild || stop 'Calculator data preparation failed.'
npm run build:cloudflare || stop 'Cloudflare build failed.'
[[ -s .open-next/worker.js ]] || stop 'OpenNext output missing.'
echo 'Uploading ONLY the feature branch Preview. Live Worker version is not being changed.'
"$ROOT/node_modules/.bin/wrangler" preview --name "$BRANCH" --worker-name "$WORKER" --config "$TMP/app/wrangler.jsonc" --message "CornerSpan R2 mobile image-upload Preview $PIN" || stop 'Preview upload failed.'
echo 'PASS: Preview deployment requested. Production Worker not deployed.'
echo 'Next: test private Preview Admin upload/image serving using a small disposable image and existing Preview password.'
