type Props = {
  volume: number;
  dryVolume: number;
  bags: number;
  sand: number;
  aggregate: number;
  onCopy: () => void;
  onShare: () => void;
};

export default function ResultCard({
  volume,
  dryVolume,
  bags,
  sand,
  aggregate,
  onCopy,
  onShare,
}: Props) {
  const hasResult = volume > 0;

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-900">
          Calculation Result
        </h2>

        {hasResult && (
          <div className="flex gap-2">

            <button
              onClick={onCopy}
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              📋 Copy
            </button>

            <button
              onClick={onShare}
              className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              📤 Share
            </button>

          </div>
        )}

      </div>

      {!hasResult ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
            📊
          </div>

          <h3 className="text-lg font-semibold text-slate-800">
            No Results Yet
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter Length, Width and Depth to calculate
            concrete volume and material requirements.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm text-slate-500">
              Concrete Volume
            </p>

            <h3 className="mt-1 text-3xl font-black text-blue-600">
              {volume.toFixed(2)} m³
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Dry Volume
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {dryVolume.toFixed(2)} m³
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Cement Bags
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {bags} Bags
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Sand
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {sand.toFixed(2)} m³
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Aggregate
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900">
                {aggregate.toFixed(2)} m³
              </h3>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
