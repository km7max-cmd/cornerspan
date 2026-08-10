type CalculatorFormProps = {
  length: string;
  width: string;
  depth: string;
  quantity: string;

  cementPrice: string;
  sandPrice: string;
  aggregatePrice: string;
  currency: string;
  setCurrency: (value: string) => void;

  unit: string;
  error: string;

  setLength: (value: string) => void;
  setWidth: (value: string) => void;
  setDepth: (value: string) => void;
  setQuantity: (value: string) => void;

  setCementPrice: (value: string) => void;
  setSandPrice: (value: string) => void;
  setAggregatePrice: (value: string) => void;

  setUnit: (value: string) => void;

  onCalculate: () => void;
};

export default function CalculatorForm({
  length,
  width,
  depth,
  quantity,
  cementPrice,
  sandPrice,
  aggregatePrice,
  currency,
  setCurrency,
  setCementPrice,
  setSandPrice,
  setAggregatePrice,
  unit,
  error,
  setLength,
  setWidth,
  setDepth,
  setQuantity,
  setUnit,
  onCalculate,
}: CalculatorFormProps) {
  const inputClass =
    "h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const selectClass =
    "h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-800";

  return (
    <section className="w-full rounded-3xl bg-white p-5 shadow-lg sm:p-7">

      <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Concrete Dimensions
      </h2>

      <div className="space-y-5">

        {/* Length */}
        <div>
          <label className={labelClass}>Length</label>

          <input
            type="number"
            min="0"
            step="any"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="Enter length"
            className={inputClass}
          />
        </div>

        {/* Width */}
        <div>
          <label className={labelClass}>Width</label>

          <input
            type="number"
            min="0"
            step="any"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Enter width"
            className={inputClass}
          />
        </div>

        {/* Depth */}
        <div>
          <label className={labelClass}>Depth</label>

          <input
            type="number"
            min="0"
            step="any"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder="Enter depth"
            className={inputClass}
          />
        </div>

        {/* Quantity */}
        <div>
          <label className={labelClass}>Quantity</label>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="1"
            className={inputClass}
          />
        </div>

        {/* Unit */}
        <div>
          <label className={labelClass}>Unit</label>

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className={selectClass}
          >
            <option value="Meter">Meters (m)</option>
            <option value="Feet">Feet (ft)</option>
            <option value="Centimeter">Centimeters (cm)</option>
            <option value="Millimeter">Millimeters (mm)</option>
            <option value="Inch">Inches (in)</option>
          </select>
        </div>

        {/* Material Prices */}
        <div className="border-t border-slate-100 pt-5">

          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Material Prices
          </h3>

          <div className="space-y-5">

            {/* Cement */}
            <div>
              <label className={labelClass}>
                Cement Price / Bag
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={cementPrice}
                onChange={(e) => setCementPrice(e.target.value)}
                placeholder="450"
                className={inputClass}
              />
            </div>

            {/* Sand */}
            <div>
              <label className={labelClass}>
                Sand Price / m³
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={sandPrice}
                onChange={(e) => setSandPrice(e.target.value)}
                placeholder="1800"
                className={inputClass}
              />
            </div>

            {/* Aggregate */}
            <div>
              <label className={labelClass}>
                Aggregate Price / m³
              </label>

              <input
                type="number"
                min="0"
                step="any"
                value={aggregatePrice}
                onChange={(e) => setAggregatePrice(e.target.value)}
                placeholder="1400"
                className={inputClass}
              />
            </div>

          </div>
        </div>

        {/* Currency */}
        <div>
          <label className={labelClass}>Currency</label>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={selectClass}
          >
            <option value="USD">🇺🇸 US Dollar ($)</option>
            <option value="INR">🇮🇳 Indian Rupee (₹)</option>
            <option value="EUR">🇪🇺 Euro (€)</option>
            <option value="GBP">🇬🇧 British Pound (£)</option>
            <option value="AED">🇦🇪 UAE Dirham (AED)</option>
            <option value="AUD">🇦🇺 Australian Dollar (A$)</option>
            <option value="CAD">🇨🇦 Canadian Dollar (C$)</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Calculate */}
        <button
          type="button"
          onClick={onCalculate}
          className="h-14 w-full rounded-xl bg-blue-600 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99]"
        >
          Calculate
        </button>

      </div>
    </section>
  );
}
