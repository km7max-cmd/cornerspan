export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">
      {/* Background Blur */}
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl"></div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

        <span className="rounded-full border border-blue-200 bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 shadow-sm">
          🚀 Trusted by Contractors & Builders
        </span>

        <h1 className="mt-8 max-w-5xl text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-7xl">
          Smart
          <span className="text-blue-600"> Construction</span>
          <br />
          Calculators for
          <span className="text-blue-600"> Professionals</span>
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
          Estimate concrete, bricks, steel, paint, roofing, flooring,
          tiles and much more using accurate construction calculators.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700">
            Explore Calculators
          </button>

          <button className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100">
            View Categories
          </button>
        </div>
                <div className="mt-16 grid w-full max-w-5xl grid-cols-2 gap-6 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl backdrop-blur md:grid-cols-4">

          <div>
            <h3 className="text-4xl font-black text-blue-600">
              100+
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Calculators
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-blue-600">
              99.9%
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Accuracy
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-blue-600">
              24/7
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Free Access
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-black text-blue-600">
              1M+
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Calculations
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
