"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorHero from "../../components/CalculatorHero";

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
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-10">

        <Breadcrumb current="Brick Calculator" />

        {/* Common Calculator Hero */}
        <CalculatorHero
          title="Brick"
          highlight="Calculator"
          description="Calculate bricks required, wall area, waste, and estimated material cost."
        />

        {/* Calculator */}
        <div className="mx-auto mt-6 max-w-xl">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="space-y-4">

              <input
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                type="number"
                placeholder="Wall Length (ft)"
                value={wallLength}
                onChange={(e) =>
                  setWallLength(e.target.value)
                }
              />

              <input
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                type="number"
                placeholder="Wall Height (ft)"
                value={wallHeight}
                onChange={(e) =>
                  setWallHeight(e.target.value)
                }
              />

              <input
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                type="number"
                placeholder="Brick Length (in)"
                value={brickLength}
                onChange={(e) =>
                  setBrickLength(e.target.value)
                }
              />

              <input
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                type="number"
                placeholder="Brick Height (in)"
                value={brickHeight}
                onChange={(e) =>
                  setBrickHeight(e.target.value)
                }
              />

              <input
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                type="number"
                placeholder="Waste (%)"
                value={waste}
                onChange={(e) =>
                  setWaste(e.target.value)
                }
              />

              <input
                className="w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                type="number"
                placeholder="Price per Brick ($)"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />

              {/* Results */}
              <div className="space-y-3 rounded-2xl bg-slate-100 p-5">

                <h2 className="text-2xl font-bold text-slate-900">
                  Results
                </h2>

                <p className="text-slate-700">
                  🧱 Wall Area:{" "}
                  <b>
                    {result.wallArea.toFixed(2)} sq ft
                  </b>
                </p>

                <p className="text-slate-700">
                  🧱 Total Bricks:{" "}
                  <b>{result.bricks}</b>
                </p>

                <p className="text-xl font-bold text-green-600">
                  💲 Estimated Cost: $
                  {result.cost.toFixed(2)}
                </p>

              </div>

            </div>

          </div>

          {/* Tips */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <h3 className="mb-2 text-xl font-bold text-slate-900">
              USA Brick Tips
            </h3>

            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>
                Always order 5–10% extra bricks for breakage and waste.
              </li>

              <li>
                Standard USA brick size is approximately 8 × 2.25 inches.
              </li>

              <li>
                Include mortar joints when estimating large walls.
              </li>

              <li>
                Buy bricks from the same batch to maintain color consistency.
              </li>
            </ul>

          </div>

        </div>

      </div>

    </main>
  );
}
