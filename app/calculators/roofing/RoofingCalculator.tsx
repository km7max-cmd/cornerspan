"use client";

import { useMemo, useState } from "react";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorHero from "../../components/CalculatorHero";
import ResultStatGrid from "../../../components/calculators/ResultStatGrid";
import WasteSection from "../../../components/calculators/WasteSection";
import { rectangleArea } from "../../../lib/area-volume";
import { positive, percent } from "../../../lib/validation";

type Mode = "footprint" | "direct-area";

export default function RoofingCalculator() {
  const [mode, setMode] = useState<Mode>("footprint");
  const [length, setLength] = useState("40");
  const [width, setWidth] = useState("28");
  const [directArea, setDirectArea] = useState("1200");
  const [pitch, setPitch] = useState("6");
  const [waste, setWaste] = useState("10");
  const [bundlesPerSquare, setBundlesPerSquare] = useState("3");
  const [bundlePrice, setBundlePrice] = useState("39");
  const [squarePrice, setSquarePrice] = useState("");

  const result = useMemo(() => {
    const footprintArea = rectangleArea(positive(length), positive(width));
    const pitchRise = positive(pitch);
    const pitchMultiplier = Math.sqrt(12 ** 2 + pitchRise ** 2) / 12;

    const roofArea =
      mode === "direct-area"
        ? positive(directArea)
        : footprintArea * pitchMultiplier;

    const adjustedArea = roofArea * (1 + percent(waste, 10) / 100);
    const squares = adjustedArea / 100;
    const bundlesNeeded = Math.ceil(squares * positive(bundlesPerSquare, 3));

    const bundleUnitPrice = positive(bundlePrice);
    const squareUnitPrice = positive(squarePrice);

    const cost =
      bundleUnitPrice > 0 ? bundlesNeeded * bundleUnitPrice : squares * squareUnitPrice;

    return {
      roofArea,
      adjustedArea,
      squares,
      bundlesNeeded,
      cost,
    };
  }, [mode, length, width, directArea, pitch, waste, bundlesPerSquare, bundlePrice, squarePrice]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6 sm:py-10">
        <Breadcrumb current="Roofing Shingle Calculator" />

        <CalculatorHero
          title="Roofing Shingle"
          highlight="Calculator"
          description="Estimate roof area, roofing squares, and bundle count using roof pitch and waste allowance."
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700">
              Input mode
              <select
                value={mode}
                onChange={(event) => setMode(event.target.value as Mode)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              >
                <option value="footprint">Building footprint + pitch</option>
                <option value="direct-area">Direct roof area</option>
              </select>
            </label>

            {mode === "footprint" ? (
              <>
                <label className="block text-sm font-semibold text-slate-700">
                  Building length (ft)
                  <input
                    type="number"
                    min="0"
                    value={length}
                    onChange={(event) => setLength(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Building width (ft)
                  <input
                    type="number"
                    min="0"
                    value={width}
                    onChange={(event) => setWidth(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Roof pitch (x:12)
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={pitch}
                    onChange={(event) => setPitch(event.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                  />
                </label>
              </>
            ) : (
              <label className="block text-sm font-semibold text-slate-700">
                Roof area (ft²)
                <input
                  type="number"
                  min="0"
                  value={directArea}
                  onChange={(event) => setDirectArea(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </label>
            )}

            <WasteSection value={waste} onChange={setWaste} hint="Use 10% for simple roofs and more for complex layouts." />

            <label className="block text-sm font-semibold text-slate-700">
              Bundles per square
              <input
                type="number"
                min="0"
                step="0.1"
                value={bundlesPerSquare}
                onChange={(event) => setBundlesPerSquare(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Price per bundle ($)
              <input
                type="number"
                min="0"
                step="0.01"
                value={bundlePrice}
                onChange={(event) => setBundlePrice(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Optional price per square ($)
              <input
                type="number"
                min="0"
                step="0.01"
                value={squarePrice}
                onChange={(event) => setSquarePrice(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>
          </section>

          <ResultStatGrid
            title="Roofing Estimate"
            stats={[
              { label: "Roof area", value: `${result.roofArea.toFixed(2)} ft²` },
              { label: "Waste-adjusted area", value: `${result.adjustedArea.toFixed(2)} ft²` },
              { label: "Roofing squares", value: `${result.squares.toFixed(2)} squares` },
              { label: "Bundles needed", value: `${result.bundlesNeeded.toLocaleString()} bundles` },
              { label: "Estimated cost", value: `$${result.cost.toFixed(2)}` },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
