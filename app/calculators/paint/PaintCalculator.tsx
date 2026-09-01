"use client";

import { useState } from "react";

import Breadcrumb from "../../../components/Breadcrumb";
import PaintInputs from "./components/PaintInputs";
import PaintResults from "./components/PaintResults";
import PaintTips from "./components/PaintTips";
import {
  calculatePaint,
  type PaintCalculationResult,
} from "./utils/calculations";

export default function PaintCalculator() {
  const [values, setValues] = useState({
    length: "",
    width: "",
    height: "",
    coats: "2",
    doors: "0",
    windows: "0",
    coverage: "350",
    pricePerGallon: "45",
  });

  const [result, setResult] =
    useState<PaintCalculationResult | null>(null);

  function handleChange(
    field: string,
    value: string
  ) {
    setValues((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleCalculate() {
    const length = Number(values.length);
    const width = Number(values.width);
    const height = Number(values.height);
    const coats = Number(values.coats);
    const doors = Number(values.doors);
    const windows = Number(values.windows);
    const coverage = Number(values.coverage);
    const pricePerGallon =
      Number(values.pricePerGallon);

    if (
      length <= 0 ||
      width <= 0 ||
      height <= 0 ||
      coats <= 0 ||
      coverage <= 0
    ) {
      setResult(null);
      return;
    }

    setResult(
      calculatePaint({
        length,
        width,
        height,
        coats,
        doors: Math.max(doors, 0),
        windows: Math.max(windows, 0),
        coverage,
        pricePerGallon:
          Math.max(pricePerGallon, 0),
      })
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">

        <Breadcrumb current="Paint Calculator" />

        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
          Paint Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Calculate how much paint you need for interior
          walls and ceilings, including doors, windows,
          multiple coats and estimated paint cost.
        </p>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <h2 className="mb-5 text-xl font-bold text-slate-900">
            Paint Calculator Inputs
          </h2>

          <PaintInputs
            {...values}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={handleCalculate}
            className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Calculate Paint
          </button>
        </section>

        {result && (
          <PaintResults
            wallArea={result.wallArea}
            ceilingArea={result.ceilingArea}
            doorArea={result.doorArea}
            windowArea={result.windowArea}
            paintableArea={result.paintableArea}
            totalPaintArea={result.totalPaintArea}
            gallonsRequired={result.gallonsRequired}
            gallonsToBuy={result.gallonsToBuy}
            estimatedCost={result.estimatedCost}
          />
        )}

        <PaintTips />

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-bold text-slate-900">
            How Paint Calculation Works
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            The calculator estimates wall and ceiling
            area, subtracts standard door and window
            areas, multiplies the remaining area by the
            number of coats, and divides the result by
            the selected paint coverage per gallon.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center font-semibold text-slate-800">
            Paint Required = Total Paint Area ÷ Coverage per Gallon
          </div>
        </section>

      </div>
    </main>
  );
}
