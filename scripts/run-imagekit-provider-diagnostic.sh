#!/usr/bin/env bash
# Private-key-safe ImageKit provider diagnostic; NO Cloudflare deploy, D1 writes or billing changes.
set -euo pipefail
umask 077
ROOT=/workspaces/cornerspan
PIN=a76a54f16661d5ee0c1b504231ec024d94d67980
[[ -t 0 && "$(pwd -P)" == "$ROOT" ]] || { echo "STOP: Run in authenticated CornerSpan Codespace $ROOT." >&2; exit 1; }
git cat-file -e "$PIN^{commit}" 2>/dev/null || { echo 'STOP: Fetch the feature branch first.' >&2; exit 1; }
TMP=$(mktemp -d)
chmod 700 "$TMP"
IMAGEKIT_KEY=''
cleanup(){ unset IMAGEKIT_KEY; rm -rf -- "$TMP"; }
trap cleanup EXIT
git show "$PIN:scripts/diagnose-imagekit-provider.cjs" > "$TMP/diag.cjs"
node --check "$TMP/diag.cjs" || { echo 'STOP: Diagnostic syntax check failed.' >&2; exit 1; }
echo 'This test first checks ImageKit account access read-only. Only if it succeeds, it uploads ONE 64x64 PNG to ImageKit under /cornerspan.'
echo 'No Cloudflare Worker/Preview/Production modifications, no new billing, no secrets displayed.'
IFS= read -r -s -p 'Paste ImageKit PRIVATE API key (hidden), then Enter: ' IMAGEKIT_KEY
printf '\n'
printf '%s' "$IMAGEKIT_KEY" | node "$TMP/diag.cjs"
