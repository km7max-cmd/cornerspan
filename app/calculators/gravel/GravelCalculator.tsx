"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ProjectUnit = "ft" | "yd" | "m";
type DepthUnit = "in" | "ft" | "yd" | "cm" | "m";

type Currency =
  | "USD"
  | "INR"
  | "EUR"
  | "GBP"
  | "CAD"
  | "AUD"
  | "AED";

const CURRENCIES: Record<Currency, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  AUD: "A$",
  AED: "د.إ",
};

const GRAVEL_TYPES = [
  { name: "Crushed Stone", density: 1.4 },
  { name: "Pea Gravel", density: 1.5 },
  { name: "River Rock", density: 1.45 },
  { name: "Road Base", density: 1.6 },
  { name: "Limestone", density: 1.5 },
];

function projectUnitLabel(unit: ProjectUnit) {
  if (unit === "ft") return "Feet (ft)";
  if (unit === "yd") return "Yards (yd)";
  return "Meters (m)";
}

function getDepthUnits(unit: ProjectUnit): DepthUnit[] {
  if (unit === "ft") return ["in", "ft"];
  if (unit === "yd") return ["in", "ft", "yd"];
  return ["cm", "m"];
}

function getDefaultDepthUnit(unit: ProjectUnit): DepthUnit {
  return unit === "m" ? "cm" : "in";
}

function lengthToFeet(
  value: number,
  unit: ProjectUnit
) {
  if (unit === "ft") return value;
  if (unit === "yd") return value * 3;
  return value * 3.280839895013123;
}

function depthToFeet(
  value: number,
  unit: DepthUnit
) {
  if (unit === "in") return value / 12;
  if (unit === "ft") return value;
  if (unit === "yd") return value * 3;
  if (unit === "cm") return value / 30.48;
  return value * 3.280839895013123;
}

function feetToProjectUnit(
  feet: number,
  unit: ProjectUnit
) {
  if (unit === "ft") return feet;
  if (unit === "yd") return feet / 3;
  return feet / 3.280839895013123;
}

function feetToDepthUnit(
  feet: number,
  unit: DepthUnit
) {
  if (unit === "in") return feet * 12;
  if (unit === "ft") return feet;
  if (unit === "yd") return feet / 3;
  if (unit === "cm") return feet * 30.48;
  return feet / 3.280839895013123;
}

function cleanInputValue(value: number) {
  if (!Number.isFinite(value)) return "";
  return String(Number(value.toFixed(4)));
}

