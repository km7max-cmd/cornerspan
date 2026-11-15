#!/usr/bin/env bash
# Owner-run, Preview-only acceptance. Rotates only the isolated feature Preview secrets.
# No production deployment, database migration or existing article mutation.
set -euo pipefail

WORKER='cornerspan'
PREVIEW='feature/posts-admin-dashboard'
ORIGIN='https://feature-posts-admin-dashboard-cornerspan.eenadutech.workers.dev'
QA_COMMIT='6c2c3f3fb8c1e25876ceb51e1275c69e241aea95'

if [[ "$(pwd -P)" != '/workspaces/cornerspan' ]] || [[ "$(git branch --show-current)" != "$PREVIEW" ]]; then
  echo 'STOP: Run from /workspaces/cornerspan on feature/posts-admin-dashboard.' >&2
  exit 1
fi
if ! command -v node >/dev/null || ! command -v npx >/dev/null; then
  echo 'STOP: Node.js and npx are required in the authenticated Codespace.' >&2
  exit 1
fi
if ! NODE_PATH="$PWD/node_modules" node -e "require('jsdom')" >/dev/null 2>&1; then
  echo 'STOP: jsdom is unavailable. Install the reviewed project dependencies before retrying.' >&2
  exit 1
fi
if ! npx --no-install wrangler whoami >/dev/null 2>&1; then
  echo 'STOP: Wrangler is not authenticated in this Codespace.' >&2
  exit 1
fi
if ! git cat-file -e "$QA_COMMIT:scripts/qa-admin-preview.cjs" 2>/dev/null; then
  echo 'STOP: Reviewed Preview QA script is not available. Fetch the feature branch first.' >&2
  exit 1
fi

TMPDIR=$(mktemp -d)
PASSWORD=''
cleanup() {
  unset PASSWORD CMS_PREVIEW_TEST_PASSWORD || true
  rm -rf -- "$TMPDIR"
}
trap cleanup EXIT

git show "$QA_COMMIT:scripts/qa-admin-preview.cjs" > "$TMPDIR/qa-admin-preview.cjs"
node --check "$TMPDIR/qa-admin-preview.cjs" >/dev/null

printf '\nThis changes ONLY the named Cloudflare Preview, not Production.\n'
printf 'Both Preview login secrets will be rotated and existing Preview admin sessions invalidated.\n'
printf 'Choose and remember a NEW Preview admin password (20-256 characters). Do not share it in chat.\n'
IFS= read -r -s -p 'New Preview password (input hidden): ' PASSWORD
printf '\n'
if [[ ${#PASSWORD} -lt 20 || ${#PASSWORD} -gt 256 ]]; then
  echo 'STOP: Password length must be 20-256 characters.' >&2
  exit 1
fi

printf '\nUpdating the named Preview password (encrypted secret)...\n'
printf '%s' "$PASSWORD" | npx --no-install wrangler preview secret put ADMIN_LOGIN_PASSWORD --name "$PREVIEW" --worker-name "$WORKER"
printf '\nRotating the named Preview session-signing secret...\n'
node -e "process.stdout.write(require('node:crypto').randomBytes(48).toString('base64url'))" \
  | npx --no-install wrangler preview secret put ADMIN_SESSION_SECRET --name "$PREVIEW" --worker-name "$WORKER"

printf '\nRunning remote isolated Preview D1 acceptance; test records will be cleaned up.\n'
CMS_PREVIEW_URL="$ORIGIN" CMS_PREVIEW_TEST_PASSWORD="$PASSWORD" NODE_PATH="$PWD/node_modules" \
  node "$TMPDIR/qa-admin-preview.cjs"
printf '\nPASS: Preview acceptance completed. No Production deployment or migration requested.\n'
