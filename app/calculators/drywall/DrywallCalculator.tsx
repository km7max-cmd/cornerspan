"use client";

import { useMemo, useState } from "react";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorHero from "../../components/CalculatorHero";
import OpeningSection from "../../../components/calculators/OpeningSection";
import ResultStatGrid from "../../../components/calculators/ResultStatGrid";
import WasteSection from "../../../components/calculators/WasteSection";
import { toFeet, type LengthUnit } from "../../../lib/units";
import { percent, positive } from "../../../lib/validation";

type SheetSize = "4x8" | "4x10" | "4x12";

const SHEET_AREA: Record<SheetSize, number> = {
  "4x8": 32,
  "4x10": 40,
  "4x12": 48,
};

function openingArea(qty: string, width: string, height: string, widthUnit: LengthUnit, heightUnit: LengthUnit) {
  return positive(qty) * toFeet(positive(width), widthUnit) * toFeet(positive(height), heightUnit);
}

export default function DrywallCalculator() {
  const [length, setLength] = useState("16");
  const [width, setWidth] = useState("12");
  const [height, setHeight] = useState("9");
  const [includeCeiling, setIncludeCeiling] = useState(true);
  const [sheetSize, setSheetSize] = useState<SheetSize>("4x8");
  const [waste, setWaste] = useState("10");
  const [pricePerSheet, setPricePerSheet] = useState("16");

  const [doorQty, setDoorQty] = useState("1");
  const [doorWidth, setDoorWidth] = useState("3");
  const [doorHeight, setDoorHeight] = useState("7");
  const [doorWidthUnit, setDoorWidthUnit] = useState<LengthUnit>("ft");
  const [doorHeightUnit, setDoorHeightUnit] = useState<LengthUnit>("ft");

  const [windowQty, setWindowQty] = useState("2");
  const [windowWidth, setWindowWidth] = useState("3");
  const [windowHeight, setWindowHeight] = useState("4");
  const [windowWidthUnit, setWindowWidthUnit] = useState<LengthUnit>("ft");
  const [windowHeightUnit, setWindowHeightUnit] = useState<LengthUnit>("ft");

  const result = useMemo(() => {
    const roomLength = positive(length);
    const roomWidth = positive(width);
    const roomHeight = positive(height);

    const wallArea = 2 * (roomLength + roomWidth) * roomHeight;
    const doorsArea = openingArea(doorQty, doorWidth, doorHeight, doorWidthUnit, doorHeightUnit);
    const windowsArea = openingArea(windowQty, windowWidth, windowHeight, windowWidthUnit, windowHeightUnit);
    const openings = doorsArea + windowsArea;

    const netWallArea = Math.max(0, wallArea - openings);
    const ceilingArea = includeCeiling ? roomLength * roomWidth : 0;
    const totalArea = netWallArea + ceilingArea;
    const sheetArea = SHEET_AREA[sheetSize];

    const sheets = Math.ceil((totalArea / sheetArea) * (1 + percent(waste, 10) / 100));
    const cost = sheets * positive(pricePerSheet);

    return {
      netWallArea,
      ceilingArea,
      totalArea,
      sheets,
      cost,
    };
  }, [length, width, height, includeCeiling, sheetSize, waste, pricePerSheet, doorQty, doorWidth, doorHeight, doorWidthUnit, doorHeightUnit, windowQty, windowWidth, windowHeight, windowWidthUnit, windowHeightUnit]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 sm:py-10">
        <Breadcrumb current="Drywall Calculator" />

        <CalculatorHero
          title="Drywall"
          highlight="Calculator"
          description="Estimate drywall sheets for walls and ceilings with door/window deductions, waste, and cost."
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700">
              Room length (ft)
              <input
                type="number"
                min="0"
                value={length}
                onChange={(event) => setLength(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Room width (ft)
              <input
                type="number"
                min="0"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Room height (ft)
              <input
                type="number"
                min="0"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              />
            </label>

            <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={includeCeiling}
                onChange={(event) => setIncludeCeiling(event.target.checked)}
              />
              Include ceiling area
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Sheet size
              <select
                value={sheetSize}
                onChange={(event) => setSheetSize(event.target.value as SheetSize)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option value="4x8">4 × 8</option>
                <option value="4x10">4 × 10</option>
                <option value="4x12">4 × 12</option>
              </select>
            </label>

            <WasteSection value={waste} onChange={setWaste} />

            <label className="block text-sm font-semibold text-slate-700">
              Price per sheet ($)
              <input
                type="number"
                min="0"
                step="0.01"
                value={pricePerSheet}
                onChange={(event) => setPricePerSheet(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              />
            </label>

            <OpeningSection
              title="Door openings"
              quantity={doorQty}
              onQuantityChange={setDoorQty}
              width={doorWidth}
              onWidthChange={setDoorWidth}
              widthUnit={doorWidthUnit}
              onWidthUnitChange={setDoorWidthUnit}
              height={doorHeight}
              onHeightChange={setDoorHeight}
              heightUnit={doorHeightUnit}
              onHeightUnitChange={setDoorHeightUnit}
            />

            <OpeningSection
              title="Window openings"
              quantity={windowQty}
              onQuantityChange={setWindowQty}
              width={windowWidth}
              onWidthChange={setWindowWidth}
              widthUnit={windowWidthUnit}
              onWidthUnitChange={setWindowWidthUnit}
              height={windowHeight}
              onHeightChange={setWindowHeight}
              heightUnit={windowHeightUnit}
              onHeightUnitChange={setWindowHeightUnit}
            />
          </section>

          <ResultStatGrid
            title="Drywall Estimate"
            stats={[
              { label: "Net wall area", value: `${result.netWallArea.toFixed(2)} ft²` },
              { label: "Ceiling area", value: `${result.ceilingArea.toFixed(2)} ft²` },
              { label: "Total board area", value: `${result.totalArea.toFixed(2)} ft²` },
              { label: "Estimated sheets", value: `${result.sheets.toLocaleString()} sheets` },
              { label: "Estimated cost", value: `$${result.cost.toFixed(2)}` },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
