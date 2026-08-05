export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 text-center">
      <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
        #1 Construction Estimation Platform
      </span>

      <h1 className="mx-auto mt-8 max-w-5xl text-5xl font-extrabold leading-tight text-slate-900 md:text-7xl">
        Construction
        <span className="text-blue-600"> Calculators</span>
        <br />
        Built for Accuracy
      </h1>

      <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">
        Professional estimating tools for Concrete, Brick, Steel,
        Paint, Roofing, Flooring, Tile and 100+ construction
        calculators.
      </p>

      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700">
          Explore Calculators
        </button>

        <button className="rounded-xl border border-slate-300 px-8 py-4 font-semibold transition hover:bg-slate-100">
          View Categories
        </button>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
        <div>
          <h3 className="text-3xl font-bold text-blue-600">100+</h3>
          <p className="text-slate-600">Calculators</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-blue-600">99%</h3>
          <p className="text-slate-600">Accuracy</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
          <p className="text-slate-600">Free Access</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-blue-600">Fast</h3>
          <p className="text-slate-600">Results</p>
        </div>
      </div>
    </section>
  );
}
