
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
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
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
    <section
      className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60"
      aria-live="polite"
    >
      <header className="border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-blue-700">
          Concrete Estimate
        </p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Your Results
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Estimated quantities for your project
            </p>
          </div>
          {hasResult && (
            <span className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              Estimate
            </span>
          )}
        </div>
      </header>

      {!hasResult ? (
        <div className="px-5 py-12 text-center sm:py-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2M8 19h8" />
            </svg>
          </div>
          <h3 className="mt-4 font-bold text-slate-900">
            Ready to Calculate
          </h3>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
            Enter your dimensions and select Calculate to see the concrete
            volume and material estimates.
          </p>
        </div>
      ) : (
        <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">
          {/* Main volume */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-blue-50 to-white p-4 sm:p-6">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100/60" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                    <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
                  </svg>
                </span>
                <p className="text-sm font-semibold text-blue-900">
                  Concrete Volume
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
                <span className="text-4xl font-extrabold tracking-tight text-blue-800 sm:text-5xl">
                  {formatNumber(volumeYards)}
                </span>
                <span className="text-lg font-bold text-blue-800">yd³</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-blue-200/70 pt-3 text-sm font-medium text-slate-600">
                <span>{formatNumber(volumeFeet)} ft³</span>
                <span>{formatNumber(volume)} m³</span>
              </div>
            </div>
          </div>

          {/* Material quantities */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Material Estimate
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Approximate quantities
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                M³ / US units
              </span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <MaterialRow
                label="Dry Volume"
                value={formatNumber(dryYards)}
                unit="yd³"
                secondary={`${formatNumber(dryVolume)} m³`}
                tone="blue"
              />

              <MaterialRow
                label="Cement"
                value={String(cementBags)}
                unit="50 kg bags"
                tone="neutral"
              />

              <MaterialRow
                label="Sand"
                value={formatNumber(sandYards)}
                unit="yd³"
                secondary={`${formatNumber(sand)} m³`}
                tone="neutral"
              />

              <MaterialRow
                label="Aggregate"
                value={formatNumber(aggregateYards)}
                unit="yd³"
                secondary={`${formatNumber(aggregate)} m³`}
                tone="neutral"
              />

              <MaterialRow
                label="Water"
                value={formatNumber(waterGallons)}
                unit="US gal"
                secondary={`${formatNumber(water, 1)} L`}
                tone="neutral"
              />
            </div>

            <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500">
              Cement bags use the existing 50 kg cement-bag calculation.
              They are not 80 lb premixed concrete bags.
            </p>
          </div>

          {/* Cost */}
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white">
            <div className="border-b border-blue-50 bg-blue-50/70 px-4 py-3">
              <p className="text-sm font-semibold text-slate-700">
                Estimated Material Cost
              </p>
            </div>

            <div className="p-4">
              {hasMaterialPrices ? (
                <>
                  <p className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    {formatMoney(totalCost, currency)}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Based on the material prices and mix settings you entered.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-slate-800">
                    Add material prices
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Enter cement, sand and aggregate prices to estimate the
                    total cost.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Export actions */}
          <div>
            <div className="mb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Export Results
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Copy, share or save your calculation as a PDF.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
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

          <p className="border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
            Estimates are for planning purposes only. Actual material quantities
            depend on mix design, material yield, waste, and site conditions.
            Verify quantities before ordering concrete.
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
  tone = "neutral",
}: {
  label: string;
  value: string;
  unit: string;
  secondary?: string;
  tone?: "blue" | "neutral";
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-3.5 py-3 last:border-b-0 sm:px-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        {secondary && (
          <p className="mt-0.5 text-xs text-slate-500">{secondary}</p>
        )}
      </div>

      <div className="shrink-0 text-right">
        <span
          className={`text-sm font-bold tabular-nums sm:text-base ${
            tone === "blue" ? "text-blue-700" : "text-slate-900"
          }`}
        >
          {value}
        </span>
        <span className="ml-1 text-[11px] text-slate-500 sm:text-xs">
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
      className="flex min-h-[68px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-1.5 py-3 text-center text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:bg-blue-100 sm:min-h-[76px] sm:text-sm"
    >
      <span className="text-blue-700">{icon}</span>
      <span className="leading-4">{label}</span>
    </button>
  );
}
