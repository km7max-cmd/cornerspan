import Link from "next/link";

type Guide = {
  title: string;
  description: string;
  category: string;
  href: string;
  imageTitle: string;
  type: "concrete" | "brick" | "square";
};

const guides: Guide[] = [
  {
    title: "Concrete Calculation Guide",
    description:
      "Learn how to calculate concrete volume for slabs, foundations and construction projects.",
    category: "Concrete",
    href: "/calculators/concrete",
    imageTitle: "CONCRETE\nCALCULATION",
    type: "concrete",
  },
  {
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate the number of bricks required for a wall accurately.",
    category: "Brick",
    href: "/calculators/brick",
    imageTitle: "BRICK\nCALCULATOR",
    type: "brick",
  },
  {
    title: "Square Footage Calculator Guide",
    description:
      "Learn how to calculate square footage for rooms, floors and construction areas.",
    category: "Measurements",
    href: "/calculators/square-footage",
    imageTitle: "SQUARE\nFOOTAGE",
    type: "square",
  },
];

function GuideIllustration({
  type,
  title,
}: {
  type: Guide["type"];
  title: string;
}) {
  return (
    <div className="relative aspect-[1.12/1] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-100">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100" />
      <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-cyan-100" />

      <div className="absolute right-2.5 top-2.5 z-10 max-w-[68%] rounded-xl border border-white/80 bg-white/95 px-2.5 py-2 shadow-md">
        <p className="whitespace-pre-line text-[9px] font-extrabold leading-[1.15] tracking-wide text-slate-950 sm:text-[11px]">
          {title}
        </p>
      </div>

      <div className="absolute bottom-2 left-2 z-10 sm:left-4">
        <svg
          viewBox="0 0 180 130"
          className="h-[105px] w-[145px] sm:h-[125px] sm:w-[165px]"
          aria-hidden="true"
        >
          <ellipse
            cx="85"
            cy="116"
            rx="70"
            ry="9"
            fill="#bae6fd"
          />

          {type === "concrete" && (
            <>
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
              />
              <path
                d="M59 50 V66 M109 50 V66 M47 66 V82 M84 66 V82 M121 66 V82 M59 82 V98 M109 82 V98 M47 98 V112 M84 98 V112 M121 98 V112"
                stroke="#fff"
                strokeWidth="3"
              />

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

              <path
                d="M65 35 V105 M96 35 V105 M35 58 H127 M35 81 H127"
                stroke="#60a5fa"
                strokeWidth="3"
              />

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
        </svg>
      </div>

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

      <section className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-7">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            Latest Construction Guides
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Simple explanations and practical calculation methods.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:gap-6">
          {visibleGuides.map((guide) => (
            <article
              key={guide.href}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <Link href={guide.href}>
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

                  <p className="mt-2 hidden text-sm leading-6 text-slate-600 sm:block">
                    {guide.description}
                  </p>

                  <span className="mt-3 inline-flex items-center text-xs font-bold text-blue-600 sm:mt-4 sm:text-sm">
                    Read Guide
                    <span className="ml-1 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
