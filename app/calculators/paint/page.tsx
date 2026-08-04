"use client";

import { useMemo, useState } from "react";

export default function PaintCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [coats, setCoats] = useState("2");
  const [price, setPrice] = useState("45");

  const result = useMemo(() => {
    const l = Number(length) || 0;
    const w = Number(width) || 0;
    const h = Number(height) || 0;

    const wallArea = 2 * (l + w) * h;
    const totalArea = wallArea * (Number(coats) || 1);

    const gallons = totalArea / 350;
    const cost = gallons * (Number(price) || 0);

    return {
      wallArea,
      totalArea,
      gallons,
      cost,
    };
  }, [length, width, height, coats, price]);

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-2 text-4xl font-bold">
        USA Paint Calculator
      </h1>

      <p className="mb-6 text-slate-600">
        Professional Paint Estimator
      </p>
            <div className="space-y-4">

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Room Length (ft)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Room Width (ft)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Wall Height (ft)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Number of Coats"
          value={coats}
          onChange={(e) => setCoats(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Paint Price per Gallon ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="rounded-xl bg-slate-100 p-5 space-y-2">
          <h2 className="text-2xl font-bold">
            Results
          </h2>

          <p>
            🎨 Wall Area:
            <b> {result.wallArea.toFixed(2)} sq ft</b>
          </p>

          <p>
            🖌️ Paint Area:
            <b> {result.totalArea.toFixed(2)} sq ft</b>
          </p>

          <p>
            🪣 Paint Required:
            <b> {result.gallons.toFixed(2)} Gallons</b>
          </p>

          <p className="text-xl font-bold text-green-600">
            💲 Estimated Cost:
            <b> ${result.cost.toFixed(2)}</b>
          </p>
                  </div>
      </div>

      <div className="mt-8 rounded-xl border bg-blue-50 p-5">
        <h3 className="mb-2 text-xl font-bold">
          USA Paint Tips
        </h3>

        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>One gallon of paint typically covers about 350 sq ft.</li>
          <li>Most interior walls require two coats for the best finish.</li>
          <li>Buy an extra gallon for future touch-ups.</li>
          <li>Use primer on new drywall or when changing dark colors to light colors.</li>
        </ul>
      </div>
    </main>
  );
}
