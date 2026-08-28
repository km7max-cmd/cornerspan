type Props = {
  volume: number;
  dryVolume: number;
  cementBags: number;
  sand: number;
  aggregate: number;
  water: number;
  totalCost: number;
  currency: string;
  hasMaterialPrices: boolean;
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
  water,
  totalCost,
  currency,
  hasMaterialPrices,
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
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-100 px-5 py-5 sm:px-7">

        <div className="flex items-center justify-between gap-4">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
              Concrete Calculator
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Your Result
            </h2>
          </div>

          {hasResult && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-lg">
              ✓
            </div>
          )}

        </div>

      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!hasResult ? (

        <div className="p-5 sm:p-7">

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
              =
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Ready to Calculate
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Enter your concrete dimensions and tap Calculate
              to see the required concrete volume and materials.
            </p>

          </div>

        </div>

      ) : (

        <div className="p-5 sm:p-7">

          {/* =================================================
              PRIMARY RESULT
          ================================================= */}

          <div className="rounded-2xl bg-blue-50 px-5 py-6 sm:px-6 sm:py-7">

            <p className="text-sm font-semibold text-blue-700">
              Concrete Volume
            </p>

            <div className="mt-2 flex items-baseline gap-2">

              <span className="text-4xl font-black tracking-tight text-blue-700 sm:text-5xl">
                {volume.toFixed(2)}
              </span>

              <span className="text-lg font-bold text-blue-600">
                m³
              </span>

            </div>

            <p className="mt-2 text-xs text-blue-600 sm:text-sm">
              Required wet concrete volume
            </p>

          </div>

          {/* =================================================
              MATERIAL BREAKDOWN
          ================================================= */}

          <div className="mt-6">

            <div className="mb-3 flex items-center justify-between">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                Material Estimate
              </h3>

              <span className="text-xs font-medium text-slate-400">
                Estimated
              </span>

            </div>

            <div className="grid grid-cols-2 gap-3">

              {/* Dry Volume */}

              <ResultItem
                label="Dry Volume"
                value={dryVolume.toFixed(2)}
                unit="m³"
              />

              {/* Cement */}

              <ResultItem
                label="Cement"
                value={String(cementBags)}
                unit="bags"
              />

              {/* Sand */}

              <ResultItem
                label="Sand"
                value={sand.toFixed(2)}
                unit="m³"
              />

              {/* Aggregate */}

              <ResultItem
                label="Aggregate"
                value={aggregate.toFixed(2)}
                unit="m³"
              />

              {/* Water */}

              <div className="col-span-2">
                <ResultItem
                  label="Water"
                  value={water.toFixed(0)}
                  unit="L"
                  wide
                />
              </div>

            </div>

          </div>

          {/* =================================================
              MATERIAL COST
          ================================================= */}

          <div className="mt-6">

            {hasMaterialPrices ? (

              <div className="rounded-2xl bg-green-50 px-5 py-5">

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="text-sm font-semibold text-green-700">
                      Total Material Cost
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                      Cement + sand + aggregate
                    </p>
                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-black text-green-700 sm:text-3xl">
                      {currencySymbol}
                      {totalCost.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </p>

                  </div>

                </div>

              </div>

            ) : (

              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-5">

                <div className="flex gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm shadow-sm">
                    $
                  </div>

                  <div>

                    <p className="text-sm font-bold text-amber-900">
                      Material Cost
                    </p>

                    <p className="mt-1 text-sm leading-6 text-amber-700">
                      Enter cement, sand and aggregate prices
                      to calculate the total material cost.
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="mt-6">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Result Actions
            </p>

            <div className="grid grid-cols-3 gap-2">

              <ActionButton
                label="Copy"
                icon="⧉"
                onClick={onCopy}
              />

              <ActionButton
                label="Share"
                icon="↗"
                onClick={onShare}
              />

              <ActionButton
                label="PDF"
                icon="↓"
                onClick={onDownload}
              />

            </div>

          </div>

          {/* =================================================
              DISCLAIMER
          ================================================= */}

          <p className="mt-5 text-xs leading-5 text-slate-400">
            Material quantities are estimates and may vary based
            on mix design, material properties and site conditions.
          </p>

        </div>

      )}

    </section>
  );
}


/* =========================================================
   RESULT ITEM
========================================================= */

type ResultItemProps = {
  label: string;
  value: string;
  unit: string;
  wide?: boolean;
};

function ResultItem({
  label,
  value,
  unit,
  wide = false,
}: ResultItemProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 ${
        wide ? "flex items-center justify-between gap-4" : ""
      }`}
    >

      <div>

        <p className="text-xs font-medium text-slate-500 sm:text-sm">
          {label}
        </p>

        <div className="mt-1 flex items-baseline gap-1.5">

          <span className="text-xl font-black text-slate-900 sm:text-2xl">
            {value}
          </span>

          <span className="text-xs font-semibold text-slate-500 sm:text-sm">
            {unit}
          </span>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   ACTION BUTTON
========================================================= */

type ActionButtonProps = {
  label: string;
  icon: string;
  onClick: () => void;
};

function ActionButton({
  label,
  icon,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[52px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
    >

      <span className="text-lg leading-none">
        {icon}
      </span>

      <span className="mt-1 text-xs font-bold">
        {label}
      </span>

    </button>
  );
}
