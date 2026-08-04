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
    <section className="mt-12 rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">
        Related Calculators
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg border p-4 hover:bg-slate-50"
          >
            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Open Calculator →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
