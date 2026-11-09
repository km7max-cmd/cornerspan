import Link from "next/link";
import type { ReactNode } from "react";

type CmsArticleProps = {
  post: { slug: string; title: string; description: string; category: string;
    publishedAt: string; modifiedAt?: string; body: string; tags: string[] };
  preview?: boolean;
};

function renderInline(input: string): ReactNode[] {
  // Safe subset of Markdown; React escapes HTML and raw user markup.
  const tokens = input.split(/(\[[^\]]+\]\((?:https?:\/\/[^)\s]+|\/[^)\s]*)\)|\*\*[^*]+\*\*|\*[^*]+\*|\x60[^\x60]+\x60)/g);
  return tokens.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)$/);
    if (link) {
      const isExternal = /^https?:/.test(link[2]);
      return isExternal
        ? <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">{link[1]}</a>
        : <Link key={index} href={link[2]} className="text-blue-700 underline">{link[1]}</Link>;
    }
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2,-2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1,-1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index} className="rounded bg-slate-100 px-1">{part.slice(1,-1)}</code>;
    return part;
  });
}

function renderMarkdown(body: string): ReactNode[] {
  const lines = body.replace(/\r\n?/g,"\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }
    if (/^```/.test(line)) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) code.push(lines[i++]);
      i++;
      blocks.push(<pre key={blocks.length} className="my-6 overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm text-white"><code>{code.join("\n")}</code></pre>);
      continue;
    }
    const image = line.match(/^!\[([^\]]*)\]\((https:\/\/[^)\s]+|\/[^)\s]*)\)$/);
    if (image) {
      blocks.push(<figure key={blocks.length} className="my-6"><img src={image[2]} alt={image[1]} loading="lazy" className="max-w-full rounded-xl"/>{image[1] && <figcaption className="mt-2 text-center text-sm text-slate-500">{image[1]}</figcaption>}</figure>);
      i++; continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const depth = Math.max(2, heading[1].length); // Page title owns the sole H1.
      const style = depth === 2 ? "mt-10 mb-4 text-2xl font-bold" : depth === 3 ? "mt-7 mb-3 text-xl font-bold" : "mt-6 mb-2 text-lg font-bold";
      const content = renderInline(heading[2]);
      blocks.push(depth === 2 ? <h2 key={blocks.length} className={style}>{content}</h2> :
        depth === 3 ? <h3 key={blocks.length} className={style}>{content}</h3> :
        <h4 key={blocks.length} className={style}>{content}</h4>);
      i++; continue;
    }
    if (/^\|.+\|$/.test(line)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
        const cells = lines[i++].trim().replace(/^\||\|$/g,"").split("|").map(s=>s.trim());
        if (!cells.every(c => /^:?-{3,}:?$/.test(c))) rows.push(cells);
      }
      if (rows.length) blocks.push(<div key={blocks.length} className="my-6 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[420px] text-left text-sm"><thead className="bg-slate-100"><tr>{rows[0].map((cell,j)=><th scope="col" key={j} className="border-b p-3">{renderInline(cell)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row,k)=><tr key={k} className="border-b last:border-0">{row.map((cell,j)=><td key={j} className="p-3">{renderInline(cell)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const items: string[] = [];
      while (i < lines.length && (ordered ? /^\d+\.\s+/.test(lines[i].trim()) : /^[-*]\s+/.test(lines[i].trim()))) {
        items.push(lines[i++].trim().replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, ""));
      }
      const children = items.map((item,k)=><li key={k} className="mb-2">{renderInline(item)}</li>);
      blocks.push(ordered ? <ol key={blocks.length} className="my-5 list-decimal pl-7">{children}</ol> : <ul key={blocks.length} className="my-5 list-disc pl-7">{children}</ul>);
      continue;
    }
    if (line === "---") { blocks.push(<hr key={blocks.length} className="my-8 border-slate-200"/>); i++; continue; }
    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|[-*]\s|\d+\.\s|\|.+\|$|!\[|---$|```)/.test(lines[i].trim())) {
      paragraph.push(lines[i++].trim());
    }
    if (paragraph.length) blocks.push(<p key={blocks.length} className="my-4 leading-8 text-slate-700">{renderInline(paragraph.join(" "))}</p>);
    else i++; // prevent infinite loops on unsupported Markdown syntax
  }
  return blocks;
}

export default function CmsArticle({post, preview = false}: CmsArticleProps) {
  const url = "https://www.cornerspan.com/blog/" + post.slug;
  const schema = {
    "@context": "https://schema.org", "@type": "Article", headline: post.title,
    description: post.description, mainEntityOfPage: url,
    datePublished: post.publishedAt, dateModified: post.modifiedAt || post.publishedAt,
    author: { "@type": "Organization", name: "CornerSpan" },
    publisher: { "@type": "Organization", name: "CornerSpan" },
  };
  return <article className="mx-auto max-w-4xl px-5 py-12 text-slate-900 sm:py-16">
    {!preview && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>}
    {preview && <p className="mb-5 rounded-lg bg-amber-100 p-4 font-semibold text-amber-900">Private draft preview. This has not been published.</p>}
    <nav className="mb-6 text-sm text-slate-500"><Link href="/blog" className="text-blue-700 underline">Blog</Link> / {post.category}</nav>
    <header className="mb-10 border-b border-slate-200 pb-8">
      <p className="mb-3 text-sm font-bold uppercase tracking-wide text-blue-700">{post.category}</p>
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{post.title}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">{post.description}</p>
      <p className="mt-4 text-sm text-slate-500">Published {post.publishedAt}{post.modifiedAt && post.modifiedAt !== post.publishedAt ? " · Updated " + post.modifiedAt.slice(0,10) : ""}</p>
    </header>
    <div>{renderMarkdown(post.body)}</div>
    {post.tags.length > 0 && <footer className="mt-10 border-t pt-5 text-sm text-slate-500">Tags: {post.tags.join(", ")}</footer>}
  </article>;
}
