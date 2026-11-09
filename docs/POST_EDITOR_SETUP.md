# CornerSpan post editor dashboard

The Git-backed editor lives at `/admin/posts` after this branch is deployed. It is
not a replacement for the calculators or for manually authored custom JSX guides.

## Required production setup

1. Create a **fine-grained GitHub personal access token** scoped to the
   `km7max-cmd/cornerspan` repository, with **Contents: Read and write**.
   Choose an expiry and rotate it periodically. Never commit the token, share
   it in chat, or enter it in the editor UI.
2. In **Cloudflare dashboard → Workers & Pages → cornerspan → Settings →
   Variables and Secrets**, add two **Secret** runtime variables:
   - `CORNERSPAN_GITHUB_TOKEN`: the GitHub token.
   - `CORNERSPAN_EDITOR_PASSWORD`: a unique, long admin password.
3. Deploy the site and keep runtime secrets available to the Worker on
   subsequent deployments. If using Wrangler CLI, secrets can also be added
   using `npx wrangler secret put <KEY> --name cornerspan`.
4. Open `https://www.cornerspan.com/admin/posts` and enter the editor
   password (NOT the GitHub token). For extra access control, restrict
   `/admin/*` through Cloudflare Access and enable a WAF rate-limit rule
   on `/api/editor/*`.

The editor returns a configuration error until the two runtime secrets exist.
This is intentional: publishing must never work without server-side credentials.

## How publishing works

- An existing TypeScript calculator article is overlaid with its edited data
  in `data/editor-overrides.json`. The original file and slug are retained.
- A new article is saved in `data/editor-posts.json` and appears in the same
  blog listing, URL structure, metadata, and article renderer as other calculator
  articles once the build succeeds.
- The editor saves a GitHub commit to the repository's `main` branch.
  Cloudflare must deploy that commit before website visitors see it.
- The **Save local draft** action stores the article only in the current
  browser's localStorage. It does not push drafts to the public GitHub repo.
  Clear browser data or switch devices and those drafts may disappear.
- GitHub file SHA checks prevent silently overwriting another editor commit.
- Existing URL slugs are locked; publication dates are preserved for edits.
  The modification date updates on publish.

## Current scope

- Supports new articles and edits to articles rendered by `CalculatorArticle`:
  headings, introduction, paragraphs, formula, examples, FAQs, sources,
  meta title/description, tags, category, image path, alt text, and related links.
- Existing comparison tables within article sections are retained but are not
  directly editable in the visual form yet.
- Custom JSX article bodies (such as the trapezoid and retaining-wall articles)
  are **read-only** in this editor until migrated deliberately; this avoids
  showing edited data that would not affect the actual body.
- No image upload, scheduled publishing, or multi-device cloud drafts in v1.
- All editorial changes require human fact-checking, internal-link review,
  and calculation verification before publishing.

## Security notes

Only the server route reads `CORNERSPAN_GITHUB_TOKEN`; it is never sent to the
browser. Admin requests use the password over HTTPS without cookies, so generic
cross-site forms cannot authenticate them. Use Cloudflare Access/WAF for rate
limiting and a second security layer. Keep the password out of URLs, browser
storage, and logs. Revoke the token if it may have been compromised.

## Build verification

The existing pull-request GitHub Actions workflow runs regression tests,
`npm run build`, article smoke tests, and mobile QA. Merge only after the
workflow succeeds and review the generated diff before enabling production.
