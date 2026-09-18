import Link from "next/link";

type IconProps = {
  className?: string;
};

function CalculatorIcon({
  type,
  className = "h-7 w-7",
}: IconProps & { type: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (type) {
    case "concrete":
      return (
        <svg {...common}>
          <path d="M5 7h14l-1.3 11H6.3L5 7Z" />
          <path d="M7 7V4h10v3" />
          <path d="M8 11h8" />
          <path d="M8.5 15h7" />
        </svg>
      );

    case "gravel":
      return (
        <svg {...common}>
          <circle cx="7" cy="8" r="1.6" />
          <circle cx="13" cy="6" r="1.3" />
          <circle cx="18" cy="9" r="1.5" />
          <circle cx="9" cy="14" r="1.5" />
          <circle cx="16" cy="16" r="1.7" />
          <path d="M4 19h16" />
        </svg>
      );

    case "asphalt":
      return (
        <svg {...common}>
          <path d="M4 19 9 5h6l5 14" />
          <path d="M12 7v3" />
          <path d="M12 13v3" />
        </svg>
      );

    case "paver":
      return (
        <svg {...common}>
          <path d="M4 7h7v5H4z" />
          <path d="M13 7h7v5h-7z" />
          <path d="M4 14h7v5H4z" />
          <path d="M13 14h7v5h-7z" />
        </svg>
      );

    case "tile":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1" />
          <rect x="13" y="4" width="7" height="7" rx="1" />
          <rect x="4" y="13" width="7" height="7" rx="1" />
          <rect x="13" y="13" width="7" height="7" rx="1" />
        </svg>
      );

    case "paint":
      return (
        <svg {...common}>
          <path d="M4 5h12v5H4z" />
          <path d="M16 7h4v4h-4" />
          <path d="M8 10v10" />
          <path d="M5 20h6" />
        </svg>
      );

    case "topsoil":
      return (
        <svg {...common}>
          <path d="M4 18h16" />
          <path d="M5 15c2-3 4-4 7-4s5 1 7 4" />
          <path d="M12 11V5" />
          <path d="M12 5c-2 0-3 1-4 2 2 .7 3.3.5 4-2Z" />
          <path d="M12 5c2 0 3 1 4 2-2 .7-3.3.5-4-2Z" />
        </svg>
      );

    case "sod-turf":
      return (
        <svg {...common}>
          <path d="M5 20c1-4 1-7 3-10" />
          <path d="M10 20c0-5 2-9 4-12" />
          <path d="M15 20c1-4 3-7 5-9" />
          <path d="M4 20h16" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <path d="M5 5h14v14H5z" />
          <path d="M8 9h8" />
          <path d="M8 13h8" />
          <path d="M8 17h5" />
        </svg>
      );
  }
}


/* =================================================
   POPULAR CALCULATORS
================================================= */

