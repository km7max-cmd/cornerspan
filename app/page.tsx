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

const stats = [
  {
    value: "100+",
    label: "Calculators",
  },
  {
    value: "99.9%",
    label: "Accuracy",
  },
  {
    value: "24/7",
    label: "Free Access",
    highlight: true,
  },
];

const features = [
  {
    icon: "✓",
    title: "Accurate Results",
    description:
      "Reliable calculations designed for practical construction work.",
  },
  {
    icon: "⚡",
    title: "Fast & Simple",
    description:
      "Enter your measurements and get results without complicated steps.",
  },
  {
    icon: "📱",
    title: "Works on Mobile",
    description:
      "Use CornerSpan easily on phones, tablets and desktop devices.",
  },
  {
    icon: "🆓",
    title: "Free to Use",
    description:
      "Access construction calculators without creating an account.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose a Calculator",
    description:
      "Select the construction category and calculator you need.",
  },
  {
    number: "02",
    title: "Enter Measurements",
    description:
      "Enter your project dimensions and required measurements.",
  },
  {
    number: "03",
    title: "Get Your Result",
    description:
      "Instantly get a clear calculation for your construction project.",
  },
];

const guides = [
  {
    title: "How to Calculate Concrete Volume",
    description:
      "Learn the simple formula used to calculate concrete volume for slabs, beams and other construction work.",
    href: "/guides/concrete-volume",
  },
  {
    title: "How Many Bricks Do You Need?",
    description:
      "Understand how wall area, brick size and mortar joints affect the total number of bricks required.",
    href: "/guides/brick-calculation",
  },
  {
    title: "How to Calculate Steel Weight",
    description:
      "Learn how to estimate reinforcement steel weight using bar diameter and length.",
    href: "/guides/steel-weight",
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

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pt-[80px]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50 px-6 pb-16 pt-16 md:pb-20 md:pt-20">

        <div className="mx-auto max-w-5xl text-center">

          {/* Trust Badge */}

          <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm md:text-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Trusted Construction Tools
          </div>

          {/* Heading */}

          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 md:text-6xl">
            Smart{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Construction
            </span>
            <br />
            Calculators
          </h1>

          {/* Description */}

          <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-600 md:text-xl md:leading-8">
            Fast, accurate construction calculators for concrete, brick,
            steel, paint, roofing and more.
          </p>

          {/* Buttons */}

          <div className="mx-auto mt-9 grid max-w-2xl grid-cols-2 gap-4">

            <Link
              href="#calculators"
              className="flex min-h-14 items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 md:text-lg"
            >
              All Calculators
            </Link>

            <Link
              href="#calculators"
              className="flex min-h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-base font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 md:text-lg"
            >
              Categories
            </Link>

          </div>

          {/* Trust Points */}

          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500 md:text-base">

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

      <section className="px-6 py-8 md:py-10">

        <div className="mx-auto grid max-w-5xl grid-cols-3 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-3 py-6 text-center md:px-6 md:py-8 ${
                index !== stats.length - 1
                  ? "border-r border-slate-200"
                  : ""
              }`}
            >

              <div className="text-3xl font-black tracking-tight text-blue-600 md:text-4xl">
                {stat.value}
              </div>

              <div className="mt-2 text-xs font-medium text-slate-500 md:text-sm">
                {stat.highlight ? (
                  <>
                    <span className="font-bold text-emerald-600">
                      Free
                    </span>{" "}
                    Access
                  </>
                ) : (
                  stat.label
                )}
              </div>

            </div>
          ))}

        </div>

      </section>


      {/* =====================================================
          POPULAR CATEGORIES
      ====================================================== */}

      <section
        id="calculators"
        className="bg-white px-6 py-16 md:py-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-600 md:text-sm">
              Popular Categories
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Construction Calculators
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
              Quickly find the right calculator for your construction
              project.
            </p>

          </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">

            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl md:p-7"
              >

                <div className="flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl transition group-hover:bg-blue-50">
                    {category.icon}
                  </div>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-sm text-slate-400 transition group-hover:bg-blue-600 group-hover:text-white">
                    →
                  </span>

                </div>

                <h3 className="mt-7 text-lg font-bold text-slate-900 transition group-hover:text-blue-600 md:text-xl">
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

      <section className="bg-slate-50 px-6 py-16 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
              Why CornerSpan
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Built for Real Construction Work
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 md:text-base">
              Simple tools that help builders, contractors, engineers and
              homeowners make faster estimates.
            </p>

          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-600">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="bg-white px-6 py-16 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
              How It Works
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Calculate in Three Simple Steps
            </h2>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >

                <span className="text-4xl font-black text-blue-100">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CALCULATOR GUIDES
      ====================================================== */}

      <section className="bg-slate-50 px-6 py-16 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
                Construction Guides
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                Learn Before You Calculate
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Simple guides explaining common construction calculations
                and estimation methods.
              </p>

            </div>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {guides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  →
                </div>

                <h3 className="mt-5 text-lg font-bold leading-7 text-slate-900 group-hover:text-blue-600">
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

      <section className="bg-white px-6 py-16 md:py-20">

        <div className="mx-auto max-w-4xl">

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.15em] text-blue-600">
              FAQ
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Frequently Asked Questions
            </h2>

          </div>


          <div className="space-y-4">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
              >

                <summary className="cursor-pointer list-none pr-6 text-base font-bold text-slate-900 marker:hidden">
                  {faq.question}
                </summary>

                <p className="mt-3 border-t border-slate-200 pt-3 text-sm leading-6 text-slate-500">
                  {faq.answer}
                </p>

              </details>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="px-6 py-16 md:py-20">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-14 text-center shadow-xl md:px-12">

          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Ready to Calculate?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">
            Choose a construction calculator and get your estimate quickly.
          </p>

          <Link
            href="#calculators"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-7 text-sm font-bold text-blue-600 shadow-sm transition hover:bg-blue-50 md:text-base"
          >
            Explore Calculators →
          </Link>

        </div>

      </section>

    </main>
  );
}
