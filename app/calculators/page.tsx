"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  calculatorCategories,
  liveCalculators,
} from "../../lib/calculators";

export default function CalculatorsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCalculators = useMemo(() => {
    const search = query.trim().toLowerCase();

    return liveCalculators.filter((calculator) => {
      const matchesCategory =
        activeCategory === "All" || calculator.category === activeCategory;

      const haystack = `${calculator.title} ${calculator.description} ${calculator.keywords.join(" ")}`.toLowerCase();

      const matchesSearch = !search || haystack.includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [query, activeCategory]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-4xl px-5 pb-10 pt-10 text-center sm:px-6 sm:pb-12 sm:pt-14">
          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-xs">
            CORNERSPAN CALCULATORS
          </span>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Construction
            <span className="block text-blue-600">Calculator Directory</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Find practical calculators for concrete, paving, masonry, roofing,
            interior finishing, and sitework quantities.
          </p>

          <div className="relative mx-auto mt-6 max-w-xl">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
              🔍
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators..."
              className="h-13 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5">
            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
              Calculator Directory
            </h2>
          </div>

          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {calculatorCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {filteredCalculators.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredCalculators.map((calculator) => (
                  <Link
                    key={calculator.slug}
                    href={calculator.href}
                    className="flex items-center gap-4 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:bg-blue-50 hover:text-blue-600 sm:px-6"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg">
                      {calculator.icon}
                    </span>

                    <div>
                      <span>{calculator.title}</span>
                      <p className="mt-0.5 text-xs font-medium text-slate-500">
                        {calculator.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-5 py-12 text-center">
                <div className="text-3xl">🔎</div>
                <h3 className="mt-3 font-bold text-slate-900">No calculator found</h3>
                <p className="mt-1 text-sm text-slate-500">Try another keyword.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
