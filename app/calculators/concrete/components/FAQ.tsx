"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How is concrete volume calculated?",
    answer:
      "Concrete volume is calculated by multiplying Length × Width × Depth. The calculator converts the selected measurement units and provides the concrete volume in cubic meters.",
  },
  {
    question: "How do I calculate the amount of concrete I need?",
    answer:
      "Enter the length, width, depth, and quantity of the concrete work. The calculator uses these measurements to estimate the total concrete volume required for your project.",
  },
  {
    question: "How many cement bags are needed for 1 m³ of concrete?",
    answer:
      "The number of cement bags required for 1 m³ of concrete depends on the selected concrete mix ratio. This calculator calculates the estimated cement requirement based on the mix ratio you choose.",
  },
  {
    question: "How much sand and aggregate are needed for concrete?",
    answer:
      "Sand and aggregate quantities depend on the concrete volume and selected mix ratio. Enter your project dimensions and choose the required mix ratio to calculate the estimated quantities.",
  },
  {
    question: "Can I calculate concrete using feet and inches?",
    answer:
      "Yes. You can select the appropriate measurement unit for length, width, and depth. The calculator supports different dimension units and converts them for the calculation.",
  },
  {
    question: "Can this concrete calculator calculate material cost?",
    answer:
      "Yes. You can enter the current prices for cement, sand, and aggregate. The calculator uses the quantities and entered material prices to estimate the total material cost.",
  },
  {
    question: "What is dry volume in a concrete calculation?",
    answer:
      "Dry volume accounts for the additional material volume needed because of voids, bulking, and other factors when estimating concrete ingredients. The calculator applies its calculation method to estimate the required dry volume.",
  },
  {
    question: "Is this concrete calculator free to use?",
    answer:
      "Yes. The online concrete calculator is free to use and can be accessed from a phone, tablet, or computer without requiring an account.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="mt-4 w-full overflow-hidden rounded-3xl bg-white shadow-lg"
      aria-labelledby="concrete-calculator-faq"
    >
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <h2
          id="concrete-calculator-faq"
          className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
        >
          Frequently Asked Questions About Concrete Calculations
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Common questions about concrete volume, cement bags, sand,
          aggregate, mix ratios, and material cost.
        </p>
      </div>

      {/* FAQ Items */}
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
                setOpenIndex(isOpen ? null : index)
              }
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50 sm:px-6"
            >
              <span className="text-sm font-semibold leading-6 text-slate-900 sm:text-base">
                {faq.question}
              </span>

              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-700"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 sm:px-6">
                <p className="text-sm leading-6 text-slate-600 sm:text-base">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
