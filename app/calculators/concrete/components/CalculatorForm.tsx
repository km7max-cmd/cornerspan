"use client";

import { useState } from "react";

export default function CalculatorForm() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [unit, setUnit] = useState("Meter");

  const calculate = () => {
    alert("Calculation logic will be added next.");
  };

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Concrete Dimensions
      </h2>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Length
          </label>

          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="Enter length"
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Width
          </label>

          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Enter width"
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Depth
          </label>

          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder="Enter depth"
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Unit
          </label>

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          >
            <option>Meter</option>
            <option>Feet</option>
            <option>Inch</option>
          </select>
        </div>

        <button
          onClick={calculate}
          className="mt-4 h-12 w-full rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-700"
        >
          Calculate
        </button>

      </div>

    </section>
  );
}
