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
import ShapeDiagram from "./ShapeDiagram";

type Unit =
  | "ft & in"
  | "in"
  | "ft"
  | "yd"
  | "miles"
  | "mm"
  | "cm"
  | "m"
  | "km";

type AreaPriceUnit =
  | "square feet"
  | "square inches"
  | "square yards"
  | "square meters";

type Currency = {
  code: string;
  symbol: string;
};

const units: Unit[] = [
  "ft & in",
  "in",
  "ft",
  "yd",
  "miles",
  "mm",
  "cm",
  "m",
  "km",
];

const currencies: Currency[] = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "CNY", symbol: "¥" },
  { code: "JPY", symbol: "¥" },
  { code: "RUB", symbol: "₽" },
  { code: "KRW", symbol: "₩" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
  { code: "NZD", symbol: "NZ$" },
  { code: "CHF", symbol: "CHF" },
  { code: "BRL", symbol: "R$" },
  { code: "ZAR", symbol: "R" },
  { code: "AED", symbol: "د.إ" },
  { code: "SAR", symbol: "﷼" },
  { code: "SGD", symbol: "S$" },
  { code: "HKD", symbol: "HK$" },
  { code: "MXN", symbol: "MX$" },
  { code: "THB", symbol: "฿" },
  { code: "TRY", symbol: "₺" },
];

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

