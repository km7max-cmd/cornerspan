// Execute real TypeScript admin handlers against SQLite and signed test sessions.
// No Cloudflare account, production database or real credentials are used.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { webcrypto } = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");
const { renderToStaticMarkup } = require("react-dom/server");
const React = require("react");
const ts = require("typescript");
const { NextRequest } = require("next/server");
const root = path.resolve(__dirname, "..");
const sql = new DatabaseSync(":memory:");
for (const file of fs.readdirSync(path.join(root, "migrations")).sort()) {
  if (file.endsWith(".sql")) sql.exec(fs.readFileSync(path.join(root, "migrations", file), "utf8"));
}
let beforeRun;
const database = {
  prepare(query) {
    let values = [];
    return {
      bind(...parameters) { values = parameters; return this; },
      async all() { return { results: sql.prepare(query).all(...values) }; },
      async first() { return sql.prepare(query).get(...values) || null; },
      async run() {
        if (beforeRun) beforeRun(query);
        const result = sql.prepare(query).run(...values);
        return { success: true, meta: { changes: Number(result.changes) } };
      },
    };
  },
};
const config = {
  ADMIN_LOGIN_PASSWORD: "A-Strong-Private-Example-Password-DoNotUse!",
  ADMIN_SESSION_SECRET: "separate-test-signing-secret-minimum-32-bytes",
  ADMIN_DB: database,
};
let env = { ...config };
let requestHeaders = new Headers();
const modules = new Map();
function load(relative) {
  let filename = path.resolve(root, relative);
  if (!fs.existsSync(filename) && filename.endsWith(".ts")) filename = filename.slice(0, -3) + ".tsx";
  if (modules.has(filename)) return modules.get(filename).exports;
  const module = { exports: {} };
  modules.set(filename, module);
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  function dependency(name) {
    if (name === "@opennextjs/cloudflare") return { getCloudflareContext: () => ({ env }) };
    if (name === "next/headers") return { headers: async () => requestHeaders };
    if (name === "next/navigation") return { notFound: () => { throw new Error("NEXT_HTTP_ERROR_FALLBACK;404"); } };
    if (name === "next/link") return { default: props => React.createElement("a", { href: props.href }, props.children) };
    if (/components\/blog\/(CalculatorArticle|TrapezoidAreaArticle|RetainingWallArticle)$/.test(name)) return { default: () => null };
    if (name.startsWith(".")) return load(path.resolve(path.dirname(filename), name + ".ts"));
    return require(name);
  }
  vm.runInNewContext("(function(require,module,exports){" + code + "\n})", {
    console, URL, TextDecoder, TextEncoder, Uint8Array, atob, btoa,
    crypto: webcrypto,
  }, { filename })(dependency, module, module.exports);
  return module.exports;
}
const normalize = value => JSON.parse(JSON.stringify(value));
const {
  ADMIN_COOKIE_NAME, hasAdminAccess, createAdminSession,
  verifyAdminSession, verifyAdminPassword,
} = load("lib/admin-auth.ts");
const login = load("app/api/admin/login/route.ts");
const logout = load("app/api/admin/logout/route.ts");
const drafts = load("app/api/admin/drafts/route.ts");
const media = load("app/api/admin/media/route.ts");
const publications = load("app/api/admin/publish/route.ts");
const { getPublicBlogPosts, findPublishedPost } = load("lib/published-posts.ts");
const { blogPosts } = load("data/blog.ts");
const { calculatorArticles } = load("data/calculator-articles.ts");
const { samePostContent, initialBodyReplacement } = load("lib/admin-editor-state.ts");

