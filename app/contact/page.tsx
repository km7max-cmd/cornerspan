export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            Contact
          </p>

          <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
            Contact CornerSpan
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Have a question, suggestion, correction or feedback about our
            calculators? We would like to hear from you.
          </p>

          <div className="mt-10 rounded-2xl bg-blue-50 p-6">
            <h2 className="text-xl font-bold text-slate-900">
              Get in Touch
            </h2>

            <p className="mt-3 text-slate-600">
              Email us for questions, feedback, calculator corrections or
              other website-related matters.
            </p>

            <a
              href="mailto:contact@cornerspan.com"
              className="mt-5 inline-block font-bold text-blue-600 hover:text-blue-700"
            >
              contact@cornerspan.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
