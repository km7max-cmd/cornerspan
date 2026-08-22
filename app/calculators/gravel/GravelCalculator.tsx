"use client";

import { useMemo, useState } from "react";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorHero from "../../components/CalculatorHero";
import DimensionInputRow from "../../../components/calculators/DimensionInputRow";
import CostSection from "../../../components/calculators/CostSection";
import WasteSection from "../../../components/calculators/WasteSection";
import ResultStatGrid from "../../../components/calculators/ResultStatGrid";
import { LENGTH_OPTIONS } from "../../../components/calculators/UnitSelect";
import { cubicFeetToCubicYards, rectangleArea } from "../../../lib/area-volume";
import { calculateCost, quantityForPricing, type PricingUnit } from "../../../lib/material-pricing";
import { toFeet, type LengthUnit } from "../../../lib/units";
import { percent, positive } from "../../../lib/validation";

const PRICING_OPTIONS: { label: string; value: PricingUnit }[] = [
  { label: "per yd³", value: "yd3" },
  { label: "per ton", value: "ton" },
];

export default function GravelCalculator() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("12");
  const [depth, setDepth] = useState("4");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("ft");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("ft");
  const [depthUnit, setDepthUnit] = useState<LengthUnit>("in");
  const [density, setDensity] = useState("100");
  const [waste, setWaste] = useState("10");
  const [unitPrice, setUnitPrice] = useState("38");
  const [pricingUnit, setPricingUnit] = useState<PricingUnit>("yd3");

  const result = useMemo(() => {
    const lengthFt = toFeet(positive(length), lengthUnit);
    const widthFt = toFeet(positive(width), widthUnit);
    const depthFt = toFeet(positive(depth), depthUnit);

    const areaFt2 = rectangleArea(lengthFt, widthFt);
    const volumeFt3Base = areaFt2 * depthFt;
    const volumeYd3Base = cubicFeetToCubicYards(volumeFt3Base);
    const densityLbFt3 = positive(density, 100);
    const tonsBase = (volumeFt3Base * densityLbFt3) / 2000;

    const multiplier = 1 + percent(waste, 10) / 100;
    const volumeFt3 = volumeFt3Base * multiplier;
    const volumeYd3 = volumeYd3Base * multiplier;
    const tons = tonsBase * multiplier;

    const qtyForPricing = quantityForPricing(
      { yd3: volumeYd3, ton: tons, ft3: volumeFt3 },
      pricingUnit
    );

    const cost = calculateCost(qtyForPricing, positive(unitPrice));

    return {
      volumeFt3,
      volumeYd3,
      tons,
      cost,
    };
  }, [length, width, depth, lengthUnit, widthUnit, depthUnit, density, waste, unitPrice, pricingUnit]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-6 sm:py-10">
        <Breadcrumb current="Gravel Calculator" />

        <CalculatorHero
          title="Gravel"
          highlight="Calculator"
          description="Estimate gravel volume, short tons, and material cost for pads, driveways, and base layers."
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <DimensionInputRow
              label="Length"
              value={length}
              onValueChange={setLength}
              unit={lengthUnit}
              unitOptions={LENGTH_OPTIONS}
              onUnitChange={setLengthUnit}
              placeholder="0"
            />

            <DimensionInputRow
              label="Width"
              value={width}
              onValueChange={setWidth}
              unit={widthUnit}
              unitOptions={LENGTH_OPTIONS}
              onUnitChange={setWidthUnit}
              placeholder="0"
            />

            <DimensionInputRow
              label="Depth"
              value={depth}
              onValueChange={setDepth}
              unit={depthUnit}
              unitOptions={LENGTH_OPTIONS.filter((item) => item.value === "in" || item.value === "ft" || item.value === "cm")}
              onUnitChange={setDepthUnit}
              placeholder="0"
            />

            <label className="block text-sm font-semibold text-slate-700">
              Material density (lb/ft³)
              <input
                type="number"
                min="0"
                step="0.1"
                value={density}
                onChange={(event) => setDensity(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
            </label>

            <WasteSection value={waste} onChange={setWaste} hint="Typical gravel waste is 5% to 15%." />

            <CostSection
              fields={[
                {
                  key: "gravel-price",
                  label: "Material price",
                  value: unitPrice,
                  onChange: setUnitPrice,
                  unit: pricingUnit,
                  unitOptions: PRICING_OPTIONS,
                  onUnitChange: setPricingUnit,
                },
              ]}
            />
          </section>

          <ResultStatGrid
            title="Gravel Estimate"
            stats={[
              { label: "Required volume", value: `${result.volumeFt3.toFixed(2)} ft³` },
              { label: "Required volume", value: `${result.volumeYd3.toFixed(2)} yd³` },
              { label: "Estimated short tons", value: `${result.tons.toFixed(2)} tons` },
              { label: "Estimated cost", value: `$${result.cost.toFixed(2)}` },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
