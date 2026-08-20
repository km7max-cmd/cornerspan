import Link from "next/link";

const calculators = [
  {
    title: "Brick Calculator",
    href: "/calculators/brick",
  },
  {
    title: "Steel Calculator",
    href: "/calculators/steel",
  },
  {
    title: "Paint Calculator",
    href: "/calculators/paint",
  },
  {
    title: "Tile Calculator",
    href: "/calculators/tile",
  },
  {
    title: "Roofing Calculator",
    href: "/calculators/roofing",
  },
];

export default function RelatedCalculators() {
  return (
    <section className="mt-4 w-full rounded-3xl bg-white p-5 shadow-lg sm:p-6">

      <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        Related Construction Calculators
      </h2>

      <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base">
        Explore other calculators for common construction material and
        quantity estimates.
      </p>

      <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">

        {calculators.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-14 items-center justify-between py-3 text-blue-600 transition hover:text-blue-800"
          >
            <span className="text-sm font-medium sm:text-base">
              {item.title}
            </span>

            <span
              aria-hidden="true"
              className="text-lg"
            >
              →
            </span>
          </Link>
        ))}

      </div>

    </section>
  );
}
