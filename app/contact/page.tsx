import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-14 text-center sm:px-6 md:py-20">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-xs">
            GET IN TOUCH
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            Contact Corner
            <span className="text-blue-600">Span</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Have a question, suggestion or feedback about our construction
            calculators? We would love to hear from you.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">

          {/* Left */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">

            <h2 className="text-2xl font-black text-slate-900">
              How can we help?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Whether you found an issue with a calculator or have an idea
              for a new tool, your feedback helps us improve CornerSpan.
            </p>

            <div className="mt-8 space-y-5">

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                  💬
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Questions
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Need help understanding a calculation?
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                  💡
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Suggestions
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Suggest a calculator or feature you would like to see.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">
                  ⚠️
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    Report an Issue
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Found an error or something that does not work correctly?
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">

            <h2 className="text-2xl font-black text-slate-900">
              Send us a message
            </h2>

            <form className="mt-6 space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>

                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <button
                type="button"
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Send Message
              </button>

            </form>

            <p className="mt-4 text-center text-xs text-slate-400">
              We appreciate your feedback and suggestions.
            </p>

          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-14 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-10 text-center text-white shadow-xl">

          <h2 className="text-2xl font-black sm:text-3xl">
            Looking for a Calculator?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100">
            Explore our construction calculators and get your estimate
            quickly.
          </p>

          <Link
            href="/calculators"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-md transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Explore Calculators
          </Link>

        </div>
      </section>

    </main>
  );
}
