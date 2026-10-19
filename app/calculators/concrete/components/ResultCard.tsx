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

const M3_TO_YD3 = 1.30795062;
const M3_TO_FT3 = 35.3146667;
const LITERS_TO_GALLONS = 0.264172052;

function formatNumber(value: number, digits = 2) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

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
  const hasResult = volume > 0;

  const volumeYards = volume * M3_TO_YD3;
  const volumeFeet = volume * M3_TO_FT3;

  const dryYards = dryVolume * M3_TO_YD3;
  const sandYards = sand * M3_TO_YD3;
  const aggregateYards = aggregate * M3_TO_YD3;

  const waterGallons = water * LITERS_TO_GALLONS;

  return (
    <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
      <header className="border-b border-slate-200 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
          CONCRETE ESTIMATE
        </p>

        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
          Your Results
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Estimated quantities for your project
        </p>
      </header>

      {!hasResult ? (
        <div className="px-5 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2M8 19h8" />
            </svg>
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Ready to Calculate
          </h3>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
            Enter your dimensions and select Calculate to see
            the concrete volume and material estimates.
          </p>
        </div>
      ) : (
        <div className="space-y-6 p-5">
          {/* Main result */}

          <div className="rounded-lg bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-900">
              Concrete Volume
            </p>

            <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-bold tracking-tight text-blue-800 sm:text-5xl">
                {formatNumber(volumeYards)}
              </span>

              <span className="text-lg font-semibold text-blue-800">
                yd³
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 border-t border-blue-100 pt-3 text-sm text-blue-900">
              <span>
                {formatNumber(volumeFeet)} ft³
              </span>

              <span>
                {formatNumber(volume)} m³
              </span>
            </div>
          </div>

          {/* Material estimates */}

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">
                Material Estimate
              </h3>

              <span className="text-xs text-slate-500">
                Approximate
              </span>
            </div>

            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              <MaterialRow
                label="Dry Volume"
                value={formatNumber(dryYards)}
                unit="yd³"
                secondary={`${formatNumber(dryVolume)} m³`}
              />

              <MaterialRow
                label="Cement"
                value={String(cementBags)}
                unit="50 kg bags"
              />

              <MaterialRow
                label="Sand"
                value={formatNumber(sandYards)}
                unit="yd³"
                secondary={`${formatNumber(sand)} m³`}
              />

              <MaterialRow
                label="Aggregate"
                value={formatNumber(aggregateYards)}
                unit="yd³"
                secondary={`${formatNumber(aggregate)} m³`}
              />

              <MaterialRow
                label="Water"
                value={formatNumber(waterGallons)}
                unit="US gal"
                secondary={`${formatNumber(water, 1)} L`}
              />
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Cement bags use the existing 50 kg cement-bag
              calculation. They are not 80 lb premixed concrete bags.
            </p>
          </div>

          {/* Estimated cost */}

          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-sm font-medium text-slate-600">
              Estimated Material Cost
            </p>

            {hasMaterialPrices ? (
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {formatMoney(totalCost, currency)}
              </p>
            ) : (
              <>
                <p className="mt-1 text-lg font-semibold text-slate-700">
                  Add material prices
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Enter material prices in the calculator to
                  estimate the total cost.
                </p>
              </>
            )}

            <p className="mt-2 text-xs text-slate-500">
              Based on the prices and mix settings you enter.
            </p>
          </div>

          {/* Actions */}

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Export Results
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <ActionButton
                label="Copy"
                onClick={onCopy}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                    <rect x="8" y="8" width="12" height="12" rx="2" />
                    <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                  </svg>
                }
              />

              <ActionButton
                label="Share"
                onClick={onShare}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="m8.7 10.7 6.6-4.4m-6.6 9.4 6.6 2.6" />
                  </svg>
                }
              />

              <ActionButton
                label="Download PDF"
                onClick={onDownload}
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
                    <path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Disclaimer */}

          <p className="text-xs leading-5 text-slate-500">
            Estimates are for planning purposes only. Actual
            material quantities depend on mix design, material
            yield, waste, and site conditions. Verify quantities
            before ordering concrete.
          </p>
        </div>
      )}
    </section>
  );
}

function MaterialRow({
  label,
  value,
  unit,
  secondary,
}: {
  label: string;
  value: string;
  unit: string;
  secondary?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-700">
          {label}
        </p>

        {secondary && (
          <p className="mt-0.5 text-xs text-slate-500">
            {secondary}
          </p>
        )}
      </div>

      <div className="shrink-0 text-right">
        <span className="font-semibold tabular-nums text-slate-900">
          {value}
        </span>

        <span className="ml-1 text-xs text-slate-500">
          {unit}
        </span>
      </div>
    </div>
  );
}

function ActionButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-3 text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:bg-blue-100"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
