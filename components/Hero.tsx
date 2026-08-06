export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="mx-auto flex max-w-5xl flex-col items-center pt-14 pb-12 text-center md:pt-20 lg:pt-24">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-blue-200 bg-white/90 px-5 py-2 shadow-lg backdrop-blur">

            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>

            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-blue-700">
              Trusted by Contractors & Builders
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-8 max-w-4xl text-[42px] font-black leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">

            Smart{" "}

            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Construction
            </span>

            <br />

            Calculators

          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Fast, accurate construction calculators for concrete,
            brick, steel, paint, roofing and more.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex w-full max-w-md gap-4">

            <button className="flex-1 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700">
              Explore
            </button>

            <button className="flex-1 rounded-2xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100">
              Categories
            </button>

          </div>
                    {/* Search */}
          <div className="mt-12 w-full max-w-3xl">

            <div className="relative rounded-full border border-slate-200 bg-white p-2 shadow-2xl">

              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search calculators..."
                className="h-14 w-full rounded-full bg-transparent pl-14 pr-20 text-base text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-xl text-white shadow-lg transition hover:scale-105 hover:bg-blue-700">
                →
              </button>

            </div>

          </div>

          {/* Statistics */}
          <div className="mt-12 w-full max-w-5xl rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-2xl backdrop-blur">

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600">
                  100+
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Calculators
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600">
                  99.9%
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Accuracy
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600">
                  24/7
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Free Access
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-black text-blue-600">
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
