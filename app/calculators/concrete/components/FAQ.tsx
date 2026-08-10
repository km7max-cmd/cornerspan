"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How is concrete volume calculated?",
    answer:
      "Concrete volume is calculated by multiplying Length × Width × Depth.",
  },
  {
    question: "Why is dry volume greater than wet volume?",
    answer:
      "Dry volume is multiplied by 1.54 to account for wastage, bulking of sand and voids between aggregates.",
  },
  {
    question: "How many cement bags are required for 1 m³ concrete?",
    answer:
      "For this calculator, approximately 29 cement bags are used for 1 cubic meter of concrete.",
  },
  {
    question: "Can I calculate using feet or inches?",
    answer:
      "Yes. Select the required unit from the Unit dropdown before calculating.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-4 w-full overflow-hidden rounded-3xl bg-white shadow-lg">

      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ Items */}
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-slate-100 last:border-b-0"
        >
          <button
            type="button"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
          >
            <span className="text-sm font-semibold leading-6 text-slate-900 sm:text-base">
              {faq.question}
            </span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-700">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>

          {openIndex === index && (
            <div className="px-5 pb-4 sm:px-6">
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}

    </section>
  );
}
