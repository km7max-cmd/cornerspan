import Link from "next/link";

const guides = [
  {
    icon: "🏗️",
    title: "Concrete Volume",
    description: "Learn how to calculate concrete volume.",
    href: "/guides/concrete-volume",
  },
  {
    icon: "🔩",
    title: "Steel Weight",
    description: "Understand steel bar weight calculations.",
    href: "/guides/steel-weight",
  },
  {
    icon: "🧱",
    title: "Brick Quantity",
    description: "Estimate bricks needed for a wall.",
    href: "/calculators/brick",
  },
];

export default function CalculatorGuides() {
  return (
    <section className="bg-slate-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">

        {/* Heading */}
        <div className="mb-5 text-center">
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-blue-600">
            CALCULATOR GUIDES
          </span>

          <h2 className="mt-2 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Learn Before You Calculate
          </h2>

          <p className="mx-auto mt-1.5 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
            Simple guides to help you understand construction calculations.
          </p>
        </div>

        {/* Guides */}
        <div className="grid gap-3 md:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:rounded-2xl sm:p-5"
            >
              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl sm:h-12 sm:w-12">
                {guide.icon}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 sm:text-base">
                  {guide.title}
                </h3>

                <p className="mt-1 text-[11px] leading-4 text-slate-500 sm:text-xs">
                  {guide.description}
                </p>

                <div className="mt-2 text-[11px] font-bold text-blue-600">
                  Read Guide →
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
