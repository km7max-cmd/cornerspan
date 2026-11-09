// Smoke-test fail-closed admin routes on a production Next server without Cloudflare credentials.
// Run after npm run build; do not set CF_ACCESS_* environment variables in CI.
const { spawn } = require("node:child_process");
const assert = require("node:assert/strict");
const port = 31987;
const origin = "http://127.0.0.1:" + port;
const server = spawn("npm", ["run", "start", "--", "-p", String(port), "-H", "127.0.0.1"], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, CF_ACCESS_TEAM_DOMAIN: "", CF_ACCESS_AUD: "" },
});
let output = "";
server.stdout.on("data", chunk => { output += chunk.toString(); });
server.stderr.on("data", chunk => { output += chunk.toString(); });
async function request(path, options = {}) {
  return fetch(origin + path, { ...options, redirect: "manual" });
}
async function waitUntilReady() {
  for (let n = 0; n < 90; n++) {
    if (server.exitCode !== null) throw new Error("Server exited: " + output.slice(-2500));
    try {
      const response = await request("/");
      if (response.status === 200) return;
    } catch { /* server not ready */ }
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  throw new Error("Server did not start: " + output.slice(-2500));
}
(async () => {
  try {
    await waitUntilReady();
    const scenarios = [
      ["/admin", {}, 404],
      ["/admin/preview/any-test-slug", {}, 404],
      ["/api/admin/drafts", {}, 401],
      ["/api/admin/publish", {}, 401],
      ["/api/admin/drafts", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }, 401],
      ["/api/admin/publish", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" }, 401],
      ["/api/admin/drafts?slug=test&revision=1", { method: "DELETE" }, 401],
      ["/api/admin/publish?slug=test", { method: "DELETE" }, 401],
    ];
    for (const [path, options, expected] of scenarios) {
      const response = await request(path, options);
      assert.equal(response.status, expected, path + " must deny unauthorized requests");
      console.log("PASS", options.method || "GET", path, response.status);
    }
    const existing = await request("/blog");
    assert.equal(existing.status, 200, "Public blog remains accessible");
    console.log("PASS public blog", existing.status);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    server.kill("SIGTERM");
  }
})();
