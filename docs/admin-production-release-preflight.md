## Final Worker rollout guard prepared — 16 November 2026, 06:18 IST evidence

The owner completed the authenticated candidate verification: version metadata, pinned application Git SHA in upload message, `ADMIN_DB` production binding, both `secret_text` admin names, runtime compatibility flags, rollback target readability and **five Live-versus-Version URL public title/H1 comparisons all PASS**. Live remained on `da4e7677-f159-4989-a9f1-d3ac60fbfcfc` at 100%, as observed in the prior script. No D1 writes or Worker traffic changes occurred.

`scripts/guarded-live-release.sh` is prepared to promote only the already-uploaded version with prefix `1d3c3256` after an explicit terminal confirmation. It pins the original application commit and old 100% Worker ID, requires authenticated Codespace and expected branch, re-runs fixed fail-closed candidate verification, rechecks the Production migration ledger and expected D1 columns, confirms the candidate's Git configuration has no newly declared routes/triggers, resolves its **full** unique Worker version UUID, dry-runs `wrangler versions deploy`, and checks the old 100% active Worker again immediately before promotion. It does not call `wrangler deploy` (which would upload different code) or `wrangler triggers deploy` (no route changes requested), does not touch local edits, and does not merge PR #4.

After the user explicitly enters `DEPLOY CORNERSPAN VERSION`, it requests `versions deploy` to 100% of traffic. Post-release GET checks cover seven public pages, the Admin login page, unauthenticated drafts API (expected 401), and sitemap (40+ routes). The script rechecks active Worker version. If a post-release smoke or active-version check fails after the promotion returns success, it attempts immediate rollback to the pinned previous Worker with an explicit version-based deployment; check the resulting deployment and site even if this reports success. This rollback restores Worker code/bindings, **not** D1 schema/history; the D1 migration is additive.

**Do not assume a new Live version until the owner posts a successful terminal report and Live smoke results.** The script's `bash -n` and test checks may pass without running the remote release. A real production rollout can transiently affect public traffic while Cloudflare propagates Worker versions, so review the final output carefully.

Owner-run command after successful GitHub CI:

```bash
cd /workspaces/cornerspan && git fetch origin feature/posts-admin-dashboard && git show 04597c9c25666a133d17b4777c0cffdda736f110:scripts/guarded-live-release.sh > /tmp/cornerspan-live-release.sh && bash /tmp/cornerspan-live-release.sh
```

Official references: https://developers.cloudflare.com/workers/versions-and-deployments/ and https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/.

## Candidate metadata and five public routes — PASS, 16 November 2026, 06:18 IST

The owner ran `scripts/verify-production-candidate.cjs` from the authenticated Codespace. The supplied screenshot reports:

- Candidate source `wrangler`, candidate message contains expected clean-build Git SHA `062419126fa6ecd702823d0d18499de9dae8011f` (**MATCH**).
- `ADMIN_DB` **MATCH**; `ADMIN_LOGIN_PASSWORD` and `ADMIN_SESSION_SECRET` are both **PRESENT** on the uploaded candidate. Runtime compatibility date **MATCH** and `nodejs_compat: true`.
- Previous Production Worker `da4e7677-f159-4989-a9f1-d3ac60fbfcfc` is retrievable as a rollback target. Candidate and previous Worker script ETags differ, as expected for a new code bundle.
- Five public GET smoke checks (`/`, `/calculators`, `/calculators/concrete`, `/blog`, `/guides`) returned HTTP 200 on both candidate Version URL and Live, with matching title and H1.
- Final line: `VERDICT: VERSION METADATA & PUBLIC SMOKE PASS; release still requires route/build/rollback checks` and `NO PRODUCTION DEPLOYMENT OR DATABASE WRITES PERFORMED`.

This is real remote candidate verification, not simply CI. Upload helper extracted/builds the exact pinned commit in a clean directory, which grounds source provenance beyond the upload-message marker. GitHub CI also passed for this application commit. Version URLs use Production resources, so do not use that URL for publication/write acceptance.

