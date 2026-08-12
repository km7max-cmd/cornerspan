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
    <header className="relative z-40 w-full bg-transparent">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:h-24">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-xl font-black text-white shadow-lg shadow-blue-600/20">
            C
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
              Corner<span className="text-blue-600">Span</span>
            </h1>

            <p className="-mt-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500 sm:text-[10px]">
              Construction Calculators
            </p>
          </div>

        </Link>


        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-7 lg:flex">

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-slate-700 transition-colors hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/#calculators"
            className="rounded-2xl bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Explore
          </Link>

        </nav>


        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Open menu"
          className="rounded-xl p-2 text-slate-900 lg:hidden"
        >
          <span className="text-3xl leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>

      </div>


      {/* Mobile Menu */}

      {open && (
        <div className="border-t border-slate-200/60 bg-white/95 backdrop-blur-xl lg:hidden">

          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/#calculators"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-2xl bg-blue-600 px-5 py-3 text-center font-semibold text-white"
            >
              Explore Calculators
            </Link>

          </nav>

        </div>
      )}

    </header>
  );
}
