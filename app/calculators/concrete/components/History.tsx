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
    <section className="mt-4 w-full rounded-3xl bg-white p-5 shadow-lg sm:p-6">

      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-4">

        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Recent Calculations
        </h2>

        <button
          type="button"
          onClick={onClear}
          className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Clear
        </button>

      </div>

      {/* History List */}
      <div className="space-y-3">

        {history.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="font-semibold text-slate-900">
              {item.length} × {item.width} × {item.depth}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Volume:{" "}
              <span className="font-medium text-slate-700">
                {item.volume.toFixed(2)} m³
              </span>
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}
