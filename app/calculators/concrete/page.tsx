import type { Metadata } from "next";
import ConcreteCalculator from "./ConcreteCalculator";

const SITE_URL = "https://www.cornerspan.com";
const PAGE_URL = `${SITE_URL}/calculators/concrete`;

export const metadata: Metadata = {
  title: "Concrete Calculator | Volume, Materials & Cost | CornerSpan",

  description:
    "Use this free concrete calculator to estimate concrete volume, cement, sand, aggregate, water, and material cost for slabs, footings, walls, columns, and other construction projects.",

  alternates: {
    canonical: PAGE_URL,
  },

  keywords: [
    "concrete calculator",
    "concrete volume calculator",
    "cement calculator",
    "concrete material calculator",
    "concrete cost calculator",
    "cement sand aggregate calculator",
    "concrete quantity calculator",
  ],

  openGraph: {
    title: "Concrete Calculator | Volume, Materials & Cost",
    description:
      "Calculate concrete volume and estimate cement, sand, aggregate, water, and material cost for construction projects.",
    url: PAGE_URL,
    siteName: "CornerSpan",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Concrete Calculator | CornerSpan",
    description:
      "Free calculator for concrete volume, cement, sand, aggregate, water, and material cost.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Calculators",
      item: `${SITE_URL}/calculators`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Concrete Calculator",
      item: PAGE_URL,
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Concrete Calculator",
  url: PAGE_URL,
  description:
    "A free concrete calculator for estimating concrete volume, cement, sand, aggregate, water, and material cost.",
  isPartOf: {
    "@type": "WebSite",
    name: "CornerSpan",
    url: SITE_URL,
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Concrete Calculator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  url: PAGE_URL,
  description:
    "Online calculator for estimating concrete volume and common material quantities.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function ConcreteCalculatorPage() {
  return (
    <>
      {/* STRUCTURED DATA */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />

      {/* PAGE */}

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* HERO */}

        <header className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-blue-600">
            Construction Calculator
          </p>

          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Concrete Calculator
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Estimate concrete volume and common material requirements
            for slabs, walls, footings, columns, stairs, and other
            construction work.
          </p>
        </header>

        {/* CALCULATOR */}

        <section
          aria-labelledby="calculator-heading"
          className="mb-10"
        >
          <h2
            id="calculator-heading"
            className="sr-only"
          >
            Concrete Calculator Tool
          </h2>

          <ConcreteCalculator />
        </section>

      </main>
    </>
  );
}
