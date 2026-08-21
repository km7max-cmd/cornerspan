"use client";

import { useState } from "react";
import type {
  Unit,
  MixRatio,
} from "../utils/calculateConcrete";

type CalculatorFormProps = {
  length: string;
  width: string;
  depth: string;
  quantity: string;

  cementPrice: string;
  sandPrice: string;
  aggregatePrice: string;

  cementUnit: string;
  sandUnit: string;
  aggregateUnit: string;

  sandDensity: string;
  aggregateDensity: string;

  currency: string;
  setCurrency: (value: string) => void;

  lengthUnit: Unit;
  widthUnit: Unit;
  depthUnit: Unit;

  setLengthUnit: (value: Unit) => void;
  setWidthUnit: (value: Unit) => void;
  setDepthUnit: (value: Unit) => void;

  setCementUnit: (value: string) => void;
  setSandUnit: (value: string) => void;
  setAggregateUnit: (value: string) => void;

  setSandDensity: (value: string) => void;
  setAggregateDensity: (value: string) => void;

  error: string;

  setLength: (value: string) => void;
  setWidth: (value: string) => void;
  setDepth: (value: string) => void;
  setQuantity: (value: string) => void;

  setCementPrice: (value: string) => void;
  setSandPrice: (value: string) => void;
  setAggregatePrice: (value: string) => void;

  onCalculate: (mixRatio: MixRatio) => void;
};

const units: {
  value: Unit;
  label: string;
}[] = [
  {
    value: "Meter",
    label: "m",
  },
  {
    value: "Feet",
    label: "ft",
  },
  {
    value: "Centimeter",
    label: "cm",
  },
  {
    value: "Millimeter",
    label: "mm",
  },
  {
    value: "Inch",
    label: "in",
  },
];

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  AED: "AED",
  AUD: "A$",
  CAD: "C$",
};