Per current Cloudflare docs (Workers versions and deployments), uploading versions and activating a deployment are separate; deploying an existing Worker version does not require `triggers deploy` unless there are intentional trigger/route changes. Repo `wrangler.jsonc` has no new route declarations, and the owner is retaining the existing Live Worker/custom-domain setup. Verify that the old deployment is still the active `cornerspan` Worker immediately before release and that its rollback version is retrievable. If these or domain mapping are unclear, do not deploy or alter triggers. Cloudflare rollback restores Worker code/bindings, not D1 state; the new D1 schema is additive and compatible with the old Worker.

The final outstanding gate is a guarded explicit promotion of the identified **full** new version ID (prefix `1d3c3256`) with an immediate post-deployment smoke test and recorded rollback plan. No PR merge or ad/content editing is needed to release the already-uploaded candidate.

## Production candidate uploaded, traffic unchanged — 16 November 2026, 06:09 IST

The owner ran the clean Git-pinned candidate build/upload helper in the authenticated Codespace. The supplied terminal screenshot reports `PASS: Candidate uploaded; Production Worker still da4e7677-f159-4989-a9f1-d3ac60fbfcfc at 100%` and a Version URL `https://1d3c3256-cornerspan.eenadutech.workers.dev`. This is **not** a production deployment. The candidate was prepared from pinned Git commit `062419126fa6ecd702823d0d18499de9dae8011f`, with both required encrypted admin secrets passed together in the undeployed upload; the script reported success. This is owner-provided execution evidence; candidate's actual remote bindings and full ID still require read-only inspection.

`scripts/verify-production-candidate.cjs` now provides safe read-only verification from the authenticated Codespace: check active Worker remains unchanged at 100%, identify the unique uploaded version from its `1d3c3256` prefix, inspect version metadata/Production D1 binding and required secret **names only**, compare 5 public routes' title/H1 with live, and verify the previous active version is retrievable. It does not log in, publish, mutate a database, change secrets, deploy, or merge. It must **not** be used to test draft writes on the Version URL, because Version URLs use the configured Production resources.

Candidate upload and local/CI green tests do not alone establish code/Git parity or rollback readiness. If metadata message or public-route parity cannot be verified, keep release on hold; investigate rather than forcing production deployment. Verify Cloudflare build branch/route configuration and the deployment's rollback version before any launch. Preserve the four locally changed Codespace files.

Authenticated Codespace next command:

```bash
cd /workspaces/cornerspan && git fetch origin feature/posts-admin-dashboard && git show e25095df5aaca469f3a46c7c5437f8cdbc5c2b89:scripts/verify-production-candidate.cjs > /tmp/cornerspan-verify-candidate.cjs && node /tmp/cornerspan-verify-candidate.cjs
```

## Production D1 fully verified; clean undeployed candidate prepared — 16 November 2026, 05:53 IST

The owner's 05:53 IST authenticated preflight screenshot confirms Production `ADMIN_DB` MATCH, all four expected administrative tables with complete columns, 0 rows in drafts/publications/login attempts/media, and `d1_migrations` with 4 rows. All four migrations `0001`–`0004` are reported **applied**. Production Worker `da4e7677-f159-4989-a9f1-d3ac60fbfcfc` remains active at **100%**, while both Production admin secret names remain **MISSING** on that version. Its code/Git match is unverified. The migration must not be rerun.

Created `scripts/prepare-production-candidate.sh` on the feature branch to stage a **new undeployed** Worker version with the exact reviewed Git commit `062419126fa6ecd702823d0d18499de9dae8011f` plus both required admin secrets *in the same upload*. It extracts a clean copy using `git archive`, leaving the owner's four modified Codespace files untouched; checks the pinned Production D1 binding, preview D1 separation, worker name, required secret names and stable Production deployment version; runs fresh dependencies, calculator generation, and Cloudflare build; reads a new Production login password with hidden input, generates an independent high-entropy session signing secret, writes a temporary 0600-permission JSON secret file only in a private temporary directory, and uses `wrangler versions upload --secrets-file` without deployment. It then rechecks that the original Production Worker remains active. The temporary secret file is cleaned up; neither credential belongs in chat, source or logs. A build, upload or integrity error stops the flow.

The script has **not yet been executed in the owner's authenticated Codespace**. Passing CI's `bash -n` syntax check does not prove a remote upload. Never deploy an earlier secret-only Worker version or merge the PR as a shortcut. The final release must review the resulting version's exact D1 binding, both secret names, bundled code lineage and compatibility settings, Cloudflare's production build/branch behavior and a known-good rollback version before allowing production traffic. Uploading an undeployed version is not a Live release.

