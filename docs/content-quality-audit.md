# Content and navigation audit — October 26, 2026

## Evidence and scope
Direct HTTP requests to 46 primary live pages returned 200: 14 calculator pages, 16 blog posts, four guide articles and 12 navigation, utility and information pages. All 46 had one H1 and one main element. The latest article content and About methodology were present. Search-service extracts were older, so direct HTML was used for these conclusions.

The live sitemap returned 200 and contained 40 unique URLs, including all 16 blog posts. robots.txt returned 200 and allowed crawling. Favorites, history and settings were noindex. Source and generated HTML retain noindex on category/tag collections. Word counts were used only to spot anomalies, not as an AdSense threshold.

## Findings and changes
- About had a repeated brand in its title and no canonical: fixed.
- Gravel had a duplicate gravel-depth ID shared by an input and an article section: renamed the section and its TOC link.
- Three tag pages containing spaces rendered a not-found response inside HTTP 200 HTML. Decoding tag route parameters fixes area calculation, trapezoid area and square feet; canonical paths encode spaces.
- The older retaining-wall article rounded the base count before adding waste, unlike the calculator and newer guide. Apply the allowance before final rounding: 137.2 × 1.10 = 150.92, rounded to 151. Update table, example and FAQ together; explain the assumed brick module.
- Add server-rendered worked-example links to every calculator page, using existing post metadata. These links help a visitor understand inputs, purchasing quantities and limitations without adding duplicate articles or sending full article data to the client.
- Remove unsupported 100+ calculator and 99.9% accuracy claims from the unused Stats component to prevent their reintroduction. The component was not observed in the live home page.
- Contact failures now explain that delivery failed instead of always blaming empty fields. Issue-report placeholder asks for URL, units, inputs and expected result.
- Harden shared metadata title handling against duplicate branding.

## Validation
- TypeScript and production build passed; 86 build entries generated.
- Parsed 80 built content HTML pages, including tag/category collections: one H1/main, unique IDs, canonicals for indexable pages, working local route/fragment targets, nonempty image alt text, no repeated brand suffix.
- Image paths checked against the actual GitHub tree because the local checkout does not contain every binary asset. This is not a live image-loading or visual-quality test.
- Rendered all 16 blog posts and four guide articles; checks for headings, TOC targets, canonical metadata and visible FAQ/schema consistency passed.
- Calculator-reading links present on all 14 generated calculator pages.
- No calculator calculation logic changed. Retaining-wall example arithmetic independently checked.

## Limits and review readiness
This audit does not establish that Google's low-value-content classification has been cleared. No AdSense review was submitted. No invented author credentials, customer testimonials or firsthand project claims were added.

Actual contact-message delivery was not tested because that would send a message. This pass did not run a mobile browser interaction audit, accessibility conformance review, Core Web Vitals measurement, plagiarism scan or Search Console inspection. Page content and source were inspected; these are not substitutes for an AdSense decision.

Confirm this commit is deployed on Cloudflare before requesting review. Inspect the About canonical/title, a multiword tag page, the gravel TOC target and calculator article links in the deployed version.

Official reference: https://support.google.com/adsense/answer/7299563?hl=en
