export default function Hero() {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-8 text-white shadow-xl">

      <span className="inline-flex rounded-full bg-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wider">
        Free Construction Tool
      </span>

      <h1 className="mt-5 text-4xl font-black leading-tight md:text-5xl">
        Concrete Calculator
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
        Calculate concrete volume, cement bags, dry volume and estimated
        material requirements for slabs, beams, columns and footings.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">

        <div className="rounded-2xl bg-white/15 px-5 py-3 backdrop-blur">
          <p className="text-2xl font-bold">100%</p>
          <span className="text-sm text-blue-100">
            Accurate Formula
          </span>
        </div>

        <div className="rounded-2xl bg-white/15 px-5 py-3 backdrop-blur">
          <p className="text-2xl font-bold">Free</p>
          <span className="text-sm text-blue-100">
            Forever
          </span>
        </div>

        <div className="rounded-2xl bg-white/15 px-5 py-3 backdrop-blur">
          <p className="text-2xl font-bold">24/7</p>
          <span className="text-sm text-blue-100">
            Available
          </span>
        </div>

      </div>

    </section>
  );
}
