export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-black text-slate-950">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Last updated: August 17, 2026
          </p>

          <div className="mt-10 space-y-8 text-slate-600">
            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Information We Collect
              </h2>
              <p className="mt-3 leading-7">
                CornerSpan is designed to provide construction calculators
                without requiring users to create an account. Information may
                be collected automatically through standard website
                technologies such as cookies, analytics and advertising
                services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Cookies
              </h2>
              <p className="mt-3 leading-7">
                We may use cookies and similar technologies to improve website
                functionality, understand website usage and support
                advertising services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Third-Party Services
              </h2>
              <p className="mt-3 leading-7">
                Third-party providers may collect information according to
                their own privacy policies. These services may include
                analytics, hosting and advertising providers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Changes to This Policy
              </h2>
              <p className="mt-3 leading-7">
                We may update this Privacy Policy when our website, services
                or legal requirements change.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">
                Contact
              </h2>
              <p className="mt-3 leading-7">
                If you have questions about this Privacy Policy, please
                contact us through our Contact page.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
