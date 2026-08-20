import type { Metadata } from "next";
import ConcreteCalculator from "./ConcreteCalculator";

export const metadata: Metadata = {
  title: "Concrete Calculator | Volume, Cement, Sand & Aggregate",

  description:
    "Free online concrete calculator to calculate concrete volume, cement bags, sand, aggregate, water and material cost. Supports multiple units and concrete mix ratios.",

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
    title:
      "Concrete Calculator | Volume, Cement, Sand & Aggregate",

    description:
      "Calculate concrete volume, cement bags, sand, aggregate, water and material cost with this free online concrete calculator.",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Concrete Calculator | Volume, Cement, Sand & Aggregate",

    description:
      "Free online concrete calculator for concrete volume, cement bags, sand, aggregate, water and material cost.",
  },
};

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",

    "@type": "WebApplication",

    name: "Concrete Calculator",

    url: "https://cornerspan.vercel.app/calculators/concrete",

    applicationCategory: "UtilitiesApplication",

    operatingSystem: "All",

    description:
      "Free online concrete calculator for calculating concrete volume, cement bags, sand, aggregate, water and material cost.",

    browserRequirements:
      "Requires a modern web browser with JavaScript enabled.",

    isAccessibleForFree: true,

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },

    featureList: [
      "Concrete volume calculator",
      "Cement bags calculation",
      "Sand quantity calculation",
      "Aggregate quantity calculation",
      "Water requirement calculation",
      "Concrete material cost calculation",
      "Multiple measurement units",
      "Concrete mix ratio calculation",
      "Material price calculation",
    ],
  };

  const breadcrumbData = {
    "@context": "https://schema.org",

    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://cornerspan.vercel.app/",
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: "https://cornerspan.vercel.app/calculators",
      },

      {
        "@type": "ListItem",
        position: 3,
        name: "Concrete Calculator",
        item:
          "https://cornerspan.vercel.app/calculators/concrete",
      },
    ],
  };

  return (
    <>
      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />

      <ConcreteCalculator />
    </>
  );
}
