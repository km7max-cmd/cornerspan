export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Fast & Simple",
      description:
        "Get construction estimates quickly without complicated formulas.",
    },
    {
      icon: "🎯",
      title: "Accurate Results",
      description:
        "Reliable calculations designed for real construction projects.",
    },
    {
      icon: "🆓",
      title: "100% Free",
      description:
        "Use all CornerSpan calculators freely without registration.",
    },
  ];

  return (
    <section className="bg-slate-50 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mx-auto mb-7 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold tracking-wider text-blue-600">
            WHY CORNERSPAN
          </span>

          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Built for Real Construction Work
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Simple, accurate and practical tools for contractors,
            builders, engineers and homeowners.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                {feature.icon}
              </div>

              <h3 className="mt-4 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
