"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const calculators = [
  {
    name: "Concrete",
    href: "/calculators/concrete",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
      >
        <path d="M3 7h18v4H3zM3 13h18v4H3z" />
      </svg>
    ),
  },
  {
    name: "Brick",
    href: "/calculators/brick",
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
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="1"
        />
        <path d="M4 12h16M12 4v16" />
      </svg>
    ),
  },
  {
    name: "Roofing",
    href: "/calculators/roofing",
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
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Calculators",
    href: "/#calculators",
  },
  {
    name: "Categories",
    href: "/categories",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "About",
    href: "/about",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const [visible, setVisible] =
    useState(true);

  const lastScrollY =
    useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        window.scrollY;

      /*
       * Always show header at the
       * very top of the page.
       */
      if (currentScrollY <= 10) {
        setVisible(true);

        lastScrollY.current =
          currentScrollY;

        return;
      }

      /*
       * Scrolling DOWN
       * Hide header.
       */
      if (
        currentScrollY >
        lastScrollY.current
      ) {
        setVisible(false);

        /*
         * Close mobile menu when
         * scrolling down.
         */
        setOpen(false);
      }

      /*
       * Scrolling UP
       * Show header.
       */
      else if (
        currentScrollY <
        lastScrollY.current
      ) {
        setVisible(true);
      }

      lastScrollY.current =
        currentScrollY;
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <header
      className={`
        fixed
        left-0
        right-0
        top-0
        z-50
        w-full
        bg-blue-50
        transition-transform
        duration-300
        ease-out
        ${
          visible
            ? "translate-y-0"
            : "-translate-y-full"
        }
      `}
    >

      {/* ========================================= */}
      {/* Main Header */}
      {/* ========================================= */}

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

        {/* Logo */}

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

        {/* ========================================= */}
        {/* Desktop Navigation */}
        {/* ========================================= */}

        <nav
          className="
            hidden
            items-center
            gap-7
            lg:flex
          "
        >

          {navItems.map(
            (item) => (
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
            )
          )}

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

        {/* ========================================= */}
        {/* Mobile Menu Button */}
        {/* ========================================= */}

        <button
          type="button"
          aria-label={
            open
              ? "Close menu"
              : "Open menu"
          }
          onClick={() =>
            setOpen(!open)
          }
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            text-slate-900
            lg:hidden
          "
        >

          <span
            className="
              text-3xl
              leading-none
            "
          >
            {open ? "×" : "☰"}
          </span>

        </button>

      </div>

      {/* ========================================= */}
      {/* Calculator Pills */}
      {/* ========================================= */}

      <div className="w-full bg-blue-50 pb-3">

        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            sm:px-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              overflow-x-auto
              pb-1
              scrollbar-hide
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >

            {calculators.map(
              (calculator) => (
                <Link
                  key={calculator.name}
                  href={calculator.href}
                  className="
                    flex
                    h-10
                    shrink-0
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-slate-200/80
                    bg-white
                    px-4
                    text-xs
                    font-semibold
                    text-slate-700
                    shadow-sm
                    transition-all
                    duration-200
                    hover:border-blue-200
                    hover:text-blue-600
                    hover:shadow-md
                    active:scale-95
                    sm:h-11
                    sm:px-5
                    sm:text-sm
                  "
                >

                  <span className="text-blue-600">
                    {calculator.icon}
                  </span>

                  {calculator.name}

                </Link>
              )
            )}

          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* Mobile Menu */}
      {/* ========================================= */}

      {open && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            border-t
            border-white/60
            bg-white/95
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

            {navItems.map(
              (item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() =>
                    setOpen(false)
                  }
                  className="
                    rounded-xl
                    px-4
                    py-3.5
                    text-base
                    font-semibold
                    text-slate-700
                    hover:bg-blue-50
                    hover:text-blue-600
                  "
                >
                  {item.name}
                </Link>
              )
            )}

            <Link
              href="/#calculators"
              onClick={() =>
                setOpen(false)
              }
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
  );
}