const calculators = [
  {
    title: "Concrete Calculator",
    description:
      "Estimate concrete volume, materials and project cost.",
    href: "/calculators/concrete",
    icon: "concrete",
    theme:
      "border-blue-100 bg-blue-50/60 group-hover:border-blue-300 group-hover:bg-blue-50",
    iconTheme:
      "bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
    accent: "text-blue-600",
  },

  {
    title: "Gravel Calculator",
    description:
      "Estimate gravel volume, tons, waste and cost.",
    href: "/calculators/gravel",
    icon: "gravel",
    theme:
      "border-emerald-100 bg-emerald-50/60 group-hover:border-emerald-300 group-hover:bg-emerald-50",
    iconTheme:
      "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white",
    accent: "text-emerald-600",
  },

  {
    title: "Asphalt Calculator",
    description:
      "Estimate asphalt volume, tons, waste and cost.",
    href: "/calculators/asphalt",
    icon: "asphalt",
    theme:
      "border-slate-200 bg-slate-50 group-hover:border-slate-400 group-hover:bg-slate-100",
    iconTheme:
      "bg-slate-200 text-slate-700 group-hover:bg-slate-700 group-hover:text-white",
    accent: "text-slate-700",
  },

  {
    title: "Paver Calculator",
    description:
      "Calculate pavers needed, waste and project cost.",
    href: "/calculators/paver",
    icon: "paver",
    theme:
      "border-violet-100 bg-violet-50/60 group-hover:border-violet-300 group-hover:bg-violet-50",
    iconTheme:
      "bg-violet-100 text-violet-700 group-hover:bg-violet-600 group-hover:text-white",
    accent: "text-violet-600",
  },

  {
    title: "Tile Calculator",
    description:
      "Calculate tiles, boxes, waste and material cost.",
    href: "/calculators/tile",
    icon: "tile",
    theme:
      "border-cyan-100 bg-cyan-50/60 group-hover:border-cyan-300 group-hover:bg-cyan-50",
    iconTheme:
      "bg-cyan-100 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white",
    accent: "text-cyan-600",
  },

  {
    title: "Paint Calculator",
    description:
      "Estimate paint quantity for walls and ceilings.",
    href: "/calculators/paint",
    icon: "paint",
    theme:
      "border-orange-100 bg-orange-50/60 group-hover:border-orange-300 group-hover:bg-orange-50",
    iconTheme:
      "bg-orange-100 text-orange-700 group-hover:bg-orange-600 group-hover:text-white",
    accent: "text-orange-600",
  },

  {
    title: "Topsoil Calculator",
    description:
      "Estimate topsoil volume, tons, bags and cost.",
    href: "/calculators/topsoil",
    icon: "topsoil",
    theme:
      "border-amber-100 bg-amber-50/60 group-hover:border-amber-300 group-hover:bg-amber-50",
    iconTheme:
      "bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white",
    accent: "text-amber-600",
  },

  {
    title: "Sod & Turf Calculator",
    description:
      "Calculate sod or turf area, pieces and material cost.",
    href: "/calculators/sod-turf",
    icon: "sod-turf",
    theme:
      "border-green-100 bg-green-50/60 group-hover:border-green-300 group-hover:bg-green-50",
    iconTheme:
      "bg-green-100 text-green-700 group-hover:bg-green-600 group-hover:text-white",
    accent: "text-green-600",
  },
];


/* =================================================
   COMPONENT
================================================= */

export default function PopularCalculators() {
  return (
    <section
      id="calculators"
      aria-labelledby="homepage-calculators-heading"
      className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 px-5 py-14 sm:px-6 sm:py-18"
    >

      {/* DECORATIVE BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-blue-200/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-cyan-200/20 blur-3xl"
      />


      <div className="relative mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mx-auto max-w-2xl text-center">

          <span className="inline-flex rounded-full border border-blue-100 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm sm:text-xs">
            Construction Calculators
          </span>


          <h2
            id="homepage-calculators-heading"
            className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
          >
            Calculate Materials &amp; Project Quantities
          </h2>


          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Estimate materials, quantities, waste and project costs
            for common building and landscaping projects.
          </p>

        </div>


        {/* CALCULATOR CARDS */}

        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">

          {calculators.map((calculator) => (

            <Link
              key={calculator.href}
              href={calculator.href}
              className={`group relative flex min-h-[205px] flex-col overflow-hidden rounded-2xl border p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:min-h-[225px] sm:p-5 ${calculator.theme}`}
            >

              {/* TOP ACCENT */}

              <span
                aria-hidden="true"
                className={`absolute left-0 right-0 top-0 h-1 ${calculator.accent.replace(
                  "text-",
                  "bg-"
                )}`}
              />


              {/* ICON */}

              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl transition duration-200 sm:h-14 sm:w-14 ${calculator.iconTheme}`}
              >

                <CalculatorIcon
                  type={calculator.icon}
                  className="h-6 w-6 sm:h-7 sm:w-7"
                />

              </span>


              {/* TITLE */}

              <h3 className="mt-4 text-sm font-bold leading-5 text-slate-950 transition-colors group-hover:text-blue-700 sm:text-base">
                {calculator.title}
              </h3>


              {/* DESCRIPTION */}

              <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                {calculator.description}
              </p>


              {/* CALCULATE */}

              <span
                className={`mt-auto pt-4 text-xs font-bold sm:text-sm ${calculator.accent}`}
              >
                Calculate
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>

            </Link>

          ))}

        </div>


        {/* VIEW ALL */}

        <div className="mt-9 text-center">

          <Link
            href="/calculators"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg"
          >
            View All Construction Calculators

            <span
              aria-hidden="true"
              className="ml-2 text-base transition-transform hover:translate-x-1"
            >
              →
            </span>
          </Link>

        </div>

      </div>

    </section>
  );
}
