import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Guides",
  description:
    "Learn how to calculate concrete volume, brick quantity, steel weight and other construction quantities with simple step-by-step guides.",
  keywords: [
    "construction guides",
    "concrete volume guide",
    "brick calculation guide",
    "steel weight guide",
    "construction calculation guide",
    "building material calculation",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

const guides = [
  {
    title: "Concrete Volume Guide",
    description:
      "Learn how to calculate concrete volume using length, width and depth with simple formulas and practical examples.",
    icon: "🏗️",
    href: "/guides/concrete-volume",
    category: "Concrete",
  },
  {
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate the number of bricks required for a wall using wall dimensions, brick size and mortar allowance.",
    icon: "🧱",
    href: "/guides/brick-calculation",
    category: "Brick",
  },
  {
    title: "Steel Weight Guide",
    description:
      "Learn how to calculate reinforcement steel weight using bar diameter, length and standard steel density.",
    icon: "🔩",
    href: "/guides/steel-weight",
    category: "Steel",
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">

          <div className="max-w-3xl">

            <div className="mb-4 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
              📚 Construction Guides
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Construction Calculation Guides
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Learn how to calculate construction quantities step by step.
              Understand the formulas, see practical examples, and use the
              CornerSpan calculators to get accurate estimates.
            </p>

          </div>

        </div>

      </section>

      {/* Guides */}

      <section className="px-5 py-10 sm:px-6 sm:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="mb-8">

            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
              Popular Construction Guides
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Choose a guide to learn the calculation method.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                {/* Icon */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                  {guide.icon}
                </div>

                {/* Category */}

                <div className="mt-5 text-xs font-bold uppercase tracking-wider text-blue-600">
                  {guide.category} Guide
                </div>

                {/* Title */}

                <h3 className="mt-2 text-xl font-black text-slate-950">
                  {guide.title}
                </h3>

                {/* Description */}

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {guide.description}
                </p>

                {/* CTA */}

                <div className="mt-6 flex items-center font-bold text-blue-600">
                  Read Guide
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* Why Guides */}

      <section className="border-y border-slate-200 bg-white px-5 py-10 sm:px-6 sm:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 md:grid-cols-3">

            <div>
              <div className="text-3xl">📐</div>

              <h2 className="mt-3 text-lg font-black text-slate-950">
                Simple Formulas
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Understand the basic formulas used in common construction
                calculations.
              </p>
            </div>

            <div>
              <div className="text-3xl">🧮</div>

              <h2 className="mt-3 text-lg font-black text-slate-950">
                Practical Examples
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Follow worked examples to understand how the calculations are
                performed.
              </p>
            </div>

            <div>
              <div className="text-3xl">⚡</div>

              <h2 className="mt-3 text-lg font-black text-slate-950">
                Calculate Faster
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                After learning the method, use CornerSpan calculators for
                faster quantity estimates.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Calculator CTA */}

      <section className="px-5 py-12 sm:px-6 sm:py-16">

        <div className="mx-auto max-w-5xl rounded-3xl bg-blue-600 px-6 py-10 text-center shadow-lg sm:px-10">

          <h2 className="text-2xl font-black text-white sm:text-3xl">
            Ready to Calculate?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
            Learn the calculation method and then use our free construction
            calculators to get your estimate quickly.
          </p>

          <Link
            href="/calculators"
            className="mt-6 inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50"
          >
            Browse Calculators
            <span className="ml-2">→</span>
          </Link>

        </div>

      </section>

    </main>
  );
}
