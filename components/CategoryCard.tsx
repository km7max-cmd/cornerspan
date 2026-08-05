import Link from "next/link";

type Props = {
  title: string;
};

const data: Record<
  string,
  {
    icon: string;
    badge: string;
    description: string;
    color: string;
  }
> = {
  "Concrete Calculator": {
    icon: "🏗️",
    badge: "Popular",
    description: "Estimate concrete volume, bags and total cost.",
    color: "from-blue-500 to-indigo-600",
  },

  "Brick Calculator": {
    icon: "🧱",
    badge: "Trending",
    description: "Calculate bricks and mortar requirements.",
    color: "from-orange-500 to-red-500",
  },

  "Steel Calculator": {
    icon: "🦾",
    badge: "Professional",
    description: "Estimate reinforcement steel quantity.",
    color: "from-slate-600 to-slate-900",
  },

  "Paint Calculator": {
    icon: "🎨",
    badge: "Popular",
    description: "Estimate paint quantity and coverage area.",
    color: "from-pink-500 to-purple-600",
  },

  "Tile Calculator": {
    icon: "🟫",
    badge: "Accurate",
    description: "Calculate tiles, wastage and material.",
    color: "from-amber-500 to-yellow-600",
  },

  "Roofing Calculator": {
    icon: "🏠",
    badge: "New",
    description: "Estimate roofing sheets and materials.",
    color: "from-emerald-500 to-green-600",
  },
};

export default function CategoryCard({ title }: Props) {
  const item = data[title];

  const slug = title
    .toLowerCase()
    .replace(" calculator", "")
    .replace(/\s+/g, "-");

  return (
    <Link href={`/calculators/${slug}`}>
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

        <div
          className={`absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r ${item.color} px-4 py-2 text-xs font-bold text-white`}
        >
          {item.badge}
        </div>

        <div
          className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} text-5xl shadow-lg transition duration-300 group-hover:scale-110`}
        >
          {item.icon}
        </div>

        <h3 className="mt-7 text-2xl font-black text-slate-900">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-slate-600">
          {item.description}
        </p>

        <div className="mt-8 flex items-center justify-between">

          <span className="font-semibold text-blue-600">
            Open Calculator
          </span>

          <span className="text-2xl transition group-hover:translate-x-2">
            →
          </span>

        </div>

      </div>
    </Link>
  );
}
