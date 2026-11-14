import { seoSettings, SITE_URL, type SeoSettings } from './cms-model';
import { parseMarkdown, contentsFor, inlineTokens, plainText, wordCount } from './cms-markdown';
export type SeoPost = { slug: string; title: string; description: string; body?: string; category?: string; tags?: string[]; seo?: SeoSettings };
export type SeoCheck = { id: string; group: string; label: string; status: 'PASS' | 'WARNING' | 'FAIL'; detail: string; weight: number };
const normalized = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
const contains = (s: string, key: string) => Boolean(key) && (' ' + normalized(s) + ' ').includes(' ' + normalized(key) + ' ');
export function analyzeSeo(post: SeoPost, catalog: SeoPost[] = []) {
  const seo = seoSettings(post.seo); const body = post.body || ''; const blocks = parseMarkdown(body);
  const headings = blocks.filter(b => b.type === 'heading');
  const paragraphs = blocks.filter(b => b.type === 'paragraph' && plainText(b.text).trim());
  const tokens = blocks.filter(b => !['code', 'rule'].includes(b.type)).flatMap(b => inlineTokens(b.text));
  const text = blocks.filter(b => !['code', 'rule'].includes(b.type)).map(b => plainText(b.text)).join(' ');
  const words = wordCount(text); const images = tokens.filter(t => t.type === 'image');
  const links = tokens.filter(t => t.type === 'link');
  const internal = links.filter(t => t.url?.startsWith('/') || (() => { try { return ['cornerspan.com', 'www.cornerspan.com'].includes(new URL(t.url!).hostname); } catch { return false; } })());
  const external = links.filter(t => !internal.includes(t) && !t.url?.startsWith('#'));
  const duplicateHeadings = headings.filter((h, i) => headings.findIndex(other => normalized(other.text) === normalized(h.text)) !== i);
  const skippedHeadings = headings.filter((h, i) => (h.depth || 2) > (i ? headings[i - 1].depth || 2 : 1) + 1);
  const longParagraphs = paragraphs.filter(p => wordCount(plainText(p.text)) > 120);
  const sentences = text.split(/[.!?]+(?:\s|$)/).filter(s => wordCount(s));
  const longSentences = sentences.filter(s => wordCount(s) > 25);
  const checks: SeoCheck[] = [];
  function check(id: string, group: string, label: string, status: SeoCheck['status'], detail: string, weight = 3) { checks.push({ id, group, label, status, detail, weight }); }
  const title = seo.metaTitle || post.title;
  check('h1', 'Search appearance', 'Article title', post.title.trim() ? post.title.length > 100 ? 'WARNING' : 'PASS' : 'FAIL', post.title.trim() ? 'Keep the H1 clear and specific to the reader’s task.' : 'Write the main article title.', 6);
  check('meta-title', 'Search appearance', 'SEO title length', !title.trim() ? 'FAIL' : title.length >= 30 && title.length <= 60 ? 'PASS' : 'WARNING', `${title.length} characters. About 30–60 is a useful editorial range, not a Google limit. Blank SEO title uses the H1.`, 5);
  check('description', 'Search appearance', 'Meta description', !post.description.trim() ? 'FAIL' : post.description.length >= 120 && post.description.length <= 160 ? 'PASS' : 'WARNING', `${post.description.length} characters. Aim for a helpful summary; roughly 120–160 often fits. Google may rewrite or truncate it.`, 5);
  const others = catalog.filter(p => p.slug !== post.slug);
  const titleDuplicate = others.some(p => normalized(seoSettings(p.seo).metaTitle || p.title) === normalized(title) && title.trim());
  const h1Duplicate = others.some(p => normalized(p.title) === normalized(post.title) && post.title.trim());
  const descDuplicate = others.some(p => normalized(p.description) === normalized(post.description) && post.description.trim());
  check('unique-meta', 'Search appearance', 'Unique titles and description', titleDuplicate || h1Duplicate || descDuplicate ? 'WARNING' : 'PASS', titleDuplicate || h1Duplicate || descDuplicate ? 'Another post uses this H1, SEO title or description. Make each page’s purpose distinct.' : 'No duplicate H1, SEO title or description found in the available catalog.');
  check('focus', 'Topic coverage', 'Focus keyword', seo.focusKeyword.trim() ? 'PASS' : 'WARNING', 'Choose one reader query to guide your writing. This is an editorial aid, not a meta keywords tag.');
  for (const [id, label, content] of [
    ['keyword-title', 'Keyword in SEO title', title], ['keyword-h1', 'Keyword in H1', post.title],
    ['keyword-description', 'Keyword in description', post.description], ['keyword-slug', 'Keyword in URL slug', post.slug],
    ['keyword-intro', 'Keyword in introduction', plainText(paragraphs[0]?.text || '').split(/\s+/).slice(0, 100).join(' ')],
    ['keyword-heading', 'Keyword in H2 or H3', contentsFor(blocks).map(h => h.text).join(' ')],
  ]) check(id, 'Topic coverage', label, contains(content, seo.focusKeyword) ? 'PASS' : 'WARNING', seo.focusKeyword ? 'Use the topic naturally where it helps readers. Synonyms are fine; avoid forced repetition.' : 'Set a focus keyword to review this check.', 2);
  check('length', 'Content quality', 'Content depth', words === 0 ? 'FAIL' : words < 300 ? 'WARNING' : 'PASS', `${words} words. ${words < 300 ? 'Check whether the reader has enough explanation, a worked example and practical limitations.' : 'Review accuracy, original examples and task completeness.'} Word count is not a ranking target.`, 4);
  check('hierarchy', 'Content quality', 'Heading hierarchy', headings.some(h => h.depth === 1) ? 'FAIL' : skippedHeadings.length || !headings.length ? 'WARNING' : 'PASS', headings.some(h => h.depth === 1) ? 'The title already supplies H1. Change body H1 headings to H2; preview automatically demotes them.' : skippedHeadings.length ? 'Start sections at H2 and avoid skipping heading levels.' : 'Organize sections with H2, subsections with H3, and details with H4.', 5);
  check('duplicate-headings', 'Content quality', 'Distinct headings', duplicateHeadings.length ? 'WARNING' : 'PASS', duplicateHeadings.length ? `${duplicateHeadings.length} repeated heading(s). Clarify what makes each section different.` : 'Heading text is unique.');
  check('paragraphs', 'Content quality', 'Readable paragraphs', longParagraphs.length ? 'WARNING' : 'PASS', longParagraphs.length ? `${longParagraphs.length} paragraph(s) exceed 120 words. Split where the idea changes.` : `${paragraphs.length} paragraphs. Keep one main idea in each paragraph.`);
  check('readability', 'Content quality', 'Sentence clarity', longSentences.length > Math.max(2, sentences.length * .25) ? 'WARNING' : 'PASS', `${longSentences.length} sentence(s) exceed 25 words. Explain units, assumptions and unfamiliar terms. This heuristic does not judge accuracy.`);
  check('images', 'Images and navigation', 'Helpful article images', images.length ? 'PASS' : 'WARNING', `${images.length} inline image(s). Add an original diagram or relevant project photo when useful.`);
  const missingAlt = images.filter(i => !i.text.trim()).length;
  check('alt', 'Images and navigation', 'Image ALT text', missingAlt ? 'FAIL' : images.length ? 'PASS' : 'WARNING', missingAlt ? `${missingAlt} inline image(s) lack ALT text. Describe the image’s useful information.` : 'Write descriptive ALT for informative images. Decorative images may intentionally have empty ALT.', 5);
  check('featured', 'Images and navigation', 'Featured image', seo.featuredImage.url ? seo.featuredImage.alt.trim() ? 'PASS' : 'FAIL' : 'WARNING', seo.featuredImage.url ? 'Featured images need descriptive ALT. Check the visual preview and source rights.' : 'Choose a featured image for the article and sharing card.', 5);
  check('internal', 'Images and navigation', 'Internal links', internal.length ? 'PASS' : 'WARNING', `${internal.length} internal link(s). Link to a relevant calculator and supporting guide.`);
  check('external', 'Images and navigation', 'External sources', external.length ? 'PASS' : 'WARNING', `${external.length} external link(s) detected. Manually verify source reliability, relevance and accuracy; URLs alone cannot establish these.`);
  check('toc', 'Images and navigation', 'Table of Contents', seo.tocEnabled && contentsFor(blocks).length ? 'PASS' : 'WARNING', seo.tocEnabled ? 'TOC uses H2/H3 headings and unique stable anchors. Add sections if empty.' : 'TOC is disabled for this post. Consider enabling it for a longer guide.');
  check('indexing', 'Search appearance', 'Search indexing', seo.noindex ? 'WARNING' : 'PASS', seo.noindex ? 'Noindex is selected: this post will be excluded from the sitemap and request search exclusion.' : 'Index is selected. Indexing remains a search engine decision.');
  check('canonical', 'Search appearance', 'Canonical URL', seo.canonicalUrl && seo.canonicalUrl.replace(/\/$/, '') !== `${SITE_URL}/blog/${post.slug}` ? 'WARNING' : 'PASS', seo.canonicalUrl ? 'A custom canonical is set. Confirm it identifies the preferred original page.' : 'Uses this post’s established public URL.');
  const total = checks.reduce((n, c) => n + c.weight, 0);
  const score = Math.round(100 * checks.reduce((n, c) => n + c.weight * (c.status === 'PASS' ? 1 : c.status === 'WARNING' ? .5 : 0), 0) / total);
  return { score, checks, headings, duplicateHeadings, skippedHeadings, stats: { words, characters: text.length, readingMinutes: words ? Math.ceil(words / 220) : 0, paragraphs: paragraphs.length, headings: headings.length, h2: headings.filter(h => h.depth === 2).length, h3: headings.filter(h => h.depth === 3).length, h4: headings.filter(h => h.depth === 4).length, longParagraphs: longParagraphs.length }, secondary: seo.secondaryKeywords.map(keyword => ({ keyword, found: contains(text, keyword) })) };
}
export function linkingSuggestions(post: SeoPost, catalog: SeoPost[]) {
  const words = new Set(normalized([post.title, post.seo?.focusKeyword, post.category, ...(post.tags || [])].join(' ')).split(' ').filter(w => w.length > 3));
  return catalog.filter(p => p.slug !== post.slug && !(post.body || '').includes(`/blog/${p.slug}`))
    .map(p => ({ post: p, relevance: normalized([p.title, p.category, ...(p.tags || [])].join(' ')).split(' ').filter(w => words.has(w)).length }))
    .filter(p => p.relevance > 0).sort((a, b) => b.relevance - a.relevance).slice(0, 5).map(p => p.post);
}
