import Link from "next/link";

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-10 text-center text-white shadow-2xl md:p-16">
        <h2 className="text-4xl font-extrabold md:text-5xl">
          Start Calculating Today
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
          Access professional construction calculators for concrete,
          brick, steel, paint, roofing, flooring, tile and many more.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/#calculators"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-700 transition hover:bg-slate-100"
          >
            Browse Calculators
          </Link>

          <Link
            href="/calculators/concrete"
            className="rounded-xl border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
          >
            Try Concrete Calculator
          </Link>
        </div>
      </div>
    </section>
  );
}
