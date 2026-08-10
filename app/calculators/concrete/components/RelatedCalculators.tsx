import Link from "next/link";

const calculators = [
  {
    title: "Brick Calculator",
    href: "/calculators/brick",
  },
  {
    title: "Cement Calculator",
    href: "/calculators/cement",
  },
  {
    title: "Steel Weight Calculator",
    href: "/calculators/steel-weight",
  },
  {
    title: "Tile Calculator",
    href: "/calculators/tile",
  },
  {
    title: "Paint Calculator",
    href: "/calculators/paint",
  },
  {
    title: "Sand Calculator",
    href: "/calculators/sand",
  },
];

export default function RelatedCalculators() {
  return (
    <section className="mt-4 w-full rounded-3xl bg-white p-5 shadow-lg sm:p-6">

      <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        Related Calculators
      </h2>

      <p className="mt-1 text-sm text-slate-600 sm:text-base">
        Explore more construction calculators.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">

        {calculators.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-400 hover:bg-blue-50"
          >
            <h3 className="text-sm font-semibold leading-5 text-slate-900 group-hover:text-blue-700 sm:text-base">
              {item.title}
            </h3>

            <p className="mt-1 text-xs text-slate-500 group-hover:text-blue-600 sm:text-sm">
              Open →
            </p>
          </Link>
        ))}

      </div>

    </section>
  );
}
