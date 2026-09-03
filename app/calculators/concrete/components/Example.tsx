export default function Example() {
  return (
    <section
      className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby="concrete-calculator-example"
    >
      {/* HEADER */}

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
          See how the concrete calculator estimates volume and
          material quantities for a simple slab.
        </p>
      </div>

      {/* INPUTS */}

      <div className="px-5 py-5 sm:px-7 sm:py-7">
        <h3 className="text-lg font-black text-slate-900 sm:text-xl">
          Example Inputs
        </h3>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <InputItem label="Concrete Form" value="Slab" />
          <InputItem label="Length" value="5 m" />
          <InputItem label="Width" value="4 m" />
          <InputItem label="Thickness" value="0.15 m" />
          <InputItem label="Quantity" value="1" />
          <InputItem label="Concrete Mix" value="M20 — 1 : 1.5 : 3" />
        </div>

        {/* STEPS */}

        <div className="mt-7">
          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            Step-by-Step Calculation
          </h3>

          <div className="mt-4 space-y-3">
            <ExampleStep
              number="1"
              title="Calculate wet concrete volume"
              formula="5 × 4 × 0.15 = 3.00 m³"
            />

            <ExampleStep
              number="2"
              title="Calculate dry material volume"
              formula="3.00 × 1.54 = 4.62 m³"
            />

            <ExampleStep
              number="3"
              title="Calculate total mix ratio"
              formula="1 + 1.5 + 3 = 5.5"
            />

            <ExampleStep
              number="4"
              title="Calculate cement volume"
              formula="4.62 × (1 ÷ 5.5) = 0.84 m³"
            />

            <ExampleStep
              number="5"
              title="Calculate sand quantity"
              formula="4.62 × (1.5 ÷ 5.5) = 1.26 m³"
            />

            <ExampleStep
              number="6"
              title="Calculate aggregate quantity"
              formula="4.62 × (3 ÷ 5.5) = 2.52 m³"
            />

            <ExampleStep
              number="7"
              title="Calculate cement weight"
              formula="0.84 × 1440 = 1210.91 kg"
            />

            <ExampleStep
              number="8"
              title="Calculate cement bags"
              formula="1210.91 ÷ 50 = 24.22 → 25 bags"
            />

            <ExampleStep
              number="9"
              title="Calculate estimated water"
              formula="1210.91 × 0.50 = 605.45 L"
            />
          </div>
        </div>

        {/* RESULTS */}

        <div className="mt-7 rounded-2xl bg-blue-50 p-5">
          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            Estimated Result
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ResultItem
              label="Concrete Volume"
              value="3.00 m³"
            />

            <ResultItem
              label="Dry Material Volume"
              value="4.62 m³"
            />

            <ResultItem
              label="Cement"
              value="25 bags"
            />

            <ResultItem
              label="Sand"
              value="1.26 m³"
            />

            <ResultItem
              label="Aggregate"
              value="2.52 m³"
            />

            <ResultItem
              label="Water"
              value="605.5 L"
            />
          </div>
        </div>

        {/* NOTE */}

        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="text-base font-bold text-amber-900 sm:text-lg">
            Important
          </h3>

          <p className="mt-2 text-sm leading-6 text-amber-800 sm:text-base">
            This is a quantity-estimation example using the calculator's
            standard assumptions. Actual cement, sand, aggregate and water
            requirements can vary with the project-specific mix design,
            material properties, moisture, aggregate grading and construction
            requirements.
          </p>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   INPUT ITEM
========================================================= */

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


/* =========================================================
   EXAMPLE STEP
========================================================= */

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


/* =========================================================
   RESULT ITEM
========================================================= */

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
