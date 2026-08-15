import Link from "next/link";

const categories = [
  {
    name: "Concrete",
    description: "Concrete volume & material estimation",
    icon: "🏗️",
    href: "/calculators/concrete",
  },
  {
    name: "Brick",
    description: "Bricks required for walls",
    icon: "🧱",
    href: "/calculators/brick",
  },
  {
    name: "Steel",
    description: "Steel & reinforcement calculations",
    icon: "🔩",
    href: "/calculators/steel",
  },
  {
    name: "Paint",
    description: "Paint quantity & coverage",
    icon: "🎨",
    href: "/calculators/paint",
  },
  {
    name: "Tile",
    description: "Tile quantity & area estimation",
    icon: "⬛",
    href: "/calculators/tile",
  },
  {
    name: "Roofing",
    description: "Roof area & material estimation",
    icon: "🏠",
    href: "/calculators/roofing",
  },
];

const faqs = [
  {
    question: "Are CornerSpan construction calculators free?",
    answer:
      "Yes. CornerSpan provides free construction calculators that you can use without creating an account.",
  },
  {
    question: "Can I use CornerSpan calculators on my phone?",
    answer:
      "Yes. CornerSpan is designed for mobile phones, tablets and desktop computers, so you can calculate from the job site or at home.",
  },
  {
    question: "How accurate are construction calculator results?",
    answer:
      "CornerSpan uses standard construction formulas and commonly used estimation methods. Results are intended for estimation and should be verified by a qualified professional for critical construction work.",
  },
  {
    question: "What construction calculators are available?",
    answer:
      "CornerSpan currently provides calculators for concrete, bricks, steel, paint, tiles and roofing, with more construction tools planned.",
  },
  {
    question: "How do I calculate concrete volume?",
    answer:
      "For a basic rectangular structure, multiply length × width × depth. Make sure all measurements use the same unit before calculating.",
  },
  {
    question: "How do I calculate steel weight?",
    answer:
      "For standard reinforcement bars, a commonly used estimation formula is Weight (kg) = D² × L ÷ 162, where D is diameter in millimetres and L is length in metres.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. CornerSpan calculators are designed to be accessible without requiring registration or login.",
  },
  {
    question: "Can CornerSpan replace an engineer's calculation?",
    answer:
      "No. CornerSpan is intended for estimation and planning. Structural design, safety-critical quantities and final construction decisions should always be checked by a qualified engineer or construction professional.",
  },
];

