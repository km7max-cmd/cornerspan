import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-6 sm:py-16">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
            DISCLAIMER
          </span>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Important Information
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Please understand the purpose and limitations of CornerSpan
            calculators and information.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold leading-6 text-amber-900">
              CornerSpan calculators provide estimates for general
              informational purposes. Always verify important project
              calculations with appropriate measurements and qualified
              professionals.
            </p>
          </div>

          <div className="mt-8 space-y-8">

            <section>
              <h2 className="text-xl font-black text-slate-900">
                1. General Information
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                The calculators, guides, articles and other information
                available on CornerSpan are provided for general
                informational and estimation purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                2. Calculator Estimates
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Calculator results depend on the values and measurements
                entered by the user. Results should be treated as estimates
                rather than guaranteed quantities or project specifications.
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Actual material requirements can vary because of site
                conditions, material properties, dimensions, wastage,
                construction methods and other project-specific factors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                3. Professional Advice
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                CornerSpan does not provide professional engineering,
                architectural or construction advice. For structural,
                safety-critical or regulated projects, consult a suitably
                qualified professional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                4. Accuracy and Availability
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                We aim to keep CornerSpan useful and accurate, but we do not
                guarantee that all calculations, formulas, content or
                information will always be complete, current or error-free.
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Website availability and individual calculator functionality
                may also change from time to time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                5. User Responsibility
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Users are responsible for checking their measurements,
                selecting appropriate assumptions and verifying results
                before making purchasing, construction or other important
                decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                6. Third-Party Information
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                CornerSpan may reference or link to third-party websites,
                products or services. We do not control and are not
                responsible for third-party content, policies or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                7. Changes to This Disclaimer
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                This Disclaimer may be updated as CornerSpan develops or as
                our services and website content change. Updated information
                will be published on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                8. Contact
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                If you have questions about this Disclaimer, please contact
                CornerSpan through our Contact page.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                Contact CornerSpan →
              </Link>
            </section>

          </div>

        </div>
      </section>

    </main>
  );
}
