"use client";

import { useMemo, useState } from "react";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorHero from "../../components/CalculatorHero";
import ResultStatGrid from "../../../components/calculators/ResultStatGrid";
import WasteSection from "../../../components/calculators/WasteSection";
import { cubicFeetToCubicYards, rectangleArea } from "../../../lib/area-volume";
import { calculateCost } from "../../../lib/material-pricing";
import { positive, percent } from "../../../lib/validation";

export default function AsphaltCalculator() {
  const [length, setLength] = useState("80");
  const [width, setWidth] = useState("12");
  const [thicknessInches, setThicknessInches] = useState("3");
  const [density, setDensity] = useState("145");
  const [waste, setWaste] = useState("5");
  const [pricePerTon, setPricePerTon] = useState("120");

  const result = useMemo(() => {
    const areaFt2 = rectangleArea(positive(length), positive(width));
    const volumeFt3 = areaFt2 * (positive(thicknessInches) / 12);
    const volumeYd3 = cubicFeetToCubicYards(volumeFt3);

    const tonsBase = (volumeFt3 * positive(density, 145)) / 2000;
    const tons = tonsBase * (1 + percent(waste, 5) / 100);
    const cost = calculateCost(tons, positive(pricePerTon));

    return {
      volumeFt3,
      volumeYd3,
      tons,
      cost,
    };
  }, [length, width, thicknessInches, density, waste, pricePerTon]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6 sm:py-10">
        <Breadcrumb current="Asphalt Calculator" />

        <CalculatorHero
          title="Asphalt"
          highlight="Calculator"
          description="Estimate paving volume, tonnage, and material cost using compacted thickness and asphalt density."
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700">
              Length (ft)
              <input
                type="number"
                min="0"
                value={length}
                onChange={(event) => setLength(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Width (ft)
              <input
                type="number"
                min="0"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Compacted thickness (in)
              <input
                type="number"
                min="0"
                step="0.1"
                value={thicknessInches}
                onChange={(event) => setThicknessInches(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Asphalt density (lb/ft³)
              <input
                type="number"
                min="0"
                step="0.1"
                value={density}
                onChange={(event) => setDensity(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <WasteSection value={waste} onChange={setWaste} hint="Typical paving waste starts near 5%." />

            <label className="block text-sm font-semibold text-slate-700">
              Price per ton ($)
              <input
                type="number"
                min="0"
                step="0.01"
                value={pricePerTon}
                onChange={(event) => setPricePerTon(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>
          </section>

          <ResultStatGrid
            title="Asphalt Estimate"
            stats={[
              { label: "Paving volume", value: `${result.volumeFt3.toFixed(2)} ft³` },
              { label: "Paving volume", value: `${result.volumeYd3.toFixed(2)} yd³` },
              { label: "Waste-adjusted tonnage", value: `${result.tons.toFixed(2)} tons` },
              { label: "Estimated cost", value: `$${result.cost.toFixed(2)}` },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
