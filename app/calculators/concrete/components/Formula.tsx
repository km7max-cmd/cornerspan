"use client";

import { useState } from "react";

export default function Formula() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-6 w-full overflow-hidden rounded-3xl bg-white shadow-lg">

      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6"
      >
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Formula
        </h2>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xl font-semibold text-slate-700">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* Content */}
      {open && (
        <div className="border-t border-slate-100 px-5 py-5 sm:px-6">

          <p className="mb-5 text-sm leading-6 text-slate-600 sm:text-base">
            The calculator uses standard civil engineering formulas to
            estimate concrete volume and material requirements.
          </p>

          <div className="space-y-3">

            {/* Concrete Volume */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">
                Concrete Volume
              </h3>

              <div className="mt-2 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                  Volume = Length × Width × Depth
                </code>
              </div>
            </div>

            {/* Dry Volume */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">
                Dry Volume
              </h3>

              <div className="mt-2 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                  Dry Volume = Wet Volume × 1.54
                </code>
              </div>
            </div>

            {/* Cement Bags */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">
                Cement Bags
              </h3>

              <div className="mt-2 overflow-x-auto rounded-xl bg-white px-4 py-3">
                <code className="whitespace-nowrap text-sm font-medium text-blue-700">
                  Cement Bags = Concrete Volume × 29
                </code>
              </div>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
