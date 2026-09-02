import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";

const PaintCalculator = dynamic(
  () => import("./PaintCalculator"),
  {
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
  }
);

const pageUrl =
  "https://www.cornerspan.com/calculators/paint";

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
      "Calculate paint quantity and estimated cost for walls and ceilings, including doors, windows and multiple coats.",
    url: pageUrl,
    siteName: "CornerSpan",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paint Calculator - CornerSpan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Paint Calculator | How Much Paint Do I Need?",
    description:
      "Calculate paint required for walls and ceilings, including coats, doors, windows and estimated cost.",
    images: ["/og-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Paint Calculator | How Much Paint Do I Need?",
      description:
        "Free paint calculator to estimate how much paint you need for walls and ceilings, including doors, windows, multiple coats and estimated cost.",
      isPartOf: {
        "@type": "WebSite",
        name: "CornerSpan",
        url: "https://www.cornerspan.com/",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#calculator`,
      name: "CornerSpan Paint Calculator",
      url: pageUrl,
      applicationCategory: "Calculator",
      applicationSubCategory: "Paint Calculator",
      operatingSystem: "Web",
      description:
        "Calculate paint quantity and estimated paint and labor costs for walls and ceilings.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
        <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
          <Breadcrumb current="Paint Calculator" />

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Paint Calculator
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Calculate how much paint you need for walls and ceilings,
            including doors, windows, multiple coats and estimated cost.
          </p>

          <PaintCalculator />

          <RelatedCalculators items={relatedCalculators} />
        </div>
      </main>
    </>
  );
}