Owner-run staging command (do not paste the password here):

```bash
cd /workspaces/cornerspan && git fetch origin feature/posts-admin-dashboard && git show e566a4bdd60ace2a3389a63c1b8f58e91cf25c3f:scripts/prepare-production-candidate.sh > /tmp/cornerspan-candidate.sh && bash /tmp/cornerspan-candidate.sh
```

Cloudflare documentation: https://developers.cloudflare.com/workers/wrangler/commands/workers/ (versions upload with `--secrets-file` does not deploy), https://developers.cloudflare.com/workers/configuration/secrets/ .

## Owner-run Production D1 migration completed — 16 November 2026, 05:48 IST

The owner ran the pinned guarded migration helper from the authenticated Codespace after the 05:46 baseline passed for 3 legacy tables, 3 expected indexes, 0 records, and a Production D1 Time Travel bookmark. The owner then explicitly confirmed the guarded schema upgrade.

The 05:48 screenshot shows the completed helper (`Migration command finished`) returned to `/workspaces/cornerspan` on the feature branch. Immediately above the Preview report, the visible tail of the Production migration ledger states `4=applied`; the helper's post-migration read-only preflight then shows Preview `admin_post_drafts`, `admin_published_posts`, and `admin_media` all having expected columns and 0 rows, with Preview ledger 1–4 applied. The Production schema/ledger details above the screen crop are not fully visible. **The Production migration command successfully exited, but obtain the complete Production verification to explicitly confirm all fields, ledger entries and row counts.** Do not rerun migrations.

No Production Worker deployment or secret update was part of this script. The remaining release gates are two Production admin secrets on a reviewed candidate, candidate source/config/build provenance matching GitHub, stable Worker rollback verification, and Live smoke checks. Preserve Codespace's local four modified files. Do not merge as a deployment shortcut.

## Production base indexes verified; guarded migration prepared — 16 November 2026, 05:35 IST

The owner's authenticated read-only `sqlite_master` query confirmed **all three expected base indexes** in `cornerspan-admin` match the original migration definitions:

- `idx_admin_login_attempts_window` on `admin_login_attempts(window_start)`
- `idx_admin_post_drafts_updated` on `admin_post_drafts(updated_at DESC)`
- `idx_admin_published_posts_date` on `admin_published_posts(published_at DESC)`

The query returned `success:true`, `changes:0`, `changed_db:false`. Along with previous table/column, zero-row and D1 bookmark evidence, it establishes the observed pre-SEO-migration baseline. No Production schema write has been performed.

`scripts/guarded-production-d1-migration.sh` was added to the feature branch. It is **not** run in CI. It extracts only the reviewed migration files from pinned Git commit `29cd7f8b22c21495f7c7c20a9bb6a99849181223` to a temporary isolated directory, pins account and Production database ID in a temporary Wrangler config, rechecks the three base tables/indexes and zero row counts, verifies the recovery bookmark, and requires the owner to type an explicit confirmation before asking Wrangler to apply missing migrations 0001–0004 through the standard ledger. Its purpose is to reconcile the already-existing 0001–0003 objects using their `IF NOT EXISTS` DDL, then add the two missing `seo_json` columns and new media table via 0004. The wrapper checks the final schema and ledger using the pinned read-only preflight and never deploys a Worker, changes secrets, merges PR #4, or modifies article content. It uses `git show` for pinned migration sources because the owner's Codespace has four local modified files.

The owner should inspect all output and confirm the correct database name before applying; if any table/index/count/bookmark deviates, the script stops before changing Production. If Wrangler reports an error, **do not rerun blindly**. Inspect the migration ledger and schema first. Production secrets and candidate Worker source/config verification are still required before a Live deployment.

From the existing authenticated Codespace, after a fresh fetch:

```bash
cd /workspaces/cornerspan && git fetch origin feature/posts-admin-dashboard && git show 390fbf549daa7de4a1d40eae687c90cf05cf14a2:scripts/guarded-production-d1-migration.sh > /tmp/cornerspan-production-d1.sh && bash /tmp/cornerspan-production-d1.sh
```

## Production schema read-only SQL evidence — 16 November 2026, 05:32 IST

