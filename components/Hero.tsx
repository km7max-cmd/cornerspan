export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl md:h-[520px] md:w-[520px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="mx-auto flex max-w-4xl flex-col items-center py-14 text-center sm:py-20 lg:py-24">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 shadow-md">

            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-700 sm:text-[10px]">
              Trusted by Contractors &amp; Builders
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-6 max-w-3xl text-[34px] font-black leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">

            Smart{" "}

            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Construction
            </span>

            <br />

            Calculators

            <br />

            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              For Professionals
            </span>

          </h1>

          {/* Description */}
          <p className="mt-5 max-w-sm text-[17px] leading-8 text-slate-600 sm:max-w-md md:max-w-xl md:text-lg">
            Fast, accurate construction calculators for concrete,
            brick, steel, paint, roofing, flooring and tile estimation.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">

            <button className="w-full max-w-[220px] rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-xl transition hover:bg-blue-700">
              Explore
            </button>

            <button className="w-full max-w-[220px] rounded-2xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50">
              Categories
            </button>

          </div>
                    {/* Statistics */}
          <div className="mt-12 w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur md:mt-16 md:max-w-4xl md:p-7">

            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

              <div className="text-center">
                <h3 className="text-3xl font-black text-blue-600 md:text-5xl">
                  100+
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-600 md:text-sm">
                  Calculators
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-black text-blue-600 md:text-5xl">
                  99.9%
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-600 md:text-sm">
                  Accuracy
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-black text-blue-600 md:text-5xl">
                  24/7
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-600 md:text-sm">
                  Free Access
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-black text-blue-600 md:text-5xl">
                  1M+
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-600 md:text-sm">
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
