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

  <span className="text-lg">
    →
  </span>
</Link>
        ))}

      </div>

    </section>
  );
}
