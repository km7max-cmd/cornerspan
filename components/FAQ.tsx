
"use client";

import { useState } from "react";
import {
  homepageFaq,
  type HomepageFAQItem,
} from "../data/homepage-faq";

type Props = {
  items?: HomepageFAQItem[];
};

export default function FAQ({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqItems = items ?? homepageFaq;

  return (
    <section
      className="bg-white px-5 py-16 sm:px-6 sm:py-20"
      aria-labelledby="homepage-faq-heading"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-9 text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
            Helpful answers
          </span>

          <h2
            id="homepage-faq-heading"
            className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
          >
            Frequently Asked Questions
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Find out how construction estimates work, which measurements
            you may need and how to interpret your results.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `homepage-faq-answer-${index}`;

            return (
              <div
                key={`${item.question}-${index}`}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-blue-200 bg-blue-50/40"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                >
                  <span className="text-sm font-bold leading-6 text-slate-900 sm:text-base">
                    {item.question}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg transition-colors ${
                      isOpen
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={answerId}
                    className="border-t border-blue-100 px-4 pb-5 pt-4 sm:px-5"
                  >
                    <p className="text-sm leading-7 text-slate-600">
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
