// End-to-end client workflow simulation with real React component, isolated DOM and mock transport.
// Runs ONLY in CI; never connects to Cloudflare or uses site-owner credentials.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const { JSDOM } = require("jsdom");
const React = require("react");
const root = path.resolve(__dirname, "..");

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "https://preview.example.test/admin",
  pretendToBeVisual: true,
});
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
global.MutationObserver = dom.window.MutationObserver;
global.IS_REACT_ACT_ENVIRONMENT = true;
dom.window.requestAnimationFrame = callback => { callback(); return 1; };
dom.window.HTMLElement.prototype.scrollIntoView = function() { scrollTarget = this.id; };
let scrollTarget = "";
let refreshes = 0;
let confirmActions = 0;
dom.window.confirm = () => { confirmActions++; return true; };
const { render, fireEvent, screen, waitFor, cleanup } = require("@testing-library/react");

const repoFiles = new Map();
function load(relative) {
  let filename = path.resolve(root, relative);
  if (!path.extname(filename)) filename += ".ts";
  if (!fs.existsSync(filename) && filename.endsWith(".ts")) filename = filename.slice(0, -3) + ".tsx";
  if (repoFiles.has(filename)) return repoFiles.get(filename).exports;
  const mod = { exports: {} };
  repoFiles.set(filename, mod);
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  function dependency(name) {
    if (name.endsWith(".css")) return {};
    if (name === "next/link") return { default: props => React.createElement("a", { href: props.href }, props.children) };
    if (name === "next/navigation") return { useRouter: () => ({ refresh: () => { refreshes++; } }) };
    if (name.startsWith(".")) return load(path.resolve(path.dirname(filename), name));
    return require(name);
  }
  const filenameWithExt = filename;
  vm.runInNewContext("(function(require,module,exports){" + code + "\n})", {
    console, fetch: global.fetch, window: dom.window, document: dom.window.document,
    URL: dom.window.URL, Blob: dom.window.Blob, File: dom.window.File,
    navigator: dom.window.navigator,
    setTimeout, clearTimeout,
  }, { filename: filenameWithExt })(dependency, mod, mod.exports);
  return mod.exports;
}

const draftStore = new Map();
const publishedStore = new Map();
const requests = [];
const legacy = {
  slug: "original-concrete-guide",
  title: "Original Concrete Guide",
  description: "An existing original legacy guide that must not be changed by the draft operations.",
  category: "Concrete",
  tags: ["concrete"], publishedAt: "2026-01-01", body: "## Existing concrete",
  builtIn: true, bodyOverride: false,
};
function response(body, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => body };
}
global.fetch = async (url, opts = {}) => {
  const method = opts.method || "GET";
  requests.push({ url: String(url), method, body: opts.body });
  if (url === "/api/admin/drafts") {
    if (method === "GET") return response({ drafts: [...draftStore.values()] });
    if (method === "POST") {
      const fields = JSON.parse(opts.body);
      const old = draftStore.get(fields.slug);
      if ((old?.revision || 0) !== fields.expectedRevision)
        return response({ error: "Draft changed elsewhere." }, 409);
      const saved = { ...fields, revision: (old?.revision || 0) + 1,
        updatedAt: "2026-11-11T00:00:00.000Z" };
      delete saved.expectedRevision;
      draftStore.set(fields.slug, saved);
      return response({ draft: saved });
    }
  }
  if (String(url).startsWith("/api/admin/drafts?") && method === "DELETE") {
    const params = new URL("https://preview.example.test" + url).searchParams;
    const item = draftStore.get(params.get("slug"));
    if (!item || item.revision !== Number(params.get("revision")))
      return response({ error: "Draft was changed" }, 409);
    draftStore.delete(params.get("slug"));
    return response({ deleted: true });
  }
  if (String(url).startsWith("/blog/admin-storage-check-")) {
    return response({ error: "Not found" }, 404);
  }
  if (url === "/api/admin/publish") {
    if (method === "GET") return response({ posts: [...publishedStore.values()].map(p => ({
      slug: p.slug, revision: p.revision,
    })) });
    if (method === "POST") {
      const payload = JSON.parse(opts.body);
      const draft = draftStore.get(payload.slug);
      if (!draft || draft.revision !== payload.revision) return response({ error: "stale revision" }, 409);
      if ((publishedStore.get(payload.slug)?.revision || 0) !== payload.expectedPublicationRevision)
        return response({ error: "stale publication" }, 409);
      const revision = payload.expectedPublicationRevision + 1;
      publishedStore.set(payload.slug, { ...draft, revision, replaceBody: payload.replaceBody });
      return response({ published: true, revision, url: "/blog/" + payload.slug });
    }
  }
  if (String(url).startsWith("/api/admin/publish?") && method === "DELETE") {
    const params = new URL("https://preview.example.test" + url).searchParams;
    const item = publishedStore.get(params.get("slug"));
    if (!item || item.revision !== Number(params.get("revision")))
      return response({ error: "stale publication" }, 409);
    publishedStore.delete(params.get("slug"));
    return response({ unpublished: true });
  }
  return response({ error: "Mock route unknown: " + method + " " + url }, 500);
};

