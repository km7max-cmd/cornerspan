import Link from "next/link";
import SearchBar from "../components/SearchBar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import CalculatorGuides from "../components/CalculatorGuides";
import PopularCalculators from "../components/PopularCalculators";

const categories = [
  {
    name: "Concrete",
    description: "Concrete volume & material estimation",
    icon: "🏗️",
    href: "/calculators/concrete",
  },
  {
    name: "Brick",
    description: "Bricks required for walls",
    icon: "🧱",
    href: "/calculators/brick",
  },
  {
    name: "Steel",
    description: "Steel & reinforcement calculations",
    icon: "🔩",
    href: "/calculators/steel",
  },
  {
    name: "Paint",
    description: "Paint quantity & coverage",
    icon: "🎨",
    href: "/calculators/paint",
  },
  {
    name: "Tile",
    description: "Tile quantity & area estimation",
    icon: "⬛",
    href: "/calculators/tile",
  },
  {
    name: "Roofing",
    description: "Roof area & material estimation",
    icon: "🏠",
    href: "/calculators/roofing",
  },
];

const faqs = [
  {
    question: "Are CornerSpan calculators free to use?",
    answer:
      "Yes. CornerSpan provides construction calculation tools that can be used directly in your browser without installing an app.",
  },
  {
    question: "Can I use CornerSpan on my mobile phone?",
    answer:
      "Yes. The website is designed to work on smartphones, tablets, laptops and desktop computers.",
  },
  {
    question: "What construction calculations can I do?",
    answer:
      "You can calculate concrete, bricks, steel, paint, tiles, roofing materials and other construction quantities.",
  },
  {
    question: "Are the calculator results accurate?",
    answer:
      "CornerSpan uses standard calculation formulas and practical estimation methods. Always verify final quantities against your project specifications.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is required to start using the available calculators.",
  },
];

const guides = [
  {
    title: "Concrete Volume Guide",
    description:
      "Learn how to calculate concrete volume using length, width and depth.",
    href: "/guides/concrete-volume",
    icon: "🏗️",
  },
  {
    title: "Brick Quantity Guide",
    description:
      "Understand how to estimate the number of bricks required for a wall.",
    href: "/calculators/brick",
    icon: "🧱",
  },
  {
    title: "Steel Estimation Guide",
    description:
      "Learn the basics of reinforcement steel quantity estimation.",
    href: "/calculators/steel",
    icon: "🔩",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pt-[80px]">
      <Hero />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:pb-24 md:pt-16">
          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Trusted Construction Tools
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-7xl">
              Smart{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Construction
              </span>
              <br />
              Calculators
            </h1>

            {/* Description */}
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Fast, accurate construction calculators for concrete,
              brick, steel, paint, roofing and more.
            </p>

            {/* Buttons */}
            <div className="mx-auto mt-9 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="#calculators"
                className="rounded-2xl bg-blue-600 px-7 py-5 text-center text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                All Calculators
              </Link>

              <Link
                href="#calculators"
                className="rounded-2xl border border-slate-200 bg-white px-7 py-5 text-center text-base font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600"
              >
                Categories
              </Link>
            </div>

            {/* Benefits */}
            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500">
              <span>
                <span className="mr-2 text-xl text-emerald-500">✓</span>
                Accurate calculations
              </span>

              <span>
                <span className="mr-2 text-xl text-emerald-500">✓</span>
                Free to use
              </span>

              <span>
                <span className="mr-2 text-xl text-emerald-500">✓</span>
                Works on mobile
              </span>
            </div>

          </div>
        </div>
      </section>

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
