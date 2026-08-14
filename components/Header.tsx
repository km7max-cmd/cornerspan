"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const calculators = [
  {
    name: "Concrete",
    href: "/calculators/concrete",
    keywords: "concrete cement slab foundation",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M3 7h18v4H3zM3 13h18v4H3z" />
      </svg>
    ),
  },
  {
    name: "Brick",
    href: "/calculators/brick",
    keywords: "brick wall masonry",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 5h16v14H4z" />
        <path d="M4 10h16M4 15h16M10 5v5M16 10v5M10 15v4" />
      </svg>
    ),
  },
  {
    name: "Steel",
    href: "/calculators/steel",
    keywords: "steel rebar rod reinforcement",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 18L18 6" />
        <path d="M8 20l12-12" />
        <path d="M4 16l4 4" />
      </svg>
    ),
  },
  {
    name: "Paint",
    href: "/calculators/paint",
    keywords: "paint wall room coverage",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 3h12v5H6z" />
        <path d="M8 8v13h8V8" />
        <path d="M10 12h4" />
      </svg>
    ),
  },
  {
    name: "Tile",
    href: "/calculators/tile",
    keywords: "tile floor wall area",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <path d="M4 12h16M12 4v16" />
      </svg>
    ),
  },
  {
    name: "Roofing",
    href: "/calculators/roofing",
    keywords: "roof roof area roofing shingles",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 18l9-10 9 10" />
        <path d="M6 18h12" />
      </svg>
    ),
  },
];

