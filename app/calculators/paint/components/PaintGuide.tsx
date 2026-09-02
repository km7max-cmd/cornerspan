"use client";

const faqs = [
  {
    question: "How much paint do I need for a room?",
    answer:
      "It depends on the wall area, ceiling height, doors, windows, number of coats, and the paint coverage rate. Enter your room dimensions and the calculator will estimate the required paint.",
  },
  {
    question: "How many coats of paint should I use?",
    answer:
      "Two coats are a common starting point for many interior painting projects. New surfaces, strong color changes, or poor existing coverage may require additional coats.",
  },
  {
    question: "Does the calculator subtract doors and windows?",
    answer:
      "Yes. The calculator subtracts estimated areas for doors and windows before calculating the final paint requirement.",
  },
  {
    question: "Can I calculate paint in liters?",
    answer:
      "Yes. Metric units such as meters and centimeters use square meters and liters. Imperial units use square feet and gallons.",
  },
  {
    question: "Can I enter feet and inches together?",
    answer:
      "Yes. Select the ft + in option and enter the primary feet value and secondary inches value. The calculator converts them automatically.",
  },
  {
    question: "Does the calculator include labor cost?",
    answer:
      "Yes. You can enter a local labor rate per square foot or square meter. The calculator then estimates the labor cost separately from the paint cost.",
  },
];

export default function PaintGuide() {
  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
            Paint Guide
          </p>

          <h2 className="mt-1 text-2xl font-black text-slate-950">
            How We Calculate Your Paint Estimate
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            The calculator uses your dimensions, openings, coats,
            coverage rate and local prices to create a practical paint
            estimate.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-lg font-black text-blue-600">01</div>

            <h3 className="mt-1 font-bold text-slate-900">
              Measure the space
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Enter the length, width and wall height using your preferred
              measurement unit.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-lg font-black text-blue-600">02</div>

            <h3 className="mt-1 font-bold text-slate-900">
              Account for openings
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Doors and windows are deducted from the paintable wall area.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-lg font-black text-blue-600">03</div>

            <h3 className="mt-1 font-bold text-slate-900">
              Apply coats and coverage
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              The calculator accounts for the number of coats and the
              coverage rate printed on your paint product.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-lg font-black text-blue-600">04</div>

            <h3 className="mt-1 font-bold text-slate-900">
              Estimate your cost
            </h3>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Paint and labor are estimated separately using the prices
              you enter.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-2xl font-black text-slate-950">
          Paint Calculator Formula
        </h2>

        <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
          <p>
            <strong>Wall Area:</strong>{" "}
            2 × (Length + Width) × Height
          </p>

          <p>
            <strong>Paintable Area:</strong>{" "}
            Wall Area − Doors − Windows
          </p>

          <p>
            <strong>Total Paint Area:</strong>{" "}
            Paintable Area × Number of Coats
          </p>

          <p>
            <strong>Paint Required:</strong>{" "}
            Total Paint Area ÷ Paint Coverage
          </p>

          <p>
            <strong>Paint Cost:</strong>{" "}
            Paint Quantity × Price per Unit
          </p>
        </div>

        <div className="mt-4 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-slate-700">
          <strong>Tip:</strong> Actual paint usage can vary because of
          surface texture, application method, primer, color changes and
          product-specific coverage.
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-2xl font-black text-slate-950">
          Paint Calculator FAQ
        </h2>

        <div className="mt-4 divide-y divide-slate-200">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-4">
              <summary className="cursor-pointer list-none pr-6 font-bold text-slate-900">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}

                  <span
                    aria-hidden="true"
                    className="text-xl text-blue-600 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
