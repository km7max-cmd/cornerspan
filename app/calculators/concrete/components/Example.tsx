
export default function Example() {
  return (
    <section
      className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby="concrete-calculator-example"
    >
      <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          Worked Example
        </p>

        <h2
          id="concrete-calculator-example"
          className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
        >
          Concrete Calculation Example
        </h2>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          Learn how to estimate concrete volume and material quantities
          for a residential concrete slab using US customary units.
        </p>
      </div>

      <div className="px-5 py-5 sm:px-7 sm:py-7">
        <h3 className="text-lg font-black text-slate-900 sm:text-xl">
          Example Inputs
        </h3>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <InputItem label="Concrete Form" value="Slab" />
          <InputItem label="Length" value="10 ft" />
          <InputItem label="Width" value="10 ft" />
          <InputItem label="Thickness" value="4 in" />
          <InputItem label="Quantity" value="1" />
          <InputItem label="Illustrative Mix Ratio" value="1 : 2 : 4" />
        </div>

        <div className="mt-7">
          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            Step-by-Step Calculation
          </h3>

          <div className="mt-4 space-y-3">
            <ExampleStep
              number="1"
              title="Calculate wet concrete volume"
              formula="10 × 10 × (4 ÷ 12) = 33.33 ft³"
            />

            <ExampleStep
              number="2"
              title="Convert to cubic yards"
              formula="33.33 ÷ 27 ≈ 1.23 yd³"
            />

            <ExampleStep
              number="3"
              title="Estimate dry material volume"
              formula="0.943 m³ × 1.54 ≈ 1.45 m³"
            />

            <ExampleStep
              number="4"
              title="Calculate total mix ratio"
              formula="1 + 2 + 4 = 7"
            />

            <ExampleStep
              number="5"
              title="Estimate cement volume"
              formula="1.45 × (1 ÷ 7) ≈ 0.207 m³"
            />

            <ExampleStep
              number="6"
              title="Estimate cement weight"
              formula="0.207 × 1440 ≈ 298 kg ≈ 657 lb"
            />

            <ExampleStep
              number="7"
              title="Estimate 94 lb cement bags"
              formula="657 ÷ 94 ≈ 6.99 → 7 bags"
            />

            <ExampleStep
              number="8"
              title="Estimate sand volume"
              formula="1.45 × (2 ÷ 7) ≈ 0.415 m³ ≈ 0.54 yd³"
            />

            <ExampleStep
              number="9"
              title="Estimate aggregate volume"
              formula="1.45 × (4 ÷ 7) ≈ 0.829 m³ ≈ 1.08 yd³"
            />

            <ExampleStep
              number="10"
              title="Estimate mixing water"
              formula="298 × 0.50 ≈ 149 L ≈ 39.4 US gal"
            />
          </div>
        </div>

        <div className="mt-7 rounded-2xl bg-blue-50 p-5">
          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            Estimated Result
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ResultItem
              label="Concrete Volume"
              value="1.23 yd³"
            />

            <ResultItem
              label="Concrete Volume"
              value="33.33 ft³"
            />

            <ResultItem
              label="Dry Material Volume"
              value="1.45 m³"
            />

            <ResultItem
              label="Cement"
              value="7 bags (94 lb)"
            />

            <ResultItem
              label="Sand"
              value="0.54 yd³"
            />

            <ResultItem
              label="Aggregate"
              value="1.08 yd³"
            />

            <ResultItem
              label="Water"
              value="39.4 US gal"
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="text-base font-bold text-amber-900 sm:text-lg">
            Important
          </h3>

          <p className="mt-2 text-sm leading-6 text-amber-800 sm:text-base">
            This is an illustrative material estimate, not a guaranteed
            ready-mix order quantity or structural mix design. A 1:2:4
            ratio is used only to demonstrate the arithmetic. Actual
            concrete mix proportions, cement requirements, water content
            and aggregate quantities depend on the specified mix design
            and material properties. Confirm ordering quantities with
            your concrete supplier.
          </p>
        </div>
      </div>
    </section>
  );
}

function InputItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-base font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

function ExampleStep({
  number,
  title,
  formula,
}: {
  number: string;
  title: string;
  formula: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
          {number}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-slate-900 sm:text-base">
            {title}
          </h4>

          <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white px-3 py-2.5">
            <code className="block whitespace-normal break-words text-sm font-semibold leading-6 text-blue-700 sm:text-base">
              {formula}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white px-4 py-3">
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-base font-black text-slate-900 sm:text-lg">
        {value}
      </p>
    </div>
  );
}
