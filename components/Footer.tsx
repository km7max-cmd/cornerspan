import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 bg-slate-950 text-slate-300">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Top */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-blue-400"
            >
              CornerSpan
            </Link>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              Professional construction calculators for contractors,
              engineers, builders and DIY homeowners.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
              Calculators
            </h3>

            <div className="space-y-2 text-sm">
              <Link
                href="/calculators/concrete"
                className="block transition hover:text-blue-400"
              >
                Concrete
              </Link>

              <Link
                href="/calculators/brick"
                className="block transition hover:text-blue-400"
              >
                Brick
              </Link>

              <Link
                href="/calculators/steel"
                className="block transition hover:text-blue-400"
              >
                Steel
              </Link>

              <Link
                href="/calculators/paint"
                className="block transition hover:text-blue-400"
              >
                Paint
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>

            <div className="space-y-2 text-sm">
              <Link
                href="/about"
                className="block transition hover:text-blue-400"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="block transition hover:text-blue-400"
              >
                Contact
              </Link>

              <Link
                href="/blog"
                className="block transition hover:text-blue-400"
              >
                Blog
              </Link>
            </div>
          </div>

        </div>

        {/* Legal */}
        <div className="mt-8 border-t border-slate-800 pt-6">

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">

            <Link
              href="/privacy"
              className="transition hover:text-blue-400"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-blue-400"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/disclaimer"
              className="transition hover:text-blue-400"
            >
              Disclaimer
            </Link>

          </div>

          <p className="mt-5 text-xs text-slate-500">
            © {new Date().getFullYear()} CornerSpan. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}
