type HistoryItem = {
  length: number;
  width: number;
  depth: number;
  volume: number;
};

type Props = {
  history: HistoryItem[];
  onClear: () => void;
};

export default function History({
  history,
  onClear,
}: Props) {
  if (history.length === 0) return null;

  return (
    <section className="mt-12 rounded-3xl bg-white p-6 shadow-xl">

      <div className="mb-6 flex items-center justify-between">

  <h2 className="text-2xl font-bold text-slate-900">
    🕒 Recent Calculations
  </h2>

  <button
    onClick={onClear}
    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
  >
    🗑 Clear
  </button>

</div>

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
