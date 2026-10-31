#!/usr/bin/env node
// Run against a local Next.js production server (or set QA_ORIGIN).
// This is a regression guard, not a Google AdSense approval check.
const assert = require("node:assert/strict");
const base = (process.env.QA_ORIGIN || "http://127.0.0.1:3100").replace(/\/$/, "");
const calculators = [
  "area","asphalt","brick","concrete","fence","gravel","paint",
  "paver","roofing","sod-turf","square-footage","steel","tile","topsoil"
];
const expectedStatic = ["/", "/calculators", "/guides", "/blog", "/about", "/contact", "/privacy", "/terms", "/disclaimer"];
const errors = [];
function fail(msg) { errors.push(msg); console.error("FAIL:", msg); }
async function get(path) {
  const response = await fetch(base + path, {redirect:"manual", signal:AbortSignal.timeout(20000)});
  return {response, body:await response.text()};
}
(async () => {
  const xml = await get("/sitemap.xml");
  assert.equal(xml.response.status, 200, "sitemap must be available");
  const routes = [...xml.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => {
    const url = new URL(m[1].replaceAll("&amp;", "&"));
    if (url.hostname !== "www.cornerspan.com") fail("External URL in sitemap: " + url);
    return url.pathname;
  });
  const unique = [...new Set(routes)];
  if (unique.length !== routes.length) fail("Duplicate sitemap routes");
  for (const path of expectedStatic) if (!unique.includes(path)) fail("Missing primary sitemap route: "+path);
  for (const slug of calculators) if (!unique.includes("/calculators/"+slug)) fail("Missing calculator: "+slug);
  const guides = unique.filter(p => p.startsWith("/guides/"));
  const posts = unique.filter(p => p.startsWith("/blog/"));
  if (guides.length !== 4) fail("Expected 4 guides, got "+guides.length);
  if (posts.length !== 20) fail("Expected 20 blog articles, got "+posts.length);
  const robots = await get("/robots.txt");
  if (robots.response.status !== 200 || !robots.body.includes("sitemap.xml")) fail("robots.txt is missing the sitemap");
  let seen = 0;
  for (const path of unique) {
    const {response,body} = await get(path);
    if (response.status !== 200) {fail(path+" returned HTTP "+response.status); continue;}
    const main = [...body.matchAll(/<main(?:\s|>)/gi)].length;
    const h1 = [...body.matchAll(/<h1(?:\s|>)/gi)].length;
    if (main !== 1) fail(path+": expected one main; got "+main);
    if (h1 !== 1) fail(path+": expected one H1; got "+h1);
    if (!/<meta\s+name="description"\s+content="[^"]+/i.test(body)) fail(path+": missing description");
    const canonical = body.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
    if (!canonical || new URL(canonical,base).pathname !== path) fail(path+": missing or mismatched canonical "+canonical);
    if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(body)) fail(path+": indexable sitemap URL has noindex");
    const visible = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]*>/g, " ").replace(/&\w+;/g, " ").replace(/\s+/g, " ").trim();
    const words = visible.split(/\s+/).length;
    if (path.startsWith("/blog/") && (words < 250 || !/<article(?:\s|>)/i.test(body)))
      fail(path+": article body may be incomplete ("+words+" visible words)");
    if (path.startsWith("/calculators/") && !/<input(?:\s|>)/i.test(body))
      fail(path+": calculator has no rendered input");
    seen++;
  }
  for (const personal of ["/history","/favorites","/settings"]) {
    if (unique.includes(personal)) fail("Private utility page indexed in sitemap: "+personal);
    const p = await get(personal);
    if (p.response.status !== 200 || !/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(p.body))
      fail(personal+": expected publicly accessible noindex utility page");
  }
  const missing = await get("/blog/this-article-does-not-exist-cornerspan");
  if (missing.response.status !== 404) fail("Missing blog article is not a real HTTP 404");
  console.log("Checked", seen, "sitemap pages;",calculators.length,"calculators;",posts.length,"posts;",guides.length,"guides");
  if (errors.length) {console.error(errors.length+" site-readiness checks failed.");process.exitCode=1;}
  else console.log("PASS: sitemap, metadata, indexability, content stubs, utility noindex, 404, and all listed routes.");
})().catch(e=>{console.error(e);process.exitCode=1;});
