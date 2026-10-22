
"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How is concrete volume calculated?",
    answer:
      "Concrete volume is calculated by multiplying length × width × depth. This calculator converts the entered dimensions to meters internally and displays the result in cubic yards, cubic feet and cubic meters.",
  },
  {
    question: "How much concrete do I need for my project?",
    answer:
      "Enter the length, width, thickness or depth, and number of identical pieces. The calculator estimates the total concrete volume. For ordering ready-mix concrete, confirm the required quantity and any additional allowance with your supplier.",
  },
  {
    question: "How many cubic feet are in a cubic yard of concrete?",
    answer:
      "One cubic yard equals 27 cubic feet. To convert cubic feet to cubic yards, divide the cubic-foot quantity by 27. For example, 54 cubic feet equals 2 cubic yards.",
  },
  {
    question: "How many 94 lb cement bags do I need?",
    answer:
      "The estimated number of cement bags depends on the concrete volume and selected mix ratio. This calculator estimates cement using a cement density of 1440 kg/m³ and a 94 lb bag size, then rounds the bag count up to a whole bag. This is an estimate of cement ingredients, not the number of premixed concrete bags.",
  },
  {
    question: "How much sand and aggregate are needed?",
    answer:
      "Sand and aggregate quantities depend on the concrete volume, selected mix ratio and the calculator's dry-volume estimate. Actual quantities can vary with material grading, moisture content and the specified concrete mix design.",
  },
  {
    question: "Can I enter measurements in feet and inches?",
    answer:
      "Yes. The calculator supports feet, inches, meters, centimeters and millimeters. You can choose a unit for each dimension, and the calculator converts the measurements internally before calculating volume.",
  },
  {
    question: "Can I estimate concrete material costs?",
    answer:
      "Yes. Enter prices for cement, sand and aggregate and select the matching price unit. Supported units include 94 lb cement bags, cubic yards, cubic feet, kilograms, pounds, metric tonnes and US short tons where available. The total includes materials for which you enter a price.",
  },
  {
    question: "What is dry volume in concrete estimation?",
    answer:
      "Dry volume estimates the combined volume of ingredients before mixing. This calculator uses a standard factor of 1.54 multiplied by wet concrete volume. It is an estimating assumption, not a substitute for a project-specific mix design.",
  },
  {
    question: "Which concrete mix ratios can I use?",
    answer:
      "The calculator offers preset mix ratios and a custom mix option. Mix ratios are estimating inputs; the appropriate concrete proportions depend on the required strength, exposure conditions, materials and project specifications.",
  },
  {
    question: "How is the water requirement estimated?",
    answer:
      "The calculator estimates water using a water-cement ratio of 0.50. Actual water requirements depend on the specified mix design, aggregate moisture, admixtures and required workability. Do not use this estimate as a substitute for an approved concrete mix design.",
  },
  {
    question: "Does the calculator include a waste allowance?",
    answer:
      "The current calculator does not add a separate waste allowance. Actual ordering quantities may need an allowance for uneven subgrades, formwork variation, spillage or placement losses. Check the requirements with your concrete supplier.",
  },
  {
    question: "Is the CornerSpan concrete calculator free?",
    answer:
      "Yes. The online concrete calculator is free to use on a phone, tablet or computer. You can calculate estimated quantities without creating an account.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby="concrete-calculator-faq"
    >
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
          Answers about concrete volume, cement bags, mix ratios,
          material quantities and cost estimates.
        </p>
      </div>

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
                  setOpenIndex(isOpen ? null : index)
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
