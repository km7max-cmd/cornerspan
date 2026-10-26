import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Our Construction Calculators",
  alternates: { canonical: "/about" },
  description:
    "Learn about CornerSpan and our practical construction calculators for concrete, brick, steel, paint, tile and other construction estimates.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">

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

      <section id="content-method" className="scroll-mt-28 bg-white px-5 py-10 sm:px-6">
        <div className="mx-auto max-w-4xl space-y-5 text-slate-700 [&_p]:leading-8">
          <h2 className="text-2xl font-bold text-slate-950">How our estimates and articles are prepared</h2>
          <p>CornerSpan explains material quantities for US projects using feet, inches, square feet, cubic yards, pounds and US short tons where appropriate. Our articles show the inputs behind an estimate so you can replace them with your own measurements and supplier information.</p>
          <h3 className="text-xl font-semibold text-slate-950">Worked examples, with assumptions you can check</h3>
          <p>The project examples are illustrative calculations, not reports from completed jobs. Prices labeled as examples are not current supplier quotes. Product coverage, density, cutting allowances and packaging can change an order, so those assumptions are stated alongside the arithmetic. Linked manufacturer and technical resources provide background for the relevant material.</p>
          <h3 className="text-xl font-semibold text-slate-950">How to use a result</h3>
          <p>Keep three quantities separate: the measured area or volume, the estimate after any allowance, and the amount sold in whole bags, boxes, pieces or pallets. Compare quotes on the same basis. These tools estimate quantities; they do not specify structural designs, select code-compliant assemblies or provide a professional site inspection.</p>
          <h3 className="text-xl font-semibold text-slate-950">Content preparation and corrections</h3>
          <p>AI tools assist with drafting and editing some content and code. Formulas, worked examples and source links are shown so readers can inspect the reasoning. An organization byline identifies CornerSpan as the publisher; it does not imply an individual licensed professional reviewed the article.</p>
          <p>If something looks wrong, use the <Link href="/contact" className="text-blue-700 underline">contact page</Link> to send the page URL, units, measurements and the result you expected. For a product-specific discrepancy, include the manufacturer’s coverage or specification. Those details make the issue easier to reproduce.</p>
          <p>Read the <Link href="/blog" className="text-blue-700 underline">worked project examples</Link> or start with the <Link href="/calculators" className="text-blue-700 underline">calculator directory</Link>.</p>
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

    </div>
  );
}

