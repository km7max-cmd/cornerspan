export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Fast Calculations",
      description:
        "Get instant construction estimates in seconds.",
    },
    {
      icon: "🎯",
      title: "Professional Accuracy",
      description:
        "Reliable calculations trusted by builders and contractors.",
    },
    {
      icon: "🆓",
      title: "100% Free",
      description:
        "Unlimited access to all construction calculators.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold text-slate-900">
          Why Choose CornerSpan?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Professional tools designed for contractors, engineers,
          builders and DIY homeowners.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="mb-5 text-5xl">
              {feature.icon}
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              {feature.title}
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
