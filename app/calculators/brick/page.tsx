"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";

export default function BrickCalculator() {
  const [wallLength, setWallLength] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [brickLength, setBrickLength] = useState("8");
  const [brickHeight, setBrickHeight] = useState("2.25");
  const [waste, setWaste] = useState("10");
  const [price, setPrice] = useState("0.85");

  const result = useMemo(() => {
    const length = Number(wallLength) || 0;
    const height = Number(wallHeight) || 0;

    const bLength = Number(brickLength) || 8;
    const bHeight = Number(brickHeight) || 2.25;

    const wallArea = length * height;
    const brickArea = (bLength * bHeight) / 144;

    const bricks = Math.ceil(
      (wallArea / brickArea) *
      (1 + (Number(waste) || 0) / 100)
    );

    const cost = bricks * (Number(price) || 0);

    return {
      wallArea,
      bricks,
      cost,
    };
  }, [
    wallLength,
    wallHeight,
    brickLength,
    brickHeight,
    waste,
    price,
  ]);

  return (
    <main className="mx-auto max-w-xl p-6">
      <Breadcrumb current="Brick Calculator" />
      <h1 className="mb-2 text-4xl font-bold">
        Brick Calculator
      </h1>

      <p className="mb-6 text-slate-600">
        Professional Brick Estimator
      </p>
            <div className="space-y-4">

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Wall Length (ft)"
          value={wallLength}
          onChange={(e) => setWallLength(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Wall Height (ft)"
          value={wallHeight}
          onChange={(e) => setWallHeight(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Brick Length (in)"
          value={brickLength}
          onChange={(e) => setBrickLength(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Brick Height (in)"
          value={brickHeight}
          onChange={(e) => setBrickHeight(e.target.value)}
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
          placeholder="Price per Brick ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="rounded-xl bg-slate-100 p-5 space-y-2">
          <h2 className="text-2xl font-bold">Results</h2>

          <p>🧱 Wall Area: <b>{result.wallArea.toFixed(2)} sq ft</b></p>

          <p>🧱 Total Bricks: <b>{result.bricks}</b></p>

          <p className="text-xl font-bold text-green-600">
            💲 Estimated Cost: ${result.cost.toFixed(2)}
          </p>
                  </div>
      </div>

      <div className="mt-8 rounded-xl border bg-blue-50 p-5">
        <h3 className="mb-2 text-xl font-bold">
          USA Brick Tips
        </h3>

        <ul className="list-disc space-y-2 pl-5 text-slate-700">
          <li>Always order 5–10% extra bricks for breakage and waste.</li>
          <li>Standard USA brick size is approximately 8 × 2.25 inches.</li>
          <li>Include mortar joints when estimating large walls.</li>
          <li>Buy bricks from the same batch to maintain color consistency.</li>
        </ul>
      </div>
    </main>
  );
}
