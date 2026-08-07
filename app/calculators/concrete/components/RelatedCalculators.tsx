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
    <section className="mt-10 rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="text-3xl font-black text-slate-900">
        🔗 Related Calculators
      </h2>

      <p className="mt-2 text-slate-600">
        Explore more construction calculators.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {calculators.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-500 hover:bg-blue-50"
          >
            <h3 className="font-semibold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Open Calculator →
            </p>
          </Link>
        ))}

      </div>

    </section>
  );
}
