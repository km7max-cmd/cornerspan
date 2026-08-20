import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Guides | CornerSpan",
  description:
    "Practical guides for concrete volume, brick quantity and steel weight calculations. Learn the formulas and use the right construction calculator.",
  alternates: {
    canonical: "/guides",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const guides = [
  {
    category: "CONCRETE",
    title: "Concrete Volume Guide",
    description:
      "Learn how to calculate concrete volume for slabs, beams and columns.",
    href: "/guides/concrete-volume",
  },
  {
    category: "BRICK",
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate bricks required for a wall using its dimensions and brick size.",
    href: "/guides/brick-calculation",
  },
  {
    category: "STEEL",
    title: "Steel Weight Guide",
    description:
      "Learn how to calculate steel bar weight using diameter and length.",
    href: "/guides/steel-weight",
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-white pt-[80px]">

      {/* Intro */}

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-12">

          <p className="text-sm font-semibold text-blue-600">
            Construction Guides
          </p>

          <h1 className="mt-2 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Construction Calculation Guides
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Practical guides to help you understand common construction
            calculations before using a calculator.
          </p>

        </div>
      </section>


      {/* Guides */}

      <section className="px-5 py-9 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">

          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-950">
              Popular Guides
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Learn the calculation method, then use the relevant calculator.
            </p>
          </div>


          <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">

            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group block px-5 py-5 transition hover:bg-slate-50 sm:px-6"
              >

                <div className="flex items-start justify-between gap-5">

                  <div className="min-w-0">

                    <p className="text-[11px] font-bold tracking-[0.14em] text-blue-600">
                      {guide.category}
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-slate-950 transition group-hover:text-blue-600 sm:text-xl">
                      {guide.title}
                    </h3>

                    <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600">
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

      <section className="border-y border-slate-200 bg-slate-50 px-5 py-9 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">

          <h2 className="text-2xl font-black text-slate-950">
            Why use a construction guide?
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            Understanding the formula helps you check your measurements,
            avoid common mistakes and use construction calculators with
            confidence.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="border-l-2 border-blue-600 pl-4">
              <h3 className="font-bold text-slate-950">
                Understand the formula
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                Learn which measurements are required and how they are used.
              </p>
            </div>


            <div className="border-l-2 border-blue-600 pl-4">
              <h3 className="font-bold text-slate-950">
                Follow an example
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                See how the calculation works with practical measurements.
              </p>
            </div>


            <div className="border-l-2 border-blue-600 pl-4">
              <h3 className="font-bold text-slate-950">
                Use the calculator
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-600">
                Apply what you learned using the relevant CornerSpan tool.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* Calculator Links */}

      <section className="px-5 py-9 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl">

          <h2 className="text-2xl font-black text-slate-950">
            Construction Calculators
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Ready to calculate? Open a calculator directly.
          </p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">

            <Link
              href="/calculators/concrete"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Concrete Calculator →
            </Link>

            <Link
              href="/calculators/brick"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Brick Calculator →
            </Link>

            <Link
              href="/calculators/steel"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Steel Calculator →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}
