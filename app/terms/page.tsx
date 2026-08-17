export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-black text-slate-950">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: August 17, 2026
          </p>

          <div className="mt-10 space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Use of the Website
              </h2>
              <p className="mt-3 leading-7">
                CornerSpan provides online construction calculators and
                informational content for general estimation and reference
                purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Calculator Results
              </h2>
              <p className="mt-3 leading-7">
                Users are responsible for checking calculator inputs and
                verifying results before using them for actual construction,
                purchasing or project decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Acceptable Use
              </h2>
              <p className="mt-3 leading-7">
                You agree not to misuse the website, interfere with its
                operation or attempt to access restricted systems or data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Changes
              </h2>
              <p className="mt-3 leading-7">
                We may modify these Terms & Conditions when necessary.
                Continued use of the website after changes means you accept
                the updated terms.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
