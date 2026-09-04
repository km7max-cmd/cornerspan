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
    "Free online construction calculators for concrete, bricks, steel, paint, tiles, roofing and more. Quickly estimate materials, quantities and costs.",
  alternates: {
    canonical: "https://www.cornerspan.com/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free Construction Calculators | CornerSpan",
    description:
      "Free online construction calculators for concrete, bricks, steel, paint, tiles and roofing.",
    type: "website",
    url: "https://www.cornerspan.com/",
    siteName: "CornerSpan",
  },
};

const calculators = [
  {
    name: "Concrete",
    fullName: "Concrete Calculator",
    href: "/calculators/concrete",
    icon: "▦",
  },
  {
    name: "Brick",
    fullName: "Brick Calculator",
    href: "/calculators/brick",
    icon: "▥",
  },
  {
    name: "Steel",
    fullName: "Steel Weight Calculator",
    href: "/calculators/steel",
    icon: "⌁",
  },
  {
    name: "Paint",
    fullName: "Paint Calculator",
    href: "/calculators/paint",
    icon: "◩",
  },
  {
    name: "Tile",
    fullName: "Tile Calculator",
    href: "/calculators/tile",
    icon: "▤",
  },
  {
    name: "Roofing",
    fullName: "Roofing Calculator",
    href: "/calculators/roofing",
    icon: "⌂",
  },
];

