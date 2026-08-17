import Link from "next/link";

type Props = {
  title: string;
};

const data: Record<
  string,
  {
    icon: string;
  }
> = {
  "Concrete Calculator": {
    icon: "🏗️",
  },

  "Brick Calculator": {
    icon: "🧱",
  },

  "Steel Calculator": {
    icon: "🔩",
  },

  "Paint Calculator": {
    icon: "🎨",
  },

  "Tile Calculator": {
    icon: "🟫",
  },

  "Roofing Calculator": {
    icon: "🏠",
  },
};

export default function CategoryCard({ title }: Props) {
  const item = data[title];

  const slug = title
    .toLowerCase()
    .replace(" calculator", "")
    .replace(/\s+/g, "-");

  return (
    <Link
      href={`/calculators/${slug}`}
      className="group block"
    >
      <article className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-md">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          {item?.icon ?? "📐"}
        </div>

        <h3 className="text-sm font-bold text-slate-800 transition-colors group-hover:text-blue-600 sm:text-base">
          {title}
        </h3>

      </article>
    </Link>
  );
}
