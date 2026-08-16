export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Fast",
      description: "Quick calculations",
    },
    {
      icon: "🎯",
      title: "Accurate",
      description: "Reliable results",
    },
    {
      icon: "🆓",
      title: "Free",
      description: "Always free",
    },
  ];

  return (
    <section className="bg-slate-50 px-4 py-7 sm:px-6 sm:py-9">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-5 text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-blue-600">
            WHY CORNERSPAN
          </span>

          <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Simple. Accurate. Free.
          </h2>
        </div>

        {/* Compact Features */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white px-2 py-4 text-center shadow-sm sm:rounded-2xl sm:px-4 sm:py-5"
            >
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-lg sm:h-11 sm:w-11 sm:text-xl">
                {feature.icon}
              </div>

              <h3 className="mt-2.5 text-sm font-bold text-slate-900 sm:text-base">
                {feature.title}
              </h3>

              <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
