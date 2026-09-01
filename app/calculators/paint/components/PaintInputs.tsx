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
    <div className="space-y-6">

      {/* Paint Job */}
      <div>
        <label className="mb-2 block font-semibold text-slate-800">
          Paint Job
        </label>

        <select
          className="w-full rounded-lg border border-slate-300 bg-white p-3"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="room">Room</option>
          <option value="walls">Walls</option>
          <option value="ceiling">Ceiling</option>
        </select>
      </div>

      {/* Units */}
      <div>
        <label className="mb-2 block font-semibold text-slate-800">
          Units
        </label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="unit"
              value="us"
              checked={unit === "us"}
              onChange={(e) => setUnit(e.target.value)}
            />
            US
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="unit"
              value="metric"
              checked={unit === "metric"}
              onChange={(e) => setUnit(e.target.value)}
            />
            Metric
          </label>
        </div>
      </div>

      {/* Room Dimensions */}
      <fieldset className="rounded-xl border border-slate-300 p-4">
        <legend className="px-2 text-lg font-semibold">
          Room Dimensions
        </legend>

        <div className="space-y-4">

          <div>
            <label className="mb-1 block text-sm font-medium">
              Length
            </label>

            <div className="flex gap-2">
              <input
                className="w-full rounded-lg border border-slate-300 p-3"
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />

              <span className="flex items-center rounded-lg border bg-slate-50 px-4">
                {unit === "us" ? "ft" : "m"}
              </span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Width
            </label>

            <div className="flex gap-2">
              <input
                className="w-full rounded-lg border border-slate-300 p-3"
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />

              <span className="flex items-center rounded-lg border bg-slate-50 px-4">
                {unit === "us" ? "ft" : "m"}
              </span>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Wall Height
            </label>

            <div className="flex gap-2">
              <input
                className="w-full rounded-lg border border-slate-300 p-3"
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Wall height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />

              <span className="flex items-center rounded-lg border bg-slate-50 px-4">
                {unit === "us" ? "ft" : "m"}
              </span>
            </div>
          </div>

        </div>
      </fieldset>

      {/* Openings */}
      <fieldset className="rounded-xl border border-slate-300 p-4">
        <legend className="px-2 text-lg font-semibold">
          Openings to Subtract
        </legend>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          <div>
            <label className="mb-1 block text-sm font-medium">
              How many doors
            </label>

            <input
              className="w-full rounded-lg border border-slate-300 p-3"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={doors}
              onChange={(e) => setDoors(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              How many windows
            </label>

            <input
              className="w-full rounded-lg border border-slate-300 p-3"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={windows}
              onChange={(e) => setWindows(e.target.value)}
            />
          </div>

        </div>
      </fieldset>

      {/* Paint Specs */}
      <fieldset className="rounded-xl border border-slate-300 p-4">
        <legend className="px-2 text-lg font-semibold">
          Paint Specs
        </legend>

        <div className="space-y-4">

          <div>
            <label className="mb-1 block text-sm font-medium">
              How many coats
            </label>

            <input
              className="w-full rounded-lg border border-slate-300 p-3"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={coats}
              onChange={(e) => setCoats(e.target.value)}
            />

            <p className="mt-1 text-sm text-slate-500">
              Typically 2 coats
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Coverage per gallon
            </label>

            <div className="flex gap-2">
              <input
                className="w-full rounded-lg border border-slate-300 p-3"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={coverage}
                onChange={(e) => setCoverage(e.target.value)}
              />

              <span className="flex items-center rounded-lg border bg-slate-50 px-4">
                {unit === "us" ? "ft²" : "m²"}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Typically 350–400 sq ft
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Cost per gallon
            </label>

            <div className="flex items-center gap-2">
              <span className="text-lg">$</span>

              <input
                className="w-full rounded-lg border border-slate-300 p-3"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="45.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

        </div>
      </fieldset>

      {/* Labor */}
      <fieldset className="rounded-xl border border-slate-300 p-4">
        <legend className="px-2 text-lg font-semibold">
          Labor Estimate{" "}
          <span className="text-sm font-normal text-slate-500">
            optional
          </span>
        </legend>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Labor price per square foot
          </label>

          <div className="flex items-center gap-2">
            <span className="text-lg">$</span>

            <input
              className="w-full rounded-lg border border-slate-300 p-3"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="0.00"
              value={laborPrice}
              onChange={(e) => setLaborPrice(e.target.value)}
            />
          </div>
        </div>
      </fieldset>

    </div>
  );
}
