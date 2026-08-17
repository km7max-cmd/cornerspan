import Link from "next/link";

const categories = [
  {
    name: "Concrete",
    icon: "🧱",
    description: "Concrete volume and material estimates.",
    calculators: [
      ["Concrete Calculator", "/calculators/concrete"],
      ["Concrete Slab", "/calculators/concrete-slab"],
      ["Concrete Footing", "/calculators/concrete-footing"],
    ],
  },
  {
    name: "Brick & Block",
    icon: "🧱",
    description: "Estimate bricks, blocks and mortar.",
    calculators: [
      ["Brick Calculator", "/calculators/brick"],
      ["Block Calculator", "/calculators/block"],
      ["Mortar Calculator", "/calculators/mortar"],
    ],
  },
  {
    name: "Steel",
    icon: "🔩",
    description: "Steel quantity and weight calculations.",
    calculators: [
      ["Steel Weight Calculator", "/calculators/steel"],
      ["Rebar Calculator", "/calculators/rebar"],
      ["Steel Plate Calculator", "/calculators/steel-plate"],
    ],
  },
  {
    name: "Tiles",
    icon: "▦",
    description: "Floor and wall tile estimates.",
    calculators: [
      ["Tile Calculator", "/calculators/tile"],
      ["Floor Tile Calculator", "/calculators/floor-tile"],
      ["Grout Calculator", "/calculators/grout"],
    ],
  },
  {
    name: "Paint",
    icon: "🎨",
    description: "Estimate paint quantity for surfaces.",
    calculators: [
      ["Paint Calculator", "/calculators/paint"],
      ["Wall Paint Calculator", "/calculators/wall-paint"],
    ],
  },
  {
    name: "Roofing",
    icon: "🏠",
    description: "Roof area and material estimates.",
    calculators: [
      ["Roofing Calculator", "/calculators/roofing"],
      ["Roof Area Calculator", "/calculators/roof-area"],
    ],
  },
];

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="mx-auto max-w-6xl px-5 py-12 text-center sm:px-6 sm:py-16">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600 shadow-sm">
            CORNERSPAN CALCULATORS
          </span>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Construction Calculators
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Simple tools for estimating materials, quantities and
            measurements for your construction projects.
          </p>

          {/* Search */}
          <div className="mx-auto mt-6 max-w-xl">
            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
              <span className="px-3 text-slate-400">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search calculators..."
                className="h-10 flex-1 bg-transparent px-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />

              <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700">
                Search
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="px-5 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">

          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              All Calculators
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Browse calculators by construction category.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {categories.map((category) => (
              <div
                key={category.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
                    {category.icon}
                  </div>

                  <div>
                    <h3 className="text-base font-black text-slate-900">
                      {category.name}
                    </h3>

                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {category.description}
                    </p>
                  </div>

                </div>

                <div className="mt-4 space-y-1">

                  {category.calculators.map(([name, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <span>{name}</span>
                      <span>→</span>
                    </Link>
                  ))}

                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}
