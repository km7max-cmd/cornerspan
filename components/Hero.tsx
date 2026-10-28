
import Link from "next/link";
import { calculators } from "../data/calculators";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#07111f] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-wide text-cyan-200 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.9)]" />
            CONSTRUCTION ESTIMATION TOOLS
          </span>

          <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Free Online{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
              Construction Calculators
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Estimate concrete volume, brick quantities, paint coverage,
            paving materials and landscaping supplies. Choose from {calculators.length} tools,
            enter your measurements, and check material quantities before you buy.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/calculators"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-blue-950/40 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Explore Calculators <span aria-hidden="true" className="ml-2">→</span>
            </Link>

            <Link
              href="/#calculators"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3 font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Browse Popular Tools
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <span className="text-cyan-300">✓</span> Free to use
            </span>
            <span className="flex items-center gap-2">
              <span className="text-cyan-300">✓</span> No account required
            </span>
            <span className="flex items-center gap-2">
              <span className="text-cyan-300">✓</span> Mobile-friendly tools
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-violet-500/20 blur-2xl"
          />

          <div className="relative rounded-3xl border border-white/10 bg-white/[0.07] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Project estimator
                </p>
                <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Start with your measurements
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-2xl text-cyan-200">
                ✳
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Link
                href="/calculators/concrete"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-cyan-300/40 hover:bg-slate-950/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-xl text-blue-200">▧</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">Concrete volume</span>
                  <span className="mt-1 block text-sm text-slate-400">Slabs, footings and more</span>
                </span>
                <span className="text-cyan-300 transition group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href="/calculators/brick"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-cyan-300/40 hover:bg-slate-950/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 text-xl text-orange-200">▦</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">Brick quantity</span>
                  <span className="mt-1 block text-sm text-slate-400">Wall dimensions and estimates</span>
                </span>
                <span className="text-cyan-300 transition group-hover:translate-x-1">→</span>
              </Link>

              <Link
                href="/calculators/paint"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-cyan-300/40 hover:bg-slate-950/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-xl text-violet-200">◒</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-white">Paint calculator</span>
                  <span className="mt-1 block text-sm text-slate-400">Estimate paint for surfaces</span>
                </span>
                <span className="text-cyan-300 transition group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-400">
              Results are estimates. Actual material needs depend on project
              dimensions, product specifications and site conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
