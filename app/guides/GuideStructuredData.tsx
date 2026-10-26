type FAQ = { question: string; answer: string };
export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqs.map(({question, answer}) => ({"@type":"Question", name:question, acceptedAnswer:{"@type":"Answer", text:answer}})),
  }).replace(/</g, "\\u003c") }} />;
}
export default function GuideStructuredData({ title, description, slug, image }: {title:string; description:string; slug:string; image?:string}) {
  const origin = "https://www.cornerspan.com";
  const url = `${origin}/guides/${slug}`;
  const data = {"@context":"https://schema.org", "@graph":[
    {"@type":"Article", "@id":`${url}#article`, headline:title, description, mainEntityOfPage:url, inLanguage:"en-US",
      ...(image ? {image:`${origin}${image}`} : {}),
      author:{"@type":"Organization", name:"CornerSpan", url:origin}, publisher:{"@type":"Organization", name:"CornerSpan", url:origin}},
    {"@type":"BreadcrumbList", itemListElement:[
      {"@type":"ListItem",position:1,name:"Home",item:origin},
      {"@type":"ListItem",position:2,name:"Construction Guides",item:`${origin}/guides`},
      {"@type":"ListItem",position:3,name:title,item:url},
    ]},
  ]};
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data).replace(/</g,"\\u003c")}} />;
}
