import Link from "next/link";

type Props = {
  title: string;
};

const data: Record<
  string,
  {
    icon: string;
    color: string;
  }
> = {
  "Concrete Calculator": {
    icon: "🏗️",
    color: "from-blue-600 to-cyan-500",
  },

  "Brick Calculator": {
    icon: "🧱",
    color: "from-orange-500 to-red-500",
  },

  "Steel Calculator": {
    icon: "🔩",
    color: "from-slate-700 to-slate-900",
  },

  "Paint Calculator": {
    icon: "🎨",
    color: "from-pink-500 to-purple-600",
  },

  "Tile Calculator": {
    icon: "🟫",
    color: "from-amber-500 to-yellow-500",
  },

  "Roofing Calculator": {
    icon: "🏠",
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

      <article className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-3xl shadow-lg transition-transform duration-300 group-hover:scale-105`}
        >
          {item.icon}
        </div>

        <h3 className="mt-5 text-lg font-bold leading-6 text-slate-900">
          {title}
        </h3>

        <div className="mt-5 flex items-center justify-between">

          <span className="text-sm font-semibold text-blue-600">
            Open
          </span>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white transition-all duration-300 group-hover:translate-x-1">
            →
          </div>

        </div>

      </article>

    </Link>
  );
}
