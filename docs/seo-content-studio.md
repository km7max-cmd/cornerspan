## Preview D1 migration completed — owner screenshot, 14 November 2026

The owner ran Wrangler 4.160.1 against the **remote** `cornerspan-admin-preview` database (`971ff2ce-5283-4df7-9ee4-a0deb0d558f9`). The command output shows successful application (green checks) of `0001_admin_post_drafts.sql`, `0002_admin_published_posts.sql`, `0003_admin_login_attempts.sql`, and **`0004_admin_seo_media.sql`**. The SEO/media migration now has a successful Wrangler completion record. The command targeted Preview, not Production.

Still to verify: a read-only check that `seo_json` appears in both post tables and `admin_media` exists, plus genuine remote application acceptance for the latest SEO Content Studio editor. **Do not re-run `migrations apply` unnecessarily, and do not apply Production migrations without the owner's separate explicit authorization.**

---
# CornerSpan SEO Content Studio

Status: feature branch `feature/posts-admin-dashboard`, draft PR #4. **No merge or Production deployment is authorized.** This redesign adds a working editor, APIs and additive database migration; it is not a static mockup.

## Editing workflow

1. Open `/admin` on the isolated Preview deployment and sign in with the existing Preview admin login.
2. Use Dashboard Overview, All Posts, Drafts, Published Posts or SEO Analysis to find content. Search accepts title, URL, category and tags. `Has draft` includes unpublished edits to published articles.
3. Choose Add New Post. Keep the article H1 separate from SEO Meta Title and SEO Meta Description. URL slugs lock after the first save.
4. Write Markdown. Toolbar actions insert H2/H3/H4, bold, italic, links, lists and tables at the selection. The full body is editable. Raw HTML stays escaped.
5. Add a focus keyword and optional secondary topics. The checklist recalculates while typing. It explains each PASS, WARNING and FAIL; its weighted score is an editorial aid, never a prediction of rankings or AdSense approval. There is no density target or minimum ranking word count.
6. Add an HTTPS or site-relative featured image URL, ALT, optional title/caption/source/click-through link and dimensions. The media library saves reusable URL records in D1. Selecting a library image copies its current details into the draft; later library edits do not silently change articles. Inline images support `![ALT](URL "title")` and `[![ALT](URL)](LINK)`.
7. Toggle the TOC. H2/H3 headings become clickable entries with unique stable IDs, including duplicate-heading collision handling. The editor warns about duplicates, body H1 and skipped levels. The public renderer demotes body H1 to H2 to retain one article H1.
8. Use Live article preview or SEO analysis. Save Draft, then Preview saved draft to verify the persisted version. Unsaved edits block publishing; old revisions return conflicts rather than overwriting another editor.
9. Advanced settings control canonical URL, index/noindex, follow/nofollow, Open Graph and Twitter/X cards, and Article JSON-LD. Noindex and canonical-to-another-page publications are excluded from the sitemap. New CMS posts render featured images, dimensions, captions/source links and TOC in public articles.
10. Publish saved draft affects the current host's environment. The confirmation identifies that host. Unpublish removes the CMS publication; a new CMS-only slug returns 404. Built-in articles revert to their original source. Delete draft removes only the saved draft.

Existing legacy articles require a separate explicit approval checkbox before the publication API accepts an override. Their original URL/date/body remain unless a complete Markdown replacement is explicitly selected and saved. Image/TOC/schema/custom canonical changes on legacy posts require that complete replacement; metadata-only editing keeps the original layout. Two articles with dedicated interactive components do not support metadata-only publishing. Replacing them would remove their bespoke interactive layout: review carefully and obtain owner approval before doing so.

## Persistence and security

