"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-lg transition focus-within:border-blue-500">
        <Search className="mr-3 h-5 w-5 text-slate-400" />

        <input
          type="text"
          placeholder="Search calculators..."
          className="w-full bg-transparent text-lg outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
