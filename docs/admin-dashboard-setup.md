# CornerSpan Admin Dashboard — deployment and verification

**Status:** Feature branch `feature/posts-admin-dashboard`, draft PR #4. **Not deployed to production.**
Existing calculators, article slugs and live published content are untouched until merge and deployment.

## What the feature implements

- `/admin`: searchable existing posts, new draft editor, SEO title/description, category/tags and Markdown body editor.
- Cloudflare Access JWT signature + issuer + AUD + expiry validation on server. No configuration = access denied.
- `/api/admin/drafts`: protected CRUD draft storage with revision checks in Cloudflare D1.
- `/admin/preview/[slug]`: authenticated saved-draft preview.
- `/api/admin/publish`: protected publish, status and unpublish APIs.
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
4. For preview testing, use a separate D1 database or dedicated preview binding
   so test publications cannot affect the production database.

## 3. Verify on a protected preview deployment

- GitHub Actions job `Admin dashboard checks` must pass TypeScript and Next production build.
- An unsigned request to `/admin` returns 404; unsigned requests to both admin API paths return 401.
- Forged, wrong-issuer, expired or wrong-audience JWTs are rejected.
- Only the authorized owner can open the dashboard; public users cannot preview drafts.
- Confirm database migration has both tables; save, reload, edit and delete drafts.
- Confirm two simultaneous edits cannot silently overwrite each other.
- Draft preview is private and includes a noindex meta tag.
- Publish a **new test article**, then inspect title, canonical, Article schema, Blog index, tags/categories and sitemap.
- Unpublish that test article and confirm it disappears from search listings and sitemap.
- Create an existing article metadata-only override; confirm content remains unchanged and the original slug stays intact.
- Test full Markdown replacement only on a controlled staging article and check layout and images.
- Check all existing calculator routes, blog URLs, canonical metadata, robots policy and redirects.
- After Cloudflare configuration and smoke tests, decide whether to merge the PR. Do not bypass required account setup.

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
