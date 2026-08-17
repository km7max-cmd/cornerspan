import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-56 w-56 rounded-full bg-blue-200/25 blur-3xl" />
        <div className="absolute -right-24 top-20 h-56 w-56 rounded-full bg-cyan-200/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10">

        {/* Trusted Badge */}
        <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />

          <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-blue-700 sm:text-[10px]">
            Trusted Construction Tools
          </span>
        </div>

        {/* Heading */}
        <div className="mx-auto mt-4 max-w-3xl text-center sm:mt-5">

          <h1 className="text-3xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-4xl md:text-5xl">

            Smart{" "}

            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Construction
            </span>

            <br />

            Calculators

          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Fast, accurate construction calculators for concrete,
            brick, steel, paint, roofing and more.
          </p>

        </div>

        {/* Buttons */}
        <div className="mx-auto mt-5 grid max-w-md grid-cols-2 gap-2.5 sm:mt-6 sm:gap-3">

          <Link
            href="/calculators"
            className="flex h-11 items-center justify-center rounded-xl bg-blue-600 px-3 text-xs font-bold text-white shadow-md shadow-blue-600/15 transition hover:bg-blue-700 sm:h-12 sm:text-sm"
          >
            All Calculators
          </Link>

          <Link
            href="/#categories"
            className="flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 sm:h-12 sm:text-sm"
          >
            Categories
          </Link>

        </div>

        {/* Trust Points */}
        <div className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-medium text-slate-500 sm:mt-6 sm:text-xs">

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-emerald-500">✓</span>
            Accurate
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-emerald-500">✓</span>
            Free
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-bold text-emerald-500">✓</span>
            Mobile Friendly
          </div>

        </div>

      </div>
    </section>
  );
}
