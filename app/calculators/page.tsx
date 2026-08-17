import Link from "next/link";

const categories = [
  {
    name: "Concrete Calculators",
    icon: "🧱",
    description:
      "Calculate concrete quantity, volume and material requirements.",
    href: "/calculators/concrete",
  },
  {
    name: "Brick Calculators",
    icon: "🧱",
    description:
      "Estimate bricks, mortar and material requirements for walls.",
    href: "/calculators/brick",
  },
  {
    name: "Paint Calculators",
    icon: "🎨",
    description:
      "Estimate paint quantity based on wall and surface area.",
    href: "/calculators/paint",
  },
  {
    name: "Steel Calculators",
    icon: "🔩",
    description:
      "Calculate steel quantity, weight and construction requirements.",
    href: "/calculators/steel",
  },
  {
    name: "Tile Calculators",
    icon: "▦",
    description:
      "Calculate tiles required for floors, walls and other surfaces.",
    href: "/calculators/tile",
  },
];

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-12 text-center sm:px-6 md:py-16">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-xs">
            CORNERSPAN CALCULATORS
          </span>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Construction Calculators
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Fast and practical calculators for concrete, brick,
            steel, paint, tiles and more.
          </p>

        </div>
      </section>

      {/* Categories */}
      <section className="px-5 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-6xl">

          <div className="mb-7">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Choose a Calculator Category
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Select a category to find the calculators you need.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {categories.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                    {category.icon}
                  </div>

                  <span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600">
                    →
                  </span>

                </div>

                <h3 className="mt-5 text-xl font-black text-slate-900 group-hover:text-blue-600">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <div className="mt-5 text-sm font-bold text-blue-600">
                  View Calculators →
                </div>

              </Link>
            ))}

          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-5 pb-14 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 py-10 text-center text-white shadow-xl">

          <h2 className="text-2xl font-black sm:text-3xl">
            Need a Quick Calculation?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Choose a category above and start calculating your
            construction requirements in seconds.
          </p>

          <Link
            href="/#calculators"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-md transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Back to Home
          </Link>

        </div>
      </section>

    </main>
  );
}
