"use client";

import Link from "next/link";

const links = [
  { name: "Calculators", href: "/#calculators" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Disclaimer", href: "/disclaimer" },
];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.4v3h2.7v8h3.4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.2-8.2L2.9 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 7.9 2.2 2.2 0 0 1 5.2 3.5ZM3.3 9h3.8v11.7H3.3V9Zm6.2 0h3.6v1.6h.1c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.8v6.3h-3.8v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.7H9.5V9Z" />
    </svg>
  );
}

const socials = [
  { name: "Facebook", icon: <FacebookIcon /> },
  { name: "Instagram", icon: <InstagramIcon /> },
  { name: "X", icon: <XIcon /> },
  { name: "YouTube", icon: <YouTubeIcon /> },
  { name: "LinkedIn", icon: <LinkedInIcon /> },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-20 h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">

        {/* =========================
            ROW 1 — BRAND
        ========================== */}
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between md:py-12">

          <div className="flex items-center gap-4">

            {/* Logo */}
            <Link
              href="/"
              className="group flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-2xl font-black text-white shadow-xl shadow-blue-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-600/30"
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                C
              </span>
            </Link>

            <div>
              <Link
                href="/"
                className="text-2xl font-black tracking-[-0.04em] text-slate-950 sm:text-3xl"
              >
                Corner<span className="text-blue-600">Span</span>
              </Link>

              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
                Construction Calculators
              </div>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Smart, fast and reliable calculators for contractors,
                engineers, builders and homeowners.
              </p>
            </div>

          </div>

          {/* Social icons */}
          <div className="flex items-center gap-2">

            {socials.map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                className="
                  group flex h-11 w-11 items-center justify-center
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  text-slate-500
                  shadow-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-blue-600
                  hover:bg-blue-600
                  hover:text-white
                  hover:shadow-lg
                  hover:shadow-blue-600/20
                "
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {social.icon}
                </span>
              </a>
            ))}

          </div>

        </div>


        {/* =========================
            ROW 2 — NAVIGATION
        ========================== */}
        <div className="border-y border-slate-100 py-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Explore CornerSpan
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Everything you need for smarter construction estimates.
              </p>
            </div>

            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-2"
            >
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    px-3.5 py-2
                    text-xs font-semibold
                    text-slate-600
                    transition-all duration-200
                    hover:border-blue-200
                    hover:bg-blue-50
                    hover:text-blue-600
                  "
                >
                  {link.name}
                </Link>
              ))}
            </nav>

          </div>

        </div>


        {/* =========================
            ROW 3 — COPYRIGHT
        ========================== */}
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row sm:text-left">

          <p className="text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} CornerSpan. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Free construction tools
          </div>

        </div>

      </div>
    </footer>
  );
}
