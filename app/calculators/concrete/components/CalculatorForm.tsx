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
  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Concrete Dimensions
      </h2>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Length
          </label>

          <input
            type="number"
            min="0"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="Enter length"
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Width
          </label>

          <input
            type="number"
            min="0"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Enter width"
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Depth
          </label>

          <input
            type="number"
            min="0"
            step="any"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder="Enter depth"
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        <div>
  <label className="mb-2 block text-sm font-semibold">
    Quantity
  </label>

  <input
    type="number"
    min="1"
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    placeholder="Enter quantity"
    className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
  />
</div>

        <div>
  <label className="mb-2 block text-sm font-semibold">
    Cement Price / Bag
  </label>

  <input
    type="number"
    value={cementPrice}
    onChange={(e) => setCementPrice(e.target.value)}
    placeholder="450"
    className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
  />
</div>

<div>
  <label className="mb-2 block text-sm font-semibold">
    Sand Price / m³
  </label>

  <input
    type="number"
    value={sandPrice}
    onChange={(e) => setSandPrice(e.target.value)}
    placeholder="1800"
    className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
  />
</div>

<div>
  <label className="mb-2 block text-sm font-semibold">
    Aggregate Price / m³
  </label>

  <input
    type="number"
    value={aggregatePrice}
    onChange={(e) => setAggregatePrice(e.target.value)}
    placeholder="1400"
    className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
  />
</div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Unit
          </label>

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          >
            <option value="Meter">Meter</option>
            <option value="Feet">Feet</option>
            <option value="Centimeter">Centimeter</option>
            <option value="Millimeter">Millimeter</option>
            <option value="Inch">Inch</option>
          </select>
        </div>
        <div>
  <label className="mb-2 block text-sm font-semibold">
    Currency
  </label>

  <select
    value={currency}
    onChange={(e) => setCurrency(e.target.value)}
    className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
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

        {error && (
          <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={onCalculate}
          className="h-12 w-full rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
        >
          Calculate
        </button>

      </div>

    </section>
  );
}
