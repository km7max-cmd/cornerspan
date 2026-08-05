"use client";

export default function SearchBar() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-lg">
        <span className="mr-3 text-xl">🔍</span>

        <input
          type="text"
          placeholder="Search calculators..."
          className="w-full bg-transparent text-lg outline-none placeholder:text-slate-400"
        />
      </div>
    </div>
  );
}
