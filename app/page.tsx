import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import CalculatorGuides from "../components/CalculatorGuides";
import PopularCalculators from "../components/PopularCalculators";

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
