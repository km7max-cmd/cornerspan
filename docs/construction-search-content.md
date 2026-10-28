# Construction calculator search intent — October 28, 2026

## Objective and scope

Support discovery of CornerSpan for US material-estimating searches. The supplied Ahrefs and Semrush screenshots are research inputs, not verified current search volume or proof of ranking difficulty. Their keyword lists mix material calculators with OSRS gaming, loans, physical calculator brands and location-based whole-house pricing. Those unrelated capabilities are not advertised or added.

| Destination | Reader need |
| --- | --- |
| `/` | Free online construction calculators; choose a project and open a working tool. |
| `/calculators` | Browse the complete tool directory by material or measurement. |
| `/blog/how-to-use-a-construction-calculator` | Select the output, enter units correctly, independently verify a result and preserve assumptions. |
| `/blog/construction-material-takeoff-checklist` | Produce a material-by-material quantity sheet with scope, layers, sale units and unresolved items. |
| `/blog/how-to-calculate-construction-project-cost` | Price actual purchases, compare equivalent quotes, calculate person-hours and show exclusions and uncertainty. |

The three new articles share a workflow but answer different questions. All example USD rates, percentages, depths and pack sizes are identified as illustrative. The budget is expressly partial and does not imply a completed patio price. No ZIP-code pricing, mobile-store app, offline capability, credential, review or project experience is invented.

## Implementation

- Retain the homepage's existing exact-topic title and canonical. Clarify its H1 and description; derive the visible calculator count from the catalog.
- Add a project-to-tool selector and three-step reading path on the homepage. Add supporting links from the directory and relevant existing articles.
- Add three original articles to the established article renderer and blog catalog: 19 posts total. Preserve all existing article URLs and dates.
- Use the established title, description, canonical, Article and breadcrumb metadata. FAQ data matches visible answers; no rich-result promise is made.
- Add actual recorded article modification/publication dates to sitemap entries, rather than stamping every page with the deployment date.
- Keep category/tag archives noindex as before. Use a single-word Estimating category compatible with the existing archive route.

## Checks and remaining measurement

`node scripts/test-planning-content.cjs` checks 19 distinct post URLs, the tutorial's Area Calculator inputs, Paver Calculator quantities, pack rounding, quote totals and labor sensitivity. The production build and generated HTML checks cover titles, headings, canonical URLs, local links, fragments, article schemas and sitemap discovery.

Search Console impressions, clicks, query positions and indexing were not accessed. Source changes cannot establish that Google has crawled, indexed or ranked a URL. Evaluate the homepage and each article separately after verified production deployment; do not use the number of posts or a tool's difficulty badge as a success metric.

References: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [NIST conversion factors](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9).
