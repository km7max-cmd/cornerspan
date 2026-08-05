import Link from "next/link";

type Props = {
  title: string;
};

export default function CategoryCard({ title }: Props) {
  const slug = title
    .toLowerCase()
    .replace(" calculator", "")
    .replace(/\s+/g, "-");

  return (
    <Link href={`/calculators/${slug}`}>
      <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
          🏗️
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Professional construction estimator.
        </p>

        <div className="mt-6 font-semibold text-blue-600 group-hover:translate-x-1 transition">
          Open Calculator →
        </div>
      </div>
    </Link>
  );
}
