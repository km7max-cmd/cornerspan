"use client";

import { useMemo, useState } from "react";

type UnitSystem = "imperial" | "metric";

type Currency =
  | "USD"
  | "EUR"
  | "GBP"
  | "CAD"
  | "AUD"
  | "INR";

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  AUD: "A$",
  INR: "₹",
};

const pitchOptions = [
  0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12,
];

const wasteOptions = [0, 5, 10, 15, 20];

function formatNumber(
  value: number,
  decimals = 2
) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(value);
}

/*
 * Prevent floating-point values such as:
 * 33.299998
 *
 * from appearing in the input.
 */
function roundInputValue(
  value: number,
  decimals = 4
) {
  return Number(value.toFixed(decimals));
}

function getPitchMultiplier(rise: number) {
  return Math.sqrt(
    1 + Math.pow(rise / 12, 2)
  );
}

function getPitchAngle(rise: number) {
  return (
    (Math.atan(rise / 12) * 180) /
    Math.PI
  );
}

export default function RoofingCalculator() {
  const [unitSystem, setUnitSystem] =
    useState<UnitSystem>("imperial");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const [pitch, setPitch] = useState("6");

  const [waste, setWaste] = useState("10");

  /*
   * Typical example coverage.
   * User can replace this with the actual
   * coverage printed on the shingle package.
   */
  const [bundleCoverage, setBundleCoverage] =
    useState("33.3");

  const [currency, setCurrency] =
    useState<Currency>("USD");

  const [pricePerSquare, setPricePerSquare] =
    useState("");

  const [error, setError] = useState("");

  const [result, setResult] = useState<{
    footprint: number;
    roofArea: number;
    orderArea: number;
    squares: number;
    bundles: number;
    multiplier: number;
    angle: number;
    cost: number | null;
  } | null>(null);

  const units = useMemo(() => {
    if (unitSystem === "imperial") {
      return {
        length: "ft",
        area: "ft²",
      };
    }

    return {
      length: "m",
      area: "m²",
    };
  }, [unitSystem]);

  function calculate() {
    setError("");

    const l = Number(length);
    const w = Number(width);
    const pitchValue = Number(pitch);
    const wasteValue = Number(waste);
    const coverage = Number(bundleCoverage);

    const hasPrice =
      pricePerSquare.trim() !== "";

    const price = Number(pricePerSquare);

    /*
     * Length / Width validation
     */
    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      l <= 0 ||
      w <= 0
    ) {
      setResult(null);

      setError(
        "Please enter a valid building length and width."
      );

      return;
    }

    /*
     * Pitch validation
     */
    if (
      !Number.isFinite(pitchValue) ||
      pitchValue < 0
    ) {
      setResult(null);

      setError(
        "Please select a valid roof pitch."
      );

      return;
    }

    /*
     * Waste validation
     */
    if (
      !Number.isFinite(wasteValue) ||
      wasteValue < 0
    ) {
      setResult(null);

      setError(
        "Please select a valid waste percentage."
      );

      return;
    }

    /*
     * Bundle coverage validation
     */
    if (
      !Number.isFinite(coverage) ||
      coverage <= 0
    ) {
      setResult(null);

      setError(
        "Please enter a valid bundle coverage."
      );

      return;
    }

    /*
     * Optional price validation
     */
    if (
      hasPrice &&
      (!Number.isFinite(price) || price < 0)
    ) {
      setResult(null);

      setError(
        "Please enter a valid price per roofing square."
      );

      return;
    }

    /*
     * 1. Building footprint
     */
    const footprint = l * w;

    /*
     * 2. Pitch multiplier
     *
     * √(1 + (rise / 12)²)
     */
    const multiplier =
      getPitchMultiplier(pitchValue);

    /*
     * 3. Actual sloped roof area
     */
    const roofArea =
      footprint * multiplier;

    /*
     * 4. Add waste / overage
     */
    const orderArea =
      roofArea *
      (1 + wasteValue / 100);

    /*
     * One U.S. roofing square:
     *
     * 100 ft²
     * 9.290304 m²
     */
    const roofingSquareArea =
      unitSystem === "imperial"
        ? 100
        : 9.290304;

    /*
     * Roofing squares
     */
    const squares =
      orderArea / roofingSquareArea;

    /*
     * Bundle coverage is already expressed
     * in the currently selected area unit.
     */
    const bundles = Math.ceil(
      orderArea / coverage
    );

    /*
     * Roof pitch angle
     */
    const angle =
      getPitchAngle(pitchValue);

    /*
     * Optional material cost
     *
     * Cost uses rounded whole roofing squares.
     */
    const cost =
      hasPrice
        ? Math.ceil(squares) * price
        : null;

    setResult({
      footprint,
      roofArea,
      orderArea,
      squares,
      bundles,
      multiplier,
      angle,
      cost,
    });

    /*
     * Bring result into view after calculation.
     */
    setTimeout(() => {
      document
        .getElementById("roofing-result")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
    }, 50);
  }

  function switchUnitSystem(
    nextSystem: UnitSystem
  ) {
    if (nextSystem === unitSystem) {
      return;
    }

    /*
     * Convert Length
     *
     * ft → m
     * m → ft
     */
    if (length.trim() !== "") {
      const value = Number(length);

      if (Number.isFinite(value)) {
        const converted =
          nextSystem === "metric"
            ? value * 0.3048
            : value / 0.3048;

        setLength(
          String(
            roundInputValue(converted)
          )
        );
      }
    }

    /*
     * Convert Width
     */
    if (width.trim() !== "") {
      const value = Number(width);

      if (Number.isFinite(value)) {
        const converted =
          nextSystem === "metric"
            ? value * 0.3048
            : value / 0.3048;

        setWidth(
          String(
            roundInputValue(converted)
          )
        );
      }
    }

    /*
     * Convert Bundle Coverage
     *
     * ft² → m²
     * m² → ft²
     *
     * Rounded to 4 decimals to avoid
     * values such as 33.299998.
     */
    if (
      bundleCoverage.trim() !== ""
    ) {
      const value =
        Number(bundleCoverage);

      if (Number.isFinite(value)) {
        const converted =
          nextSystem === "metric"
            ? value * 0.09290304
            : value / 0.09290304;

        setBundleCoverage(
          String(
            roundInputValue(converted)
          )
        );
      }
    }

    setUnitSystem(nextSystem);

    /*
     * Previous result is cleared because
     * the user changed measurement system.
     */
    setResult(null);
    setError("");
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Calculator Header */}
        <div className="bg-slate-950 px-5 py-5 text-white sm:px-7">

          <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
            ROOFING ESTIMATOR
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
            Roofing Calculator
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Estimate roof area, roofing squares,
            shingle bundles and material cost.
          </p>

        </div>

        {/* Calculator Body */}
        <div className="space-y-5 bg-slate-50 p-5 sm:p-7">

          {/* Measurement System */}
          <div>

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Measurement System
            </label>

            <div className="grid grid-cols-2 gap-2">

              <button
                type="button"
                onClick={() =>
                  switchUnitSystem("imperial")
                }
                className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                  unitSystem === "imperial"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                US / Imperial
              </button>

              <button
                type="button"
                onClick={() =>
                  switchUnitSystem("metric")
                }
                className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                  unitSystem === "metric"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                }`}
              >
                Metric
              </button>

            </div>
          </div>

          {/* Building Dimensions */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">

            <h3 className="mb-4 text-base font-extrabold text-slate-900">
              Building Dimensions
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              <Field
                label={`Building Length (${units.length})`}
                value={length}
                onChange={(value) => {
                  setLength(value);
                  setResult(null);
                  setError("");
                }}
                placeholder={
                  unitSystem === "imperial"
                    ? "Enter length in feet"
                    : "Enter length in meters"
                }
              />

              <Field
                label={`Building Width (${units.length})`}
                value={width}
                onChange={(value) => {
                  setWidth(value);
                  setResult(null);
                  setError("");
                }}
                placeholder={
                  unitSystem === "imperial"
                    ? "Enter width in feet"
                    : "Enter width in meters"
                }
              />

            </div>
          </div>

          {/* Roof Pitch */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">

            <label className="mb-2 block text-sm font-bold text-slate-700">
              Roof Pitch
            </label>

            <select
              value={pitch}
              onChange={(event) => {
                setPitch(
                  event.target.value
                );

                setResult(null);
              }}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {pitchOptions.map(
                (value) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {value}:12{" "}
                    {value === 0
                      ? "(Flat)"
                      : ""}
                  </option>
                )
              )}
            </select>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Example: 6:12 means the roof
              rises 6 units for every 12 units
              of horizontal run.
            </p>

          </div>

          {/* Waste + Coverage */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Waste */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Waste / Overage
              </label>

              <select
                value={waste}
                onChange={(event) => {
                  setWaste(
                    event.target.value
                  );

                  setResult(null);
                }}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {wasteOptions.map(
                  (value) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {value}%
                    </option>
                  )
                )}
              </select>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Complex roofs may require
                more allowance.
              </p>

            </div>

            {/* Bundle Coverage */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Bundle Coverage ({units.area})
              </label>

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={bundleCoverage}
                onChange={(event) => {
                  setBundleCoverage(
                    event.target.value
                  );

                  setResult(null);
                  setError("");
                }}
                placeholder={
                  unitSystem === "imperial"
                    ? "Example: 33.3"
                    : "Example: 3.09"
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Use the coverage printed on
                the shingle package.
              </p>

            </div>

          </div>

          {/* Optional Cost */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">

            <h3 className="mb-4 text-base font-extrabold text-slate-900">
              Optional Cost Estimate
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Currency */}
              <div>

                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(event) =>
                    setCurrency(
                      event.target
                        .value as Currency
                    )
                  }
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="USD">
                    USD ($)
                  </option>

                  <option value="EUR">
                    EUR (€)
                  </option>

                  <option value="GBP">
                    GBP (£)
                  </option>

                  <option value="CAD">
                    CAD (C$)
                  </option>

                  <option value="AUD">
                    AUD (A$)
                  </option>

                  <option value="INR">
                    INR (₹)
                  </option>
                </select>

              </div>

              {/* Price */}
              <Field
                label={`Price per roofing square (${currency})`}
                value={pricePerSquare}
                onChange={(value) => {
                  setPricePerSquare(
                    value
                  );

                  setResult(null);
                  setError("");
                }}
                placeholder="Optional"
              />

            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Enter your local material price.
              Currency selection only changes the
              displayed currency. No live exchange
              rate is used.
            </p>

          </div>

          {/* Validation Error */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          {/* Calculate Button */}
          <button
            type="button"
            onClick={calculate}
            className="w-full rounded-xl bg-blue-600 px-5 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Calculate Roofing
          </button>

          {/* Results */}
          {result && (
            <div
              id="roofing-result"
              className="space-y-3"
              aria-live="polite"
            >

              {/* Primary Result */}
              <div className="rounded-2xl bg-slate-950 p-5 text-white">

                <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Roofing Material to Order
                </p>

                <p className="mt-1 text-4xl font-black">
                  {formatNumber(
                    result.squares
                  )}{" "}
                  squares
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {result.bundles.toLocaleString(
                    "en-US"
                  )}{" "}
                  shingle bundles
                </p>

              </div>

              {/* Result Cards */}
              <div className="grid gap-3 sm:grid-cols-2">

                <ResultCard
                  label="Building Footprint"
                  value={`${formatNumber(
                    result.footprint
                  )} ${units.area}`}
                />

                <ResultCard
                  label="Roof Surface Area"
                  value={`${formatNumber(
                    result.roofArea
                  )} ${units.area}`}
                />

                <ResultCard
                  label="Area with Waste"
                  value={`${formatNumber(
                    result.orderArea
                  )} ${units.area}`}
                />

                <ResultCard
                  label="Pitch Multiplier"
                  value={formatNumber(
                    result.multiplier,
                    3
                  )}
                />

                <ResultCard
                  label="Roof Angle"
                  value={`${formatNumber(
                    result.angle,
                    1
                  )}°`}
                />

                <ResultCard
                  label="Rounded Squares to Order"
                  value={`${Math.ceil(
                    result.squares
                  )} squares`}
                />

              </div>

              {/* Cost Result */}
              {result.cost !== null && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">

                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Estimated Material Cost
                  </p>

                  <p className="mt-1 text-2xl font-black text-emerald-900">
                    {
                      currencySymbols[
                        currency
                      ]
                    }
                    {formatNumber(
                      result.cost
                    )}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-emerald-800">
                    Based on the rounded roofing
                    squares and the price you entered.
                    Labor and accessories are not
                    included.
                  </p>

                </div>
              )}

            </div>
          )}

          {/* Calculator Note */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">

            <strong>Important:</strong>{" "}
            Actual roof quantities can vary because
            of valleys, hips, dormers, overhangs,
            penetrations and cutting waste. Always
            verify final quantities with the roofing
            manufacturer, supplier or contractor.

          </div>

        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type="number"
        min="0"
        step="any"
        inputMode="decimal"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

    </div>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">

      <p className="text-xs font-semibold text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-extrabold text-slate-900">
        {value}
      </p>

    </div>
  );
}
