import Link from "next/link";
import type { Metadata } from "next";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Features from "../components/Features";
import CTA from "../components/CTA";
import CalculatorGuides from "../components/CalculatorGuides";
import PopularCalculators from "../components/PopularCalculators";

export const metadata: Metadata = {
  title: "Free Construction Calculators | CornerSpan",

  description:
    "Use free online construction calculators to estimate concrete, bricks, steel, paint, tiles and roofing materials, quantities and costs.",

  alternates: {
    canonical: "https://www.cornerspan.com/",
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
    title: "Free Construction Calculators | CornerSpan",
    description:
      "Free online construction calculators for concrete, brick, steel, paint, tile and roofing calculations.",
    type: "website",
    url: "/",
    siteName: "CornerSpan",
    images: [
      {
        url: "/logo.png",
        alt: "CornerSpan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Construction Calculators | CornerSpan",
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
    icon: "▦",
  },
  {
    title: "Brick Calculator",
    description:
      "Estimate bricks, mortar, waste and material cost for a wall.",
    href: "/calculators/brick",
    icon: "▥",
  },
  {
    title: "Steel Weight Calculator",
    description:
      "Calculate the approximate weight of steel bars using diameter and length.",
    href: "/calculators/steel",
    icon: "⌁",
  },
  {
    title: "Paint Calculator",
    description:
      "Estimate paint quantity based on surface area and coverage.",
    href: "/calculators/paint",
    icon: "◩",
  },
  {
    title: "Tile Calculator",
    description:
      "Calculate the number of tiles required for floors and walls.",
    href: "/calculators/tile",
    icon: "▤",
  },
  {
    title: "Roofing Calculator",
    description:
      "Estimate roof area and the quantity of roofing materials required.",
    href: "/calculators/roofing",
    icon: "⌂",
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
  url: "https://www.cornerspan.com/",
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
    url: `https://www.cornerspan.com${calculator.href}`,
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

        {/* =========================================================
            HERO
        ========================================================== */}
        <section className="bg-white px-5 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12">
          <div className="mx-auto max-w-6xl">

            <div className="mx-auto max-w-3xl text-center">

              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Construction estimating tools
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Free Construction Calculators
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Calculate concrete, bricks, steel, paint, tiles, roofing and
                more — quickly and directly in your browser.
              </p>

              {/* Search-style calculator button */}
              <Link
                href="/calculators"
                aria-label="Search and browse construction calculators"
                className="mx-auto mt-7 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left shadow-sm transition hover:border-blue-300 hover:bg-white hover:shadow-md"
              >
                <span
                  className="text-2xl text-slate-500"
                  aria-hidden="true"
                >
                  ⌕
                </span>

                <span className="flex-1 text-sm font-medium text-slate-500 sm:text-base">
                  Search or browse calculators
                </span>

                <span className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-bold text-white">
                  View all
                </span>
              </Link>
            </div>

            {/* Quick calculator links */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {calculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <span
                    className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl font-black text-blue-700"
                    aria-hidden="true"
                  >
                    {calculator.icon}
                  </span>

                  <span className="mt-3 block text-sm font-bold leading-5 text-slate-900 group-hover:text-blue-700">
                    {calculator.title.replace(" Calculator", "")}
                  </span>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================
            POPULAR CALCULATORS
        ========================================================== */}
        <section
          aria-labelledby="popular-calculators-heading"
          className="bg-slate-50 px-5 py-12 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-6xl">

            <div className="mb-7 flex items-end justify-between gap-4">

              <div>
                <h2
                  id="popular-calculators-heading"
                  className="text-2xl font-black text-slate-950 sm:text-3xl"
                >
                  Popular Construction Calculators
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Start with the tools people use for everyday construction
                  estimates.
                </p>
              </div>

              <Link
                href="/calculators"
                className="hidden whitespace-nowrap text-sm font-bold text-blue-600 hover:underline sm:block"
              >
                View all →
              </Link>

            </div>

            <PopularCalculators />

          </div>
        </section>

        {/* =========================================================
            ALL CALCULATORS
        ========================================================== */}
        <section
          id="calculators"
          aria-labelledby="calculators-heading"
          className="bg-white px-5 py-12 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-6xl">

            <div className="mb-7">
              <h2
                id="calculators-heading"
                className="text-2xl font-black text-slate-950 sm:text-3xl"
              >
                Free Online Construction Calculators
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Choose a calculator for your construction project.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {calculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">

                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-black text-blue-700"
                      aria-hidden="true"
                    >
                      {calculator.icon}
                    </span>

                    <div>
                      <h3 className="font-bold text-slate-950 group-hover:text-blue-700">
                        {calculator.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {calculator.description}
                      </p>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/calculators"
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Explore All Calculators
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================================
            INTRODUCTION
        ========================================================== */}
        <section
          aria-labelledby="construction-calculator-heading"
          className="bg-slate-50 px-5 py-12 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-6xl">

            <div className="max-w-3xl">

              <h2
                id="construction-calculator-heading"
                className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
              >
                Free Construction Calculator Tools
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

        {/* =========================================================
            MATERIAL ESTIMATION
        ========================================================== */}
        <section
          aria-labelledby="construction-tools-heading"
          className="bg-white px-5 py-12 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-6xl">

            <div className="max-w-3xl">

              <h2
                id="construction-tools-heading"
                className="text-2xl font-black text-slate-950 sm:text-3xl"
              >
                Construction Tools for Material Estimation
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Construction projects often require estimates before materials
                can be purchased or work can begin. CornerSpan provides online
                tools that help calculate common construction quantities using
                measurements such as length, width, height, area and depth.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Depending on the project, you can estimate concrete volume,
                brick quantities, steel weight, paint requirements, tile
                quantities and roofing materials. These calculators make
                routine estimation faster while reducing the need for manual
                calculations.
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                Results are estimates based on the information entered and
                standard calculation methods. Actual requirements may vary
                because of wastage, material sizes, site conditions,
                construction methods and project specifications.
              </p>

            </div>

          </div>
        </section>

        {/* =========================================================
            STATS
        ========================================================== */}
        <section aria-label="CornerSpan statistics">
          <Stats />
        </section>

        {/* =========================================================
            WHY CORNERSPAN
        ========================================================== */}
        <section
          aria-labelledby="why-cornerspan-heading"
          className="bg-slate-50 px-5 py-12 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-6xl">

            <h2
              id="why-cornerspan-heading"
              className="text-2xl font-black text-slate-950 sm:text-3xl"
            >
              Why Use CornerSpan?
            </h2>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-950">
                  Free to Use
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use the available calculators directly in your browser.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-950">
                  Simple Inputs
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Enter only the measurements needed for each calculation.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-950">
                  Mobile Friendly
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use the calculators on phones, tablets and computers.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="font-bold text-slate-950">
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

        {/* =========================================================
            HOW IT WORKS
        ========================================================== */}
        <section
          aria-labelledby="how-it-works-heading"
          className="bg-white"
        >
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">

            <h2
              id="how-it-works-heading"
              className="text-2xl font-black text-slate-950 sm:text-3xl"
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

        {/* =========================================================
            FEATURES
        ========================================================== */}
        <section>
          <Features />
        </section>

        {/* =========================================================
            GUIDES
        ========================================================== */}
        <section
          aria-labelledby="guides-heading"
          className="bg-slate-50"
        >
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 md:py-16">

            <div className="mb-7">

              <h2
                id="guides-heading"
                className="text-2xl font-black text-slate-950 sm:text-3xl"
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

        {/* =========================================================
            FAQ
        ========================================================== */}
        <section
          aria-labelledby="faq-heading"
          className="bg-white px-5 py-12 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-4xl">

            <div className="mb-7">

              <h2
                id="faq-heading"
                className="text-2xl font-black text-slate-950 sm:text-3xl"
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
                  <summary className="cursor-pointer list-none pr-6 font-bold text-slate-950">
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

        {/* =========================================================
            CTA
        ========================================================== */}
        <section>
          <CTA />
        </section>

      </div>
    </>
  );
}
