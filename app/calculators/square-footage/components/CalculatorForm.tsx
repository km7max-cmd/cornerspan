"use client";

import { useState } from "react";
import InputField from "./InputField";
import ResultBox from "./ResultBox";
import { calculateSquareFootage } from "../calculations";

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
  lengthUnit: "feet",

  width: "",
  widthUnit: "feet",

  height: "",
  heightUnit: "feet",

  quantity: "1",

  borderWidth: "",
  borderWidthUnit: "feet",

  sideA: "",
  sideAUnit: "feet",

  sideB: "",
  sideBUnit: "feet",

  sideC: "",
  sideCUnit: "feet",

  windowWidth: "",
  windowWidthUnit: "feet",

  windowHeight: "",
  windowHeightUnit: "feet",

  windowQuantity: "1",

  knownArea: "",
  knownAreaUnit: "square-feet" as Unit,

  waste: "0",

  price: "",
};

export default function CalculatorForm() {
  const [inputs, setInputs] =
    useState<CalculatorInputs>(initialInputs);

  const [result, setResult] =
    useState<CalculationResult | null>(null);

  const [error, setError] =
    useState("");

  const inputClass =
    "h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  const update = <K extends keyof CalculatorInputs>(
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

  const calculate = () => {
    setError("");

    const requiredFields: Record<string, string> = {};

    if (
      inputs.shape === "Rectangle" ||
      inputs.shape === "Room"
    ) {
      requiredFields.length = inputs.length;
      requiredFields.width = inputs.width;
    }

    if (inputs.shape === "Square") {
      requiredFields.length = inputs.length;
    }

    if (inputs.shape === "Circle") {
      requiredFields.length = inputs.length;
    }

    if (
      inputs.shape === "Rectangle Border"
    ) {
      requiredFields.length = inputs.length;
      requiredFields.width = inputs.width;
      requiredFields.borderWidth =
        inputs.borderWidth;
    }

    if (
      inputs.shape === "Circle Border" ||
      inputs.shape === "Annulus"
    ) {
      requiredFields.length = inputs.length;
      requiredFields.borderWidth =
        inputs.borderWidth;
    }

    if (
      inputs.shape === "Wall with Window"
    ) {
      requiredFields.length = inputs.length;
      requiredFields.height = inputs.height;
      requiredFields.windowWidth =
        inputs.windowWidth;
      requiredFields.windowHeight =
        inputs.windowHeight;
    }

    if (
      inputs.shape === "Cathedral Wall"
    ) {
      requiredFields.width = inputs.width;
      requiredFields.height = inputs.height;
      requiredFields.sideA = inputs.sideA;
    }

    if (inputs.shape === "Triangle") {
      requiredFields.sideA = inputs.sideA;
      requiredFields.sideB = inputs.sideB;
      requiredFields.sideC = inputs.sideC;
    }

    if (
      inputs.shape ===
      "Triangle 1/2 b×h"
    ) {
      requiredFields.sideA = inputs.sideA;
      requiredFields.height =
        inputs.height;
    }

    if (inputs.shape === "Trapezoid") {
      requiredFields.sideA = inputs.sideA;
      requiredFields.sideB = inputs.sideB;
      requiredFields.height =
        inputs.height;
    }

    if (inputs.shape === "Known Area") {
      requiredFields.knownArea =
        inputs.knownArea;
    }

    const emptyField = Object.entries(
      requiredFields
    ).find(
      ([, value]) =>
        value.trim() === ""
    );

    if (emptyField) {
      const fieldName =
        emptyField[0]
          .replace(
            /([A-Z])/g,
            " $1"
          )
          .replace(/^./, (char) =>
            char.toUpperCase()
          );

      setError(
        `Please enter a valid ${fieldName}.`
      );

      setResult(null);
      return;
    }

    const calculation =
      calculateSquareFootage(inputs);

    if (!calculation) {
      setError(
        "Please enter valid measurements."
      );
      setResult(null);
      return;
    }

    setResult(calculation);
  };

  const clear = () => {
    setInputs(initialInputs);
    setResult(null);
    setError("");
  };

  return (
    <section className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">

      {/* Header */}
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
            unit={
              inputs.knownAreaUnit
            }
            setUnit={(unit) =>
              update(
                "knownAreaUnit",
                unit
              )
            }
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
              unit={
                inputs.lengthUnit
              }
              setUnit={(unit) =>
                update(
                  "lengthUnit",
                  unit
                )
              }
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
              unit={
                inputs.widthUnit
              }
              setUnit={(unit) =>
                update(
                  "widthUnit",
                  unit
                )
              }
            />

          </div>
        )}

        {/* Square */}
        {inputs.shape ===
          "Square" && (
          <InputField
            label="Side Length"
            value={inputs.length}
            onChange={(value) =>
              update(
                "length",
                value
              )
            }
            unit={
              inputs.lengthUnit
            }
            setUnit={(unit) =>
              update(
                "lengthUnit",
                unit
              )
            }
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
              unit={
                inputs.lengthUnit
              }
              setUnit={(unit) =>
                update(
                  "lengthUnit",
                  unit
                )
              }
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
              unit={
                inputs.heightUnit
              }
              setUnit={(unit) =>
                update(
                  "heightUnit",
                  unit
                )
              }
            />

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

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
                  unit={
                    inputs.windowWidthUnit
                  }
                  setUnit={(unit) =>
                    update(
                      "windowWidthUnit",
                      unit
                    )
                  }
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
                  unit={
                    inputs.windowHeightUnit
                  }
                  setUnit={(unit) =>
                    update(
                      "windowHeightUnit",
                      unit
                    )
                  }
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
              unit={
                inputs.widthUnit
              }
              setUnit={(unit) =>
                update(
                  "widthUnit",
                  unit
                )
              }
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
              unit={
                inputs.heightUnit
              }
              setUnit={(unit) =>
                update(
                  "heightUnit",
                  unit
                )
              }
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
              unit={
                inputs.sideAUnit
              }
              setUnit={(unit) =>
                update(
                  "sideAUnit",
                  unit
                )
              }
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
              unit={
                inputs.lengthUnit
              }
              setUnit={(unit) =>
                update(
                  "lengthUnit",
                  unit
                )
              }
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
              unit={
                inputs.widthUnit
              }
              setUnit={(unit) =>
                update(
                  "widthUnit",
                  unit
                )
              }
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
              unit={
                inputs.borderWidthUnit
              }
              setUnit={(unit) =>
                update(
                  "borderWidthUnit",
                  unit
                )
              }
            />

          </div>
        )}

        {/* Circle */}
        {inputs.shape ===
          "Circle" && (
          <InputField
            label="Diameter"
            value={inputs.length}
            onChange={(value) =>
              update(
                "length",
                value
              )
            }
            unit={
              inputs.lengthUnit
            }
            setUnit={(unit) =>
              update(
                "lengthUnit",
                unit
              )
            }
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
              unit={
                inputs.lengthUnit
              }
              setUnit={(unit) =>
                update(
                  "lengthUnit",
                  unit
                )
              }
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
              unit={
                inputs.borderWidthUnit
              }
              setUnit={(unit) =>
                update(
                  "borderWidthUnit",
                  unit
                )
              }
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
              unit={
                inputs.sideAUnit
              }
              setUnit={(unit) =>
                update(
                  "sideAUnit",
                  unit
                )
              }
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
              unit={
                inputs.sideBUnit
              }
              setUnit={(unit) =>
                update(
                  "sideBUnit",
                  unit
                )
              }
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
              unit={
                inputs.sideCUnit
              }
              setUnit={(unit) =>
                update(
                  "sideCUnit",
                  unit
                )
              }
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
              unit={
                inputs.sideAUnit
              }
              setUnit={(unit) =>
                update(
                  "sideAUnit",
                  unit
                )
              }
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
              unit={
                inputs.heightUnit
              }
              setUnit={(unit) =>
                update(
                  "heightUnit",
                  unit
                )
              }
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
              unit={
                inputs.sideAUnit
              }
              setUnit={(unit) =>
                update(
                  "sideAUnit",
                  unit
                )
              }
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
              unit={
                inputs.sideBUnit
              }
              setUnit={(unit) =>
                update(
                  "sideBUnit",
                  unit
                )
              }
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
              unit={
                inputs.heightUnit
              }
              setUnit={(unit) =>
                update(
                  "heightUnit",
                  unit
                )
              }
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
            value={
              inputs.quantity
            }
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
              value={inputs.waste}
              onChange={(e) =>
                update(
                  "waste",
                  e.target.value
                )
              }
              className="h-10 w-24 rounded-md border border-slate-300 px-3 text-center outline-none focus:border-blue-600"
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

          <label className={labelClass}>
            Price per square foot ($)
          </label>

          <input
            type="number"
            min="0"
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
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

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
            onClick={clear}
            className="rounded-md bg-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-300"
          >
            Clear
          </button>

        </div>

        {/* Result */}
        <ResultBox result={result} />

      </div>
    </section>
  );
}