The owner executed the read-only Wrangler query against `cornerspan-admin` to inspect `sqlite_master` table and index definitions. The supplied lower-screen screenshot reports `success:true`, `changes:0`, `changed_db:false`, 16 rows read, and the stored `CREATE TABLE` definitions for `admin_post_drafts` and `admin_published_posts`.

- Both visible table definitions match the shape of legacy migration files `0001_admin_post_drafts.sql` and `0002_admin_published_posts.sql`: they include the expected base columns and defaults, with no `seo_json` yet. A separate pinned preflight already checked expected base columns and found zero rows in each table.
- The screenshot starts partway through the JSON output and **does not show the index entries**, so the expected three base indexes (`idx_admin_post_drafts_updated`, `idx_admin_published_posts_date`, and `idx_admin_login_attempts_window`) have not all been verified by this evidence.
- No D1 writes or production release occurred. Do not interpret the SQL inspection as permission to skip the missing schema/ledger safety checks.

Before an additive production migration, verify the presence and definitions of all three indexes via a short read-only sqlite_master query. Reconcile any deviation from migration files 0001–0003; do not invent ledger rows or run `0004` if a `seo_json` column already exists. Only then use Wrangler's built-in remote migration process with confirmation and backup, recheck every table/ledger entry/row count, and separately verify secrets and code lineage before moving production traffic.

## 16 November 2026: Authenticated remote Preview acceptance — PASS

The owner ran `scripts/run-preview-acceptance.sh` in the authenticated Codespace and supplied a terminal screenshot at approximately 05:27 IST. The named Cloudflare feature Preview completed a new encrypted `ADMIN_SESSION_SECRET` deployment `ef79b40f-eba0-4fa5-abe1-514ad4fb106a` (the preceding password rotation is part of the owner-run helper; no secret values are recorded here).

The exact Preview-only smoke run created the unique disposable article slug `preview-seo-smoke-43633aa8-a38a-42da-b5b0-5a98321da141`. The script reported:

- **PASS** actual remote Preview D1 draft create/edit/reload, reusable media record and featured image/ALT persistence, private article preview, publication, public HTML/SEO/TOC/social/schema, noindex sitemap.
- **PASS** unpublish → HTTP 404 → deletion of disposable draft and media; test script reported no disposable records left.
- **PASS** Preview acceptance completed, with no Production deployment or migration requested.

This closes the **remote authenticated Preview acceptance** release gate. Remote output is owner-supplied evidence; it is distinct from CI's isolated editor fixtures. Before any Production deployment, verify a clean release candidate's code/config and secrets, carefully reconcile Production's legacy D1 schema and absent migration ledger, and retain a verified Worker rollback version. Production's inspected active version still lacked both required admin secrets. Preserve the four uncommitted Codespace files without overwriting them. Do not merge PR #4 as a shortcut.

## Preview binding-name evidence — 16 November 2026, 05:12 IST

The owner ran `wrangler preview secret list` in the authenticated Codespace and supplied a screenshot for Worker `cornerspan`, Preview `feature/posts-admin-dashboard`: the latest Preview deployment lists both `ADMIN_LOGIN_PASSWORD` and `ADMIN_SESSION_SECRET` under Secrets with masked values. Wrangler labeled the entries `Environment Variable`; this screenshot confirms the names are listed but does not independently prove encrypted binding type, valid lengths, login success, or the latest application's authenticated D1 workflow. Do not expose their values.

Production binding/secret presence remains independent. Production's active version still reported both required secret names missing during the read-only preflight. Do not copy Preview secrets into Production or promote an unreviewed secret-only version.

Next: verify Preview login through a secure user-entered password (or rotate the password **on this Preview only**, if the owner does not know it), then run the unique-disposable-record acceptance script against the real Preview database. `wrangler preview secret put ... --name feature/posts-admin-dashboard --worker-name cornerspan` affects the named Preview and creates a new Preview deployment, not a Production deploy. Avoid passing secret values on the command line or in chat.

## Authenticated Production gate evidence — 16 November 2026, 05:06 IST

The owner supplied the upper half of the sanitized read-only preflight run (`2026-11-15T23:36:52.997Z`). Findings, as reported by the helper (secret-name check uses `versions view` binding metadata):

