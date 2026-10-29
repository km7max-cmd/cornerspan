
const features = [
  {
    number: "01",
    title: "Calculate Area and Volume",
    description:
      "Use length, width and depth or thickness to work out the dimensions needed for common area and volume calculations. Keep measurement units consistent.",
    icon: "⌗",
  },
  {
    number: "02",
    title: "Estimate Material Quantities",
    description:
      "Explore calculators for concrete, brickwork, paint, tiles, paving and landscaping materials to help prepare an initial project estimate.",
    icon: "◈",
  },
  {
    number: "03",
    title: "Plan Your Material Order",
    description:
      "Use the estimate as a planning starting point. Product coverage, material density, cutting, waste and site conditions can affect the final quantity.",
    icon: "▤",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            Made for project planning
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            From Measurements to Material Estimates
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Understand the numbers behind your project and make more informed
            decisions before purchasing construction supplies.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-bold text-white shadow-lg shadow-blue-600/15">
                  {feature.icon}
                </span>
                <span className="text-sm font-bold tracking-widest text-slate-600">
                  {feature.number}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
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
