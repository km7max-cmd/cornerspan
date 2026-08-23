"use client";

import { useState } from "react";
import type {
  CalculationError,
  CalculationResult,
  CalculatorInputs,
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
    useState<CalculatorInputs>(initialInputs);

  const [result, setResult] =
    useState<CalculationResult | null>(null);

  const [error, setError] =
    useState<CalculationError>(null);

  function updateField(
    field: keyof CalculatorInputs,
    value: string
  ) {
    setInputs((current) => ({
      ...current,
      [field]: value,
    }));

    setError(null);
  }

  function changeShape(shape: Shape) {
    setInputs((current) => ({
      ...current,
      shape,
    }));

    setResult(null);
    setError(null);
  }

  function calculate() {
    const calculation =
      calculateSquareFootage(inputs);

    if (calculation.error) {
      setResult(null);
      setError(calculation.error);
      return;
    }

    setError(null);
    setResult(calculation.result);
  }

  function clear() {
    setInputs(initialInputs);
    setResult(null);
    setError(null);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-blue-700 px-5 py-5 text-center sm:px-6">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Square Footage Calculator
        </h2>
      </div>

      {/* Form */}
      <div className="space-y-6 p-5 sm:p-7">
        {/* Shape */}
        <div>
          <label className="mb-2 block text-base font-medium text-slate-700">
            Area or Shape
          </label>

          <select
            value={inputs.shape}
            onChange={(e) =>
              changeShape(e.target.value as Shape)
            }
            className={selectClass}
          >
            {shapes.map((shape) => (
              <option key={shape} value={shape}>
                {shape}
              </option>
            ))}
          </select>
        </div>

        {/* Known Area */}
        {inputs.shape === "Known Area" && (
          <Field
            label="Known Area (square feet)"
            value={inputs.knownArea}
            onChange={(value) =>
              updateField("knownArea", value)
            }
            placeholder="0"
            inputMode="decimal"
          />
        )}

        {/* Rectangle / Room */}
        {(inputs.shape === "Rectangle" ||
          inputs.shape === "Room") && (
          <>
            <MeasurementField
              label="Length"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                updateField("lengthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("lengthInches", value)
              }
            />

            <MeasurementField
              label="Width"
              feet={inputs.widthFeet}
              inches={inputs.widthInches}
              onFeetChange={(value) =>
                updateField("widthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("widthInches", value)
              }
            />
          </>
        )}

        {/* Square */}
        {inputs.shape === "Square" && (
          <MeasurementField
            label="Side Length"
            feet={inputs.lengthFeet}
            inches={inputs.lengthInches}
            onFeetChange={(value) =>
              updateField("lengthFeet", value)
            }
            onInchesChange={(value) =>
              updateField("lengthInches", value)
            }
          />
        )}

        {/* Rectangle Border */}
        {inputs.shape === "Rectangle Border" && (
          <>
            <MeasurementField
              label="Length"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                updateField("lengthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("lengthInches", value)
              }
            />

            <MeasurementField
              label="Width"
              feet={inputs.widthFeet}
              inches={inputs.widthInches}
              onFeetChange={(value) =>
                updateField("widthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("widthInches", value)
              }
            />

            <MeasurementField
              label="Border Width"
              feet={inputs.borderFeet}
              inches={inputs.borderInches}
              onFeetChange={(value) =>
                updateField("borderFeet", value)
              }
              onInchesChange={(value) =>
                updateField("borderInches", value)
              }
            />
          </>
        )}

        {/* Circle */}
        {inputs.shape === "Circle" && (
          <MeasurementField
            label="Diameter"
            feet={inputs.lengthFeet}
            inches={inputs.lengthInches}
            onFeetChange={(value) =>
              updateField("lengthFeet", value)
            }
            onInchesChange={(value) =>
              updateField("lengthInches", value)
            }
          />
        )}

        {/* Circle Border */}
        {inputs.shape === "Circle Border" && (
          <>
            <MeasurementField
              label="Outer Diameter"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                updateField("lengthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("lengthInches", value)
              }
            />

            <MeasurementField
              label="Border Width"
              feet={inputs.borderFeet}
              inches={inputs.borderInches}
              onFeetChange={(value) =>
                updateField("borderFeet", value)
              }
              onInchesChange={(value) =>
                updateField("borderInches", value)
              }
            />
          </>
        )}

        {/* Annulus */}
        {inputs.shape === "Annulus" && (
          <>
            <MeasurementField
              label="Outer Diameter"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                updateField("lengthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("lengthInches", value)
              }
            />

            <MeasurementField
              label="Inner Diameter"
              feet={inputs.widthFeet}
              inches={inputs.widthInches}
              onFeetChange={(value) =>
                updateField("widthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("widthInches", value)
              }
            />
          </>
        )}

        {/* Wall with Window */}
        {inputs.shape === "Wall with Window" && (
          <>
            <MeasurementField
              label="Wall Length"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                updateField("lengthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("lengthInches", value)
              }
            />

            <MeasurementField
              label="Wall Height"
              feet={inputs.heightFeet}
              inches={inputs.heightInches}
              onFeetChange={(value) =>
                updateField("heightFeet", value)
              }
              onInchesChange={(value) =>
                updateField("heightInches", value)
              }
            />

            <MeasurementField
              label="Window Width"
              feet={inputs.windowWidthFeet}
              inches={inputs.windowWidthInches}
              onFeetChange={(value) =>
                updateField(
                  "windowWidthFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                updateField(
                  "windowWidthInches",
                  value
                )
              }
            />

            <MeasurementField
              label="Window Height"
              feet={inputs.windowHeightFeet}
              inches={inputs.windowHeightInches}
              onFeetChange={(value) =>
                updateField(
                  "windowHeightFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                updateField(
                  "windowHeightInches",
                  value
                )
              }
            />

            <Field
              label="Window Quantity"
              value={inputs.windowQuantity}
              onChange={(value) =>
                updateField(
                  "windowQuantity",
                  value
                )
              }
              placeholder="1"
              inputMode="numeric"
            />
          </>
        )}

        {/* Cathedral Wall */}
        {inputs.shape === "Cathedral Wall" && (
          <>
            <MeasurementField
              label="Wall Length"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                updateField("lengthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("lengthInches", value)
              }
            />

            <MeasurementField
              label="Wall Height"
              feet={inputs.heightFeet}
              inches={inputs.heightInches}
              onFeetChange={(value) =>
                updateField("heightFeet", value)
              }
              onInchesChange={(value) =>
                updateField("heightInches", value)
              }
            />

            <MeasurementField
              label="Gable Height"
              feet={inputs.widthFeet}
              inches={inputs.widthInches}
              onFeetChange={(value) =>
                updateField("widthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("widthInches", value)
              }
            />
          </>
        )}

        {/* Triangle */}
        {inputs.shape === "Triangle" && (
          <>
            <MeasurementField
              label="Side A"
              feet={inputs.sideAFeet}
              inches={inputs.sideAInches}
              onFeetChange={(value) =>
                updateField("sideAFeet", value)
              }
              onInchesChange={(value) =>
                updateField("sideAInches", value)
              }
            />

            <MeasurementField
              label="Side B"
              feet={inputs.sideBFeet}
              inches={inputs.sideBInches}
              onFeetChange={(value) =>
                updateField("sideBFeet", value)
              }
              onInchesChange={(value) =>
                updateField("sideBInches", value)
              }
            />

            <MeasurementField
              label="Side C"
              feet={inputs.sideCFeet}
              inches={inputs.sideCInches}
              onFeetChange={(value) =>
                updateField("sideCFeet", value)
              }
              onInchesChange={(value) =>
                updateField("sideCInches", value)
              }
            />
          </>
        )}

        {/* Triangle 1/2 b×h */}
        {inputs.shape === "Triangle 1/2 b×h" && (
          <>
            <MeasurementField
              label="Base"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                updateField("lengthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("lengthInches", value)
              }
            />

            <MeasurementField
              label="Height"
              feet={inputs.heightFeet}
              inches={inputs.heightInches}
              onFeetChange={(value) =>
                updateField("heightFeet", value)
              }
              onInchesChange={(value) =>
                updateField("heightInches", value)
              }
            />
          </>
        )}

        {/* Trapezoid */}
        {inputs.shape === "Trapezoid" && (
          <>
            <MeasurementField
              label="Base A"
              feet={inputs.lengthFeet}
              inches={inputs.lengthInches}
              onFeetChange={(value) =>
                updateField("lengthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("lengthInches", value)
              }
            />

            <MeasurementField
              label="Base B"
              feet={inputs.widthFeet}
              inches={inputs.widthInches}
              onFeetChange={(value) =>
                updateField("widthFeet", value)
              }
              onInchesChange={(value) =>
                updateField("widthInches", value)
              }
            />

            <MeasurementField
              label="Height"
              feet={inputs.heightFeet}
              inches={inputs.heightInches}
              onFeetChange={(value) =>
                updateField("heightFeet", value)
              }
              onInchesChange={(value) =>
                updateField("heightInches", value)
              }
            />
          </>
        )}

        {/* Quantity */}
        <Field
          label="Quantity"
          value={inputs.quantity}
          onChange={(value) =>
            updateField("quantity", value)
          }
          placeholder="1"
          inputMode="numeric"
        />

        {/* Waste */}
        <fieldset className="rounded-xl border border-slate-300 px-4 pb-5 pt-2">
          <legend className="px-2 text-base font-medium text-slate-500">
            Optional Material Waste
          </legend>

          <div className="flex items-center justify-center gap-3 pt-3 sm:justify-start">
            <span className="text-base text-slate-600">
              Add an extra
            </span>

            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={inputs.waste}
              onChange={(e) =>
                updateField(
                  "waste",
                  e.target.value
                )
              }
              className="h-12 w-32 rounded-lg border border-slate-300 bg-white px-4 text-center text-lg text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <span className="text-base text-slate-600">
              %
            </span>
          </div>
        </fieldset>

        {/* Material Cost */}
        <fieldset className="rounded-xl border border-slate-300 px-4 pb-5 pt-2">
          <legend className="px-2 text-base font-medium text-slate-500">
            Optional Material Cost
          </legend>

          <div className="pt-3">
            <Field
              label="Price per square foot ($)"
              value={inputs.price}
              onChange={(value) =>
                updateField("price", value)
              }
              placeholder="0"
              inputMode="decimal"
            />
          </div>
        </fieldset>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            Please enter a valid{" "}
            {error === "Area"
              ? "Area"
              : error === "Border Width"
                ? "Border Width"
                : error}.
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={calculate}
            className="h-12 rounded-lg bg-blue-700 px-5 text-base font-bold text-white transition hover:bg-blue-800 active:scale-[0.99]"
          >
            Calculate
          </button>

          <button
            type="button"
            onClick={clear}
            className="h-12 rounded-lg bg-slate-200 px-5 text-base font-semibold text-slate-700 transition hover:bg-slate-300 active:scale-[0.99]"
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

/* -----------------------------
   Measurement Field
----------------------------- */

function MeasurementField({
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
      <label className="mb-2 block text-base font-medium text-slate-700">
        {label}
      </label>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <input
            type="number"
            min="0"
            inputMode="decimal"
            value={feet}
            onChange={(e) =>
              onFeetChange(e.target.value)
            }
            placeholder="0"
            className={measurementInputClass}
          />

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-slate-500">
            ft
          </span>
        </div>

        <div className="relative">
          <input
            type="number"
            min="0"
            max="11"
            inputMode="decimal"
            value={inches}
            onChange={(e) =>
              onInchesChange(e.target.value)
            }
            placeholder="0"
            className={measurementInputClass}
          />

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-slate-500">
            in
          </span>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   Normal Field
----------------------------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode = "decimal",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: "decimal" | "numeric";
}) {
  return (
    <div>
      <label className="mb-2 block text-base font-medium text-slate-700">
        {label}
      </label>

      <input
        type="number"
        min="0"
        inputMode={inputMode}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder ?? "0"}
        className={inputClass}
      />
    </div>
  );
}

/* -----------------------------
   Classes
----------------------------- */

const inputClass =
  "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

const measurementInputClass =
  "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 pr-12 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

const selectClass =
  "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";
