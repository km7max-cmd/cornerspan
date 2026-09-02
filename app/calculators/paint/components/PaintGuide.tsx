import type { Metadata } from "next";
import dynamic from "next/dynamic";

import Breadcrumb from "@/components/Breadcrumb";
import RelatedCalculators from "@/components/RelatedCalculators";
import PaintGuide from "./components/PaintGuide";

const PaintCalculator = dynamic(() => import("./PaintCalculator"), {
  loading: () => (
    <div
      className="mt-6 min-h-[520px] animate-pulse rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm"
      aria-label="Loading paint calculator"
    >
      <div className="h-10 w-2/3 rounded-xl bg-slate-200" />

      <div className="mt-4 h-4 w-full rounded bg-slate-200" />
      <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="h-20 rounded-2xl bg-slate-100" />
        <div className="h-20 rounded-2xl bg-slate-100" />
        <div className="h-20 rounded-2xl bg-slate-100" />
        <div className="h-20 rounded-2xl bg-slate-100" />
      </div>
    </div>
  ),
});

const pageUrl = "https://www.cornerspan.com/calculators/paint";

export const metadata: Metadata = {
  title: "Paint Calculator | How Much Paint Do I Need?",
  description:
    "Free paint calculator to estimate how much paint you need for walls and ceilings. Calculate paint quantity, coats, doors, windows and estimated cost.",
  keywords: [
    "paint calculator",
    "paint estimator",
    "how much paint do I need",
    "paint quantity calculator",
    "paint calculator by room",
    "house paint calculator",
  ],
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Paint Calculator | How Much Paint Do I Need?",
    description:
      "Free paint calculator to estimate paint quantity and cost for walls and ceilings.",
    url: pageUrl,
    siteName: "CornerSpan",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CornerSpan Paint Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paint Calculator | How Much Paint Do I Need?",
    description:
      "Calculate paint quantity, coats, doors, windows and estimated cost.",
    images: ["/og-image.png"],
  },
};

const relatedCalculators = [
  {
    title: "Brick Calculator",
    href: "/calculators/brick",
  },
  {
    title: "Concrete Calculator",
    href: "/calculators/concrete",
  },
  {
    title: "Square Footage Calculator",
    href: "/calculators/square-footage",
  },
  {
    title: "Tile Calculator",
    href: "/calculators/tile",
  },
];

export default function PaintCalculatorPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Paint Calculator",
      description:
        "Free paint calculator to estimate paint quantity and cost for walls and ceilings.",
      isPartOf: {
        "@type": "WebSite",
        name: "CornerSpan",
        url: "https://www.cornerspan.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#calculator`,
      name: "Paint Calculator",
      description:
        "Calculate how much paint you need for walls and ceilings, including coats, doors, windows, coverage and estimated cost.",
      url: pageUrl,
      applicationCategory: "Calculator",
      applicationSubCategory: "Paint Calculator",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Breadcrumb
        items={[
          {
            label: "Calculators",
            href: "/calculators",
          },
          {
            label: "Paint Calculator",
            href: "/calculators/paint",
          },
        ]}
      />

      <section className="mt-5">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Paint Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Calculate how much paint you need for walls and ceilings. Estimate
          paint quantity, multiple coats, doors, windows and total paint and
          labor cost using your preferred units and local prices.
        </p>
      </section>

      {/* Calculator */}
      <PaintCalculator />

      {/* Related Calculators — immediately after Calculator */}
      <RelatedCalculators items={relatedCalculators} />

      {/* Paint Guide / Formula / FAQ */}
      <PaintGuide />
    </main>
  );
}
