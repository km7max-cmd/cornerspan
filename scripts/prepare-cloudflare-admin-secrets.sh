#!/usr/bin/env bash
# Owner-run Cloudflare setup: creates two NEW Worker versions containing encrypted
# secrets, but NEVER deploys, promotes, or modifies the active production Worker.
# Requires a private terminal (GitHub Codespaces or a trusted local computer).
set -euo pipefail

WORKER="cornerspan"
WRANGLER=(npx --yes wrangler@latest)

if ! command -v npx >/dev/null 2>&1; then
  echo "Node.js/npm is required. Open the CornerSpan GitHub Codespace terminal."
  exit 1
fi

echo "CornerSpan secure production secret preparation"
echo "Worker: ${WORKER}"
echo "IMPORTANT: This script does NOT deploy or change the running website."
echo "Do not post your login approval code, password or session secret in chat."
echo

if ! "${WRANGLER[@]}" whoami >/dev/null 2>&1; then
  echo "Cloudflare sign-in is required. Authorize from your browser yourself."
  "${WRANGLER[@]}" login --device --browser=false
fi

echo
echo "1/2: Enter a private, strong login password when Wrangler asks."
"${WRANGLER[@]}" versions secret put ADMIN_LOGIN_PASSWORD --name "${WORKER}"

echo
echo "2/2: Enter a DIFFERENT, randomly generated session secret (32+ chars)."
"${WRANGLER[@]}" versions secret put ADMIN_SESSION_SECRET --name "${WORKER}"

echo
echo "Both commands completed. New Worker version(s) were prepared."
echo "The live cornerspan.com deployment was NOT changed by this script."
echo "Do not run 'wrangler deploy' or 'wrangler secret put'."
echo "Production D1 schema and safe Preview publication still need verification."
