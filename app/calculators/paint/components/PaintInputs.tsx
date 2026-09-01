"use client";

type CurrencyCode =
  | "USD"
  | "INR"
  | "EUR"
  | "GBP"
  | "AED"
  | "AUD"
  | "CAD"
  | "JPY"
  | "SAR";

type PaintInputsProps = {
  jobType: string;
  setJobType: (value: string) => void;

  unit: string;
  setUnit: (value: string) => void;

  currency: CurrencyCode;
  setCurrency: (value: CurrencyCode) => void;
  currencySymbol: string;

  length: string;
  setLength: (value: string) => void;

  width: string;
  setWidth: (value: string) => void;

  height: string;
  setHeight: (value: string) => void;

  doors: string;
  setDoors: (value: string) => void;

  windows: string;
  setWindows: (value: string) => void;

  coats: string;
  setCoats: (value: string) => void;

  coverage: string;
  setCoverage: (value: string) => void;

  price: string;
  setPrice: (value: string) => void;

  laborPrice: string;
  setLaborPrice: (value: string) => void;
};

function Field({
  label,
  value,
  onChange,
  unit,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit?: string;
  placeholder?: string;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-1.5 block text-sm font-medium text-slate-600">
        {label}
      </label>

      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
        <input
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base font-semibold text-slate-900 outline-none placeholder:text-slate-400"
        />

        {unit && (
          <span className="flex shrink-0 items-center border-l border-slate-200 px-3 text-sm font-semibold text-slate-500">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function Counter({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  const number = Math.max(0, Number(value) || 0);

  return (
    <div className="flex shrink-0 items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
      <button
        type="button"
        onClick={() =>
          setValue(String(Math.max(0, number - 1)))
        }
        className="h-11 w-10 text-xl font-medium text-slate-500 transition hover:bg-slate-100 active:scale-95"
        aria-label="Decrease"
      >
        −
      </button>

      <span className="min-w-10 text-center text-sm font-bold text-slate-900">
        {number}
      </span>

      <button
        type="button"
        onClick={() =>
          setValue(String(number + 1))
        }
        className="h-11 w-10 text-xl font-medium text-blue-600 transition hover:bg-blue-50 active:scale-95"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

const currencies: {
  code: CurrencyCode;
  name: string;
}[] = [
  { code: "USD", name: "US Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "AED", name: "UAE Dirham" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "SAR", name: "Saudi Riyal" },
];

export default function PaintInputs({
  jobType,
  setJobType,
  unit,
  setUnit,
  currency,
  setCurrency,
  currencySymbol,
  length,
  setLength,
  width,
  setWidth,
  height,
  setHeight,
  doors,
  setDoors,
  windows,
  setWindows,
  coats,
  setCoats,
  coverage,
  setCoverage,
  price,
  setPrice,
  laborPrice,
  setLaborPrice,
}: PaintInputsProps) {
  const dimensionsComplete =
    Number(length) > 0 &&
    Number(width) > 0 &&
    Number(height) > 0;

  const getStatus = () => {
    if (!length && !width && !height) {
      return "Start with your space";
    }

    if (!dimensionsComplete) {
      return "Almost there — add the missing dimensions";
    }

    if (jobType === "ceiling") {
      return "Space ready — check your paint settings";
    }

    return "Space understood — refine openings if needed";
  };

  return (
    <div className="space-y-4">

      {/* Smart Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-4 text-white shadow-lg shadow-blue-500/15">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl ring-1 ring-white/20">
            ✨
          </div>

          <div className="min-w-0">
            <p className="font-bold">
              Smart Paint Estimate
            </p>

            <p className="text-sm text-blue-100">
              {getStatus()}
            </p>
          </div>

          <div className="ml-auto hidden rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-100 sm:block">
            Smart
          </div>
        </div>

        <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-white/15">
          <div
            className={`h-full rounded-full bg-white transition-all duration-500 ${
              dimensionsComplete
                ? "w-full"
                : length || width || height
                  ? "w-2/3"
                  : "w-1/4"
            }`}
          />
        </div>
      </div>

      {/* Job Type + Units */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="font-bold text-slate-900">
              What are you painting?
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              Choose the area you want to estimate
            </p>
          </div>

          <div className="flex shrink-0 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setUnit("us")}
              className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
                unit === "us"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              US
            </button>

            <button
              type="button"
              onClick={() => setUnit("metric")}
              className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
                unit === "metric"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Metric
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            ["room", "🏠", "Room"],
            ["walls", "🧱", "Walls"],
            ["ceiling", "◻️", "Ceiling"],
          ].map(([value, icon, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setJobType(value)}
              className={`rounded-xl border px-2 py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
                jobType === value
                  ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              }`}
            >
              <span className="mr-1">
                {icon}
              </span>

              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
            📐
          </div>

          <div>
            <p className="font-bold text-slate-900">
              Space dimensions
            </p>

            <p className="text-xs text-slate-500">
              Tell us the size of your space
            </p>
          </div>

          {dimensionsComplete && (
            <div className="ml-auto font-bold text-green-600">
              ✓
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <Field
            label="Length"
            value={length}
            onChange={setLength}
            unit={unit === "us" ? "ft" : "m"}
            placeholder="12"
          />

          <Field
            label="Width"
            value={width}
            onChange={setWidth}
            unit={unit === "us" ? "ft" : "m"}
            placeholder="10"
          />

          <Field
            label="Height"
            value={height}
            onChange={setHeight}
            unit={unit === "us" ? "ft" : "m"}
            placeholder="8"
          />
        </div>
      </div>

      {/* Openings */}
      {jobType !== "ceiling" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-3 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-lg">
              🚪
            </div>

            <div>
              <p className="font-bold text-slate-900">
                Openings
              </p>

              <p className="text-xs text-slate-500">
                We'll automatically subtract these areas
              </p>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
              <span className="text-sm font-medium text-slate-700">
                Doors
              </span>

              <Counter
                value={doors}
                setValue={setDoors}
              />
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2">
              <span className="text-sm font-medium text-slate-700">
                Windows
              </span>

              <Counter
                value={windows}
                setValue={setWindows}
              />
            </div>
          </div>
        </div>
      )}

      {/* Paint Settings */}
      <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center gap-3 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
            ⚙️
          </div>

          <div className="min-w-0">
            <p className="font-bold text-slate-900">
              Paint settings
            </p>

            <p className="text-xs text-slate-500">
              Coats, coverage, pricing & labor
            </p>
          </div>

          <span className="ml-auto text-slate-400 transition-transform duration-200 group-open:rotate-180">
            ↓
          </span>
        </summary>

        <div className="border-t border-slate-100 p-4">
          <div className="space-y-4">

            {/* Currency */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-600">
                Currency
              </label>

              <select
                value={currency}
                onChange={(e) =>
                  setCurrency(
                    e.target.value as CurrencyCode
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              >
                {currencies.map((item) => (
                  <option
                    key={item.code}
                    value={item.code}
                  >
                    {item.code} — {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Coats"
                value={coats}
                onChange={setCoats}
                placeholder="2"
              />

              <Field
                label="Coverage / gallon"
                value={coverage}
                onChange={setCoverage}
                unit={unit === "us" ? "ft²" : "m²"}
                placeholder="350"
              />

              <Field
                label="Price / gallon"
                value={price}
                onChange={setPrice}
                unit={currencySymbol}
                placeholder="45"
              />
            </div>

            <Field
              label="Labor / sq ft"
              value={laborPrice}
              onChange={setLaborPrice}
              unit={currencySymbol}
              placeholder="Optional"
            />

            <p className="text-xs leading-5 text-slate-400">
              Enter local paint and labor prices in your
              selected currency. No exchange-rate conversion
              is applied.
            </p>
          </div>
        </div>
      </details>

    </div>
  );
}
