"use client";

import { useMemo, useState } from "react";

export default function ConcreteCalculator() {
  const [projectType, setProjectType] = useState("Slab");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [waste, setWaste] = useState("10");
  const [price, setPrice] = useState("170");

  const result = useMemo(() => {
    const l = Number(length) || 0;
    const w = Number(width) || 0;
    const t = Number(thickness) || 0;

    const cubicFeet = (l * w * t) / 12;
    const wasteFactor = 1 + (Number(waste) || 0) / 100;
    const totalFeet = cubicFeet * wasteFactor;

    const cubicYards = totalFeet / 27;
    const cubicMeters = totalFeet * 0.0283168;

    const bags60 = Math.ceil(cubicYards * 45);
    const bags80 = Math.ceil(cubicYards * 34);
    const trucks = Math.ceil(cubicYards / 10);

    const totalCost = cubicYards * (Number(price) || 0);

    return {
      cubicFeet,
      cubicYards,
      cubicMeters,
      bags60,
      bags80,
      trucks,
      totalCost,
    };
  }, [length, width, thickness, waste, price]);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-4xl font-bold">
        USA Concrete Calculator
      </h1>

      <p className="mt-2 text-slate-600">
        Professional Ready-Mix Concrete Estimator
      </p>

      <div className="mt-8 space-y-4">
                <select
          className="w-full rounded-lg border p-3"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        >
          <option>Slab</option>
          <option>Footing</option>
          <option>Wall</option>
          <option>Column</option>
        </select>

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Length (ft)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Width (ft)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Thickness (in)"
          value={thickness}
          onChange={(e) => setThickness(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Waste (%)"
          value={waste}
          onChange={(e) => setWaste(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Concrete Price ($/yd³)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="rounded-xl bg-slate-100 p-5 space-y-2">
          <h2 className="text-2xl font-bold">Results</h2>

          <p><b>Project:</b> {projectType}</p>

          <p>🧱 Cubic Yards: <b>{result.cubicYards.toFixed(2)}</b></p>

          <p>📦 Cubic Feet: <b>{result.cubicFeet.toFixed(2)}</b></p>

          <p>🌍 Cubic Meters: <b>{result.cubicMeters.toFixed(2)}</b></p>

          <p>📦 60 lb Bags: <b>{result.bags60}</b></p>

          <p>📦 80 lb Bags: <b>{result.bags80}</b></p>
                    <p>🚚 Ready-Mix Trucks: <b>{result.trucks}</b></p>

          <p className="text-xl font-bold text-green-600">
            💲 Estimated Cost: ${result.totalCost.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border bg-blue-50 p-5">
        <h3 className="mb-2 text-xl font-bold">
          USA Concrete Tips
        </h3>

        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Always order 5–10% extra concrete for waste.</li>
          <li>1 Cubic Yard = 27 Cubic Feet.</li>
          <li>A standard ready-mix truck carries about 10 cubic yards.</li>
          <li>Use 4000 PSI concrete for most residential slabs unless your engineer specifies otherwise.</li>
        </ul>
      </div>
    </main>
  );
}
