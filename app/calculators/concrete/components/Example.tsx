"use client";

import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <h2 className="text-2xl font-black text-slate-900">
          🧮 Worked Example
        </h2>

        <span className="text-2xl font-bold">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="border-t p-6">

          <p className="mb-6 text-slate-600">
            Example calculation using common slab dimensions.
          </p>

          <div className="rounded-2xl border border-slate-200 p-6">

            <h3 className="text-xl font-bold">
              Input Values
            </h3>

            <ul className="mt-4 space-y-2 text-slate-700">
              <li>• Length = 10 m</li>
              <li>• Width = 5 m</li>
              <li>• Depth = 0.15 m</li>
            </ul>

            <hr className="my-6" />

            <div className="space-y-6">

              <div>
                <h4 className="font-bold">
                  Step 1 – Concrete Volume
                </h4>

                <code className="mt-2 block rounded-xl bg-slate-100 p-4">
                  10 × 5 × 0.15 = <strong>7.50 m³</strong>
                </code>
              </div>

              <div>
                <h4 className="font-bold">
                  Step 2 – Dry Volume
                </h4>

                <code className="mt-2 block rounded-xl bg-slate-100 p-4">
                  7.50 × 1.54 = <strong>11.55 m³</strong>
                </code>
              </div>

              <div>
                <h4 className="font-bold">
                  Step 3 – Cement Bags
                </h4>

                <code className="mt-2 block rounded-xl bg-slate-100 p-4">
                  7.50 × 29 = <strong>218 Bags</strong>
                </code>
              </div>

              <div>
                <h4 className="font-bold">
                  Step 4 – Sand
                </h4>

                <code className="mt-2 block rounded-xl bg-slate-100 p-4">
                  11.55 × 0.42 = <strong>4.85 m³</strong>
                </code>
              </div>

              <div>
                <h4 className="font-bold">
                  Step 5 – Aggregate
                </h4>

                <code className="mt-2 block rounded-xl bg-slate-100 p-4">
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
