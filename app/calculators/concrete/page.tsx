import type { Metadata } from "next";
import ConcreteCalculator from "./ConcreteCalculator";

export const metadata: Metadata = {
  title:
    "Concrete Calculator – Concrete Volume, Cement, Sand & Aggregate",

  description:
    "Free concrete calculator to calculate concrete volume, dry volume, cement bags, sand, aggregate, water and material cost. Supports multiple units, mix ratios and material prices.",

  keywords: [
    "concrete calculator",
    "concrete volume calculator",
    "cement calculator",
    "cement bags calculator",
    "sand calculator",
    "aggregate calculator",
    "concrete material calculator",
    "concrete quantity calculator",
    "construction calculator",
    "concrete cost calculator",
    "cement sand aggregate calculator",
    "concrete mix calculator",
  ],

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
      "Concrete Calculator – Concrete Volume & Material Calculator",

    description:
      "Calculate concrete volume, cement bags, sand, aggregate, water and material cost with this free concrete calculator.",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Concrete Calculator – Concrete Volume & Material Calculator",

    description:
      "Free concrete calculator for volume, cement, sand, aggregate, water and material cost.",
  },
};

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",

    "@type": "WebApplication",

    name: "Concrete Calculator",

    applicationCategory:
      "UtilitiesApplication",

    operatingSystem:
      "Web",

    description:
      "Free online concrete calculator for calculating concrete volume, dry volume, cement bags, sand, aggregate, water and material cost.",

    browserRequirements:
      "Requires JavaScript. Requires a modern web browser.",

    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },

    featureList: [
      "Concrete volume calculation",
      "Dry volume calculation",
      "Cement bag calculation",
      "Sand quantity calculation",
      "Aggregate quantity calculation",
      "Water requirement estimation",
      "Material cost calculation",
      "Multiple dimension units",
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
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Concrete Calculator",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbData
          ),
        }}
      />

      <ConcreteCalculator />
    </>
  );
}
