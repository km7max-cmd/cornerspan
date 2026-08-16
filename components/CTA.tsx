import Link from "next/link";

export default function CTA() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-7 text-center text-white shadow-lg sm:px-8 sm:py-9">

        <h2 className="text-xl font-black tracking-tight sm:text-2xl">
          Ready to Calculate?
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-blue-100 sm:text-sm">
          Fast and free construction calculators for your next project.
        </p>

        <div className="mt-5 flex flex-col justify-center gap-2.5 sm:flex-row">

          <Link
            href="/#calculators"
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-blue-600 shadow-sm transition hover:bg-slate-100"
          >
            Browse Calculators
          </Link>

          <Link
            href="/calculators/concrete"
            className="rounded-xl border border-white/40 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Concrete Calculator →
          </Link>

        </div>
      </div>
    </section>
  );
}
