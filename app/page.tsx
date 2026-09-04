import type { Metadata } from "next";

import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import CalculatorGuides from "../components/CalculatorGuides";
import PopularCalculators from "../components/PopularCalculators";

export const metadata: Metadata = {
  title: "Free Construction Calculators",

  description:
    "Free online construction calculators for concrete, brick, steel, paint, tile and roofing. Get fast, accurate material estimates for your next project.",

  alternates: {
    canonical: "https://www.cornerspan.com/",
  },

  openGraph: {
    title: "Free Construction Calculators | CornerSpan",
    description:
      "Free online construction calculators for concrete, brick, steel, paint, tile and roofing. Get fast, accurate material estimates.",
    url: "https://www.cornerspan.com/",
    type: "website",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CornerSpan",
  url: "https://www.cornerspan.com/",
  description:
    "Free online construction calculators for concrete, brick, steel, paint, tile and roofing.",
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
  mainEntity: [
    {
      "@type": "Question",
      name: "Are CornerSpan calculators free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CornerSpan calculators are free to use and do not require registration.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use CornerSpan on my mobile phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CornerSpan is designed to work on smartphones, tablets, laptops and desktop devices.",
      },
    },
    {
      "@type": "Question",
      name: "Are the calculator results accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The calculators use standard estimation formulas. Always verify final quantities with your project specifications.",
      },
    },
    {
      "@type": "Question",
      name: "What construction calculations are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CornerSpan provides calculators for concrete, brick, steel, paint, tile, roofing and other construction requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need an account to use the calculators?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You can use the available calculators without creating an account.",
      },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
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
      <Stats />
      <PopularCalculators />
      <Features />
      <HowItWorks />
      <CalculatorGuides />
      <FAQ />
      <CTA />
    </main>
  );
}
