
import type { Metadata } from "next";

import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import CalculatorGuides from "../components/CalculatorGuides";
import PopularCalculators from "../components/PopularCalculators";
import { homepageFaq } from "../data/homepage-faq";

const homepageDescription =
  "Estimate concrete, brick, paint, tile, roofing, paver, asphalt and gravel materials with free construction calculators from CornerSpan.";

export const metadata: Metadata = {
  title: "Free Construction Calculators Online | CornerSpan",

  description: homepageDescription,

  alternates: {
    canonical: "https://www.cornerspan.com/",
  },

  openGraph: {
    title: "Free Construction Calculators Online | CornerSpan",
    description: homepageDescription,
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
    description: homepageDescription,
    images: ["https://www.cornerspan.com/og-image.png"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CornerSpan",
  url: "https://www.cornerspan.com/",
  description: homepageDescription,
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
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Hero />

      <PopularCalculators />

      <Features />

      <HowItWorks />

      <CalculatorGuides />

      <FAQ />

      <CTA />
    </div>
  );
}
