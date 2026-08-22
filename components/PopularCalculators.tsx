"use client";

import Link from "next/link";
import { popularCalculators } from "../lib/calculators";

export default function PopularCalculators() {
  return (
    <section className="bg-slate-100 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-black tracking-tight text-[#102a4c] sm:text-3xl">
            Most Popular Calculators
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#49617f] sm:text-base">
            High-demand material estimators used most often by visitors.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {popularCalculators.map((calculator) => (
            <Link
              key={calculator.slug}
              href={calculator.href}
              className="group flex min-h-[118px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-2 py-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md sm:min-h-[135px]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[23px] transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14 sm:text-[26px]">
                {calculator.icon}
              </div>

              <h3 className="mt-3 text-sm font-bold leading-5 text-[#102a4c] sm:text-base">
                {calculator.shortTitle}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