- Active version `da4e7677-f159-4989-a9f1-d3ac60fbfcfc`, **100%**, source Dashboard; retrievable but code/Git parity unverified.
- `ADMIN_DB` binding matches the pinned Production database.
- **`ADMIN_LOGIN_PASSWORD` and `ADMIN_SESSION_SECRET` both reported MISSING** on the inspected active version. Do not release until both are configured and verified on the reviewed candidate. Do not use `wrangler secret put` during preflight: Cloudflare documents it deploys immediately. `wrangler versions secret put` creates an undeployed version that still needs review.
- Production D1: draft and published tables exist with 0 rows, but **both lack `seo_json`**; login attempts table exists with 0 rows; `admin_media` and `d1_migrations` are absent.
- Because `d1_migrations` is absent, **do not assume migrations 0001–0003 were applied through Wrangler**. Inspect exact indexes/schema and migration plan before using migration commands; do not manually insert guessed ledger rows.
- Codespace checkout `4fa6958854f603ed95048f8c69dee8ac198bb985` on the feature branch had **four changed files**. Do not reset or overwrite them or use this checkout for the release build.
- The preceding screenshot's lower half showed Preview migrations 0001–0004 and expected columns, plus a Production D1 recovery bookmark. This is not proof of a restore test.

**Release gate: HOLD** until remote authenticated Preview lifecycle, Production secrets, candidate code/config parity, safe schema upgrade and rollback planning are verified. No Production changes were initiated by this verification.

## Preflight follow-up — 16 November 2026

The owner ran the pinned read-only helper in the existing authenticated Codespace. The supplied screenshot shows the lower part of its report:

- Preview: all expected columns are present; migrations 0001–0004 are recorded. Draft, published-post and media row counts are zero; login-attempt rows are two.
- Production: `admin_media` and `d1_migrations` are missing. The active version, binding/secret presence and remaining Production schema lines are above the captured area and still require the full report.
- The helper incorrectly expected a three-part Time Travel bookmark. Cloudflare documents four hexadecimal groups (8-8-8-32); the corrected validator and regression fixture now accept that format and reject malformed values. All nine read-only/redaction/preflight tests pass locally.
- On 16 November the owner reran the corrected read-only helper and supplied the lower report screenshot. A Production Time Travel recovery bookmark matching the corrected documented format is **now reported** (full value deliberately not copied into this document). This is a recoverability reference, not evidence of a tested restore or a database backup. Production `admin_media` and `d1_migrations` are still missing, and the upper report containing active binding/secret indicators and other Production columns was not visible.
- Preview publication/media acceptance and the candidate/Production release checks remain pending. No Production migration, deployment, existing-content edit or PR merge was performed.

## Current release gate — 15 November 2026

**The owner authorized the Live release after all checks.** That authorization includes the necessary additive Production migration after its schema review and Preview verification. Do not request the same release approval again. PR #4 remains draft and must not be merged to bypass the checks. Existing article changes and destructive D1 recovery remain outside this release.

The implementation at `a51f997c966852dd7846f1cd01afe7747abeadc3` passed both GitHub workflows and Cloudflare Preview deployment. Live and Preview matched across all 48 sitemap routes for content, titles/descriptions, canonicals, robots, social metadata, structured data, headings, images and initial input markup. See [delivery and acceptance status](admin-delivery-status.md). The owner already supplied successful **Preview** migration `0004` evidence; do not apply it again merely because historical entries below list it as pending.

The owner's latest Termux/Codespace screenshot shows Production version `da4e7677-f159-4989-a9f1-d3ac60fbfcfc` at **100%**, deployed on 11 November. This is fresh owner-supplied deployment evidence, not a verification of its private source, bindings or secrets. The authenticated session is working in `/workspaces/cornerspan`; this work environment does not inherit it. No new Google login is needed for these checks.

**Remaining gate: authenticated remote verification.** Complete the redesigned editor's genuine Preview D1 publication/media lifecycle and inspect current Production schema, bindings, required secret names, code lineage and rollback readiness. Production is unchanged. No Production migration, deployment or PR merge has been performed by this work session.

### Read-only preflight in the authenticated Codespace

Run `node scripts/admin-release-preflight.cjs` from a reviewed checkout. If the Codespace checkout is old or contains edits, fetch the feature branch and extract only this helper from the reviewed full commit SHA into `/tmp`, then run it from the repository directory. Do not overwrite local work just to run preflight.