function formatNumber(
  value: number,
  decimals = 2
) {
  if (!Number.isFinite(value)) return "0";

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export default function GravelCalculator() {
  /*
   * Inputs intentionally start empty.
   * No example numbers are placed inside
   * the input boxes.
   */
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");

  const [projectUnit, setProjectUnit] =
    useState<ProjectUnit>("ft");

  const [depthUnit, setDepthUnit] =
    useState<DepthUnit>("in");

  const [gravelType, setGravelType] =
    useState("Crushed Stone");

  /*
   * Gravel type has a default density.
   * User can still edit it.
   */
  const [density, setDensity] =
    useState("1.4");

  const [waste, setWaste] =
    useState("10");

  const [currency, setCurrency] =
    useState<Currency>("USD");

  const [pricePerTon, setPricePerTon] =
    useState("");

  const [calculated, setCalculated] =
    useState(false);

  /*
   * Preserve the same physical dimensions
   * when switching between ft / yd / m.
   */
  function handleProjectUnitChange(
    newUnit: ProjectUnit
  ) {
    if (newUnit === projectUnit) return;

    const currentLength = Number(length);
    const currentWidth = Number(width);
    const currentDepth = Number(depth);

    if (
      Number.isFinite(currentLength) &&
      currentLength > 0
    ) {
      const lengthFt =
        lengthToFeet(
          currentLength,
          projectUnit
        );

      setLength(
        cleanInputValue(
          feetToProjectUnit(
            lengthFt,
            newUnit
          )
        )
      );
    }

    if (
      Number.isFinite(currentWidth) &&
      currentWidth > 0
    ) {
      const widthFt =
        lengthToFeet(
          currentWidth,
          projectUnit
        );

      setWidth(
        cleanInputValue(
          feetToProjectUnit(
            widthFt,
            newUnit
          )
        )
      );
    }

    if (
      Number.isFinite(currentDepth) &&
      currentDepth > 0
    ) {
      const depthFt =
        depthToFeet(
          currentDepth,
          depthUnit
        );

      const allowedDepthUnits =
        getDepthUnits(newUnit);

      let newDepthUnit = depthUnit;

      if (
        !allowedDepthUnits.includes(
          newDepthUnit
        )
      ) {
        newDepthUnit =
          getDefaultDepthUnit(
            newUnit
          );
      }

      setDepthUnit(newDepthUnit);

      setDepth(
        cleanInputValue(
          feetToDepthUnit(
            depthFt,
            newDepthUnit
          )
        )
      );
    } else {
      const allowedDepthUnits =
        getDepthUnits(newUnit);

      if (
        !allowedDepthUnits.includes(
          depthUnit
        )
      ) {
        setDepthUnit(
          getDefaultDepthUnit(
            newUnit
          )
        );
      }
    }

    setProjectUnit(newUnit);
    setCalculated(false);
  }

  function handleGravelChange(
    value: string
  ) {
    setGravelType(value);

    const selected =
      GRAVEL_TYPES.find(
        (item) => item.name === value
      );

    if (selected) {
      setDensity(
        String(selected.density)
      );
    }

    setCalculated(false);
  }

  function calculate() {
    setCalculated(true);

    setTimeout(() => {
      document
        .getElementById(
          "gravel-results"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  const result = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);

    const wastePct = Number(waste);
    const densityValue = Number(density);
    const price = Number(pricePerTon);

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(d) ||
      l <= 0 ||
      w <= 0 ||
      d <= 0
    ) {
      return null;
    }

    if (
      !Number.isFinite(densityValue) ||
      densityValue <= 0
    ) {
      return null;
    }

    const lengthFt =
      lengthToFeet(
        l,
        projectUnit
      );

    const widthFt =
      lengthToFeet(
        w,
        projectUnit
      );

    const depthFt =
      depthToFeet(
        d,
        depthUnit
      );

    const areaSqFt =
      lengthFt * widthFt;

    const volumeCuFt =
      areaSqFt * depthFt;

    const volumeCuYd =
      volumeCuFt / 27;

    const volumeCuM =
      volumeCuFt *
      0.028316846592;

    const safeWaste =
      Number.isFinite(wastePct) &&
      wastePct > 0
        ? wastePct
        : 0;

    const wasteMultiplier =
      1 + safeWaste / 100;

    const orderCuFt =
      volumeCuFt *
      wasteMultiplier;

    const orderCuYd =
      volumeCuYd *
      wasteMultiplier;

    const orderCuM =
      volumeCuM *
      wasteMultiplier;

    const exactTons =
      volumeCuYd *
      densityValue;

    const orderTons =
      orderCuYd *
      densityValue;

    const wasteTons =
      orderTons - exactTons;

    const cost =
      Number.isFinite(price) &&
      price > 0
        ? orderTons * price
        : null;

    return {
      areaSqFt,
      volumeCuFt,
      volumeCuYd,
      volumeCuM,
      orderCuFt,
      orderCuYd,
      orderCuM,
      exactTons,
      orderTons,
      wasteTons,
      cost,
    };
  }, [
    length,
    width,
    depth,
    projectUnit,
    depthUnit,
    density,
    waste,
    pricePerTon,
  ]);

  const availableDepthUnits =
    getDepthUnits(projectUnit);

  return (
    <section className="w-full">

      {/* Hero Image */}

      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Image
          src="/cornerspan-gravel-calculator-hero.webp"
          alt="Gravel Calculator for estimating gravel volume, tons and material quantity"
          width={1774}
          height={887}
          priority
          className="h-auto w-full"
        />
      </div>

      {/* Calculator */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">

        {/* Header */}

        <div className="px-5 py-5 sm:px-7">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            GRAVEL CALCULATOR
          </p>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Gravel Calculator
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Estimate gravel volume, cubic yards,
            tons, waste and material cost for your
            project.
          </p>

        </div>

        {/* Calculator Body */}

        <div className="bg-slate-100 p-4 sm:p-6">

          <div className="space-y-4">

            {/* Project Unit */}

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Project Unit
              </label>

              <div className="grid grid-cols-3 gap-2">

                {(
                  [
                    "ft",
                    "yd",
                    "m",
                  ] as ProjectUnit[]
                ).map((unit) => (

                  <button
                    key={unit}
                    type="button"
                    onClick={() =>
                      handleProjectUnitChange(
                        unit
                      )
                    }
                    className={`rounded-xl border px-2 py-3 text-sm font-bold transition ${
                      projectUnit === unit
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {projectUnitLabel(
                      unit
                    )}
                  </button>

                ))}

              </div>
            </div>

            {/* Dimensions */}

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Project Dimensions
              </h2>

              <div className="grid gap-3 sm:grid-cols-3">

                <InputField
                  label={`Length (${projectUnit})`}
                  value={length}
                  onChange={(value) => {
                    setLength(value);
                    setCalculated(false);
                  }}
                  placeholder={`Enter length in ${projectUnit}`}
                />

                <InputField
                  label={`Width (${projectUnit})`}
                  value={width}
                  onChange={(value) => {
                    setWidth(value);
                    setCalculated(false);
                  }}
                  placeholder={`Enter width in ${projectUnit}`}
                />

                <div>

                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Depth
                  </label>

                  <div className="flex overflow-hidden rounded-xl border border-slate-300 bg-white">

                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={depth}
                      placeholder="Enter depth"
                      onChange={(e) => {
                        setDepth(
                          e.target.value
                        );
                        setCalculated(
                          false
                        );
                      }}
                      className="min-w-0 flex-1 px-3 py-3 text-sm font-semibold outline-none"
                    />

                    <select
                      value={depthUnit}
                      onChange={(e) => {
                        setDepthUnit(
                          e.target
                            .value as DepthUnit
                        );
                        setCalculated(
                          false
                        );
                      }}
                      className="border-l border-slate-200 bg-slate-50 px-2 text-sm font-bold outline-none"
                    >
                      {availableDepthUnits.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}
                    </select>

                  </div>

                </div>

              </div>
            </div>

            {/* Gravel Material */}

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Gravel Material
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">

                <div>

                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Gravel Type
                  </label>

                  <select
                    value={gravelType}
                    onChange={(e) =>
                      handleGravelChange(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-blue-500"
                  >
                    {GRAVEL_TYPES.map(
                      (item) => (
                        <option
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      )
                    )}
                  </select>

                </div>

                <InputField
                  label="Density (tons / cubic yard)"
                  value={density}
                  onChange={(value) => {
                    setDensity(value);
                    setCalculated(
                      false
                    );
                  }}
                  placeholder="Enter density"
                />

              </div>
            </div>

            {/* Waste */}

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-800">
                Waste / Extra Allowance
              </label>

              <div className="grid grid-cols-5 gap-1.5">

                {[
                  "0",
                  "5",
                  "10",
                  "15",
                  "20",
                ].map((value) => (

                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setWaste(value);
                      setCalculated(
                        false
                      );
                    }}
                    className={`rounded-lg border px-2 py-2.5 text-xs font-bold sm:text-sm ${
                      waste === value
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    {value}%
                  </button>

                ))}

              </div>
            </div>

            {/* Cost */}

            <div className="rounded-xl border border-slate-200 bg-white p-4">

              <div className="grid gap-3 sm:grid-cols-2">

                <div>

                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Currency
                  </label>

                  <select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(
                        e.target
                          .value as Currency
                      );
                      setCalculated(
                        false
                      );
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold outline-none"
                  >
                    {(
                      Object.entries(
                        CURRENCIES
                      ) as [
                        Currency,
                        string
                      ][]
                    ).map(
                      ([code, symbol]) => (
                        <option
                          key={code}
                          value={code}
                        >
                          {code} ({symbol})
                        </option>
                      )
                    )}
                  </select>

                </div>

                <InputField
                  label="Price per Ton (optional)"
                  value={pricePerTon}
                  onChange={(value) => {
                    setPricePerTon(
                      value
                    );
                    setCalculated(
                      false
                    );
                  }}
                  placeholder="Enter price per ton"
                />

              </div>
            </div>

            {/* Calculate */}

            <button
              type="button"
              onClick={calculate}
              className="w-full rounded-xl bg-blue-600 px-5 py-4 text-base font-extrabold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Calculate Gravel
            </button>

          </div>
        </div>
      </div>

      {/* Results */}

      {calculated && result && (

        <div
          id="gravel-results"
          className="mt-5 scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
        >

          <div className="bg-slate-950 px-5 py-5 text-white sm:px-7">

            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              GRAVEL TO ORDER
            </p>

            <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">

              <span className="text-4xl font-black tracking-tight">
                {formatNumber(
                  result.orderTons
                )}
              </span>

              <span className="pb-1 text-lg font-bold text-slate-300">
                tons
              </span>

            </div>

            <p className="mt-2 text-sm text-slate-400">
              About{" "}
              {formatNumber(
                result.orderCuYd
              )}{" "}
              cubic yards including{" "}
              {waste}% allowance.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 sm:grid-cols-4 sm:p-5">

            <ResultBox
              label="Cubic Yards"
              value={formatNumber(
                result.orderCuYd
              )}
              unit="yd³"
            />

            <ResultBox
              label="Cubic Feet"
              value={formatNumber(
                result.orderCuFt
              )}
              unit="ft³"
            />

            <ResultBox
              label="Cubic Meters"
              value={formatNumber(
                result.orderCuM
              )}
              unit="m³"
            />

            <ResultBox
              label="Area (ft²)"
              value={formatNumber(
                result.areaSqFt
              )}
              unit="ft²"
            />

          </div>

          <div className="border-t border-slate-200 p-5 sm:p-7">

            <h2 className="text-lg font-extrabold text-slate-900">
              Calculation Breakdown
            </h2>

            <div className="mt-4 space-y-3 text-sm">

              <BreakdownRow
                label="Exact gravel volume"
                value={`${formatNumber(
                  result.volumeCuYd
                )} yd³`}
              />

              <BreakdownRow
                label="Exact gravel weight"
                value={`${formatNumber(
                  result.exactTons
                )} tons`}
              />

              <BreakdownRow
                label="Waste / allowance"
                value={`${waste}%`}
              />

              <BreakdownRow
                label="Additional gravel"
                value={`${formatNumber(
                  result.wasteTons
                )} tons`}
              />

              <BreakdownRow
                label="Recommended order"
                value={`${formatNumber(
                  result.orderTons
                )} tons`}
                strong
              />

              {result.cost !== null && (
                <BreakdownRow
                  label="Estimated material cost"
                  value={`${
                    CURRENCIES[currency]
                  }${formatNumber(
                    result.cost
                  )}`}
                  strong
                />
              )}

            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 text-xs leading-5 text-slate-500 sm:px-7">
            Gravel density varies by material,
            moisture and compaction. Use the
            density supplied by your local gravel
            supplier for a more accurate tonnage
            estimate.
          </div>

        </div>
      )}

      {/* Formula */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

        <h2 className="text-xl font-extrabold text-slate-900">
          Gravel Calculation Formula
        </h2>

        <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">

          <p>
            <strong>
              Volume (cubic feet)
            </strong>{" "}
            = Length × Width × Depth
          </p>

          <p>
            <strong>
              Cubic yards
            </strong>{" "}
            = Cubic feet ÷ 27
          </p>

          <p>
            <strong>
              Weight (tons)
            </strong>{" "}
            = Cubic yards × Gravel density
          </p>

          <p>
            <strong>
              Order quantity
            </strong>{" "}
            = Exact quantity × (1 + waste ÷
            100)
          </p>

        </div>
      </div>

      {/* Example */}

      <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-7">

        <h2 className="text-lg font-extrabold text-slate-900">
          Gravel Calculator Example
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          For a rectangular gravel area, enter
          the length, width and required depth.
          The calculator converts the volume to
          cubic yards and estimates the required
          tons using the selected gravel density.
        </p>

      </div>

      {/* Important Note */}

      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">

        <strong>Important:</strong> This calculator
        provides an estimate. Actual gravel
        requirements can vary because of
        compaction, moisture, grading and the
        specific material used. Confirm final
        quantities with your supplier.

      </div>

    </section>
  );
}

/* Input Field */

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>

      <label className="mb-1.5 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <input
        type="number"
        min="0"
        step="any"
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

    </div>
  );
}

/* Result Box */

function ResultBox({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">

      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-black text-slate-900">
        {value}

        <span className="ml-1 text-xs font-bold text-slate-500">
          {unit}
        </span>
      </p>

    </div>
  );
}

/* Breakdown Row */

function BreakdownRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-2.5 last:border-0">

      <span className="text-slate-600">
        {label}
      </span>

      <span
        className={
          strong
            ? "text-right font-extrabold text-slate-900"
            : "text-right font-bold text-slate-800"
        }
      >
        {value}
      </span>

    </div>
  );
}
