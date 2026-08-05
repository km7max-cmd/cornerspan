"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/#calculators" },
  { name: "Categories", href: "/categories" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg">
            C
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 md:text-2xl">
              CornerSpan
            </h1>

            <p className="-mt-1 text-[10px] font-medium uppercase tracking-wider text-slate-500">
              Construction Calculators
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[15px] font-semibold text-slate-700 transition duration-300 hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <Link
            href="/#calculators"
            className="rounded-2xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
          >
            Explore
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl p-2 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open Menu"
        >
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/#calculators"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-2xl bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Explore Calculators
            </Link>

          </nav>
        </div>
      )}
    </header>
  );
}
