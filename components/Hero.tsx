export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b810_1px,transparent_1px),linear-gradient(to_bottom,#94a3b810_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl md:h-[520px] md:w-[520px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="mx-auto flex max-w-5xl flex-col items-center py-16 text-center sm:py-20 lg:py-28">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 shadow-md backdrop-blur">

            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700">
              Trusted by Contractors & Builders
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-8 max-w-5xl text-[42px] font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">

            Smart{" "}

            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Construction
            </span>

            <br />

            Calculators

            <br />

            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Built for Professionals
            </span>

          </h1>

          {/* Description */}
          <p className="mt-7 max-w-lg text-base leading-8 text-slate-600 md:text-lg">
            Professional online calculators for concrete, brick,
            steel, paint, roofing, flooring and tile estimation with
            fast and accurate results.
          </p>

          {/* CTA */}
          <div className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">

            <button className="w-full max-w-[280px] rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700">
              Explore Calculators
            </button>

            <button className="w-full max-w-[280px] rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-50">
              Browse Categories
            </button>

          </div>
                    {/* Statistics */}
          <div className="mt-16 w-full max-w-4xl rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-2xl backdrop-blur sm:mt-20 sm:p-8">

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600 md:text-5xl">
                  100+
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Calculators
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600 md:text-5xl">
                  99.9%
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Accuracy
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600 md:text-5xl">
                  24/7
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Free Access
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600 md:text-5xl">
                  1M+
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-600">
                  Calculations
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
