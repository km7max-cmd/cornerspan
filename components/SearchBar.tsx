"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <section className="mx-auto -mt-4 w-full max-w-5xl px-5 sm:px-6">

      <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">

        <div className="flex items-center gap-3">

          {/* Search Input */}
          <div className="relative flex-1">

            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">
              🔍
            </span>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-4 text-base text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Button */}
          <button className="flex h-14 items-center justify-center rounded-2xl bg-blue-600 px-6 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700">
            Search
          </button>

        </div>
                {/* Bottom Info */}
        <div className="mt-3 flex items-center justify-center">

          <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-medium text-blue-600">
            100+ Free Construction Calculators
          </span>

        </div>

      </div>

    </section>
  );
}
