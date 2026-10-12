
const features = [
  {
    title: "Calculate Area and Volume",
    description:
      "Use project dimensions to estimate surface area or material volume. For volume calculations, measurements such as length, width and depth or thickness are important.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 5h16v14H4zM4 10h16M9 5v5m6-5v5M9 10v9m6-9v9"
        />
      </svg>
    ),
  },
  {
    title: "Estimate Material Quantities",
    description:
      "Plan quantities for common construction and landscaping materials, including concrete, bricks, paint, gravel, pavers and other project supplies.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v9M8 5.3l8 4.5"
        />
      </svg>
    ),
  },
  {
    title: "Plan Before You Purchase",
    description:
      "Use the calculated quantities as a starting point for budgeting and ordering. Actual requirements depend on product coverage, material thickness, site conditions and installation methods.",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 3h8l4 4v14H4V3h4Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 3v5h8V3M8 13h8M8 17h5"
        />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Practical Tools for Construction Planning
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Understand project measurements, estimate material requirements
            and prepare for your next building or landscaping project.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
