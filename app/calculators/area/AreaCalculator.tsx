"use client";

import Image from "next/image";
import { useState } from "react";

type Unit = "feet" | "inches" | "yards" | "meters";

type Result = {
  areaSqFt: number;
  squareInches: number;
  squareYards: number;
  squareMeters: number;
  acres: number;
  formula: string;
};

const unitToFeet: Record<Unit, number> = {
  feet: 1,
  inches: 1 / 12,
  yards: 3,
  meters: 3.280839895013123,
};

const unitLabels: Record<Unit, string> = {
  feet: "feet",
  inches: "inches",
  yards: "yards",
  meters: "meters",
};

const shapes = [
  "Rectangle",
  "Square",
  "Circle",
  "Triangle",
  "Trapezoid",
  "Parallelogram",
  "Ellipse",
  "Sector",
];

function number(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function Field({
  label,
  value,
  onChange,
  unit,
  setUnit,
  inputClass,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  inputClass: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="grid grid-cols-[1fr_120px] gap-2">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
          placeholder="0"
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value as Unit)}
          className={inputClass}
          aria-label={`${label} unit`}
        >
          <option value="feet">feet</option>
          <option value="inches">inches</option>
          <option value="yards">yards</option>
          <option value="meters">meters</option>
        </select>
      </div>
    </div>
  );
}

function FormulaBox({
  formula,
}: {
  formula: string;
}) {
  return (
    <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
      <div className="text-xs font-bold uppercase tracking-wide text-blue-700">
        Formula
      </div>

      <div className="mt-1 text-base font-semibold text-slate-900">
        {formula}
      </div>
    </div>
  );
}

function ShapeDiagram({
  shape,
}: {
  shape: string;
}) {
  return (
    <div className="flex h-32 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
      {shape === "Rectangle" && (
        <div className="relative h-16 w-28 border-4 border-slate-800">
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-slate-500">
            length
          </span>

          <span className="absolute -right-12 top-1/2 -translate-y-1/2 rotate-90 text-xs text-slate-500">
            width
          </span>
        </div>
      )}

      {shape === "Square" && (
        <div className="relative h-20 w-20 border-4 border-slate-800">
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-slate-500">
            side
          </span>
        </div>
      )}

      {shape === "Circle" && (
        <div className="relative h-24 w-24 rounded-full border-4 border-slate-800">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-slate-500">
            radius
          </span>
        </div>
      )}

      {shape === "Triangle" && (
        <div className="relative h-0 w-0 border-b-[90px] border-l-[55px] border-r-[55px] border-b-slate-800 border-l-transparent border-r-transparent">
          <div className="absolute left-1/2 top-12 -translate-x-1/2 text-xs text-white">
            triangle
          </div>
        </div>
      )}

      {shape === "Trapezoid" && (
        <div className="h-0 w-0 border-b-[70px] border-l-[35px] border-r-[35px] border-b-slate-800 border-l-transparent border-r-transparent" />
      )}

      {shape === "Parallelogram" && (
        <div className="-skew-x-12 h-16 w-32 border-4 border-slate-800" />
      )}

      {shape === "Ellipse" && (
        <div className="h-20 w-32 rounded-[50%] border-4 border-slate-800" />
      )}

      {shape === "Sector" && (
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-slate-800">
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 border-l-4 border-t-4 border-slate-800" />
        </div>
      )}
    </div>
  );
}

