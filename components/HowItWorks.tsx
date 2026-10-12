
const steps = [
  {
    number: "01",
    title: "Choose Your Tool",
    description:
      "Select a calculator that matches your project, such as concrete volume, brick quantity, paint, tiles or gravel.",
  },
  {
    number: "02",
    title: "Enter Project Dimensions",
    description:
      "Provide the measurements requested by the tool. Check the units and include depth, thickness or coverage details when required.",
  },
  {
    number: "03",
    title: "Review the Estimate",
    description:
      "Read the result and its units carefully. Compare the estimate with your plans, product specifications and supplier guidance before ordering.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
            Simple workflow
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            How to Use a Construction Calculator
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Follow these steps to turn measurements into a useful starting
            estimate for your project.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.number}
              className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7"
            >
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-11 hidden h-px w-5 translate-x-full bg-blue-200 md:block"
                />
              )}

              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-cyan-300 shadow-md">
                {step.number}
              </span>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
