"use client";

import Link from "next/link";
import { popularCalculators } from "../lib/calculators";

export default function CalculatorScroll() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {popularCalculators.map((calculator) => (
          <Link
            key={calculator.slug}
            href={calculator.href}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/70 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:text-blue-600 hover:shadow-md"
          >
            <span className="text-blue-600">{calculator.icon}</span>
            {calculator.shortTitle}
          </Link>
        ))}
      </div>
    </div>
  );
}
