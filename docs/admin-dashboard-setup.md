# CornerSpan Admin Dashboard — NO Zero Trust billing authorization

**Status: feature branch / draft PR #4; NOT deployed.** The owner declined Cloudflare Zero Trust Free activation because its billing screen requires authorization for possible overages. **Do not activate Cloudflare Zero Trust.** This branch replaces Cloudflare Access with standalone password sign-in secured by a signed session cookie and D1 rate limiting.

## Already provisioned (verified by owner screenshots)

- Production D1 `cornerspan-admin` → `ADMIN_DB` binding.
- Preview D1 `cornerspan-admin-preview` → separate `ADMIN_DB` binding.
- Their real UUIDs are synchronized in `wrangler.jsonc`.
- In the **Preview** database, `admin_post_drafts` and `admin_published_posts` tables were created manually and verified by a read-only SQL query.
- **No production SQL tables have been verified.** No remote login/publishing tests have been run.

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
