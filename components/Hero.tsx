export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center">
      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
        Trusted by USA Contractors
      </span>

      <h1 className="mt-6 text-5xl font-extrabold text-slate-900">
        Professional Construction Calculators
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
        Fast, accurate estimating tools for Concrete, Paint, Roofing,
        Flooring and more.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <button className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Get Started
        </button>

        <button className="rounded-xl border px-6 py-3 font-semibold hover:bg-slate-100">
          Learn More
        </button>
      </div>
    </section>
  );
}
