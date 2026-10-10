
"use client";

import Link from "next/link";

const faqs = [
  {
    question: "How much paint do I need for a room?",
    answer:
      "The amount depends on the paintable wall or ceiling area, number of coats, and coverage per gallon or liter. Enter your measurements and the coverage listed on your paint can to estimate the quantity.",
  },
  {
    question: "How many coats of paint should I use?",
    answer:
      "Two coats are a common starting point for many interior painting projects. Follow the paint manufacturer's instructions. New surfaces, major color changes, or uneven coverage may require additional coats.",
  },
  {
    question: "Does the calculator subtract doors and windows?",
    answer:
      "Yes. The calculator subtracts estimated door and window areas from wall area. Actual opening sizes can differ, so treat the result as an estimate.",
  },
  {
    question: "Can I calculate paint in liters?",
    answer:
      "Yes. Select metric units to enter dimensions in meters or centimeters and calculate paint using square meters and liters. US customary units use square feet and gallons.",
  },
  {
    question: "Can I enter feet and inches together?",
    answer:
      "Yes. Select the ft + in option and enter the feet and inches values. The calculator converts the measurements for the calculation.",
  },
  {
    question: "Does the calculator include labor cost?",
    answer:
      "Yes. If you enter a labor rate per square foot or square meter, the calculator estimates labor separately from paint cost. Actual contractor quotes may include preparation and other charges.",
  },
  {
    question: "Why should I check the coverage on the paint can?",
    answer:
      "Coverage varies by product, surface texture, porosity, application method, primer, and color change. Use the manufacturer's stated coverage when possible.",
  },
  {
    question: "Why might I need to buy more paint than the estimate?",
    answer:
      "Paint is sold in specific container sizes, and real surfaces may absorb more paint than expected. The calculator rounds the purchase quantity according to its supported units, but actual coverage can vary.",
  },
];

