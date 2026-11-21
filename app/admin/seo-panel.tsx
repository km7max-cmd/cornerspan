'use client';
import { analyzeSeo, type SeoPost } from '../../lib/seo-analysis';
import { seoSettings, canonicalFor, safeUrl } from '../../lib/cms-model';
export function Score({ score, compact = false }: { score: number; compact?: boolean }) {
  const color = score >= 80 ? 'good' : score >= 50 ? 'warning' : 'problem';
  return <span className={`cms-score ${color} ${compact ? 'compact' : ''}`} aria-label={`SEO score ${score} out of 100`}><strong>{score}</strong>{!compact && <small>/ 100</small>}</span>;
}
export function SearchPreview({ post }: { post: SeoPost }) {
  const seo = seoSettings(post.seo);
  return <div className="cms-serp"><div className="cms-search-site"><span className="cms-favicon">C</span><span><strong>CornerSpan</strong><small>{canonicalFor(post)}</small></span></div><p className="cms-search-title">{seo.metaTitle || post.title || 'Your article title appears here'}</p><p className="cms-search-description">{post.description || 'Add a clear summary of what the reader can calculate or learn from this article.'}</p><small className="cms-help">Illustrative search preview. Google may use different text and display lengths.</small></div>;
}
export function SocialPreview({ post }: { post: SeoPost }) {
  const seo = seoSettings(post.seo); const image = seo.ogImage || seo.featuredImage.url;
  return <div className="cms-social-card">{image && safeUrl(image, { image: true }) ? <img src={image} alt={seo.featuredImage.alt || 'Sharing image preview'}/> : <div className="cms-social-empty">Add a sharing image</div>}<div><small>cornerspan.com · Open Graph / X</small><strong>{seo.ogTitle || seo.metaTitle || post.title || 'Article title'}</strong><p>{seo.ogDescription || post.description || 'Your article description'}</p></div></div>;
}
export default function SeoPanel({ post, catalog }: { post: SeoPost; catalog: SeoPost[] }) {
  const report = analyzeSeo(post, catalog); const counts = (status: string) => report.checks.filter(c => c.status === status).length;
  return <section className="cms-card cms-seo-panel" aria-label="Live SEO Analysis"><div className="cms-card-heading"><div><span className="cms-eyebrow">Live analysis</span><h2>Make every detail count</h2></div><Score score={report.score}/></div>
    <div className="cms-score-track"><span style={{ width: `${report.score}%` }}/></div>
    <p className="cms-help">An editorial checklist, not a ranking prediction. Prioritize accurate construction guidance, useful examples and original insight.</p>
    <div className="cms-check-counts"><span className="good">{counts('PASS')} good</span><span className="warning">{counts('WARNING')} to improve</span><span className="problem">{counts('FAIL')} problems</span></div>
    {['Search appearance', 'Topic coverage', 'Content quality', 'Images and navigation'].map(group => <details key={group} open className="cms-check-group"><summary>{group}<span>{report.checks.filter(c => c.group === group && c.status === 'PASS').length}/{report.checks.filter(c => c.group === group).length}</span></summary><ul>{report.checks.filter(c => c.group === group).map(c => <li key={c.id} data-check={c.id}><span className={`cms-check-dot ${c.status.toLowerCase()}`} aria-hidden="true">{c.status === 'PASS' ? '✓' : c.status === 'FAIL' ? '!' : '•'}</span><div><strong>{c.label}</strong><span className={`cms-result ${c.status.toLowerCase()}`}>{c.status}</span><p>{c.detail}</p></div></li>)}</ul></details>)}
    {report.secondary.length > 0 && <div className="cms-help"><strong>Secondary topics</strong>{report.secondary.map(k => <p key={k.keyword}>{k.found ? '✓' : '○'} {k.keyword} — {k.found ? 'mentioned' : 'consider if relevant'}</p>)}</div>}
  </section>;
}
