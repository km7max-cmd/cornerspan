"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";

export default function SteelCalculator() {
  const [diameter, setDiameter] = useState("12");
  const [length, setLength] = useState("");
  const [bars, setBars] = useState("");
  const [price, setPrice] = useState("1.25");

  const result = useMemo(() => {
    const dia = Number(diameter) || 12;
    const len = Number(length) || 0;
    const qty = Number(bars) || 0;

    const weightPerMeter = (dia * dia) / 162;
    const lengthMeters = len * 0.3048;
    const totalWeight = weightPerMeter * lengthMeters * qty;
    const totalCost = totalWeight * (Number(price) || 0);

    return {
      totalWeight,
      totalCost,
    };
  }, [diameter, length, bars, price]);

  return (
    <main className="mx-auto max-w-xl p-6">
      <Breadcrumb current="Steel Calculator" />
      <h1 className="mb-2 text-4xl font-bold">
        Steel Calculator
      </h1>

      <p className="mb-6 text-slate-600">
        Professional Rebar Estimator
      </p>
            <div className="space-y-4">

        <select
          className="w-full rounded-lg border p-3"
          value={diameter}
          onChange={(e) => setDiameter(e.target.value)}
        >
          <option value="8">8 mm</option>
          <option value="10">10 mm</option>
          <option value="12">12 mm</option>
          <option value="16">16 mm</option>
          <option value="20">20 mm</option>
          <option value="25">25 mm</option>
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
          placeholder="Number of Bars"
          value={bars}
          onChange={(e) => setBars(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Price per kg ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="rounded-xl bg-slate-100 p-5 space-y-2">
          <h2 className="text-2xl font-bold">
            Results
          </h2>

          <p>
            🏗️ Steel Weight:
            <b> {result.totalWeight.toFixed(2)} kg</b>
          </p>

          <p className="text-xl font-bold text-green-600">
            💲 Estimated Cost:
            <b> ${result.totalCost.toFixed(2)}</b>
          </p>
                  </div>
      </div>

      <div className="mt-8 rounded-xl border bg-blue-50 p-5">
        <h3 className="mb-2 text-xl font-bold">
          USA Steel Tips
        </h3>

        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Always allow 5–10% extra steel for cutting and lap splices.</li>
          <li>12 mm rebar is commonly used for residential beams and slabs.</li>
          <li>Store rebar above ground to prevent rust.</li>
          <li>Verify rebar spacing and grade with structural drawings.</li>
        </ul>
      </div>
    </main>
  );
}
