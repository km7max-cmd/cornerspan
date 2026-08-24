import Link from "next/link";

type Guide = {
  title: string;
  description: string;
  category: string;
  href: string;
  imageTitle: string;
  type:
    | "concrete"
    | "brick"
    | "square"
    | "tile"
    | "gravel"
    | "asphalt"
    | "paver"
    | "paint"
    | "roofing"
    | "slab";
};

const guides: Guide[] = [
  {
    title: "Concrete Calculation Guide",
    description:
      "Learn how to calculate concrete volume for slabs, foundations and construction projects.",
    category: "Concrete",
    href: "/calculators/concrete-calculator",
    imageTitle: "CONCRETE\nCALCULATION",
    type: "concrete",
  },
  {
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate the number of bricks required for a wall accurately.",
    category: "Brick",
    href: "/calculators/brick-calculator",
    imageTitle: "BRICK\nCALCULATOR",
    type: "brick",
  },
  {
    title: "Square Footage Calculator Guide",
    description:
      "Learn how to calculate square footage for rooms, floors and construction areas.",
    category: "Measurements",
    href: "/calculators/square-footage-calculator",
    imageTitle: "SQUARE\nFOOTAGE",
    type: "square",
  },
  {
    title: "Tile Calculation Guide",
    description:
      "Calculate the tiles needed for floors, walls and other surfaces.",
    category: "Tile",
    href: "/calculators/tile-calculator",
    imageTitle: "TILE\nCALCULATOR",
    type: "tile",
  },
  {
    title: "Gravel Calculation Guide",
    description:
      "Estimate gravel quantity and material requirements for your project.",
    category: "Gravel",
    href: "/calculators/gravel-calculator",
    imageTitle: "GRAVEL\nCALCULATOR",
    type: "gravel",
  },
  {
    title: "Asphalt Calculation Guide",
    description:
      "Learn how to estimate asphalt quantity for driveways, roads and paving.",
    category: "Asphalt",
    href: "/calculators/asphalt-calculator",
    imageTitle: "ASPHALT\nCALCULATOR",
    type: "asphalt",
  },
  {
    title: "Paver Calculation Guide",
    description:
      "Calculate the number of pavers required for patios, driveways and walkways.",
    category: "Pavers",
    href: "/calculators/paver-calculator",
    imageTitle: "PAVER\nCALCULATOR",
    type: "paver",
  },
  {
    title: "Paint Calculation Guide",
    description:
      "Estimate paint quantity based on wall area, coverage and number of coats.",
    category: "Paint",
    href: "/calculators/paint-calculator",
    imageTitle: "PAINT\nCALCULATOR",
    type: "paint",
  },
  {
    title: "Roofing Calculation Guide",
    description:
      "Learn how to estimate roofing area and material requirements.",
    category: "Roofing",
    href: "/calculators/roofing-calculator",
    imageTitle: "ROOFING\nCALCULATOR",
    type: "roofing",
  },
  {
    title: "Concrete Slab Calculation Guide",
    description:
      "Calculate concrete requirements for slabs using length, width and thickness.",
    category: "Concrete",
    href: "/calculators/concrete-slab-calculator",
    imageTitle: "CONCRETE\nSLAB",
    type: "slab",
  },
];

/* -----------------------------------------
   Cartoon illustration
----------------------------------------- */

