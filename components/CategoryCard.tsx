import Link from "next/link";

type Props = {
  title: string;
};

const icons: Record<string, string> = {
  "Concrete Calculator": "🏗️",
  "Brick Calculator": "🧱",
  "Steel Calculator": "🦾",
  "Paint Calculator": "🎨",
  "Tile Calculator": "🟫",
  "Roofing Calculator": "🏠",
};

export default function CategoryCard({ title }: Props) {
  const slug = title
    .toLowerCase()
    .replace(" calculator", "")
    .replace(/\s+/g, "-");

  return (
    <Link href={`/calculators/${slug}`}>
      <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-4xl">
          {icons[title] ?? "📐"}
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          Professional construction estimation tool.
        </p>

        <div className="mt-6 font-semibold text-blue-600">
          Open Calculator →
        </div>
      </div>
    </Link>
  );
}
