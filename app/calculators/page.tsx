"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Calculator = {
  name: string;
  icon: string;
  category: string;
  href?: string;
};

const calculators: Calculator[] = [
  {
    name: "Concrete Calculator",
    icon: "🧱",
    category: "Concrete",
    href: "/calculators/concrete",
  },
  {
    name: "Brick Calculator",
    icon: "🧱",
    category: "Brick",
    href: "/calculators/brick",
  },
  {
    name: "Steel Calculator",
    icon: "🔩",
    category: "Steel",
    href: "/calculators/steel",
  },
  {
    name: "Paint Calculator",
    icon: "🎨",
    category: "Paint",
    href: "/calculators/paint",
  },
  {
    name: "Tile Calculator",
    icon: "▦",
    category: "Tile",
    href: "/calculators/tile",
  },
  {
    name: "Roofing Calculator",
    icon: "🏠",
    category: "Roofing",
  },
  {
    name: "Flooring Calculator",
    icon: "📐",
    category: "Flooring",
  },
  {
    name: "Plaster Calculator",
    icon: "🪣",
    category: "Plaster",
  },
  {
    name: "Cement Calculator",
    icon: "🏗️",
    category: "Cement",
  },
  {
    name: "Sand Calculator",
    icon: "⛰️",
    category: "Materials",
  },
  {
    name: "Gravel Calculator",
    icon: "🪨",
    category: "Materials",
  },
  {
    name: "Block Calculator",
    icon: "⬜",
    category: "Blocks",
  },
  {
    name: "Excavation Calculator",
    icon: "🚜",
    category: "Earthwork",
  },
  {
    name: "Square Footage Calculator",
    icon: "📐",
    category: "General",
    href: "/calculators/square-footage",
  },
  {
    name: "Area Calculator",
    icon: "📏",
    category: "General",
  },
  {
    name: "Volume Calculator",
    icon: "📦",
    category: "General",
  },
  {
    name: "Length Calculator",
    icon: "📐",
    category: "General",
  },
];

const categories = [
  "All",
  "Concrete",
  "Brick",
  "Steel",
  "Paint",
  "Tile",
  "Roofing",
  "Flooring",
  "Plaster",
  "Cement",
  "Materials",
  "Blocks",
  "Earthwork",
  "General",
];

export default function CalculatorsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCalculators = useMemo(() => {
    const search = query.trim().toLowerCase();

    return calculators.filter((calculator) => {
      const matchesCategory =
        activeCategory === "All" ||
        calculator.category === activeCategory;

      const matchesSearch =
        !search ||
        calculator.name.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [query, activeCategory]);

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-4xl px-5 pb-10 pt-10 text-center sm:px-6 sm:pb-12 sm:pt-14">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-xs">
            CORNERSPAN CALCULATORS
          </span>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            100+ Construction
            <span className="block text-blue-600">
              Calculators
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Fast and easy calculators for everyday construction work.
          </p>

          {/* Search */}
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

      {/* Calculator Directory */}
      <section className="px-5 py-8 sm:px-6 sm:py-12">

        <div className="mx-auto max-w-4xl">

          <div className="mb-5">

            <h2 className="text-2xl font-black text-slate-950 sm:text-3xl">
              Calculator Directory
            </h2>

          </div>

          {/* Categories */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">

            {categories.map((category) => (
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

          {/* Results */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {filteredCalculators.length > 0 ? (

              <div className="divide-y divide-slate-100">

                {filteredCalculators.map((calculator) => {

                  const rowClass =
                    "flex items-center gap-4 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:bg-blue-50 hover:text-blue-600 sm:px-6 sm:py-4";

                  if (calculator.href) {
                    return (
                      <Link
                        key={calculator.name}
                        href={calculator.href}
                        className={rowClass}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-lg">
                          {calculator.icon}
                        </span>

                        <span>
                          {calculator.name}
                        </span>
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={calculator.name}
                      className={`${rowClass} cursor-default`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-lg">
                        {calculator.icon}
                      </span>

                      <span>
                        {calculator.name}
                      </span>
                    </div>
                  );
                })}

              </div>

            ) : (

              <div className="px-5 py-12 text-center">

                <div className="text-3xl">
                  🔎
                </div>

                <h3 className="mt-3 font-bold text-slate-900">
                  No calculator found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try another calculator name.
                </p>

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
