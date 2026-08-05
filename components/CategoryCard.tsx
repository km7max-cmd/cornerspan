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

      <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl">

        <div
          className={`absolute right-5 top-5 rounded-full bg-gradient-to-r ${item.color} px-4 py-1 text-xs font-semibold text-white shadow`}
        >
          {item.badge}
        </div>

        <div
          className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} text-5xl shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
        >
          {item.icon}
        </div>

        <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h3>

        <p className="mt-3 text-[17px] leading-8 text-slate-600">
          {item.description}
        </p>

        <div className="mt-8 h-px bg-slate-100" />
                <div className="mt-6 flex items-center justify-between">

          <span className="text-lg font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
            Open Calculator
          </span>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-xl text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:translate-x-1">
            →
          </div>

        </div>

      </div>

    </Link>
  );
}
