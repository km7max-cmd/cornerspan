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

const descriptions: Record<string, string> = {
  "Concrete Calculator": "Estimate concrete volume and material.",
  "Brick Calculator": "Calculate bricks and mortar required.",
  "Steel Calculator": "Estimate reinforcement steel quantity.",
  "Paint Calculator": "Find paint quantity and coverage.",
  "Tile Calculator": "Calculate tiles and wastage.",
  "Roofing Calculator": "Estimate roofing materials quickly.",
};

export default function CategoryCard({ title }: Props) {
  const slug = title
    .toLowerCase()
    .replace(" calculator", "")
    .replace(/\s+/g, "-");

  return (
    <Link href={`/calculators/${slug}`}>
      <div className="group h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-4xl transition group-hover:bg-blue-600 group-hover:text-white">
          {icons[title] ?? "📐"}
        </div>

        <h3 className="mt-6 text-2xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-3 leading-7 text-slate-600">
          {descriptions[title] ??
            "Professional construction estimation tool."}
        </p>

        <div className="mt-8 flex items-center justify-between">
          <span className="font-semibold text-blue-600">
            Open Calculator
          </span>

          <span className="text-2xl transition group-hover:translate-x-1">
            →
          </span>
        </div>

      </div>
    </Link>
  );
}
