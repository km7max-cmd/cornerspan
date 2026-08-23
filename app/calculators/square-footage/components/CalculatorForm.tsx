"use client";

import { useState } from "react";

import InputField from "./InputField";
import ResultBox from "./ResultBox";

import {
  calculateSquareFootage,
} from "../calculations";

import type {
  CalculationResult,
  CalculatorInputs,
  Shape,
  Unit,
} from "../types";

const shapes: Shape[] = [
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

const initialInputs: CalculatorInputs = {
  shape: "Rectangle",

  length: "",
  lengthInches: "",

  width: "",
  widthInches: "",

  height: "",
  heightInches: "",

  quantity: "1",

  unit: "feet",

  borderWidth: "",
  borderWidthInches: "",

  sideA: "",
  sideAInches: "",

  sideB: "",
  sideBInches: "",

  sideC: "",
  sideCInches: "",

  windowWidth: "",
  windowWidthInches: "",

  windowHeight: "",
  windowHeightInches: "",

  windowQuantity: "1",

  knownArea: "",

  waste: "0",

  price: "",
};

export default function CalculatorForm() {
  const [inputs, setInputs] =
    useState<CalculatorInputs>(
      initialInputs
    );

  const [result, setResult] =
    useState<CalculationResult | null>(
      null
    );

  const [error, setError] =
    useState("");

  const inputClass =
    "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  const update = <
    K extends keyof CalculatorInputs
  >(
    key: K,
    value: CalculatorInputs[K]
  ) => {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));

    setResult(null);
    setError("");
  };

  const setUnit = (unit: Unit) => {
    update("unit", unit);
  };

  const calculate = () => {
    setError("");
    setResult(null);

    const calculation =
      calculateSquareFootage(inputs);

    if (!calculation) {
      setError(
        "Please enter valid measurements for the selected shape."
      );
      return;
    }

    setResult(calculation);
  };

  const clear = () => {
    setInputs({
      ...initialInputs,
    });

    setResult(null);
    setError("");
  };

  const feetInchesProps = {
    unit: inputs.unit,
    setUnit,
  };

  return (
    <section className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-blue-700 px-4 py-4 text-center text-lg font-bold text-white sm:text-xl">
        Square Footage Calculator
      </div>

      <div className="p-4 sm:p-6">
        {/* Shape */}
        <div className="mb-5">
          <label className={labelClass}>
            Area or Shape
          </label>

          <select
            value={inputs.shape}
            onChange={(e) =>
              update(
                "shape",
                e.target.value as Shape
              )
            }
            className={inputClass}
          >
            {shapes.map((shape) => (
              <option
                key={shape}
                value={shape}
              >
                {shape}
              </option>
            ))}
          </select>
        </div>

        {/* Known Area */}
        {inputs.shape ===
          "Known Area" && (
          <InputField
            label="Area"
            value={inputs.knownArea}
            onChange={(value) =>
              update(
                "knownArea",
                value
              )
            }
            unit={inputs.unit}
            setUnit={setUnit}
          />
        )}

        {/* Rectangle / Room */}
        {(inputs.shape ===
          "Rectangle" ||
          inputs.shape === "Room") && (
          <div className="space-y-4">
            <InputField
              label="Length"
              value={inputs.length}
              onChange={(value) =>
                update(
                  "length",
                  value
                )
              }
              inchesValue={
                inputs.lengthInches
              }
              onInchesChange={(
                value
              ) =>
                update(
                  "lengthInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Width"
              value={inputs.width}
              onChange={(value) =>
                update(
                  "width",
                  value
                )
              }
              inchesValue={
                inputs.widthInches
              }
              onInchesChange={(
                value
              ) =>
                update(
                  "widthInches",
                  value
                )
              }
              {...feetInchesProps}
            />
          </div>
        )}

        {/* Square */}
        {inputs.shape === "Square" && (
          <InputField
            label="Side Length"
            value={inputs.length}
            onChange={(value) =>
              update(
                "length",
                value
              )
            }
            inchesValue={
              inputs.lengthInches
            }
            onInchesChange={(value) =>
              update(
                "lengthInches",
                value
              )
            }
            {...feetInchesProps}
          />
        )}

        {/* Wall with Window */}
        {inputs.shape ===
          "Wall with Window" && (
          <div className="space-y-4">
            <InputField
              label="Wall Width"
              value={inputs.length}
              onChange={(value) =>
                update(
                  "length",
                  value
                )
              }
              inchesValue={
                inputs.lengthInches
              }
              onInchesChange={(value) =>
                update(
                  "lengthInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Wall Height"
              value={inputs.height}
              onChange={(value) =>
                update(
                  "height",
                  value
                )
              }
              inchesValue={
                inputs.heightInches
              }
              onInchesChange={(value) =>
                update(
                  "heightInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="mb-4 font-semibold text-slate-800">
                Window
              </h3>

              <div className="space-y-4">
                <InputField
                  label="Window Width"
                  value={
                    inputs.windowWidth
                  }
                  onChange={(value) =>
                    update(
                      "windowWidth",
                      value
                    )
                  }
                  inchesValue={
                    inputs.windowWidthInches
                  }
                  onInchesChange={(
                    value
                  ) =>
                    update(
                      "windowWidthInches",
                      value
                    )
                  }
                  {...feetInchesProps}
                />

                <InputField
                  label="Window Height"
                  value={
                    inputs.windowHeight
                  }
                  onChange={(value) =>
                    update(
                      "windowHeight",
                      value
                    )
                  }
                  inchesValue={
                    inputs.windowHeightInches
                  }
                  onInchesChange={(
                    value
                  ) =>
                    update(
                      "windowHeightInches",
                      value
                    )
                  }
                  {...feetInchesProps}
                />

                <div>
                  <label
                    className={
                      labelClass
                    }
                  >
                    Window Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    value={
                      inputs.windowQuantity
                    }
                    onChange={(e) =>
                      update(
                        "windowQuantity",
                        e.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cathedral Wall */}
        {inputs.shape ===
          "Cathedral Wall" && (
          <div className="space-y-4">
            <InputField
              label="Wall Width"
              value={inputs.width}
              onChange={(value) =>
                update(
                  "width",
                  value
                )
              }
              inchesValue={
                inputs.widthInches
              }
              onInchesChange={(value) =>
                update(
                  "widthInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Wall Height"
              value={inputs.height}
              onChange={(value) =>
                update(
                  "height",
                  value
                )
              }
              inchesValue={
                inputs.heightInches
              }
              onInchesChange={(value) =>
                update(
                  "heightInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Triangle Height"
              value={inputs.sideA}
              onChange={(value) =>
                update(
                  "sideA",
                  value
                )
              }
              inchesValue={
                inputs.sideAInches
              }
              onInchesChange={(value) =>
                update(
                  "sideAInches",
                  value
                )
              }
              {...feetInchesProps}
            />
          </div>
        )}

        {/* Rectangle Border */}
        {inputs.shape ===
          "Rectangle Border" && (
          <div className="space-y-4">
            <InputField
              label="Length"
              value={inputs.length}
              onChange={(value) =>
                update(
                  "length",
                  value
                )
              }
              inchesValue={
                inputs.lengthInches
              }
              onInchesChange={(value) =>
                update(
                  "lengthInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Width"
              value={inputs.width}
              onChange={(value) =>
                update(
                  "width",
                  value
                )
              }
              inchesValue={
                inputs.widthInches
              }
              onInchesChange={(value) =>
                update(
                  "widthInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Border Width"
              value={
                inputs.borderWidth
              }
              onChange={(value) =>
                update(
                  "borderWidth",
                  value
                )
              }
              inchesValue={
                inputs.borderWidthInches
              }
              onInchesChange={(value) =>
                update(
                  "borderWidthInches",
                  value
                )
              }
              {...feetInchesProps}
            />
          </div>
        )}

        {/* Circle */}
        {inputs.shape === "Circle" && (
          <InputField
            label="Diameter"
            value={inputs.length}
            onChange={(value) =>
              update(
                "length",
                value
              )
            }
            inchesValue={
              inputs.lengthInches
            }
            onInchesChange={(value) =>
              update(
                "lengthInches",
                value
              )
            }
            {...feetInchesProps}
          />
        )}

        {/* Circle Border / Annulus */}
        {(inputs.shape ===
          "Circle Border" ||
          inputs.shape ===
            "Annulus") && (
          <div className="space-y-4">
            <InputField
              label="Outer Diameter"
              value={inputs.length}
              onChange={(value) =>
                update(
                  "length",
                  value
                )
              }
              inchesValue={
                inputs.lengthInches
              }
              onInchesChange={(value) =>
                update(
                  "lengthInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Border Width"
              value={
                inputs.borderWidth
              }
              onChange={(value) =>
                update(
                  "borderWidth",
                  value
                )
              }
              inchesValue={
                inputs.borderWidthInches
              }
              onInchesChange={(value) =>
                update(
                  "borderWidthInches",
                  value
                )
              }
              {...feetInchesProps}
            />
          </div>
        )}

        {/* Triangle */}
        {inputs.shape ===
          "Triangle" && (
          <div className="space-y-4">
            <InputField
              label="Side A"
              value={inputs.sideA}
              onChange={(value) =>
                update(
                  "sideA",
                  value
                )
              }
              inchesValue={
                inputs.sideAInches
              }
              onInchesChange={(value) =>
                update(
                  "sideAInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Side B"
              value={inputs.sideB}
              onChange={(value) =>
                update(
                  "sideB",
                  value
                )
              }
              inchesValue={
                inputs.sideBInches
              }
              onInchesChange={(value) =>
                update(
                  "sideBInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Side C"
              value={inputs.sideC}
              onChange={(value) =>
                update(
                  "sideC",
                  value
                )
              }
              inchesValue={
                inputs.sideCInches
              }
              onInchesChange={(value) =>
                update(
                  "sideCInches",
                  value
                )
              }
              {...feetInchesProps}
            />
          </div>
        )}

        {/* Triangle 1/2 b×h */}
        {inputs.shape ===
          "Triangle 1/2 b×h" && (
          <div className="space-y-4">
            <InputField
              label="Base"
              value={inputs.sideA}
              onChange={(value) =>
                update(
                  "sideA",
                  value
                )
              }
              inchesValue={
                inputs.sideAInches
              }
              onInchesChange={(value) =>
                update(
                  "sideAInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Height"
              value={inputs.height}
              onChange={(value) =>
                update(
                  "height",
                  value
                )
              }
              inchesValue={
                inputs.heightInches
              }
              onInchesChange={(value) =>
                update(
                  "heightInches",
                  value
                )
              }
              {...feetInchesProps}
            />
          </div>
        )}

        {/* Trapezoid */}
        {inputs.shape ===
          "Trapezoid" && (
          <div className="space-y-4">
            <InputField
              label="Base A"
              value={inputs.sideA}
              onChange={(value) =>
                update(
                  "sideA",
                  value
                )
              }
              inchesValue={
                inputs.sideAInches
              }
              onInchesChange={(value) =>
                update(
                  "sideAInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Base B"
              value={inputs.sideB}
              onChange={(value) =>
                update(
                  "sideB",
                  value
                )
              }
              inchesValue={
                inputs.sideBInches
              }
              onInchesChange={(value) =>
                update(
                  "sideBInches",
                  value
                )
              }
              {...feetInchesProps}
            />

            <InputField
              label="Height"
              value={inputs.height}
              onChange={(value) =>
                update(
                  "height",
                  value
                )
              }
              inchesValue={
                inputs.heightInches
              }
              onInchesChange={(value) =>
                update(
                  "heightInches",
                  value
                )
              }
              {...feetInchesProps}
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
            value={inputs.quantity}
            onChange={(e) =>
              update(
                "quantity",
                e.target.value
              )
            }
            className={inputClass}
          />
        </div>

        {/* Waste */}
        <fieldset className="mt-5 rounded-xl border border-slate-300 p-4">
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
              step="0.1"
              value={inputs.waste}
              onChange={(e) =>
                update(
                  "waste",
                  e.target.value
                )
              }
              className="h-10 w-24 rounded-md border border-slate-300 px-3 text-center outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <span className="text-sm text-slate-600">
              %
            </span>
          </div>
        </fieldset>

        {/* Price */}
        <fieldset className="mt-4 rounded-xl border border-slate-300 p-4">
          <legend className="px-2 text-sm font-medium text-slate-500">
            Optional Material Cost
          </legend>

          <label className={labelClass}>
            Price per square foot ($)
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={inputs.price}
            onChange={(e) =>
              update(
                "price",
                e.target.value
              )
            }
            placeholder="0"
            className={inputClass}
          />
        </fieldset>

        {/* Error */}
        {error && (
          <div className="mt-4">
            <ResultBox
              result={null}
              error={error}
            />
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={calculate}
            className="rounded-lg bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800 active:scale-[0.99]"
          >
            Calculate
          </button>

          <button
            type="button"
            onClick={clear}
            className="rounded-lg bg-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-300 active:scale-[0.99]"
          >
            Clear
          </button>
        </div>

        {/* Result */}
        <ResultBox
          result={result}
        />
      </div>
    </section>
  );
}
