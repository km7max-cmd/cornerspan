import Link from "next/link";
import Hero from "../components/Hero";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pt-[80px]">

      {/* =========================================
          HERO
      ========================================== */}

      <Hero />

      {/* =========================================
          STATS
      ========================================== */}

      <section className="bg-slate-50 px-4 py-8 md:px-6 md:py-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {stats.map((item) => (
              <div
                key={item.label}
                className="border-r border-slate-100 px-2 py-5 text-center last:border-r-0 sm:px-5 sm:py-7"
              >

                <div className="text-2xl font-black tracking-tight text-blue-600 sm:text-4xl">
                  {item.value}
                </div>

                <div className="mt-1 text-[10px] font-medium text-slate-500 sm:text-sm">
                  {item.label === "Free Access" ? (
                    <>
                      <span className="font-bold text-emerald-600">
                        Free
                      </span>{" "}
                      Access
                    </>
                  ) : (
                    item.label
                  )}
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =========================================
    POPULAR CATEGORIES
========================================= */}

<section
  id="calculators"
  className="bg-slate-50 px-4 py-14 sm:px-6 md:py-20"
>
  <div className="mx-auto max-w-7xl">

    {/* Section Heading */}
    <div className="mx-auto mb-10 max-w-2xl text-center">

      <span
        className="
          inline-flex
          items-center
          rounded-full
          border border-blue-100
          bg-blue-50
          px-4
          py-1.5
          text-xs
          font-bold
          uppercase
          tracking-widest
          text-blue-600
        "
      >
        Popular Categories
      </span>

      <h2
        className="
          mt-4
          text-3xl
          font-black
          tracking-tight
          text-slate-900
          sm:text-4xl
          md:text-5xl
        "
      >
        Construction Calculators
      </h2>

      <p
        className="
          mx-auto
          mt-3
          max-w-xl
          text-sm
          leading-6
          text-slate-500
          sm:text-base
        "
      >
        Quickly find the right calculator for your
        construction project.
      </p>

    </div>

    {/* Category Grid */}
    <div
      className="
        grid
        grid-cols-2
        gap-3
        sm:gap-4
        md:grid-cols-3
        lg:gap-5
      "
    >

      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-blue-200
            hover:shadow-lg
            sm:p-5
            md:p-6
          "
        >

          {/* Top */}
          <div className="flex items-start justify-between">

            {/* Icon */}
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-slate-50
                text-xl
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:bg-blue-50
                sm:h-12
                sm:w-12
                sm:text-2xl
              "
            >
              {category.icon}
            </div>

            {/* Arrow */}
            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-slate-50
                text-xs
                text-slate-400
                transition-all
                duration-300
                group-hover:bg-blue-600
                group-hover:text-white
                sm:h-8
                sm:w-8
              "
            >
              →
            </div>

          </div>

          {/* Name */}
          <h3
            className="
              mt-4
              text-sm
              font-bold
              text-slate-900
              transition-colors
              group-hover:text-blue-600
              sm:text-base
              md:text-lg
            "
          >
            {category.name}
          </h3>

          {/* Description */}
          <p
            className="
              mt-1.5
              line-clamp-2
              text-[11px]
              leading-5
              text-slate-500
              sm:text-xs
              md:text-sm
            "
          >
            {category.description}
          </p>

          {/* Bottom Link */}
          <div
            className="
              mt-4
              flex
              items-center
              text-[11px]
              font-semibold
              text-blue-600
              sm:text-xs
            "
          >
            View Calculator
            <span
              className="
                ml-1
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </div>

        </Link>
      ))}

    </div>

  </div>
</section>

      {/* =========================================
          WHY CHOOSE CORNERSPAN
      ========================================== */}

      <section className="bg-slate-50 px-5 py-16 md:px-6 md:py-20">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 shadow-sm">
              Why CornerSpan
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
              Built for Real Construction Work
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 md:text-base">
              Simple tools designed to make everyday construction
              calculations faster and easier.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                ⚡
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Fast Calculations
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Get construction estimates quickly without complicated
                calculations.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                🎯
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Professional Accuracy
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Practical calculation tools built for contractors,
                builders and homeowners.
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl">
                🆓
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Always Free
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Access construction calculators anytime from your
                phone, tablet or computer.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          FINAL CTA
      ========================================== */}

      <section className="bg-white px-5 py-16 md:px-6 md:py-20">

        <div className="mx-auto max-w-5xl rounded-3xl bg-blue-600 px-6 py-12 text-center shadow-xl shadow-blue-600/20 md:px-10 md:py-16">

          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            Start Calculating Smarter
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">
            Choose from our growing collection of construction
            calculators and get accurate estimates in seconds.
          </p>

          <Link
            href="/#calculators"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-white px-7 text-sm font-bold text-blue-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            View All Calculators
          </Link>

        </div>

      </section>

    </main>
  );
}
