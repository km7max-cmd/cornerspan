import Link from "next/link";

type Calculator = {
  slug: string;
  title: string;
  href: string;
};

type Props = {
  currentSlug: string;
};

const calculators: Calculator[] = [
  {
    slug: "brick",
    title: "Brick Calculator",
    href: "/calculators/brick",
  },
  {
    slug: "concrete",
    title: "Concrete Calculator",
    href: "/calculators/concrete",
  },
  {
    slug: "square-footage",
    title: "Square Footage Calculator",
    href: "/calculators/square-footage",
  },
];

export default function RelatedCalculators({
  currentSlug,
}: Props) {
  const relatedCalculators = calculators.filter(
    (calculator) => calculator.slug !== currentSlug
  );

  return (
    <section className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold text-slate-950">
        Related Calculators
      </h2>

      <div className="space-y-4">
        {relatedCalculators.map((calculator) => (
          <Link
            key={calculator.slug}
            href={calculator.href}
            className="block text-lg font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
          >
            {calculator.title} →
          </Link>
        ))}
      </div>
    </section>
  );
}