- Existing `ADMIN_DB` architecture and authentication remain. Password sessions, Secure/HttpOnly/SameSite cookie, D1 login throttling, authorization and exact-origin checks are preserved.
- `0004_admin_seo_media.sql` adds `seo_json TEXT NOT NULL DEFAULT '{}'` to the draft and published tables, and creates `admin_media`. It does not rewrite any existing content. `{}` retains pre-upgrade defaults.
- Apply this migration **once through Wrangler's migration ledger**, not by repeatedly pasting its ALTER statements. The previous CREATE migrations remain safe if already applied manually.
- The publication SQL atomically copies body and SEO JSON from the selected draft revision. Draft and publication revisions are checked in the same statement. Media records also use optimistic revisions.
- Media library endpoints are authenticated and same-origin for writes. URL validation rejects executable schemes, protocol-relative URLs, backslashes and embedded credentials. The server never fetches arbitrary image URLs.
- Only `previews.vars.CMS_ENVIRONMENT = "preview"` was added to Wrangler. Production name, bindings, required secrets, domain and deployment configuration are unchanged.
- `/admin` has its own application chrome; public header/footer and public page markup remain on all non-admin routes.

## Verification

Run from the feature branch after `npm install --no-package-lock --no-audit --no-fund`:

```sh
npm run prebuild
python3 scripts/test-admin-migrations.py
node scripts/test-admin-behavior.cjs
node scripts/test-admin-editor-ui.cjs
node scripts/test-legacy-preservation.cjs
npx tsc --noEmit
npm run build
node scripts/qa-admin-security.cjs
npm run build:cloudflare
```

The behavior suite executes real TypeScript route handlers against isolated SQLite and signed test sessions. It validates persistence, atomic publish/unpublish, public article rendering and 404, metadata, schema, robots/sitemap exclusions, media/ALT/TOC/tables, unsafe URLs/HTML, CSRF and revision conflicts. It never connects to Cloudflare. Migration tests upgrade existing rows and verify every original field and revision remains unchanged.

The legacy snapshot is from pre-redesign commit `e1c61d4337c16c1c99bb4e80b7638f1e9235b0e5`: all 21 metadata outputs and 84 protected calculator/article source files. Do not refresh the baseline merely to hide a regression.

`test-admin-editor-ui.cjs` uses the real React editor with a simulated transport. `qa-admin-mobile.cjs` runs Chromium desktop (1440×1000) and Pixel 7 Android emulation against a separately built fixture. It covers search/editor/media/TOC/save/reload/preview and simulated publication/cleanup plus overflow checks. The fixture is under `scripts/`, is never imported by any app route, and cannot reach real D1. GitHub website QA runs it and uploads screenshots. This is not remote Cloudflare acceptance testing or a physical Android-device test.

The existing calculator/content, site-route and mobile regression suites remain enabled. Check actual GitHub run conclusions for the delivered commit; a configured workflow is not evidence of a passing run.

## Isolated Cloudflare Preview acceptance

The existing branch Preview URL, as reported by Cloudflare's PR integration:

https://feature-posts-admin-dashboard-cornerspan.eenadutech.workers.dev/admin

This is the existing environment, not proof that a particular new commit has deployed. Match the Cloudflare PR deployment comment to the candidate commit before testing.

In the authenticated Codespace, first confirm the checkout and targets. Preview must use database `971ff2ce-5283-4df7-9ee4-a0deb0d558f9`; Production uses `4a41a0ba-360b-4c45-8929-1d21445eb5a0`.

```sh
git branch --show-current
git status --short
npx wrangler d1 migrations list cornerspan-admin-preview --remote --config wrangler.preview-migrations.jsonc
npx wrangler d1 migrations apply cornerspan-admin-preview --remote --config wrangler.preview-migrations.jsonc
npx wrangler d1 execute cornerspan-admin-preview --remote --config wrangler.preview-migrations.jsonc --command "PRAGMA table_info(admin_post_drafts); PRAGMA table_info(admin_published_posts); PRAGMA table_info(admin_media);"
```

