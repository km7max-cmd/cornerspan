"use client";

import { useState } from "react";

type Unit = "feet" | "inches" | "meters" | "yards";

const unitToFeet: Record<Unit, number> = {
  feet: 1,
  inches: 1 / 12,
  yards: 3,
  meters: 3.280839895,
};

const unitLabels: Record<Unit, string> = {
  feet: "feet",
  inches: "inches",
  meters: "meters",
  yards: "yards",
};

const shapes = [
  "Rectangle",
  "Square",
  "Circle",
  "Rectangle Border",
  "Circle Border",
  "Annulus",
  "Triangle",
  "Trapezoid",
];

export default function SquareFootageCalculator() {
  const [shape, setShape] = useState("Rectangle");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState<Unit>("feet");

  const [borderWidth, setBorderWidth] = useState("");
  const [radius, setRadius] = useState("");
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");

  const [waste, setWaste] = useState("0");
  const [price, setPrice] = useState("");

  const [result, setResult] = useState<{
    squareFeet: number;
    squareInches: number;
    squareYards: number;
    squareMeters: number;
    acres: number;
    cost: number | null;
  } | null>(null);

  const number = (value: string) => {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  };

  const calculate = () => {
    const qty = Math.max(number(quantity), 1);
    const factor = unitToFeet[unit];

    let areaSqFt = 0;

    if (shape === "Rectangle") {
      areaSqFt =
        number(length) *
        factor *
        number(width) *
        factor *
        qty;
    }

    if (shape === "Square") {
      areaSqFt =
        number(length) *
        factor *
        number(length) *
        factor *
        qty;
    }

    if (shape === "Circle") {
      const diameterFt = number(length) * factor;
      const radiusFt = diameterFt / 2;

      areaSqFt = Math.PI * radiusFt * radiusFt * qty;
    }

    if (shape === "Rectangle Border") {
      const lengthFt = number(length) * factor;
      const widthFt = number(width) * factor;
      const borderFt = number(borderWidth) * factor;

      const outerArea = lengthFt * widthFt;
      const innerLength = Math.max(lengthFt - borderFt * 2, 0);
      const innerWidth = Math.max(widthFt - borderFt * 2, 0);
      const innerArea = innerLength * innerWidth;

      areaSqFt = (outerArea - innerArea) * qty;
    }

    if (shape === "Circle Border" || shape === "Annulus") {
      const outerDiameterFt = number(length) * factor;
      const borderFt = number(borderWidth) * factor;

      const outerRadius = outerDiameterFt / 2;
      const innerRadius = Math.max(outerRadius - borderFt, 0);

      areaSqFt =
        (Math.PI * outerRadius * outerRadius -
          Math.PI * innerRadius * innerRadius) *
        qty;
    }

    if (shape === "Triangle") {
      const a = number(sideA) * factor;
      const b = number(sideB) * factor;
      const c = number(sideC) * factor;

      const semi = (a + b + c) / 2;

      if (a > 0 && b > 0 && c > 0 && semi > a && semi > b && semi > c) {
        areaSqFt =
          Math.sqrt(semi * (semi - a) * (semi - b) * (semi - c)) * qty;
      }
    }

    if (shape === "Trapezoid") {
      const a = number(sideA) * factor;
      const b = number(sideB) * factor;
      const height = number(sideC) * factor;

      areaSqFt = ((a + b) / 2) * height * qty;
    }

    if (!areaSqFt || areaSqFt < 0) {
      setResult(null);
      return;
    }

    const wastePercent = Math.max(number(waste), 0);

    const finalArea =
      areaSqFt * (1 + wastePercent / 100);

    const squareFeet = finalArea;
    const squareInches = squareFeet * 144;
    const squareYards = squareFeet / 9;
    const squareMeters = squareFeet * 0.09290304;
    const acres = squareFeet / 43560;

    const cost =
      price.trim() !== ""
        ? squareFeet * number(price)
        : null;

    setResult({
      squareFeet,
      squareInches,
      squareYards,
      squareMeters,
      acres,
      cost,
    });
  };

  const clearCalculator = () => {
    setLength("");
    setWidth("");
    setQuantity("1");
    setUnit("feet");
    setBorderWidth("");
    setRadius("");
    setSideA("");
    setSideB("");
    setSideC("");
    setWaste("0");
    setPrice("");
    setResult(null);
  };

  const inputClass =
    "h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-5">
          <div className="mb-2 text-sm text-blue-600">
            Calculators / Construction / Area
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Square Footage Calculator
          </h1>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Calculate square feet, square inches, square yards,
            square meters and acres for construction projects.
          </p>
        </div>

        {/* Calculator */}
        <section className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">

          {/* Calculator Header */}
          <div className="border-b border-slate-200 bg-blue-700 px-4 py-3 text-center text-lg font-bold text-white">
            Square Footage Calculator
          </div>

          <div className="p-4 sm:p-6">

            {/* Shape */}
            <div className="mb-5">
              <label className={labelClass}>
                Area or Shape
              </label>

              <select
                value={shape}
                onChange={(e) => {
                  setShape(e.target.value);
                  setResult(null);
                }}
                className={inputClass}
              >
                {shapes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Rectangle */}
            {(shape === "Rectangle" ||
              shape === "Rectangle Border") && (
              <div className="space-y-4">

                <div>
                  <label className={labelClass}>
                    Length
                  </label>

                  <div className="grid grid-cols-[1fr_130px] gap-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="0"
                      className={inputClass}
                    />

                    <select
                      value={unit}
                      onChange={(e) =>
                        setUnit(e.target.value as Unit)
                      }
                      className={inputClass}
                    >
                      {Object.entries(unitLabels).map(
                        ([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Width
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>

                {shape === "Rectangle Border" && (
                  <div>
                    <label className={labelClass}>
                      Border Width
                    </label>

                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      value={borderWidth}
                      onChange={(e) =>
                        setBorderWidth(e.target.value)
                      }
                      placeholder="0"
                      className={inputClass}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Square */}
            {shape === "Square" && (
              <div>
                <label className={labelClass}>
                  Side Length
                </label>

                <div className="grid grid-cols-[1fr_130px] gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />

                  <select
                    value={unit}
                    onChange={(e) =>
                      setUnit(e.target.value as Unit)
                    }
                    className={inputClass}
                  >
                    {Object.entries(unitLabels).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* Circle */}
            {shape === "Circle" && (
              <div>
                <label className={labelClass}>
                  Diameter
                </label>

                <div className="grid grid-cols-[1fr_130px] gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />

                  <select
                    value={unit}
                    onChange={(e) =>
                      setUnit(e.target.value as Unit)
                    }
                    className={inputClass}
                  >
                    {Object.entries(unitLabels).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            )}

            {/* Circle Border / Annulus */}
            {(shape === "Circle Border" ||
              shape === "Annulus") && (
              <div className="space-y-4">

                <div>
                  <label className={labelClass}>
                    Outer Diameter
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Border Width
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={borderWidth}
                    onChange={(e) =>
                      setBorderWidth(e.target.value)
                    }
                    placeholder="0"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* Triangle */}
            {shape === "Triangle" && (
              <div className="space-y-4">

                <div>
                  <label className={labelClass}>
                    Side A
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={sideA}
                    onChange={(e) => setSideA(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Side B
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={sideB}
                    onChange={(e) => setSideB(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Side C
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={sideC}
                    onChange={(e) => setSideC(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* Trapezoid */}
            {shape === "Trapezoid" && (
              <div className="space-y-4">

                <div>
                  <label className={labelClass}>
                    Base A
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={sideA}
                    onChange={(e) => setSideA(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Base B
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={sideB}
                    onChange={(e) => setSideB(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Height
                  </label>

                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    value={sideC}
                    onChange={(e) => setSideC(e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-5">
              <label className={labelClass}>
                Quantity
              </label>

              <input
                type="number"
                inputMode="numeric"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Waste */}
            <fieldset className="mt-6 rounded-lg border border-slate-300 p-4">
              <legend className="px-2 text-sm font-medium text-slate-500">
                Optional Material Waste
              </legend>

              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">
                  Add an extra
                </span>

                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={waste}
                  onChange={(e) => setWaste(e.target.value)}
                  className="h-11 w-24 rounded-lg border border-slate-300 px-3 text-center outline-none focus:border-blue-600"
                />

                <span className="text-sm text-slate-600">
                  %
                </span>
              </div>
            </fieldset>

            {/* Price */}
            <fieldset className="mt-4 rounded-lg border border-slate-300 p-4">
              <legend className="px-2 text-sm font-medium text-slate-500">
                Optional Material Cost
              </legend>

              <div className="grid grid-cols-[90px_1fr] gap-2">
                <div className="flex h-11 items-center rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm text-slate-600">
                  $ / ft²
                </div>

                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price per square foot"
                  className="h-11 rounded-lg border border-slate-300 px-3 outline-none focus:border-blue-600"
                />
              </div>
            </fieldset>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={calculate}
                className="flex-1 rounded-lg bg-blue-700 px-5 py-3 text-base font-bold text-white transition hover:bg-blue-800 active:scale-[0.99]"
              >
                Calculate
              </button>

              <button
                type="button"
                onClick={clearCalculator}
                className="rounded-lg bg-slate-200 px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-300"
              >
                Clear
              </button>
            </div>

            {/* Answer */}
            <div className="mt-6 rounded-lg border border-slate-300 bg-slate-50 p-4">

              <h2 className="mb-4 text-lg font-bold text-slate-900">
                Answer
              </h2>

              {result ? (
                <div className="space-y-3 text-sm">

                  <ResultRow
                    label="Square Feet"
                    value={`${result.squareFeet.toFixed(2)} ft²`}
                  />

                  <ResultRow
                    label="Square Inches"
                    value={`${result.squareInches.toFixed(2)} in²`}
                  />

                  <ResultRow
                    label="Square Yards"
                    value={`${result.squareYards.toFixed(2)} yd²`}
                  />

                  <ResultRow
                    label="Square Meters"
                    value={`${result.squareMeters.toFixed(2)} m²`}
                  />

                  <ResultRow
                    label="Acres"
                    value={result.acres.toFixed(4)}
                  />

                  {result.cost !== null && (
                    <ResultRow
                      label="Estimated Cost"
                      value={`$${result.cost.toFixed(2)}`}
                    />
                  )}

                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Enter your measurements and click Calculate.
                </p>
              )}
            </div>

          </div>
        </section>

        {/* Explanation */}
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-bold text-slate-900">
            How to Calculate Square Footage
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            For a rectangular area, multiply the length by the width.
            Make sure both measurements use the same unit.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center font-semibold text-slate-800">
            Square Feet = Length × Width
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Use the Quantity field when you have multiple areas with
            the same dimensions. You can also add a material waste
            percentage when estimating construction materials.
          </p>
        </section>

      </div>
    </main>
  );
}

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 pb-2 last:border-0">
      <span className="text-slate-600">
        {label}
      </span>

      <strong className="text-slate-950">
        {value}
      </strong>
    </div>
  );
}
