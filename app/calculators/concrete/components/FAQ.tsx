"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How is concrete volume calculated?",
    answer:
      "Concrete volume is calculated by multiplying Length × Width × Depth. The calculator first converts the selected dimension units to meters and then calculates the volume in cubic meters.",
  },
  {
    question: "How do I calculate the amount of concrete I need?",
    answer:
      "Enter the length, width, depth or thickness, and quantity of the concrete work. The calculator uses these measurements to estimate the total concrete volume required.",
  },
  {
    question: "How many cement bags are needed for 1 m³ of concrete?",
    answer:
      "The number of cement bags depends on the selected concrete mix ratio. This calculator uses the selected mix ratio, a cement density of 1440 kg/m³, and a standard 50 kg cement bag to estimate the required bags.",
  },
  {
    question: "How much sand and aggregate are needed for concrete?",
    answer:
      "Sand and aggregate quantities depend on the concrete volume and selected mix ratio. The calculator applies the mix ratio to the estimated dry volume to calculate the required quantities.",
  },
  {
    question: "Can I calculate concrete using feet and inches?",
    answer:
      "Yes. The calculator supports meters, feet, centimeters, millimeters, and inches. Each dimension can have its own unit, and all dimensions are converted to meters before calculating the volume.",
  },
  {
    question: "Can this concrete calculator calculate material cost?",
    answer:
      "Yes. You can enter cement, sand, and aggregate prices and select the appropriate pricing unit. The calculator then estimates the total material cost using the calculated quantities.",
  },
  {
    question: "What is dry volume in a concrete calculation?",
    answer:
      "Dry volume is an estimation of the material volume needed before producing the final wet concrete. This calculator estimates dry volume by multiplying wet concrete volume by 1.54.",
  },
  {
    question: "What concrete mix ratios are supported?",
    answer:
      "The calculator includes M10 (1:3:6), M15 (1:2:4), M20 (1:1.5:3), M25 (1:1:2), and a Custom Mix option.",
  },
  {
    question: "How is water requirement calculated?",
    answer:
      "For estimation purposes, this calculator uses a water-cement ratio of 0.50. Water is therefore estimated by multiplying the calculated cement weight by 0.50.",
  },
  {
    question: "Is this concrete calculator free to use?",
    answer:
      "Yes. CornerSpan's online concrete calculator is free to use on a phone, tablet, or computer. No account is required to perform a calculation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby="concrete-calculator-faq"
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-100 px-5 py-5 sm:px-7">

        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          FAQ
        </p>

        <h2
          id="concrete-calculator-faq"
          className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
        >
          Frequently Asked Questions
        </h2>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Common questions about concrete volume, mix ratios, materials,
          water requirements, and material cost.
        </p>

      </div>

      {/* =====================================================
          FAQ ITEMS
      ===================================================== */}

      <div>

        {faqs.map((faq, index) => {

          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className="border-b border-slate-100 last:border-b-0"
            >

              <button
                type="button"
                onClick={() =>
                  setOpenIndex(
                    isOpen ? null : index
                  )
                }
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50 sm:px-7 sm:py-5"
              >

                <span className="text-sm font-bold leading-6 text-slate-900 sm:text-base">
                  {faq.question}
                </span>

                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-semibold transition ${
                    isOpen
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>

              </button>

              {isOpen && (
                <div className="px-5 pb-5 sm:px-7">

                  <div className="rounded-2xl bg-slate-50 px-4 py-4 sm:px-5">

                    <p className="text-sm leading-6 text-slate-600 sm:text-base">
                      {faq.answer}
                    </p>

                  </div>

                </div>
              )}

            </div>
          );
        })}

      </div>

    </section>
  );
}
