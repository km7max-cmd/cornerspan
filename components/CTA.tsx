
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-white px-5 pb-16 pt-4 sm:px-6 sm:pb-20">
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#07111f] px-6 py-12 text-center shadow-xl sm:px-10 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-blue-600/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
            Your next project starts here
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Plan Better with Construction Calculators
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Estimate material quantities, understand your measurements and
            prepare for your next building or landscaping project with
            CornerSpan.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Explore All Calculators
              <span aria-hidden="true" className="ml-2">→</span>
            </Link>

            <Link
              href="/calculators/concrete"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Try Concrete Calculator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