export default function PaintGuide() {
  return (
    <section className="mt-8 space-y-6">
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
            <a className="text-blue-700 hover:underline" href="#paint-usage">
              How to Use the Calculator
            </a>
          </li>
          <li>
            <a className="text-blue-700 hover:underline" href="#paint-example">
              Calculation Example
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
          Estimating paint starts with measuring the surfaces you plan
          to paint. For a room with four walls, measure the room length,
          width, and wall height. For a ceiling-only project, use the
          ceiling dimensions. Subtract openings, account for the number
          of coats, and use the coverage printed on the paint product.
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          If you need help checking floor dimensions, use our{" "}
          <Link
            href="/calculators/area"
            className="font-semibold text-blue-700 underline"
          >
            area calculator
          </Link>
          . For a separate flooring project, our{" "}
          <Link
            href="/calculators/tile"
            className="font-semibold text-blue-700 underline"
          >
            tile calculator
          </Link>{" "}
          can help estimate tile quantities.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">
              1. Measure the Room
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Measure length, width, and wall height. Keep units
              consistent and measure each surface you want to paint.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">
              2. Account for Openings
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter the number of doors and windows. The calculator uses
              estimated opening areas, which may not match your actual
              measurements.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">
              3. Set Coats and Coverage
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter the number of coats and the coverage rate from the
              paint label. Coverage may be listed in square feet per
              gallon or square meters per liter.
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="font-bold text-slate-900">
              4. Estimate Your Budget
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter the paint price and, if needed, the labor rate.
              Review the estimated quantity and costs before purchasing.
            </p>
          </div>
        </div>
      </div>

      <div
        id="paint-usage"
        className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-2xl font-black text-slate-950">
          How to Use the Paint Calculator
        </h2>

        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-slate-600">
          <li>
            <strong className="text-slate-900">Choose the project type.</strong>{" "}
            Select the available option that matches your project, such
            as room walls or ceiling.
          </li>
          <li>
            <strong className="text-slate-900">Enter dimensions.</strong>{" "}
            Add the required length, width, and height measurements.
            Choose the appropriate measurement units.
          </li>
          <li>
            <strong className="text-slate-900">Enter openings and coats.</strong>{" "}
            Provide the number of doors and windows, then set the number
            of coats you plan to apply.
          </li>
          <li>
            <strong className="text-slate-900">Check paint coverage.</strong>{" "}
            Use the coverage rate on your paint can rather than assuming
            every paint product covers the same area.
          </li>
          <li>
            <strong className="text-slate-900">Enter prices and calculate.</strong>{" "}
            Enter the applicable paint price and labor rate, then use
            the calculator's action button to view the estimate.
          </li>
          <li>
            <strong className="text-slate-900">Review the result.</strong>{" "}
            Check the paintable area, required paint quantity, suggested
            purchase quantity, and estimated costs before buying.
          </li>
        </ol>

        <p className="mt-4 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-slate-700">
          <strong>Tip:</strong> Double-check the selected units and
          coverage rate. Entering coverage per liter while using
          gallons, or mixing measurement units, can produce an
          inaccurate estimate.
        </p>
      </div>

      <div
        id="paint-example"
        className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-2xl font-black text-slate-950">
          Paint Calculator Example
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Consider a room that is 12 feet long, 10 feet wide, and 8 feet
          high. This example estimates wall paint only and assumes one
          door, one window, two coats, and coverage of 350 square feet
          per gallon.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              <tr className="border-b border-slate-200">
                <th className="py-3 pr-4 font-semibold text-slate-900">
                  Gross wall area
                </th>
                <td className="py-3 text-slate-700">
                  2 × (12 + 10) × 8 = 352 sq ft
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-3 pr-4 font-semibold text-slate-900">
                  Estimated openings
                </th>
                <td className="py-3 text-slate-700">
                  21 + 15 = 36 sq ft
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-3 pr-4 font-semibold text-slate-900">
                  Paintable wall area
                </th>
                <td className="py-3 text-slate-700">
                  352 − 36 = 316 sq ft
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="py-3 pr-4 font-semibold text-slate-900">
                  Area for two coats
                </th>
                <td className="py-3 text-slate-700">
                  316 × 2 = 632 sq ft
                </td>
              </tr>
              <tr>
                <th className="py-3 pr-4 font-semibold text-slate-900">
                  Paint required
                </th>
                <td className="py-3 text-slate-700">
                  632 ÷ 350 ≈ 1.81 gallons
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          At this coverage rate, the estimate is approximately 1.81
          gallons, so the calculator's purchase recommendation may round
          up to 2 gallons. Actual requirements can vary with surface
          conditions and the paint product.
        </p>
      </div>

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
          These formulas provide general estimates. The calculation
          depends on the selected project type, units, openings, coverage
          rate, and paint product. Ceiling-only projects use ceiling
          area rather than wall area.
        </p>
      </div>

      <div
        id="paint-tips"
        className="scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 className="text-2xl font-black text-slate-950">
          Paint Coverage Tips
        </h2>

        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">
          <li>
            Check the manufacturer's coverage rate on the paint label.
          </li>
          <li>
            Rough, textured, or porous surfaces may require more paint.
          </li>
          <li>
            Primer, application method, and color changes can affect
            coverage.
          </li>
          <li>
            Measure actual door and window sizes when precision matters;
            this calculator uses standard area estimates for openings.
          </li>
          <li>
            Check available container sizes and prices before purchasing.
            Small touch-up quantities may be useful for future repairs.
          </li>
        </ul>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          For additional product guidance, visit{" "}
          <a
            href="https://www.sherwin-williams.com/homeowners"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 underline"
          >
            Sherwin-Williams homeowner painting resources
          </a>
          . Always follow the instructions on your selected paint product.
        </p>

        <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          <strong>Important:</strong> This calculator provides an
          estimate, not a guaranteed quantity or contractor quote.
          Paint coverage, actual opening sizes, container prices, surface
          preparation, and labor rates can change the final cost.
        </p>
      </div>

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
