
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

const M3_PER_YD3 = 0.764554857984;
const FT3_PER_M3 = 35.3146667;

export default function History({ history, onClear }: Props) {
  if (history.length === 0) {
    return null;
  }

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            Saved on this device
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Recent Calculations
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest concrete volume estimates.
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

      <div className="p-5 sm:p-7">
        <div className="space-y-3">
          {history.map((item, index) => {
            const volume = Number.isFinite(item.volume)
              ? Math.max(0, item.volume)
              : 0;

            const volumeYd3 = volume / M3_PER_YD3;
            const volumeFt3 = volume * FT3_PER_M3;

            return (
              <div
                key={`${item.length}-${item.width}-${item.depth}-${index}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-500">
                    Dimensions entered
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-slate-900 sm:text-base">
                    {item.length} × {item.width} × {item.depth}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs font-medium text-slate-500">
                    Concrete Volume
                  </p>

                  <p className="mt-1 text-base font-black text-blue-600 sm:text-lg">
                    {volumeYd3.toFixed(2)} yd³
                  </p>

                  <p className="text-xs text-slate-500">
                    {volumeFt3.toFixed(2)} ft³
                  </p>

                  <p className="text-xs text-slate-500">
                    {volume.toFixed(3)} m³
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-400">
          Recent calculations are stored locally on this device.
        </p>
      </div>
    </section>
  );
}
