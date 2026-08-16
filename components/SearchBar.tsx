"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const calculators = [
  {
    name: "Concrete Calculator",
    description: "Concrete volume & material estimation",
    icon: "🏗️",
    href: "/calculators/concrete",
    keywords: "concrete cement volume slab footing column",
  },
  {
    name: "Brick Calculator",
    description: "Bricks required for walls",
    icon: "🧱",
    href: "/calculators/brick",
    keywords: "brick bricks wall masonry",
  },
  {
    name: "Steel Calculator",
    description: "Steel & reinforcement calculations",
    icon: "🔩",
    href: "/calculators/steel",
    keywords: "steel reinforcement rebar rod weight",
  },
  {
    name: "Paint Calculator",
    description: "Paint quantity & coverage",
    icon: "🎨",
    href: "/calculators/paint",
    keywords: "paint wall coverage litres color",
  },
  {
    name: "Tile Calculator",
    description: "Tile quantity & area estimation",
    icon: "⬛",
    href: "/calculators/tile",
    keywords: "tile tiles flooring area quantity",
  },
  {
    name: "Roofing Calculator",
    description: "Roof area & material estimation",
    icon: "🏠",
    href: "/calculators/roofing",
    keywords: "roof roofing area sheets material",
  },
];

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return calculators.filter((calculator) =>
      `${calculator.name} ${calculator.description} ${calculator.keywords}`
        .toLowerCase()
        .includes(search)
    );
  }, [query]);

  return (
    <section className="relative z-30 mx-auto -mt-4 w-full max-w-5xl px-5 sm:px-6">
      <div className="rounded-3xl bg-white p-4 shadow-xl">

        {/* Search Box */}
        <div className="relative">

          {/* Search Icon */}
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400">
            🔍
          </span>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search construction calculators..."
            aria-label="Search construction calculators"
            className="h-16 w-full rounded-full border border-slate-200 bg-white pl-14 pr-16 text-base text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              ×
            </button>
          )}
        </div>

        {/* Search Results */}
        {query.trim() && (
          <div className="mt-4">

            {results.length > 0 ? (
              <div className="space-y-2">

                <p className="px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Search Results
                </p>

                {results.map((calculator) => (
                  <Link
                    key={calculator.href}
                    href={calculator.href}
                    onClick={() => setQuery("")}
                    className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50"
                  >
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
                      {calculator.icon}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600">
                        {calculator.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {calculator.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm text-slate-400 shadow-sm transition group-hover:bg-blue-600 group-hover:text-white">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              /* No Results */
              <div className="rounded-2xl border border-slate-100 bg-slate-50 px-5 py-6 text-center">
                <div className="text-3xl">🔎</div>

                <h3 className="mt-3 font-bold text-slate-800">
                  No calculator found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try searching for concrete, brick, steel, paint, tile or
                  roofing.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Badge */}
        {!query.trim() && (
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
