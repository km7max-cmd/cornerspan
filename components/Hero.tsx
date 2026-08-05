export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f020_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f020_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-300/25 blur-3xl" />

      <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">

        <div className="mx-auto max-w-5xl text-center">

          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-5 py-2 shadow-md backdrop-blur">
            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500"></span>

            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-700">
              Trusted by Contractors & Builders
            </span>
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight text-slate-900 md:text-7xl xl:text-8xl">

            Smart{" "}

            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Construction
            </span>

            <br />

            Calculators for

            <br />

            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Modern Professionals
            </span>

          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Accurate construction calculators for concrete, brick,
            steel, paint, roofing, flooring and tile estimation.
            Built for contractors, engineers and homeowners.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">

            <button className="w-full max-w-xs rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700">
              Explore Calculators
            </button>

            <button className="w-full max-w-xs rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-blue-300 hover:bg-slate-50">
              View Categories
            </button>

          </div>
                    {/* Stats */}
          <div className="mt-20 grid w-full grid-cols-2 gap-6 rounded-[32px] border border-slate-200 bg-white/80 p-8 shadow-2xl backdrop-blur-xl md:grid-cols-4">

            <div className="text-center">
              <h3 className="text-5xl font-black text-blue-600">
                100+
              </h3>
              <p className="mt-3 text-base font-medium text-slate-600">
                Calculators
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-5xl font-black text-blue-600">
                99.9%
              </h3>
              <p className="mt-3 text-base font-medium text-slate-600">
                Accuracy
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-5xl font-black text-blue-600">
                24/7
              </h3>
              <p className="mt-3 text-base font-medium text-slate-600">
                Free Access
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-5xl font-black text-blue-600">
                1M+
              </h3>
              <p className="mt-3 text-base font-medium text-slate-600">
                Calculations
              </p>
            </div>

          </div>

          {/* Floating Cards - Desktop */}
          <div className="pointer-events-none absolute left-8 top-32 hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-xl backdrop-blur lg:block">
            <div className="text-3xl">🧱</div>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              Brick Calculator
            </p>
          </div>

          <div className="pointer-events-none absolute right-8 top-44 hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-xl backdrop-blur lg:block">
            <div className="text-3xl">🏗️</div>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              Concrete Calculator
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-10 left-20 hidden rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-xl backdrop-blur lg:block">
            <div className="text-3xl">🦾</div>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              Steel Calculator
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
