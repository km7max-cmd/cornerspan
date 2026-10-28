import Link from "next/link";
import type { ReactNode } from "react";

type FAQ = { question: string; answer: string };
type Props = {
  title: string;
  description: string;
  path: string;
  collection?: "guides" | "blog";
  publishedAt?: string;
  sections: [string, string][];
  faqs: FAQ[];
  faqId?: string;
  children: ReactNode;
};

export function ReferenceSection({ id, title, aliases = [], children }: {
  id: string; title: string; aliases?: string[]; children: ReactNode;
}) {
  return <section id={id} className="mt-10 scroll-mt-28 space-y-4 border-t border-slate-200 pt-8">
    {aliases.map(alias => <span key={alias} id={alias} className="block scroll-mt-28" aria-hidden="true" />)}
    <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
    {children}
  </section>;
}

export function ReferenceTable({ caption, headers, rows }: {
  caption: string; headers: string[]; rows: string[][];
}) {
  return <div className="overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-700" role="region" aria-label={caption} tabIndex={0}>
    <table className="w-full min-w-[480px] text-left text-sm">
      <caption className="p-4 text-left leading-6 text-slate-600">{caption}</caption>
      <thead className="bg-slate-100"><tr>{headers.map(header => <th key={header} scope="col" className="p-4 font-semibold text-slate-900">{header}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => <tr key={i} className="border-t border-slate-200">{row.map((value, j) => j === 0
        ? <th key={j} scope="row" className="p-4 font-semibold text-slate-900">{value}</th>
        : <td key={j} className="p-4 leading-6">{value}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export default function ReferenceArticle({ title, description, path, collection = "guides", publishedAt, sections, faqs, faqId = "faq", children }: Props) {
  const origin = "https://www.cornerspan.com";
  const url = `${origin}${path}`;
  const collectionTitle = collection === "guides" ? "Construction Guides" : "Construction Articles";
  const data = { "@context": "https://schema.org", "@graph": [
    { "@type": "Article", "@id": `${url}#article`, headline: title, description, mainEntityOfPage: url, inLanguage: "en-US",
      dateModified: "2026-10-28", ...(publishedAt ? { datePublished: publishedAt } : {}),
      author: { "@type": "Organization", name: "CornerSpan", url: `${origin}/about#content-method` },
      publisher: { "@type": "Organization", name: "CornerSpan", url: origin } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: origin },
      { "@type": "ListItem", position: 2, name: collectionTitle, item: `${origin}/${collection}` },
      { "@type": "ListItem", position: 3, name: title, item: url } ] },
    { "@type": "FAQPage", mainEntity: faqs.map(({question, answer}) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }
  ] };
  return <article className="mx-auto max-w-4xl px-5 py-8 text-slate-700 sm:px-6 [&_p]:leading-8 [&_li]:leading-7 [&_a:not(.article-back)]:text-blue-700 [&_a:not(.article-back)]:underline [&_a]:underline-offset-4">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
    <Link href={`/${collection}`} className="article-back font-semibold text-blue-700">← {collectionTitle}</Link>
    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
    <p className="mt-4 text-sm text-slate-600">By <Link href="/about#content-method">CornerSpan</Link> · Updated <time dateTime="2026-10-28">October 28, 2026</time></p>
    <p className="mt-5 text-lg">{description}</p>
    <nav aria-label="Table of contents" className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-lg font-bold text-slate-950">On this page</h2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">{sections.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
    </nav>
    {children}
    <ReferenceSection id={faqId} title="Questions about this estimate">
      {faqs.map(faq => <div key={faq.question} className="border-b border-slate-200 py-4"><h3 className="text-lg font-bold text-slate-950">{faq.question}</h3><p className="mt-2">{faq.answer}</p></div>)}
    </ReferenceSection>
    <footer className="mt-10 border-t border-slate-200 pt-6 text-sm"><p>These are illustrative quantity checks. For a correction, <Link href="/contact">send the page URL, measurements, units and expected result</Link>.</p></footer>
  </article>;
}
