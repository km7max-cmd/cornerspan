type HistoryItem = {
  length: number;
  width: number;
  depth: number;
  volume: number;
};

type Props = {
  history: HistoryItem[];
};

export default function History({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <section className="mt-12 rounded-3xl bg-white p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        🕒 Recent Calculations
      </h2>

      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 p-4"
          >
            <p className="font-semibold">
              {item.length} × {item.width} × {item.depth}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Volume: {item.volume.toFixed(2)} m³
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
