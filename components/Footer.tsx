import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 bg-white text-slate-700">

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">

        {/* ================================================= */}
        {/* ROW 1 - BRAND */}
        {/* ================================================= */}

        <div className="flex flex-col items-center justify-between gap-6 border-b border-slate-200 pb-7 text-center md:flex-row md:text-left">

          {/* Logo + Website Name + Description */}

          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-xl font-black text-white shadow-md">
              C
            </div>

            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">
                CornerSpan
              </h2>

              <p className="mt-0.5 max-w-md text-xs leading-5 text-slate-500">
                Professional construction calculators for
                contractors, builders, engineers and homeowners.
              </p>
            </div>
          </Link>

          {/* Social Icons */}

          <div className="flex items-center gap-3">

            {/* Facebook */}

            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.4v3h2.7v8h3.4Z" />
              </svg>
            </a>

            {/* Instagram */}

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-pink-500 hover:bg-pink-500 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            {/* X */}

            <a
              href="#"
              aria-label="X"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.2-8.2L2.9 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.3 4H6.5l11.3 15.9Z" />
              </svg>
            </a>

            {/* YouTube */}

            <a
              href="#"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
              </svg>
            </a>

            {/* LinkedIn */}

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-700 hover:bg-blue-700 hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 7.9 2.2 2.2 0 0 1 5.2 3.5ZM3.3 9h3.8v11.7H3.3V9Zm6.2 0h3.6v1.6h.1c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.8v6.3h-3.8v-5.6c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.7H9.5V9Z" />
              </svg>
            </a>

          </div>

        </div>


        {/* ================================================= */}
        {/* ROW 2 - LINKS */}
        {/* ================================================= */}

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-b border-slate-200 py-6 text-sm">

          <Link
            href="/disclaimer"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Disclaimer
          </Link>

          <Link
            href="/terms"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Terms & Conditions
          </Link>

          <Link
            href="/about"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            About
          </Link>

          <Link
            href="/privacy"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Privacy Policy
          </Link>

          <Link
            href="/contact"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Contact
          </Link>

          <Link
            href="/blog"
            className="font-medium text-slate-600 transition hover:text-blue-600"
          >
            Blog
          </Link>

        </div>


        {/* ================================================= */}
        {/* ROW 3 - COPYRIGHT */}
        {/* ================================================= */}

        <div className="pt-5 text-center">

          <p className="text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()} CornerSpan.
            All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}
