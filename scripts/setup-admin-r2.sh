#!/usr/bin/env bash
# CornerSpan: owner-run, opt-in provisioning of two PRIVATE R2 media buckets.
# Does not deploy a Worker, modify secrets, run D1 SQL or change existing posts.
set -euo pipefail
ROOT=/workspaces/cornerspan
ACCOUNT=5a130ac4334b170f3f3472f3449841a8
PREVIEW=cornerspan-cms-media-preview
PRODUCTION=cornerspan-cms-media
stop() { echo "STOP: $*" >&2; exit 1; }
[[ -t 0 ]] || stop 'Run in the authenticated Codespace terminal.'
[[ "$(pwd -P)" == "$ROOT" ]] || stop "Run from $ROOT."
[[ "$(git remote get-url origin)" == *km7max-cmd/cornerspan* ]] || stop 'Unexpected repository.'
[[ -x "$ROOT/node_modules/.bin/wrangler" ]] || stop 'Wrangler not installed.'
export CLOUDFLARE_ACCOUNT_ID="$ACCOUNT" CF_ACCOUNT_ID="$ACCOUNT" WRANGLER_SEND_METRICS=false
WR="$ROOT/node_modules/.bin/wrangler"
"$WR" whoami >/dev/null || stop 'Wrangler authentication is required.'
echo 'Checking account R2 access (read-only):'
"$WR" r2 bucket list || stop 'R2 is unavailable/not authorized. Enable/check Cloudflare R2 before any creation.'
printf '\nDesired separate, private buckets:\n  Preview: %s\n  Production: %s\n' "$PREVIEW" "$PRODUCTION"
echo 'Creating buckets can incur Cloudflare R2 storage and request charges. Check your account pricing.'
echo 'This script does not make either bucket publicly accessible and does not deploy the site.'
read -r -p 'Type CREATE CORNERSPAN R2 to permit missing bucket creation: ' ANSWER
[[ "$ANSWER" == "CREATE CORNERSPAN R2" ]] || stop 'Cancelled; no R2 write requested.'
for name in "$PREVIEW" "$PRODUCTION"; do
  if "$WR" r2 bucket info "$name" >/dev/null 2>&1; then
    echo "EXISTS: $name"
  else
    echo "Creating private bucket: $name"
    "$WR" r2 bucket create "$name" || stop "Creation failed for $name. Verify R2 status; do not retry blindly."
    "$WR" r2 bucket info "$name" >/dev/null || stop "Could not verify newly created $name."
    echo "CREATED: $name"
  fi
done
echo 'PASS: Separate private R2 buckets exist. Live Worker has NOT been changed.'
echo 'Next gate: Preview Worker with CMS_MEDIA_BUCKET -> Preview bucket; test upload/display; only then stage Production candidate.'
