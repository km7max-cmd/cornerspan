// Opt-in acceptance test for the isolated feature-branch Cloudflare Preview only.
// No production host, legacy slug or existing record is ever a write target.
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { JSDOM } = require('jsdom');
const origin = 'https://feature-posts-admin-dashboard-cornerspan.eenadutech.workers.dev';
const slug = 'preview-seo-smoke-' + randomUUID();
let cookie = ''; let draftRevision = 0; let publicationRevision = 0;
let attemptedDraft = false; let attemptedPublication = false;
async function request(path, options = {}) {
  assert.ok(path.startsWith('/') && !path.startsWith('//'), 'Same-host paths only');
  return fetch(origin + path, { ...options, redirect: 'manual', signal: AbortSignal.timeout(30000),
    headers: { Origin: origin, ...(cookie ? { Cookie: cookie } : {}), ...options.headers } });
}
async function json(path, method, body) {
  const response = await request(path, { method, headers: { 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}) });
  assert.equal(response.status, 200, `${method} ${path} returned HTTP ${response.status}`);
  return response.json();
}
async function publicArticle() {
  const response = await fetch(`${origin}/blog/${slug}`, { redirect: 'manual', cache: 'no-store' });
  assert.equal(response.status, 200, 'Published Preview article');
  return new JSDOM(await response.text()).window.document;
}
async function cleanup() {
  // Re-read revisions after an interrupted response. The UUID is exclusive to this run.
  if (attemptedPublication) {
    const { posts } = await json('/api/admin/publish', 'GET');
    const post = posts.find(p => p.slug === slug);
    if (post) await json(`/api/admin/publish?slug=${slug}&revision=${post.revision}`, 'DELETE');
    attemptedPublication = false;
  }
  assert.equal((await request(`/blog/${slug}`)).status, 404, 'Unpublished article returns HTTP 404');
  if (attemptedDraft) {
    const { drafts } = await json('/api/admin/drafts', 'GET');
    const draft = drafts.find(p => p.slug === slug);
    if (draft) await json(`/api/admin/drafts?slug=${slug}&revision=${draft.revision}`, 'DELETE');
    attemptedDraft = false;
  }
  const { drafts } = await json('/api/admin/drafts', 'GET');
  assert.ok(!drafts.some(p => p.slug === slug), 'Test draft cleanup');
}
(async () => {
  assert.equal(process.env.CMS_PREVIEW_URL, origin, 'Explicitly set CMS_PREVIEW_URL to the documented branch Preview origin');
  assert.ok(process.env.CMS_PREVIEW_TEST_PASSWORD, 'Set CMS_PREVIEW_TEST_PASSWORD securely in the authenticated environment; never commit it');
  const login = await request('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: process.env.CMS_PREVIEW_TEST_PASSWORD }) });
  delete process.env.CMS_PREVIEW_TEST_PASSWORD;
  assert.equal(login.status, 200, `Preview login returned HTTP ${login.status}; no automatic credential retries`);
  cookie = (login.headers.get('set-cookie') || '').split(';')[0];
  assert.ok(cookie.startsWith('__Host-cornerspan_admin='), 'Secure admin session');
  const admin = await request('/admin');
  assert.equal(admin.status, 200);
  assert.match(await admin.text(), /Isolated Preview/, 'Preview environment label required before writes');
  const [{ drafts }, { posts }] = await Promise.all([json('/api/admin/drafts', 'GET'), json('/api/admin/publish', 'GET')]);
  assert.ok(!drafts.some(p => p.slug === slug) && !posts.some(p => p.slug === slug), 'Fresh unique slug');
  const seo = { bodyReplacement: true, metaTitle: 'Concrete patio preview acceptance', focusKeyword: 'concrete patio', secondaryKeywords: ['patio volume'],
    canonicalUrl: `https://www.cornerspan.com/blog/${slug}`, noindex: true, nofollow: true,
    ogTitle: 'Concrete patio sharing preview', ogDescription: 'A disposable Preview acceptance article.', ogImage: '/og-image.webp',
    tocEnabled: true, schemaEnabled: true,
    featuredImage: { url: '/og-image.webp', alt: 'CornerSpan construction calculator illustration', title: 'Construction planning',
      caption: 'Temporary Preview test image', sourceUrl: 'https://www.cornerspan.com', linkUrl: '/calculators/concrete', width: 1200, height: 630 } };
  const post = { slug, title: 'Concrete patio test article', description: 'Check concrete patio measurements with a worked example, clearly stated assumptions and a link to the calculator. Preview testing only.',
    category: 'Construction', tags: ['preview-test'], publishedAt: '',
    body: 'Measure the concrete patio before ordering. This disposable article tests Preview only.\n\n## Concrete patio measurements\n\nUse the [concrete calculator](/calculators/concrete) and check assumptions.\n\n### Depth conversion\n\nConvert inches to feet.\n\n| Width | Length |\n| --- | --- |\n| 12 ft | 20 ft |\n\n![Diagram ALT](/og-image.webp "Planning")', seo };
  console.log('Testing isolated Preview slug:', slug);
  try {
    attemptedDraft = true;
    let saved = (await json('/api/admin/drafts', 'POST', { ...post, expectedRevision: 0 })).draft;
    draftRevision = saved.revision;
    post.body += '\n\n## Review before ordering\n\nConfirm dimensions with your supplier.';
    saved = (await json('/api/admin/drafts', 'POST', { ...post, expectedRevision: draftRevision })).draft;
    draftRevision = saved.revision;
    const reloaded = (await json('/api/admin/drafts', 'GET')).drafts.find(p => p.slug === slug);
    assert.deepEqual(reloaded.seo, seo, 'All SEO/image fields persist');
    assert.equal(reloaded.body, post.body, 'Edited body persists');
    assert.equal((await request(`/blog/${slug}`)).status, 404, 'Draft stays private');
    assert.equal((await request(`/admin/preview/${slug}?replaceBody=1`)).status, 200, 'Saved authenticated preview');
    attemptedPublication = true;
    publicationRevision = (await json('/api/admin/publish', 'POST', { slug, revision: draftRevision, replaceBody: true, expectedPublicationRevision: 0 })).revision;
    let document = await publicArticle();
    assert.equal(document.querySelectorAll('article h1').length, 1, 'Single article H1');
    assert.equal(document.title, seo.metaTitle, 'Separate SEO title');
    assert.equal(document.querySelector('link[rel="canonical"]').href, seo.canonicalUrl);
    assert.match(document.querySelector('meta[name="robots"]').content, /noindex.*nofollow/);
    assert.equal(document.querySelector('meta[property="og:title"]').content, seo.ogTitle);
    assert.equal(document.querySelector('meta[property="og:image"]').content, 'https://www.cornerspan.com/og-image.webp');
    assert.equal(document.querySelector('meta[name="twitter:card"]').content, 'summary_large_image');
    assert.ok(document.querySelector(`img[alt="${seo.featuredImage.alt}"]`));
    assert.ok(document.querySelector('table'));
    const tocLinks = [...document.querySelectorAll('nav[aria-label="Table of Contents"] a')];
    assert.ok(tocLinks.length >= 3);
    for (const link of tocLinks) assert.ok(document.getElementById(link.hash.slice(1)), 'TOC target exists');
    const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent));
    assert.ok(schemas.some(s => s['@type'] === 'Article'), 'Article structured data');
    assert.ok(!(await (await request('/sitemap.xml')).text()).includes(`/blog/${slug}`), 'Noindex excluded from sitemap');
    post.seo.tocEnabled = false; post.seo.schemaEnabled = false;
    draftRevision = (await json('/api/admin/drafts', 'POST', { ...post, expectedRevision: draftRevision })).draft.revision;
    publicationRevision = (await json('/api/admin/publish', 'POST', { slug, revision: draftRevision, replaceBody: true, expectedPublicationRevision: publicationRevision })).revision;
    document = await publicArticle();
    assert.equal(document.querySelector('nav[aria-label="Table of Contents"]'), null, 'TOC setting affects public HTML');
    assert.ok(![...document.querySelectorAll('script[type="application/ld+json"]')].some(s => JSON.parse(s.textContent)['@type'] === 'Article'), 'Schema setting affects public HTML');
    console.log('PASS Preview D1 create/edit/reload, featured image/ALT, private preview, publish, public SEO/TOC/social/schema and noindex sitemap');
  } finally {
    await cleanup();
    console.log('PASS Preview unpublish → HTTP 404 → delete test draft');
    await request('/api/admin/logout', { method: 'POST' }); cookie = '';
  }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
