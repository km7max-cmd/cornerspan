import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-6 sm:py-16">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
            TERMS & CONDITIONS
          </span>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Terms of Use
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Please read these terms before using CornerSpan calculators,
            guides and other website content.
          </p>

        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">

          <p className="text-xs text-slate-400">
            Last updated: August 2026
          </p>

          <div className="mt-7 space-y-8">

            <section>
              <h2 className="text-xl font-black text-slate-900">
                1. Acceptance of Terms
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                By accessing or using CornerSpan, you agree to these Terms
                & Conditions. If you do not agree with these terms, please
                do not use the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                2. Use of the Website
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                CornerSpan provides construction calculators, educational
                information, guides and related tools for general
                informational and estimation purposes.
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                You agree to use the website only for lawful purposes and
                in a way that does not interfere with the operation or
                security of the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                3. Calculator Results
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Calculator results are estimates based on the information
                entered by the user and the formulas used by the
                calculator.
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Actual construction requirements may vary because of
                project conditions, material specifications, measurement
                methods, wastage, workmanship and other factors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                4. No Professional Advice
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Information provided by CornerSpan is not a substitute for
                professional engineering, architectural, construction,
                financial or other professional advice.
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                For structural, safety-critical or regulated construction
                decisions, consult a qualified professional.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                5. Accuracy of Information
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                We aim to provide useful and accurate information, but we
                do not guarantee that every calculator, formula, article or
                other piece of content will always be complete, current or
                error-free.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                6. Intellectual Property
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Unless otherwise stated, the website design, branding,
                original text, graphics, calculator interfaces and other
                original content on CornerSpan are owned by or licensed to
                CornerSpan.
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                You may not reproduce, copy, modify, distribute or
                commercially exploit protected website content without
                appropriate permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                7. Third-Party Links
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                CornerSpan may contain links to third-party websites or
                services. We are not responsible for the content,
                availability, security or privacy practices of third-party
                websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                8. Limitation of Liability
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                To the extent permitted by applicable law, CornerSpan is
                not responsible for losses, damages or costs arising from
                reliance on calculator results, website content or
                temporary unavailability of the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                9. Changes to These Terms
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                We may update these Terms & Conditions as the website and
                its services develop. Updated terms will be published on
                this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900">
                10. Contact
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                If you have questions about these Terms & Conditions,
                please visit our Contact page.
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
