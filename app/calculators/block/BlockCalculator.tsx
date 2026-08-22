"use client";

import { useMemo, useState } from "react";

import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorHero from "../../components/CalculatorHero";
import OpeningSection from "../../../components/calculators/OpeningSection";
import ResultStatGrid from "../../../components/calculators/ResultStatGrid";
import WasteSection from "../../../components/calculators/WasteSection";
import { toFeet, type LengthUnit } from "../../../lib/units";
import { percent, positive } from "../../../lib/validation";

function openingArea(qty: string, width: string, height: string, widthUnit: LengthUnit, heightUnit: LengthUnit) {
  return positive(qty) * toFeet(positive(width), widthUnit) * toFeet(positive(height), heightUnit);
}

export default function BlockCalculator() {
  const [wallLength, setWallLength] = useState("20");
  const [wallHeight, setWallHeight] = useState("8");
  const [wallCount, setWallCount] = useState("1");

  const [blockLength, setBlockLength] = useState("16");
  const [blockHeight, setBlockHeight] = useState("8");

  const [waste, setWaste] = useState("7");
  const [pricePerBlock, setPricePerBlock] = useState("2.65");

  const [doorQty, setDoorQty] = useState("1");
  const [doorWidth, setDoorWidth] = useState("3");
  const [doorHeight, setDoorHeight] = useState("7");
  const [doorWidthUnit, setDoorWidthUnit] = useState<LengthUnit>("ft");
  const [doorHeightUnit, setDoorHeightUnit] = useState<LengthUnit>("ft");

  const [windowQty, setWindowQty] = useState("0");
  const [windowWidth, setWindowWidth] = useState("3");
  const [windowHeight, setWindowHeight] = useState("4");
  const [windowWidthUnit, setWindowWidthUnit] = useState<LengthUnit>("ft");
  const [windowHeightUnit, setWindowHeightUnit] = useState<LengthUnit>("ft");

  const result = useMemo(() => {
    const grossWallArea = positive(wallLength) * positive(wallHeight) * Math.max(1, positive(wallCount, 1));

    const opening =
      openingArea(doorQty, doorWidth, doorHeight, doorWidthUnit, doorHeightUnit) +
      openingArea(windowQty, windowWidth, windowHeight, windowWidthUnit, windowHeightUnit);

    const netWallArea = Math.max(0, grossWallArea - opening);

    const blockFaceArea = (positive(blockLength, 16) * positive(blockHeight, 8)) / 144;

    const blocks =
      blockFaceArea > 0
        ? Math.ceil((netWallArea / blockFaceArea) * (1 + percent(waste, 7) / 100))
        : 0;

    const cost = blocks * positive(pricePerBlock);

    return {
      grossWallArea,
      netWallArea,
      blocks,
      cost,
    };
  }, [wallLength, wallHeight, wallCount, doorQty, doorWidth, doorHeight, doorWidthUnit, doorHeightUnit, windowQty, windowWidth, windowHeight, windowWidthUnit, windowHeightUnit, blockLength, blockHeight, waste, pricePerBlock]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 sm:py-10">
        <Breadcrumb current="Concrete Block (CMU) Calculator" />

        <CalculatorHero
          title="Concrete Block"
          highlight="Calculator"
          description="Estimate CMU blocks needed for walls using block size, opening deductions, and waste allowance."
        />

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700">
              Wall length (ft)
              <input
                type="number"
                min="0"
                value={wallLength}
                onChange={(event) => setWallLength(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Wall height (ft)
              <input
                type="number"
                min="0"
                value={wallHeight}
                onChange={(event) => setWallHeight(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Number of walls
              <input
                type="number"
                min="1"
                step="1"
                value={wallCount}
                onChange={(event) => setWallCount(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Block nominal length (in)
              <input
                type="number"
                min="0"
                value={blockLength}
                onChange={(event) => setBlockLength(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <label className="block text-sm font-semibold text-slate-700">
              Block nominal height (in)
              <input
                type="number"
                min="0"
                value={blockHeight}
                onChange={(event) => setBlockHeight(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </label>

            <WasteSection value={waste} onChange={setWaste} hint="Typical CMU waste is 5% to 10%." />

            <label className="block text-sm font-semibold text-slate-700">
              Price per block ($)
              <input
                type="number"
                min="0"
                step="0.01"
                value={pricePerBlock}
                onChange={(event) => setPricePerBlock(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
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
            title="CMU Estimate"
            stats={[
              { label: "Gross wall area", value: `${result.grossWallArea.toFixed(2)} ft²` },
              { label: "Net wall area", value: `${result.netWallArea.toFixed(2)} ft²` },
              { label: "Required blocks", value: `${result.blocks.toLocaleString()} blocks` },
              { label: "Estimated cost", value: `$${result.cost.toFixed(2)}` },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
