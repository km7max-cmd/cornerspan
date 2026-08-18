"use client";

import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-blue-100/70 bg-blue-50/95 backdrop-blur-md">

      {/* Header Bar */}
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center"
        >
          <img
            src="/logo.png"
            alt="CornerSpan - Construction Calculators"
            style={{
              height: "56px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">

          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/calculators"
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

          <Link
            href="/favorites"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Favorites
          </Link>

          <Link
            href="/guides"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Guides
          </Link>

          <Link
            href="/blog"
            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            Blog
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
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-700 transition hover:bg-white hover:text-blue-600"
          >
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
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-800 transition hover:bg-white md:hidden"
          >
            {menuOpen ? (
              <span className="text-2xl">
                ×
              </span>
            ) : (
              <span className="text-2xl">
                ☰
              </span>
            )}
          </button>

        </div>

      </div>

      {/* Search Panel */}
      {searchOpen && (
        <SearchBar
          onClose={() =>
            setSearchOpen(false)
          }
        />
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-blue-100 bg-white px-5 py-4 shadow-lg md:hidden">

          <nav className="flex flex-col gap-1">

            {/* Home */}
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Home
            </Link>

            {/* All Calculators */}
            <Link
              href="/calculators"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              All Calculators
            </Link>

            {/* Categories */}
            <Link
              href="/#categories"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Categories
            </Link>

            {/* Favorites */}
            <Link
              href="/favorites"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Favorites
            </Link>

            {/* Guides */}
            <Link
              href="/guides"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Guides
            </Link>

            {/* Blog */}
            <Link
              href="/blog"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Blog
            </Link>

            {/* About */}
            <Link
              href="/about"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              About
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              Contact
            </Link>

          </nav>

        </div>
      )}

    </header>
  );
}
