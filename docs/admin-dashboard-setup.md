# CornerSpan Admin Dashboard — deployment and verification

**Status:** Feature branch `feature/posts-admin-dashboard`, draft PR #4. **Not deployed to production.**
Existing calculators, article slugs and live published content are untouched until merge and deployment.

## What the feature implements

- `/admin`: searchable existing posts, new draft editor, SEO title/description, category/tags and Markdown body editor.
- Cloudflare Access JWT signature + issuer + AUD + expiry + exact owner email validation on server. No configuration = access denied.
- `/api/admin/drafts`: protected CRUD draft storage with revision checks in Cloudflare D1.
- `/admin/preview/[slug]`: authenticated saved-draft preview.
- `/api/admin/publish`: protected publish, status and unpublish APIs.
- Publishing checks draft and publication revisions in the same SQL write; stale publish/unpublish requests return 409.
- `/blog/[slug]`, `/blog`, categories/tags and `/sitemap.xml`: D1 published records overlay existing content.
- New posts require substantial content with section headings. URL slugs for existing posts remain locked.
- Existing structured articles can receive metadata-only updates while keeping the original body.
- To replace an existing article body, the editor requires a deliberate checkbox and a full Markdown replacement.
- Dedicated legacy React articles require a full Markdown replacement (no metadata-only override).
- Unpublishing a CMS override restores the underlying built-in legacy article, when one exists.

## 1. Cloudflare Access — required BEFORE any deployment

In Cloudflare Zero Trust, create a **Self-hosted** application and limit access to the
site owner's **specific verified email address**, with MFA recommended. Protect both:

- `https://www.cornerspan.com/admin*`
- `https://www.cornerspan.com/api/admin/*`

Protect the same paths on every deployed hostname and preview environment. The
runtime checks JWT signatures, issuer, application AUD and expiry independently,
but Access must also enforce the user allowlist and provide login.

Set **runtime** environment variables on the deployed OpenNext Cloudflare Worker:

- `CF_ACCESS_TEAM_DOMAIN` — e.g. `example.cloudflareaccess.com` (no protocol)
- `CF_ACCESS_AUD` — the Access application Audience (AUD) tag
- `CF_ACCESS_ADMIN_EMAIL` — the site owner's exact verified email, matching the Access allow policy. This is also checked against the signed JWT; missing configuration, other users and service-token identities are denied.

**Important:** If you create two distinct Access applications for these route patterns,
each may have a different AUD. This implementation accepts only one AUD, so use a
single Access application that covers both paths or extend server verification to
accept and validate both dedicated application audience values before deployment.
Do not invent AUD values, commit secrets, or create broad "everyone" allow policies.

## 2. Cloudflare D1 — required before draft and publish API can run

No D1 instance has been created or connected by this PR. Cloudflare account access
is required.

1. Create D1 with `npx wrangler d1 create cornerspan-admin` (or via Dashboard).
2. Take the **real database UUID** returned. Add to `wrangler.jsonc`:

   ```json
   "d1_databases": [
     {
       "binding": "ADMIN_DB",
       "database_name": "cornerspan-admin",
       "database_id": "<REAL-D1-UUID>"
     }
   ]
   ```

3. After saving Wrangler config, apply the two migrations in order:

   ```sh
   npx wrangler d1 migrations apply cornerspan-admin --remote
   ```

   The migration directory contains `0001_admin_post_drafts.sql` and
   `0002_admin_published_posts.sql`. Do not run only the first migration.
4. Create a **second physical D1 database** named `cornerspan-admin-preview`.
   Bind preview `ADMIN_DB` to its distinct UUID and apply both migrations there too.
   A version URL alone does not prove database isolation. Check the actual binding before any write.
   For current Worker Previews, configure `previews.d1_databases`; for an existing legacy
   preview workflow, use a separate staging Worker with its own Wrangler configuration.
   Do not change a legacy preview workflow blindly: Cloudflare's switch to Worker Previews is irreversible.
5. Keep the entire preview hostname behind owner-only Access and exclude it from indexing.
   On production, protect only admin paths, including the exact `/admin` path,
   its descendants and `/api/admin/*`; leave the public site accessible.
6. Record real database UUIDs in the checked-in Wrangler configuration before deployment.
   Do not rely on a Dashboard binding that the next Wrangler deployment could replace.

## 3. Verify on a protected preview deployment

- GitHub Actions job `Admin dashboard checks` must pass TypeScript and Next production build.
- An unsigned request to `/admin` returns 404; unsigned requests to both admin API paths return 401.
- Forged, wrong-issuer, expired or wrong-audience JWTs are rejected.
- A correctly signed token for a different email or a service-token identity is rejected.
- Only the authorized owner can open the dashboard; public users cannot preview drafts.
- Confirm database migration has both tables; save, reload, edit and delete drafts.
- Confirm two simultaneous edits cannot silently overwrite each other.
- Change a draft while publishing it; the older publish must fail with 409. Stale unpublish requests must also fail with 409.
- Draft preview is private and includes a noindex meta tag.
- Publish a **new test article**, then inspect title, canonical, Article schema, Blog index, tags/categories and sitemap.
- Unpublish that test article and confirm it disappears from search listings and sitemap.
- Create an existing article metadata-only override; confirm content remains unchanged and the original slug stays intact.
- Reopen a CMS-created post and an existing full-body override; their current bodies must remain selected for publishing.
- Test full Markdown replacement only on a controlled staging article and check layout and images.
- Check all existing calculator routes, blog URLs, canonical metadata, robots policy and redirects.
- After Cloudflare configuration and smoke tests, decide whether to merge the PR. Do not bypass required account setup.

## Local verification commands

```sh
node scripts/test-admin-behavior.cjs
python3 scripts/test-admin-migrations.py
npm run prebuild
npx tsc --noEmit
npm run build:cloudflare
node scripts/qa-admin-security.cjs
```

The behavior suite executes the real auth and API modules with generated RSA test keys
and an in-memory SQLite database. It verifies owner-only JWT checks, same-origin writes,
draft CRUD, atomic publication conflicts, metadata-only preservation and unpublish restoration.
These local checks **do not replace** authenticated tests on the real protected Cloudflare preview.
Node 22.13+ is required by the test suite's built-in SQLite adapter.

## Current deployment gate — 9 November 2026

Cloudflare Dashboard opened successfully but sign-in was not completed in this session.
No D1 instance, remote migration, Access application, binding, runtime variable or deployment
has been created or changed by this continuation. PR #4 must stay draft and unmerged until
the remote preview tests above pass. Existing article data, public assets, robots,
redirects, global metadata and AdSense configuration are outside this change.

Cloudflare references: [JWT validation](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/),
[preview resource isolation](https://developers.cloudflare.com/workers/previews/resources/),
[preview build branches](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/).

## Limits and safeguards

This is a minimalist Markdown editor, not a full WYSIWYG CMS; supported content
includes paragraphs, H2-H4 headings, lists, Markdown tables, links, images and code.
Markdown renders as escaped React nodes instead of raw HTML. Images need valid
URLs; upload to Cloudflare R2 or another managed image host separately.

Draft and publication rows are persistent only after actual D1 provisioning.
A published override is served from the database, but there is no full revision
history/rollback UI yet; unpublish removes the override. Back up D1 before
major migrations. Test performance under real Cloudflare traffic.

**No Cloudflare credentials, database ID, Access policy or remote deployment are available
to this GitHub-only workflow. Do not claim the dashboard is live until externally configured and tested.**
