export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose",
      description: "Select the calculator you need.",
    },
    {
      number: "02",
      title: "Enter",
      description: "Add your project measurements.",
    },
    {
      number: "03",
      title: "Calculate",
      description: "Get your result instantly.",
    },
  ];

  return (
    <section className="bg-white px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">

        <div className="mb-5 text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-blue-600">
            HOW IT WORKS
          </span>

          <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Calculate in 3 Simple Steps
          </h2>

          <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
            Simple tools designed to get your answer quickly.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-slate-200 bg-slate-50 px-2 py-4 text-center shadow-sm sm:rounded-2xl sm:px-4 sm:py-5"
            >
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[10px] font-black text-white sm:h-10 sm:w-10 sm:text-xs">
                {step.number}
              </div>

              <h3 className="mt-2.5 text-sm font-bold text-slate-900 sm:text-base">
                {step.title}
              </h3>

              <p className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
