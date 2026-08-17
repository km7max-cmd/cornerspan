import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-blue-200/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-20 h-64 w-64 rounded-full bg-cyan-200/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 py-12 text-center sm:px-6 sm:py-16">
          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
            ABOUT CORNERSPAN
          </span>

          <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Construction Calculations,
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Made Simple.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            CornerSpan is a practical collection of construction calculators
            built to make everyday material estimation and measurement easier.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              What We Do
            </span>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              Practical tools for real projects
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Construction calculations can often involve measurements,
              formulas and material estimates. CornerSpan brings common
              calculations together in simple, easy-to-use tools.
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Whether you are estimating concrete, bricks, steel, paint,
              tiles or other materials, our goal is to help you get a useful
              estimate without unnecessary complexity.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Our Approach
            </span>

            <h2 className="mt-2 text-2xl font-black">
              Simple first. Useful always.
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-black">
                  01
                </span>

                <div>
                  <h3 className="text-sm font-bold">
                    Easy to understand
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Clear inputs and straightforward results.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-black">
                  02
                </span>

                <div>
                  <h3 className="text-sm font-bold">
                    Built for everyday use
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Designed for contractors, builders and homeowners.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-sm font-black">
                  03
                </span>

                <div>
                  <h3 className="text-sm font-bold">
                    Mobile friendly
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Use CornerSpan wherever your project takes you.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Who Uses CornerSpan */}
      <section className="bg-white px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">

          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Built For
            </span>

            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
              Who Uses CornerSpan?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Useful construction tools for different types of users.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">

            {[
              ["🏗️", "Contractors"],
              ["🔧", "Builders"],
              ["📐", "Engineers"],
              ["🏠", "Homeowners"],
            ].map(([icon, title]) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-5 text-center"
              >
                <div className="text-2xl">{icon}</div>

                <h3 className="mt-2 text-sm font-bold text-slate-800">
                  {title}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Our Goal */}
      <section className="px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center sm:p-9">

          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Our Goal
          </span>

          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            Make construction estimation easier for everyone.
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            We are building CornerSpan as a growing library of practical
            calculators, guides and tools that help people make faster,
            better-informed construction estimates.
          </p>

          <Link
            href="/#calculators"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Explore Calculators →
          </Link>

        </div>
      </section>

    </main>
  );
}
