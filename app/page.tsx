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

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pt-[80px]">

      {/* =========================================
          HERO
      ========================================== */}

      <Hero />

      {/* =========================================
          POPULAR CATEGORIES
      ========================================== */}

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
                border
                border-blue-100
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

          {/* =========================================
              CATEGORY GRID
          ========================================== */}

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
                "
              >

                {/* Top */}

                <div className="flex items-center justify-between">

                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-slate-50
                      text-lg
                      transition-all
                      duration-300
                      group-hover:scale-105
                      group-hover:bg-blue-50
                      sm:h-11
                      sm:w-11
                      sm:text-xl
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
                    "
                  >
                    →
                  </div>

                </div>

                {/* Name */}

                <h3
                  className="
                    mt-3
                    text-sm
                    font-bold
                    text-slate-900
                    transition-colors
                    group-hover:text-blue-600
                    sm:text-base
                  "
                >
                  {category.name}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-1
                    line-clamp-2
                    min-h-[40px]
                    text-[11px]
                    leading-5
                    text-slate-500
                    sm:text-xs
                  "
                >
                  {category.description}
                </p>

                {/* Bottom Link */}

                <div
                  className="
                    mt-3
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

    </main>
  );
}
