import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-900 text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <h2 className="text-3xl font-black text-blue-400">
              CornerSpan
            </h2>

            <p className="mt-4 max-w-sm text-[15px] leading-7 text-slate-300">
              Professional construction calculators for contractors,
              engineers, builders and DIY homeowners.
            </p>

          </div>

          {/* Calculators */}
          <div>

            <h3 className="mb-4 text-lg font-bold">
              Calculators
            </h3>

            <ul className="space-y-2 text-slate-300">

              <li><Link href="/calculators/concrete" className="hover:text-white">Concrete</Link></li>

              <li><Link href="/calculators/brick" className="hover:text-white">Brick</Link></li>

              <li><Link href="/calculators/steel" className="hover:text-white">Steel</Link></li>

              <li><Link href="/calculators/paint" className="hover:text-white">Paint</Link></li>

            </ul>

          </div>

          {/* Company */}
          <div>

            <h3 className="mb-4 text-lg font-bold">
              Company
            </h3>

            <ul className="space-y-2 text-slate-300">

              <li><Link href="/about" className="hover:text-white">About</Link></li>

              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>

              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>

            </ul>

          </div>
                    {/* Legal */}
          <div>

            <h3 className="mb-4 text-lg font-bold">
              Legal
            </h3>

            <ul className="space-y-2 text-slate-300">

              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link href="/disclaimer" className="hover:text-white">
                  Disclaimer
                </Link>
              </li>

            </ul>

          </div>

        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} CornerSpan. All rights reserved.
        </div>

      </div>

    </footer>
  );
}
