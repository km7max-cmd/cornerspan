"use client";

import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
        aria-expanded={open}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            Example
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Worked Calculation
          </h2>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            See a complete concrete calculation step by step.
          </p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-semibold text-slate-700">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-5 py-5 sm:px-7 sm:py-7">

          {/* Intro */}
          <p className="text-sm leading-6 text-slate-600 sm:text-base">
            This example uses a rectangular concrete slab with a 1 : 2 : 4
            mix ratio. The same calculation method is used by the calculator.
          </p>

          {/* Input */}
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 sm:p-5">

            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Example Input
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <InputItem
                label="Length"
                value="10 m"
              />

              <InputItem
                label="Width"
                value="5 m"
              />

              <InputItem
                label="Depth"
                value="0.15 m"
              />

            </div>

            <div className="mt-3">
              <InputItem
                label="Concrete Mix"
                value="1 : 2 : 4"
              />
            </div>

          </div>

          {/* Steps */}
          <div className="mt-6">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                Calculation Steps
              </h3>

              <span className="text-xs font-medium text-slate-400">
                9 steps
              </span>

            </div>

            <div className="space-y-3">

              <ExampleStep
                number="1"
                title="Concrete Volume"
                formula="10 × 5 × 0.15 = 7.50 m³"
              />

              <ExampleStep
                number="2"
                title="Dry Volume"
                formula="7.50 × 1.54 = 11.55 m³"
              />

              <ExampleStep
                number="3"
                title="Total Mix Ratio"
                formula="1 + 2 + 4 = 7"
              />

              <ExampleStep
                number="4"
                title="Cement Volume"
                formula="11.55 × (1 ÷ 7) = 1.65 m³"
              />

              <ExampleStep
                number="5"
                title="Cement Weight"
                formula="1.65 × 1440 = 2,376 kg"
              />

              <ExampleStep
                number="6"
                title="Cement Bags"
                formula="2,376 ÷ 50 = 47.52 → 48 bags"
              />

              <ExampleStep
                number="7"
                title="Sand Quantity"
                formula="11.55 × (2 ÷ 7) = 3.30 m³"
              />

              <ExampleStep
                number="8"
                title="Aggregate Quantity"
                formula="11.55 × (4 ÷ 7) = 6.60 m³"
              />

              <ExampleStep
                number="9"
                title="Water Requirement"
                formula="2,376 × 0.50 = 1,188 L"
              />

            </div>

          </div>

          {/* Final Result */}
          <div className="mt-6 rounded-2xl bg-blue-50 p-5 sm:p-6">

            <div className="flex items-center justify-between gap-4">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">
                  Estimated Result
                </p>

                <h3 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
                  Material Requirements
                </h3>
              </div>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm text-blue-600 shadow-sm">
                ✓
              </span>

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">

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
          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:p-5">

            <p className="text-sm leading-6 text-amber-800">
              This example is for estimation and demonstrates the calculation
              method used by this calculator. Actual concrete requirements
              depend on the project-specific mix design, material properties,
              moisture conditions and engineering requirements.
            </p>

          </div>

        </div>
      )}

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