const initialValues: CalculatorInputs = {
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

function inputClass() {
  return [
    "h-9 w-full",
    "border border-slate-500",
    "bg-white px-2",
    "text-sm text-slate-900",
    "outline-none",
    "focus:border-blue-700",
    "focus:ring-1 focus:ring-blue-700",
  ].join(" ");
}

function selectClass() {
  return [
    "h-9 w-full",
    "border border-slate-500",
    "bg-white px-2",
    "text-sm text-slate-900",
    "outline-none",
    "focus:border-blue-700",
    "focus:ring-1 focus:ring-blue-700",
  ].join(" ");
}

function getFeetAndInches(
  value: string,
  unit: Unit
): { feet: string; inches: string } {
  const n = Number(value);

  if (!Number.isFinite(n)) {
    return {
      feet: "",
      inches: "",
    };
  }

  switch (unit) {
    case "in":
      return {
        feet: String(n / 12),
        inches: "0",
      };

    case "ft":
      return {
        feet: String(n),
        inches: "0",
      };

    case "yd":
      return {
        feet: String(n * 3),
        inches: "0",
      };

    case "miles":
      return {
        feet: String(n * 5280),
        inches: "0",
      };

    case "mm":
      return {
        feet: String(n / 304.8),
        inches: "0",
      };

    case "cm":
      return {
        feet: String(n / 30.48),
        inches: "0",
      };

    case "m":
      return {
        feet: String(n * 3.280839895),
        inches: "0",
      };

    case "km":
      return {
        feet: String(n * 3280.839895),
        inches: "0",
      };

    default:
      return {
        feet: "",
        inches: "",
      };
  }
}

export default function CalculatorForm() {
  const [values, setValues] =
    useState<CalculatorInputs>(initialValues);

  const [lengthUnit, setLengthUnit] =
    useState<Unit>("ft & in");

  const [widthUnit, setWidthUnit] =
    useState<Unit>("ft & in");

  const [heightUnit, setHeightUnit] =
    useState<Unit>("ft & in");

  const [borderUnit, setBorderUnit] =
    useState<Unit>("ft & in");

  const [sideAUnit, setSideAUnit] =
    useState<Unit>("ft & in");

  const [sideBUnit, setSideBUnit] =
    useState<Unit>("ft & in");

  const [sideCUnit, setSideCUnit] =
    useState<Unit>("ft & in");

  const [windowWidthUnit, setWindowWidthUnit] =
    useState<Unit>("ft & in");

  const [windowHeightUnit, setWindowHeightUnit] =
    useState<Unit>("ft & in");

  const [priceUnit, setPriceUnit] =
    useState<AreaPriceUnit>("square feet");

  const [currency, setCurrency] =
    useState<string>("USD");

  const [result, setResult] =
    useState<CalculationResult | null>(null);

  const [error, setError] =
    useState<CalculationError>(null);

  function update(
    key: keyof CalculatorInputs,
    value: string
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));

    setResult(null);
    setError(null);
  }

  function changeShape(shape: Shape) {
    setValues((current) => ({
      ...current,
      shape,
    }));

    setResult(null);
    setError(null);
  }

  function clear() {
    setValues({
      ...initialValues,
      shape: values.shape,
    });

    setResult(null);
    setError(null);
  }

  function normalized(
    feetKey: keyof CalculatorInputs,
    inchesKey: keyof CalculatorInputs,
    unit: Unit
  ): {
    feet: string;
    inches: string;
  } {
    if (unit === "ft & in") {
      return {
        feet: String(values[feetKey] ?? ""),
        inches: String(values[inchesKey] ?? ""),
      };
    }

    const converted = getFeetAndInches(
      String(values[feetKey] ?? ""),
      unit
    );

    return converted;
  }

  function areaPricePerSquareFoot(): string {
    const price = Number(values.price);

    if (!Number.isFinite(price) || price <= 0) {
      return "";
    }

    switch (priceUnit) {
      case "square inches":
        return String(price * 144);

      case "square yards":
        return String(price / 9);

      case "square meters":
        return String(
          price / 10.7639104167
        );

      default:
        return String(price);
    }
  }

  function calculate() {
    const length = normalized(
      "lengthFeet",
      "lengthInches",
      lengthUnit
    );

    const width = normalized(
      "widthFeet",
      "widthInches",
      widthUnit
    );

    const height = normalized(
      "heightFeet",
      "heightInches",
      heightUnit
    );

    const border = normalized(
      "borderFeet",
      "borderInches",
      borderUnit
    );

    const sideA = normalized(
      "sideAFeet",
      "sideAInches",
      sideAUnit
    );

    const sideB = normalized(
      "sideBFeet",
      "sideBInches",
      sideBUnit
    );

    const sideC = normalized(
      "sideCFeet",
      "sideCInches",
      sideCUnit
    );

    const windowWidth = normalized(
      "windowWidthFeet",
      "windowWidthInches",
      windowWidthUnit
    );

    const windowHeight = normalized(
      "windowHeightFeet",
      "windowHeightInches",
      windowHeightUnit
    );

    const normalizedValues: CalculatorInputs = {
      ...values,

      lengthFeet: length.feet,
      lengthInches: length.inches,

      widthFeet: width.feet,
      widthInches: width.inches,

      heightFeet: height.feet,
      heightInches: height.inches,

      borderFeet: border.feet,
      borderInches: border.inches,

      sideAFeet: sideA.feet,
      sideAInches: sideA.inches,

      sideBFeet: sideB.feet,
      sideBInches: sideB.inches,

      sideCFeet: sideC.feet,
      sideCInches: sideC.inches,

      windowWidthFeet: windowWidth.feet,
      windowWidthInches: windowWidth.inches,

      windowHeightFeet: windowHeight.feet,
      windowHeightInches: windowHeight.inches,

      price: areaPricePerSquareFoot(),
    };

    const calculated =
      calculateSquareFootage(
        normalizedValues
      );

    setResult(calculated.result);
    setError(calculated.error);

    if (calculated.result) {
      setTimeout(() => {
        document
          .getElementById("calculator-answer")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
      }, 50);
    }
  }

  function MeasurementField({
    label,
    feetKey,
    inchesKey,
    unit,
    setUnit,
  }: {
    label: string;
    feetKey: keyof CalculatorInputs;
    inchesKey: keyof CalculatorInputs;
    unit: Unit;
    setUnit: (unit: Unit) => void;
  }) {
    return (
      <div className="mb-3">
        <div className="mb-1 text-sm font-semibold text-slate-800">
          {label} =
        </div>

        <div className="grid grid-cols-[1fr_1fr_112px] gap-2">
          {unit === "ft & in" ? (
            <>
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={String(values[feetKey] ?? "")}
                  onChange={(e) =>
                    update(
                      feetKey,
                      e.target.value
                    )
                  }
                  className={inputClass()}
                  aria-label={`${label} feet`}
                />

                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                  ft
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={String(values[inchesKey] ?? "")}
                  onChange={(e) =>
                    update(
                      inchesKey,
                      e.target.value
                    )
                  }
                  className={inputClass()}
                  aria-label={`${label} inches`}
                />

                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                  in
                </span>
              </div>
            </>
          ) : (
            <div className="col-span-2">
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={String(values[feetKey] ?? "")}
                onChange={(e) =>
                  update(
                    feetKey,
                    e.target.value
                  )
                }
                className={inputClass()}
                aria-label={label}
              />
            </div>
          )}

          <select
            value={unit}
            onChange={(e) =>
              setUnit(e.target.value as Unit)
            }
            className={selectClass()}
            aria-label={`${label} unit`}
          >
            {units.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  function simpleInput(
    label: string,
    key: keyof CalculatorInputs,
    placeholder = ""
  ) {
    return (
      <div className="mb-3">
        <div className="mb-1 text-sm font-semibold text-slate-800">
          {label} =
        </div>

        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={String(values[key] ?? "")}
          onChange={(e) =>
            update(key, e.target.value)
          }
          placeholder={placeholder}
          className={inputClass()}
        />
      </div>
    );
  }

  function shapeImageName(): string {
    switch (values.shape) {
      case "Known Area":
        return "Known Area";

      case "Wall with Window":
        return "Wall Minus Window";

      case "Cathedral Wall":
        return "Cathedral Wall";

      case "Rectangle Border":
        return "Rectangle Border";

      case "Circle Border":
        return "Circle Border";

      case "Annulus":
        return "Annulus";

      case "Triangle":
        return "Triangle";

      case "Triangle 1/2 b×h":
        return "Triangle Base × Height";

      default:
        return values.shape;
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="border border-slate-400 bg-slate-100 p-2">
        <div className="border border-blue-800 bg-blue-700 px-3 py-2 text-center text-lg font-bold text-white">
          Square Footage Calculator
        </div>

        <div className="p-3 sm:p-4">
          {/* Shape */}
          <div className="mb-3 text-center">
            <label className="mr-2 text-sm font-semibold text-slate-800">
              Area or Shape:
            </label>

            <select
              value={values.shape}
              onChange={(e) =>
                changeShape(
                  e.target.value as Shape
                )
              }
              className="h-9 border border-slate-500 bg-white px-2 text-sm"
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

          <ShapeDiagram shape={values.shape} />

          {/* Known Area */}
          {values.shape === "Known Area" && (
            <>
              {simpleInput(
                "Known Area (square feet)",
                "knownArea"
              )}

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Room */}
          {values.shape === "Room" && (
            <>
              <MeasurementField
                label="Length"
                feetKey="lengthFeet"
                inchesKey="lengthInches"
                unit={lengthUnit}
                setUnit={setLengthUnit}
              />

              <MeasurementField
                label="Width"
                feetKey="widthFeet"
                inchesKey="widthInches"
                unit={widthUnit}
                setUnit={setWidthUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Rectangle */}
          {values.shape === "Rectangle" && (
            <>
              <MeasurementField
                label="Length"
                feetKey="lengthFeet"
                inchesKey="lengthInches"
                unit={lengthUnit}
                setUnit={setLengthUnit}
              />

              <MeasurementField
                label="Width"
                feetKey="widthFeet"
                inchesKey="widthInches"
                unit={widthUnit}
                setUnit={setWidthUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Square */}
          {values.shape === "Square" && (
            <>
              <MeasurementField
                label="Side Length"
                feetKey="lengthFeet"
                inchesKey="lengthInches"
                unit={lengthUnit}
                setUnit={setLengthUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Wall with Window */}
          {values.shape ===
            "Wall with Window" && (
            <>
              <MeasurementField
                label="Wall Width"
                feetKey="widthFeet"
                inchesKey="widthInches"
                unit={widthUnit}
                setUnit={setWidthUnit}
              />

              <MeasurementField
                label="Wall Height"
                feetKey="heightFeet"
                inchesKey="heightInches"
                unit={heightUnit}
                setUnit={setHeightUnit}
              />

              <MeasurementField
                label="Window Width"
                feetKey="windowWidthFeet"
                inchesKey="windowWidthInches"
                unit={windowWidthUnit}
                setUnit={setWindowWidthUnit}
              />

              <MeasurementField
                label="Window Height"
                feetKey="windowHeightFeet"
                inchesKey="windowHeightInches"
                unit={windowHeightUnit}
                setUnit={setWindowHeightUnit}
              />

              {simpleInput(
                "Window Quantity",
                "windowQuantity"
              )}

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Cathedral Wall */}
          {values.shape ===
            "Cathedral Wall" && (
            <>
              <MeasurementField
                label="Wall Width"
                feetKey="widthFeet"
                inchesKey="widthInches"
                unit={widthUnit}
                setUnit={setWidthUnit}
              />

              <MeasurementField
                label="Height 1"
                feetKey="heightFeet"
                inchesKey="heightInches"
                unit={heightUnit}
                setUnit={setHeightUnit}
              />

              <MeasurementField
                label="Height 2"
                feetKey="sideAFeet"
                inchesKey="sideAInches"
                unit={sideAUnit}
                setUnit={setSideAUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Rectangle Border */}
          {values.shape ===
            "Rectangle Border" && (
            <>
              <MeasurementField
                label="Inner Length"
                feetKey="lengthFeet"
                inchesKey="lengthInches"
                unit={lengthUnit}
                setUnit={setLengthUnit}
              />

              <MeasurementField
                label="Inner Width"
                feetKey="widthFeet"
                inchesKey="widthInches"
                unit={widthUnit}
                setUnit={setWidthUnit}
              />

              <MeasurementField
                label="Border Width"
                feetKey="borderFeet"
                inchesKey="borderInches"
                unit={borderUnit}
                setUnit={setBorderUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Circle */}
          {values.shape === "Circle" && (
            <>
              <MeasurementField
                label="Diameter"
                feetKey="lengthFeet"
                inchesKey="lengthInches"
                unit={lengthUnit}
                setUnit={setLengthUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Circle Border */}
          {values.shape ===
            "Circle Border" && (
            <>
              <MeasurementField
                label="Inner Diameter"
                feetKey="lengthFeet"
                inchesKey="lengthInches"
                unit={lengthUnit}
                setUnit={setLengthUnit}
              />

              <MeasurementField
                label="Border Width"
                feetKey="borderFeet"
                inchesKey="borderInches"
                unit={borderUnit}
                setUnit={setBorderUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Annulus */}
          {values.shape === "Annulus" && (
            <>
              <MeasurementField
                label="Outer Diameter"
                feetKey="lengthFeet"
                inchesKey="lengthInches"
                unit={lengthUnit}
                setUnit={setLengthUnit}
              />

              <MeasurementField
                label="Inner Diameter"
                feetKey="widthFeet"
                inchesKey="widthInches"
                unit={widthUnit}
                setUnit={setWidthUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Triangle */}
          {values.shape === "Triangle" && (
            <>
              <MeasurementField
                label="Side A"
                feetKey="sideAFeet"
                inchesKey="sideAInches"
                unit={sideAUnit}
                setUnit={setSideAUnit}
              />

              <MeasurementField
                label="Side B"
                feetKey="sideBFeet"
                inchesKey="sideBInches"
                unit={sideBUnit}
                setUnit={setSideBUnit}
              />

              <MeasurementField
                label="Side C"
                feetKey="sideCFeet"
                inchesKey="sideCInches"
                unit={sideCUnit}
                setUnit={setSideCUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Triangle Base Height */}
          {values.shape ===
            "Triangle 1/2 b×h" && (
            <>
              <MeasurementField
                label="Base"
                feetKey="lengthFeet"
                inchesKey="lengthInches"
                unit={lengthUnit}
                setUnit={setLengthUnit}
              />

              <MeasurementField
                label="Height"
                feetKey="heightFeet"
                inchesKey="heightInches"
                unit={heightUnit}
                setUnit={setHeightUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Trapezoid */}
          {values.shape === "Trapezoid" && (
            <>
              <MeasurementField
                label="Side A"
                feetKey="sideAFeet"
                inchesKey="sideAInches"
                unit={sideAUnit}
                setUnit={setSideAUnit}
              />

              <MeasurementField
                label="Side B"
                feetKey="sideBFeet"
                inchesKey="sideBInches"
                unit={sideBUnit}
                setUnit={setSideBUnit}
              />

              <MeasurementField
                label="Height"
                feetKey="heightFeet"
                inchesKey="heightInches"
                unit={heightUnit}
                setUnit={setHeightUnit}
              />

              {simpleInput(
                "Quantity",
                "quantity"
              )}
            </>
          )}

          {/* Waste */}
          <fieldset className="mt-4 border border-slate-400 px-3 pb-3 pt-1">
            <legend className="px-1 text-sm italic text-slate-600">
              optional material waste factor
            </legend>

            <div className="flex items-center justify-center gap-2">
              <span className="text-sm italic text-slate-600">
                Add an extra
              </span>

              <input
                type="number"
                min="0"
                step="any"
                value={values.waste}
                onChange={(e) =>
                  update(
                    "waste",
                    e.target.value
                  )
                }
                className="h-9 w-20 border border-slate-500 bg-white px-2 text-center text-sm"
              />

              <span className="text-sm text-slate-600">
                %
              </span>
            </div>
          </fieldset>

          {/* Cost */}
          <fieldset className="mt-4 border border-slate-400 px-3 pb-3 pt-1">
            <legend className="px-1 text-sm italic text-slate-600">
              optional material cost
            </legend>

            <div className="grid grid-cols-[82px_1fr_90px] items-end gap-2">
              {/* Currency */}
              <div>
                <label className="mb-1 block text-xs text-slate-600">
                  currency
                </label>

                <select
                  value={currency}
                  onChange={(e) =>
                    setCurrency(e.target.value)
                  }
                  className="h-9 w-[82px] border border-slate-500 bg-white px-2 text-sm text-slate-900 outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"
                  aria-label="Currency"
                >
                  {currencies.map((item) => (
                    <option
                      key={item.code}
                      value={item.code}
                    >
                      {item.symbol}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="mb-1 block text-xs text-slate-600">
                  price
                </label>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={values.price}
                  onChange={(e) =>
                    update(
                      "price",
                      e.target.value
                    )
                  }
                  className={inputClass()}
                />
              </div>

              {/* Square Unit */}
              <div>
                <label className="mb-1 block text-xs text-slate-600">
                  square unit
                </label>

                <select
                  value={priceUnit}
                  onChange={(e) =>
                    setPriceUnit(
                      e.target.value as AreaPriceUnit
                    )
                  }
                  className={selectClass()}
                >
                  <option value="square feet">
                    sq ft
                  </option>

                  <option value="square inches">
                    sq in
                  </option>

                  <option value="square yards">
                    sq yd
                  </option>

                  <option value="square meters">
                    sq m
                  </option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={clear}
              className="h-9 border border-slate-500 bg-white px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={calculate}
              className="h-9 border border-slate-700 bg-slate-200 px-4 text-sm font-semibold text-slate-900 hover:bg-slate-300"
            >
              Calculate
            </button>
          </div>

          {/* Result */}
          <div id="calculator-answer">
            <ResultBox
              result={result}
              error={error}
            />
          </div>
        </div>
      </div>

      {/* Reference-style explanation */}
      <div className="mt-4 text-sm text-slate-800">
        <h2 className="mb-2 text-lg font-bold">
          {values.shape} Area
        </h2>

        <p className="mb-3">
          Calculate the square footage, square
          inches, square yards, square meters and
          acres for your construction project.
        </p>

        <div className="border border-slate-300 bg-white p-3">
          <strong>Use the Calculator</strong>

          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Select your shape.</li>

            <li>
              Enter your measurements and units.
            </li>

            <li>
              Enter quantity if you have multiple
              identical areas.
            </li>

            <li>
              Add optional material waste.
            </li>

            <li>
              Add optional material cost.
            </li>

            <li>
              Click Calculate to see the results.
            </li>
          </ol>
        </div>

        <div className="mt-3 border border-slate-300 bg-white p-3">
          <strong>Formula</strong>

          <p className="mt-2">
            {values.shape === "Square" &&
              "Area = Side × Side"}

            {values.shape === "Rectangle" &&
              "Area = Length × Width"}

            {values.shape === "Room" &&
              "Area = Length × Width"}

            {values.shape === "Known Area" &&
              "Area = Known Square Feet"}

            {values.shape ===
              "Rectangle Border" &&
              "Area = Outer Rectangle − Inner Rectangle"}

            {values.shape ===
              "Wall with Window" &&
              "Area = Wall Area − Window Area"}

            {values.shape ===
              "Cathedral Wall" &&
              "Area = Width × (Height 1 + Height 2) ÷ 2"}

            {values.shape === "Circle" &&
              "Area = π × (Diameter ÷ 2)²"}

            {values.shape ===
              "Circle Border" &&
              "Area = Outer Circle − Inner Circle"}

            {values.shape === "Annulus" &&
              "Area = Outer Circle − Inner Circle"}

            {values.shape === "Triangle" &&
              "Heron's Formula"}

            {values.shape ===
              "Triangle 1/2 b×h" &&
              "Area = ½ × Base × Height"}

            {values.shape === "Trapezoid" &&
              "Area = ½ × (Side A + Side B) × Height"}
          </p>
        </div>
      </div>
    </div>
  );
}
