import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            About CornerSpan
          </p>

          <h1 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
            Construction Calculators Made Simple
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            CornerSpan provides practical construction calculators designed
            to make everyday estimation and measurement tasks easier.
          </p>

          <div className="mt-10 space-y-6 text-slate-600">
            <p>
              Our calculators cover common construction needs such as
              concrete, bricks, steel, paint, roofing, tiles and other
              building materials.
            </p>

            <p>
              We focus on simple interfaces, clear results and mobile-friendly
              tools that can be used by contractors, builders, engineers,
              homeowners and DIY users.
            </p>

            <p>
              CornerSpan is continuously expanding its calculator collection
              to make construction estimation faster and more convenient.
            </p>
          </div>

          <Link
            href="/#calculators"
            className="mt-10 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            Browse Calculators
          </Link>
        </div>
      </section>
    </main>
  );
}