export default function AreaCalculator() {
  const [shape, setShape] = useState("Rectangle");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [side, setSide] = useState("");

  const [base, setBase] = useState("");
  const [height, setHeight] = useState("");

  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");

  const [radius, setRadius] = useState("");
  const [majorAxis, setMajorAxis] = useState("");
  const [minorAxis, setMinorAxis] = useState("");

  const [angle, setAngle] = useState("");

  const [quantity, setQuantity] = useState("1");

  const [unit, setUnit] = useState<Unit>("feet");

  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const resetShapeFields = () => {
    setLength("");
    setWidth("");
    setSide("");
    setBase("");
    setHeight("");
    setSideA("");
    setSideB("");
    setSideC("");
    setRadius("");
    setMajorAxis("");
    setMinorAxis("");
    setAngle("");
    setQuantity("1");
    setResult(null);
    setError("");
  };

  const calculate = () => {
    setError("");

    const factor = unitToFeet[unit];
    const qty = Math.max(number(quantity), 1);

    let areaSqFt = 0;
    let formula = "";

    if (shape === "Rectangle") {
      const l = number(length) * factor;
      const w = number(width) * factor;

      if (l <= 0 || w <= 0) {
        setError("Enter a valid length and width.");
        setResult(null);
        return;
      }

      areaSqFt = l * w * qty;
      formula = "Area = Length × Width";
    }

    if (shape === "Square") {
      const s = number(side) * factor;

      if (s <= 0) {
        setError("Enter a valid side length.");
        setResult(null);
        return;
      }

      areaSqFt = s * s * qty;
      formula = "Area = Side²";
    }

    if (shape === "Circle") {
      const r = number(radius) * factor;

      if (r <= 0) {
        setError("Enter a valid radius.");
        setResult(null);
        return;
      }

      areaSqFt = Math.PI * r * r * qty;
      formula = "Area = π × r²";
    }

    if (shape === "Triangle") {
      const b = number(base) * factor;
      const h = number(height) * factor;

      if (b <= 0 || h <= 0) {
        setError("Enter a valid base and height.");
        setResult(null);
        return;
      }

      areaSqFt = (b * h) / 2 * qty;
      formula = "Area = ½ × Base × Height";
    }

    if (shape === "Trapezoid") {
      const a = number(sideA) * factor;
      const b = number(sideB) * factor;
      const h = number(height) * factor;

      if (a <= 0 || b <= 0 || h <= 0) {
        setError("Enter valid base and height values.");
        setResult(null);
        return;
      }

      areaSqFt = ((a + b) / 2) * h * qty;
      formula = "Area = ½ × (Base 1 + Base 2) × Height";
    }

    if (shape === "Parallelogram") {
      const b = number(base) * factor;
      const h = number(height) * factor;

      if (b <= 0 || h <= 0) {
        setError("Enter a valid base and height.");
        setResult(null);
        return;
      }

      areaSqFt = b * h * qty;
      formula = "Area = Base × Height";
    }

    if (shape === "Ellipse") {
      const a = number(majorAxis) * factor;
      const b = number(minorAxis) * factor;

      if (a <= 0 || b <= 0) {
        setError("Enter valid semi-major and semi-minor axes.");
        setResult(null);
        return;
      }

      areaSqFt = Math.PI * a * b * qty;
      formula = "Area = π × a × b";
    }

    if (shape === "Sector") {
      const r = number(radius) * factor;
      const a = number(angle);

      if (r <= 0 || a <= 0 || a > 360) {
        setError("Enter a radius and an angle from 0° to 360°.");
        setResult(null);
        return;
      }

      areaSqFt = (a / 360) * Math.PI * r * r * qty;
      formula = "Area = (θ / 360) × π × r²";
    }

    if (areaSqFt <= 0 || !Number.isFinite(areaSqFt)) {
      setError("Enter valid measurements.");
      setResult(null);
      return;
    }

    setResult({
      areaSqFt,
      squareInches: areaSqFt * 144,
      squareYards: areaSqFt / 9,
      squareMeters: areaSqFt * 0.09290304,
      acres: areaSqFt / 43560,
      formula,
    });
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-4xl px-5 py-7 sm:px-6 sm:py-10">

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 text-sm text-slate-500"
        >
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Calculators</span>
          <span className="mx-2">/</span>
          <span className="text-slate-800">
            Area Calculator
          </span>
        </nav>

        {/* Hero */}
        <section className="mb-7">
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Area Calculator
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Calculate the area of common shapes including
            rectangles, squares, circles, triangles,
            trapezoids, parallelograms and ellipses.
            Get your answer in square feet, square inches,
            square yards, square meters and acres.
          </p>
        </section>

        {/* Area Calculator Hero Image */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Image
            src="/cornerspan-area-calculator-hero.webp"
            alt="CornerSpan Area Calculator for calculating construction area"
            width={1672}
            height={941}
            priority
            className="h-auto w-full"
          />
        </div>

        {/* Calculator */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Header */}
          <div className="bg-blue-700 px-5 py-5 text-center sm:px-8">
            <h2 className="text-2xl font-black text-white">
              Area Calculator
            </h2>

            <p className="mt-1 text-sm text-blue-100">
              Choose a shape and enter your measurements
            </p>
          </div>

          <div className="p-5 sm:p-8">

            {/* Shape */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Shape
              </label>

              <select
                value={shape}
                onChange={(e) => {
                  setShape(e.target.value);
                  resetShapeFields();
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

            {/* Diagram */}
            <ShapeDiagram shape={shape} />

            {/* Rectangle */}
            {shape === "Rectangle" && (
              <div className="mt-6 space-y-5">
                <Field
                  label="Length"
                  value={length}
                  onChange={setLength}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />

                <Field
                  label="Width"
                  value={width}
                  onChange={setWidth}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />
              </div>
            )}

            {/* Square */}
            {shape === "Square" && (
              <div className="mt-6">
                <Field
                  label="Side Length"
                  value={side}
                  onChange={setSide}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />
              </div>
            )}

            {/* Circle */}
            {shape === "Circle" && (
              <div className="mt-6">
                <Field
                  label="Radius"
                  value={radius}
                  onChange={setRadius}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />
              </div>
            )}

            {/* Triangle */}
            {shape === "Triangle" && (
              <div className="mt-6 space-y-5">
                <Field
                  label="Base"
                  value={base}
                  onChange={setBase}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />

                <Field
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />
              </div>
            )}

            {/* Trapezoid */}
            {shape === "Trapezoid" && (
              <div className="mt-6 space-y-5">
                <Field
                  label="Base 1"
                  value={sideA}
                  onChange={setSideA}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />

                <Field
                  label="Base 2"
                  value={sideB}
                  onChange={setSideB}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />

                <Field
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />
              </div>
            )}

            {/* Parallelogram */}
            {shape === "Parallelogram" && (
              <div className="mt-6 space-y-5">
                <Field
                  label="Base"
                  value={base}
                  onChange={setBase}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />

                <Field
                  label="Height"
                  value={height}
                  onChange={setHeight}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />
              </div>
            )}

            {/* Ellipse */}
            {shape === "Ellipse" && (
              <div className="mt-6 space-y-5">
                <Field
                  label="Semi-major Axis"
                  value={majorAxis}
                  onChange={setMajorAxis}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />

                <Field
                  label="Semi-minor Axis"
                  value={minorAxis}
                  onChange={setMinorAxis}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />
              </div>
            )}

            {/* Sector */}
            {shape === "Sector" && (
              <div className="mt-6 space-y-5">
                <Field
                  label="Radius"
                  value={radius}
                  onChange={setRadius}
                  unit={unit}
                  setUnit={setUnit}
                  inputClass={inputClass}
                />

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Angle
                  </label>

                  <div className="grid grid-cols-[1fr_120px] gap-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      max="360"
                      step="any"
                      value={angle}
                      onChange={(e) =>
                        setAngle(e.target.value)
                      }
                      className={inputClass}
                      placeholder="90"
                    />

                    <div className="flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-600">
                      degrees °
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Quantity
              </label>

              <input
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
                className={inputClass}
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Use quantity when calculating multiple
                identical shapes.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={calculate}
                className="h-12 rounded-xl bg-blue-700 px-5 text-sm font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                Calculate Area
              </button>

              <button
                type="button"
                onClick={resetShapeFields}
                className="h-12 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Clear
              </button>
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            {/* Result */}
            {result && (
              <div
                id="area-results"
                className="mt-7 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6"
              >
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
                    Your Area
                  </div>

                  <div className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                    {formatNumber(result.areaSqFt)}
                  </div>

                  <div className="mt-1 text-base font-semibold text-slate-600">
                    square feet
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl bg-white p-3 text-center">
                    <div className="text-xs text-slate-500">
                      Square Inches
                    </div>

                    <div className="mt-1 font-bold text-slate-900">
                      {formatNumber(
                        result.squareInches,
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-3 text-center">
                    <div className="text-xs text-slate-500">
                      Square Yards
                    </div>

                    <div className="mt-1 font-bold text-slate-900">
                      {formatNumber(
                        result.squareYards,
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-3 text-center">
                    <div className="text-xs text-slate-500">
                      Square Meters
                    </div>

                    <div className="mt-1 font-bold text-slate-900">
                      {formatNumber(
                        result.squareMeters,
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-3 text-center">
                    <div className="text-xs text-slate-500">
                      Acres
                    </div>

                    <div className="mt-1 font-bold text-slate-900">
                      {formatNumber(result.acres)}
                    </div>
                  </div>
                </div>

                <FormulaBox
                  formula={result.formula}
                />
              </div>
            )}
          </div>
        </section>

        {/* Explanation */}
        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            How to Calculate Area
          </h2>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Area measures the amount of two-dimensional
            surface inside a shape. The formula depends
            on the shape you are measuring. Enter the
            dimensions using the same unit and the
            calculator converts the result into common
            area units automatically.
          </p>
        </section>

        {/* Formula cards */}
        <section className="mt-8">
          <h2 className="text-2xl font-black text-slate-950">
            Common Area Formulas
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Rectangle
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Area = Length × Width
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Square
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Area = Side²
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Circle
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Area = π × r²
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Triangle
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Area = ½ × Base × Height
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Trapezoid
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Area = ½ × (Base 1 + Base 2) × Height
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Parallelogram
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Area = Base × Height
              </p>
            </div>
          </div>
        </section>

        {/* Construction uses */}
        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            Common Construction Uses
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900">
                Flooring
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Calculate floor area before estimating
                tile, flooring or other materials.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900">
                Painting
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Determine the surface area of walls,
                ceilings and other surfaces.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900">
                Concrete
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Find surface area before using a concrete
                volume calculator.
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-900">
                Land & Property
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Convert measured dimensions into square
                feet, square meters or acres.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-2xl font-black text-slate-950">
            Area Calculator FAQ
          </h2>

          <div className="mt-5 space-y-3">
            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                How do I calculate the area of a rectangle?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Multiply the rectangle's length by its
                width. For example, a 20-foot by 10-foot
                rectangle has an area of 200 square feet.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                What is the difference between area and
                perimeter?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Area measures the surface inside a shape,
                while perimeter measures the distance
                around its boundary.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                Can I calculate area in meters?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Yes. Select meters as the measurement unit.
                The calculator converts the result to square
                meters and other common area units.
              </p>
            </details>

            <details className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="cursor-pointer font-bold text-slate-900">
                What is the formula for a circle?
              </summary>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                The area of a circle is π multiplied by the
                radius squared: A = πr².
              </p>
            </details>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="mt-10 text-xs leading-5 text-slate-500">
          Results are mathematical estimates based on the
          measurements entered. Verify dimensions and
          project requirements before ordering materials or
          beginning construction work.
        </p>
      </div>
    </main>
  );
}
