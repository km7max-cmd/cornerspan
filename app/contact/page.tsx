import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-6 sm:py-16">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
            CONTACT CORNERSPAN
          </span>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            We’re Here to Help
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Have a question, suggestion or found something that needs
            attention? Let us know.
          </p>

        </div>
      </section>

      {/* Contact Content */}
      <section className="px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">

          {/* Contact Info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Get in Touch
            </span>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              How can we help?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              We welcome feedback about our calculators, suggestions for new
              tools, and reports about calculation or website issues.
            </p>

            <div className="mt-7 space-y-4">

              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-lg">
                  ✉️
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Email
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    For general questions and feedback
                  </p>

                  <a
                    href="mailto:contact@cornerspan.com"
                    className="mt-1 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    contact@cornerspan.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-lg">
                  💡
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Suggestions
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Tell us which calculator or feature you would like to
                    see next.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-lg">
                  ⚠️
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Report an Issue
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Found an incorrect result or a problem with a calculator?
                    Please let us know.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Message Card */}
          <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">

            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
              Before You Contact Us
            </span>

            <h2 className="mt-2 text-2xl font-black">
              A quick note
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              CornerSpan calculators are intended to provide estimates and
              general information. Actual material requirements can vary
              depending on project conditions, measurements and construction
              practices.
            </p>

            <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs leading-5 text-slate-400">
                When reporting a calculator issue, please mention the
                calculator name and explain what result you expected. This
                helps us investigate the issue faster.
              </p>
            </div>

            <Link
              href="/#calculators"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Browse Calculators →
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}
