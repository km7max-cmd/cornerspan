"use client";

import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-4 w-full overflow-hidden rounded-3xl bg-white shadow-lg">

      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6"
      >
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Worked Concrete Calculation Example
        </h2>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-semibold text-slate-700">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* Content */}
      {open && (
        <div className="border-t border-slate-100 px-5 py-5 sm:px-6">

          <p className="mb-5 text-sm leading-6 text-slate-600 sm:text-base">
            The following example shows how concrete volume and material
            quantities can be estimated for a rectangular slab using a
            1:2:4 concrete mix ratio.
          </p>

          {/* Input Values */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

            <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
              Example Input
            </h3>

            <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-3">

              <div className="rounded-xl bg-white px-3 py-3">
                Length = <strong>10 m</strong>
              </div>

              <div className="rounded-xl bg-white px-3 py-3">
                Width = <strong>5 m</strong>
              </div>

              <div className="rounded-xl bg-white px-3 py-3">
                Depth = <strong>0.15 m</strong>
              </div>

            </div>

            <div className="mt-3 rounded-xl bg-white px-3 py-3 text-sm text-slate-700">
              Mix Ratio = <strong>1 : 2 : 4</strong>
            </div>

            <div className="my-5 h-px bg-slate-200" />

            {/* Steps */}
            <div className="space-y-3">

              {/* Step 1 */}
              <ExampleStep
                title="Step 1 – Concrete Volume"
                formula="10 × 5 × 0.15 = 7.50 m³"
              />

              {/* Step 2 */}
              <ExampleStep
                title="Step 2 – Dry Volume"
                formula="7.50 × 1.54 = 11.55 m³"
              />

              {/* Step 3 */}
              <ExampleStep
                title="Step 3 – Total Mix Ratio"
                formula="1 + 2 + 4 = 7"
              />

              {/* Step 4 */}
              <ExampleStep
                title="Step 4 – Cement Volume"
                formula="11.55 × (1 ÷ 7) = 1.65 m³"
              />

              {/* Step 5 */}
              <ExampleStep
                title="Step 5 – Cement Weight"
                formula="1.65 × 1440 = 2,376 kg"
              />

              {/* Step 6 */}
              <ExampleStep
                title="Step 6 – Cement Bags"
                formula="2,376 ÷ 50 = 47.52 → 48 bags"
              />

              {/* Step 7 */}
              <ExampleStep
                title="Step 7 – Sand Quantity"
                formula="11.55 × (2 ÷ 7) = 3.30 m³"
              />

              {/* Step 8 */}
              <ExampleStep
                title="Step 8 – Aggregate Quantity"
                formula="11.55 × (4 ÷ 7) = 6.60 m³"
              />

              {/* Step 9 */}
              <ExampleStep
                title="Step 9 – Water Requirement"
                formula="2,376 × 0.50 = 1,188 L"
              />

            </div>

          </div>

          {/* Result */}
          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:p-5">

            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Estimated Result
            </h3>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">

              <ResultItem
                label="Concrete Volume"
                value="7.50 m³"
              />

              <ResultItem
                label="Dry Volume"
                value="11.55 m³"
              />

              <ResultItem
                label="Cement"
                value="48 bags"
              />

              <ResultItem
                label="Sand"
                value="3.30 m³"
              />

              <ResultItem
                label="Aggregate"
                value="6.60 m³"
              />

              <ResultItem
                label="Water"
                value="1,188 L"
              />

            </div>

          </div>

          {/* Note */}
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">

            <p className="text-sm leading-6 text-amber-800">
              This is an example based on a 1:2:4 mix ratio and the
              calculation method used by this calculator. Actual concrete
              requirements can vary according to the specified mix design,
              materials, moisture conditions and project requirements.
            </p>

          </div>

        </div>
      )}

    </section>
  );
}


/* =====================================================
   Example Step
   ===================================================== */

function ExampleStep({
  title,
  formula,
}: {
  title: string;
  formula: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4">

      <h4 className="text-sm font-semibold text-slate-900 sm:text-base">
        {title}
      </h4>

      <code className="mt-2 block overflow-x-auto rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-blue-700">
        {formula}
      </code>

    </div>
  );
}


/* =====================================================
   Result Item
   ===================================================== */

function ResultItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white px-4 py-3">

      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-base font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}
