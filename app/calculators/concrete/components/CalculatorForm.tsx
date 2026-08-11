type Unit =
  | "Meter"
  | "Feet"
  | "Centimeter"
  | "Millimeter"
  | "Inch";

type ConcreteForm =
  | "Slab"
  | "Wall"
  | "Footer"
  | "Column"
  | "Curb, Gutter Barrier"
  | "Stairs";

type CalculatorFormProps = {
  concreteForm: ConcreteForm;
  setConcreteForm: (value: ConcreteForm) => void;

  length: string;
  width: string;
  depth: string;
  quantity: string;

  lengthUnit: Unit;
  widthUnit: Unit;
  depthUnit: Unit;

  cementPrice: string;
  sandPrice: string;
  aggregatePrice: string;

  cementUnit: string;
  sandUnit: string;
  aggregateUnit: string;

  currency: string;
  setCurrency: (value: string) => void;

  error: string;

  setLength: (value: string) => void;
  setWidth: (value: string) => void;
  setDepth: (value: string) => void;
  setQuantity: (value: string) => void;

  setLengthUnit: (value: Unit) => void;
  setWidthUnit: (value: Unit) => void;
  setDepthUnit: (value: Unit) => void;

  setCementPrice: (value: string) => void;
  setSandPrice: (value: string) => void;
  setAggregatePrice: (value: string) => void;

  setCementUnit: (value: string) => void;
  setSandUnit: (value: string) => void;
  setAggregateUnit: (value: string) => void;

  onCalculate: () => void;
};

const concreteForms: ConcreteForm[] = [
  "Slab",
  "Wall",
  "Footer",
  "Column",
  "Curb, Gutter Barrier",
  "Stairs",
];

const unitOptions = [
  { value: "Meter", label: "m" },
  { value: "Feet", label: "ft" },
  { value: "Centimeter", label: "cm" },
  { value: "Millimeter", label: "mm" },
  { value: "Inch", label: "in" },
];

