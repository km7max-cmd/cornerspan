"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const calculators = [
  {
    name: "Concrete",
    href: "/calculators/concrete",
    icon: "🏗️",
  },
  {
    name: "Brick",
    href: "/calculators/brick",
    icon: "🧱",
  },
  {
    name: "Steel",
    href: "/calculators/steel",
    icon: "🔩",
  },
  {
    name: "Paint",
    href: "/calculators/paint",
    icon: "🎨",
  },
  {
    name: "Tile",
    href: "/calculators/tile",
    icon: "⬛",
  },
  {
    name: "Roofing",
    href: "/calculators/roofing",
    icon: "🏠",
  },
];

const navItems = [
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/#calculators" },
  { name: "Categories", href: "/categories" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

const searchItems = [
  {
    name: "Concrete Calculator",
    href: "/calculators/concrete",
    icon: "🏗️",
  },
  {
    name: "Brick Calculator",
    href: "/calculators/brick",
    icon: "🧱",
  },
  {
    name: "Steel Calculator",
    href: "/calculators/steel",
    icon: "🔩",
  },
  {
    name: "Paint Calculator",
    href: "/calculators/paint",
    icon: "🎨",
  },
  {
    name: "Tile Calculator",
    href: "/calculators/tile",
    icon: "⬛",
  },
  {
    name: "Roofing Calculator",
    href: "/calculators/roofing",
    icon: "🏠",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Search open ആയിരിക്കുമ്പോൾ Header hide ചെയ്യരുത്
      if (searchOpen) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Top
      if (currentScrollY <= 10) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scroll down → hide
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
        setOpen(false);
      }

      // Scroll up → show
      else if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchOpen]);

  const filteredItems = searchItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const closeSearch = () => {
    setSearchOpen(false);
    setSearch("");
  };

  return (
    <>
      {/* =========================================
          MAIN HEADER
      ========================================= */}

      <header
        className={`
          fixed
          left-0
          right-0
          top-0
          z-[100]
          w-full
          bg-blue-50
          transition-transform
          duration-300
          ease-out
          ${
            visible || searchOpen
              ? "translate-y-0"
              : "-translate-y-full"
          }
        `}
      >
        {/* MAIN HEADER */}

        <div
          className="
            mx-auto
            flex
            h-20
            max-w-7xl
            items-center
            justify-between
            px-5
            sm:px-6
            lg:h-24
          "
        >
          {/* LOGO */}

          <Link
            href="/"
            onClick={closeSearch}
            className="flex items-center gap-3"
          >
            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-blue-600
                to-indigo-700
                text-2xl
                font-black
                text-white
                shadow-lg
                shadow-blue-200/50
              "
            >
              C
            </div>

            <div>
              <div
                className="
                  text-[23px]
                  font-black
                  tracking-tight
                  text-slate-950
                  sm:text-2xl
                "
              >
                Corner
                <span className="text-blue-600">
                  Span
                </span>
              </div>

              <div
                className="
                  -mt-1
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-slate-500
                "
              >
                Construction Calculators
              </div>
            </div>
          </Link>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:text-blue-600
                "
              >
                {item.name}
              </Link>
            ))}

            {/* SEARCH ICON */}

            <button
              type="button"
              aria-label="Search calculators"
              onClick={() => {
                setSearchOpen(true);
                setVisible(true);
              }}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-slate-700
                transition
                hover:bg-white
                hover:text-blue-600
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </button>

            <Link
              href="/#calculators"
              className="
                rounded-xl
                bg-blue-600
                px-5
                py-2.5
                text-sm
                font-bold
                text-white
                shadow-md
                shadow-blue-200
                transition
                hover:bg-blue-700
              "
            >
              Explore
            </Link>
          </nav>

          {/* MOBILE BUTTONS */}

          <div className="flex items-center gap-2 lg:hidden">

            {/* SEARCH BUTTON */}

            <button
              type="button"
              aria-label="Search calculators"
              onClick={() => {
                setSearchOpen(true);
                setVisible(true);
                setOpen(false);
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                text-slate-900
              "
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </button>

            {/* MENU */}

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                text-slate-900
              "
            >
              <span className="text-3xl leading-none">
                {open ? "×" : "☰"}
              </span>
            </button>
          </div>
        </div>

        {/* =========================================
            CALCULATOR PILLS
        ========================================= */}

        <div className="w-full bg-transparent pb-3">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div
              className="
                flex
                items-center
                gap-5
                overflow-x-auto
                pb-1
                scrollbar-hide
                [-ms-overflow-style:none]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {calculators.map((calculator) => (
                <Link
                  key={calculator.name}
                  href={calculator.href}
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-slate-700
                    transition
                    hover:text-blue-600
                    sm:text-base
                  "
                >
                  <span className="text-base">
                    {calculator.icon}
                  </span>

                  {calculator.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================
            MOBILE MENU
        ========================================= */}

        {open && !searchOpen && (
          <div
            className="
              absolute
              left-0
              right-0
              top-full
              border-t
              border-slate-200
              bg-white
              shadow-xl
              lg:hidden
            "
          >
            <nav
              className="
                mx-auto
                flex
                max-w-7xl
                flex-col
                px-5
                py-4
              "
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="
                    rounded-xl
                    px-4
                    py-3.5
                    text-base
                    font-semibold
                    text-slate-700
                    transition
                    hover:bg-blue-50
                    hover:text-blue-600
                  "
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/#calculators"
                onClick={() => setOpen(false)}
                className="
                  mt-3
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3.5
                  text-center
                  font-bold
                  text-white
                "
              >
                Explore Calculators
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* =========================================
          SEARCH PAGE / SEARCH PANEL
          THIS STAYS FIXED WHILE RESULTS SCROLL
      ========================================= */}

      {searchOpen && (
        <div
          className="
            fixed
            inset-0
            z-[90]
            bg-white
          "
        >
          {/* Search content starts below Header */}

          <div
  className="
    absolute
    left-0
    right-0
    top-[156px]
    bottom-0
    overflow-y-auto
    bg-white
    [scrollbar-width:none]
    [-ms-overflow-style:none]
    [&::-webkit-scrollbar]:hidden
  "
>
            {/* STICKY SEARCH BAR */}

            <div
              className="
                sticky
                top-0
                z-50
                border-b
                border-slate-200
                bg-white
                px-5
                py-3
                shadow-sm
              "
            >
              <div className="mx-auto max-w-3xl">
                <div className="relative">

                  {/* Search Icon */}

                  <svg
                    viewBox="0 0 24 24"
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-1/2
                      h-6
                      w-6
                      -translate-y-1/2
                      text-slate-400
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-4-4" />
                  </svg>

                  {/* INPUT */}

                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search calculators..."
                    className="
                      h-14
                      w-full
                      rounded-2xl
                      border
                      border-slate-300
                      bg-white
                      pl-12
                      pr-12
                      text-base
                      text-slate-900
                      shadow-sm
                      outline-none
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                    "
                  />

                  {/* CLEAR */}

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-2xl
                        text-slate-400
                        hover:text-slate-700
                      "
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SEARCH RESULTS */}

            <div className="mx-auto max-w-3xl px-5 py-5">

              {filteredItems.length > 0 ? (
                <div className="space-y-1">

                  {filteredItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeSearch}
                      className="
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        px-4
                        py-4
                        transition
                        hover:bg-blue-50
                      "
                    >
                      <span
                        className="
                          flex
                          h-12
                          w-12
                          shrink-0
                          items-center
                          justify-center
                          text-3xl
                        "
                      >
                        {item.icon}
                      </span>

                      <div>
                        <div
                          className="
                            text-base
                            font-bold
                            text-slate-900
                          "
                        >
                          {item.name}
                        </div>

                        <div
                          className="
                            mt-1
                            text-sm
                            text-slate-500
                          "
                        >
                          Open calculator
                        </div>
                      </div>
                    </Link>
                  ))}

                </div>
              ) : (
                <div
                  className="
                    py-16
                    text-center
                    text-slate-500
                  "
                >
                  No calculators found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
