import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute right-[-120px] top-32 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-[55px] md:px-6 md:pb-20 md:pt-[70px]">

        {/* Trusted Badge */}
        <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">

          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
            Trusted Construction Tools
          </span>

        </div>

        {/* Main Heading */}
        <div className="mx-auto mt-7 max-w-4xl text-center">

          <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">

            Smart{" "}

            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Construction
            </span>

            <br />

            Calculators

          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:mt-6 md:text-lg md:leading-8">
            Fast, accurate construction calculators for concrete,
            brick, steel, paint, roofing and more.
          </p>

        </div>

        {/* Buttons */}
        <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 md:mt-10 md:gap-4">

          <Link
            href="/#calculators"
            className="flex h-14 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl sm:text-base"
          >
            All Calculators
          </Link>

          <Link
            href="/#categories"
            className="flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-md sm:text-base"
          >
            Categories
          </Link>

        </div>

        {/* Trust Points */}
        <div className="mx-auto mt-9 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500 md:text-sm">

          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-500">✓</span>
            Accurate calculations
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-500">✓</span>
            Free to use
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-500">✓</span>
            Works on mobile
          </div>

        </div>

      </div>
    </section>
  );
}