export default function CalculatorForm({
  concreteForm,
  setConcreteForm,

  length,
  width,
  depth,
  quantity,

  lengthUnit,
  widthUnit,
  depthUnit,

  cementPrice,
  sandPrice,
  aggregatePrice,

  cementUnit,
  sandUnit,
  aggregateUnit,

  currency,
  setCurrency,

  error,

  setLength,
  setWidth,
  setDepth,
  setQuantity,

  setLengthUnit,
  setWidthUnit,
  setDepthUnit,

  setCementPrice,
  setSandPrice,
  setAggregatePrice,

  setCementUnit,
  setSandUnit,
  setAggregateUnit,

  onCalculate,
}: CalculatorFormProps) {
  const inputClass =
    "h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const selectClass =
    "h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-800";

  const dimensionSelectClass =
    "h-14 border-l border-slate-200 bg-transparent px-3 text-blue-700 outline-none";

  return (
    <section className="w-full overflow-hidden rounded-3xl bg-white shadow-lg">

      {/* =====================================================
          CHOOSE CONCRETE FORM
      ====================================================== */}

      <div className="p-5 sm:p-7">

        <div className="mb-5 flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600">
            ˄
          </span>

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Choose a concrete form
          </h2>
        </div>

        <label className={labelClass}>
          Concrete form
        </label>

        <select
          value={concreteForm}
          onChange={(e) =>
            setConcreteForm(
              e.target.value as ConcreteForm
            )
          }
          className={selectClass}
        >
          {concreteForms.map((form) => (
            <option key={form} value={form}>
              {form}
            </option>
          ))}
        </select>

        {/* Simple form preview */}
        <div className="mt-5 flex min-h-36 items-center justify-center rounded-2xl bg-slate-50 p-4">

          <div className="text-center">

            <div className="mx-auto mb-3 flex h-20 w-32 items-end justify-center">

              {concreteForm === "Column" ? (
                <div className="h-20 w-12 rounded-sm bg-slate-400 shadow-inner" />
              ) : concreteForm === "Wall" ? (
                <div className="h-14 w-32 rounded-sm bg-slate-400 shadow-inner" />
              ) : concreteForm === "Stairs" ? (
                <div className="flex h-16 w-32 items-end gap-1">
                  <div className="h-4 w-7 bg-slate-400" />
                  <div className="h-8 w-7 bg-slate-400" />
                  <div className="h-12 w-7 bg-slate-400" />
                  <div className="h-16 w-7 bg-slate-400" />
                </div>
              ) : concreteForm === "Footer" ? (
                <div className="h-10 w-32 rounded-sm border-4 border-slate-500 bg-slate-300" />
              ) : (
                <div className="h-8 w-32 -skew-x-12 rounded-sm bg-slate-400 shadow-inner" />
              )}

            </div>

            <p className="text-sm font-medium text-slate-500">
              {concreteForm}
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          DIMENSIONS
      ====================================================== */}

      <div className="border-t border-slate-100 p-5 sm:p-7">

        <div className="mb-5 flex items-center gap-3">
          <span className="text-xl font-bold text-blue-600">
            ˄
          </span>

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
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
                onChange={(e) =>
                  setLength(e.target.value)
                }
                placeholder="Enter length"
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
              />

              <select
                value={lengthUnit}
                onChange={(e) =>
                  setLengthUnit(
                    e.target.value as Unit
                  )
                }
                className={dimensionSelectClass}
              >
                {unitOptions.map((unit) => (
                  <option
                    key={unit.value}
                    value={unit.value}
                  >
                    {unit.label}
                  </option>
                ))}
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
                onChange={(e) =>
                  setWidth(e.target.value)
                }
                placeholder="Enter width"
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
              />

              <select
                value={widthUnit}
                onChange={(e) =>
                  setWidthUnit(
                    e.target.value as Unit
                  )
                }
                className={dimensionSelectClass}
              >
                {unitOptions.map((unit) => (
                  <option
                    key={unit.value}
                    value={unit.value}
                  >
                    {unit.label}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Depth / Height */}

          <div>
            <label className={labelClass}>
              {concreteForm === "Column" ||
              concreteForm === "Wall"
                ? "Height"
                : "Height / Depth"}
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

              <input
                type="number"
                min="0"
                step="any"
                value={depth}
                onChange={(e) =>
                  setDepth(e.target.value)
                }
                placeholder="Enter height / depth"
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
              />

              <select
                value={depthUnit}
                onChange={(e) =>
                  setDepthUnit(
                    e.target.value as Unit
                  )
                }
                className={dimensionSelectClass}
              >
                {unitOptions.map((unit) => (
                  <option
                    key={unit.value}
                    value={unit.value}
                  >
                    {unit.label}
                  </option>
                ))}
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
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
                placeholder="1"
              />

              <div className="flex items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                pieces
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* =====================================================
          CURRENCY
      ====================================================== */}

      <div className="border-t border-slate-100 p-5 sm:p-7">

        <label className={labelClass}>
          Currency
        </label>

        <select
          value={currency}
          onChange={(e) =>
            setCurrency(e.target.value)
          }
          className={selectClass}
        >
          <option value="USD">
            🇺🇸 US Dollar ($)
          </option>

          <option value="INR">
            🇮🇳 Indian Rupee (₹)
          </option>

          <option value="EUR">
            🇪🇺 Euro (€)
          </option>

          <option value="GBP">
            🇬🇧 British Pound (£)
          </option>

          <option value="AED">
            🇦🇪 UAE Dirham (AED)
          </option>

          <option value="AUD">
            🇦🇺 Australian Dollar (A$)
          </option>

          <option value="CAD">
            🇨🇦 Canadian Dollar (C$)
          </option>

        </select>

      </div>

      {/* =====================================================
          MATERIAL PRICES
      ====================================================== */}

      <div className="border-t border-slate-100 p-5 sm:p-7">

        <h3 className="mb-5 text-xl font-bold text-slate-900 sm:text-2xl">
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
                onChange={(e) =>
                  setCementPrice(
                    e.target.value
                  )
                }
                placeholder="450"
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
              />

              <select
                value={cementUnit}
                onChange={(e) =>
                  setCementUnit(e.target.value)
                }
                className={dimensionSelectClass}
              >
                <option value="Bag">
                  / Bag
                </option>
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
                onChange={(e) =>
                  setSandPrice(
                    e.target.value
                  )
                }
                placeholder="1800"
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
              />

              <select
                value={sandUnit}
                onChange={(e) =>
                  setSandUnit(e.target.value)
                }
                className={dimensionSelectClass}
              >
                <option value="m3">
                  / m³
                </option>

                <option value="ft3">
                  / ft³
                </option>
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
                onChange={(e) =>
                  setAggregatePrice(
                    e.target.value
                  )
                }
                placeholder="1400"
                className="h-14 min-w-0 flex-1 bg-transparent px-4 text-base text-slate-900 outline-none"
              />

              <select
                value={aggregateUnit}
                onChange={(e) =>
                  setAggregateUnit(
                    e.target.value
                  )
                }
                className={dimensionSelectClass}
              >
                <option value="m3">
                  / m³
                </option>

                <option value="ft3">
                  / ft³
                </option>
              </select>

            </div>
          </div>

        </div>

      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mx-5 mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600 sm:mx-7">
          {error}
        </div>
      )}

      {/* =====================================================
          CALCULATE
      ====================================================== */}

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
