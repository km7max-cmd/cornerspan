// Execute the real TypeScript handlers against SQLite and signed test JWTs.
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
  CF_ACCESS_TEAM_DOMAIN: "cornerspan-test.cloudflareaccess.com",
  CF_ACCESS_AUD: "a".repeat(64),
  CF_ACCESS_ADMIN_EMAIL: "owner@example.test",
  ADMIN_DB: database,
};
let env = { ...config };
let requestHeaders = new Headers();
let jwk;
let certsAvailable = true;
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
    console, TextDecoder, TextEncoder, Uint8Array, atob,
    crypto: webcrypto,
    fetch: async url => {
      assert.equal(url, "https://" + config.CF_ACCESS_TEAM_DOMAIN + "/cdn-cgi/access/certs");
      return { ok: certsAvailable, json: async () => ({ keys: [jwk] }) };
    },
  }, { filename })(dependency, module, module.exports);
  return module.exports;
}
const normalize = value => JSON.parse(JSON.stringify(value));
const { hasAdminAccess } = load("lib/admin-auth.ts");
const drafts = load("app/api/admin/drafts/route.ts");
const publications = load("app/api/admin/publish/route.ts");
const { getPublicBlogPosts, findPublishedPost } = load("lib/published-posts.ts");
const { blogPosts } = load("data/blog.ts");
const { calculatorArticles } = load("data/calculator-articles.ts");
const { samePostContent, initialBodyReplacement } = load("lib/admin-editor-state.ts");

(async () => {
  try {
    const pair = await webcrypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
    jwk = { ...await webcrypto.subtle.exportKey("jwk", pair.publicKey), kid: "test-key", alg: "RS256", use: "sig" };
    const claims = { iss: "https://" + config.CF_ACCESS_TEAM_DOMAIN, aud: [config.CF_ACCESS_AUD],
      exp: Math.floor(Date.now() / 1000) + 600, email: config.CF_ACCESS_ADMIN_EMAIL };
    async function token(claimChanges = {}, headerChanges = {}) {
      const encode = value => Buffer.from(JSON.stringify(value)).toString("base64url");
      const data = encode({ alg: "RS256", kid: "test-key", ...headerChanges }) + "." + encode({ ...claims, ...claimChanges });
      const signature = await webcrypto.subtle.sign("RSASSA-PKCS1-v1_5", pair.privateKey, new TextEncoder().encode(data));
      return data + "." + Buffer.from(signature).toString("base64url");
    }
    const validToken = await token();
    async function authenticate(value) {
      requestHeaders = new Headers(value ? { "cf-access-jwt-assertion": value } : {});
      return hasAdminAccess();
    }
    assert.equal(await authenticate(validToken), true);
    assert.equal(await authenticate(await token({ aud: config.CF_ACCESS_AUD })), true);
    for (const changes of [
      { iss: "https://wrong.cloudflareaccess.com" }, { aud: ["wrong-audience"] },
      { exp: 1 }, { exp: "9999999999" }, { email: "other@example.test" }, { email: undefined },
      { nbf: Math.floor(Date.now() / 1000) + 3600 }, { iat: "invalid" },
    ]) assert.equal(await authenticate(await token(changes)), false, JSON.stringify(changes));
    for (const value of [null, "broken", "x".repeat(12001), validToken.split(".").slice(0, 2).join(".") + ".AAAA",
      await token({}, { alg: "none" }), await token({}, { kid: "unknown-key" })])
      assert.equal(await authenticate(value), false);
    for (const field of ["CF_ACCESS_TEAM_DOMAIN", "CF_ACCESS_AUD", "CF_ACCESS_ADMIN_EMAIL"]) {
      env = { ...config, [field]: "" };
      assert.equal(await authenticate(validToken), false, "missing " + field);
    }
    env = { ...config }; certsAvailable = false;
    assert.equal(await authenticate(validToken), false);
    certsAvailable = true;
    console.log("PASS signed JWT, owner identity, issuer, audience, expiry, signature, algorithm and missing configuration");

    const origin = "https://preview.example.test";
    async function call(api, method, input, query = "", overrides = {}) {
      const headers = new Headers({ origin, "cf-access-jwt-assertion": validToken, "content-type": "application/json", ...overrides });
      const request = new NextRequest(origin + "/api/admin/test" + query, {
        method, headers, ...(input === undefined ? {} : { body: JSON.stringify(input) }),
      });
      requestHeaders = headers;
      const response = await api[method](request);
      return { status: response.status, data: await response.json(), headers: response.headers };
    }
    for (const api of [drafts, publications]) for (const method of ["GET", "POST", "DELETE"]) {
      assert.equal((await call(api, method, method === "POST" ? {} : undefined, "", { "cf-access-jwt-assertion": "forged" })).status, 401);
    }
    assert.equal((await call(drafts, "POST", {}, "", { origin: "https://other.example.test" })).status, 403);
    assert.equal((await call(publications, "POST", {}, "", { origin: "" })).status, 403);
    assert.equal((await call(publications, "DELETE", undefined, "?slug=test&revision=1", { origin: "https://other.example.test" })).status, 403);
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
