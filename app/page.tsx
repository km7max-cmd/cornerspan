import Link from "next/link";
import type { Metadata } from "next";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Features from "../components/Features";
import CTA from "../components/CTA";
import CalculatorGuides from "../components/CalculatorGuides";
import PopularCalculators from "../components/PopularCalculators";

export const metadata: Metadata = {
  title:
    "Construction Calculator – Free Online Construction Calculators | CornerSpan",

  description:
    "Use free online construction calculators to estimate concrete, bricks, steel, paint, tiles and roofing materials, quantities and costs.",

  alternates: {
    canonical: "/",
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
    title:
      "Construction Calculator – Free Online Construction Calculators | CornerSpan",

    description:
      "Free online construction calculators for concrete, brick, steel, paint, tile and roofing calculations.",

    type: "website",
    url: "/",
    siteName: "CornerSpan",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Construction Calculator – Free Online Construction Calculators | CornerSpan",
    description:
      "Free online construction calculators for construction quantities, materials and costs.",
  },
};

const calculators = [
  {
    title: "Concrete Calculator",
    description:
      "Calculate concrete volume and estimate cement, sand, aggregate and material requirements.",
    href: "/calculators/concrete",
  },
  {
    title: "Brick Calculator",
    description:
      "Estimate the number of bricks required for a wall based on its dimensions.",
    href: "/calculators/brick",
  },
  {
    title: "Steel Weight Calculator",
    description:
      "Calculate the approximate weight of steel bars using diameter and length.",
    href: "/calculators/steel",
  },
  {
    title: "Paint Calculator",
    description:
      "Estimate paint quantity based on surface area and coverage.",
    href: "/calculators/paint",
  },
  {
    title: "Tile Calculator",
    description:
      "Calculate the number of tiles required for floors and walls.",
    href: "/calculators/tile",
  },
  {
    title: "Roofing Calculator",
    description:
      "Estimate roof area and the quantity of roofing materials required.",
    href: "/calculators/roofing",
  },
];

const faqs = [
  {
    question: "What is a construction calculator?",
    answer:
      "A construction calculator is an online tool that helps estimate quantities, materials and other requirements for common construction work.",
  },
  {
    question: "Are CornerSpan calculators free?",
    answer:
      "Yes. The available CornerSpan calculators can be used online without creating an account.",
  },
  {
    question: "Can I use CornerSpan on my phone?",
    answer:
      "Yes. CornerSpan is designed for smartphones, tablets, laptops and desktop computers.",
  },
  {
    question: "What can I calculate with CornerSpan?",
    answer:
      "CornerSpan provides calculators for common construction requirements including concrete, bricks, steel, paint, tiles and roofing.",
  },
  {
    question: "Are the results exact?",
    answer:
      "The calculators use standard formulas and estimation methods. Actual quantities can vary because of project specifications, wastage, site conditions and construction practices.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No account is required to use the available calculators.",
  },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CornerSpan",
  url: "https://cornerspan.com/",
  description:
    "Free online construction calculators for material and quantity estimation.",
};

const calculatorListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Construction Calculators",
  itemListElement: calculators.map((calculator, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: calculator.title,
    url: `https://cornerspan.com${calculator.href}`,
  })),
};

export default function Home() {
  return (
    <>
      {/* Website structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      {/* Calculator list structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorListSchema),
        }}
      />

      <div className="min-h-screen bg-slate-50">

        {/* Hero */}
        <section>
          <Hero />
        </section>

        {/* Stats */}
        <section aria-label="CornerSpan statistics">
          <Stats />
        </section>

        {/* Popular Calculators */}
        <section
          aria-labelledby="popular-calculators-heading"
          className="bg-white"
        >
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">

            <div className="mb-7">
              <h2
                id="popular-calculators-heading"
                className="text-2xl font-black text-slate-900 sm:text-3xl"
              >
                Popular Construction Calculators
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Choose a calculator to estimate common construction
                quantities and material requirements.
              </p>
            </div>

            <PopularCalculators />

          </div>
        </section>

        {/* All Calculators */}
        <section
          id="calculators"
          aria-labelledby="calculators-heading"
          className="bg-slate-50 px-5 py-12 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-6xl">

            <div className="mb-7">
              <h2
                id="calculators-heading"
                className="text-2xl font-black text-slate-900 sm:text-3xl"
              >
                Free Online Construction Calculators
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Choose a calculator for your construction project.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {calculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="rounded-xl border border-blue-100 bg-white px-4 py-4 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                >
                  <h3 className="text-base font-bold text-blue-700">
                    {calculator.title}
                  </h3>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
  <Link
    href="/calculators"
    className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
  >
    More Calculators
  </Link>
</div>
          </div>
        </section>

        {/* Introduction */}
        <section
          aria-labelledby="construction-calculator-heading"
          className="bg-white px-5 py-12 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-6xl">

            <div className="max-w-3xl">

              <h2
                id="construction-calculator-heading"
                className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl"
              >
                Free Construction Calculator
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                CornerSpan provides practical online calculators for common
                construction measurements and material estimates. Enter the
                measurements required for your calculation and get a clear
                result without working through complicated formulas manually.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Use the available tools for concrete, bricks, steel, paint,
                tiles and roofing. Each calculator is designed for a specific
                type of construction calculation and includes the relevant
                inputs and results.
              </p>

            </div>

          </div>
        </section>

        {/* Why CornerSpan */}
        <section
          aria-labelledby="why-cornerspan-heading"
          className="bg-slate-50 px-5 py-12 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-6xl">

            <h2
              id="why-cornerspan-heading"
              className="text-2xl font-black text-slate-900 sm:text-3xl"
            >
              Why Use CornerSpan?
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">
                  Free to Use
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use the available calculators directly in your browser.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">
                  Simple Inputs
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Enter only the measurements needed for each calculation.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">
                  Mobile Friendly
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use the calculators on phones, tablets and computers.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-900">
                  Clear Results
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Results are presented in a simple format that is easy to
                  understand.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* How It Works */}
        <section
          aria-labelledby="how-it-works-heading"
          className="bg-white"
        >
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">

            <h2
              id="how-it-works-heading"
              className="text-2xl font-black text-slate-900 sm:text-3xl"
            >
              How It Works
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Most calculations can be completed in a few simple steps.
            </p>

            <div className="mt-7">
              <HowItWorks />
            </div>

          </div>
        </section>

        {/* Features */}
        <section>
          <Features />
        </section>

        {/* Guides */}
        <section
          aria-labelledby="guides-heading"
          className="bg-slate-50"
        >
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">

            <div className="mb-7">

              <h2
                id="guides-heading"
                className="text-2xl font-black text-slate-900 sm:text-3xl"
              >
                Construction Guides
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Learn the formulas and methods behind common construction
                calculations.
              </p>

            </div>

            <CalculatorGuides />

            <div className="mt-6">
              <Link
                href="/guides"
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                View all construction guides →
              </Link>
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="bg-white px-5 py-12 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-4xl">

            <div className="mb-7">

              <h2
                id="faq-heading"
                className="text-2xl font-black text-slate-900 sm:text-3xl"
              >
                Frequently Asked Questions
              </h2>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Common questions about CornerSpan calculators.
              </p>

            </div>

            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">

              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group px-5 py-5"
                >
                  <summary className="cursor-pointer list-none pr-6 font-bold text-slate-900">
                    {faq.question}
                  </summary>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </details>
              ))}

            </div>

          </div>
        </section>

        {/* CTA */}
        <section>
          <CTA />
        </section>

      </div>
    </>
  );
}
