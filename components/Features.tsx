const features = [
  {
    title: "Fast Calculations",
    description:
      "Enter your project dimensions and get material estimates quickly.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
      </svg>
    ),
  },
  {
    title: "Practical Estimates",
    description:
      "Use standard construction formulas to estimate quantities for real projects.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.5 2.5L16 9" />
      </svg>
    ),
  },
  {
    title: "Free to Use",
    description:
      "Access CornerSpan calculators without registration or a paid subscription.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 3v18M16 7.5c-.8-1-2.1-1.5-4-1.5-2.2 0-3.5 1.1-3.5 2.8 0 4.2 7.5 1.7 7.5 5.6 0 1.7-1.4 2.8-4 2.8-1.8 0-3.2-.5-4-1.6" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {feature.icon}
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                {feature.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