(async () => {
  try {
    const validToken = await createAdminSession();
    assert.ok(validToken);
    async function authenticate(value) {
      requestHeaders = new Headers(value ? { cookie: ADMIN_COOKIE_NAME + "=" + value } : {});
      return hasAdminAccess();
    }
    assert.equal(await authenticate(validToken), true);
    async function signedSession(changes) {
      const original = JSON.parse(Buffer.from(validToken.split(".")[0], "base64url").toString("utf8"));
      const data = Buffer.from(JSON.stringify({ ...original, ...changes })).toString("base64url");
      const key = await webcrypto.subtle.importKey("raw", new TextEncoder().encode(config.ADMIN_SESSION_SECRET),
        { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      const signature = await webcrypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
      return data + "." + Buffer.from(signature).toString("base64url");
    }
    const now = Math.floor(Date.now() / 1000);
    for (const invalid of [
      { exp: now - 10, iat: now - 10 - 8 * 60 * 60 },
      { iat: now + 3600, exp: now + 3600 + 8 * 60 * 60 },
      { purpose: "public" }, { nonce: "a" }, { exp: "9999999999" },
    ]) assert.equal(await authenticate(await signedSession(invalid)), false, "invalid signed session claims");
    assert.equal(await verifyAdminPassword(config.ADMIN_LOGIN_PASSWORD), true);
    assert.equal(await verifyAdminPassword("Incorrect Password"), false);
    for (const value of [null, "", "broken", "x".repeat(3000),
      validToken.slice(0, -5) + "AAAAA", validToken.split(".")[0] + ".AAAA",
      validToken.split(".")[0] + "." + validToken.split(".")[1] + ".extra"]) {
      assert.equal(await authenticate(value), false, "invalid signed session");
    }
    for (const field of ["ADMIN_LOGIN_PASSWORD", "ADMIN_SESSION_SECRET"]) {
      env = { ...config, [field]: "" };
      assert.equal(await authenticate(validToken), false, "missing " + field);
    }
    env = { ...config, ADMIN_SESSION_SECRET: "this-is-an-entirely-different-long-signing-secret" };
    assert.equal(await authenticate(validToken), false, "rotation revokes session");
    env = { ...config };
    assert.equal(await authenticate(validToken), true);
    console.log("PASS password verifier, signed sessions, expiry/config fail-closed, tampering and secret rotation");

    const origin = "https://preview.example.test";
    async function call(api, method, input, query = "", overrides = {}) {
      const headers = new Headers({ origin, cookie: ADMIN_COOKIE_NAME + "=" + validToken, "content-type": "application/json", ...overrides });
      const request = new NextRequest(origin + "/api/admin/test" + query, {
        method, headers, ...(input === undefined ? {} : { body: JSON.stringify(input) }),
      });
      requestHeaders = headers;
      const response = await api[method](request);
      return { status: response.status, data: await response.json(), headers: response.headers };
    }
    for (const api of [drafts, publications]) for (const method of ["GET", "POST", "DELETE"]) {
      assert.equal((await call(api, method, method === "POST" ? {} : undefined, "", { cookie: ADMIN_COOKIE_NAME + "=forged" })).status, 401);
    }
    assert.equal((await call(drafts, "POST", {}, "", { origin: "https://other.example.test" })).status, 403);
    assert.equal((await call(publications, "POST", {}, "", { origin: "" })).status, 403);
    assert.equal((await call(publications, "DELETE", undefined, "?slug=test&revision=1", { origin: "https://other.example.test" })).status, 403);
    const signedIn = await call(login, "POST", { password: config.ADMIN_LOGIN_PASSWORD }, "",
      { "cf-connecting-ip": "203.0.113.40" });
    assert.equal(signedIn.status, 200, JSON.stringify(signedIn.data));
    const sessionCookie = signedIn.headers.get("set-cookie") || "";
    for (const part of ["__Host-cornerspan_admin=", "HttpOnly", "Secure", "SameSite=Strict"]) {
      assert.ok(sessionCookie.toLowerCase().includes(part.toLowerCase()), "missing session cookie protection " + part);
    }
    const signedOut = await call(logout, "POST");
    assert.equal(signedOut.status, 200);
    assert.ok((signedOut.headers.get("set-cookie") || "").includes("Max-Age=0"));
    for (let i = 0; i < 5; i++) {
      const failure = await call(login, "POST", { password: "totally-wrong" }, "",
        { "cf-connecting-ip": "203.0.113.41" });
      assert.equal(failure.status, 401, "first five attempts require correct credentials");
    }
    assert.equal((await call(login, "POST", { password: config.ADMIN_LOGIN_PASSWORD }, "",
      { "cf-connecting-ip": "203.0.113.41" })).status, 429);
    assert.equal((await call(login, "POST", { password: config.ADMIN_LOGIN_PASSWORD }, "",
      { origin: "https://evil.example.test" })).status, 403);
    env = { ADMIN_DB: database };
    assert.equal((await call(login, "POST", { password: config.ADMIN_LOGIN_PASSWORD })).status, 503,
      "missing private login secrets must fail closed");
    env = { ...config };
    console.log("PASS login/logout cookies, D1 5/15-min rate limit, CSRF and protected routes");
    assert.deepEqual(normalize(await getPublicBlogPosts()), normalize(blogPosts));
    const draft = { slug: "private-preview-test", title: "Controlled preview article",
      description: "A controlled preview article used to verify secure drafts, publication conflicts, and unchanged existing CornerSpan content.",
      category: "Construction", tags: ["preview-test"], publishedAt: "2026-11-09",
      body: "## Test section\n\n" + "A useful measurement example for a controlled draft. ".repeat(40), expectedRevision: 0 };
    const { defaultSeo, validateSeo, emptyImage } = load("lib/cms-model.ts");
    const { analyzeSeo } = load("lib/seo-analysis.ts");
    const { parseMarkdown, contentsFor } = load("lib/cms-markdown.ts");
    const { cmsMetadata } = load("lib/cms-metadata.ts");
    const CmsArticle = load("components/blog/CmsArticle.tsx").default;
    draft.seo = { ...defaultSeo(), metaTitle: "Concrete planning: an independent SEO title", focusKeyword: "concrete planning",
      secondaryKeywords: ["measurement example"], canonicalUrl: "https://www.cornerspan.com/blog/private-preview-test",
      noindex: true, nofollow: true, ogTitle: "Social construction title", ogDescription: "Social summary with a useful worked example.",
      featuredImage: { ...emptyImage(), url: "/og-image.webp", alt: "A project measurement diagram", title: "Measurement diagram", caption: "Measure twice", sourceUrl: "https://example.com/source", linkUrl: "/calculators/concrete", width: 1200, height: 630 } };
    draft.body += "\n\n### Measurement details\n\nRead the [concrete calculator](/calculators/concrete) and [reference](https://example.com/reference).\n\n![Measured slab](/og-image.webp)\n\n| Size | Units |\n| --- | --- |\n| 12 | feet |";
    for (const url of ["javascript:alert(1)", "//evil.test/x", "/\\evil.test/x", "data:image/svg+xml,bad"]) {
      assert.ok(validateSeo({ ...draft.seo, featuredImage: { ...draft.seo.featuredImage, url } }), "unsafe image URL rejected");
      assert.equal((await call(drafts, "POST", { ...draft, seo: { ...draft.seo, ogImage: url } })).status, 400);
    }
    const headingBlocks = parseMarkdown("# Accidental H1\n\n## Repeat\n\n### Repeat\n\n## Repeat-2\n\n```md\n## Not a heading\n```\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert) ");
    const ids = headingBlocks.filter(b => b.id).map(b => b.id);
    assert.equal(new Set(ids).size, ids.length, "collision-free stable heading anchors");
    assert.equal(contentsFor(headingBlocks).length, 3, "TOC ignores code and H1");
    const unsafeHtml = renderToStaticMarkup(React.createElement(CmsArticle, { post: { ...draft, body: "# Accident\n\n<script>alert(1)</script>\n\n[bad](javascript:alert)" } }));
    assert.equal((unsafeHtml.match(/<h1[ >]/g) || []).length, 1, "public article has exactly one H1");
    assert.doesNotMatch(unsafeHtml, /href="javascript:|<script>alert/, "raw markup and unsafe links cannot execute");
    const report = analyzeSeo(draft, [{ ...draft, slug: "duplicate" }]);
    assert.ok(report.score >= 0 && report.score <= 100);
    assert.equal(report.checks.find(c => c.id === "unique-meta").status, "WARNING");
    assert.equal(report.checks.find(c => c.id === "alt").status, "PASS");
    assert.equal(report.checks.find(c => c.id === "internal").status, "PASS");
    assert.equal(report.checks.find(c => c.id === "external").status, "PASS");
    assert.equal(analyzeSeo({ ...draft, body: "## Title\n\n![](/og-image.webp)" }).checks.find(c => c.id === "alt").status, "FAIL");
    assert.equal(analyzeSeo({ ...draft, body: "# Wrong\n\n#### Skipped" }).checks.find(c => c.id === "hierarchy").status, "FAIL");
    let saved = await call(drafts, "POST", draft);
    assert.equal(saved.status, 200);
    assert.equal(saved.data.draft.revision, 1);
    assert.deepEqual(normalize(saved.data.draft.seo), normalize(draft.seo), "all SEO/media fields survive D1 serialization");
    assert.equal(saved.headers.get("cache-control"), "no-store");
    assert.equal(await findPublishedPost(draft.slug), null);
    assert.deepEqual(normalize(await getPublicBlogPosts()), normalize(blogPosts));
    assert.equal((await call(drafts, "POST", draft)).status, 409);
    const publish = { slug: draft.slug, revision: 1, replaceBody: true, expectedPublicationRevision: 0 };
    let published = await call(publications, "POST", publish);
    assert.equal(published.status, 200, JSON.stringify(published.data));
    assert.equal(published.data.revision, 1);
    assert.equal((await findPublishedPost(draft.slug)).body, draft.body);
    assert.equal((await findPublishedPost(draft.slug)).bodyOverride, true, "new CMS posts must render their saved Markdown body");
    // Exercise the real Next blog route and CMS React renderer, not just the D1 record.
    const publicPage = load("app/blog/[slug]/page.tsx").default;
    const publishedHtml = renderToStaticMarkup(await publicPage({
      params: Promise.resolve({ slug: draft.slug }),
    }));
    assert.match(publishedHtml, /Controlled preview article/, "public CMS route renders published title");
    assert.match(publishedHtml, /Test section/, "public CMS route renders Markdown heading");
    assert.match(publishedHtml, /A useful measurement example/, "public CMS route renders saved body");
    assert.doesNotMatch(publishedHtml, /Private draft preview/, "public CMS page is not marked private");

    assert.match(publishedHtml, /aria-label="Table of Contents"/);
    assert.match(publishedHtml, /href="#measurement-details"/);
    assert.match(publishedHtml, /id="measurement-details"/);
    assert.match(publishedHtml, /alt="A project measurement diagram"/);
    assert.match(publishedHtml, /width="1200" height="630"/);
    assert.match(publishedHtml, /Measure twice/);
    assert.match(publishedHtml, /<table/);
    const loadedPost = await findPublishedPost(draft.slug);
    const metadata = await load("app/blog/[slug]/page.tsx").generateMetadata({ params: Promise.resolve({ slug: draft.slug }) });
    assert.deepEqual(normalize(metadata.title), { absolute: draft.seo.metaTitle });
    assert.equal(metadata.alternates.canonical, draft.seo.canonicalUrl);
    assert.equal(metadata.robots.index, false);
    assert.equal(metadata.robots.follow, false);
    assert.equal(metadata.openGraph.title, draft.seo.ogTitle);
    assert.equal(metadata.twitter.title, draft.seo.ogTitle);
    assert.equal(metadata.openGraph.images[0].url, "https://www.cornerspan.com/og-image.webp");
    const schema = JSON.parse(publishedHtml.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(schema.headline, draft.title);
    assert.equal(schema.mainEntityOfPage, draft.seo.canonicalUrl);
    assert.equal(schema.image[0], "https://www.cornerspan.com/og-image.webp");
    const toggled = renderToStaticMarkup(React.createElement(CmsArticle, { post: { ...loadedPost, seo: { ...loadedPost.seo, tocEnabled: false, schemaEnabled: false } } }));
    assert.doesNotMatch(toggled, /aria-label="Table of Contents"|application\/ld\+json/);
    assert.equal((await getPublicBlogPosts({ forSitemap: true })).some(p => p.slug === draft.slug), false, "noindex is excluded from sitemap");
    assert.equal((await getPublicBlogPosts()).length, blogPosts.length + 1);
    assert.equal((await call(publications, "POST", publish)).status, 409);
    saved = await call(drafts, "POST", { ...draft, title: "Updated draft", expectedRevision: 1 });
    assert.equal(saved.data.draft.revision, 2);
    assert.equal((await findPublishedPost(draft.slug)).title, draft.title);
    assert.equal((await call(publications, "POST", { ...publish, expectedPublicationRevision: 1 })).status, 409);
    published = await call(publications, "POST", { ...publish, revision: 2, expectedPublicationRevision: 1 });
    assert.equal(published.status, 200);
    assert.equal(published.data.revision, 2);
    assert.equal((await call(publications, "DELETE", undefined, "?slug=" + draft.slug + "&revision=1")).status, 409);
    assert.equal((await findPublishedPost(draft.slug)).title, "Updated draft");

    // Simulate another save after validation, immediately before the write executes.
    beforeRun = query => {
      if (!query.includes("INSERT INTO admin_published_posts")) return;
      beforeRun = undefined;
      sql.prepare("UPDATE admin_post_drafts SET title='Concurrent draft',revision=revision+1 WHERE slug=?").run(draft.slug);
    };
    assert.equal((await call(publications, "POST", { ...publish, revision: 2, expectedPublicationRevision: 2 })).status, 409);
    assert.equal((await findPublishedPost(draft.slug)).title, "Updated draft");
    beforeRun = query => {
      if (!query.includes("INSERT INTO admin_published_posts")) return;
      beforeRun = undefined;
      sql.prepare("UPDATE admin_published_posts SET title='Concurrent publication',revision=revision+1 WHERE slug=?").run(draft.slug);
    };
    assert.equal((await call(publications, "POST", { ...publish, revision: 3, expectedPublicationRevision: 2 })).status, 409);
    assert.equal((await findPublishedPost(draft.slug)).title, "Concurrent publication");
    assert.equal((await call(publications, "DELETE", undefined, "?slug=" + draft.slug + "&revision=3")).status, 200);
    assert.equal((await call(drafts, "DELETE", undefined, "?slug=" + draft.slug + "&revision=2")).status, 409);
    assert.equal((await call(drafts, "DELETE", undefined, "?slug=" + draft.slug + "&revision=3")).status, 200);
    assert.deepEqual(normalize(await getPublicBlogPosts()), normalize(blogPosts));
    assert.equal(await findPublishedPost(draft.slug), null, "unpublished test content must not remain public");
    await assert.rejects(
      () => publicPage({ params: Promise.resolve({ slug: draft.slug }) }),
      /NEXT_HTTP_ERROR_FALLBACK;404/,
      "unpublished CMS-only slug must render public 404",
    );

    assert.equal((await call(drafts, "GET")).data.drafts.some(post => post.slug === draft.slug), false, "deleted test draft must not appear in saved drafts");
    assert.equal((await call(publications, "GET")).data.posts.some(post => post.slug === draft.slug), false, "unpublished test post must not appear in publication status");
    console.log("PASS real draft and publish handlers: CRUD, CSRF, private drafts, atomic conflicts and unpublish");
    console.log("PASS new CMS article body override, unpublished public lookup, and complete D1 test-record cleanup");

    const article = calculatorArticles.find(article => blogPosts.some(post => post.slug === article.slug));
    const existing = blogPosts.find(post => post.slug === article.slug);
    await call(drafts, "POST", { ...draft, slug: article.slug, body: "", seo: undefined, publishedAt: "2099-01-01" });
    assert.equal((await call(publications, "POST", { ...publish, slug: article.slug, replaceBody: false })).status, 409, "legacy update needs explicit approval");
    const metadataPublish = await call(publications, "POST", { ...publish, slug: article.slug, replaceBody: false, approveLegacyUpdate: true });
    assert.equal(metadataPublish.status, 200);
    const override = await findPublishedPost(article.slug);
    assert.equal(override.bodyOverride, false);
    assert.equal(override.body, "");
    assert.equal(override.publishedAt, existing.publishedAt);
    await call(publications, "DELETE", undefined, "?slug=" + article.slug + "&revision=1");
    assert.deepEqual(normalize(await getPublicBlogPosts()), normalize(blogPosts));
    assert.equal(initialBodyReplacement({ builtIn: true, bodyOverride: false }), false);
    assert.equal(initialBodyReplacement({ builtIn: true, bodyOverride: true }), true);
    assert.equal(initialBodyReplacement({ builtIn: false }), true);
    assert.equal(initialBodyReplacement(), true);
    assert.equal(samePostContent(draft, { ...draft, updatedAt: "ignored", revision: 8 }), true);
    assert.equal(samePostContent(draft, { ...draft, body: draft.body + " unsaved" }), false);
    assert.equal(samePostContent(draft, { ...draft, seo: { ...draft.seo, metaTitle: "Unsaved SEO title" } }), false);
    assert.equal((await call(media, "GET", undefined, "", { cookie: "forged" })).status, 401);
    assert.equal((await call(media, "POST", {}, "", { origin: "https://evil.example.test" })).status, 403);
    assert.equal((await call(media, "POST", { image: { ...emptyImage(), url: "javascript:evil" }, expectedRevision: 0 })).status, 400);
    const imageSaved = await call(media, "POST", { image: draft.seo.featuredImage, expectedRevision: 0 });
    assert.equal(imageSaved.status, 200, JSON.stringify(imageSaved.data));
    assert.equal((await call(media, "GET")).data.media[0].alt, draft.seo.featuredImage.alt);
    const imageUpdate = { image: { ...draft.seo.featuredImage, alt: "New description" }, id: imageSaved.data.media.id, expectedRevision: 1 };
    assert.equal((await call(media, "POST", imageUpdate)).status, 200);
    assert.equal((await call(media, "POST", imageUpdate)).status, 409);
    assert.equal((await call(media, "GET")).data.uploadAvailable, false);
    console.log("PASS original content/URLs/dates, explicit legacy approval, metadata-only overrides, CMS body reopening and unsaved SEO edits");
    console.log("PASS SEO field persistence, real public metadata, robots/sitemap, social image, Article schema, linked featured image, TOC, tables and safe Markdown");
    console.log("PASS persistent URL media library, CSRF/auth checks, unsafe URL rejection and revision conflicts");
  } finally { sql.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
