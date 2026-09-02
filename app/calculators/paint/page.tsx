import type { Metadata } from "next";
import PaintCalculator from "./PaintCalculator";

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

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <PaintCalculator />
    </>
  );
}
