"use client";

import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <section className="mx-auto -mt-4 w-full max-w-5xl px-5 sm:px-6">

      <div className="rounded-3xl bg-white p-4 shadow-xl">

        <div className="relative">

          {/* Left Icon */}
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-slate-400">
            🔍
          </span>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search construction calculators..."
            className="h-16 w-full rounded-full border border-slate-200 bg-white pl-14 pr-16 text-base text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          {/* Right Search Button */}
          <button
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
          >
            →
          </button>

        </div>
                {/* Bottom Badge */}
        <div className="mt-4 flex justify-center">

          <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600">
            100+ Free Construction Calculators
          </span>

        </div>

      </div>

    </section>
  );
}
