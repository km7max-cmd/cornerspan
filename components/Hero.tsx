
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -left-20 top-24 h-56 w-56 rounded-full bg-sky-100/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm">
            Construction Material Estimation Tools
          </span>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Free Construction Calculators
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Estimate construction materials for concrete slabs, brick walls,
            painting, paving and landscaping projects. Enter your project
            measurements to calculate quantities and plan your material needs
            before purchasing supplies.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators"
              className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
            >
              All Calculators
            </Link>

            <Link
              href="/#calculators"
              className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 sm:w-auto"
            >
              Browse Calculators
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-blue-600"
              />
              Material Estimates
            </span>

            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-blue-600"
              />
              Practical Project Planning
            </span>

            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-blue-600"
              />
              Mobile Friendly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
