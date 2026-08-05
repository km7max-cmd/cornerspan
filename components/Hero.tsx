export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-white">

      {/* Background Effects */}
      <div className="absolute -top-40 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center lg:py-32">

        <span className="rounded-full border border-blue-200 bg-blue-100 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-700 shadow-sm">
          Trusted by Contractors & Builders
        </span>

        <h1 className="mt-8 max-w-6xl text-5xl font-black leading-[1.05] tracking-tight text-slate-900 md:text-7xl xl:text-8xl">
          Smart{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Construction
          </span>
          <br />
          Calculators for
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Modern Professionals
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-600 md:text-xl">
          Accurate construction calculators for concrete, brick, steel,
          paint, roofing, flooring, tiles and many more. Built for
          contractors, engineers and homeowners.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">

          <button className="rounded-2xl bg-blue-600 px-9 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700">
            Explore Calculators
          </button>

          <button className="rounded-2xl border border-slate-300 bg-white px-9 py-4 text-base font-semibold text-slate-700 transition-all duration-300 hover:border-blue-300 hover:bg-slate-100">
            View Categories
          </button>

        </div>
                <div className="mt-20 grid w-full max-w-6xl grid-cols-2 gap-6 rounded-[28px] border border-slate-200 bg-white/80 p-8 shadow-2xl backdrop-blur-xl md:grid-cols-4">

          <div className="text-center">
            <h3 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-5xl font-black text-transparent">
              100+
            </h3>

            <p className="mt-3 text-base font-medium text-slate-600">
              Calculators
            </p>
          </div>

          <div className="text-center">
            <h3 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-5xl font-black text-transparent">
              99.9%
            </h3>

            <p className="mt-3 text-base font-medium text-slate-600">
              Accuracy
            </p>
          </div>

          <div className="text-center">
            <h3 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-5xl font-black text-transparent">
              24/7
            </h3>

            <p className="mt-3 text-base font-medium text-slate-600">
              Free Access
            </p>
          </div>

          <div className="text-center">
            <h3 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-5xl font-black text-transparent">
              1M+
            </h3>

            <p className="mt-3 text-base font-medium text-slate-600">
              Calculations
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
