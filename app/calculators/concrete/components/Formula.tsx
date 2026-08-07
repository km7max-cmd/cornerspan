"use client";

import { useState } from "react";

export default function Formula() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-10 rounded-3xl bg-white shadow-xl overflow-hidden">

      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <h2 className="text-2xl font-black text-slate-900">
          📐 Formula
        </h2>

        <span className="text-2xl font-bold">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="border-t p-6">

          <p className="mb-6 text-slate-600">
            The calculator uses standard civil engineering formulas.
          </p>

          <div className="space-y-5">

            <div className="rounded-2xl border p-5">
              <h3 className="font-bold">Concrete Volume</h3>

              <code className="mt-3 block rounded-xl bg-slate-100 p-4">
                Volume = Length × Width × Depth
              </code>
            </div>

            <div className="rounded-2xl border p-5">
              <h3 className="font-bold">Dry Volume</h3>

              <code className="mt-3 block rounded-xl bg-slate-100 p-4">
                Dry Volume = Wet Volume × 1.54
              </code>
            </div>

            <div className="rounded-2xl border p-5">
              <h3 className="font-bold">Cement Bags</h3>

              <code className="mt-3 block rounded-xl bg-slate-100 p-4">
                Cement Bags = Concrete Volume × 29
              </code>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