export default function CalculatorForm({
  length,
  width,
  depth,
  quantity,

  cementPrice,
  sandPrice,
  aggregatePrice,

  cementUnit,
  sandUnit,
  aggregateUnit,

  sandDensity,
  aggregateDensity,

  currency,
  setCurrency,

  lengthUnit,
  widthUnit,
  depthUnit,

  setLengthUnit,
  setWidthUnit,
  setDepthUnit,

  setCementUnit,
  setSandUnit,
  setAggregateUnit,

  setSandDensity,
  setAggregateDensity,

  error,

  setLength,
  setWidth,
  setDepth,
  setQuantity,

  setCementPrice,
  setSandPrice,
  setAggregatePrice,

  onCalculate,
}: CalculatorFormProps) {
  /*
   * M20 is the default because it is a common
   * general-purpose concrete grade.
   */
  const [mixRatioType, setMixRatioType] =
    useState("M20");

  const [customCement, setCustomCement] =
    useState("1");

  const [customSand, setCustomSand] =
    useState("1.5");

  const [customAggregate, setCustomAggregate] =
    useState("3");

  const [showMaterials, setShowMaterials] =
    useState(false);

  const currencySymbol =
    CURRENCY_SYMBOLS[currency] || "$";

  /*
   * Small, clean controls.
   */
  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  const unitSelectClass =
    "h-12 min-w-[72px] border-l border-slate-200 bg-white px-3 text-sm font-semibold text-blue-700 outline-none";

  const priceInputClass =
    "h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none";

  /*
   * Get selected mix ratio.
   */
  const getMixRatio = (): MixRatio => {
    switch (mixRatioType) {
      case "M10":
        return {
          cement: 1,
          sand: 3,
          aggregate: 6,
        };

      case "M15":
        return {
          cement: 1,
          sand: 2,
          aggregate: 4,
        };

      case "M20":
        return {
          cement: 1,
          sand: 1.5,
          aggregate: 3,
        };

      case "M25":
        return {
          cement: 1,
          sand: 1,
          aggregate: 2,
        };

      case "Custom":
        return {
          cement: Number(customCement),
          sand: Number(customSand),
          aggregate: Number(customAggregate),
        };

      default:
        return {
          cement: 1,
          sand: 1.5,
          aggregate: 3,
        };
    }
  };

  const handleCalculate = () => {
    const ratio = getMixRatio();

    onCalculate(ratio);
  };

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          CONCRETE DIMENSIONS
      ===================================================== */}

      <div className="p-5 sm:p-7">

        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Concrete Volume
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
            Enter the dimensions of your concrete work.
          </p>
        </div>

        {/* Length */}

        <div className="mb-4">
          <label className={labelClass}>
            Length
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={length}
              onChange={(e) =>
                setLength(e.target.value)
              }
              placeholder="Enter length"
              className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none"
            />

            <select
              value={lengthUnit}
              onChange={(e) =>
                setLengthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
              aria-label="Length unit"
            >
              {units.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Width */}

        <div className="mb-4">
          <label className={labelClass}>
            Width
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={width}
              onChange={(e) =>
                setWidth(e.target.value)
              }
              placeholder="Enter width"
              className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none"
            />

            <select
              value={widthUnit}
              onChange={(e) =>
                setWidthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
              aria-label="Width unit"
            >
              {units.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Thickness */}

        <div className="mb-4">
          <label className={labelClass}>
            Thickness / Height
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={depth}
              onChange={(e) =>
                setDepth(e.target.value)
              }
              placeholder="Enter thickness"
              className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none"
            />

            <select
              value={depthUnit}
              onChange={(e) =>
                setDepthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
              aria-label="Thickness unit"
            >
              {units.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* Quantity */}

        <div>
          <label className={labelClass}>
            Quantity
          </label>

          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none"
            />

            <div className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
              pieces
            </div>

          </div>
        </div>

      </div>

      {/* =====================================================
          MIX / MATERIAL ESTIMATE
      ===================================================== */}

      <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:p-7">

        <button
          type="button"
          onClick={() =>
            setShowMaterials(!showMaterials)
          }
          className="flex w-full items-center justify-between text-left"
        >
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Material Estimate
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Cement, sand, aggregate, water and cost
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg font-semibold text-slate-600 shadow-sm">
            {showMaterials ? "−" : "+"}
          </span>
        </button>

        {showMaterials && (
          <div className="mt-6">

            {/* Concrete Grade */}

            <div className="mb-5">
              <label className={labelClass}>
                Concrete Grade / Mix
              </label>

              <select
                value={mixRatioType}
                onChange={(e) =>
                  setMixRatioType(
                    e.target.value
                  )
                }
                className={inputClass}
              >
                <option value="M10">
                  M10 — 1 : 3 : 6
                </option>

                <option value="M15">
                  M15 — 1 : 2 : 4
                </option>

                <option value="M20">
                  M20 — 1 : 1.5 : 3
                </option>

                <option value="M25">
                  M25 — 1 : 1 : 2
                </option>

                <option value="Custom">
                  Custom Mix
                </option>
              </select>
            </div>

            {/* Custom */}

            {mixRatioType === "Custom" && (
              <div className="mb-5 grid grid-cols-3 gap-2">

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Cement
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={customCement}
                    onChange={(e) =>
                      setCustomCement(
                        e.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Sand
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={customSand}
                    onChange={(e) =>
                      setCustomSand(
                        e.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Aggregate
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={customAggregate}
                    onChange={(e) =>
                      setCustomAggregate(
                        e.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

              </div>
            )}

            {/* Currency */}

            <div className="mb-5">
              <label className={labelClass}>
                Currency
              </label>

              <select
                value={currency}
                onChange={(e) =>
                  setCurrency(e.target.value)
                }
                className={inputClass}
              >
                <option value="USD">
                  🇺🇸 US Dollar ($)
                </option>

                <option value="INR">
                  🇮🇳 Indian Rupee (₹)
                </option>

                <option value="EUR">
                  🇪🇺 Euro (€)
                </option>

                <option value="GBP">
                  🇬🇧 British Pound (£)
                </option>

                <option value="AED">
                  🇦🇪 UAE Dirham (AED)
                </option>

                <option value="AUD">
                  🇦🇺 Australian Dollar (A$)
                </option>

                <option value="CAD">
                  🇨🇦 Canadian Dollar (C$)
                </option>
              </select>
            </div>

            {/* Cement */}

            <div className="mb-4">
              <label className={labelClass}>
                Cement Price
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                <div className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
                  {currencySymbol}
                </div>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={cementPrice}
                  onChange={(e) =>
                    setCementPrice(
                      e.target.value
                    )
                  }
                  placeholder="0.00"
                  className={priceInputClass}
                />

                <select
                  value={cementUnit}
                  onChange={(e) =>
                    setCementUnit(
                      e.target.value
                    )
                  }
                  className={unitSelectClass}
                >
                  <option value="Bag">
                    / Bag
                  </option>

                  <option value="kg">
                    / kg
                  </option>

                  <option value="tonne">
                    / tonne
                  </option>

                  <option value="US ton">
                    / US ton
                  </option>
                </select>

              </div>
            </div>

            {/* Sand */}

            <div className="mb-4">
              <label className={labelClass}>
                Sand Price
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                <div className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
                  {currencySymbol}
                </div>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sandPrice}
                  onChange={(e) =>
                    setSandPrice(
                      e.target.value
                    )
                  }
                  placeholder="0.00"
                  className={priceInputClass}
                />

                <select
                  value={sandUnit}
                  onChange={(e) =>
                    setSandUnit(
                      e.target.value
                    )
                  }
                  className={unitSelectClass}
                >
                  <option value="m³">
                    / m³
                  </option>

                  <option value="yd³">
                    / yd³
                  </option>

                  <option value="tonne">
                    / tonne
                  </option>

                  <option value="US ton">
                    / US ton
                  </option>
                </select>

              </div>
            </div>

            {/* Sand Density */}

            <div className="mb-4">
              <label className={labelClass}>
                Sand Density
              </label>

              <select
                value={sandDensity}
                onChange={(e) =>
                  setSandDensity(
                    e.target.value
                  )
                }
                className={inputClass}
              >
                <option value="1600">
                  1600 kg/m³
                </option>

                <option value="1650">
                  1650 kg/m³
                </option>

                <option value="1700">
                  1700 kg/m³
                </option>

                <option value="1750">
                  1750 kg/m³
                </option>

                <option value="1800">
                  1800 kg/m³
                </option>
              </select>
            </div>

            {/* Aggregate */}

            <div className="mb-4">
              <label className={labelClass}>
                Aggregate Price
              </label>

              <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                <div className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
                  {currencySymbol}
                </div>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={aggregatePrice}
                  onChange={(e) =>
                    setAggregatePrice(
                      e.target.value
                    )
                  }
                  placeholder="0.00"
                  className={priceInputClass}
                />

                <select
                  value={aggregateUnit}
                  onChange={(e) =>
                    setAggregateUnit(
                      e.target.value
                    )
                  }
                  className={unitSelectClass}
                >
                  <option value="m³">
                    / m³
                  </option>

                  <option value="yd³">
                    / yd³
                  </option>

                  <option value="tonne">
                    / tonne
                  </option>

                  <option value="US ton">
                    / US ton
                  </option>
                </select>

              </div>
            </div>

            {/* Aggregate Density */}

            <div className="mb-2">
              <label className={labelClass}>
                Aggregate Density
              </label>

              <select
                value={aggregateDensity}
                onChange={(e) =>
                  setAggregateDensity(
                    e.target.value
                  )
                }
                className={inputClass}
              >
                <option value="1400">
                  1400 kg/m³
                </option>

                <option value="1450">
                  1450 kg/m³
                </option>

                <option value="1500">
                  1500 kg/m³
                </option>

                <option value="1550">
                  1550 kg/m³
                </option>

                <option value="1600">
                  1600 kg/m³
                </option>

                <option value="1650">
                  1650 kg/m³
                </option>
              </select>
            </div>

          </div>
        )}

      </div>

      {/* =====================================================
          NOTE
      ===================================================== */}

      <div className="border-t border-slate-100 px-5 py-4 sm:px-7">

        <p className="text-xs leading-5 text-slate-500 sm:text-sm">
          Concrete volume is calculated from Length × Width ×
          Thickness × Quantity. Material quantities are
          estimates based on the selected mix ratio and should
          not replace a project-specific structural mix design.
        </p>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="mx-5 mb-4 rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-medium text-red-600 sm:mx-7">
          {error}
        </div>
      )}

      {/* =====================================================
          CALCULATE
      ===================================================== */}

      <div className="border-t border-slate-100 p-5 sm:p-7">

        <button
          type="button"
          onClick={handleCalculate}
          className="h-13 w-full rounded-xl bg-blue-600 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] sm:text-lg"
        >
          Calculate Concrete
        </button>

      </div>

    </section>
  );
}