The self-contained helper uses the installed Wrangler, a temporary explicit account/database config, and only `deployments list`, `versions view`, D1 `SELECT`/`PRAGMA table_info`, and `time-travel info`. It inspects both fixed, distinct D1 targets, column presence, table row counts and the known migration ledger entries. It does not install packages, deploy, apply migrations, change secrets or read article bodies. Raw CLI output, variable values, arbitrary binding names and version annotations are suppressed; temporary Wrangler logs are removed. Its tests exercise read-only targets, malformed-response handling and secret redaction in CI.

Share only the helper's sanitized report. Missing tables/columns or secrets are findings to review, not permission to run broad setup commands. A retrievable Worker version and D1 bookmark support rollback planning; they do not establish a tested rollback or matching Git source. Schema output checks column presence, not every index, constraint or default. The helper never declares a release candidate approved.

### Current release checklist

- [x] Owner authorized a Live release after verification; leave PR unmerged.
- [x] Application CI and read-only Live/Preview parity passed at `a51f997`; verify any subsequent helper/documentation commit checks too.
- [x] Owner confirmed the active `da4e7677` deployment at 100%; recheck immediately before changing traffic.
- [ ] Read-only preflight: Production and Preview schema, migration ledger, row counts, active binding/secret names and recovery bookmark.
- [ ] Authenticated Preview: create/edit, image/ALT, TOC, save/reload, preview, publish, verify public HTML/SEO, unpublish to 404, remove disposable draft and media.
- [ ] Build the reviewed candidate in a clean checkout; verify its code/source, actual Production D1 binding and both required secret names. Never promote historical secret-only versions.
- [ ] Inspect Production build/branch settings; retain a verified previous Worker version for rollback. Do not merge as a deployment shortcut.
- [ ] Apply only missing additive Production migrations after comparing schema and ledger; never reset data or blindly retry a migration whose columns already exist.
- [ ] Deploy the verified candidate through the established release path, then recheck public routes, 21 legacy posts, calculators, canonical/robots/sitemap, login security and admin availability.
- [ ] If release verification fails, return traffic to the recorded stable Worker version. Retain D1 data and additive schema; any database restoration is a separate operation requiring review.

## Historical observations (superseded by the current release gate above)

The following dated notes record the earlier approval/access state. Their old approval holds are not a request for new release permission. Their safety findings about unreviewed Worker versions and protecting data still apply.

---

## Advanced SEO redesign — 14 November 2026

The feature branch now includes the SEO Content Studio implementation and additive migration `0004_admin_seo_media.sql`. See [SEO Content Studio](seo-content-studio.md) for field behavior, test coverage, Preview migration/acceptance, limitations and rollback steps.

Local migration, signed-session/API, React editor, TypeScript and legacy-preservation checks passed. The snapshot verifies all 21 legacy metadata outputs and 84 protected article/calculator files. A local desktop browser inspection verified the editor, live analysis, draft save and TOC preview with explicitly simulated storage. Check GitHub CI and the Cloudflare deployment comment for the final commit; do not confuse this local evidence with a fresh remote acceptance test.

**Current gate: HOLD / NO MERGE / NO PRODUCTION DEPLOY.** This session's GitHub integration can write the feature branch, but the browser reaches GitHub sign-in for Codespaces. The authenticated Codespace was not available here. Production version `da4e7677`, current secret names/bindings, rollback readiness, and remote Preview migration/acceptance have not been freshly reconfirmed. Existing historical entries below remain historical observations.

---

## Autonomous release audit — 14 November 2026

The owner asked to handle further checks without additional Cloudflare screenshots or repeated manual steps.

**GitHub / publicly verifiable checks completed:**
- GitHub repository default branch is `main`, PR #4 remains **open and draft**, branch `feature/posts-admin-dashboard`, not merged.
- Both latest verified workflow runs for previous PR commit `74f519dd` finished **successfully**: *Admin dashboard checks* and *CornerSpan website QA*.
- Verified `main` currently lacks `app/admin/login/page.tsx`, `app/admin/page.tsx`, and `ADMIN_DB` in `wrangler.jsonc`; the feature branch adds them. The previous owner dashboard screenshots show the active Production Worker `da4e7677` was deployed by **Dashboard**, so do **not** assume it equals `main`.
- Cloudflare public docs say commits pushed to the configured production branch trigger a production build and deploy, making a PR merge potentially **production-impacting**: https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/
- The public `https://www.cornerspan.com/blog` route returns the CornerSpan article catalog in the web index, with 21 article entries in the retrieved page, consistent with the owner's 21-post Preview Dashboard. A retrieved live area guide contains a full original article with calculator links and worked examples. These public observations do **not** establish current private Cloudflare build settings or the current active Worker code checksum.
- Cloudflare docs confirm a `wrangler versions secret put` version is **not automatically deployed**; likewise a rollback does not restore D1 database content. See https://developers.cloudflare.com/workers/configuration/secrets/ and https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/ .

