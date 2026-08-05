"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        <Link
          href="/"
          className="text-2xl font-extrabold text-blue-600"
        >
          CornerSpan
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/#calculators" className="hover:text-blue-600">Calculators</Link>
          <Link href="/" className="hover:text-blue-600">Categories</Link>
          <Link href="/" className="hover:text-blue-600">About</Link>
        </nav>

        <div className="hidden md:block">
          <button className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700">
            Explore
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-3xl md:hidden"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="border-t bg-white md:hidden">
          <nav className="flex flex-col p-4">

            <Link
              href="/"
              className="rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              Home
            </Link>

            <Link
              href="/#calculators"
              className="rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              Calculators
            </Link>

            <Link
              href="/"
              className="rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              Categories
            </Link>

            <Link
              href="/"
              className="rounded-lg px-3 py-3 hover:bg-slate-100"
            >
              About
            </Link>

            <button className="mt-4 rounded-xl bg-blue-600 py-3 font-semibold text-white">
              Explore
            </button>

          </nav>
        </div>
      )}
    </header>
  );
}
