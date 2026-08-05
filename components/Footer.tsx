import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-4">

          <div>
            <h2 className="text-3xl font-black text-blue-400">
              CornerSpan
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Professional construction calculators for contractors,
              engineers, builders and DIY homeowners.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold">
              Calculators
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li><Link href="/calculators/concrete">Concrete</Link></li>
              <li><Link href="/calculators/brick">Brick</Link></li>
              <li><Link href="/calculators/steel">Steel</Link></li>
              <li><Link href="/calculators/paint">Paint</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold">
              Company
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold">
              Legal
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-700 pt-8 text-center text-slate-400">
          © {new Date().getFullYear()} CornerSpan. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
