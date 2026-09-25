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
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
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
      aria-hidden="true"
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

function PinterestIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 3 5.95 3 10.35c0 3.4 1.9 6.05 4.65 7.1-.06-.6-.01-1.32.15-1.9l1.08-4.57s-.27-.55-.27-1.37c0-1.28.74-2.23 1.66-2.23.78 0 1.16.58 1.16 1.28 0 .78-.5 1.95-.76 3.03-.22.91.46 1.65 1.35 1.65 1.62 0 2.87-1.71 2.87-4.18 0-2.19-1.57-3.72-3.81-3.72-2.6 0-4.12 1.95-4.12 3.96 0 .78.3 1.62.68 2.08.08.1.09.19.07.29l-.25 1.02c-.04.16-.13.2-.3.12-1.1-.51-1.79-2.1-1.79-3.39 0-2.76 2-5.3 5.76-5.3 3.02 0 5.37 2.15 5.37 5.03 0 3-1.89 5.42-4.51 5.42-.88 0-1.71-.46-2-1l-.54 2.07c-.2.76-.74 1.71-1.1 2.29.83.25 1.71.39 2.63.39 5.52 0 9-3.95 9-8.35C21 5.95 17.52 2 12 2Z" />
    </svg>
  );
}

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/cornerspan",
    icon: <FacebookIcon />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cornerspan/",
    icon: <InstagramIcon />,
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/cornerspan/",
    icon: <PinterestIcon />,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-800">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Logo + Description */}

        <div className="flex flex-col items-center py-8 text-center">

          <Link
            href="/"
            aria-label="CornerSpan Home"
            className="flex items-center justify-center"
          >
            <img
              src="/logo-dark.webp?v=2"
              alt="CornerSpan - Construction Calculators"
              className="h-auto w-[220px] max-w-full object-contain"
            />
          </Link>

          <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-300">
            Construction Calculators
          </p>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            Professional construction calculators for contractors,
            engineers, builders and homeowners.
          </p>

          {/* Social Icons */}

          <div
            className="mt-5 flex items-center justify-center gap-5"
            aria-label="CornerSpan social media"
          >
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`CornerSpan on ${social.name}`}
                title={`CornerSpan on ${social.name}`}
                className="text-slate-200 transition-all duration-200 hover:-translate-y-1 hover:text-blue-400"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}

        <div className="border-y border-slate-700 py-5">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-blue-400"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}

        <div className="py-5 text-center">
          <p className="text-xs font-medium text-slate-400 sm:text-sm">
            © {new Date().getFullYear()} CornerSpan. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
