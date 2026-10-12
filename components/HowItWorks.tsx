
const steps = [
  {
    number: "01",
    title: "Choose a Calculator",
    description:
      "Select a tool for your project, such as concrete volume, brick quantity, paint coverage, pavers or gravel.",
  },
  {
    number: "02",
    title: "Enter Measurements",
    description:
      "Enter the dimensions requested by the calculator. Check the selected units and provide depth or thickness when the calculation requires it.",
  },
  {
    number: "03",
    title: "Review Your Estimate",
    description:
      "Check the result and any displayed units or assumptions. Confirm final quantities against your project plans and the manufacturer's product specifications.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            How to Use a Construction Calculator
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Follow three simple steps to turn project measurements into a
            useful material estimate.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {step.number}
              </span>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
