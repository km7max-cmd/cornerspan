export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">

      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pt-24 pb-12 text-center lg:pt-32 lg:pb-16">

        {/* Badge */}
        <div className="rounded-full border border-blue-200 bg-white/90 px-5 py-2 shadow-md backdrop-blur">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Trusted by Contractors & Builders
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-8 max-w-4xl text-5xl font-black leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">

          Smart{" "}

          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
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

        {/* CTA */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <button className="rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700">
            Explore Calculators
          </button>

          <button className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100">
            Browse Categories
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
              placeholder="Search construction calculators..."
              className="h-14 w-full rounded-full border-0 bg-transparent pl-14 pr-16 text-base text-slate-700 outline-none placeholder:text-slate-400"
            />

            <button className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white shadow-lg transition hover:bg-blue-700">
              →
            </button>

          </div>

        </div>

        {/* Statistics */}
        <div className="mt-12 grid w-full max-w-5xl grid-cols-2 gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-2xl backdrop-blur md:grid-cols-4">

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

    </section>
  );
}
