import Link from "next/link";
import type { Metadata } from "next";

import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import CategoryCard from "../components/CategoryCard";
import CTA from "../components/CTA";
import CalculatorGuides from "../components/CalculatorGuides";
import PopularCalculators from "../components/PopularCalculators";

export const metadata: Metadata = {
  title:
    "Construction Calculator – Free Online Construction Calculators | CornerSpan",

  description:
    "Use free online construction calculators to estimate concrete, bricks, steel, paint, tiles and roofing materials, quantities and costs.",

  keywords: [
    "construction calculator",
    "free construction calculators",
    "online construction calculator",
    "construction calculator online",
    "building calculator",
    "construction cost calculator",
    "construction material calculator",
    "construction quantity calculator",
  ],

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
      "Calculate concrete volume, cement, sand, aggregate, water and material cost.",
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
      "Calculate steel bar weight using diameter and length.",
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
      "Calculate tile quantity and estimate the number of tiles needed.",
    href: "/calculators/tile",
  },

  {
    title: "Roofing Calculator",
    description:
      "Estimate roof area and roofing material requirements.",
    href: "/calculators/roofing",
  },
];

const faqs = [
  {
    question: "What is a construction calculator?",
    answer:
      "A construction calculator is an online tool that helps estimate quantities, materials and costs for common construction tasks such as concrete, brick, steel, paint, tile and roofing.",
  },

  {
    question: "Are CornerSpan construction calculators free?",
    answer:
      "Yes. CornerSpan provides free online construction calculators that can be used directly in a web browser.",
  },

  {
    question: "Can I use the calculators on my phone?",
    answer:
      "Yes. CornerSpan calculators are designed to work on smartphones, tablets, laptops and desktop computers.",
  },

  {
    question: "What construction materials can I calculate?",
    answer:
      "Depending on the calculator, you can estimate concrete, cement, sand, aggregate, bricks, steel, paint, tiles and roofing materials.",
  },

  {
    question: "Are the calculator results accurate?",
    answer:
      "CornerSpan calculators use standard formulas and estimation methods. Actual material requirements can vary because of project specifications, wastage, site conditions and construction practices.",
  },

  {
    question: "Do I need to create an account?",
    answer:
      "No account is required to use the available CornerSpan calculators.",
  },
];

const structuredData = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  name: "CornerSpan",

  url: "https://cornerspan.com/",

  description:
    "Free online construction calculators for materials, quantities and construction cost estimation.",

  potentialAction: {
    "@type": "SearchAction",

    target:
      "https://cornerspan.com/search?q={search_term_string}",

    "query-input":
      "required name=search_term_string",
  },
};

const calculatorListData = {
  "@context": "https://schema.org",

  "@type": "ItemList",

  name: "CornerSpan Construction Calculators",

  itemListElement: calculators.map(
    (calculator, index) => ({
      "@type": "ListItem",

      position: index + 1,

      name: calculator.title,

      url: `https://cornerspan.com${calculator.href}`,
    })
  ),
};

const faqStructuredData = {
  "@context": "https://schema.org",

  "@type": "FAQPage",

  mainEntity: faqs.map((faq) => ({
    "@type": "Question",

    name: faq.question,

    acceptedAnswer: {
      "@type": "Answer",

      text: faq.answer,
    },
  })),
};

export default function Home() {
  return (
    <>

      {/* Structured Data */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(structuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(calculatorListData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(faqStructuredData),
        }}
      />


      {/* HOME */}

      <div className="min-h-screen bg-slate-50">


        {/* HERO */}

        <section>
          <Hero />
        </section>


        {/* STATS */}

        <section aria-label="CornerSpan statistics">
          <Stats />
        </section>


        {/* POPULAR CALCULATORS */}

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
                Use practical online calculators to estimate construction
                quantities, materials and project requirements.
              </p>

            </div>

            <PopularCalculators />

          </div>

        </section>


        {/* ALL CALCULATORS */}

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
                Choose a calculator to estimate materials, quantities and
                common construction requirements.
              </p>

            </div>


            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {calculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600">
                    {calculator.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {calculator.description}
                  </p>

                  <span className="mt-4 inline-block text-sm font-bold text-blue-600">
                    Open calculator →
                  </span>

                </Link>
              ))}

            </div>

          </div>

        </section>


        {/* INTRODUCTION */}

        <section
          aria-labelledby="construction-calculators-heading"
          className="bg-white px-5 py-12 sm:px-6 md:py-16"
        >

          <div className="mx-auto max-w-6xl">

            <div className="max-w-3xl">

              <h2
                id="construction-calculators-heading"
                className="text-2xl font-black text-slate-900 sm:text-3xl"
              >
                Construction Calculators for Everyday Estimation
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                CornerSpan provides practical construction calculators for
                common material and quantity calculations. Enter your
                measurements, choose the required options and get a clear
                estimate without complicated formulas.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Whether you are estimating concrete for a slab, bricks for a
                wall, steel weight, paint coverage, tile quantity or roofing
                materials, each calculator is designed around the information
                needed for that specific calculation.
              </p>

            </div>

          </div>

        </section>


        {/* WHY CORNERSPAN */}

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
                  Use the available calculators directly in your browser
                  without an account.
                </p>

              </div>


              <div className="rounded-2xl border border-slate-200 bg-white p-5">

                <h3 className="font-bold text-slate-900">
                  Simple Inputs
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Enter the measurements relevant to the calculation and get
                  results quickly.
                </p>

              </div>


              <div className="rounded-2xl border border-slate-200 bg-white p-5">

                <h3 className="font-bold text-slate-900">
                  Mobile Friendly
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use CornerSpan on phones, tablets, laptops and desktop
                  computers.
                </p>

              </div>


              <div className="rounded-2xl border border-slate-200 bg-white p-5">

                <h3 className="font-bold text-slate-900">
                  Practical Results
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Results are presented in a clear format that is easy to
                  understand and use.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* HOW IT WORKS */}

        <section
          aria-labelledby="how-it-works-heading"
          className="bg-white"
        >

          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">

            <h2
              id="how-it-works-heading"
              className="text-2xl font-black text-slate-900 sm:text-3xl"
            >
              How Construction Calculators Work
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Most calculations take only a few simple steps.
            </p>

            <div className="mt-7">
              <HowItWorks />
            </div>

          </div>

        </section>


        {/* FEATURES */}

        <section>
          <Features />
        </section>


        {/* GUIDES */}

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
                Learn the formulas and calculation methods before using the
                relevant calculator.
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
                Common questions about CornerSpan construction calculators.
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
