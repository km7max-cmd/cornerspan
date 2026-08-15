"use client";

import Link from "next/link";
import { useState } from "react";

const calculators = [
  {
    name: "Concrete Calculator",
    description: "Concrete volume & material estimation",
    href: "/calculators/concrete",
    icon: "🏗️",
  },
  {
    name: "Brick Calculator",
    description: "Bricks required for walls",
    href: "/calculators/brick",
    icon: "🧱",
  },
  {
    name: "Steel Calculator",
    description: "Steel & reinforcement calculations",
    href: "/calculators/steel",
    icon: "🔩",
  },
  {
    name: "Paint Calculator",
    description: "Paint quantity & coverage",
    href: "/calculators/paint",
    icon: "🎨",
  },
  {
    name: "Tile Calculator",
    description: "Tile quantity & area estimation",
    href: "/calculators/tile",
    icon: "⬛",
  },
  {
    name: "Roofing Calculator",
    description: "Roof area & material estimation",
    href: "/calculators/roofing",
    icon: "🏠",
  },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const filteredCalculators =
    query.trim().length > 0
      ? calculators.filter((calculator) => {
          const searchText =
            `${calculator.name} ${calculator.description}`.toLowerCase();

          return searchText.includes(query.toLowerCase());
        })
      : [];

  return (
    <section className="relative z-20 mx-auto -mt-4 w-full max-w-5xl px-5 sm:px-6">
      <div className="rounded-3xl bg-white p-4 shadow-xl ring-1 ring-slate-100">

        {/* Search Box */}
        <div className="relative">
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search construction calculators..."
            className="
              h-16
              w-full
              rounded-full
              border
              border-slate-200
              bg-white
              pl-14
              pr-16
              text-base
              text-slate-800
              shadow-sm
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-xl
                text-slate-400
                transition
                hover:text-slate-700
              "
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Search Results */}
        {query.trim().length > 0 && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">

            {filteredCalculators.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredCalculators.map((calculator) => (
                  <Link
                    key={calculator.href}
                    href={calculator.href}
                    onClick={() => setQuery("")}
                    className="
                      flex
                      items-center
                      gap-4
                      p-4
                      transition
                      hover:bg-blue-50
                    "
                  >
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-2xl">
                      {calculator.icon}
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-900">
                        {calculator.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {calculator.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <span className="text-lg font-semibold text-blue-600">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="px-5 py-8 text-center">
                <div className="text-3xl">🔎</div>

                <h3 className="mt-3 font-bold text-slate-900">
                  No calculator found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try searching for concrete, brick, steel, paint or tile.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Badge */}
        {!query && (
          <div className="mt-4 flex justify-center">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600">
              100+ Free Construction Calculators
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
