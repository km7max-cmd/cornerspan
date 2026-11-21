# CornerSpan phone image upload — ImageKit Forever Free (no billing)

**Status:** All source code and isolated tests are on GitHub PR #4. This integration is **not live** until the owner creates/connects an ImageKit account and the real Preview and Production release gates succeed. PR #4 is still draft; no merge required for Cloudflare Worker version promotion.

## Cloudflare Worker upload HTTP 503 correction (18 November 2026)

ImageKit key authentication HTTP 200, direct ImageKit upload HTTP 200, trusted CDN response HTTP 200, and Preview admin auth/image MIME tests all passed. Yet real Preview upload POST returned HTTP 503. Root cause identified in the earlier upload adapter: Cloudflare Workers does not support `redirect: 'error'` on `fetch`; it throws a `TypeError` before sending the request. Official documentation: https://developers.cloudflare.com/workers/runtime-apis/request/#parameters . The Worker adapter now uses `redirect: 'manual'` and explicitly accepts only HTTP 200/201, refusing any 3xx redirect. Isolated regression tests cover both. The pinned Preview source and guarded full release command are updated.

**Important:** This is an evidence-based code correction, not yet a verified remote Preview upload. Do not call Live complete until a freshly deployed Preview achieves real ImageKit POST 201 and CDN GET 200, followed by explicit owner release approval and Live smoke checks.

## Why ImageKit

ImageKit's **Forever Free** plan includes **3 GB fixed media storage** and **20 GB/month image delivery**. Signing up for this plan does not require a credit card. On free-plan limits, storage uploads or image delivery *stop* until capacity is freed or the monthly period resets. **Media delivery may fail publicly if the monthly bandwidth limit is hit**, so monitor traffic. Do not switch to Lite/Pro, enter a card, or enable Cloudflare R2. Confirm plan selection before any connection.

Official pricing: https://imagekit.io/plans/
Key docs: https://imagekit.io/docs/api-keys/

## Owner-only account action

1. Open https://imagekit.io/plans/ and create or sign into an account on **Forever Free ($0, no credit card)**; verify the email and complete initial setup.
2. In ImageKit **Developer options → API Keys**, view the **private API key**, beginning with `private_`. Do **not** paste it into ChatGPT, email, GitHub, or screenshots. Do not publish it as a browser environment variable.
3. Open the existing authenticated CornerSpan GitHub Codespace. Use tmux so Android SSH disconnection does not interrupt a deployment.

### One-command guarded completion

Within `/workspaces/cornerspan` on `feature/posts-admin-dashboard`:

```bash
cd /workspaces/cornerspan && git fetch origin feature/posts-admin-dashboard && git show 60a4121cffcd2b351d32f5ad7b7ee97c2c369890:scripts/complete-imagekit-release.sh > /tmp/cornerspan-imagekit.sh && bash -n /tmp/cornerspan-imagekit.sh && bash /tmp/cornerspan-imagekit.sh
```

The script uses reviewed, **pinned Git application code**, not the owner's four uncommitted files. It requires the expected Cloudflare account and Worker, separate D1 Preview binding, active Live Worker version, and absence of any R2 subscription. It asks privately **in the terminal only** for (a) ImageKit private key, (b) existing Preview admin password, and (c) Production admin password (can be rotated; keep it safe). Both secret values remain out of GitHub and ChatGPT. It does not request any billing action.

**Preview login 401 recovery:** The script now asks for a **NEW Preview Admin password** twice in hidden terminal prompts, creates a fresh Preview session-signing secret, and applies all three Preview secrets **after** the code Preview deploy via one `wrangler preview secret bulk`. It verifies the three secret names and tests authenticated Preview login before touching any Production Worker version. The previous Preview password is intentionally replaced; **Production credentials remain unchanged until the explicit production release**.

Execution sequence:
1. Verify the old Worker is still Live at 100%.
2. Build isolated Preview from pinned Git, set the ImageKit key as a **Preview-only Cloudflare secret**, and deploy the Preview.
3. Log into Preview with the owner-entered Preview password, verify authenticated/anonymous security, upload an extremely small disposable PNG and confirm its ImageKit CDN URL is publicly retrievable. Preview data remains isolated. No existing content is edited.
4. Build and stage a **new undeployed Production Worker version** including all **three** encrypted secrets: `ADMIN_LOGIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `IMAGEKIT_PRIVATE_KEY`. The Production password is owner-entered (not readable from Cloudflare); the signing secret is generated securely anew.
5. Confirm uploaded version's Production D1 binding, all three secret names, build source Git SHA, runtime compatibility, absence of R2 binding, five public route metadata comparisons, and Cloudflare dry-run.
6. Ask for the **explicit** terminal phrase `DEPLOY CORNERSPAN IMAGEKIT`. Prior to this confirmation, no Live traffic changes. After consent, promote the **already-reviewed** version to 100% and smoke-test seven public pages, the admin login page, sitemap, and anonymous API restrictions.
7. On a failed post-release smoke, attempt to restore the previous Worker version. Any rollback must be checked on Cloudflare; it does not modify D1.

If `STOP`, `ERROR`, or `ROLLBACK` appears, **do not rerun blindly**. Record the screen/output without exposing passwords or private keys.

## Storage design and site behavior

- Administrator uses **Upload from device** on Android/desktop; JPG, PNG, WebP, up to 5 MB (with a hard server cap and magic-byte checks).
- Upload reaches an authenticated, same-origin **Cloudflare Worker server route**. The private ImageKit key is used *only* server-side; no browser receives it.
- ImageKit stores files under a distinct `/cornerspan/` folder and responds with an HTTPS CDN URL, validated before saving.
- The existing Media Library stores image URL, filename/title, ALT, caption, source URL, link URL, width and height. It supports reuse as a featured image or inline article image and retains revisions.
- Existing Image URL entry remains available. Existing articles, SEO, calculator content, and AdSense review are not changed by the setup.
- Media-record removal **does not delete remote ImageKit files** because already-published articles may still reference the URL. Reclaim storage through ImageKit's own dashboard only after verifying it is unused.
- No Cloudflare R2 billing or new D1 media migration is required. The optional smaller D1 fallback remains disabled until its separate additive migration is expressly approved.

**Do not claim Live image-upload success until the script's remote Preview and Live terminal PASS output is actually observed.** If the ImageKit Free account is not created/connected, there is no safe way for the GitHub integration alone to complete the external upload.

## Troubleshooting

- `Connection to localhost closed`: SSH disconnected; reconnect with `gh codespace ssh -R km7max-cmd/cornerspan`, then reattach an existing tmux session.
- `No characters received`: Android paste did not reach the SSH terminal. Copy again, long-press at the hidden input prompt, select **Paste**, then press Enter. The pasted characters will not be displayed.
- `You copied the PUBLIC key`: go to Developer options → API Keys, reveal the **Private API Key** (eye control), copy the entire value beginning with `private_`.
- `does not start with private_`: you may have copied the URL endpoint, account ID or masked placeholder; do not paste it into chat. Reveal/copy the actual private key.
- The current setup now accepts any printable, nonwhitespace ASCII suffix supported by the documented `private_` key prefix, rather than guessing an overly narrow alphabet.
- Never paste screenshots that reveal a private key or send the key to ChatGPT.
- `uploadAvailable: false`: account secret not provisioned in the active worker version; image URL is still supported.
- `ImageKit limit reached`: stay on Forever Free; resize images, remove unused ImageKit media, or wait for the bandwidth reset. Do not enable paid overages.
- Cloudflare Production login fails: save/enter the Production Admin password selected during the release, and remember that new signing secret invalidates previous sessions.
