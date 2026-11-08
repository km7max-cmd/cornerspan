# Cloudflare Workers deployment

The project uses Next.js 15 and the OpenNext Cloudflare adapter. A plain `next build` only produces `.next` and cannot be uploaded as a Worker with `wrangler versions upload`.

## Cloudflare Workers Builds dashboard

- Build command: `npm run build:cloudflare`
- Deploy command: `npx wrangler versions upload` (upload only; a rollout is required to serve the new version), or `npx wrangler deploy` if the project is configured for immediate deployment.
- Project root: repository root.
- `wrangler.jsonc` supplies the Worker entry point and asset binding.

For manual deploy: `npm install`, `npm run build:cloudflare`, `npx wrangler deploy`. The build script invokes Next's normal build and then generates `.open-next/worker.js` and `.open-next/assets`.

Before changing traffic, inspect build logs for OpenNext errors, validate Worker size limits and deployment routes, and test all calculators and redirects. Cloudflare settings are external to GitHub and must be updated in the dashboard; existing production remains active until rollout.
