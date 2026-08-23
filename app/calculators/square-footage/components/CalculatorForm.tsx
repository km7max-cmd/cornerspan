"use client";

import { useState } from "react";

import InputField from "./InputField";
import ResultBox from "./ResultBox";

import { calculateSquareFootage } from "../calculations";

import type {
  CalculationError,
  CalculationResult,
  CalculatorInputs,
  Shape,
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

  const inputClass =
    "h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-base font-medium text-slate-700";

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
    setError(null);
  };

  const calculate = () => {
    const calculation =
      calculateSquareFootage(inputs);

    setResult(calculation.result);
    setError(calculation.error);
  };

  const clear = () => {
    setInputs({
      ...initialInputs,
    });

    setResult(null);
    setError(null);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">

      {/* Header */}
      <div className="bg-blue-700 px-4 py-4 text-center text-xl font-bold text-white sm:text-2xl">
        Square Footage Calculator
      </div>

      <div className="space-y-6 p-5 sm:p-7">

        {/* Shape */}
        <div>
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
        {inputs.shape === "Known Area" && (
          <div>
            <label className={labelClass}>
              Area (Square Feet)
            </label>

            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={inputs.knownArea}
              onChange={(e) =>
                update(
                  "knownArea",
                  e.target.value
                )
              }
              placeholder="0"
              className={inputClass}
            />
          </div>
        )}

        {/* Rectangle / Room */}
        {(inputs.shape === "Rectangle" ||
          inputs.shape === "Room") && (
          <div className="space-y-6">

            <InputField
              label="Length"
              feetValue={inputs.lengthFeet}
              inchesValue={inputs.lengthInches}
              onFeetChange={(value) =>
                update(
                  "lengthFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "lengthInches",
                  value
                )
              }
              helperText="Enter feet and additional inches if needed."
            />

            <InputField
              label="Width"
              feetValue={inputs.widthFeet}
              inchesValue={inputs.widthInches}
              onFeetChange={(value) =>
                update(
                  "widthFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "widthInches",
                  value
                )
              }
              helperText="Enter feet and additional inches if needed."
            />

          </div>
        )}

        {/* Square */}
        {inputs.shape === "Square" && (
          <InputField
            label="Side Length"
            feetValue={inputs.lengthFeet}
            inchesValue={inputs.lengthInches}
            onFeetChange={(value) =>
              update(
                "lengthFeet",
                value
              )
            }
            onInchesChange={(value) =>
              update(
                "lengthInches",
                value
              )
            }
          />
        )}

        {/* Wall with Window */}
        {inputs.shape === "Wall with Window" && (
          <div className="space-y-6">

            <InputField
              label="Wall Width"
              feetValue={inputs.lengthFeet}
              inchesValue={inputs.lengthInches}
              onFeetChange={(value) =>
                update(
                  "lengthFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "lengthInches",
                  value
                )
              }
            />

            <InputField
              label="Wall Height"
              feetValue={inputs.heightFeet}
              inchesValue={inputs.heightInches}
              onFeetChange={(value) =>
                update(
                  "heightFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "heightInches",
                  value
                )
              }
            />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

              <h3 className="mb-5 text-lg font-semibold text-slate-800">
                Window
              </h3>

              <div className="space-y-5">

                <InputField
                  label="Window Width"
                  feetValue={
                    inputs.windowWidthFeet
                  }
                  inchesValue={
                    inputs.windowWidthInches
                  }
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

                <InputField
                  label="Window Height"
                  feetValue={
                    inputs.windowHeightFeet
                  }
                  inchesValue={
                    inputs.windowHeightInches
                  }
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

                <div>
                  <label className={labelClass}>
                    Window Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    value={
                      inputs.windowQuantity
                    }
                    onChange={(e) =>
                      update(
                        "windowQuantity",
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
        {inputs.shape === "Cathedral Wall" && (
          <div className="space-y-6">

            <InputField
              label="Wall Width"
              feetValue={inputs.widthFeet}
              inchesValue={inputs.widthInches}
              onFeetChange={(value) =>
                update(
                  "widthFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "widthInches",
                  value
                )
              }
            />

            <InputField
              label="Wall Height"
              feetValue={inputs.heightFeet}
              inchesValue={inputs.heightInches}
              onFeetChange={(value) =>
                update(
                  "heightFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "heightInches",
                  value
                )
              }
            />

            <InputField
              label="Triangle Height"
              feetValue={inputs.sideAFeet}
              inchesValue={inputs.sideAInches}
              onFeetChange={(value) =>
                update(
                  "sideAFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "sideAInches",
                  value
                )
              }
            />

          </div>
        )}

        {/* Rectangle Border */}
        {inputs.shape === "Rectangle Border" && (
          <div className="space-y-6">

            <InputField
              label="Length"
              feetValue={inputs.lengthFeet}
              inchesValue={inputs.lengthInches}
              onFeetChange={(value) =>
                update(
                  "lengthFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "lengthInches",
                  value
                )
              }
            />

            <InputField
              label="Width"
              feetValue={inputs.widthFeet}
              inchesValue={inputs.widthInches}
              onFeetChange={(value) =>
                update(
                  "widthFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "widthInches",
                  value
                )
              }
            />

            <InputField
              label="Border Width"
              feetValue={inputs.borderFeet}
              inchesValue={inputs.borderInches}
              onFeetChange={(value) =>
                update(
                  "borderFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "borderInches",
                  value
                )
              }
            />

          </div>
        )}

        {/* Circle */}
        {inputs.shape === "Circle" && (
          <InputField
            label="Diameter"
            feetValue={inputs.lengthFeet}
            inchesValue={inputs.lengthInches}
            onFeetChange={(value) =>
              update(
                "lengthFeet",
                value
              )
            }
            onInchesChange={(value) =>
              update(
                "lengthInches",
                value
              )
            }
          />
        )}

        {/* Circle Border / Annulus */}
        {(inputs.shape === "Circle Border" ||
          inputs.shape === "Annulus") && (
          <div className="space-y-6">

            <InputField
              label="Outer Diameter"
              feetValue={inputs.lengthFeet}
              inchesValue={inputs.lengthInches}
              onFeetChange={(value) =>
                update(
                  "lengthFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "lengthInches",
                  value
                )
              }
            />

            <InputField
              label="Border Width"
              feetValue={inputs.borderFeet}
              inchesValue={inputs.borderInches}
              onFeetChange={(value) =>
                update(
                  "borderFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "borderInches",
                  value
                )
              }
            />

          </div>
        )}

        {/* Triangle */}
        {inputs.shape === "Triangle" && (
          <div className="space-y-6">

            <InputField
              label="Side A"
              feetValue={inputs.sideAFeet}
              inchesValue={inputs.sideAInches}
              onFeetChange={(value) =>
                update(
                  "sideAFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "sideAInches",
                  value
                )
              }
            />

            <InputField
              label="Side B"
              feetValue={inputs.sideBFeet}
              inchesValue={inputs.sideBInches}
              onFeetChange={(value) =>
                update(
                  "sideBFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "sideBInches",
                  value
                )
              }
            />

            <InputField
              label="Side C"
              feetValue={inputs.sideCFeet}
              inchesValue={inputs.sideCInches}
              onFeetChange={(value) =>
                update(
                  "sideCFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "sideCInches",
                  value
                )
              }
            />

          </div>
        )}

        {/* Triangle 1/2 b×h */}
        {inputs.shape === "Triangle 1/2 b×h" && (
          <div className="space-y-6">

            <InputField
              label="Base"
              feetValue={inputs.sideAFeet}
              inchesValue={inputs.sideAInches}
              onFeetChange={(value) =>
                update(
                  "sideAFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "sideAInches",
                  value
                )
              }
            />

            <InputField
              label="Height"
              feetValue={inputs.heightFeet}
              inchesValue={inputs.heightInches}
              onFeetChange={(value) =>
                update(
                  "heightFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "heightInches",
                  value
                )
              }
            />

          </div>
        )}

        {/* Trapezoid */}
        {inputs.shape === "Trapezoid" && (
          <div className="space-y-6">

            <InputField
              label="Base A"
              feetValue={inputs.sideAFeet}
              inchesValue={inputs.sideAInches}
              onFeetChange={(value) =>
                update(
                  "sideAFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "sideAInches",
                  value
                )
              }
            />

            <InputField
              label="Base B"
              feetValue={inputs.sideBFeet}
              inchesValue={inputs.sideBInches}
              onFeetChange={(value) =>
                update(
                  "sideBFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "sideBInches",
                  value
                )
              }
            />

            <InputField
              label="Height"
              feetValue={inputs.heightFeet}
              inchesValue={inputs.heightInches}
              onFeetChange={(value) =>
                update(
                  "heightFeet",
                  value
                )
              }
              onInchesChange={(value) =>
                update(
                  "heightInches",
                  value
                )
              }
            />

          </div>
        )}

        {/* Quantity */}
        <div>
          <label className={labelClass}>
            Quantity
          </label>

          <input
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
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
        <fieldset className="rounded-xl border border-slate-300 p-5">

          <legend className="px-2 text-base font-medium text-slate-500">
            Optional Material Waste
          </legend>

          <div className="flex items-center gap-3">

            <span className="text-base text-slate-600">
              Add an extra
            </span>

            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={inputs.waste}
              onChange={(e) =>
                update(
                  "waste",
                  e.target.value
                )
              }
              className="h-12 w-28 rounded-lg border border-slate-300 bg-white px-3 text-center text-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <span className="text-base text-slate-600">
              %
            </span>

          </div>
        </fieldset>

        {/* Price */}
        <fieldset className="rounded-xl border border-slate-300 p-5">

          <legend className="px-2 text-base font-medium text-slate-500">
            Optional Material Cost
          </legend>

          <label className={labelClass}>
            Price per square foot ($)
          </label>

          <input
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
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

        {/* Error / Result */}
        <ResultBox
          result={result}
          error={error}
        />

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">

          <button
            type="button"
            onClick={calculate}
            className="rounded-lg bg-blue-700 px-5 py-3.5 text-base font-bold text-white transition hover:bg-blue-800 active:scale-[0.99]"
          >
            Calculate
          </button>

          <button
            type="button"
            onClick={clear}
            className="rounded-lg bg-slate-200 px-5 py-3.5 text-base font-semibold text-slate-700 transition hover:bg-slate-300 active:scale-[0.99]"
          >
            Clear
          </button>

        </div>

      </div>
    </section>
  );
}
