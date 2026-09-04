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
  title: "Free Construction Calculators | Concrete, Brick, Steel & More",

  description:
    "Free online construction calculators for concrete, brick, steel, paint, tile, roofing and more. Quickly estimate materials and quantities for construction projects.",

  alternates: {
    canonical: "https://www.cornerspan.com/",
  },

  openGraph: {
    title:
      "Free Construction Calculators | Concrete, Brick, Steel & More",
    description:
      "Use free online construction calculators to estimate concrete, bricks, steel, paint, tile, roofing materials and more.",
    url: "https://www.cornerspan.com/",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
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
