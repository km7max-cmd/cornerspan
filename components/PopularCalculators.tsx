
import Link from "next/link";

const calculators = [
  {
    title: "Concrete Calculator",
    description: "Estimate concrete volume for slabs and other projects.",
    href: "/calculators/concrete",
    icon: "▧",
    color: "from-blue-500/15 to-cyan-400/5",
    accent: "text-blue-700",
  },
  {
    title: "Gravel Calculator",
    description: "Estimate gravel volume, weight and material needs.",
    href: "/calculators/gravel",
    icon: "◈",
    color: "from-emerald-500/15 to-green-400/5",
    accent: "text-emerald-700",
  },
  {
    title: "Asphalt Calculator",
    description: "Estimate asphalt quantities for paving projects.",
    href: "/calculators/asphalt",
    icon: "▤",
    color: "from-slate-500/15 to-slate-300/5",
    accent: "text-slate-700",
  },
  {
    title: "Paver Calculator",
    description: "Calculate paver quantities for outdoor surfaces.",
    href: "/calculators/paver",
    icon: "▦",
    color: "from-violet-500/15 to-purple-400/5",
    accent: "text-violet-700",
  },
  {
    title: "Tile Calculator",
    description: "Estimate the tiles needed for a floor or wall.",
    href: "/calculators/tile",
    icon: "▥",
    color: "from-cyan-500/15 to-sky-400/5",
    accent: "text-cyan-700",
  },
  {
    title: "Paint Calculator",
    description: "Estimate paint quantity for walls and ceilings.",
    href: "/calculators/paint",
    icon: "◒",
    color: "from-orange-500/15 to-amber-400/5",
    accent: "text-orange-700",
  },
  {
    title: "Topsoil Calculator",
    description: "Estimate topsoil volume for garden and landscape areas.",
    href: "/calculators/topsoil",
    icon: "♧",
    color: "from-amber-500/15 to-yellow-400/5",
    accent: "text-amber-700",
  },
  {
    title: "Sod & Turf Calculator",
    description: "Estimate turf area and material quantities for lawns.",
    href: "/calculators/sod-turf",
    icon: "❋",
    color: "from-green-500/15 to-lime-400/5",
    accent: "text-green-700",
  },
];

export default function PopularCalculators() {
  return (
    <section
      id="calculators"
      aria-labelledby="homepage-calculators-heading"
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-6 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-20 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
            Explore the toolkit
          </span>

          <h2
            id="homepage-calculators-heading"
            className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
          >
            Construction Calculators for Real Projects
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Choose a calculator to estimate material quantities for building,
            renovation and landscaping. Enter the measurements requested by
            each tool and review the units before using the result.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:min-h-[235px] sm:p-5"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${calculator.color}`}
              />

              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl ${calculator.color} ${calculator.accent}`}
              >
                {calculator.icon}
              </span>

              <h3 className="mt-4 text-sm font-bold leading-5 text-slate-900 group-hover:text-blue-700 sm:text-base">
                {calculator.title}
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                {calculator.description}
              </p>

              <span className="mt-auto inline-flex items-center pt-4 text-xs font-bold text-blue-700 sm:text-sm">
                Open calculator
                <span
                  aria-hidden="true"
                  className="ml-2 transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/calculators"
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            View All Construction Calculators
            <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
