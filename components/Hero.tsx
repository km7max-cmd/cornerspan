export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-white">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#94a3b808_1px,transparent_1px),linear-gradient(to_bottom,#94a3b808_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="mx-auto flex max-w-4xl flex-col items-center py-16 text-center sm:py-20 lg:py-28">

          {/* Badge */}
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 shadow-lg backdrop-blur">

            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-700 sm:text-[10px]">
              Trusted by Contractors &amp; Builders
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">

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

          {/* Description */}
          <p className="mt-6 max-w-xl px-2 text-base leading-8 text-slate-600 sm:text-lg">
            Professional construction calculators for concrete, brick,
            steel, paint, roofing, flooring and tile estimation with
            accurate results.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">

            <button className="w-full max-w-[320px] rounded-2xl bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700">
              Explore Calculators
            </button>

            <button className="w-full max-w-[320px] rounded-2xl border border-slate-300 bg-white px-8 py-4 text-base font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50">
              View Categories
            </button>

          </div>
                    {/* Statistics */}
          <div className="mt-14 w-full max-w-5xl rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-2xl backdrop-blur sm:mt-16 sm:p-8">

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600 lg:text-5xl">
                  100+
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Calculators
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600 lg:text-5xl">
                  99.9%
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Accuracy
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600 lg:text-5xl">
                  24/7
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Free Access
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600 lg:text-5xl">
                  1M+
                </h3>
                <p className="mt-2 text-sm text-slate-600">
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
