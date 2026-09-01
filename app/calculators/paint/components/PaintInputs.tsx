"use client";

type PaintInputsProps = {
  jobType: string;
  setJobType: (value: string) => void;
  unit: string;
  setUnit: (value: string) => void;
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
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-600">
        {label}
      </label>

      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
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
          <span className="flex items-center border-l border-slate-200 px-3 text-sm font-semibold text-slate-500">
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
    <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50">
      <button
        type="button"
        onClick={() => setValue(String(Math.max(0, number - 1)))}
        className="h-11 w-11 text-xl font-semibold text-slate-500 hover:bg-slate-100"
        aria-label="Decrease"
      >
        −
      </button>

      <span className="min-w-10 text-center font-bold text-slate-900">
        {number}
      </span>

      <button
        type="button"
        onClick={() => setValue(String(number + 1))}
        className="h-11 w-11 text-xl font-semibold text-blue-600 hover:bg-blue-50"
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

export default function PaintInputs({
  jobType,
  setJobType,
  unit,
  setUnit,
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
  return (
    <div className="space-y-5">

      {/* Smart intro */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl">
            ✨
          </div>

          <div>
            <p className="font-bold">Smart Paint Estimate</p>
            <p className="text-sm text-blue-100">
              Tell us about your space
            </p>
          </div>
        </div>
      </div>

      {/* Job type */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-700">
            What are you painting?
          </label>

          <div className="flex rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setUnit("us")}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
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
              className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
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
            ["ceiling", "⬜", "Ceiling"],
          ].map(([value, icon, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setJobType(value)}
              className={`rounded-xl border px-2 py-3 text-sm font-semibold transition ${
                jobType === value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              <span className="mr-1">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-4">
          <p className="font-bold text-slate-900">
            📐 Space dimensions
          </p>
          <p className="text-xs text-slate-500">
            Enter your room measurements
          </p>
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
          <div className="mb-3">
            <p className="font-bold text-slate-900">
              🚪 Openings
            </p>
            <p className="text-xs text-slate-500">
              We'll subtract these areas
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5">
              <span className="text-sm font-medium text-slate-700">
                Doors
              </span>
              <Counter value={doors} setValue={setDoors} />
            </div>

            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5">
              <span className="text-sm font-medium text-slate-700">
                Windows
              </span>
              <Counter value={windows} setValue={setWindows} />
            </div>
          </div>
        </div>
      )}

      {/* Paint settings */}
      <details className="group rounded-2xl border border-slate-200 bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between p-4">
          <div>
            <p className="font-bold text-slate-900">
              ⚙️ Paint settings
            </p>
            <p className="text-xs text-slate-500">
              Coats, coverage & pricing
            </p>
          </div>

          <span className="text-slate-400 transition group-open:rotate-180">
            ↓
          </span>
        </summary>

        <div className="grid gap-4 border-t border-slate-100 p-4 sm:grid-cols-3">
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
            unit="$"
            placeholder="45"
          />

          <div className="sm:col-span-3">
            <Field
              label="Labor / sq ft (optional)"
              value={laborPrice}
              onChange={setLaborPrice}
              unit="$"
              placeholder="0"
            />
          </div>
        </div>
      </details>

    </div>
  );
}
