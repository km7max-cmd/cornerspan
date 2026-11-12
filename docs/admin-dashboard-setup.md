# CornerSpan Admin Dashboard — production release gate

**11 November 2026 status:** Cloudflare **Preview** login, admin dashboard and mobile New Draft editor were verified by screenshots; the owner reported **PASS** from the one-click actual Preview D1 storage test, which writes, reads and deletes a temporary unpublished draft. GitHub CI passed migrations, security/API tests, React UI workflow simulations, builds and site SEO/mobile regression checks. **PR #4 remains draft and unmerged. Production is unchanged.**

## Remaining production-release blockers (do not bypass)

1. Production D1 cornerspan-admin has not been verified to contain all three tables: admin_post_drafts, admin_published_posts, admin_login_attempts. The idempotent schema is in migrations/; the CI migration suite validates schema and repeat application. Never drop existing tables.
2. Production Worker needs encrypted runtime secrets ADMIN_LOGIN_PASSWORD and ADMIN_SESSION_SECRET. These secrets are not present or verified in Production. Do not send passwords, secret values, or session tokens through GitHub or ChatGPT.
3. Real Cloudflare Preview *publish/unpublish* has not been remotely verified. CI tests publish/unpublish against an isolated test SQLite database and mock browser state, not the owner's Cloudflare D1.
4. After the above: verify SEO/canonicals, sitemap, existing 21 posts, calculators, production login and an actual controlled deployment. **Do not deploy or merge until gates have been verified.**
5. There is no connected Cloudflare management tool for account-wide SQL execution, secrets or deploy changes. GitHub CI cannot substitute for production account credentials.

The owner asked to avoid repeated manual checks. Do not re-request already completed Preview login, editor or private draft-storage tests.

---

**Status: feature branch / draft PR #4; deployed to Preview only, NOT Production.** The owner declined Cloudflare Zero Trust Free activation because its billing screen requires authorization for possible overages. **Do not activate Cloudflare Zero Trust.** This branch replaces Cloudflare Access with standalone password sign-in secured by a signed session cookie and D1 rate limiting.

## Already provisioned (verified by owner screenshots)

- Production D1 `cornerspan-admin` → `ADMIN_DB` binding.
- Preview D1 `cornerspan-admin-preview` → separate `ADMIN_DB` binding.
- Their real UUIDs are synchronized in `wrangler.jsonc`.
- In the **Preview** database, `admin_post_drafts` and `admin_published_posts` tables were created manually and verified by a read-only SQL query.
- The owner reported applying login limiter SQL on Preview. The working Preview login and successful authenticated D1 self-test indicate the limiter and draft tables were operational, but do not prove Production configuration.
- The owner has saved both `ADMIN_LOGIN_PASSWORD` and `ADMIN_SESSION_SECRET` as encrypted **Previews Base** secrets (verified by Cloudflare screenshot); Production has not been configured.
- **No production SQL tables have been verified.** Remote Preview login and temporary D1 draft-storage test were reported successful; remote Preview publishing is not verified.

## Cloudflare Community support request

The account owner submitted a public Cloudflare Workers community topic describing the repeatable Production variable/secret save/delete failure: https://community.cloudflare.com/t/cloudflare-worker-variables-fail-to-save-or-delete-try-again-error/979737

On 12 November 2026, the thread URL was provided, but replies were not retrievable in the available research session. **Do not assume Cloudflare confirmed a root cause or remedy.** Keep Production release gated; review any future reply before attempting a live configuration change. Do not publicly reveal credentials, account tokens or secret values.

---

## Production setup blocker observed 11 November 2026

Cloudflare Dashboard **Production → Add variable and deploy** repeatedly returned **"Try again"** when the owner attempted to add encrypted Admin secrets. Retrying with Chrome and Firefox did not resolve the error. **Production secrets have NOT been verified**. A manually created Production dashboard deployment was also observed, while GitHub main had no corresponding admin login route: treat the active Production Worker code and source branch as potentially different.

