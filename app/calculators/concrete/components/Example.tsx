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
          Worked Example
        </h2>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xl font-semibold text-slate-700">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* Content */}
      {open && (
        <div className="border-t border-slate-100 px-5 py-5 sm:px-6">

          <p className="mb-4 text-sm leading-6 text-slate-600 sm:text-base">
            Example calculation using common slab dimensions.
          </p>

          {/* Input Values */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

            <h3 className="text-base font-semibold text-slate-900">
              Input Values
            </h3>

            <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-700 sm:grid-cols-3">
              <div className="rounded-xl bg-white px-3 py-2">
                Length = <strong>10 m</strong>
              </div>

              <div className="rounded-xl bg-white px-3 py-2">
                Width = <strong>5 m</strong>
              </div>

              <div className="rounded-xl bg-white px-3 py-2">
                Depth = <strong>0.15 m</strong>
              </div>
            </div>

            <div className="my-4 h-px bg-slate-200" />

            {/* Steps */}
            <div className="space-y-3">

              {/* Step 1 */}
              <div className="rounded-2xl bg-white p-4">
                <h4 className="text-sm font-semibold text-slate-900">
                  Step 1 – Concrete Volume
                </h4>

                <code className="mt-2 block overflow-x-auto rounded-xl bg-slate-50 px-3 py-2 text-sm text-blue-700">
                  10 × 5 × 0.15 = <strong>7.50 m³</strong>
                </code>
              </div>

              {/* Step 2 */}
              <div className="rounded-2xl bg-white p-4">
                <h4 className="text-sm font-semibold text-slate-900">
                  Step 2 – Dry Volume
                </h4>

                <code className="mt-2 block overflow-x-auto rounded-xl bg-slate-50 px-3 py-2 text-sm text-blue-700">
                  7.50 × 1.54 = <strong>11.55 m³</strong>
                </code>
              </div>

              {/* Step 3 */}
              <div className="rounded-2xl bg-white p-4">
                <h4 className="text-sm font-semibold text-slate-900">
                  Step 3 – Cement Bags
                </h4>

                <code className="mt-2 block overflow-x-auto rounded-xl bg-slate-50 px-3 py-2 text-sm text-blue-700">
                  7.50 × 29 = <strong>218 Bags</strong>
                </code>
              </div>

              {/* Step 4 */}
              <div className="rounded-2xl bg-white p-4">
                <h4 className="text-sm font-semibold text-slate-900">
                  Step 4 – Sand
                </h4>

                <code className="mt-2 block overflow-x-auto rounded-xl bg-slate-50 px-3 py-2 text-sm text-blue-700">
                  11.55 × 0.42 = <strong>4.85 m³</strong>
                </code>
              </div>

              {/* Step 5 */}
              <div className="rounded-2xl bg-white p-4">
                <h4 className="text-sm font-semibold text-slate-900">
                  Step 5 – Aggregate
                </h4>

                <code className="mt-2 block overflow-x-auto rounded-xl bg-slate-50 px-3 py-2 text-sm text-blue-700">
                  11.55 × 0.84 = <strong>9.70 m³</strong>
                </code>
              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
