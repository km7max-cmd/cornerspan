import Link from "next/link";

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 md:py-16">

      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-10 text-center text-white shadow-2xl md:px-12 md:py-14">

        <h2 className="text-3xl font-black md:text-5xl">
          Start Calculating Today
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-blue-100 md:text-lg">
          Free professional construction calculators for contractors,
          engineers, builders and homeowners.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
            href="/#calculators"
            className="w-full max-w-[260px] rounded-2xl bg-white px-7 py-4 text-center font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100 sm:w-auto"
          >
            Browse Calculators
          </Link>

          <Link
            href="/calculators/concrete"
            className="w-full max-w-[260px] rounded-2xl border border-white/40 px-7 py-4 text-center font-semibold text-white transition-all duration-300 hover:bg-white/10 sm:w-auto"
          >
            Try Concrete Calculator
          </Link>

        </div>

      </div>

    </section>
  );
}
