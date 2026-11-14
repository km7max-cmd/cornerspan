import Link from 'next/link';
import { createElement } from 'react';
import { absoluteImage, canonicalFor, safeUrl, seoSettings, type MediaImage, type SeoSettings } from '../../lib/cms-model';
import { contentsFor, inlineTokens, parseMarkdown, plainText } from '../../lib/cms-markdown';

type CmsArticleProps = {
  post: { slug: string; title: string; description: string; category: string; publishedAt: string; modifiedAt?: string; body: string; tags: string[]; seo?: SeoSettings };
  preview?: boolean;
};
function Inline({ text }: { text: string }) {
  return <>{inlineTokens(text).map((token, i) => {
    if (token.type === 'link') return <a key={i} href={token.url} rel={token.url?.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-blue-700 underline">{token.text}</a>;
    if (token.type === 'image') {
      const image = <img src={token.url} alt={token.text} title={token.title || undefined} loading="lazy" className="my-4 h-auto max-w-full rounded-xl"/>;
      return token.linkUrl ? <a key={i} href={token.linkUrl} rel="noopener noreferrer">{image}</a> : <span key={i}>{image}</span>;
    }
    if (token.type === 'strong') return <strong key={i}>{token.text}</strong>;
    if (token.type === 'em') return <em key={i}>{token.text}</em>;
    if (token.type === 'code') return <code key={i} className="rounded bg-slate-100 px-1">{token.text}</code>;
    return token.text;
  })}</>;
}
export function FeaturedImage({ image }: { image: MediaImage }) {
  if (!safeUrl(image.url, { image: true })) return null;
  const visual = <img src={image.url} alt={image.alt} title={image.title || undefined} width={image.width || undefined} height={image.height || undefined} className="h-auto w-full rounded-xl"/>;
  return <figure className="my-7">
    {image.linkUrl && safeUrl(image.linkUrl) ? <a href={image.linkUrl} className="block" rel="noopener noreferrer">{visual}</a> : visual}
    {(image.caption || image.sourceUrl) && <figcaption className="mt-3 text-sm text-slate-600">{image.caption}{image.sourceUrl && safeUrl(image.sourceUrl) && <> · <a href={image.sourceUrl} rel="noopener noreferrer" className="underline">Image source</a></>}</figcaption>}
  </figure>;
}
export default function CmsArticle({ post, preview = false }: CmsArticleProps) {
  const seo = seoSettings(post.seo); const blocks = parseMarkdown(post.body); const toc = contentsFor(blocks);
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: post.title,
    description: post.description, mainEntityOfPage: canonicalFor(post),
    datePublished: post.publishedAt || undefined, dateModified: post.modifiedAt || post.publishedAt || undefined,
    image: seo.featuredImage.url ? [absoluteImage(seo.featuredImage.url)] : undefined,
    author: { '@type': 'Organization', name: 'CornerSpan' }, publisher: { '@type': 'Organization', name: 'CornerSpan' },
  };
  return <article className="mx-auto max-w-4xl px-5 py-10 text-slate-900 sm:py-14">
    {!preview && seo.schemaEnabled && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/>}
    {preview && <p className="mb-5 rounded-lg bg-amber-50 p-4 text-sm font-semibold text-amber-900">Private draft preview. This has not been published.</p>}
    <nav aria-label="Article breadcrumb" className="mb-6 text-sm text-slate-500"><Link href="/blog" className="text-blue-700 underline">Blog</Link> / {post.category}</nav>
    <header className="mb-8 border-b border-slate-200 pb-7">
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-700">{post.category}</p>
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">{post.description}</p>
      <p className="mt-4 text-sm text-slate-500">{preview ? 'Draft preview · Not published' : `Published ${post.publishedAt}${post.modifiedAt ? ' · Updated ' + post.modifiedAt.slice(0, 10) : ''}`}</p>
    </header>
    <FeaturedImage image={seo.featuredImage}/>
    {post.seo?.tocEnabled && toc.length > 0 && <nav aria-label="Table of Contents" className="my-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
      <p className="mb-3 font-bold">On this page</p><ul>{toc.map(h => <li key={h.id} className={h.depth === 3 ? 'ml-5' : ''}><a className="inline-block py-2 text-blue-700 underline" href={`#${h.id}`}>{plainText(h.text)}</a></li>)}</ul>
    </nav>}
    <div>{blocks.map((block, i) => {
      if (block.type === 'heading') {
        const level = Math.max(2, block.depth || 2);
        return createElement(`h${level}`, { key: i, id: block.id, style: { scrollMarginTop: '100px' }, className: level === 2 ? 'mt-10 mb-4 text-2xl font-bold' : 'mt-7 mb-3 text-xl font-bold' }, <Inline text={block.text}/>);
      }
      if (block.type === 'code') return <pre key={i} className="my-6 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-white"><code>{block.text}</code></pre>;
      if (block.type === 'rule') return <hr key={i} className="my-8 border-slate-200"/>;
      if (block.type === 'list') {
        const items = block.items?.map((item, j) => <li key={j} className="mb-2"><Inline text={item}/></li>);
        return block.ordered ? <ol key={i} className="my-5 list-decimal pl-7">{items}</ol> : <ul key={i} className="my-5 list-disc pl-7">{items}</ul>;
      }
      if (block.type === 'table') return <div key={i} className="my-6 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[420px] text-left text-sm"><thead className="bg-slate-100"><tr>{block.rows?.[0]?.map((cell, j) => <th scope="col" key={j} className="border-b p-3"><Inline text={cell}/></th>)}</tr></thead><tbody>{block.rows?.slice(1).map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k} className="border-b p-3"><Inline text={cell}/></td>)}</tr>)}</tbody></table></div>;
      return <p key={i} className="my-4 leading-8 text-slate-700"><Inline text={block.text}/></p>;
    })}</div>
    {post.tags.length > 0 && <footer className="mt-10 border-t pt-5 text-sm text-slate-500">Tags: {post.tags.join(', ')}</footer>}
  </article>;
}
