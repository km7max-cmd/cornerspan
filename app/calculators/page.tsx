"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Calculator = {
  name: string;
  description: string;
  icon: string;
  category: string;
  href?: string;
  popular?: boolean;
};

const calculators: Calculator[] = [
  {
    name: "Concrete Calculator",
    description: "Calculate concrete volume and material requirements.",
    icon: "🧱",
    category: "Concrete",
    href: "/calculators/concrete",
    popular: true,
  },
  {
    name: "Brick Calculator",
    description: "Estimate bricks, mortar and wall materials.",
    icon: "🧱",
    category: "Brick",
    href: "/calculators/brick",
    popular: true,
  },
  {
    name: "Steel Calculator",
    description: "Calculate steel weight and reinforcement requirements.",
    icon: "🔩",
    category: "Steel",
    href: "/calculators/steel",
    popular: true,
  },
  {
    name: "Paint Calculator",
    description: "Estimate paint quantity from surface area.",
    icon: "🎨",
    category: "Paint",
    href: "/calculators/paint",
    popular: true,
  },
  {
    name: "Tile Calculator",
    description: "Calculate tiles required for floors and walls.",
    icon: "▦",
    category: "Tile",
    href: "/calculators/tile",
    popular: true,
  },

  {
    name: "Roofing Calculator",
    description: "Calculate roof area and roofing material requirements.",
    icon: "🏠",
    category: "Roofing",
  },
  {
    name: "Flooring Calculator",
    description: "Estimate flooring material and area requirements.",
    icon: "📐",
    category: "Flooring",
  },
  {
    name: "Plaster Calculator",
    description: "Calculate plaster quantity and material requirements.",
    icon: "🪣",
    category: "Plaster",
  },
  {
    name: "Cement Calculator",
    description: "Estimate cement quantity for construction work.",
    icon: "🏗️",
    category: "Cement",
  },
  {
    name: "Sand Calculator",
    description: "Calculate sand quantity for construction projects.",
    icon: "⛰️",
    category: "Materials",
  },
  {
    name: "Gravel Calculator",
    description: "Estimate gravel and aggregate requirements.",
    icon: "🪨",
    category: "Materials",
  },
  {
    name: "Block Calculator",
    description: "Calculate concrete blocks required for walls.",
    icon: "⬜",
    category: "Blocks",
  },
  {
    name: "Excavation Calculator",
    description: "Calculate excavation volume and earthwork.",
    icon: "🚜",
    category: "Earthwork",
  },
  {
    name: "Area Calculator",
    description: "Calculate construction surface and floor areas.",
    icon: "📏",
    category: "General",
  },
  {
    name: "Volume Calculator",
    description: "Calculate construction volume for different shapes.",
    icon: "📦",
    category: "General",
  },
  {
    name: "Length Calculator",
    description: "Convert and calculate construction measurements.",
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
        `${calculator.name} ${calculator.description} ${calculator.category}`
          .toLowerCase()
          .includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [query, activeCategory]);

  const popularCalculators = calculators.filter(
    (calculator) => calculator.popular
  );

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">

        <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14">

          <div className="mx-auto max-w-4xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Construction Calculator Library
            </span>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
              100+ Construction
              <span className="block text-blue-600">
                Calculators
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Fast, practical and easy-to-use calculators for
              concrete, brick, steel, paint, tiles, roofing,
              materials and more.
            </p>

          </div>

          {/* Search */}

          <div className="mx-auto mt-8 max-w-2xl">

            <div className="relative">

              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                🔍
              </span>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calculators..."
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-14 pr-5 text-base text-slate-800 shadow-lg shadow-slate-200/40 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

            </div>

          </div>

          {/* Stats */}

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="px-3 py-5 text-center">
              <div className="text-2xl font-black text-blue-600 sm:text-3xl">
                100+
              </div>
              <div className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                Calculators
              </div>
            </div>

            <div className="border-x border-slate-200 px-3 py-5 text-center">
              <div className="text-2xl font-black text-blue-600 sm:text-3xl">
                15+
              </div>
              <div className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                Categories
              </div>
            </div>

            <div className="px-3 py-5 text-center">
              <div className="text-2xl font-black text-emerald-500 sm:text-3xl">
                Free
              </div>
              <div className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                Access
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* POPULAR */}
      {/* ================================================= */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:py-14">

          <div className="flex items-end justify-between gap-4">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Start Here
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
                Popular Calculators
              </h2>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Quick access to the tools visitors use most.
              </p>
            </div>

          </div>


          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {popularCalculators.map((calculator) => (

              <Link
                key={calculator.name}
                href={calculator.href || "#"}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                  {calculator.icon}
                </div>

                <h3 className="mt-4 text-base font-black text-slate-900 group-hover:text-blue-600">
                  {calculator.name}
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {calculator.description}
                </p>

                <div className="mt-4 text-xs font-bold text-blue-600">
                  Calculate →
                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* ALL CALCULATORS */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 md:py-14">

        <div className="mb-7">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Calculator Directory
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">
            Browse All Calculators
          </h2>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Find the right construction calculator by category.
          </p>

        </div>


        {/* Category Filter */}

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              {category}
            </button>

          ))}

        </div>


        {/* Result Count */}

        <div className="mb-5 flex items-center justify-between">

          <p className="text-sm font-semibold text-slate-500">
            {filteredCalculators.length} calculators shown
          </p>

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              Clear search
            </button>
          )}

        </div>


        {/* Calculator Grid */}

        {filteredCalculators.length > 0 ? (

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredCalculators.map((calculator) => {

              const isAvailable = Boolean(calculator.href);

              const content = (
                <>
                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                      {calculator.icon}
                    </div>

                    {!isAvailable && (
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Coming Soon
                      </span>
                    )}

                  </div>

                  <h3
                    className={`mt-4 text-base font-black ${
                      isAvailable
                        ? "text-slate-900 group-hover:text-blue-600"
                        : "text-slate-700"
                    }`}
                  >
                    {calculator.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {calculator.description}
                  </p>

                  <div
                    className={`mt-4 text-sm font-bold ${
                      isAvailable
                        ? "text-blue-600"
                        : "text-slate-400"
                    }`}
                  >
                    {isAvailable
                      ? "Open Calculator →"
                      : "Coming Soon"}
                  </div>
                </>
              );

              if (isAvailable) {
                return (
                  <Link
                    key={calculator.name}
                    href={calculator.href!}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div
                  key={calculator.name}
                  className="rounded-2xl border border-slate-200 bg-white p-5 opacity-90"
                >
                  {content}
                </div>
              );
            })}

          </div>

        ) : (

          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center">

            <div className="text-4xl">
              🔎
            </div>

            <h3 className="mt-4 text-xl font-black text-slate-900">
              No calculators found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching for concrete, brick, steel, paint or tile.
            </p>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("All");
              }}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              View All Calculators
            </button>

          </div>

        )}

      </section>


      {/* ================================================= */}
      {/* FUTURE 100+ CTA */}
      {/* ================================================= */}

      <section className="px-5 pb-14 sm:px-6 md:pb-20">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-12 text-center text-white shadow-xl sm:px-10">

          <div className="mx-auto max-w-2xl">

            <div className="text-4xl">
              🏗️
            </div>

            <h2 className="mt-4 text-2xl font-black sm:text-3xl">
              More Construction Tools Are Coming
            </h2>

            <p className="mt-3 text-sm leading-6 text-blue-100 sm:text-base">
              CornerSpan is building a growing library of
              construction calculators designed for contractors,
              builders, engineers and homeowners.
            </p>

            <div className="mt-7 inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-sm font-bold backdrop-blur">
              100+ calculators planned
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
