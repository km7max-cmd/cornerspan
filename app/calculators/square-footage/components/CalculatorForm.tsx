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
  width: "",
  height: "",
  quantity: "1",
  unit: "feet",
  borderWidth: "",
  sideA: "",
  sideB: "",
  sideC: "",
  windowWidth: "",
  windowHeight: "",
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

  const [error, setError] = useState("");

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

  const setUnit = (unit: Unit) => {
    update("unit", unit);
  };

  const isPositive = (value: string) => {
    const number = Number(value);
    return Number.isFinite(number) && number > 0;
  };

  const validate = (): string => {
    const shape = inputs.shape;

    if (!isPositive(inputs.quantity)) {
      return "Please enter a valid Quantity.";
    }

    if (shape === "Known Area") {
      if (!isPositive(inputs.knownArea)) {
        return "Please enter a valid Area.";
      }
    }

    if (
      shape === "Rectangle" ||
      shape === "Room"
    ) {
      if (!isPositive(inputs.length)) {
        return "Please enter a valid Length.";
      }

      if (!isPositive(inputs.width)) {
        return "Please enter a valid Width.";
      }
    }

    if (shape === "Square") {
      if (!isPositive(inputs.length)) {
        return "Please enter a valid Side Length.";
      }
    }

    if (shape === "Wall with Window") {
      if (!isPositive(inputs.length)) {
        return "Please enter a valid Wall Width.";
      }

      if (!isPositive(inputs.height)) {
        return "Please enter a valid Wall Height.";
      }

      if (!isPositive(inputs.windowWidth)) {
        return "Please enter a valid Window Width.";
      }

      if (!isPositive(inputs.windowHeight)) {
        return "Please enter a valid Window Height.";
      }

      if (!isPositive(inputs.windowQuantity)) {
        return "Please enter a valid Window Quantity.";
      }
    }

    if (shape === "Cathedral Wall") {
      if (!isPositive(inputs.width)) {
        return "Please enter a valid Wall Width.";
      }

      if (!isPositive(inputs.height)) {
        return "Please enter a valid Wall Height.";
      }

      if (!isPositive(inputs.sideA)) {
        return "Please enter a valid Triangle Height.";
      }
    }

    if (shape === "Rectangle Border") {
      if (!isPositive(inputs.length)) {
        return "Please enter a valid Length.";
      }

      if (!isPositive(inputs.width)) {
        return "Please enter a valid Width.";
      }

      if (!isPositive(inputs.borderWidth)) {
        return "Please enter a valid Border Width.";
      }

      const length = Number(inputs.length);
      const width = Number(inputs.width);
      const border = Number(inputs.borderWidth);

      if (border * 2 >= length || border * 2 >= width) {
        return "Border Width is too large for this rectangle.";
      }
    }

    if (shape === "Circle") {
      if (!isPositive(inputs.length)) {
        return "Please enter a valid Diameter.";
      }
    }

    if (
      shape === "Circle Border" ||
      shape === "Annulus"
    ) {
      if (!isPositive(inputs.length)) {
        return "Please enter a valid Outer Diameter.";
      }

      if (!isPositive(inputs.borderWidth)) {
        return "Please enter a valid Border Width.";
      }

      const diameter = Number(inputs.length);
      const border = Number(inputs.borderWidth);

      if (border * 2 >= diameter) {
        return "Border Width is too large for this circle.";
      }
    }

    if (shape === "Triangle") {
      if (!isPositive(inputs.sideA)) {
        return "Please enter a valid Side A.";
      }

      if (!isPositive(inputs.sideB)) {
        return "Please enter a valid Side B.";
      }

      if (!isPositive(inputs.sideC)) {
        return "Please enter a valid Side C.";
      }

      const a = Number(inputs.sideA);
      const b = Number(inputs.sideB);
      const c = Number(inputs.sideC);

      if (
        a + b <= c ||
        a + c <= b ||
        b + c <= a
      ) {
        return "These three sides cannot form a valid triangle.";
      }
    }

    if (shape === "Triangle 1/2 b×h") {
      if (!isPositive(inputs.sideA)) {
        return "Please enter a valid Base.";
      }

      if (!isPositive(inputs.height)) {
        return "Please enter a valid Height.";
      }
    }

    if (shape === "Trapezoid") {
      if (!isPositive(inputs.sideA)) {
        return "Please enter a valid Base A.";
      }

      if (!isPositive(inputs.sideB)) {
        return "Please enter a valid Base B.";
      }

      if (!isPositive(inputs.height)) {
        return "Please enter a valid Height.";
      }
    }

    if (inputs.waste.trim() !== "") {
      const waste = Number(inputs.waste);

      if (!Number.isFinite(waste) || waste < 0) {
        return "Please enter a valid Waste percentage.";
      }
    }

    if (inputs.price.trim() !== "") {
      const price = Number(inputs.price);

      if (!Number.isFinite(price) || price < 0) {
        return "Please enter a valid Material Cost.";
      }
    }

    return "";
  };

  const calculate = () => {
    setError("");
    setResult(null);

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    const calculation =
      calculateSquareFootage(inputs);

    if (!calculation) {
      setError(
        "Unable to calculate this area. Please check your measurements."
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

  return (
    <section className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">

      {/* Header */}
      <div className="bg-blue-700 px-4 py-3 text-center text-lg font-bold text-white sm:text-xl">
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
        {inputs.shape === "Known Area" && (
          <InputField
            label="Area"
            value={inputs.knownArea}
            onChange={(value) =>
              update("knownArea", value)
            }
            unit={inputs.unit}
            setUnit={setUnit}
          />
        )}

        {/* Rectangle / Room */}
        {(inputs.shape === "Rectangle" ||
          inputs.shape === "Room") && (
          <div className="space-y-4">

            <InputField
              label="Length"
              value={inputs.length}
              onChange={(value) =>
                update("length", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Width"
              value={inputs.width}
              onChange={(value) =>
                update("width", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

          </div>
        )}

        {/* Square */}
        {inputs.shape === "Square" && (
          <InputField
            label="Side Length"
            value={inputs.length}
            onChange={(value) =>
              update("length", value)
            }
            unit={inputs.unit}
            setUnit={setUnit}
          />
        )}

        {/* Wall with Window */}
        {inputs.shape === "Wall with Window" && (
          <div className="space-y-4">

            <InputField
              label="Wall Width"
              value={inputs.length}
              onChange={(value) =>
                update("length", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Wall Height"
              value={inputs.height}
              onChange={(value) =>
                update("height", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

              <h3 className="mb-4 font-semibold text-slate-800">
                Window
              </h3>

              <div className="space-y-4">

                <InputField
                  label="Window Width"
                  value={inputs.windowWidth}
                  onChange={(value) =>
                    update(
                      "windowWidth",
                      value
                    )
                  }
                  unit={inputs.unit}
                  setUnit={setUnit}
                />

                <InputField
                  label="Window Height"
                  value={inputs.windowHeight}
                  onChange={(value) =>
                    update(
                      "windowHeight",
                      value
                    )
                  }
                  unit={inputs.unit}
                  setUnit={setUnit}
                />

                <div>
                  <label className={labelClass}>
                    Window Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    inputMode="numeric"
                    value={inputs.windowQuantity}
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
          <div className="space-y-4">

            <InputField
              label="Wall Width"
              value={inputs.width}
              onChange={(value) =>
                update("width", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Wall Height"
              value={inputs.height}
              onChange={(value) =>
                update("height", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Triangle Height"
              value={inputs.sideA}
              onChange={(value) =>
                update("sideA", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

          </div>
        )}

        {/* Rectangle Border */}
        {inputs.shape === "Rectangle Border" && (
          <div className="space-y-4">

            <InputField
              label="Length"
              value={inputs.length}
              onChange={(value) =>
                update("length", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Width"
              value={inputs.width}
              onChange={(value) =>
                update("width", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Border Width"
              value={inputs.borderWidth}
              onChange={(value) =>
                update(
                  "borderWidth",
                  value
                )
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

          </div>
        )}

        {/* Circle */}
        {inputs.shape === "Circle" && (
          <InputField
            label="Diameter"
            value={inputs.length}
            onChange={(value) =>
              update("length", value)
            }
            unit={inputs.unit}
            setUnit={setUnit}
          />
        )}

        {/* Circle Border / Annulus */}
        {(inputs.shape === "Circle Border" ||
          inputs.shape === "Annulus") && (
          <div className="space-y-4">

            <InputField
              label="Outer Diameter"
              value={inputs.length}
              onChange={(value) =>
                update("length", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Border Width"
              value={inputs.borderWidth}
              onChange={(value) =>
                update(
                  "borderWidth",
                  value
                )
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

          </div>
        )}

        {/* Triangle */}
        {inputs.shape === "Triangle" && (
          <div className="space-y-4">

            <InputField
              label="Side A"
              value={inputs.sideA}
              onChange={(value) =>
                update("sideA", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Side B"
              value={inputs.sideB}
              onChange={(value) =>
                update("sideB", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Side C"
              value={inputs.sideC}
              onChange={(value) =>
                update("sideC", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

          </div>
        )}

        {/* Triangle 1/2 b×h */}
        {inputs.shape === "Triangle 1/2 b×h" && (
          <div className="space-y-4">

            <InputField
              label="Base"
              value={inputs.sideA}
              onChange={(value) =>
                update("sideA", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Height"
              value={inputs.height}
              onChange={(value) =>
                update("height", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

          </div>
        )}

        {/* Trapezoid */}
        {inputs.shape === "Trapezoid" && (
          <div className="space-y-4">

            <InputField
              label="Base A"
              value={inputs.sideA}
              onChange={(value) =>
                update("sideA", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Base B"
              value={inputs.sideB}
              onChange={(value) =>
                update("sideB", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
            />

            <InputField
              label="Height"
              value={inputs.height}
              onChange={(value) =>
                update("height", value)
              }
              unit={inputs.unit}
              setUnit={setUnit}
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
              inputMode="decimal"
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

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">

          <button
            type="button"
            onClick={calculate}
            className="rounded-md bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800 active:scale-[0.99]"
          >
            Calculate
          </button>

          <button
            type="button"
            onClick={clear}
            className="rounded-md bg-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-300 active:scale-[0.99]"
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
