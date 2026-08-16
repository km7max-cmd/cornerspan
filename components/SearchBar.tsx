"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type SearchBarProps = {
  onClose: () => void;
};

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

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return calculators;
    }

    return calculators.filter((calculator) =>
      `${calculator.name} ${calculator.description} ${calculator.keywords}`
        .toLowerCase()
        .includes(search)
    );
  }, [query]);

  return (
    <div className="absolute left-0 right-0 top-[76px] border-t border-slate-200 bg-white shadow-2xl">

      <div className="mx-auto max-w-4xl px-4 py-5 md:px-6">

        {/* Search Input */}
        <div className="relative">

          {/* Icon */}
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400">
            🔍
          </span>

          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search construction calculators..."
            className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-14 text-base text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />

          {/* Clear */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-xl text-slate-400 hover:bg-slate-200 hover:text-slate-700"
            >
              ×
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mt-4">

          {!query.trim() && (
            <p className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Popular Calculators
            </p>
          )}

          {results.length > 0 ? (
            <div className="grid gap-2 md:grid-cols-2">

              {results.map((calculator) => (
                <Link
                  key={calculator.href}
                  href={calculator.href}
                  onClick={onClose}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 transition hover:border-blue-200 hover:bg-blue-50"
                >

                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    {calculator.icon}
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-slate-900 group-hover:text-blue-600">
                      {calculator.name}
                    </h3>

                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {calculator.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span className="text-sm text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600">
                    →
                  </span>

                </Link>
              ))}

            </div>
          ) : (
            <div className="rounded-2xl bg-slate-50 px-5 py-8 text-center">

              <div className="text-3xl">🔎</div>

              <h3 className="mt-3 font-bold text-slate-800">
                No calculator found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try concrete, brick, steel, paint, tile or roofing.
              </p>

            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

          <span className="text-xs font-medium text-slate-400">
            100+ Free Construction Calculators
          </span>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}
