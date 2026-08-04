
"use client";

import { useState } from "react";

export default function ConcreteCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");

  const volume =
    ((Number(length) || 0) *
      (Number(width) || 0) *
      (Number(thickness) || 0)) /
    324;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Concrete Calculator
      </h1>

      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Length (ft)"
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-3 rounded"
        placeholder="Width (ft)"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />

      <input
        className="border p-3 w-full mb-4 rounded"
        placeholder="Thickness (in)"
        value={thickness}
        onChange={(e) => setThickness(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-5 py-3 rounded w-full">
        Calculate
      </button>

      <h2 className="text-2xl font-bold mt-6">
        {volume.toFixed(2)} Cubic Yards
      </h2>
    </main>
  );
}
