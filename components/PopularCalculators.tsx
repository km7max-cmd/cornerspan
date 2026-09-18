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
    /* CONCRETE */

    case "concrete":
      return (
        <svg {...common}>
          <path d="M5 7h14l-1.3 11H6.3L5 7Z" />
          <path d="M7 7V4h10v3" />
          <path d="M8 11h8" />
          <path d="M8.5 15h7" />
        </svg>
      );

    /* GRAVEL */

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

    /* ASPHALT */

    case "asphalt":
      return (
        <svg {...common}>
          <path d="M4 19 9 5h6l5 14" />
          <path d="M12 7v3" />
          <path d="M12 13v3" />
        </svg>
      );

    /* PAVER */

    case "paver":
      return (
        <svg {...common}>
          <path d="M4 7h7v5H4z" />
          <path d="M13 7h7v5h-7z" />
          <path d="M4 14h7v5H4z" />
          <path d="M13 14h7v5h-7z" />
        </svg>
      );

    /* TILE */

    case "tile":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1" />
          <rect x="13" y="4" width="7" height="7" rx="1" />
          <rect x="4" y="13" width="7" height="7" rx="1" />
          <rect x="13" y="13" width="7" height="7" rx="1" />
        </svg>
      );

    /* PAINT */

    case "paint":
      return (
        <svg {...common}>
          <path d="M4 5h12v5H4z" />
          <path d="M16 7h4v4h-4" />
          <path d="M8 10v10" />
          <path d="M5 20h6" />
        </svg>
      );

    /* TOPSOIL */

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

    /* SOD / TURF */

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
   HOMEPAGE CALCULATORS
================================================= */

const calculators = [
  {
    title: "Concrete Calculator",
    description: "Estimate concrete volume, materials and project cost.",
    href: "/calculators/concrete",
    icon: "concrete",
  },

  {
    title: "Gravel Calculator",
    description: "Estimate gravel volume, tons, waste and cost.",
    href: "/calculators/gravel",
    icon: "gravel",
  },

  {
    title: "Asphalt Calculator",
    description: "Estimate asphalt volume, tons, waste and cost.",
    href: "/calculators/asphalt",
    icon: "asphalt",
  },

  {
    title: "Paver Calculator",
    description: "Calculate pavers needed, waste and project cost.",
    href: "/calculators/paver",
    icon: "paver",
  },

  {
    title: "Tile Calculator",
    description: "Calculate tiles, boxes, waste and material cost.",
    href: "/calculators/tile",
    icon: "tile",
  },

  {
    title: "Paint Calculator",
    description: "Estimate paint quantity for walls and ceilings.",
    href: "/calculators/paint",
    icon: "paint",
  },

  {
    title: "Topsoil Calculator",
    description: "Estimate topsoil volume, tons, bags and cost.",
    href: "/calculators/topsoil",
    icon: "topsoil",
  },

  {
    title: "Sod & Turf Calculator",
    description: "Calculate sod or turf area, pieces and material cost.",
    href: "/calculators/sod-turf",
    icon: "sod-turf",
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
      className="bg-white px-5 py-12 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">

        {/* SECTION HEADER */}

        <div className="mx-auto max-w-2xl text-center">

          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
            Construction Calculators
          </p>

          <h2
            id="homepage-calculators-heading"
            className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl"
          >
            Calculate Materials &amp; Project Quantities
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Use free construction calculators to estimate materials,
            quantities, waste and project costs for common building
            and landscaping projects.
          </p>

        </div>


        {/* CALCULATOR GRID */}

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">

          {calculators.map((calculator) => (

            <Link
              key={calculator.href}
              href={calculator.href}
              className="group flex min-h-[185px] flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md sm:min-h-[205px] sm:p-5"
            >

              {/* ICON */}

              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white sm:h-14 sm:w-14">

                <CalculatorIcon
                  type={calculator.icon}
                  className="h-6 w-6 sm:h-7 sm:w-7"
                />

              </span>


              {/* TITLE */}

              <h3 className="mt-4 text-sm font-bold leading-5 text-slate-900 transition-colors group-hover:text-blue-600 sm:text-base">
                {calculator.title}
              </h3>


              {/* DESCRIPTION */}

              <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                {calculator.description}
              </p>


              {/* LINK INDICATOR */}

              <span
                aria-hidden="true"
                className="mt-auto pt-4 text-xs font-bold text-blue-600"
              >
                Calculate →
              </span>

            </Link>

          ))}

        </div>


        {/* VIEW ALL */}

        <div className="mt-8 text-center">

          <Link
            href="/calculators"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            View All Construction Calculators
            <span
              aria-hidden="true"
              className="ml-2"
            >
              →
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}
