import type { Metadata } from "next";
import ConcreteCalculator from "./ConcreteCalculator";

export const metadata: Metadata = {
  title: "Concrete Calculator | CornerSpan",

  description:
    "Free concrete calculator to estimate concrete volume, cement bags, sand, aggregate, water and material cost.",

  alternates: {
    canonical: "https://www.cornerspan.com/calculators/concrete",
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
    title: "Concrete Calculator | CornerSpan",

    description:
      "Free concrete calculator to estimate concrete volume, cement, sand, aggregate, water and material cost.",

    type: "website",
    url: "https://www.cornerspan.com/calculators/concrete",
    siteName: "CornerSpan",

    images: [
      {
        url: "/og-image.png",
        alt: "CornerSpan Concrete Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Concrete Calculator | CornerSpan",

    description:
      "Free concrete calculator to estimate concrete volume, cement, sand, aggregate, water and material cost.",

    images: ["/og-image.png"],
  },
};

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",

    "@type": "WebApplication",

    name: "Concrete Calculator",

    url: "https://www.cornerspan.com/calculators/concrete",

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
        item: "https://www.cornerspan.com/",
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