const guides = [
  {
    title: "Concrete Volume Guide",
    description:
      "Learn how to calculate concrete volume using length, width and depth.",
    href: "/guides/concrete-volume",
    icon: "🏗️",
  },
  {
    title: "Steel Weight Guide",
    description:
      "Learn the standard formula for calculating steel bar weight.",
    href: "/guides/steel-weight",
    icon: "🔩",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pt-[80px]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50 px-6 pb-16 pt-14 md:pb-20 md:pt-20">

        <div className="absolute inset-0 -z-0 opacity-60">
          <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm md:text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Trusted Construction Tools
          </span>

          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-6xl lg:text-7xl">
            Smart{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Construction
            </span>
            <br />
            Calculators
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-xl">
            Fast, accurate construction calculators for concrete, brick,
            steel, paint, roofing and more.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-4">

            <Link
              href="#calculators"
              className="flex min-h-[62px] items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              All Calculators
            </Link>

            <Link
              href="#categories"
              className="flex min-h-[62px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-base font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
            >
              Categories
            </Link>

          </div>

          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500">

            <span className="flex items-center gap-2">
              <span className="font-bold text-emerald-500">✓</span>
              Accurate calculations
            </span>

            <span className="flex items-center gap-2">
              <span className="font-bold text-emerald-500">✓</span>
              Free to use
            </span>

            <span className="flex items-center gap-2">
              <span className="font-bold text-emerald-500">✓</span>
              Works on mobile
            </span>

          </div>

        </div>
      </section>


      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="bg-white px-6 pb-8">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">

          <div className="grid grid-cols-3">

            <div className="border-r border-slate-100 px-3 py-6 text-center md:py-8">
              <div className="text-3xl font-black text-blue-600 md:text-4xl">
                100+
              </div>
              <div className="mt-2 text-xs font-medium text-slate-500 md:text-sm">
                Calculators
              </div>
            </div>

            <div className="border-r border-slate-100 px-3 py-6 text-center md:py-8">
              <div className="text-3xl font-black text-blue-600 md:text-4xl">
                99.9%
              </div>
              <div className="mt-2 text-xs font-medium text-slate-500 md:text-sm">
                Accuracy
              </div>
            </div>

            <div className="px-3 py-6 text-center md:py-8">
              <div className="text-3xl font-black text-blue-600 md:text-4xl">
                24/7
              </div>
              <div className="mt-2 text-xs font-medium text-slate-500 md:text-sm">
                <span className="font-bold text-emerald-600">Free</span>{" "}
                Access
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          POPULAR CATEGORIES
      ====================================================== */}

      <section
        id="categories"
        className="bg-slate-50 px-6 py-16 md:py-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-600">
              Popular Categories
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Construction Calculators
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 md:text-base">
              Quickly find the right calculator for your construction
              project.
            </p>

          </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">

            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl md:p-6"
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl transition group-hover:bg-blue-50">
                    {category.icon}
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-sm text-slate-400 transition group-hover:bg-blue-600 group-hover:text-white">
                    →
                  </span>

                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900 group-hover:text-blue-600 md:text-xl">
                  {category.name}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-blue-600">
                  View Calculator →
                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CORNERSPAN
      ====================================================== */}

      <section className="bg-white px-6 py-16 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
              Why CornerSpan
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Built for Real Construction Work
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 md:text-base">
              Simple tools designed to help contractors, builders,
              engineers and homeowners calculate faster.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                ⚡
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Fast
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Get construction estimates quickly without complicated
                calculations.
              </p>
            </div>


            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                🎯
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Simple
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Clean interfaces make every calculator easy to understand
                and use.
              </p>
            </div>


            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                📱
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Mobile Ready
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Use CornerSpan comfortably on your phone while working on
                site.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="bg-slate-50 px-6 py-16 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
              How It Works
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Calculate in 3 Simple Steps
            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white">
                1
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Choose a Calculator
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Select the construction category and calculator you need.
              </p>
            </div>


            <div className="rounded-3xl bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white">
                2
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Enter Measurements
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Enter your project dimensions and required values.
              </p>
            </div>


            <div className="rounded-3xl bg-white p-7 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-black text-white">
                3
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Get Your Result
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Instantly see the estimated quantity or material required.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CALCULATOR GUIDES
      ====================================================== */}

      <section className="bg-white px-6 py-16 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-600">
              Calculator Guides
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Learn Before You Calculate
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 md:text-base">
              Practical guides explaining construction formulas and
              estimation methods.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2">

            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lg md:p-7"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                    {guide.icon}
                  </div>

                  <span className="text-xl text-slate-400 transition group-hover:text-blue-600">
                    →
                  </span>

                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-blue-600">
                  {guide.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {guide.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-blue-600">
                  Read Guide →
                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="bg-slate-50 px-6 py-16 md:py-20">

        <div className="mx-auto max-w-4xl">

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
              FAQ
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 md:text-base">
              Answers to common questions about CornerSpan calculators.
            </p>

          </div>


          <div className="space-y-3">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 open:border-blue-200 open:shadow-md"
              >

                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-sm font-bold text-slate-900 md:px-6 md:py-6 md:text-base">

                  <span>{faq.question}</span>

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-500 transition group-open:bg-blue-600 group-open:text-white">

                    <span className="group-open:hidden">
                      +
                    </span>

                    <span className="hidden group-open:inline">
                      −
                    </span>

                  </span>

                </summary>


                <div className="border-t border-slate-100 px-5 pb-5 pt-4 md:px-6 md:pb-6">

                  <p className="text-sm leading-7 text-slate-600 md:text-base">
                    {faq.answer}
                  </p>

                </div>

              </details>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="px-6 py-16 md:py-20">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-blue-600 px-6 py-12 text-center text-white shadow-xl md:px-12 md:py-16">

          <h2 className="text-3xl font-black tracking-tight md:text-5xl">
            Ready to Calculate?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100 md:text-base">
            Use CornerSpan's construction calculators to estimate materials
            quickly and make your project planning easier.
          </p>

          <Link
            href="#categories"
            className="mt-7 inline-flex rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-600 shadow-sm transition hover:bg-blue-50"
          >
            Explore Calculators →
          </Link>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-white px-6 py-12">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-3">

            {/* Brand */}
            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white">
                  C
                </div>

                <div>
                  <div className="text-xl font-black text-slate-900">
                    Corner<span className="text-blue-600">Span</span>
                  </div>

                  <div className="text-[10px] font-medium tracking-[0.25em] text-slate-400">
                    CONSTRUCTION CALCULATORS
                  </div>
                </div>

              </div>

              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
                Simple and practical construction calculators for contractors,
                builders, engineers and homeowners.
              </p>

            </div>


            {/* Calculators */}
            <div>

              <h3 className="text-sm font-bold text-slate-900">
                Calculators
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-y-3 text-sm text-slate-500">

                <Link
                  href="/calculators/concrete"
                  className="hover:text-blue-600"
                >
                  Concrete
                </Link>

                <Link
                  href="/calculators/brick"
                  className="hover:text-blue-600"
                >
                  Brick
                </Link>

                <Link
                  href="/calculators/steel"
                  className="hover:text-blue-600"
                >
                  Steel
                </Link>


    </main>
  );
}
