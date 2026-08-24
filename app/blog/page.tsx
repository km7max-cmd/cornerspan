import Link from "next/link";

type Guide = {
  title: string;
  description: string;
  category: string;
  href: string;
  imageTitle: string;
  emoji: string;
};

const guides: Guide[] = [
  {
    title: "Concrete Calculation Guide",
    description:
      "Learn how to calculate concrete volume for slabs, foundations and construction projects.",
    category: "Concrete",
    href: "/calculators/concrete-calculator",
    imageTitle: "CONCRETE\nCALCULATION",
    emoji: "🏗️",
  },
  {
    title: "Brick Calculation Guide",
    description:
      "Learn how to estimate the number of bricks required for a wall accurately.",
    category: "Brick",
    href: "/calculators/brick-calculator",
    imageTitle: "BRICK\nCALCULATOR",
    emoji: "🧱",
  },
  {
    title: "Square Footage Calculator Guide",
    description:
      "Learn how to calculate square footage for rooms, floors and construction areas.",
    category: "Measurements",
    href: "/calculators/square-footage-calculator",
    imageTitle: "SQUARE\nFOOTAGE",
    emoji: "📐",
  },
  {
    title: "Tile Calculation Guide",
    description:
      "Calculate the tiles needed for floors, walls and other surfaces.",
    category: "Tile",
    href: "/calculators/tile-calculator",
    imageTitle: "TILE\nCALCULATOR",
    emoji: "▦",
  },
  {
    title: "Gravel Calculation Guide",
    description:
      "Estimate gravel quantity and material requirements for your project.",
    category: "Gravel",
    href: "/calculators/gravel-calculator",
    imageTitle: "GRAVEL\nCALCULATOR",
    emoji: "🪨",
  },
  {
    title: "Asphalt Calculation Guide",
    description:
      "Learn how to estimate asphalt quantity for driveways, roads and paving.",
    category: "Asphalt",
    href: "/calculators/asphalt-calculator",
    imageTitle: "ASPHALT\nCALCULATOR",
    emoji: "🛣️",
  },
  {
    title: "Paver Calculation Guide",
    description:
      "Calculate the number of pavers required for patios, driveways and walkways.",
    category: "Pavers",
    href: "/calculators/paver-calculator",
    imageTitle: "PAVER\nCALCULATOR",
    emoji: "⬛",
  },
  {
    title: "Paint Calculation Guide",
    description:
      "Estimate paint quantity based on wall area, coverage and number of coats.",
    category: "Paint",
    href: "/calculators/paint-calculator",
    imageTitle: "PAINT\nCALCULATOR",
    emoji: "🎨",
  },
  {
    title: "Roofing Calculation Guide",
    description:
      "Learn how to estimate roofing area and material requirements.",
    category: "Roofing",
    href: "/calculators/roofing-calculator",
    imageTitle: "ROOFING\nCALCULATOR",
    emoji: "🏠",
  },
  {
    title: "Concrete Slab Calculation Guide",
    description:
      "Calculate concrete requirements for slabs using length, width and thickness.",
    category: "Concrete",
    href: "/calculators/concrete-slab-calculator",
    imageTitle: "CONCRETE\nSLAB",
    emoji: "🏢",
  },
];

export default function BlogPage() {
  const visibleGuides = guides.slice(0, 10);
  const hasMoreGuides = guides.length > 10;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Practical guides to help you understand construction
              measurements, material calculations and common estimating
              methods.
            </p>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
            Latest Construction Guides
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Simple explanations and practical calculation methods.
          </p>
        </div>

        {/* IMPORTANT:
            grid-cols-2 = 2 cards on mobile
            md:grid-cols-3 = 3 cards on desktop
        */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6 md:grid-cols-3">
          {visibleGuides.map((guide) => (
            <article
              key={guide.href}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Cartoon thumbnail */}
              <div className="relative aspect-[1.15/1] overflow-hidden bg-gradient-to-br from-blue-100 via-white to-cyan-100">
                <div className="absolute inset-0">
                  {/* decorative shapes */}
                  <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-blue-200/60" />
                  <div className="absolute -bottom-8 -left-5 h-24 w-24 rounded-full bg-cyan-200/60" />
                  <div className="absolute right-4 bottom-4 h-3 w-3 rounded-full bg-emerald-400" />
                  <div className="absolute left-4 top-4 h-2 w-2 rounded-full bg-blue-500" />
                </div>

                {/* Cartoon character/object */}
                <div className="absolute bottom-3 left-3 text-4xl drop-shadow-sm sm:text-5xl">
                  {guide.emoji}
                </div>

                {/* Text inside image */}
                <div className="absolute right-3 top-3 max-w-[72%] rounded-xl bg-white/90 px-2.5 py-2 shadow-sm backdrop-blur-sm sm:px-3 sm:py-2.5">
                  <p className="whitespace-pre-line text-[10px] font-extrabold leading-tight tracking-wide text-slate-950 sm:text-xs">
                    {guide.imageTitle}
                  </p>
                </div>

                {/* Calculator badge */}
                <div className="absolute bottom-3 right-3 rounded-lg bg-blue-600 px-2 py-1 text-[9px] font-bold text-white shadow-sm sm:px-2.5 sm:text-[10px]">
                  GUIDE
                </div>
              </div>

              {/* Card content */}
              <div className="p-3 sm:p-5">
                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
                    {guide.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold leading-5 text-slate-950 sm:text-lg sm:leading-6">
                  {guide.title}
                </h3>

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

        {/* More */}
        {hasMoreGuides && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/blog/more"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 shadow-sm transition hover:border-blue-500 hover:text-blue-600"
            >
              More Guides
              <span className="ml-2">→</span>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
