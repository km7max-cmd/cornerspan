import Link from "next/link";

type Item = {
  title: string;
  href: string;
};

type Props = {
  items: Item[];
};

export default function RelatedCalculators({ items }: Props) {
  return (
    <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold text-slate-900">
        Related Calculators
      </h2>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-lg px-3 py-2 text-base font-medium text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              {item.title} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
