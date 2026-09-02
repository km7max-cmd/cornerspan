"use client";

import { useState } from "react";

import PaintInputs from "./components/PaintInputs";
import PaintResults from "./components/PaintResults";
import { calculatePaint } from "./utils/calculations";

type CurrencyCode =
  | "USD"
  | "INR"
  | "EUR"
  | "GBP"
  | "AED"
  | "AUD"
  | "CAD"
  | "JPY"
  | "SAR";

type UnitCode =
  | "ft"
  | "in"
  | "cm"
  | "m"
  | "yd"
  | "ft-in"
  | "m-cm";

export default function PaintCalculator() {
  const [jobType, setJobType] = useState("room");

  const [unit, setUnit] = useState<UnitCode>("ft");

  const [currency, setCurrency] =
    useState<CurrencyCode>("USD");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [lengthSecondary, setLengthSecondary] =
    useState("");

  const [widthSecondary, setWidthSecondary] =
    useState("");

  const [heightSecondary, setHeightSecondary] =
    useState("");

  const [doors, setDoors] = useState("0");
  const [windows, setWindows] = useState("0");

  const [coats, setCoats] = useState("2");

  const [coverage, setCoverage] =
    useState("350");

  const [price, setPrice] =
    useState("45");

  const [laborPrice, setLaborPrice] =
    useState("0");

  const [result, setResult] =
    useState<ReturnType<typeof calculatePaint> | null>(
      null
    );

  const currencySymbol =
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    })
      .formatToParts(0)
      .find(
        (part) => part.type === "currency"
      )
      ?.value ?? currency;

  function handleCalculate() {
    const l = Number(length) || 0;
    const w = Number(width) || 0;
    const h = Number(height) || 0;

    const mixedUnit =
      unit === "ft-in" ||
      unit === "m-cm";

    const hasLength =
      mixedUnit
        ? l > 0 || Number(lengthSecondary) > 0
        : l > 0;

    const hasWidth =
      mixedUnit
        ? w > 0 || Number(widthSecondary) > 0
        : w > 0;

    const hasHeight =
      mixedUnit
        ? h > 0 || Number(heightSecondary) > 0
        : h > 0;

    if (
      !hasLength ||
      !hasWidth ||
      !hasHeight
    ) {
      setResult(null);
      return;
    }

    const calculated = calculatePaint({
      jobType: jobType as
        | "room"
        | "walls"
        | "ceiling",

      length: l,
      width: w,
      height: h,

      lengthSecondary:
        Number(lengthSecondary) || 0,

      widthSecondary:
        Number(widthSecondary) || 0,

      heightSecondary:
        Number(heightSecondary) || 0,

      doors: Math.max(
        0,
        Number(doors) || 0
      ),

      windows: Math.max(
        0,
        Number(windows) || 0
      ),

      coats: Math.max(
        1,
        Number(coats) || 1
      ),

      coverage: Math.max(
        0.01,
        Number(coverage) || 0
      ),

      pricePerUnit: Math.max(
        0,
        Number(price) || 0
      ),

      laborPricePerArea: Math.max(
        0,
        Number(laborPrice) || 0
      ),

      unit,
    });

    setResult(calculated);
  }

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <PaintInputs
        jobType={jobType}
        setJobType={setJobType}

        unit={unit}
        setUnit={(value) =>
          setUnit(value as UnitCode)
        }

        currency={currency}
        setCurrency={setCurrency}
        currencySymbol={currencySymbol}

        length={length}
        setLength={setLength}

        width={width}
        setWidth={setWidth}

        height={height}
        setHeight={setHeight}

        lengthSecondary={lengthSecondary}
        setLengthSecondary={
          setLengthSecondary
        }

        widthSecondary={widthSecondary}
        setWidthSecondary={
          setWidthSecondary
        }

        heightSecondary={heightSecondary}
        setHeightSecondary={
          setHeightSecondary
        }

        doors={doors}
        setDoors={setDoors}

        windows={windows}
        setWindows={setWindows}

        coats={coats}
        setCoats={setCoats}

        coverage={coverage}
        setCoverage={setCoverage}

        price={price}
        setPrice={setPrice}

        laborPrice={laborPrice}
        setLaborPrice={setLaborPrice}
      />

      <button
        type="button"
        onClick={handleCalculate}
        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
      >
        ✨ Generate Paint Estimate
      </button>

      <PaintResults
        result={result}
        currency={currency}
        currencySymbol={currencySymbol}
      />
    </section>
  );
}
