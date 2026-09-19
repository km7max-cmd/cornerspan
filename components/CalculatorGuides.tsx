import Link from "next/link";

const guides = [
  {
    title: "Concrete Volume",
    description:
      "Learn how to calculate concrete volume for slabs, footings and other projects.",
    href: "/guides/concrete-volume",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M4 5h16v14H4z" />
        <path d="M4 9h16M8 5v14M16 5v14" />
      </svg>
    ),
  },
  {
    title: "Steel Weight",
    description:
      "Understand rebar weight calculations using standard steel bar formulas.",
    href: "/guides/steel-weight",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M7 4v16M17 4v16" />
        <path d="M7 7h10M7 17h10" />
        <path d="M9 4h6M9 20h6" />
      </svg>
    ),
  },
  {
    title: "Brick Quantity",
    description:
      "Calculate the number of bricks required for walls using wall dimensions.",
    href: "/calculators/brick",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M3 5h18v14H3z" />
        <path d="M3 10h18M3 15h18" />
        <path d="M9 5v5M15 10v5M9 15v4" />
      </svg>
    ),
  },
];

export default function CalculatorGuides() {
  return (
    <section className="border-t border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
            Construction Guides
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Learn Before You Calculate
          </h2>

          <p className="mt-3 text-slate-600">
            Practical guides explaining construction measurements,
            formulas and material estimates.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-sm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {guide.icon}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600">
                {guide.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {guide.description}
              </p>

              <span className="mt-5 inline-flex font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
