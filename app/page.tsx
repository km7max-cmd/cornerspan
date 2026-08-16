import Link from "next/link";
import SearchBar from "../components/SearchBar";
import Stats from "../components/Stats";
import Features from "../components/Features";
import PopularCalculators from "../components/PopularCalculators";
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
    question: "Are CornerSpan calculators free to use?",
    answer:
      "Yes. CornerSpan provides construction calculation tools that can be used directly in your browser without installing an app.",
  },
  {
    question: "Can I use CornerSpan on my mobile phone?",
    answer:
      "Yes. The website is designed to work on smartphones, tablets, laptops and desktop computers.",
  },
  {
    question: "What construction calculations can I do?",
    answer:
      "You can calculate concrete, bricks, steel, paint, tiles, roofing materials and other construction quantities.",
  },
  {
    question: "Are the calculator results accurate?",
    answer:
      "CornerSpan uses standard calculation formulas and practical estimation methods. Always verify final quantities against your project specifications.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is required to start using the available calculators.",
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
    title: "Brick Quantity Guide",
    description:
      "Understand how to estimate the number of bricks required for a wall.",
    href: "/calculators/brick",
    icon: "🧱",
  },
  {
    title: "Steel Estimation Guide",
    description:
      "Learn the basics of reinforcement steel quantity estimation.",
    href: "/calculators/steel",
    icon: "🔩",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pt-[80px]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50">

        <div className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:pb-24 md:pt-16">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}

            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Trusted Construction Tools
            </div>

            {/* Heading */}

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-slate-950 md:text-7xl">

              Smart{" "}

              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Construction
              </span>

              <br />

              Calculators

            </h1>

            {/* Description */}

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
              Fast, accurate construction calculators for concrete,
              brick, steel, paint, roofing and more.
            </p>

            {/* Buttons */}

            <div className="mx-auto mt-9 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">

              <Link
                href="#calculators"
                className="rounded-2xl bg-blue-600 px-7 py-5 text-center text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                All Calculators
              </Link>

              <Link
                href="#calculators"
                className="rounded-2xl border border-slate-200 bg-white px-7 py-5 text-center text-base font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600"
              >
                Categories
              </Link>

            </div>

            {/* Benefits */}

            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500">

              <span>
                <span className="mr-2 text-xl text-emerald-500">✓</span>
                Accurate calculations
              </span>

              <span>
                <span className="mr-2 text-xl text-emerald-500">✓</span>
                Free to use
              </span>

              <span>
                <span className="mr-2 text-xl text-emerald-500">✓</span>
                Works on mobile
              </span>

            </div>

          </div>

        </div>
      </section>
      <Stats />     
      <PopularCalculators />      
      <Features />


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="bg-white px-6 py-20 md:py-24">

        <div className="mx-auto max-w-6xl">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex rounded-full bg-blue-50 px-5 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              How It Works
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Calculate in Three Simple Steps
            </h2>

          </div>


          <div className="mt-14 grid gap-8 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Choose a Calculator",
                text: "Select the construction category that matches your project.",
              },
              {
                number: "02",
                title: "Enter Measurements",
                text: "Enter your project dimensions and required inputs.",
              },
              {
                number: "03",
                title: "Get Your Estimate",
                text: "View the calculated quantity and use it for planning.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl border border-slate-200 bg-slate-50 p-7"
              >

                <div className="text-5xl font-black text-blue-100">
                  {step.number}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CALCULATOR GUIDES
      ====================================================== */}

      <section className="bg-slate-50 px-6 py-20 md:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <span className="inline-flex rounded-full bg-blue-50 px-5 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
                Calculator Guides
              </span>

              <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
                Learn Before You Calculate
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
                Simple guides that explain formulas, measurements and
                construction estimation basics.
              </p>

            </div>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {guides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                  {guide.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-blue-600">
                  {guide.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {guide.description}
                </p>

                <div className="mt-6 text-sm font-bold text-blue-600">
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

      <section className="bg-white px-6 py-20 md:py-24">

        <div className="mx-auto max-w-4xl">

          <div className="text-center">

            <span className="inline-flex rounded-full bg-blue-50 px-5 py-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              FAQ
            </span>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              Common questions about CornerSpan construction calculators.
            </p>

          </div>


          <div className="mt-12 space-y-4">

            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm"
              >

                <summary className="cursor-pointer list-none pr-8 text-base font-bold text-slate-900">
                  <div className="flex items-center justify-between gap-4">
                    <span>{faq.question}</span>

                    <span className="text-xl text-slate-400 transition group-open:rotate-45">
                      +
                    </span>
                  </div>
                </summary>

                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-500">
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

      <section className="px-6 py-20 md:py-24">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-14 text-center shadow-xl md:px-12 md:py-16">

          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Ready to Calculate?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-50 md:text-lg">
            Choose a construction calculator and get your estimate in
            minutes.
          </p>

          <Link
            href="#calculators"
            className="mt-8 inline-flex rounded-2xl bg-white px-8 py-4 text-sm font-bold text-blue-600 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50 md:text-base"
          >
            Explore Calculators →
          </Link>

        </div>

      </section>

    </main>
  );
}