**Access limitation:** The connected GitHub integration can read and change feature-branch source code and CI. It cannot authenticate to the owner's private Cloudflare dashboard, inspect live Cloudflare Worker source/production Build Settings, or access production D1. No Cloudflare connector is available. Public web browsing cannot substitute for those authenticated private checks. The prior owner's read-only Cloudflare screenshots verify active version, release history and rollback menu only.

**Decision:** `HOLD / NO MERGE / NO DEPLOY`. The outstanding release blockers are active Production Worker code/source lineage, production Build Branch settings, correct required secrets and D1 binding in a reviewed candidate version, and an authorized deployment/rollback plan. Do **not** deploy either older secret-update-only version. The owner previously required explicit signoff before any change to Live CornerSpan.com.

---
## Owner screenshot: Production rollback menu visible — 14 November 2026

The owner supplied a Cloudflare **Production > Deployments** screenshot showing a version's ellipsis menu with **Rollback**, **Split versions**, and **View logs**. This demonstrates the dashboard exposes a rollback control for at least one selectable deployment version. However, the screenshot is horizontally scrolled and crops the target version ID; **do not claim that specific version `1659b910` was selected** or that it is verified safe to roll back. The owner did not click Rollback and did not authorize a deployment.

The next read-only verification should inspect the active version `da4e7677` code origin and configuration to reconcile the production runtime with GitHub `main`; preserve existing active deployment and secrets. Avoid requesting screenshots of secret values.

---
## Owner screenshot: Production rollout history inspected — 14 November 2026

Cloudflare's **View rollout history** for Worker `cornerspan` > **Production** shows the most recent deployment of version `da4e7677` approximately two days earlier, deployed by `eenadutech`, Source **Dashboard**. The immediately previous deployment is version `1659b910` approximately three days earlier, also Source **Dashboard**. Older **Wrangler** manual deployments are listed.

This **confirms rollout history exists**. It does **not** independently prove that a rollback action is available or that the prior version would preserve desired recent functionality. Inspect the relevant options in Cloudflare before treating `1659b910` as a usable rollback target. Do not select Rollback/Deploy/Promote during preflight.

---
# CornerSpan production Admin Dashboard — release preflight (NOT an approval to deploy)

Status: **HOLD / NO MERGE / NO PRODUCTION DEPLOY** until the owner explicitly authorizes the specific production change.

## Verified before this preflight

- GitHub PR #4 contains the private admin dashboard, D1 migrations, and CMS APIs. GitHub `main` does not contain `app/admin/login/page.tsx`, `app/admin/page.tsx`, or an `ADMIN_DB` binding in `wrangler.jsonc`.
- The owner's Cloudflare branch Preview showed 21 existing posts, 0 saved drafts, connected D1 and publishing ready after cleaning up a test post. Draft save, private preview, publish action, and unpublish-to-404 were tested in Preview. Automated integration tests also verify the **public article renderer** and cleanup using a local test database.
- The last owner's Wrangler production deployment inspection (13 Nov 2026) listed active version `da4e7677-f159-4989-a9f1-d3ac60fbfcfc` with 100% traffic. **This is a historical observation; re-check immediately before release.**
- The same inspection showed that non-deployed version `1123d5fd-16ad-4f22-bb9b-c30ce07fdbd1` had both admin secret **names** and the production D1 binding. **Do not deploy that older secret-bearing version**; Worker versions capture code and bindings as well as secrets, and it might serve different code from GitHub.
- Production D1 table names were verified to exist (`admin_post_drafts`, `admin_published_posts`, `admin_login_attempts`); column verification and current records are still unverified.

## Owner screenshot: active production deployment verified 14 November 2026

