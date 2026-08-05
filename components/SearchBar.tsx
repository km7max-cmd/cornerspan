"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <section className="relative mx-auto w-full max-w-5xl px-5">

      <div className="rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur">

        <div className="flex flex-col gap-3 md:flex-row">

          {/* Search Input */}
          <div className="relative flex-1">

            <Search
              size={22}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search construction calculators..."
              className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-14 pr-4 text-base text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

          </div>

          {/* Search Button */}
          <button
            className="flex h-14 items-center justify-center rounded-2xl bg-blue-600 px-8 font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            Search
          </button>

        </div>
                {/* Helper Text */}
        <div className="mt-4 flex flex-col items-center justify-between gap-2 text-center text-sm text-slate-500 md:flex-row md:text-left">

          <p>
            Search 100+ professional construction calculators.
          </p>

          <p className="font-medium text-blue-600">
            Fast • Accurate • Free
          </p>

        </div>

      </div>

    </section>
  );
}
