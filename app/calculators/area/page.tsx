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
  "Known Area",
  "Room",
  "Wall with Window",
  "Cathedral Wall",
  "Square",
  "Rectangle",
  "Rectangle Border",
  "Circle",
  "Circle Border",
  "Annulus",
  "Triangle",
  "Triangle 1/2 b×h",
  "Trapezoid",
];

export default function SquareFootageCalculator() {
  const [shape, setShape] = useState("Rectangle");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("1");

  const [unit, setUnit] = useState<Unit>("feet");

  const [borderWidth, setBorderWidth] = useState("");

  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");

  const [windowWidth, setWindowWidth] = useState("");
  const [windowHeight, setWindowHeight] = useState("");
  const [windowQuantity, setWindowQuantity] = useState("1");

  const [waste, setWaste] = useState("0");
  const [price, setPrice] = useState("");

  const [knownArea, setKnownArea] = useState("");

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

    /* Known Area */
    if (shape === "Known Area") {
      areaSqFt = number(knownArea) * factor * factor * qty;
    }

    /* Rectangle */
    if (shape === "Rectangle") {
      const l = number(length) * factor;
      const w = number(width) * factor;

      areaSqFt = l * w * qty;
    }

    /* Room */
    if (shape === "Room") {
      const l = number(length) * factor;
      const w = number(width) * factor;

      areaSqFt = l * w * qty;
    }

    /* Square */
    if (shape === "Square") {
      const side = number(length) * factor;

      areaSqFt = side * side * qty;
    }

    /* Wall */
    if (shape === "Wall with Window") {
      const wallW = number(length) * factor;
      const wallH = number(height) * factor;

      const totalWallArea = wallW * wallH * qty;

      const winW = number(windowWidth) * factor;
      const winH = number(windowHeight) * factor;
      const winQty = Math.max(number(windowQuantity), 1);

      const windowArea = winW * winH * winQty;

      areaSqFt = Math.max(totalWallArea - windowArea, 0);
    }

    /* Cathedral Wall */
    if (shape === "Cathedral Wall") {
      const wallW = number(width) * factor;
      const wallH = number(height) * factor;
      const peakH = number(sideA) * factor;

      const rectangleArea = wallW * wallH;

      const triangleArea = (wallW * peakH) / 2;

      areaSqFt =
        (rectangleArea + triangleArea) * qty;
    }

    /* Rectangle Border */
    if (shape === "Rectangle Border") {
      const l = number(length) * factor;
      const w = number(width) * factor;
      const border = number(borderWidth) * factor;

      const outerArea = l * w;

      const innerL = Math.max(l - border * 2, 0);
      const innerW = Math.max(w - border * 2, 0);

      const innerArea = innerL * innerW;

      areaSqFt =
        Math.max(outerArea - innerArea, 0) * qty;
    }

    /* Circle */
    if (shape === "Circle") {
      const diameter = number(length) * factor;
      const radius = diameter / 2;

      areaSqFt =
        Math.PI * radius * radius * qty;
    }

    /* Circle Border / Annulus */
    if (
      shape === "Circle Border" ||
      shape === "Annulus"
    ) {
      const outerDiameter =
        number(length) * factor;

      const border =
        number(borderWidth) * factor;

      const outerRadius = outerDiameter / 2;

      const innerRadius = Math.max(
        outerRadius - border,
        0
      );

      const outerArea =
        Math.PI * outerRadius * outerRadius;

      const innerArea =
        Math.PI * innerRadius * innerRadius;

      areaSqFt =
        Math.max(outerArea - innerArea, 0) *
        qty;
    }

    /* Triangle – 3 sides */
    if (shape === "Triangle") {
      const a = number(sideA) * factor;
      const b = number(sideB) * factor;
      const c = number(sideC) * factor;

      const semi = (a + b + c) / 2;

      if (
        a > 0 &&
        b > 0 &&
        c > 0 &&
        semi > a &&
        semi > b &&
        semi > c
      ) {
        areaSqFt =
          Math.sqrt(
            semi *
              (semi - a) *
              (semi - b) *
              (semi - c)
          ) * qty;
      }
    }

    /* Triangle 1/2 b × h */
    if (shape === "Triangle 1/2 b×h") {
      const base = number(sideA) * factor;
      const h = number(height) * factor;

      areaSqFt =
        (base * h) / 2 * qty;
    }

    /* Trapezoid */
    if (shape === "Trapezoid") {
      const a = number(sideA) * factor;
      const b = number(sideB) * factor;
      const h = number(height) * factor;

      areaSqFt =
        ((a + b) / 2) * h * qty;
    }

    if (!areaSqFt || areaSqFt < 0) {
      setResult(null);
      return;
    }

    /* Waste */
    const wastePercent =
      Math.max(number(waste), 0);

    const finalArea =
      areaSqFt *
      (1 + wastePercent / 100);

    const squareFeet = finalArea;

    const squareInches =
      squareFeet * 144;

    const squareYards =
      squareFeet / 9;

    const squareMeters =
      squareFeet * 0.09290304;

    const acres =
      squareFeet / 43560;

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
    setHeight("");
    setQuantity("1");

    setUnit("feet");

    setBorderWidth("");

    setSideA("");
    setSideB("");
    setSideC("");

    setWindowWidth("");
    setWindowHeight("");
    setWindowQuantity("1");

    setWaste("0");
    setPrice("");

    setKnownArea("");

    setResult(null);
  };

  const inputClass =
    "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-2xl">

        {/* Breadcrumb */}
        <div className="mb-2 text-sm text-blue-700">
          Calculators / Construction / Area
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Square Footage Calculator
        </h1>

        <p className="mt-3 text-base leading-7 text-slate-600">
          Calculate square feet, square inches,
          square yards, square meters and acres
          for construction projects.
        </p>

        {/* Calculator */}
        <section className="mt-6 overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">

          {/* Calculator Title */}
          <div className="bg-blue-700 px-4 py-3 text-center text-lg font-bold text-white">
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
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Known Area */}
            {shape === "Known Area" && (
              <Field
                label="Area"
                value={knownArea}
                onChange={setKnownArea}
                unit={unit}
                setUnit={setUnit}
                inputClass={inputClass}
                labelClass={labelClass}
              />
            )}

            {/* Rectangle / Room */}
            {(shape === "Rectangle" ||
              shape === "Room") && (
              <div className="space-y-4">

                <Field
                  label="Length"
                  value={length}
                  onChange={setLength}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Width"
                  value={width}
                  onChange={setWidth}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

              </div>
            )}

            {/* Square */}
            {shape === "Square" && (
              <Field
                label="Side Length"
                value={length}
                onChange={setLength}
                unit={unit}
                setUnit={setUnit}
                inputClass={inputClass}
                labelClass={labelClass}
              />
            )}

            {/* Wall with Window */}
            {shape === "Wall with Window" && (
              <div className="space-y-4">

                <Field
                  label="Wall Width"
                  value={length}
                  onChange={setLength}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Wall Height"
                  value={height}
                  onChange={setHeight}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

                  <h3 className="mb-3 font-semibold text-slate-800">
                    Window
                  </h3>

                  <div className="space-y-4">

                    <Field
                      label="Window Width"
                      value={windowWidth}
                      onChange={setWindowWidth}
                      unit={unit}
                      setUnit={setUnit}
                      inputClass={inputClass}
                      labelClass={labelClass}
                    />

                    <Field
                      label="Window Height"
                      value={windowHeight}
                      onChange={setWindowHeight}
                      unit={unit}
                      setUnit={setUnit}
                      inputClass={inputClass}
                      labelClass={labelClass}
                    />

                    <div>
                      <label className={labelClass}>
                        Window Quantity
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={windowQuantity}
                        onChange={(e) =>
                          setWindowQuantity(
                            e.target.value
                          )
                        }
                        className={inputClass}
                      />
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* Cathedral Wall */}
            {shape === "Cathedral Wall" && (
              <div className="space-y-4">

                <Field
                  label="Wall Width"
                  value={width}
                  onChange={setWidth}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Wall Height"
                  value={height}
                  onChange={setHeight}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Triangle Height"
                  value={sideA}
                  onChange={setSideA}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

              </div>
            )}

            {/* Rectangle Border */}
            {shape === "Rectangle Border" && (
              <div className="space-y-4">

                <Field
                  label="Length"
                  value={length}
                  onChange={setLength}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Width"
                  value={width}
                  onChange={setWidth}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Border Width"
                  value={borderWidth}
                  onChange={setBorderWidth}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

              </div>
            )}

            {/* Circle */}
            {shape === "Circle" && (
              <Field
                label="Diameter"
                value={length}
                onChange={setLength}
                unit={unit}
                setUnit={setUnit}
                inputClass={inputClass}
                labelClass={labelClass}
              />
            )}

            {/* Circle Border / Annulus */}
            {(shape === "Circle Border" ||
              shape === "Annulus") && (
              <div className="space-y-4">

                <Field
                  label="Outer Diameter"
                  value={length}
                  onChange={setLength}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Border Width"
                  value={borderWidth}
                  onChange={setBorderWidth}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

              </div>
            )}

            {/* Triangle */}
            {shape === "Triangle" && (
              <div className="space-y-4">

                <Field
                  label="Side A"
                  value={sideA}
                  onChange={setSideA}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Side B"
                  value={sideB}
                  onChange={setSideB}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Side C"
                  value={sideC}
                  onChange={setSideC}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

              </div>
            )}

            {/* Triangle 1/2 b×h */}
            {shape === "Triangle 1/2 b×h" && (
              <div className="space-y-4">

                <Field
                  label="Base"
                  value={sideA}
                  onChange={setSideA}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

              </div>
            )}

            {/* Trapezoid */}
            {shape === "Trapezoid" && (
              <div className="space-y-4">

                <Field
                  label="Base A"
                  value={sideA}
                  onChange={setSideA}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Base B"
                  value={sideB}
                  onChange={setSideB}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

                <Field
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                  labelClass={labelClass}
                />

              </div>
            )}

            {/* Quantity */}
            <div className="mt-5">
              <label className={labelClass}>
                Quantity
              </label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                className={inputClass}
              />
            </div>

            {/* Waste */}
            <fieldset className="mt-5 rounded-lg border border-slate-300 p-4">
              <legend className="px-2 text-sm font-medium text-slate-500">
                Optional Material Waste
              </legend>

              <div className="flex items-center gap-3">

                <span className="text-sm text-slate-600">
                  Add an extra
                </span>

                <input
                  type="number"
                  min="0"
                  value={waste}
                  onChange={(e) =>
                    setWaste(e.target.value)
                  }
                  className="h-10 w-24 rounded-md border border-slate-300 px-3 text-center outline-none focus:border-blue-600"
                />

                <span className="text-sm text-slate-600">
                  %
                </span>

              </div>
            </fieldset>

            {/* Cost */}
            <fieldset className="mt-4 rounded-lg border border-slate-300 p-4">
              <legend className="px-2 text-sm font-medium text-slate-500">
                Optional Material Cost
              </legend>

              <div>
                <label className={labelClass}>
                  Price per square foot ($)
                </label>

                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="0"
                  className={inputClass}
                />
              </div>
            </fieldset>

            {/* Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={calculate}
                className="rounded-md bg-blue-700 px-5 py-3 font-bold text-white hover:bg-blue-800"
              >
                Calculate
              </button>

              <button
                type="button"
                onClick={clearCalculator}
                className="rounded-md bg-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-300"
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
                <div className="space-y-3">

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

        {/* Simple Explanation */}
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

          <h2 className="text-xl font-bold text-slate-900">
            How to Calculate Square Footage
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            For a rectangular area, multiply the
            length by the width.
          </p>

          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-center font-semibold text-slate-800">
            Square Feet = Length × Width
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            For irregular areas, select the appropriate
            shape above and enter the required measurements.
          </p>

        </section>

      </div>
    </main>
  );
}

/* Input Field */

function Field({
  label,
  value,
  onChange,
  unit,
  setUnit,
  inputClass,
  labelClass,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  inputClass: string;
  labelClass: string;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
      </label>

      <div className="grid grid-cols-[1fr_120px] gap-2">

        <input
          type="number"
          inputMode="decimal"
          min="0"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
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
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            )
          )}
        </select>

      </div>
    </div>
  );
}

/* Result */

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
