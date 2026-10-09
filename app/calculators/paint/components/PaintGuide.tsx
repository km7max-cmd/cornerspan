
"use client";

import Link from "next/link";

const faqs = [
  {
    question: "How much paint do I need for a room?",
    answer:
      "It depends on wall area, ceiling height, doors, windows, number of coats, and paint coverage. Enter your room dimensions in the calculator to estimate the required paint.",
  },
  {
    question: "How many coats of paint should I use?",
    answer:
      "Two coats are a common starting point for many interior painting projects. New surfaces, strong color changes, or poor existing coverage may require additional coats.",
  },
  {
    question: "Does the calculator subtract doors and windows?",
    answer:
      "Yes. The calculator subtracts the estimated areas of doors and windows before calculating the final paint requirement.",
  },
  {
    question: "Can I calculate paint in liters?",
    answer:
      "Yes. Metric units such as meters and centimeters use square meters and liters. Imperial units use square feet and gallons.",
  },
  {
    question: "Can I enter feet and inches together?",
    answer:
      "Yes. Select the ft + in option and enter the feet and inches values. The calculator converts them automatically.",
  },
  {
    question: "Does the calculator include labor cost?",
    answer:
      "Yes. Enter a local labor rate per square foot or square meter to estimate labor separately from paint cost.",
  },
];

export default function PaintGuide() {
  return (
    <section className="mt-8 space-y-6">
      {/* Table of Contents */}
      <nav
        aria-label="Table of contents"
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-lg font-bold text-slate-950">
          On This Page
        </h2>

        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <li>
            <a className="text-blue-700 hover:underline" href="#paint-guide">
              How to Estimate Paint
            </a>
          </li>
          <li>
            <a className="text-blue-700 hover:underline" href="#paint-formula">
              Paint Calculator Formula
            </a>
          </li>
          <li>
            <a className="text-blue-700 hover:underline" href="#paint-tips">
              Paint Coverage Tips
            </a>
          </li>
          <li>
            <a className="text-blue-700 hover:underline" href="#paint-faq">
              Frequently Asked Questions
            </a>
          </li>
        </ul>
      </nav>

      {/* Paint Guide */}
      <div
        id="paint-guide"
        className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
          Paint Guide
        </p>

        <h2 className="mt-1 text-2xl font-black text-slate-950">
          How to Estimate Paint for Your Project
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Start by measuring the room length, width, and wall height.
          If you need help calculating floor dimensions, use our{" "}
          <Link
            href="/calculators/area"
            className="font-semibold text-blue-700 underline"
          >
            area calculator
          </Link>
          . For flooring projects, our{" "}
          <Link
            href="/calculators/tile"
            className="font-semibold text-blue-700 underline"
          >
            tile calculator
          </Link>{" "}
          can help estimate tile quantities separately.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">
              1. Measure the Room
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Record the length, width, and wall height using consistent
              measurement units.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">
              2. Subtract Openings
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Account for doors and windows to estimate the paintable
              wall area.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">
              3. Enter Coats and Coverage
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use the coverage rate shown on the paint product label and
              enter the number of coats you plan to apply.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">
              4. Estimate the Cost
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your paint price and labor rate to estimate these
              costs separately.
            </p>
          </div>
        </div>
      </div>

      {/* Formula */}
      <div
        id="paint-formula"
        className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-2xl font-black text-slate-950">
          Paint Calculator Formula
        </h2>

        <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
          <p>
            <strong>Wall Area:</strong>{" "}
            2 × (Length + Width) × Height
          </p>

          <p>
            <strong>Ceiling Area:</strong>{" "}
            Length × Width
          </p>

          <p>
            <strong>Paintable Wall Area:</strong>{" "}
            Wall Area − Door Area − Window Area
          </p>

          <p>
            <strong>Total Area for All Coats:</strong>{" "}
            Paintable Area × Number of Coats
          </p>

          <p>
            <strong>Paint Required:</strong>{" "}
            Total Area for All Coats ÷ Coverage per Unit
          </p>

          <p>
            <strong>Paint Cost:</strong>{" "}
            Paint Quantity × Price per Unit
          </p>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          These formulas are general estimates. The exact calculation
          depends on the selected calculator mode, units, openings,
          coverage rate, and paint product.
        </p>
      </div>

      {/* Coverage Tips and External Link */}
      <div
        id="paint-tips"
        className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-2xl font-black text-slate-950">
          Paint Coverage Tips
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Paint coverage varies with surface texture, porosity, primer,
          application method, and color changes. Check the coverage
          information on your product label before purchasing paint.
          You can also review{" "}
          <a
            href="https://www.sherwin-williams.com/homeowners"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 underline"
          >
            Sherwin-Williams homeowner painting resources
          </a>{" "}
          for additional painting guidance.
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Buy paint based on the calculated quantity and the available
          container sizes. A small allowance for touch-ups may be useful,
          but avoid purchasing substantially more than you need.
        </p>
      </div>

      {/* FAQ */}
      <div
        id="paint-faq"
        className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-2xl font-black text-slate-950">
          Paint Calculator FAQs
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