Cloudflare Workers & Pages > `cornerspan` > **Production** > Deployments shows active version `da4e7677` receiving **100%** production traffic. Its version row is marked **Dashboard**. Two more recent versions `1123d5fd` and `ab498bd7`, each marked **Wrangler** and described as secret updates, are **Ready but are not the active deployment**. This independently reconfirms the existing-production-version / prepared-secret-version distinction; **do not promote either secret-only version** without code/binding review. The owner did not authorize a production deployment by providing this screenshot. Use **View rollout history** for read-only confirmation of available rollback history. The screenshot does not prove that the active Worker corresponds to any particular GitHub commit.

---
## RELEASE BLOCKERS to resolve

1. **Live code lineage**: Re-read the active Production Worker version ID and its deployment/source commit in Cloudflare Workers > `cornerspan` > Deployments. Determine whether the active code came from GitHub `main`, a Cloudflare dashboard edit, or a different source. The active Worker once served an admin-login page that is absent from `main`. Capture version ID + code origin **without exposing sensitive variable values**.
2. **Secret-bearing release version**: Validate that the newly built Candidate **code** corresponds to the reviewed PR commit, and that **both** `ADMIN_LOGIN_PASSWORD`, `ADMIN_SESSION_SECRET` and the correct `ADMIN_DB` binding are present in that same candidate Worker version. The two secrets are in a non-deployed Worker version; do not assume they are present in the active version.
3. **Production D1 safety**: Use read-only queries to validate all three tables and detect any unexpected existing data. Confirm the intended D1 target is `cornerspan-admin` and that Preview uses a **different** database. Do not truncate, delete, reset, restore, or run a destructive migration.
4. **Production build settings**: Check Workers > Settings > Build > Branch control. If `main` is the production branch, a PR merge may **automatically deploy**. Do not merge as a way to merely prepare the release.
5. **Production snapshot & rollback readiness**: Re-read active version ID immediately before the release. Verify an actual dashboard Rollback option is available for that version, and save a D1 Time Travel bookmark when supported. Worker rollback changes code only, **not D1 data**. Never restore the D1 database merely to roll back code.
6. **SEO and content**: Record key existing public routes and compare titles, canonicals, robots, content and sitemap output before/after; the PR changes the blog and sitemap routes from static to D1-aware dynamic rendering. Verify the 21 existing posts retain their content, assets, calculator embeds and URLs when there are no CMS overrides.
7. **Preview public route**: During the prior manual Preview test, published status was confirmed, but a successful **public URL screenshot before unpublish** was not captured. Automated local integration covers public route rendering, not a fresh remote runtime check. Consider another isolated public Preview smoke test without touching Production.

## Historical read-only command guidance

Use the sanitized `scripts/admin-release-preflight.cjs` helper documented above. Raw deployment listings can contain sensitive version annotations; do not share their complete output or full `versions view` responses. Never share passwords, auth tokens or variable values in chat.

Do not run `wrangler deploy`, `wrangler versions deploy`, `wrangler secret put`, or merge the PR during preflight. `wrangler secret put` **deploys immediately**; the `versions secret put` variant only prepares a non-deployed version.

## Release gates (all required)

- [ ] Active Production version and live code origin confirmed, reconciled against GitHub PR
- [ ] Rollback target confirmed available; D1 recovery/bookmark plan documented
- [ ] Production required secret names, D1 binding, and migrations confirmed on **the actual candidate version**
- [ ] Latest PR checks green; verified article/SEO snapshots; clean Preview tests
- [ ] Owner gives **explicit permission to deploy this specific version**
- [ ] Deploy via a controlled release path (prefer upload candidate without traffic first and review), then verify HTTPS, admin login, drafts, 21 original posts, canonical/robots/sitemap, and no unexpected CMS publications
- [ ] If checks fail, roll back only the Worker **code** to the recorded stable version, and inspect data separately

**Do not use `1123d5fd-16ad-4f22-bb9b-c30ce07fdbd1` as a release candidate without verifying its code**; it was created during separate secret setup, not as a reviewed PR build.

Official docs:
- https://developers.cloudflare.com/workers/versions-and-deployments/
- https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/
- https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/
- https://developers.cloudflare.com/workers/configuration/secrets/
- https://developers.cloudflare.com/d1/reference/time-travel/