Do not run those migration commands against Production. A push to the feature branch triggers the existing Cloudflare Preview build, not a PR merge. Do not use `wrangler deploy`, `versions deploy` or `secret put` as a preview shortcut.

`scripts/qa-admin-preview.cjs` automates the remote API/public-HTML acceptance flow on the exact branch Preview origin only. Set `CMS_PREVIEW_URL` to that origin and supply `CMS_PREVIEW_TEST_PASSWORD` securely in the authenticated environment, then run `node scripts/qa-admin-preview.cjs`. Never commit or print the password. The script refuses any other host, checks the Preview label, uses an exclusive UUID slug, and cleans up its own publication/draft even when an assertion fails. It has not been run remotely in this session.

For manual browser acceptance, use a unique disposable `preview-seo-smoke-*` slug and nonsensitive test content. Exercise Create → Edit → SEO → Featured image + ALT → TOC → Save → Reload → Private preview → Publish on Preview → Visit the public Preview article → verify H1, anchors, canonical, robots, image, Open Graph/Twitter and JSON-LD → Unpublish → verify HTTP 404 → Delete test draft → reopen the draft list to confirm cleanup. Also test noindex/sitemap and TOC/schema off. Do not edit a legacy publication for this test.

## Known limitations and release blockers

- No R2/upload storage has been verified, so upload controls are not offered. Hosted URLs are supported and saved; their availability, rights and external source relevance require manual review.
- This is a safe Markdown subset, not a complete CommonMark/WYSIWYG editor. Complex nested lists, embedded raw HTML and arbitrary HTML widgets are not supported. Custom interactive legacy article components are not editable as Markdown without replacement.
- SEO scoring is transparent heuristics, not factual construction review, plagiarism detection, keyword research or a Google ranking formula. The search/social previews are illustrative.
- Admin lists currently load up to 500 drafts, publications and media records. No pagination or multi-user roles are added. Existing single-password authentication is retained.
- Admin and saved drafts are private behind login. The whole workers.dev Preview environment is not an access-controlled private site: a deliberately published test article can be publicly reachable. Cloudflare Preview noindex is not access control. No Zero Trust/billing changes were made.
- This work session did not inherit the authenticated Codespace/browser session. Fresh remote D1 migration/application testing and read-only Production version/binding/secret-name/rollback checks require that session. Never claim historical `da4e7677` verification is a fresh check.
- Production release remains blocked until the current release checklist is completed and the owner approves the specific candidate.

## Production release and rollback

See `admin-production-release-preflight.md` for the established history. Before any authorized release:

- Confirm active Worker version, code lineage, production build branch and traffic allocation. Historically active: `da4e7677-f159-4989-a9f1-d3ac60fbfcfc`. Reconfirm immediately before release.
- Confirm the actual candidate's code matches the reviewed Git SHA, its `ADMIN_DB` points to Production, and both required secret **names** exist. Never print secret values or raw version variable values.
- Do not deploy secret-update-only versions `1123d5fd-*` or `ab498bd7-*` without reviewing their code and bindings.
- Validate Production table columns/counts read-only. Record the D1 recovery bookmark and a known-good Worker rollback target. Do not alter Production records during development.
- Complete real Preview acceptance and confirm CI is green at the candidate commit. Snapshot all 21 public legacy articles, calculator outputs, titles/canonicals/schema/robots/sitemap.
- Obtain explicit approval for the exact Production migration/deployment or merge. A merge to main may auto-deploy.
- After approval only, apply the additive migration and deploy the reviewed candidate through the existing controlled release path; verify public routes and admin security.

If release verification fails, restore traffic to the previously recorded known-good Worker version only after checking its configuration. **Worker rollback does not restore D1.** Leave the additive SEO columns and media table in place: older code can ignore them. Do not drop columns, truncate tables, delete publications, or restore all D1 data as a code rollback. Inspect any content publication separately; preserve newer drafts. A D1 recovery is a distinct owner-approved operation, not an automatic rollback step.
