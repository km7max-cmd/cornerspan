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

  error: string;

  setLength: (value: string) => void;
  setWidth: (value: string) => void;
  setDepth: (value: string) => void;
  setQuantity: (value: string) => void;

  setCementPrice: (value: string) => void;
  setSandPrice: (value: string) => void;
  setAggregatePrice: (value: string) => void;

  onCalculate: (
    mixRatio: MixRatio
  ) => void;
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
  const [concreteForm, setConcreteForm] =
    useState("Slab");

  // --------------------------------------------------
  // Mix Ratio
  // --------------------------------------------------

  const [mixRatioType, setMixRatioType] =
    useState("1:2:4");

  const [customCement, setCustomCement] =
    useState("1");

  const [customSand, setCustomSand] =
    useState("2");

  const [customAggregate, setCustomAggregate] =
    useState("4");

  const inputClass =
    "h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-lg text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const unitSelectClass =
    "h-14 border-l border-slate-200 bg-transparent px-4 text-base font-medium text-blue-700 outline-none";

  const labelClass =
    "mb-2 block text-base font-medium text-slate-800";

  const handleCalculate = () => {
    let mixRatio: MixRatio;

    if (mixRatioType === "1:1.5:3") {
      mixRatio = {
        cement: 1,
        sand: 1.5,
        aggregate: 3,
      };
    } else if (mixRatioType === "Custom") {
      mixRatio = {
        cement: Number(customCement),
        sand: Number(customSand),
        aggregate: Number(customAggregate),
      };
    } else {
      mixRatio = {
        cement: 1,
        sand: 2,
        aggregate: 4,
      };
    }

    onCalculate(mixRatio);
  };

  return (
    <section className="w-full overflow-hidden rounded-3xl bg-white shadow-lg">

      {/* ================================================= */}
      {/* Concrete Form */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <h2 className="mb-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          <span className="mr-2 text-blue-600">
            ⌃
          </span>
          Choose a concrete form
        </h2>

        <label className={labelClass}>
          Concrete form
        </label>

        <select
          value={concreteForm}
          onChange={(e) =>
            setConcreteForm(e.target.value)
          }
          className={inputClass}
        >
          <option value="Slab">
            Slab
          </option>

          <option value="Wall">
            Wall
          </option>

          <option value="Footer">
            Footer
          </option>

          <option value="Column">
            Column
          </option>

          <option value="Curbs, Gutter Barrier">
            Curbs, Gutter Barrier
          </option>

          <option value="Stairs">
            Stairs
          </option>
        </select>

        <div className="mt-5 flex h-48 items-center justify-center rounded-3xl bg-slate-50">

          <div className="text-center">

            <div
              className={`mx-auto mb-4 h-12 w-56 rounded-lg bg-slate-400 shadow-sm ${
                concreteForm === "Column"
                  ? "h-32 w-24"
                  : concreteForm === "Wall"
                    ? "h-28 w-40"
                    : ""
              }`}
            />

            <p className="text-lg font-medium text-slate-500">
              {concreteForm}
            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* Dimensions */}
      {/* ================================================= */}

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          <span className="mr-2 text-blue-600">
            ⌃
          </span>
          Dimensions
        </h2>

        {/* Length */}

        <div className="mb-5">

          <label className={labelClass}>
            Length
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={length}
              onChange={(e) =>
                setLength(e.target.value)
              }
              placeholder="Enter length"
              className="h-14 min-w-0 flex-1 bg-transparent px-4 text-lg text-slate-900 outline-none"
            />

            <select
              value={lengthUnit}
              onChange={(e) =>
                setLengthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
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

        <div className="mb-5">

          <label className={labelClass}>
            Width
          </label>

          <div className="flex overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">

            <input
              type="number"
              min="0"
              step="any"
              value={width}
              onChange={(e) =>
                setWidth(e.target.value)
              }
              placeholder="Enter width"
              className="h-14 min-w-0 flex-1 bg-transparent px-4 text-lg text-slate-900 outline-none"
            />

            <select
              value={widthUnit}
              onChange={(e) =>
                setWidthUnit(
                  e.target.value as Unit
                )
              }
              className={unitSelectClass}
            >
              {units
