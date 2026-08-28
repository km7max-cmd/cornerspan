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
  if (history.length === 0) {
    return null;
  }

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">

        <div>

          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            Saved on this device
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Recent Calculations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest concrete calculations.
          </p>

        </div>

        <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 sm:px-4 sm:text-sm"
        >
          Clear
        </button>

      </div>

      {/* =====================================================
          HISTORY LIST
      ===================================================== */}

      <div className="p-5 sm:p-7">

        <div className="space-y-3">

          {history.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
            >

              {/* Dimensions */}

              <div className="min-w-0">

                <p className="text-xs font-medium text-slate-500">
                  Dimensions
                </p>

                <p className="mt-1 truncate text-sm font-bold text-slate-900 sm:text-base">
                  {item.length} × {item.width} × {item.depth}
                </p>

              </div>

              {/* Volume */}

              <div className="shrink-0 text-right">

                <p className="text-xs font-medium text-slate-500">
                  Concrete
                </p>

                <p className="mt-1 text-base font-black text-blue-600 sm:text-lg">
                  {item.volume.toFixed(2)} m³
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* Note */}

        <p className="mt-4 text-xs leading-5 text-slate-400">
          Recent calculations are stored locally on this device.
        </p>

      </div>

    </section>
  );
}
