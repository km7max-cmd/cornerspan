
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
  pdfLoading?: boolean;
};

const M3_TO_YD3 = 1.30795062;
const M3_TO_FT3 = 35.3146667;
const LITERS_TO_GALLONS = 0.264172052;

function formatNumber(value: number, digits = 2) {
  if (value !== 0 && Math.abs(value) < 10 ** -digits) return value.toLocaleString("en-US", { maximumSignificantDigits: 3 });
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
  pdfLoading = false,
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
      className="w-full min-w-0 self-start overflow-hidden rounded-2xl lg:sticky lg:top-24 border border-slate-200 bg-white shadow-sm shadow-slate-200/60"

    >
      <header className="hidden bg-slate-950 p-5 text-white sm:p-6 lg:block">
        <h2 className="text-xs font-bold uppercase tracking-widest text-blue-200">Concrete volume</h2>
        <output aria-live="polite" aria-atomic="true" className="mt-3 block break-all text-5xl font-bold tracking-tight tabular-nums">{hasResult ? formatNumber(volumeYards) : "—"} <span className="text-lg font-normal text-blue-200">yd³</span></output>
        <p className="mt-3 text-sm text-slate-300">{hasResult ? "Updates as you type · before any waste allowance" : "Enter positive dimensions to see your estimate."}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-700 pt-3 text-sm text-blue-100">
          <span>{hasResult ? formatNumber(volumeFeet) : "—"} ft³</span>
          <span>{hasResult ? formatNumber(volume, 3) : "—"} m³</span>
        </div>
      </header>
      {hasResult && (
        <div className="space-y-5 p-4 sm:p-6">
          <details>
            <summary className="mb-3 cursor-pointer text-sm font-semibold text-slate-700">View material quantities</summary>
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
                US Units
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
                value={String(Math.ceil(cementBags))}
                unit="94 lb bags"
                secondary="Standard US cement bag estimate"
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

            <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500">
              Cement is shown as 94 lb cement bags, not 80 lb bags of
              premixed concrete. Actual cement requirements depend on the
              specified mix design and material properties.
            </p>
          </details>

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
                    Based on the material prices entered. This estimate
                    excludes labor, delivery, tax, and other project costs.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-slate-800">
                    Add material prices
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Enter one or more material prices to estimate their cost.
                  </p>
                </>
              )}
            </div>
          </div>

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
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect x="8" y="8" width="12" height="12" rx="2" />
                    <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                  </svg>
                }
              />

              <ActionButton
                label="Share"
                onClick={onShare}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="m8.7 10.7 6.6-4.4m-6.6 9.4 6.6 2.6" />
                  </svg>
                }
              />

              <ActionButton
                label={pdfLoading ? "Preparing PDF…" : "Download PDF"}
                disabled={pdfLoading}
                onClick={onDownload}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4" />
                  </svg>
                }
              />
            </div>
          </div>

          <p className="border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
            Estimates are for planning purposes only. Actual material quantities
            depend on mix design, material yield, waste, and site conditions.
            Verify quantities with your concrete supplier or project
            specifications before ordering.
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
  disabled = false,
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-busy={disabled}
      className="flex min-h-[68px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-1.5 py-3 text-center text-xs font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:bg-blue-100 sm:min-h-[76px] sm:text-sm"
    >
      <span className="text-blue-700">{icon}</span>
      <span className="leading-4">{label}</span>
    </button>
  );
}


