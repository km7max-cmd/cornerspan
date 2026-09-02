import Link from "next/link";

type Item = {
  title: string;
  href: string;
};

type Props = {
  items: Item[];
};

export default function RelatedCalculators({ items }: Props) {
  if (!items.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-calculators-heading"
      className="mt-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Explore More
        </p>

        <h2
          id="related-calculators-heading"
          className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
        >
          Related Calculators
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Continue with another construction calculator.
        </p>
      </div>

      <nav aria-label="Related calculators">
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex min-h-[58px] items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="pr-3 text-sm font-bold text-slate-800 transition-colors group-hover:text-blue-700">
                  {item.title}
                </span>

                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-lg font-semibold text-blue-600 shadow-sm transition-all group-hover:bg-blue-600 group-hover:text-white"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
