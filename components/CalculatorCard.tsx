type Props = {
  title: string;
};

export default function CategoryCard({ title }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">
        Open Calculator
      </p>
    </div>
  );
}