const categories = [
  {
    name: "Concrete",
    href: "/calculators/concrete",
    icon: "▦",
  },
  {
    name: "Masonry",
    href: "/calculators/brick",
    icon: "▥",
  },
  {
    name: "Steel",
    href: "/calculators/steel",
    icon: "⌁",
  },
  {
    name: "Painting",
    href: "/calculators/paint",
    icon: "◩",
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
      "Yes. CornerSpan provides free online construction calculators that can be used directly in your browser.",
  },
  {
    question: "Can I use CornerSpan on my phone?",
    answer:
      "Yes. CornerSpan is designed to work on smartphones, tablets, laptops and desktop computers.",
  },
  {
    question: "What can I calculate with CornerSpan?",
    answer:
      "You can calculate common construction requirements including concrete volume, brick quantities, steel weight, paint quantity, tiles and roofing materials.",
  },
  {
    question: "Are calculator results exact?",
    answer:
      "Results are estimates based on the measurements and assumptions entered. Actual requirements can vary because of material sizes, wastage, site conditions and project specifications.",
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

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CornerSpan Construction Calculators",
  itemListElement: calculators.map((calculator, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: calculator.fullName,
    url: `https://www.cornerspan.com${calculator.href}`,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      <main className="min-h-screen bg-[#f5f7fb] text-slate-950">

        {/* =====================================================
            APP HERO
        ====================================================== */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 pb-8 pt-7 sm:px-6 sm:pb-12 sm:pt-10">

            <div className="mx-auto max-w-3xl text-center">

              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                Construction Tools
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Free Construction
                <span className="block text-blue-600">
                  Calculators
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Fast, simple tools for concrete, brick, steel, paint,
                tile, roofing and other construction calculations.
              </p>

              {/* App-style search */}
              <Link
                href="/calculators"
                className="mx-auto mt-7 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left shadow-sm transition hover:border-blue-300 hover:bg-white hover:shadow-md"
              >
                <span className="text-2xl text-slate-500">
                  ⌕
                </span>

                <span className="flex-1 text-sm font-medium text-slate-500 sm:text-base">
                  Search construction calculators
                </span>

                <span className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white">
                  Search
                </span>
              </Link>

            </div>
          </div>
        </section>

        {/* =====================================================
            QUICK ACCESS
        ====================================================== */}
        <section className="px-4 py-7 sm:px-6">
          <div className="mx-auto max-w-7xl">

            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black sm:text-2xl">
                  Quick Access
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Start a calculation
                </p>
              </div>

              <Link
                href="/calculators"
                className="text-sm font-bold text-blue-600"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

              {calculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-black text-blue-700">
                    {calculator.icon}
                  </span>

                  <span className="mt-3 block text-sm font-bold">
                    {calculator.name}
                  </span>
                </Link>
              ))}

            </div>
          </div>
        </section>

        {/* =====================================================
            POPULAR
        ====================================================== */}
        <section className="px-4 pb-8 sm:px-6">
          <div className="mx-auto max-w-7xl">

            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-black sm:text-2xl">
                  Popular Calculators
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Most useful construction tools
                </p>
              </div>

              <Link
                href="/calculators"
                className="text-sm font-bold text-blue-600"
              >
                View All →
              </Link>
            </div>

            <PopularCalculators />

          </div>
        </section>

        {/* =====================================================
            CATEGORIES
        ====================================================== */}
        <section className="border-y border-slate-200 bg-white px-4 py-9 sm:px-6">
          <div className="mx-auto max-w-7xl">

            <div className="mb-5">
              <h2 className="text-xl font-black sm:text-2xl">
                Browse by Category
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Find the right construction tool quickly.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-black text-blue-700 shadow-sm">
                    {category.icon}
                  </span>

                  <span>
                    <span className="block text-sm font-bold">
                      {category.name}
                    </span>

                    <span className="text-xs text-slate-500">
                      Calculators
                    </span>
                  </span>
                </Link>
              ))}

            </div>
          </div>
        </section>

        {/* =====================================================
            ALL TOOLS
        ====================================================== */}
        <section className="px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">

            <div className="mb-6">
              <h2 className="text-2xl font-black sm:text-3xl">
                All Construction Calculators
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Choose a calculator to estimate quantities, materials
                and common construction requirements.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {calculators.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">

                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl font-black text-blue-700">
                      {calculator.icon}
                    </span>

                    <div>
                      <h3 className="font-bold group-hover:text-blue-700">
                        {calculator.fullName}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {calculator.name === "Concrete" &&
                          "Calculate concrete volume and material requirements."}

                        {calculator.name === "Brick" &&
                          "Estimate bricks, mortar, waste and wall material cost."}

                        {calculator.name === "Steel" &&
                          "Calculate steel bar weight from diameter and length."}

                        {calculator.name === "Paint" &&
                          "Estimate paint quantity from surface area and coverage."}

                        {calculator.name === "Tile" &&
                          "Calculate tiles required for floors and walls."}

                        {calculator.name === "Roofing" &&
                          "Estimate roof area and roofing material requirements."}
                      </p>
                    </div>

                  </div>
                </Link>
              ))}

            </div>

            <div className="mt-7 text-center">
              <Link
                href="/calculators"
                className="inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
              >
                Explore All Calculators
              </Link>
            </div>

          </div>
        </section>

        {/* =====================================================
            SEO CONTENT
        ====================================================== */}
        <section className="border-y border-slate-200 bg-white px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">

            <h2 className="text-2xl font-black sm:text-3xl">
              Free Online Construction Calculator Tools
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              CornerSpan provides free online construction calculators
              designed to make common material and quantity estimates
              faster and easier. Enter your project measurements and
              use the appropriate calculator to get an estimate directly
              in your browser.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Construction calculations may involve concrete volume,
              brick quantities, mortar, steel weight, paint coverage,
              tile quantities and roofing materials. Using dedicated
              calculators can reduce repetitive manual calculations
              and make preliminary estimating more convenient.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              CornerSpan tools are designed for homeowners, builders,
              contractors, students and anyone who needs a quick
              construction estimate. Results should be treated as
              estimates and checked against project specifications,
              material dimensions, local practices and actual site
              conditions.
            </p>

          </div>
        </section>

        {/* =====================================================
            STATS
        ====================================================== */}
        <section>
          <Stats />
        </section>

        {/* =====================================================
            WHY CORNERSPAN
        ====================================================== */}
        <section className="bg-slate-50 px-4 py-10 sm:px-6">
          <div className="mx-auto max-w-7xl">

            <h2 className="text-2xl font-black sm:text-3xl">
              Why Use CornerSpan?
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-2xl">✓</div>
                <h3 className="mt-3 font-bold">
                  Free to Use
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use the available calculators directly in your browser.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-2xl">⚡</div>
                <h3 className="mt-3 font-bold">
                  Fast Calculations
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Enter measurements and get results quickly.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-2xl">📱</div>
                <h3 className="mt-3 font-bold">
                  Mobile Friendly
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Designed for phones, tablets and computers.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-2xl">✓</div>
                <h3 className="mt-3 font-bold">
                  Clear Results
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Simple results that are easy to understand.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}
        <section className="bg-white px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">

            <h2 className="text-2xl font-black sm:text-3xl">
              How Construction Calculators Work
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Enter your measurements, calculate and review the result.
            </p>

            <div className="mt-7">
              <HowItWorks />
            </div>

          </div>
        </section>

        {/* =====================================================
            FEATURES
        ====================================================== */}
        <section>
          <Features />
        </section>

        {/* =====================================================
            GUIDES
        ====================================================== */}
        <section className="bg-slate-50 px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-7xl">

            <div className="mb-6">
              <h2 className="text-2xl font-black sm:text-3xl">
                Construction Guides
              </h2>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Learn the formulas and methods behind common
                construction calculations.
              </p>
            </div>

            <CalculatorGuides />

            <div className="mt-6">
              <Link
                href="/guides"
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                View All Construction Guides →
              </Link>
            </div>

          </div>
        </section>

        {/* =====================================================
            FAQ
        ====================================================== */}
        <section className="bg-white px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">

            <h2 className="text-2xl font-black sm:text-3xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Common questions about CornerSpan construction calculators.
            </p>

            <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">

              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group px-5 py-5"
                >
                  <summary className="cursor-pointer list-none font-bold">
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

        {/* =====================================================
            CTA
        ====================================================== */}
        <section>
          <CTA />
        </section>

      </main>
    </>
  );
}
