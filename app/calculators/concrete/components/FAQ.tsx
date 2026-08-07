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
    <section className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">

      <div className="border-b p-6">
        <h2 className="text-3xl font-black text-slate-900">
          ❓ Frequently Asked Questions
        </h2>
      </div>

      {faqs.map((faq, index) => (
        <div key={index} className="border-b last:border-b-0">

          <button
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            className="flex w-full items-center justify-between p-6 text-left"
          >
            <span className="font-semibold text-slate-900">
              {faq.question}
            </span>

            <span className="text-xl">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>

          {openIndex === index && (
            <div className="px-6 pb-6 text-slate-600">
              {faq.answer}
            </div>
          )}

        </div>
      ))}

    </section>
  );
}
