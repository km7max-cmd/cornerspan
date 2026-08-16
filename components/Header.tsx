"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-slate-200/70 bg-white/95 backdrop-blur-md">

      {/* Header Main */}
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => {
            setSearchOpen(false);
            setMenuOpen(false);
          }}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl font-black text-white shadow-sm">
            C
          </div>

          <div className="leading-none">
            <div className="text-xl font-black tracking-tight text-slate-900">
              Corner<span className="text-blue-600">Span</span>
            </div>

            <div className="mt-1 text-[9px] font-semibold tracking-[0.22em] text-slate-400">
              CONSTRUCTION CALCULATORS
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">

          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/#calculators"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Calculators
          </Link>

          <Link
            href="/#categories"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Categories
          </Link>

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Search Button */}
          <button
            type="button"
            aria-label="Search calculators"
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMenuOpen(false);
            }}
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
              searchOpen
                ? "bg-blue-50 text-blue-600"
                : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {searchOpen ? (
              <span className="text-2xl leading-none">×</span>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            )}
          </button>

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-800 transition hover:bg-slate-100 md:hidden"
          >
            {menuOpen ? (
              <span className="text-2xl">×</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>

        </div>
      </div>

      {/* Search Panel */}
      {searchOpen && (
        <SearchBar onClose={() => setSearchOpen(false)} />
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">

          <div className="flex flex-col gap-1">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/#calculators"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              All Calculators
            </Link>

            <Link
              href="/#categories"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              Categories
            </Link>

          </div>
        </div>
      )}

    </header>
  );
}
