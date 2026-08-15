import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-12 md:pt-14 md:pb-16">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-slate-500">
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <span>Concrete Calculator</span>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <span className="text-lg">🏗️</span>
            Construction Calculator
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            Concrete Calculator
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-xl md:leading-8">
            Calculate concrete volume, cement, sand and aggregate
            requirements quickly and accurately for your construction
            project.
          </p>

          {/* Quick Info */}
          <div className="mt-8 flex flex-wrap gap-3">

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="text-xs font-medium text-slate-500">
                Calculator
              </div>
              <div className="mt-1 font-bold text-slate-900">
                Concrete
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="text-xs font-medium text-slate-500">
                Accuracy
              </div>
              <div className="mt-1 font-bold text-blue-600">
                Professional
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="text-xs font-medium text-slate-500">
                Access
              </div>
              <div className="mt-1 font-bold text-slate-900">
                Free
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
