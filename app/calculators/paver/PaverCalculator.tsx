"use client";

import { useMemo, useState } from "react";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorHero from "../../components/CalculatorHero";
import ResultStatGrid from "../../../components/calculators/ResultStatGrid";
import WasteSection from "../../../components/calculators/WasteSection";
import { cubicFeetToCubicYards, rectangleArea } from "../../../lib/area-volume";
import { positive, percent } from "../../../lib/validation";

export default function PaverCalculator() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("12");
  const [paverLength, setPaverLength] = useState("8");
  const [paverWidth, setPaverWidth] = useState("4");
  const [jointWidth, setJointWidth] = useState("0.125");
  const [baseDepth, setBaseDepth] = useState("6");
  const [sandDepth, setSandDepth] = useState("1");
  const [waste, setWaste] = useState("10");

  const [paverPrice, setPaverPrice] = useState("1.25");
  const [basePrice, setBasePrice] = useState("45");
  const [sandPrice, setSandPrice] = useState("38");

  const result = useMemo(() => {
    const areaFt2 = rectangleArea(positive(length), positive(width));

    const moduleAreaFt2 =
      ((positive(paverLength) + positive(jointWidth)) *
        (positive(paverWidth) + positive(jointWidth))) /
      144;

    const wasteMultiplier = 1 + percent(waste, 10) / 100;

    const paverCount = moduleAreaFt2 > 0 ? Math.ceil((areaFt2 / moduleAreaFt2) * wasteMultiplier) : 0;

    const baseYd3 = cubicFeetToCubicYards(areaFt2 * (positive(baseDepth) / 12));
    const sandYd3 = cubicFeetToCubicYards(areaFt2 * (positive(sandDepth) / 12));

    const cost =
      paverCount * positive(paverPrice) +
      baseYd3 * positive(basePrice) +
      sandYd3 * positive(sandPrice);

    return {
      paverCount,
      baseYd3,
      sandYd3,
      cost,
    };
  }, [length, width, paverLength, paverWidth, jointWidth, baseDepth, sandDepth, waste, paverPrice, basePrice, sandPrice]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6 sm:py-10">
        <Breadcrumb current="Paver Calculator" />

        <CalculatorHero
          title="Paver"
          highlight="Calculator"
          description="Estimate paver count, base gravel, bedding sand, and total material cost for patio and walkway layouts."
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700">
              Project length (ft)
              <input
                type="number"
                min="0"
                value={length}
                onChange={(event) => setLength(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Project width (ft)
              <input
                type="number"
                min="0"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Paver length (in)
              <input
                type="number"
                min="0"
                value={paverLength}
                onChange={(event) => setPaverLength(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Paver width (in)
              <input
                type="number"
                min="0"
                value={paverWidth}
                onChange={(event) => setPaverWidth(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Joint width (in)
              <input
                type="number"
                min="0"
                step="0.01"
                value={jointWidth}
                onChange={(event) => setJointWidth(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Base depth (in)
              <input
                type="number"
                min="0"
                step="0.1"
                value={baseDepth}
                onChange={(event) => setBaseDepth(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Bedding sand depth (in)
              <input
                type="number"
                min="0"
                step="0.1"
                value={sandDepth}
                onChange={(event) => setSandDepth(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <WasteSection value={waste} onChange={setWaste} hint="Use up to 15% waste for diagonal or herringbone patterns." />

            <label className="block text-sm font-semibold text-slate-700">
              Price per paver ($)
              <input
                type="number"
                min="0"
                step="0.01"
                value={paverPrice}
                onChange={(event) => setPaverPrice(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Base gravel price ($/yd³)
              <input
                type="number"
                min="0"
                step="0.01"
                value={basePrice}
                onChange={(event) => setBasePrice(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Bedding sand price ($/yd³)
              <input
                type="number"
                min="0"
                step="0.01"
                value={sandPrice}
                onChange={(event) => setSandPrice(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>
          </section>

          <ResultStatGrid
            title="Paver Estimate"
            stats={[
              { label: "Required pavers", value: `${result.paverCount.toLocaleString()} each` },
              { label: "Base gravel", value: `${result.baseYd3.toFixed(2)} yd³` },
              { label: "Bedding sand", value: `${result.sandYd3.toFixed(2)} yd³` },
              { label: "Estimated cost", value: `$${result.cost.toFixed(2)}` },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
