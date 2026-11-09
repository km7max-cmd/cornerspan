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

## 3. Production launch checklist

- Verify unsigned requests to `/admin` return 404.
- Verify invalid, expired, and wrong-audience Access tokens are rejected.
- Verify a real authorized session can open the dashboard.
- Check that `/admin` returns `noindex` robots metadata.
- Run `npm ci`, `npm run build`, and a Cloudflare preview deployment.
- Confirm existing blog URLs, canonical metadata, calculator pages, sitemap, and redirects remain unchanged.
- Do not deploy an unprotected preview branch.

## Current limits

This stage adds **server-side authenticated access** only. Draft saving is still browser-local;
Export JSON can be used to move drafts. **No publish endpoint exists.** Cloudflare D1
storage and full content editing must be integrated and tested before production use.

Never assume a route name alone or a client-side login widget provides security.