const Editor = load("app/admin/post-editor.tsx").default;
function field(label) { return screen.getByLabelText(label, { exact: false }); }
function draftClick() {
  return screen.getByRole("button", { name: /\+ New draft/ });
}
(async () => {
  try {
    const view = render(React.createElement(Editor, { posts: [legacy] }));
    fireEvent.click(screen.getByRole("button", { name: /Settings/ }));
    await waitFor(() => assert.ok(screen.getByText(/Draft database: Connected/)));
    await waitFor(() => assert.ok(screen.getByText(/Publishing status: Ready/)));
    // One-click test performs a real API-style draft write/read/delete in isolated CI data.
    fireEvent.click(screen.getByRole("button", { name: "Test draft storage safely" }));
    await waitFor(() => assert.ok(screen.getByText(/PASS: D1 draft saved, reloaded, hidden from public blog, and deleted/)));
    assert.equal(draftStore.size, 0, "self-test must leave no saved drafts behind");
    assert.ok(requests.some(r => r.url.startsWith("/blog/admin-storage-check-")),
      "self-test must verify private drafts are not publicly readable");
    fireEvent.click(screen.getByRole("button", { name: /All Posts/ }));
    const search = field("Search posts");
    fireEvent.change(search, { target: { value: "Concrete" } });
    assert.ok(screen.getByRole("button", { name: /Original Concrete Guide/ }));
    fireEvent.change(search, { target: { value: "" } });

    fireEvent.click(draftClick());
    assert.ok(document.getElementById("post-editor"), "mobile editor is a dedicated view");
    assert.equal(field("H1 Article Title").value, "", "new draft starts empty");
    fireEvent.change(field("H1 Article Title"), { target: { value: "CornerSpan CI Draft" } });
    fireEvent.change(field("URL Slug"), { target: { value: "cornerspan-ci-draft" } });
    fireEvent.change(field("SEO Meta Description"), { target: {
      value: "A temporary test article to test the CornerSpan editor client workflows in a CI environment.",
    } });
    fireEvent.change(field("SEO Meta Title"), { target: { value: "A distinct search title" } });
    fireEvent.change(field("Focus Keyword"), { target: { value: "editor" } });
    fireEvent.change(field("Featured image URL"), { target: { value: "/og-image.webp" } });
    fireEvent.change(field("Featured image ALT text"), { target: { value: "A clear project diagram" } });
    fireEvent.change(field("Tags (comma-separated)"), { target: { value: "testing, mobile," } });
    assert.equal(field("Tags (comma-separated)").value, "testing, mobile,",
      "typing a comma must not remove the delimiter on mobile");
    fireEvent.change(screen.getByRole("textbox", { name: "Article body (Markdown)" }), { target: { value: "## Testing editor\n\nTest draft only." } });
    fireEvent.click(screen.getByRole("button", { name: "Save Draft" }));
    await waitFor(() => assert.ok(screen.getByText(/Saved to D1 database as a draft/)));
    assert.equal(draftStore.get("cornerspan-ci-draft").revision, 1);
    assert.deepEqual(Array.from(draftStore.get("cornerspan-ci-draft").tags), ["testing", "mobile"]);
    assert.equal(draftStore.get("cornerspan-ci-draft").body, "## Testing editor\n\nTest draft only.");
    assert.ok(screen.getByText(/Saved · Revision 1/));
    assert.ok(screen.getByRole("link", { name: /Preview saved draft/ }));
    assert.equal(legacy.title, "Original Concrete Guide", "original catalog must remain unchanged");
    assert.equal(draftStore.get("cornerspan-ci-draft").seo.metaTitle, "A distinct search title");
    fireEvent.click(screen.getByRole("tab", { name: "Live article preview" }));
    assert.ok(screen.getByRole("navigation", { name: "Table of Contents" }));
    assert.ok(screen.getByRole("link", { name: "Testing editor" }));
    assert.ok(screen.getByRole("img", { name: "A clear project diagram" }));
    fireEvent.click(screen.getByRole("tab", { name: "Content editor" }));

    // Reload the component, just as a browser reload would, and verify D1 persistence.
    cleanup();
    render(React.createElement(Editor, { posts: [legacy] }));
    await waitFor(() => assert.ok(screen.getByText(/1 saved drafts/)));
    fireEvent.click(screen.getByRole("button", { name: /CornerSpan CI Draft/ }));
    assert.equal(field("H1 Article Title").value, "CornerSpan CI Draft");
    assert.equal(field("SEO Meta Title").value, "A distinct search title");
    assert.equal(field("Featured image ALT text").value, "A clear project diagram");
    assert.ok(document.getElementById("post-editor"));

    // Test update revision and then mock publication; only fake CI data is written.
    fireEvent.change(field("H1 Article Title"), { target: { value: "Updated CornerSpan CI Draft" } });
    fireEvent.click(screen.getByRole("button", { name: "Save Draft" }));
    await waitFor(() => assert.equal(draftStore.get("cornerspan-ci-draft").revision, 2));
    assert.equal(draftStore.get("cornerspan-ci-draft").title, "Updated CornerSpan CI Draft");

    fireEvent.click(screen.getByRole("button", { name: "Publish saved draft" }));
    await waitFor(() => assert.ok(screen.getByText(/Published\. Verify the live URL/)));
    assert.equal(publishedStore.get("cornerspan-ci-draft").revision, 1);
    assert.ok(screen.getByRole("button", { name: "Unpublish CMS version" }));

    fireEvent.click(screen.getByRole("button", { name: "Unpublish CMS version" }));
    await waitFor(() => assert.equal(publishedStore.size, 0));
    assert.ok(screen.getByText(/CMS publication removed/));

    fireEvent.click(screen.getByRole("button", { name: "Delete draft" }));
    await waitFor(() => assert.equal(draftStore.size, 0));
    assert.ok(screen.getByText(/Draft deleted/));
    assert.equal(legacy.title, "Original Concrete Guide");
    assert.ok(refreshes >= 2);
    assert.ok(confirmActions >= 3);
    cleanup();
    console.log("PASS one-click private D1 write/read/404/delete self-test, leaving no test drafts");
    console.log("PASS editor mobile selection, search, draft save, reload, edit, preview link, publish, unpublish and delete");
    console.log("PASS existing article catalog remains unchanged; no real Preview/Production D1 writes occurred");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    cleanup();
    dom.window.close();
  }
})();