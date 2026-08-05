"use client";

import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <section className="w-full">
      <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
            🔍
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search 100+ construction calculators..."
            className="flex-1 bg-transparent text-lg text-slate-800 outline-none placeholder:text-slate-400"
          />

          <button className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
            Search
          </button>

        </div>

      </div>
    </section>
  );
}
