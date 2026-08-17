export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Important Information
          </p>

          <h1 className="mt-3 text-4xl font-black text-slate-950">
            Disclaimer
          </h1>

          <div className="mt-10 space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                General Information
              </h2>
              <p className="mt-3 leading-7">
                The information and calculator results provided by CornerSpan
                are intended for general informational and estimation
                purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Construction Decisions
              </h2>
              <p className="mt-3 leading-7">
                Calculator results should not be treated as a substitute for
                professional engineering, architectural or construction
                advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Accuracy
              </h2>
              <p className="mt-3 leading-7">
                Although we aim to provide useful and accurate calculators,
                CornerSpan does not guarantee that every result will be
                suitable for every project or situation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                User Responsibility
              </h2>
              <p className="mt-3 leading-7">
                Always verify measurements, material requirements, local
                building requirements and project-specific calculations with
                an appropriately qualified professional when necessary.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
