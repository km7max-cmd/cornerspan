type Props = {
  volume: number;
  dryVolume: number;
  cementBags: number;
  sand: number;
  aggregate: number;
  totalCost: number;
  currency: string;

  onCopy: () => void;
  onShare: () => void;
  onDownload: () => void;
};

export default function ResultCard({
  volume,
  dryVolume,
  cementBags,
  sand,
  aggregate,
  totalCost,
  currency,
  onCopy,
  onShare,
  onDownload,
}: Props) {
  const currencySymbol =
    {
      USD: "$",
      INR: "₹",
      EUR: "€",
      GBP: "£",
      AED: "AED ",
      AUD: "A$",
      CAD: "C$",
    }[currency] || "$";

  const hasResult = volume > 0;

  return (
    <section className="w-full rounded-3xl bg-white p-5 shadow-lg sm:p-7">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Calculation Result
        </h2>

        {hasResult && (
          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={onCopy}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Copy
            </button>

            <button
              type="button"
              onClick={onShare}
              className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
            >
              Share
            </button>

            <button
              type="button"
              onClick={onDownload}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.98]"
            >
              PDF
            </button>

          </div>
        )}
      </div>

      {!hasResult ? (

        /* Empty State */

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-10 text-center">

          <h3 className="text-lg font-semibold text-slate-800">
            No Results Yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Enter Length, Width and Depth to calculate concrete volume
            and material requirements.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {/* Concrete Volume */}

          <div className="rounded-2xl bg-blue-50 p-5 sm:p-6">

            <p className="text-sm font-medium text-slate-500">
              Concrete Volume
            </p>

            <h3 className="mt-1 text-3xl font-black text-blue-600 sm:text-4xl">
              {volume.toFixed(2)} m³
            </h3>

          </div>

          {/* Volume Details */}

          <div className="grid grid-cols-2 gap-4">

            {/* Dry Volume */}

            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">

              <p className="text-sm text-slate-500">
                Dry Volume
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                {dryVolume.toFixed(2)} m³
              </h3>

            </div>

            {/* Waste */}

            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">

              <p className="text-sm text-slate-500">
                Waste
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                {wasteVolume.toFixed(2)} m³
              </h3>

            </div>

            {/* Total Volume */}

            <div className="rounded-2xl bg-blue-50 p-4 sm:p-5">

              <p className="text-sm text-slate-500">
                Total Volume
              </p>

              <h3 className="mt-2 text-xl font-bold text-blue-700 sm:text-2xl">
                {totalVolume.toFixed(2)} m³
              </h3>

            </div>

            {/* Cement Bags */}

            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">

              <p className="text-sm text-slate-500">
                Cement Bags
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                {cementBags} Bags
              </h3>

            </div>

          </div>

          {/* Cement Details */}

          <div className="rounded-2xl bg-orange-50 p-5 sm:p-6">

            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Cement
            </h3>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-sm text-slate-500">
                  Cement Volume
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {cementVolume.toFixed(2)} m³
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Cement Weight
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {cementWeight.toFixed(1)} kg
                </p>
              </div>

            </div>

          </div>

          {/* Other Materials */}

          <div className="grid grid-cols-2 gap-4">

            {/* Sand */}

            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">

              <p className="text-sm text-slate-500">
                Sand
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                {sand.toFixed(2)} m³
              </h3>

            </div>

            {/* Aggregate */}

            <div className="rounded-2xl bg-slate-50 p-4 sm:p-5">

              <p className="text-sm text-slate-500">
                Aggregate
              </p>

              <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                {aggregate.toFixed(2)} m³
              </h3>

            </div>

          </div>

          {/* Water */}

          <div className="rounded-2xl bg-cyan-50 p-5 sm:p-6">

            <p className="text-sm font-medium text-slate-500">
              Water
            </p>

            <h3 className="mt-1 text-2xl font-black text-cyan-700 sm:text-3xl">
              {water.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} L
            </h3>

          </div>

          {/* Total Cost */}

          <div className="rounded-2xl bg-green-50 p-5 sm:p-6">

            <p className="text-sm font-medium text-slate-500">
              Total Material Cost
            </p>

            <h3 className="mt-1 text-2xl font-black text-green-700 sm:text-3xl">

              {currencySymbol}
              {totalCost.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}

            </h3>

          </div>

        </div>
      )}

    </section>
  );
}