function GuideIllustration({
  type,
  title,
}: {
  type: Guide["type"];
  title: string;
}) {
  return (
    <div className="relative aspect-[1.12/1] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      {/* Decorative background */}
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100" />
      <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-cyan-100" />

      <div className="absolute left-3 top-3 h-2.5 w-2.5 rounded-full bg-blue-500" />
      <div className="absolute right-12 bottom-5 h-2 w-2 rounded-full bg-emerald-400" />

      {/* Text inside image */}
      <div className="absolute right-2.5 top-2.5 z-10 max-w-[68%] rounded-xl border border-white/80 bg-white/95 px-2.5 py-2 shadow-md">
        <p className="whitespace-pre-line text-[9px] font-extrabold leading-[1.15] tracking-wide text-slate-950 sm:text-[11px]">
          {title}
        </p>
      </div>

      {/* Cartoon illustration */}
      <div className="absolute bottom-2 left-2 z-10 sm:left-4">
        <svg
          viewBox="0 0 180 130"
          className="h-[105px] w-[145px] sm:h-[125px] sm:w-[165px]"
          aria-hidden="true"
        >
          {/* Ground */}
          <ellipse
            cx="85"
            cy="116"
            rx="70"
            ry="9"
            fill="#bae6fd"
          />

          {type === "concrete" && (
            <>
              {/* Crane */}
              <line
                x1="28"
                y1="104"
                x2="28"
                y2="30"
                stroke="#f59e0b"
                strokeWidth="7"
              />
              <line
                x1="28"
                y1="32"
                x2="120"
                y2="32"
                stroke="#f59e0b"
                strokeWidth="6"
              />
              <line
                x1="42"
                y1="32"
                x2="70"
                y2="8"
                stroke="#f59e0b"
                strokeWidth="4"
              />
              <line
                x1="70"
                y1="8"
                x2="95"
                y2="32"
                stroke="#f59e0b"
                strokeWidth="4"
              />
              <line
                x1="105"
                y1="32"
                x2="105"
                y2="65"
                stroke="#334155"
                strokeWidth="3"
              />
              <rect
                x="96"
                y="63"
                width="18"
                height="14"
                rx="2"
                fill="#64748b"
              />

              {/* Worker */}
              <circle cx="62" cy="67" r="10" fill="#f6c7a7" />
              <path
                d="M51 65 Q62 52 73 65"
                fill="#f59e0b"
              />
              <rect
                x="52"
                y="77"
                width="21"
                height="28"
                rx="7"
                fill="#2563eb"
              />
              <line
                x1="57"
                y1="103"
                x2="51"
                y2="115"
                stroke="#1e293b"
                strokeWidth="5"
              />
              <line
                x1="68"
                y1="103"
                x2="74"
                y2="115"
                stroke="#1e293b"
                strokeWidth="5"
              />
            </>
          )}

          {type === "brick" && (
            <>
              {/* Wall */}
              <rect
                x="34"
                y="50"
                width="100"
                height="62"
                rx="3"
                fill="#ef4444"
              />
              <path
                d="M34 66 H134 M34 82 H134 M34 98 H134"
                stroke="#fff"
                strokeWidth="3"
                opacity=".9"
              />
              <path
                d="M59 50 V66 M109 50 V66 M47 66 V82 M84 66 V82 M121 66 V82 M59 82 V98 M109 82 V98 M47 98 V112 M84 98 V112 M121 98 V112"
                stroke="#fff"
                strokeWidth="3"
                opacity=".9"
              />

              {/* Trowel */}
              <path
                d="M20 35 L54 45 L35 58 Z"
                fill="#94a3b8"
              />
              <path
                d="M19 35 L10 25"
                stroke="#92400e"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </>
          )}

          {type === "square" && (
            <>
              {/* Floor */}
              <rect
                x="35"
                y="35"
                width="92"
                height="70"
                rx="4"
                fill="#dbeafe"
                stroke="#2563eb"
                strokeWidth="4"
              />
              {/* Grid */}
              <path
                d="M65 35 V105 M96 35 V105 M35 58 H127 M35 81 H127"
                stroke="#60a5fa"
                strokeWidth="3"
              />

              {/* Measuring arrows */}
              <path
                d="M40 116 H122"
                stroke="#0f172a"
                strokeWidth="3"
              />
              <path
                d="M40 116 L48 111 M40 116 L48 121 M122 116 L114 111 M122 116 L114 121"
                stroke="#0f172a"
                strokeWidth="3"
              />
            </>
          )}

          {type === "tile" && (
            <>
              <rect
                x="35"
                y="35"
                width="85"
                height="70"
                rx="3"
                fill="#bfdbfe"
                stroke="#2563eb"
                strokeWidth="4"
              />
              <path
                d="M63 35 V105 M92 35 V105 M35 58 H120 M35 82 H120"
                stroke="#fff"
                strokeWidth="4"
              />
              <path
                d="M132 83 L155 60 L164 68 L141 91 Z"
                fill="#94a3b8"
              />
              <path
                d="M148 56 L160 45"
                stroke="#92400e"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </>
          )}

          {type === "gravel" && (
            <>
              <path
                d="M35 95 Q80 45 130 95"
                fill="#94a3b8"
              />
              <circle cx="55" cy="87" r="8" fill="#64748b" />
              <circle cx="77" cy="76" r="7" fill="#475569" />
              <circle cx="98" cy="88" r="9" fill="#64748b" />
              <circle cx="119" cy="72" r="7" fill="#475569" />
              <circle cx="135" cy="91" r="6" fill="#64748b" />

              {/* Wheelbarrow */}
              <path
                d="M22 55 L63 55 L55 76 L30 76 Z"
                fill="#f59e0b"
              />
              <circle cx="57" cy="82" r="8" fill="#334155" />
              <line
                x1="63"
                y1="58"
                x2="86"
                y2="47"
                stroke="#92400e"
                strokeWidth="5"
              />
            </>
          )}

          {type === "asphalt" && (
            <>
              {/* Road */}
              <path
                d="M28 110 L65 35 H112 L150 110 Z"
                fill="#334155"
              />
              <path
                d="M89 42 V58 M89 69 V85 M89 95 V108"
                stroke="#facc15"
                strokeWidth="5"
                strokeDasharray="8 6"
              />

              {/* Roller */}
              <rect
                x="50"
                y="75"
                width="48"
                height="25"
                rx="5"
                fill="#f59e0b"
              />
              <circle cx="57" cy="103" r="10" fill="#475569" />
              <circle cx="92" cy="103" r="10" fill="#475569" />
              <rect
                x="66"
                y="60"
                width="25"
                height="18"
                rx="3"
                fill="#2563eb"
              />
            </>
          )}

          {type === "paver" && (
            <>
              <rect
                x="38"
                y="45"
                width="30"
                height="22"
                rx="3"
                fill="#64748b"
              />
              <rect
                x="73"
                y="45"
                width="30"
                height="22"
                rx="3"
                fill="#94a3b8"
              />
              <rect
                x="108"
                y="45"
                width="30"
                height="22"
                rx="3"
                fill="#64748b"
              />
              <rect
                x="50"
                y="72"
                width="30"
                height="22"
                rx="3"
                fill="#94a3b8"
              />
              <rect
                x="85"
                y="72"
                width="30"
                height="22"
                rx="3"
                fill="#64748b"
              />
              <rect
                x="120"
                y="72"
                width="30"
                height="22"
                rx="3"
                fill="#94a3b8"
              />

              {/* Hand */}
              <circle cx="27" cy="67" r="10" fill="#f6c7a7" />
              <path
                d="M28 60 L42 52"
                stroke="#f6c7a7"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </>
          )}

          {type === "paint" && (
            <>
              {/* Wall */}
              <rect
                x="38"
                y="28"
                width="80"
                height="78"
                rx="4"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="3"
              />

              {/* Paint area */}
              <path
                d="M50 40 H105 V95 H50 Z"
                fill="#93c5fd"
              />

              {/* Roller */}
              <rect
                x="112"
                y="38"
                width="25"
                height="13"
                rx="5"
                fill="#2563eb"
              />
              <line
                x1="124"
                y1="51"
                x2="124"
                y2="83"
                stroke="#334155"
                strokeWidth="4"
              />
              <path
                d="M124 83 Q108 83 108 98"
                fill="none"
                stroke="#334155"
                strokeWidth="4"
              />
            </>
          )}

          {type === "roofing" && (
            <>
              {/* House */}
              <path
                d="M35 65 L83 27 L132 65 V106 H35 Z"
                fill="#f8fafc"
                stroke="#334155"
                strokeWidth="4"
              />

              {/* Roof */}
              <path
                d="M27 65 L83 20 L141 65 L130 73 L83 36 L38 73 Z"
                fill="#2563eb"
              />

              {/* Roof lines */}
              <path
                d="M49 57 L83 31 L118 57"
                fill="none"
                stroke="#93c5fd"
                strokeWidth="4"
              />

              {/* Window */}
              <rect
                x="67"
                y="74"
                width="30"
                height="32"
                fill="#bfdbfe"
                stroke="#334155"
                strokeWidth="3"
              />
            </>
          )}

          {type === "slab" && (
            <>
              {/* Concrete slab */}
              <path
                d="M35 62 L115 43 L145 62 L65 82 Z"
                fill="#94a3b8"
                stroke="#475569"
                strokeWidth="3"
              />
              <path
                d="M65 82 V105 L145 85 V62"
                fill="#64748b"
                stroke="#475569"
                strokeWidth="3"
              />

              {/* Worker */}
              <circle cx="48" cy="39" r="9" fill="#f6c7a7" />
              <path
                d="M39 38 Q48 25 57 38"
                fill="#f59e0b"
              />
              <rect
                x="40"
                y="49"
                width="17"
                height="24"
                rx="6"
                fill="#2563eb"
              />
            </>
          )}
        </svg>
      </div>

      {/* Guide badge */}
      <div className="absolute bottom-3 right-3 z-20 rounded-lg bg-blue-600 px-2.5 py-1.5 text-[9px] font-bold text-white shadow-md sm:px-3 sm:text-[10px]">
        GUIDE
      </div>
    </div>
  );
}

export default function BlogPage() {
  const visibleGuides = guides.slice(0, 10);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
              CornerSpan Guides
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Construction
              <span className="block text-blue-600">
                Calculation Guides
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Practical guides to help you understand construction
              measurements, material calculations and common estimating
              methods.
            </p>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            Latest Construction Guides
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Simple explanations and practical calculation methods.
          </p>
        </div>

        {/* 2 columns mobile / 3 columns desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">
          {visibleGuides.map((guide) => (
            <article
              key={guide.href}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <GuideIllustration
                type={guide.type}
                title={guide.imageTitle}
              />

              <div className="p-3 sm:p-5">
                <div className="mb-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
                    {guide.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold leading-5 text-slate-950 sm:text-lg sm:leading-6">
                  {guide.title}
                </h3>

                {/* Description hidden on mobile to keep cards compact */}
                <p className="mt-2 hidden text-sm leading-6 text-slate-600 sm:block">
                  {guide.description}
                </p>

                <Link
                  href={guide.href}
                  className="mt-3 inline-flex items-center text-xs font-bold text-blue-600 transition-colors hover:text-blue-800 sm:mt-4 sm:text-sm"
                >
                  Read Guide
                  <span className="ml-1 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
