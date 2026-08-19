import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Guides",
  description:
    "Practical construction calculation guides covering concrete, bricks and steel estimation.",
  keywords: [
    "construction guides",
    "concrete volume guide",
    "brick calculation guide",
    "steel weight guide",
    "construction calculation",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

const guides = [
  {
    number: "01",
    category: "Concrete",
    title: "Concrete Volume Guide",
    description:
      "A practical guide to calculating concrete volume from length, width and depth.",
    href: "/guides/concrete-volume",
  },
  {
    number: "02",
    category: "Brickwork",
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate the number of bricks required for a wall and account for mortar.",
    href: "/guides/brick-calculation",
  },
  {
    number: "03",
    category: "Reinforcement",
    title: "Steel Weight Guide",
    description:
      "Understand how reinforcement bar diameter and length are used to calculate steel weight.",
    href: "/guides/steel-weight",
  },
];

export default function GuidesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* Intro */}

      <section className="border-b border-slate-200">

        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
              Construction Guides
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Construction calculations,
              <br className="hidden sm:block" />
              explained clearly.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Straightforward guides for common construction quantity
              calculations. Learn the formula, follow the example, and then
              use the calculator when you are ready.
            </p>

          </div>

        </div>

      </section>

      {/* Guide list */}

      <section className="bg-slate-50">

        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">

          <div className="mb-8 flex items-end justify-between gap-4">

            <div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Guides
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Practical references for builders, contractors and homeowners.
              </p>

            </div>

          </div>

          <div className="overflow-hidden border-y border-slate-200 bg-white">

            {guides.map((guide, index) => (
              <Link
                key={guide.href}
                href={guide.href}
                className={`group block ${
                  index !== guides.length - 1
                    ? "border-b border-slate-200"
                    : ""
                }`}
              >

                <article className="grid gap-5 px-5 py-7 transition-colors group-hover:bg-slate-50 sm:grid-cols-[80px_150px_1fr_100px] sm:items-center sm:px-7">

                  {/* Number */}

                  <div className="text-2xl font-semibold tabular-nums text-slate-300">
                    {guide.number}
                  </div>

                  {/* Category */}

                  <div>

                    <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      {guide.category}
                    </p>

                  </div>

                  {/* Content */}

                  <div>

                    <h3 className="text-xl font-bold text-slate-950 group-hover:text-blue-700">
                      {guide.title}
                    </h3>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                      {guide.description}
                    </p>

                  </div>

                  {/* Link */}

                  <div className="text-sm font-semibold text-blue-700 sm:text-right">
                    Read guide
                    <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                </article>

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* How the guides work */}

      <section className="border-t border-slate-200">

        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">

          <div className="grid gap-10 md:grid-cols-3">

            <div>

              <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
                01
              </p>

              <h2 className="mt-3 text-lg font-bold text-slate-950">
                Understand the formula
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                See the basic formula and what each measurement means.
              </p>

            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
                02
              </p>

              <h2 className="mt-3 text-lg font-bold text-slate-950">
                Follow an example
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Work through a practical example using real dimensions.
              </p>

            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-widest text-blue-700">
                03
              </p>

              <h2 className="mt-3 text-lg font-bold text-slate-950">
                Use the calculator
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Once you understand the method, calculate your own project
                quantities using CornerSpan.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Calculator link */}

      <section className="border-t border-slate-200 bg-slate-50">

        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-950">
                Looking for a calculator?
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Go directly to the CornerSpan calculator collection.
              </p>

            </div>

            <Link
              href="/calculators"
              className="inline-flex w-fit items-center border border-blue-600 bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse calculators
              <span className="ml-2">→</span>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