Do not retry the same failing UI indefinitely, commit secret values to GitHub, put an admin password into a plaintext Worker variable, or guess whether a secret was stored. Do not add deployment credentials or API tokens to this repository just to bypass the problem.

Cloudflare's supported alternative is an **authenticated** Wrangler session on the owner's device or secure environment. The following commands prompt privately for secret values and create new versions **without immediately deploying them**:

\`\`\`sh
npx wrangler versions secret put ADMIN_LOGIN_PASSWORD --name cornerspan
npx wrangler versions secret put ADMIN_SESSION_SECRET --name cornerspan
\`\`\`

\`wrangler secret put\` (without \`versions\`) **deploys immediately** and should not be used while the production deployment is unverified. \`wrangler versions secret put\` still changes Cloudflare account configuration, so it requires the account holder's own authorization. The ChatGPT GitHub connector cannot run those authenticated commands remotely.

Prior to any merge or release, independently inspect Production secret names/types, verify its separate D1 tables with the query below, confirm current Worker version/source, complete Preview publish/unpublish and rollback plan, and recheck SEO.

\`\`\`sql
SELECT name FROM sqlite_master
WHERE type = 'table' AND name IN
('admin_post_drafts','admin_published_posts','admin_login_attempts')
ORDER BY name;
\`\`\`

**Source docs:** https://developers.cloudflare.com/workers/configuration/secrets/ and https://developers.cloudflare.com/workers/wrangler/commands/workers/

---

## Login design (no external paid login provider)

- `/admin/login`: password form.
- `/api/admin/login`: verifies password against Cloudflare Secret and issues an 8-hour signed cookie.
- `/api/admin/logout`: clears the cookie.
- The session cookie is `__Host-cornerspan_admin`, HttpOnly, Secure and SameSite=Strict.
- All draft, preview and publishing routes check the signed cookie on the server.
- Login attempts are restricted to **5 requests per IP per 15 minutes**, using a D1-backed atomic counter. Missing D1 table/configuration fails closed (login disabled).
- Content-changing routes also check Origin; the login API checks it too.
- Removing or changing `ADMIN_SESSION_SECRET` invalidates all active sessions.

**Important limitation:** This is single-password authentication, not MFA. Use a unique random 24–32+ character password, never reuse a Gmail or Cloudflare password, and never send it via chat. A strong password and rate limits help but cannot offer the same phishing resistance as passkeys/MFA. For public production launch, run a security review.

## Required Cloudflare Worker secrets

In **Workers & Pages → cornerspan → Settings → Runtime variables and secrets → Add variable**, choose **Secret** type for *both* items:

1. `ADMIN_LOGIN_PASSWORD`: a unique, randomly generated, **at least 20-character** password chosen by the owner.
2. `ADMIN_SESSION_SECRET`: a **different independent random secret**, at least 32 characters.

Store these only in the Cloudflare encrypted Secret fields (not in plaintext variables, GitHub, screenshots, or ChatGPT messages). When Cloudflare prompts to **Deploy** after saving secrets, treat that as a Worker version change. Configure and test the Preview environment before deploying a code change to production.

Never set `CF_ACCESS_TEAM_DOMAIN`, `CF_ACCESS_AUD`, or `CF_ACCESS_ADMIN_EMAIL` for this new login implementation; those old values are no longer needed.

## Apply the D1 login limiter migration — preview first

The existing **Preview** D1 database already has the two article tables; create the third table using **Preview D1 → Console**:

```sql
CREATE TABLE IF NOT EXISTS admin_login_attempts (
  fingerprint TEXT PRIMARY KEY NOT NULL,
  window_start INTEGER NOT NULL,
  attempts INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_window
  ON admin_login_attempts(window_start);
```

Verify with:

```sql
SELECT name FROM sqlite_master
WHERE type='table' AND name IN
('admin_post_drafts','admin_published_posts','admin_login_attempts');
```

Only after authorized preview testing passes should the same three-table schema be applied to **Production**, via `npx wrangler d1 migrations apply cornerspan-admin --remote` (with authenticated Wrangler), or the corresponding SQL through the Production D1 Console. Do not drop/recreate existing tables.

## Preview setup confirmation — 10 November 2026

Cloudflare Dashboard screenshots now show the **Previews Base → Builds** tab with:
- Builds for Preview branches: enabled
- Build command: `npx opennextjs-cloudflare build`
- Preview command: `npx wrangler preview`
- Production branch remains `main`
- Preview Runtime Secrets were saved encrypted in Previews Base; those are not Build-time variables
- Cloudflare Preview deployment was confirmed Ready and authenticated login/editor worked; a separate earlier Dashboard timeout did not prevent those tests.

This commit on the feature branch may trigger a new Preview build now that branch previews are enabled. Verify success and obtain the actual Preview URL from Cloudflare Worker → Previews / Deployments; do not infer the URL or assume a successful deploy. Do not merge the draft PR before remote smoke testing.

## One-time Worker Previews setup (do not switch without verifying the dialog)

Worker Previews were activated and verified through Cloudflare's Deployments view. Cloudflare states that upgrading an existing Workers Builds workflow to Worker Previews **cannot be reversed**. The project requires Wrangler 4.135.0+; the feature branch sets that minimum version.

- **First inspect** the Set up dialog; review preview build command. It must publish through `npx wrangler preview` and must follow the existing `npx opennextjs-cloudflare build` build command.
- Never change the Production branch from `main`, the production deployment command, or the custom domain.
- Confirm the Previews Base binding points to `cornerspan-admin-preview`; Preview secrets are encrypted.
- Cloudflare warns Worker Preview URLs are **public by default**. The admin paths use authenticated sessions, but test articles can be publicly accessible at Preview URLs. Use only nonsensitive test articles; public `workers.dev` Preview URLs have a noindex response header. No Zero Trust activation is needed solely to inspect public test content.
- **Do not try to re-enable or switch previews again:** migration to Worker Previews already occurred.
- Do not merge the feature PR, change Production deployment or modify existing public articles before remote Preview testing.

Official documentation: https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/ and https://developers.cloudflare.com/workers/previews/

## Protected Preview testing checklist

1. Preview `ADMIN_DB` must point at `cornerspan-admin-preview`, not the production DB.
2. Preview Worker must have both secrets configured without printing them.
3. Verify unauthenticated `/admin` redirects to `/admin/login` and draft/publication APIs return 401.
4. Verify sign in with correct password, HTTP-only cookie, and incorrect-password throttling.
5. Verify signed out sessions cannot read, save, preview or publish.
6. Verify Draft Save → Reload → Preview → Publish and Unpublish using a **new test post** only.
7. Verify public blog URLs, canonical metadata, sitemap and calculators still work.
8. Verify preview domain itself does not unintentionally serve publicly indexable test content. Do not publish test posts into Production.
9. Complete security/SEO review and verify GitHub Actions pass before merging.

## GitHub validation

```sh
python3 scripts/test-admin-migrations.py
node scripts/test-admin-behavior.cjs
npm run prebuild
npx tsc --noEmit
npm run build
node scripts/qa-admin-security.cjs
```

PR #4 must stay draft/unmerged until real Preview tests pass. Existing published posts and AdSense-review content were not intentionally edited by this branch.

## Pricing caution

Avoiding Zero Trust activation avoids its **separate** overage authorization. It does **not** make all Workers/D1 account usage free forever. Review the existing Cloudflare Workers/D1 plan, usage and account billing settings separately. Never enable paid upgrades or authorize overage charges for this setup.

Useful official docs:
- https://developers.cloudflare.com/workers/configuration/secrets/
- https://developers.cloudflare.com/d1/platform/pricing/
