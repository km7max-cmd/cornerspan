import Image from "next/image";
import Link from "next/link";
import type { CalculatorArticle as ArticleData } from "../../data/calculator-articles";
import { blogPosts } from "../../data/blog";

const imageDescriptions: Record<string,string> = {
  area:"Geometric shapes and dimensions for area measurement",
  paver:"Patio pavers and project measurement illustration", tile:"Floor tile layout and room measurement illustration",
  paint:"Room painting and wall measurement illustration", asphalt:"Asphalt paving and driveway measurement illustration",
  gravel:"Gravel project dimensions and material estimate illustration", topsoil:"Topsoil depth and landscaping measurement illustration",
  fence:"Fence layout and material measurement illustration", roofing:"Residential roof illustrating roof surface and pitch",
  "sod-turf":"Lawn measurement and sod layout illustration", steel:"Twenty 20-foot number 4 rebar pieces weigh 267.2 pounds at 0.668 pounds per foot",
  brick:"A wall with a window opening and a brick face with mortar joints",
};
const relatedLabels: Record<string,string> = {"/guides/steel-weight":"US Rebar Weight Guide","/guides/brick-calculation":"Brick Calculation Guide","/guides/us-brick-sizes":"US Brick Sizes and Dimensions"};
export default function CalculatorArticle({ article }: {article:ArticleData}) {
  const origin="https://www.cornerspan.com";
  const url=`${origin}/blog/${article.slug}`;
  const calculator=article.calculatorHref.split('/').pop()!;
  const data={"@context":"https://schema.org","@graph":[
    {"@type":"Article","@id":`${url}#article`,headline:article.title,description:article.description,mainEntityOfPage:url,
      datePublished:article.publishedAt,dateModified:article.modifiedAt,inLanguage:"en-US",image:article.image?`${origin}${article.image}`:undefined,
      author:{"@type":"Organization",name:"CornerSpan",url:origin},publisher:{"@type":"Organization",name:"CornerSpan",url:origin}},
    {"@type":"BreadcrumbList",itemListElement:[
      {"@type":"ListItem",position:1,name:"Home",item:origin},
      {"@type":"ListItem",position:2,name:"Blog",item:`${origin}/blog`},
      {"@type":"ListItem",position:3,name:article.title,item:url}]},
    {"@type":"FAQPage",mainEntity:article.faqs.map(f=>({"@type":"Question",name:f.question,acceptedAnswer:{"@type":"Answer",text:f.answer}}))},
  ]};
  const contents=[['formula','Formula'],['example','Worked example'],...article.sections.map(s=>[s.id,s.title]),['mistakes','Common mistakes'],['faq','FAQs'],['sources','Sources and related reading']];
  return <article className="mx-auto max-w-4xl px-5 py-8 text-slate-700 sm:px-6 [&_p]:leading-8">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,'\\u003c')}} />
    <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm"><Link className="text-blue-700 underline" href="/">Home</Link><span aria-hidden="true">/</span><Link className="text-blue-700 underline" href="/blog">Blog</Link><span aria-hidden="true">/</span><span>{article.category}</span></nav>
    <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{article.title}</h1>
    <p className="mt-3 text-sm text-slate-500">By <Link href="/about#content-method" className="underline">CornerSpan</Link> · Updated <time dateTime={article.modifiedAt}>{new Date(`${article.modifiedAt}T12:00:00Z`).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric',timeZone:'UTC'})}</time></p>
    {article.intro.map(p=><p key={p} className="mt-4">{p}</p>)}
    <Link className="my-5 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-bold text-white" href={article.calculatorHref}>Open the {calculator.replace(/-/g, " ")} calculator →</Link>
    {article.image && <figure className="my-5"><div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><Image src={article.image} alt={imageDescriptions[calculator] ?? article.title} fill sizes="(max-width: 768px) 100vw, 848px" className="object-contain" unoptimized={article.image.endsWith('.svg')} /></div><figcaption className="mt-2 text-sm text-slate-500">Illustration for orientation; use the measurements and assumptions stated in the worked example.</figcaption></figure>}
    <nav aria-label="Table of contents" className="rounded-xl bg-slate-100 p-5"><h2 className="text-lg font-bold text-slate-950">In this article</h2><ul className="mt-3 grid gap-3 sm:grid-cols-2">{contents.map(([id,label])=><li key={id}><a href={`#${id}`} className="text-blue-700 underline">{label}</a></li>)}</ul></nav>
    <section id="formula" className="mt-10 scroll-mt-28"><h2 className="text-2xl font-bold text-slate-950">Calculation formula</h2><p className="mt-4 rounded-xl bg-blue-50 p-5 font-semibold text-blue-950">{article.formula}</p></section>
    <section id="example" className="mt-10 scroll-mt-28"><h2 className="text-2xl font-bold text-slate-950">Worked example: from measurements to an estimate</h2><div className="mt-4 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[480px] text-left text-sm"><caption className="p-3 text-left text-slate-600">Illustrative inputs and results; substitute your own measurements and supplier information.</caption><thead className="bg-slate-100"><tr>{['Step','Calculation or assumption','Result'].map(h=><th scope="col" key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{article.example.map((row,i)=><tr key={i} className="border-t border-slate-200">{row.map((v,j)=>j===0?<th scope="row" key={j} className="p-3 font-semibold">{v}</th>:<td key={j} className="p-3">{v}</td>)}</tr>)}</tbody></table></div></section>
    {article.exampleLink && <p className="mt-4"><Link href={article.exampleLink.href} className="inline-flex rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white">{article.exampleLink.label} →</Link></p>}
    {article.sections.map(s=><section key={s.id} id={s.id} className="mt-10 scroll-mt-28 border-t border-slate-200 pt-8"><h2 className="text-2xl font-bold text-slate-950">{s.title}</h2>{s.paragraphs.map(p=><p key={p} className="mt-4">{p}</p>)}</section>)}
    <section id="mistakes" className="mt-10 scroll-mt-28"><h2 className="text-2xl font-bold text-slate-950">Common estimating mistakes</h2><ul className="mt-4 list-disc space-y-3 pl-6">{article.mistakes.map(m=><li key={m}>{m}</li>)}</ul></section>
    <section id="faq" className="mt-10 scroll-mt-28"><h2 className="text-2xl font-bold text-slate-950">Frequently asked questions</h2>{article.faqs.map(f=><div key={f.question} className="border-b border-slate-200 py-5"><h3 className="text-lg font-bold text-slate-900">{f.question}</h3><p className="mt-2">{f.answer}</p></div>)}</section>
    <aside className="my-8 rounded-xl bg-blue-50 p-5"><p className="font-semibold">Ready to use your measurements?</p><Link href={article.calculatorHref} className="mt-2 inline-flex font-bold text-blue-700 underline">Calculate with the {calculator.replace(/-/g, " ")} calculator →</Link></aside>
    <section id="sources" className="mt-10 scroll-mt-28 border-t border-slate-200 pt-8"><h2 className="text-2xl font-bold text-slate-950">Sources and related reading</h2><p className="mt-3 text-sm"><Link href="/about#content-method" className="text-blue-700 underline">How these estimates are prepared</Link> · <Link href="/contact" className="text-blue-700 underline">Report a calculation or content issue</Link></p><p className="mt-3 text-sm">The examples are original calculations using the assumptions shown. These resources provide product or technical background; they do not establish a current price or approve a project design.</p><ul className="mt-4 list-disc space-y-3 pl-6">{article.sources.map(s=><li key={s.href}><a href={s.href} className="text-blue-700 underline">{s.label}</a></li>)}{article.related.map(href=><li key={href}><Link href={href} className="text-blue-700 underline">{relatedLabels[href] ?? blogPosts.find(p=>`/blog/${p.slug}`===href)?.title ?? 'Related construction article'}</Link></li>)}</ul></section>
    <div className="mt-8 flex flex-wrap gap-3">{article.tags.map(tag=><Link key={tag} href={`/blog/tag/${encodeURIComponent(tag)}`} className="rounded-full bg-slate-100 px-3 py-2 text-sm text-blue-800">{tag}</Link>)}</div>
  </article>;
}
