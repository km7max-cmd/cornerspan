// Execute real TypeScript admin handlers against SQLite and signed test sessions.
// No Cloudflare account, production database or real credentials are used.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { webcrypto } = require("node:crypto");
const { DatabaseSync } = require("node:sqlite");
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
  const filename = path.resolve(root, relative);
  if (modules.has(filename)) return modules.get(filename).exports;
  const module = { exports: {} };
  modules.set(filename, module);
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  function dependency(name) {
    if (name === "@opennextjs/cloudflare") return { getCloudflareContext: () => ({ env }) };
    if (name === "next/headers") return { headers: async () => requestHeaders };
    if (name.startsWith(".")) return load(path.resolve(path.dirname(filename), name + ".ts"));
    return require(name);
  }
  vm.runInNewContext("(function(require,module,exports){" + code + "\n})", {
    console, TextDecoder, TextEncoder, Uint8Array, atob, btoa,
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
    let saved = await call(drafts, "POST", draft);
    assert.equal(saved.status, 200);
    assert.equal(saved.data.draft.revision, 1);
    assert.equal(saved.headers.get("cache-control"), "no-store");
    assert.equal(await findPublishedPost(draft.slug), null);
    assert.deepEqual(normalize(await getPublicBlogPosts()), normalize(blogPosts));
    assert.equal((await call(drafts, "POST", draft)).status, 409);
    const publish = { slug: draft.slug, revision: 1, replaceBody: true, expectedPublicationRevision: 0 };
    let published = await call(publications, "POST", publish);
    assert.equal(published.status, 200, JSON.stringify(published.data));
    assert.equal(published.data.revision, 1);
    assert.equal((await findPublishedPost(draft.slug)).body, draft.body);
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
    console.log("PASS real draft and publish handlers: CRUD, CSRF, private drafts, atomic conflicts and unpublish");

    const article = calculatorArticles.find(article => blogPosts.some(post => post.slug === article.slug));
    const existing = blogPosts.find(post => post.slug === article.slug);
    await call(drafts, "POST", { ...draft, slug: article.slug, body: "", publishedAt: "2099-01-01" });
    const metadataPublish = await call(publications, "POST", { ...publish, slug: article.slug, replaceBody: false });
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
    console.log("PASS original content/URLs/dates, metadata-only overrides, CMS body reopening and unsaved edits");
  } finally { sql.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
