import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";

import Breadcrumb from "../../../components/Breadcrumb";
import RelatedCalculators from "../../../components/RelatedCalculators";
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
    "Use this free paint calculator to estimate gallons of paint for walls and ceilings. Calculate room dimensions, paint coverage, coats, doors, windows, and estimated painting costs.",
  keywords: [
    "paint calculator",
    "how much paint do I need",
    "paint coverage calculator",
    "paint quantity calculator",
    "room paint calculator",
    "wall paint calculator",
    "paint cost calculator",
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
      "Estimate the paint needed for walls and ceilings, including coverage, multiple coats, doors, windows, and painting costs.",
    url: pageUrl,
    siteName: "CornerSpan",
    type: "website",
    images: [
      {
        url: "/images/paint-calculator.webp",
        width: 1536,
        height: 1024,
        alt: "Paint Calculator guide for estimating paint quantity and cost",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paint Calculator | How Much Paint Do I Need?",
    description:
      "Calculate paint quantity, coverage, coats, and estimated painting costs.",
    images: ["/images/paint-calculator.webp"],
  },
};

export default function PaintCalculatorPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Paint Calculator",
      description:
        "Estimate the paint needed for walls and ceilings, including coverage, coats, doors, windows, and painting costs.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.cornerspan.com/images/paint-calculator.webp",
      },
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://www.cornerspan.com/#website",
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
        "A free online tool to estimate paint quantity and cost for walls and ceilings using room dimensions, coverage, coats, doors, and windows.",
      url: pageUrl,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      isAccessibleForFree: true,
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
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <Breadcrumb current="Paint Calculator" />

      <section className="mt-5">
        <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Paint Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Find out how much paint you need for walls and ceilings.
          Estimate paint quantity, coverage, multiple coats, doors,
          windows, and paint and labor costs using your room dimensions
          and local prices.
        </p>
      </section>

      <figure className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Image
          src="/images/paint-calculator.webp"
          alt="Paint Calculator guide showing room painting, wall dimensions, paint coverage, and cost estimation"
          width={1536}
          height={1024}
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="h-auto w-full"
        />
        <figcaption className="px-4 py-3 text-sm leading-6 text-slate-600">
          Learn how room dimensions, doors, windows, paint coverage, and
          coats affect your paint quantity and cost estimate.
        </figcaption>
      </figure>

      <PaintCalculator />

      <RelatedCalculators />

      <PaintGuide />
    </main>
  );
}
