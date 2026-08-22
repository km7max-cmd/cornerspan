type Stat = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  stats: Stat[];
};

export default function ResultStatGrid({ title, stats }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
