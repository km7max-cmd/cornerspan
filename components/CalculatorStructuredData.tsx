type Props = {
  name: string;
  description?: string;
  application?: boolean;
  breadcrumbs?: boolean;
} & ({ path: string; url?: never } | { url: string; path?: never });

export default function CalculatorStructuredData({ name, path, url: suppliedUrl, description, application = true, breadcrumbs = true }: Props) {
  const origin = "https://www.cornerspan.com";
  const url = suppliedUrl ?? `${origin}${path}`;
  const graph = [
    ...(application ? [{
      "@type": "WebApplication", "@id": `${url}#calculator`, name, url, description,
      applicationCategory: "UtilitiesApplication", operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and a modern web browser.",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: { "@type": "Organization", name: "CornerSpan", url: `${origin}/about#publisher` },
    }] : []),
    ...(breadcrumbs ? [{
      "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: origin },
        { "@type": "ListItem", position: 2, name: "Construction Calculators", item: `${origin}/calculators` },
        { "@type": "ListItem", position: 3, name, item: url },
      ],
    }] : []),
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c") }} />;
}
