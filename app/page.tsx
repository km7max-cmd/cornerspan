import type { Metadata } from "next";

import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import CalculatorGuides from "../components/CalculatorGuides";
import PopularCalculators from "../components/PopularCalculators";
import { homepageFaq } from "../data/homepage-faq";

export const metadata: Metadata = {
  title: "Free Construction Calculators Online",

  description:
    "Free online construction calculators for concrete, brick, steel, paint, tile, roofing, pavers, asphalt, gravel and more. Get fast material estimates for your project.",

  alternates: {
    canonical: "https://www.cornerspan.com/",
  },

  openGraph: {
    title: "Free Construction Calculators Online | CornerSpan",

    description:
      "Free online construction calculators for concrete, brick, steel, paint, tile, roofing, pavers, asphalt, gravel and more.",

    url: "https://www.cornerspan.com/",

    type: "website",

    siteName: "CornerSpan",

    locale: "en_US",

    images: [
      {
        url: "https://www.cornerspan.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Construction Calculators - CornerSpan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Free Construction Calculators Online | CornerSpan",

    description:
      "Free online construction calculators for concrete, brick, steel, paint, tile, roofing, pavers, asphalt, gravel and more.",

    images: [
      "https://www.cornerspan.com/og-image.png",
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  name: "CornerSpan",

  url: "https://www.cornerspan.com/",

  description:
    "Free online construction calculators for concrete, brick, steel, paint, tile, roofing, pavers, asphalt, gravel and more.",
};

const organizationSchema = {
  "@context": "https://schema.org",

  "@type": "Organization",

  name: "CornerSpan",

  url: "https://www.cornerspan.com/",

  logo: "https://www.cornerspan.com/og-image.png",
};

const faqSchema = {
  "@context": "https://schema.org",

  "@type": "FAQPage",

  mainEntity: homepageFaq.map((item) => ({
    "@type": "Question",

    name: item.question,

    acceptedAnswer: {
      "@type": "Answer",

      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Website structured data */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* Organization structured data */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* FAQ structured data */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Homepage */}

      <Hero />

      <PopularCalculators />

      <Features />

      <HowItWorks />

      <CalculatorGuides />

      <FAQ />

      <CTA />
    </main>
  );
}
