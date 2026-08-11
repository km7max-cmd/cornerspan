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

const concreteForms = [
  "Slab",
  "Wall",
  "Footer",
  "Column",
  "Curb, Gutter Barrier",
  "Stairs",
];

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
    "mb-2 block text-base font-medium text-slate-800";

  return (
    <section className="w-full overflow-hidden rounded-3xl bg-white shadow-lg">

      {/* Choose Concrete Form */}
      <div className="p-5 sm:p-7">

        <div className="mb-5 flex items-center gap-3">
          <span className="text-2xl text-blue-600">⌃</span>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Choose a concrete form
          </h2>
        </div>

        <label className={labelClass}>
          Concrete form
        </label>

        <select
          className={selectClass}
          defaultValue="Slab"
        >
          {concreteForms.map((form) => (
            <option key={form} value={form}>
              {form}
            </option>
          ))}
        </select>

        {/* Simple Slab Diagram */}
        <div className="mt-6 flex justify-center rounded-2xl bg-slate-50 p-5">
          <svg
            viewBox="0 0 500 230"
            className="h-auto w-full max-w-md"
          >
            {/* Top */}
            <polygon
              points="110,65 350,65 410,25 170,25"
              fill="#d1d5db"
              stroke="#475569"
              strokeWidth="2"
            />

            {/* Front */}
            <polygon
              points="110,65 350,65 350,115 110,115"
              fill="#a3a3a3"
              stroke="#475569"
              strokeWidth="2"
            />

            {/* Side */}
            <polygon
              points="350,65 410,25 410,75 350,115"
              fill="#737373"
              stroke="#475569"
              strokeWidth="2"
            />

            {/* Length */}
            <line
              x1="110"
              y1="145"
              x2="350"
              y2="145"
              stroke="#2563eb"
              strokeWidth="3"
            />

            <text
              x="230"
              y="170"
              textAnchor="middle"
              fill="#2563eb"
              fontSize="16"
              fontWeight="600"
            >
              Length
            </text>

            {/* Width */}
            <line
              x1="360"
              y1="125"
              x2="420"
              y2="85"
              stroke="#2563eb"
              strokeWidth="3"
            />

            <text
              x="420"
              y="125"
              fill="#2563eb"
              fontSize="15"
              fontWeight="600"
            >
              Width
            </text>

            {/* Depth */}
            <line
              x1="90"
              y1="65"
              x2="90"
              y2="115"
              stroke="#2563eb"
              strokeWidth="3"
            />

            <text
              x="55"
              y="95"
              fill="#2563eb"
              fontSize="15"
              fontWeight="600"
            >
              Depth
            </text>
          </svg>
        </div>

      </div>

      {/* Dimensions */}
      <div className="border-t border-slate-100 p-5 sm:p-7">

        <div className="mb-5 flex items-center gap-3">
          <span className="text-2xl text-blue-600">⌃</span>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Dimensions
          </h2>
        </div>

        <div className="space-y-5">

          {/* Length */}
          <div>
            <label className={labelClass}>
              Length
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="Enter length"
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
              />

              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="h-14 border-l border-slate-200 bg-transparent px-3 text-blue-700 outline-none"
              >
                <option value="Meter">m</option>
                <option value="Feet">ft</option>
                <option value="Centimeter">cm</option>
                <option value="Millimeter">mm</option>
                <option value="Inch">in</option>
              </select>

            </div>
          </div>

          {/* Width */}
          <div>
            <label className={labelClass}>
              Width
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Enter width"
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
              />

              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="h-14 border-l border-slate-200 bg-transparent px-3 text-blue-700 outline-none"
              >
                <option value="Meter">m</option>
                <option value="Feet">ft</option>
                <option value="Centimeter">cm</option>
                <option value="Millimeter">mm</option>
                <option value="Inch">in</option>
              </select>

            </div>
          </div>

          {/* Depth */}
          <div>
            <label className={labelClass}>
              Height / Depth
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                placeholder="Enter depth"
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
              />

              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="h-14 border-l border-slate-200 bg-transparent px-3 text-blue-700 outline-none"
              >
                <option value="Meter">m</option>
                <option value="Feet">ft</option>
                <option value="Centimeter">cm</option>
                <option value="Millimeter">mm</option>
                <option value="Inch">in</option>
              </select>

            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className={labelClass}>
              Quantity
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
              />

              <div className="flex items-center border-l border-slate-200 px-4 text-slate-500">
                pieces
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Currency */}
      <div className="border-t border-slate-100 p-5 sm:p-7">

        <label className={labelClass}>
          Currency
        </label>

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

      {/* Material Prices */}
      <div className="border-t border-slate-100 p-5 sm:p-7">

        <h3 className="mb-5 text-2xl font-bold text-slate-900">
          Material Prices
        </h3>

        <div className="space-y-4">

          {/* Cement */}
          <div>
            <label className={labelClass}>
              Cement
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                value={cementPrice}
                onChange={(e) => setCementPrice(e.target.value)}
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
                placeholder="450"
              />

              <select className="h-14 border-l border-slate-200 bg-transparent px-3 text-blue-700 outline-none">
                <option>/ Bag</option>
              </select>

            </div>
          </div>

          {/* Sand */}
          <div>
            <label className={labelClass}>
              Sand
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                value={sandPrice}
                onChange={(e) => setSandPrice(e.target.value)}
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
                placeholder="1800"
              />

              <select className="h-14 border-l border-slate-200 bg-transparent px-3 text-blue-700 outline-none">
                <option>/ m³</option>
                <option>/ ft³</option>
              </select>

            </div>
          </div>

          {/* Aggregate */}
          <div>
            <label className={labelClass}>
              Aggregate
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                value={aggregatePrice}
                onChange={(e) => setAggregatePrice(e.target.value)}
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
                placeholder="1400"
              />

              <select className="h-14 border-l border-slate-200 bg-transparent px-3 text-blue-700 outline-none">
                <option>/ m³</option>
                <option>/ ft³</option>
              </select>

            </div>
          </div>

        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-5 mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600 sm:mx-7">
          {error}
        </div>
      )}

      {/* Calculate */}
      <div className="p-5 pt-0 sm:px-7 sm:pb-7">

        <button
          type="button"
          onClick={onCalculate}
          className="h-14 w-full rounded-xl bg-blue-600 text-lg font-semibold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99]"
        >
          Calculate
        </button>

      </div>

    </section>
  );
}
