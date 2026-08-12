"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/#calculators" },
  { name: "Categories", href: "/categories" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/95 shadow-md backdrop-blur-xl"
          : "border-slate-100 bg-white/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:h-20">
        
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-xl font-black text-white shadow-lg">
            C
          </div>

          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 md:text-2xl">
              CornerSpan
            </h1>

            <p className="-mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-500">
              Construction Calculators
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
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
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
          >
            Explore
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-900 transition hover:bg-slate-100 lg:hidden"
        >
          <span className="text-3xl leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-5 py-4">
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
              className="mt-3 rounded-2xl bg-blue-600 px-6 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Explore Calculators
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
