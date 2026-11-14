// Browser-only test fixture. Never imported by app routes; no credentials or real D1 calls.
import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminPostEditor from '../../app/admin/post-editor';
import CmsArticle from '../../components/blog/CmsArticle';
import { blogPosts } from '../../data/blog';
import { calculatorArticles } from '../../data/calculator-articles';
const json = (key) => JSON.parse(localStorage.getItem(key) || '{}');
const drafts = json('qa-drafts'); const published = json('qa-published'); const media = json('qa-media');
const persist = () => { localStorage.setItem('qa-drafts', JSON.stringify(drafts)); localStorage.setItem('qa-published', JSON.stringify(published)); localStorage.setItem('qa-media', JSON.stringify(media)); };
const reply = (data, status = 200) => Promise.resolve(new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } }));
window.fetch = async (input, options = {}) => {
  const url = new URL(String(input), location.origin); const method = options.method || 'GET'; const path = url.pathname;
  const payload = options.body ? JSON.parse(String(options.body)) : {};
  if (path === '/api/admin/drafts') {
    if (method === 'GET') return reply({ drafts: Object.values(drafts) });
    if (method === 'POST') {
      const old = drafts[payload.slug]; if ((old?.revision || 0) !== payload.expectedRevision) return reply({ error: 'Draft changed elsewhere. Refresh before saving.' }, 409);
      const draft = { ...payload, revision: (old?.revision || 0) + 1, updatedAt: new Date().toISOString() }; delete draft.expectedRevision;
      drafts[draft.slug] = draft; persist(); return reply({ draft });
    }
    if (method === 'DELETE') { delete drafts[url.searchParams.get('slug')]; persist(); return reply({ deleted: true }); }
  }
  if (path === '/api/admin/publish') {
    if (method === 'GET') return reply({ posts: Object.values(published) });
    if (method === 'POST') { const draft = drafts[payload.slug]; const revision = (published[payload.slug]?.revision || 0) + 1; published[payload.slug] = { ...draft, revision }; persist(); return reply({ published: true, revision }); }
    if (method === 'DELETE') { delete published[url.searchParams.get('slug')]; persist(); return reply({ unpublished: true }); }
  }
  if (path === '/api/admin/media') {
    if (method === 'GET') return reply({ media: Object.values(media), uploadAvailable: false });
    const record = { ...payload.image, id: payload.id || crypto.randomUUID(), revision: payload.expectedRevision + 1, updatedAt: new Date().toISOString() };
    media[record.id] = record; persist(); return reply({ media: record });
  }
  if (path.startsWith('/blog/')) return reply({}, published[path.split('/').pop()] ? 200 : 404);
  return reply({ error: 'No remote network requests are available in this test fixture.' }, 404);
};
const catalog = blogPosts.map(post => {
  const article = calculatorArticles.find(a => a.slug === post.slug);
  return { ...post, builtIn: true, body: article ? [...article.intro, ...article.sections.flatMap(s => ['## ' + s.title, ...s.paragraphs])].join('\n\n') : '' };
});
const slug = location.pathname.split('/').pop();
const draftPreview = location.pathname.startsWith('/admin/preview/');
const publicPreview = location.pathname.startsWith('/blog/');
const item = draftPreview ? drafts[slug] : published[slug];
createRoot(document.getElementById('root')).render(<><div style={{ padding: '7px 18px', font: '11px Arial', color: '#816828', background: '#fff4d9' }}>Isolated UI test fixture · Simulated storage · No Cloudflare or Production access</div>{draftPreview || publicPreview ? item ? <CmsArticle post={item} preview={draftPreview}/> : <h1>404 — Article not published</h1> : <AdminPostEditor posts={catalog} environment="Local test fixture"/>}</>);
