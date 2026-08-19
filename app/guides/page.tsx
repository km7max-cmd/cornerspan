import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Calculation Guides",
  description:
    "Simple construction calculation guides for concrete volume, brick quantity and steel weight. Learn the formulas with practical examples before using a calculator.",
  keywords: [
    "construction calculation guide",
    "concrete volume guide",
    "brick calculation guide",
    "steel weight guide",
    "construction calculator guide",
  ],
};

const guides = [
  {
    category: "CONCRETE",
    title: "Concrete Volume Guide",
    description:
      "Learn how to calculate concrete volume using length, width and depth.",
    href: "/guides/concrete-volume",
  },
  {
    category: "BRICK",
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate the number of bricks required for a wall.",
    href: "/guides/brick-calculation",
  },
  {
    category: "STEEL",
    title: "Steel Weight Guide",
    description:
      "Learn how to calculate steel weight using bar diameter and length.",
    href: "/guides/steel-weight",
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">

          <p className="mb-4 text-sm font-semibold text-blue-600">
            Construction Guides
          </p>

          <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Construction Calculation Guides
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Simple guides to help you understand common construction
            calculations before using a calculator.
          </p>

        </div>
      </section>

      {/* Guides */}

      <section className="px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">

          <div className="mb-7">
            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
              Popular Guides
            </h2>

            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Learn the calculation method step by step.
            </p>
          </div>

          <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block px-5 py-6 transition hover:bg-slate-50 sm:px-7"
              >
                <div className="flex items-start justify-between gap-5">

                  <div className="min-w-0">

                    <p className="text-xs font-bold tracking-wide text-blue-600">
                      {guide.category}
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-slate-950 group-hover:text-blue-600 sm:text-2xl">
                      {guide.title}
                    </h3>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                      {guide.description}
                    </p>

                  </div>

                  <span className="shrink-0 pt-5 text-sm font-semibold text-blue-600">
                    Read →
                  </span>

                </div>
              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* Why Guides */}

      <section className="border-y border-slate-200 bg-white px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">

          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
            Why use a construction guide?
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Understanding the formula helps you check your measurements,
            avoid common mistakes and use construction calculators with
            confidence.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-bold text-slate-950">
                Understand the formula
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                See what measurements are required and how they are used.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-bold text-slate-950">
                Follow an example
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Learn the calculation with a simple practical example.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-bold text-slate-950">
                Use the calculator
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Apply what you learned using the relevant CornerSpan tool.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Calculator Links */}

      <section className="px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">

          <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
            Construction Calculators
          </h2>

          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Ready to calculate? Open a calculator directly.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">

            <Link
              href="/calculators/concrete"
              className="font-semibold text-blue-600 hover:underline"
            >
              Concrete Calculator →
            </Link>

            <Link
              href="/calculators/brick"
              className="font-semibold text-blue-600 hover:underline"
            >
              Brick Calculator →
            </Link>

            <Link
              href="/calculators/steel"
              className="font-semibold text-blue-600 hover:underline"
            >
              Steel Calculator →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}
