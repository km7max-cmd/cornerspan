"use client";

import { useState } from "react";

import type {
  CalculatorInputs,
  CalculationError,
  CalculationResult,
  Shape,
} from "../types";

import { calculateSquareFootage } from "../calculations";
import ResultBox from "./ResultBox";

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

  lengthFeet: "",
  lengthInches: "",

  widthFeet: "",
  widthInches: "",

  heightFeet: "",
  heightInches: "",

  quantity: "1",

  borderFeet: "",
  borderInches: "",

  sideAFeet: "",
  sideAInches: "",

  sideBFeet: "",
  sideBInches: "",

  sideCFeet: "",
  sideCInches: "",

  windowWidthFeet: "",
  windowWidthInches: "",

  windowHeightFeet: "",
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
    useState<CalculationError>(null);

  function update<K extends keyof CalculatorInputs>(
    key: K,
    value: CalculatorInputs[K]
  ) {
    setInputs((current) => ({
      ...current,
      [key]: value,
    }));

    setResult(null);
    setError(null);
  }

  function calculate() {
    const response =
      calculateSquareFootage(inputs);

    if (response.error) {
      setResult(null);
      setError(response.error);
      return;
    }

    setError(null);
    setResult(response.result);
  }

  function clear() {
    setInputs({
      ...initialInputs,
      shape: inputs.shape,
    });

    setResult(null);
    setError(null);
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-blue-700 px-5 py-4 text-center sm:px-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Square Footage Calculator
        </h2>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        {/* Shape */}
        <div>
          <label
            htmlFor="shape"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Area or Shape
          </label>

          <select
            id="shape"
            value={inputs.shape}
            onChange={(e) =>
              update(
                "shape",
                e.target.value as Shape
              )
            }
            className={selectClass}
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
        {inputs.shape === "Known Area" && (
          <NumberField
            label="Known Area (square feet)"
            value={inputs.knownArea}
            onChange={(value) =>
              update("knownArea", value)
            }
          />
        )}

        {/* Rectangle / Room / Square */}
        {(inputs.shape === "Rectangle" ||
          inputs.shape === "Room") && (
          <>
            <FeetInchesField
              label="Length"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                update("lengthFeet", value)
              }
              onInchesChange={(value) =>
                update("lengthInches", value)
              }
            />

            <FeetInchesField
              label="Width"
              feet={inputs.widthFeet}
              inches={inputs.widthInches}
              onFeetChange={(value) =>
                update("widthFeet", value)
              }
              onInchesChange={(value) =>
                update("widthInches", value)
              }
            />
          </>
        )}

        {inputs.shape === "Square" && (
          <FeetInchesField
            label="Side Length"
            feet={inputs.lengthFeet}
            inches={inputs.lengthInches}
            onFeetChange={(value) =>
              update("lengthFeet", value)
            }
            onInchesChange={(value) =>
              update("lengthInches", value)
            }
          />
        )}

        {/* Wall with Window */}
        {inputs.shape === "Wall with Window" && (
          <>
            <FeetInchesField
              label="Wall Width"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                update("lengthFeet", value)
              }
              onInchesChange={(value) =>
                update("lengthInches", value)
              }
            />

            <FeetInchesField
              label="Wall Height"
              feet={inputs.heightFeet}
              inches={inputs.heightInches}
              onFeetChange={(value) =>
                update("heightFeet", value)
              }
              onInchesChange={(value) =>
                update("heightInches", value)
              }
            />

            <FeetInchesField
              label="Window Width"
              feet={inputs.windowWidthFeet}
              inches={inputs.windowWidthInches}
              onFeetChange={(value) =>
                update(
                  "windowWidthFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "windowWidthInches",
                  value
                )
              }
            />

            <FeetInchesField
              label="Window Height"
              feet={inputs.windowHeightFeet}
              inches={inputs.windowHeightInches}
              onFeetChange={(value) =>
                update(
                  "windowHeightFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "windowHeightInches",
                  value
                )
              }
            />

            <NumberField
              label="Window Quantity"
              value={inputs.windowQuantity}
              onChange={(value) =>
                update(
                  "windowQuantity",
                  value
                )
              }
            />
          </>
        )}

        {/* Cathedral Wall */}
        {inputs.shape === "Cathedral Wall" && (
          <>
            <FeetInchesField
              label="Wall Width"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                update("lengthFeet", value)
              }
              onInchesChange={(value) =>
                update("lengthInches", value)
              }
            />

            <FeetInchesField
              label="Wall Height"
              feet={inputs.heightFeet}
              inches={inputs.heightInches}
              onFeetChange={(value) =>
                update("heightFeet", value)
              }
              onInchesChange={(value) =>
                update("heightInches", value)
              }
            />

            <FeetInchesField
              label="Cathedral Triangle Height"
              feet={inputs.widthFeet}
              inches={inputs.widthInches}
              onFeetChange={(value) =>
                update("widthFeet", value)
              }
              onInchesChange={(value) =>
                update("widthInches", value)
              }
            />
          </>
        )}

        {/* Rectangle Border */}
        {inputs.shape ===
          "Rectangle Border" && (
          <>
            <FeetInchesField
              label="Length"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                update("lengthFeet", value)
              }
              onInchesChange={(value) =>
                update("lengthInches", value)
              }
            />

            <FeetInchesField
              label="Width"
              feet={inputs.widthFeet}
              inches={inputs.widthInches}
              onFeetChange={(value) =>
                update("widthFeet", value)
              }
              onInchesChange={(value) =>
                update("widthInches", value)
              }
            />

            <FeetInchesField
              label="Border Width"
              feet={inputs.borderFeet}
              inches={inputs.borderInches}
              onFeetChange={(value) =>
                update("borderFeet", value)
              }
              onInchesChange={(value) =>
                update("borderInches", value)
              }
            />
          </>
        )}

        {/* Circle */}
        {inputs.shape === "Circle" && (
          <FeetInchesField
            label="Diameter"
            feet={inputs.lengthFeet}
            inches={inputs.lengthInches}
            onFeetChange={(value) =>
              update("lengthFeet", value)
            }
            onInchesChange={(value) =>
              update("lengthInches", value)
            }
          />
        )}

        {/* Circle Border */}
        {inputs.shape ===
          "Circle Border" && (
          <>
            <FeetInchesField
              label="Outer Diameter"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                update("lengthFeet", value)
              }
              onInchesChange={(value) =>
                update("lengthInches", value)
              }
            />

            <FeetInchesField
              label="Border Width"
              feet={inputs.borderFeet}
              inches={inputs.borderInches}
              onFeetChange={(value) =>
                update("borderFeet", value)
              }
              onInchesChange={(value) =>
                update("borderInches", value)
              }
            />
          </>
        )}

        {/* Annulus */}
        {inputs.shape === "Annulus" && (
          <>
            <FeetInchesField
              label="Outer Diameter"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                update("lengthFeet", value)
              }
              onInchesChange={(value) =>
                update("lengthInches", value)
              }
            />

            <FeetInchesField
              label="Inner Diameter"
              feet={inputs.widthFeet}
              inches={inputs.widthInches}
              onFeetChange={(value) =>
                update("widthFeet", value)
              }
              onInchesChange={(value) =>
                update("widthInches", value)
              }
            />
          </>
        )}

        {/* Triangle */}
        {inputs.shape === "Triangle" && (
          <>
            <FeetInchesField
              label="Side A"
              feet={inputs.sideAFeet}
              inches={inputs.sideAInches}
              onFeetChange={(value) =>
                update("sideAFeet", value)
              }
              onInchesChange={(value) =>
                update("sideAInches", value)
              }
            />

            <FeetInchesField
              label="Side B"
              feet={inputs.sideBFeet}
              inches={inputs.sideBInches}
              onFeetChange={(value) =>
                update("sideBFeet", value)
              }
              onInchesChange={(value) =>
                update("sideBInches", value)
              }
            />

            <FeetInchesField
              label="Side C"
              feet={inputs.sideCFeet}
              inches={inputs.sideCInches}
              onFeetChange={(value) =>
                update("sideCFeet", value)
              }
              onInchesChange={(value) =>
                update("sideCInches", value)
              }
            />
          </>
        )}

        {/* Base × Height Triangle */}
        {inputs.shape ===
          "Triangle 1/2 b×h" && (
          <>
            <FeetInchesField
              label="Base"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                update("lengthFeet", value)
              }
              onInchesChange={(value) =>
                update("lengthInches", value)
              }
            />

            <FeetInchesField
              label="Height"
              feet={inputs.heightFeet}
              inches={inputs.heightInches}
              onFeetChange={(value) =>
                update("heightFeet", value)
              }
              onInchesChange={(value) =>
                update("heightInches", value)
              }
            />
          </>
        )}

        {/* Trapezoid */}
        {inputs.shape === "Trapezoid" && (
          <>
            <FeetInchesField
              label="Parallel Side A"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                update("lengthFeet", value)
              }
              onInchesChange={(value) =>
                update("lengthInches", value)
              }
            />

            <FeetInchesField
              label="Parallel Side B"
              feet={inputs.widthFeet}
              inches={inputs.widthInches}
              onFeetChange={(value) =>
                update("widthFeet", value)
              }
              onInchesChange={(value) =>
                update("widthInches", value)
              }
            />

            <FeetInchesField
              label="Height"
              feet={inputs.heightFeet}
              inches={inputs.heightInches}
              onFeetChange={(value) =>
                update("heightFeet", value)
              }
              onInchesChange={(value) =>
                update("heightInches", value)
              }
            />
          </>
        )}

        {/* Quantity */}
        <NumberField
          label="Quantity"
          value={inputs.quantity}
          onChange={(value) =>
            update("quantity", value)
          }
        />

        {/* Waste */}
        <fieldset className="rounded-xl border border-slate-300 p-4">
          <legend className="px-2 text-sm font-medium text-slate-500">
            Optional Material Waste
          </legend>

          <div className="flex items-center gap-3">
            <label
              htmlFor="waste"
              className="text-sm text-slate-600"
            >
              Add an extra
            </label>

            <input
              id="waste"
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
              className="h-11 w-28 rounded-lg border border-slate-300 px-3 text-center outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <span className="text-sm text-slate-600">
              %
            </span>
          </div>
        </fieldset>

        {/* Cost */}
        <fieldset className="rounded-xl border border-slate-300 p-4">
          <legend className="px-2 text-sm font-medium text-slate-500">
            Optional Material Cost
          </legend>

          <label
            htmlFor="price"
            className="mb-2 block text-sm text-slate-600"
          >
            Price per square foot ($)
          </label>

          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            value={inputs.price}
            onChange={(e) =>
              update(
                "price",
                e.target.value
              )
            }
            className={inputClass}
          />
        </fieldset>

        {/* Buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
          error={error}
        />
      </div>
    </section>
  );
}

/* -------------------------------- */
/* Reusable input components         */
/* -------------------------------- */

function FeetInchesField({
  label,
  feet,
  inches,
  onFeetChange,
  onInchesChange,
}: {
  label: string;
  feet: string;
  inches: string;
  onFeetChange: (value: string) => void;
  onInchesChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <input
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            placeholder="0"
            value={feet}
            onChange={(e) =>
              onFeetChange(e.target.value)
            }
            className={`${inputClass} pr-10`}
          />

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
            ft
          </span>
        </div>

        <div className="relative">
          <input
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            placeholder="0"
            value={inches}
            onChange={(e) =>
              onInchesChange(e.target.value)
            }
            className={`${inputClass} pr-10`}
          />

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
            in
          </span>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type="number"
        min="0"
        step="any"
        inputMode="decimal"
        placeholder="0"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className={inputClass}
      />
    </div>
  );
}

const inputClass =
  "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

const selectClass =
  "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";
