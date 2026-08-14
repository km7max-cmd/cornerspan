import Hero from "../components/Hero";
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

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50 pt-[130px]">

      {/* ================================
          HERO
      ================================= */}

      <Hero />

      {/* ================================
          POPULAR CATEGORIES
      ================================= */}

      <section
        id="calculators"
        className="bg-white px-6 py-16 md:py-20"
      >
        <div className="mx-auto max-w-7xl">

          {/* Section Header */}

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <span
              className="
                inline-flex
                rounded-full
                bg-blue-50
                px-4
                py-1.5
                text-xs
                font-bold
                uppercase
                tracking-wider
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
                md:text-5xl
              "
            >
              Find the Right Calculator
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-slate-500
                md:text-base
              "
            >
              Choose a category to quickly find the construction
              calculator you need.
            </p>

          </div>

          {/* Category Cards */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
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
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-lg
                  md:p-6
                "
              >

                {/* Icon */}

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-50
                    text-2xl
                    transition
                    duration-300
                    group-hover:scale-105
                    group-hover:bg-blue-50
                  "
                >
                  {category.icon}
                </div>

                {/* Category Name */}

                <h3
                  className="
                    mt-5
                    text-base
                    font-bold
                    text-slate-900
                    transition
                    group-hover:text-blue-600
                    md:text-lg
                  "
                >
                  {category.name}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-1.5
                    text-xs
                    leading-5
                    text-slate-500
                    md:text-sm
                  "
                >
                  {category.description}
                </p>

                {/* Explore */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-xs
                      font-semibold
                      text-blue-600
                    "
                  >
                    Explore
                  </span>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-50
                      text-sm
                      text-slate-500
                      transition
                      group-hover:bg-blue-600
                      group-hover:text-white
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
