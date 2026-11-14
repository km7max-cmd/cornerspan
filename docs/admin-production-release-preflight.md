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

## Read-only commands for the owner's authenticated Codespace

These do **not** deploy or change Production, but they do require valid Cloudflare authentication. Never share passwords, auth tokens, environment variable values, or full `versions view` output in chat.

```sh
npx --yes wrangler@4.160.1 deployments list --name cornerspan
npx --yes wrangler@4.160.1 d1 info cornerspan-admin
npx --yes wrangler@4.160.1 d1 execute cornerspan-admin --remote --command "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('admin_post_drafts','admin_published_posts','admin_login_attempts') ORDER BY name;"
npx --yes wrangler@4.160.1 d1 execute cornerspan-admin --remote --command "SELECT 'admin_post_drafts' AS name, COUNT(*) AS records FROM admin_post_drafts UNION ALL SELECT 'admin_published_posts', COUNT(*) FROM admin_published_posts;"
```

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
