"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "Are CornerSpan calculators free?",
    answer:
      "Yes. CornerSpan calculators are free to use and do not require registration.",
  },
  {
    question: "Can I use CornerSpan on my mobile phone?",
    answer:
      "Yes. CornerSpan is designed to work on smartphones, tablets, laptops and desktop devices.",
  },
  {
    question: "Are the calculator results accurate?",
    answer:
      "The calculators use standard estimation formulas. Always verify final quantities with your project specifications.",
  },
  {
    question: "What construction calculations are available?",
    answer:
      "CornerSpan provides calculators for concrete, brick, steel, paint, tile, roofing and other construction requirements.",
  },
  {
    question: "Do I need an account to use the calculators?",
    answer:
      "No. You can use the available calculators without creating an account.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-6 text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-blue-600">
            FAQ
          </span>

          <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
            Quick answers to common questions about CornerSpan.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-2.5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-blue-200 bg-blue-50/40"
                    : "border-slate-200 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                >
                  <span className="text-sm font-bold text-slate-800 sm:text-base">
                    {item.question}
                  </span>

                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg transition-all ${
                      isOpen
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-blue-100 px-4 pb-4 pt-3">
                    <p className="text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