const navItems = [
  { name: "Home", href: "/" },
  { name: "Calculators", href: "/#calculators" },
  { name: "Categories", href: "/categories" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  /* -----------------------------------------
     HEADER HEIGHT
  ----------------------------------------- */

  useEffect(() => {
    const updateHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  /* -----------------------------------------
     SCROLL BEHAVIOR
     
     Search OPEN:
     Header always stays visible.

     Search CLOSED:
     Scroll down  -> hide
     Scroll up    -> show
     Top          -> show
  ----------------------------------------- */

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const previousScrollY = lastScrollY.current;

        /* Search open -> NEVER hide header */

        if (searchOpen) {
          setVisible(true);
          lastScrollY.current = currentScrollY;
          ticking.current = false;
          return;
        }

        /* At top -> always show */

        if (currentScrollY <= 10) {
          setVisible(true);
        }

        /* Scrolling DOWN -> hide */

        else if (currentScrollY > previousScrollY + 6) {
          setVisible(false);
          setOpen(false);
        }

        /* Scrolling UP -> show */

        else if (currentScrollY < previousScrollY - 6) {
          setVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [searchOpen]);

  /* -----------------------------------------
     SEARCH FOCUS
  ----------------------------------------- */

  useEffect(() => {
    if (searchOpen) {
      setVisible(true);

      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  /* -----------------------------------------
     SEARCH RESULTS
  ----------------------------------------- */

  const filteredCalculators = calculators.filter((item) => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return true;
    }

    return (
      item.name.toLowerCase().includes(query) ||
      item.keywords.toLowerCase().includes(query)
    );
  });

  /* -----------------------------------------
     SEARCH TOGGLE
  ----------------------------------------- */

  const handleSearchToggle = () => {
    setSearchOpen((current) => {
      const next = !current;

      if (next) {
        setVisible(true);
        setOpen(false);
      } else {
        setSearch("");
      }

      return next;
    });
  };

  /* -----------------------------------------
     CLOSE SEARCH
  ----------------------------------------- */

  const closeSearch = () => {
    setSearchOpen(false);
    setSearch("");
  };

  return (
    <>
      {/* -------------------------------------
          SPACE FOR FIXED HEADER
      -------------------------------------- */}

      <div
        aria-hidden="true"
        style={{
          height: headerHeight,
        }}
      />

      {/* -------------------------------------
          FIXED HEADER
      -------------------------------------- */}

      <header
        ref={headerRef}
        className={`
          fixed
          left-0
          right-0
          top-0
          z-50
          w-full
          bg-blue-50/95
          backdrop-blur-md
          transition-transform
          duration-300
          ease-out
          ${visible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        {/* -----------------------------------
            MAIN HEADER
        ------------------------------------ */}

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

          {/* ---------------------------------
              DESKTOP NAV
          ---------------------------------- */}

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
              onClick={handleSearchToggle}
              aria-label={
                searchOpen
                  ? "Close search"
                  : "Search calculators"
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                text-slate-700
                transition
                hover:bg-white/70
                hover:text-blue-600
              "
            >
              {searchOpen ? (
                <span className="text-2xl leading-none">
                  ×
                </span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l5 5" />
                </svg>
              )}
            </button>

            {/* EXPLORE */}

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

          {/* ---------------------------------
              MOBILE CONTROLS
          ---------------------------------- */}

          <div className="flex items-center gap-1 lg:hidden">
            {/* SEARCH */}

            <button
              type="button"
              onClick={handleSearchToggle}
              aria-label={
                searchOpen
                  ? "Close search"
                  : "Search calculators"
              }
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                text-slate-900
                transition
                hover:bg-white/60
              "
            >
              {searchOpen ? (
                <span className="text-2xl leading-none">
                  ×
                </span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l5 5" />
                </svg>
              )}
            </button>

            {/* MENU */}

            <button
              type="button"
              onClick={() => {
                setOpen(!open);
                setSearchOpen(false);
                setSearch("");
              }}
              aria-label={
                open ? "Close menu" : "Open menu"
              }
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

        {/* -----------------------------------
            CALCULATOR LINKS
        ------------------------------------ */}

        <div className="w-full bg-transparent pb-3">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            <div
              className="
                flex
                items-center
                gap-6
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
                    h-9
                    shrink-0
                    items-center
                    gap-2
                    bg-transparent
                    px-0
                    text-xs
                    font-semibold
                    text-slate-700
                    transition
                    hover:text-blue-600
                    sm:h-10
                    sm:text-sm
                  "
                >
                  <span className="text-blue-600">
                    {calculator.icon}
                  </span>

                  <span>{calculator.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* -----------------------------------
            GLOBAL SEARCH PANEL
        ------------------------------------ */}

        {searchOpen && (
          <div
            className="
              border-t
              border-slate-200/70
              bg-white
              shadow-xl
            "
          >
            <div
              className="
                mx-auto
                max-w-3xl
                px-5
                py-4
                sm:px-6
              "
            >
              {/* SEARCH INPUT */}

              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  className="
                    absolute
                    left-4
                    top-1/2
                    h-5
                    w-5
                    -translate-y-1/2
                    text-slate-400
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="M16 16l5 5" />
                </svg>

                <input
                  ref={searchInputRef}
                  type="search"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search calculators..."
                  className="
                    h-12
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-12
                    pr-4
                    text-sm
                    font-medium
                    text-slate-900
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />
              </div>

              {/* SEARCH RESULTS */}

              <div className="mt-3">
                {filteredCalculators.length > 0 ? (
                  <div className="grid gap-1 sm:grid-cols-2">
                    {filteredCalculators.map(
                      (calculator) => (
                        <Link
                          key={calculator.name}
                          href={calculator.href}
                          onClick={closeSearch}
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-3
                            transition
                            hover:bg-blue-50
                          "
                        >
                          <span className="text-blue-600">
                            {calculator.icon}
                          </span>

                          <div>
                            <p
                              className="
                                text-sm
                                font-bold
                                text-slate-900
                              "
                            >
                              {calculator.name} Calculator
                            </p>

                            <p
                              className="
                                mt-0.5
                                text-xs
                                text-slate-500
                              "
                            >
                              Open calculator
                            </p>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                ) : (
                  <div className="px-3 py-4 text-center">
                    <p
                      className="
                        text-sm
                        font-semibold
                        text-slate-700
                      "
                    >
                      No calculator found
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                      "
                    >
                      Try Concrete, Brick, Steel or Paint.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* -----------------------------------
            MOBILE MENU
        ------------------------------------ */}

        {open && (
          <div
            className="
              absolute
              left-0
              right-0
              top-full
              border-t
              border-slate-200
              bg-blue-50/95
              shadow-xl
              backdrop-blur-xl
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
                    hover:bg-white/60
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
                  shadow-md
                "
              >
                Explore Calculators
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
