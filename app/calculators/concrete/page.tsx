"use client";

import { useState } from "react";

export default function USA ConcreteCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");

  const volume =
    ((Number(length) || 0) *
      (Number(width) || 0) *
      (Number(thickness) || 0)) /
    324;

  const bags60 = Math.ceil(volume * 45);
  const bags80 = Math.ceil(volume * 34);
  const cost = (volume * 170).toFixed(2);

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-2 text-4xl font-bold">
        Concrete Calculator
      </h1>

      <p className="mb-6 text-slate-600">
        USA Ready-Mix Concrete Calculator
      </p>

      <input
        className="mb-4 w-full rounded-lg border p-3"
        type="number"
        placeholder="Length (ft)"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />

      <input
        className="mb-4 w-full rounded-lg border p-3"
        type="number"
        placeholder="Width (ft)"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />

      <input
        className="mb-4 w-full rounded-lg border p-3"
        type="number"
        placeholder="Thickness (in)"
        value={thickness}
        onChange={(e) => setThickness(e.target.value)}
      />

      <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white">
        Calculate
      </button>

      <div className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Results</h2>

        <p className="mb-2">
          🧱 Volume: <b>{volume.toFixed(2)} Cubic Yards</b>
        </p>

        <p className="mb-2">
          📦 60 lb Bags: <b>{bags60}</b>
        </p>

        <p className="mb-2">
          📦 80 lb Bags: <b>{bags80}</b>
        </p>

        <p>
          💲 Estimated Cost: <b>${cost}</b>
        </p>
      </div>
    </main>
  );
}
