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
  },
];

const features = [
  {
    icon: "✓",
    title: "Accurate Calculations",
    description:
      "Reliable formulas designed to help you estimate construction materials quickly.",
  },
  {
    icon: "⚡",
    title: "Fast & Simple",
    description:
      "Enter your measurements and get useful results without complicated steps.",
  },
  {
    icon: "📱",
    title: "Works on Mobile",
    description:
      "Use CornerSpan easily on your phone, tablet or desktop.",
  },
  {
    icon: "🆓",
    title: "Free to Use",
    description:
      "Access practical construction calculators without unnecessary barriers.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose a Calculator",
    description:
      "Select the calculator that matches your construction requirement.",
  },
  {
    number: "02",
    title: "Enter Measurements",
    description:
      "Enter your dimensions, quantities or project details.",
  },
  {
    number: "03",
    title: "Get Your Result",
    description:
      "Instantly view the calculated quantity or material estimate.",
  },
];

const guides = [
  {
    title: "Concrete Volume Guide",
    description:
      "Learn how to calculate concrete volume for slabs, beams and other work.",
    href: "/guides/concrete-volume",
  },
  {
    title: "Construction Measurement Guide",
    description:
      "Understand the basic measurements commonly used in construction calculations.",
    href: "/guides/concrete-volume",
  },
  {
    title: "Material Estimation Guide",
    description:
      "Learn the basics of estimating construction materials from project dimensions.",
    href: "/guides/concrete-volume",
  },
];

const faqs = [
  {
    question: "What is CornerSpan?",
    answer:
      "CornerSpan is a collection of practical construction calculators designed to help with material estimation and common construction calculations.",
  },
  {
    question: "Are the calculators free to use?",
    answer:
      "Yes. The calculators are designed to be freely accessible for everyday construction estimation needs.",
  },
  {
    question: "Can I use CornerSpan on my phone?",
    answer:
      "Yes. CornerSpan is designed with a mobile-friendly interface so you can use the calculators from your phone.",
  },
  {
    question: "Which construction calculations are available?",
    answer:
      "CornerSpan includes calculators for concrete, brick, steel, paint, tile, roofing and additional construction-related calculations.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50 px-6 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-6xl text-center">

          <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-blue-100 bg-white px-5 py-2.5 shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700 md:text-sm">
              Trusted Construction Tools
            </span>
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
            Smart{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Construction
            </span>
            <br />
            Calculators
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-xl md:leading-8">
            Fast, accurate construction calculators for concrete, brick,
            steel, paint, roofing and more.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-4">
            <Link
              href="#calculators"
              className="flex min-h-14 items-center justify-center rounded-2xl bg-blue-600 px-5 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              All Calculators
            </Link>

            <Link
              href="#categories"
              className="flex min-h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-base font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
            >
              Categories
            </Link>
          </div>

          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <span>
              <b className="mr-1 text-emerald-500">✓</b>
              Accurate calculations
            </span>

            <span>
              <b className="mr-1 text-emerald-500">✓</b>
              Free to use
            </span>

            <span>
              <b className="mr-1 text-emerald-500">✓</b>
              Works on mobile
            </span>
          </div>

        </div>
      </section>


      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="px-6 pb-14">
        <div className="mx-auto grid max-w-5xl grid-cols-3 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-r border-slate-100 px-3 py-6 text-center last:border-r-0 md:py-8"
            >
              <div className="text-2xl font-black text-blue-600 md:text-4xl">
                {stat.value}
              </div>

              <div className="mt-2 text-xs font-medium text-slate-500 md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}

        </div>
      </section>


      {/* =====================================================
          POPULAR CATEGORIES
      ====================================================== */}

      <section
        id="categories"
        className="bg-white px-6 py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-5 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              Popular Categories
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Construction Calculators
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
              Quickly find the right calculator for your construction project.
            </p>

          </div>

          <div
            id="calculators"
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5"
          >
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

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-blue-600 group-hover:text-white">
                    →
                  </span>

                </div>

                <h3 className="mt-7 text-lg font-bold text-slate-950 transition group-hover:text-blue-600 md:text-xl">
                  {category.name}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
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
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Why CornerSpan
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">
              Built for Real Construction Work
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 md:text-base">
              Simple tools focused on speed, clarity and practical estimation.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-black text-blue-600">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
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
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              How It Works
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">
              Calculate in 3 Simple Steps
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >
                <div className="text-4xl font-black text-blue-600">
                  {step.number}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-950">
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

          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Calculator Guides
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">
              Learn Before You Calculate
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 md:text-base">
              Practical guides to help you understand construction calculations.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            {guides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-sm font-bold text-blue-600">
                  GUIDE
                </div>

                <h3 className="mt-4 text-xl font-bold text-slate-950 group-hover:text-blue-600">
                  {guide.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {guide.description}
                </p>

                <div className="mt-6 text-sm font-semibold text-blue-600">
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
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              FAQ
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <summary className="cursor-pointer list-none pr-8 text-base font-bold text-slate-950">
                  {faq.question}
                </summary>

                <p className="mt-4 text-sm leading-6 text-slate-600">
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
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-blue-600 px-6 py-12 text-center shadow-xl shadow-blue-100 md:px-12">

          <h2 className="text-3xl font-black text-white md:text-5xl">
            Ready to Calculate?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-blue-100 md:text-base">
            Choose a construction calculator and get your result in seconds.
          </p>

          <Link
            href="#calculators"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-7 text-sm font-bold text-blue-600 shadow-sm transition hover:bg-blue-50"
          >
            Explore Calculators →
          </Link>

        </div>
      </section>

    </main>
  );
}
