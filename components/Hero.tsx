export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e110_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e110_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl md:h-[500px] md:w-[500px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="mx-auto flex max-w-4xl flex-col items-center py-14 text-center md:py-20 lg:py-24">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 shadow-lg">

            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-700 sm:text-[10px]">
              Trusted by Contractors & Builders
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-7 max-w-4xl text-[40px] font-black leading-none tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">

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
          <p className="mt-6 max-w-md text-base leading-8 text-slate-600 md:max-w-xl md:text-lg">
            Fast, accurate construction calculators for concrete,
            brick, steel, paint, roofing and tile estimation.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">

            <button className="w-full max-w-[240px] rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-xl transition hover:bg-blue-700">
              Explore
            </button>

            <button className="w-full max-w-[240px] rounded-2xl border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:bg-slate-50">
              Categories
            </button>

          </div>
                    {/* Stats */}
          <div className="mt-14 w-full max-w-3xl rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur md:mt-16 md:max-w-4xl md:p-7">

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
