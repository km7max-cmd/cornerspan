export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Fast Calculations",
      description:
        "Get accurate construction estimates in seconds.",
    },
    {
      icon: "🎯",
      title: "Professional Accuracy",
      description:
        "Reliable calculations trusted by contractors.",
    },
    {
      icon: "🆓",
      title: "Always Free",
      description:
        "Unlimited access to every calculator anytime.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">

      <div className="mb-10 text-center">

        <h2 className="text-3xl font-black text-slate-900 md:text-4xl">
          Why Choose CornerSpan?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
          Professional tools built for contractors,
          engineers, builders and homeowners.
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-3">
                {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110">
              {feature.icon}
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
              {feature.title}
            </h3>

            <p className="mt-3 text-[15px] leading-7 text-slate-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
