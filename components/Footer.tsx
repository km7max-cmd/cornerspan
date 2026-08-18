"use client";

import Link from "next/link";

const links = [
  { name: "Calculators", href: "/calculators" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Disclaimer", href: "/disclaimer" },
];

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.4v3h2.7v8h3.4Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L2.9 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
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
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        <div className="flex flex-col items-center py-8 text-center">

          <Link
            href="/"
            aria-label="CornerSpan Home"
            className="flex items-center justify-center"
          >
            <picture>
              <source
                media="(prefers-color-scheme: dark)"
                srcSet="/logo-dark.png"
              />

              <img
                src="/logo.png"
                alt="CornerSpan - Construction Calculators"
                className="h-auto w-[220px] max-w-full object-contain"
              />
            </picture>
          </Link>

          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Construction Calculators
          </p>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Professional construction calculators for contractors,
            engineers, builders and homeowners.
          </p>

          <div className="mt-5 flex items-center justify-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                className="text-slate-400 transition-all duration-200 hover:-translate-y-1 hover:text-blue-600 dark:text-slate-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="border-y border-slate-100 py-5 dark:border-slate-800">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="py-5 text-center">
          <p className="text-xs font-medium text-slate-400 sm:text-sm">
            © {new Date().getFullYear()} CornerSpan. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
