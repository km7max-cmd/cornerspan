
import Link from "next/link";

const guides = [
  {
    title: "Concrete Volume Guide",
    description:
      "Learn how length, width and slab thickness determine concrete volume. Review the measurement process before estimating material for slabs and footings.",
    href: "/guides/concrete-volume",
    category: "VOLUME & MEASUREMENTS",
    icon: "▧",
  },
  {
    title: "Steel Weight Guide",
    description:
      "Understand how steel bar diameter and length relate to estimated weight, and why you should check the relevant steel specification for your project.",
    href: "/guides/steel-weight",
    category: "STEEL & REINFORCEMENT",
    icon: "⌁",
  },
  {
    title: "Brick Quantity Guide",
    description:
      "Explore how wall dimensions, brick size and mortar joints affect a brick estimate. Account for openings such as doors and windows where applicable.",
    href: "/guides/brick-calculation",
    
    category: "WALL MATERIALS",
    icon: "▦",
  },
];

export default function CalculatorGuides() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Learn the method
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Construction Guides and Calculation Basics
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Learn which measurements matter, how common estimates are
              calculated and what to check before ordering materials.
            </p>
          </div>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 sm:p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl text-white shadow-lg shadow-blue-600/15">
                {guide.icon}
              </div>

              <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-blue-700">
                {guide.category}
              </p>

              <h3 className="mt-2 text-lg font-bold text-slate-900 transition group-hover:text-blue-700">
                {guide.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {guide.description}
              </p>

              <span className="mt-auto inline-flex items-center pt-5 text-sm font-bold text-blue-700">
                Explore resource
                <span
                  aria-hidden="true"
                  className="ml-2 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
