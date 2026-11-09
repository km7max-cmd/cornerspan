# CornerSpan admin dashboard: secure setup

The dashboard implementation is maintained on `feature/posts-admin-dashboard`.
**Do not merge or deploy until the Cloudflare Access application and regression checks are configured.**

## Existing architecture

- Next.js 15 / OpenNext Cloudflare Worker.
- Blog metadata: `data/blog.ts`.
- Article bodies: `data/calculator-articles.ts` and existing React article components.
- Existing articles are compiled code and are **not** database-managed yet.

## 1. Create a Cloudflare Access application

In Cloudflare Zero Trust, create a **Self-hosted** application that protects
`www.cornerspan.com/admin*` (and any other hostname serving the site).
The Access policy must **allow only the site owner's verified email address**.
Do not set a broad "everyone" or country-only allow rule.
If deploying a preview domain, protect its `/admin*` route as well.

The application token must be forwarded as `Cf-Access-Jwt-Assertion`.
The server independently verifies the JWT signature, expiry, issuer, and AUD.
Without the environment configuration described below, `/admin` responds with 404.

## 2. Set Worker environment bindings

Configure these values in Cloudflare Worker settings as runtime environment variables:

- `CF_ACCESS_TEAM_DOMAIN`: your team's domain, e.g. `example.cloudflareaccess.com`
- `CF_ACCESS_AUD`: the **Application Audience (AUD)** tag shown on the Access application configuration

Use your actual Cloudflare team values; do not commit user emails or sensitive configuration to the repository.
Only the Access policy decides which verified identity can sign in.
Use a narrow rule protecting this admin path at every exposed hostname.

## 3. Configure D1 draft storage

D1 is not yet provisioned; this is a required manual deployment prerequisite.

1. In Cloudflare create a D1 database named `cornerspan-admin` (or another chosen name).
2. Add an `ADMIN_DB` D1 binding to the **same deployed Worker** as CornerSpan.
   For Wrangler/OpenNext, add the real database UUID to the `d1_databases`
   section of `wrangler.jsonc` (not a fabricated UUID):

   ```json
   "d1_databases": [
     { "binding": "ADMIN_DB", "database_name": "cornerspan-admin", "database_id": "REAL-D1-UUID" }
   ]
   ```

3. Apply `migrations/0001_admin_post_drafts.sql` using Wrangler:

   ```sh
   npx wrangler d1 execute cornerspan-admin --remote --file=./migrations/0001_admin_post_drafts.sql
   ```

4. Confirm the binding and table are available in your preview environment.
5. Verify unauthenticated `GET /api/admin/drafts` and
   `POST /api/admin/drafts` always respond with 401.
6. Verify authenticated save, reload, and revision conflict handling
   before merging.

The draft API does **not** publish posts or modify existing articles.
The editor stores drafts on D1 and offers JSON export.

## 4. Production launch checklist

- Verify unsigned requests to `/admin` return 404, and unsigned draft API requests return 401.
- Verify invalid, expired, and wrong-audience Access tokens are rejected.
- Verify a real authorized session can open the dashboard.
- Check that `/admin` returns `noindex` robots metadata.
- Run `npm ci`, `npm run build`, and a Cloudflare preview deployment.
- Confirm existing blog URLs, canonical metadata, calculator pages, sitemap, and redirects remain unchanged.
- Do not deploy an unprotected preview branch.

## Current limits

This stage adds **server-side authenticated access** and a D1 draft API. D1 binding and schema still need deployment configuration. **No publish endpoint exists.** Existing published React article bodies are not editable yet; a full content migration and rendering strategy must be implemented and tested before production publishing.

Never assume a route name alone or a client-side login widget provides security.
