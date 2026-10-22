
"use client";

import { useEffect, useState } from "react";

import CalculatorHero from "../../components/CalculatorHero";
import CalculatorForm from "./components/CalculatorForm";
import ResultCard from "./components/ResultCard";
import Formula from "./components/Formula";
import FAQ from "./components/FAQ";
import Example from "./components/Example";
import History from "./components/History";
import AboutCalculator from "./components/AboutCalculator";
import { calculateConcrete, Unit } from "./utils/calculateConcrete";
import { jsPDF } from "jspdf";
import Toast from "../../components/Toast";
import { addGlobalHistory } from "../../components/GlobalHistory";

type CurrencyCode =
  | "USD"
  | "INR"
  | "EUR"
  | "GBP"
  | "AED"
  | "AUD"
  | "CAD";

type MixRatio = {
  cement: number;
  sand: number;
  aggregate: number;
};

type HistoryItem = {
  length: number;
  width: number;
  depth: number;
  volume: number;
};

type CalculationResult = {
  volume: number;
  dryVolume: number;
  totalVolume: number;
  wasteVolume: number;
  cementVolume: number;
  cementWeight: number;
  cementBags: number;
  sand: number;
  aggregate: number;
  water: number;
  totalCost: number;
};

const ZERO_RESULT: CalculationResult = {
  volume: 0,
  dryVolume: 0,
  totalVolume: 0,
  wasteVolume: 0,
  cementVolume: 0,
  cementWeight: 0,
  cementBags: 0,
  sand: 0,
  aggregate: 0,
  water: 0,
  totalCost: 0,
};

const CURRENCY_NAMES: Record<CurrencyCode, string> = {
  USD: "US Dollar",
  INR: "Indian Rupee",
  EUR: "Euro",
  GBP: "British Pound",
  AED: "UAE Dirham",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  AED: "AED ",
  AUD: "A$",
  CAD: "C$",
};

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function convertMaterialQuantity(
  quantityM3: number,
  unit: string,
  densityKgPerM3: number
): number {
  if (!Number.isFinite(quantityM3) || quantityM3 <= 0) {
    return 0;
  }

  if (!Number.isFinite(densityKgPerM3) || densityKgPerM3 <= 0) {
    return 0;
  }

  switch (unit) {
    case "m³":
      return quantityM3;
    case "yd³":
      return quantityM3 * 1.30795062;
    case "tonne":
      return (quantityM3 * densityKgPerM3) / 1000;
    case "US ton":
      return (quantityM3 * densityKgPerM3) / 907.18474;
    default:
      return quantityM3;
  }
}

function calculateCementCost(
  cementWeightKg: number,
  cementBags: number,
  price: number,
  unit: string
): number {
  if (!Number.isFinite(price) || price < 0) {
    return 0;
  }

  switch (unit) {
    case "Bag":
      // Price is per full 50 kg bag.
      return cementBags * price;
    case "kg":
      return cementWeightKg * price;
    case "tonne":
      return (cementWeightKg / 1000) * price;
    case "US ton":
      return (cementWeightKg / 907.18474) * price;
    default:
      return 0;
  }
}

export default function ConcreteCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [quantity, setQuantity] = useState("1");

  const [lengthUnit, setLengthUnit] = useState<Unit>("Feet");
  const [widthUnit, setWidthUnit] = useState<Unit>("Feet");
  const [depthUnit, setDepthUnit] = useState<Unit>("Inch");

  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const [cementPrice, setCementPrice] = useState("");
  const [sandPrice, setSandPrice] = useState("");
  const [aggregatePrice, setAggregatePrice] = useState("");

  const [cementUnit, setCementUnit] = useState("Bag");
  const [sandUnit, setSandUnit] = useState("m³");
  const [aggregateUnit, setAggregateUnit] = useState("m³");

  const [sandDensity, setSandDensity] = useState("1600");
  const [aggregateDensity, setAggregateDensity] = useState("1500");

  const [error, setError] = useState("");
  const [result, setResult] = useState<CalculationResult>(ZERO_RESULT);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("concrete-history");

    if (!savedHistory) return;

    try {
      const parsed: unknown = JSON.parse(savedHistory);
      if (Array.isArray(parsed)) {
        setHistory(parsed as HistoryItem[]);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => setShowToast(false), 2500);
    return () => clearTimeout(timer);
  }, [showToast]);

  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleCalculate = (mixRatio: MixRatio) => {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);
    const q = Number(quantity);

    if (!length.trim() || !width.trim() || !depth.trim()) {
      setError("Please fill in all dimension fields.");
      setResult(ZERO_RESULT);
      showNotification("Please fill in all dimension fields.", "error");
      return;
    }

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(d) ||
      l <= 0 ||
      w <= 0 ||
      d <= 0
    ) {
      setError("Length, Width and Depth must be greater than zero.");
      setResult(ZERO_RESULT);
      showNotification("Dimension values must be greater than zero.", "error");
      return;
    }

    if (!Number.isFinite(q) || q <= 0) {
      setError("Quantity must be greater than zero.");
      setResult(ZERO_RESULT);
      showNotification("Quantity must be greater than zero.", "error");
      return;
    }

    if (
      !mixRatio ||
      !Number.isFinite(mixRatio.cement) ||
      !Number.isFinite(mixRatio.sand) ||
      !Number.isFinite(mixRatio.aggregate) ||
      mixRatio.cement <= 0 ||
      mixRatio.sand <= 0 ||
      mixRatio.aggregate <= 0
    ) {
      setError("Please enter a valid concrete mix ratio.");
      setResult(ZERO_RESULT);
      showNotification("Invalid concrete mix ratio.", "error");
      return;
    }

    const hasAnyPrice =
      cementPrice.trim() !== "" ||
      sandPrice.trim() !== "" ||
      aggregatePrice.trim() !== "";

    const cementRate = toNumber(cementPrice);
    const sandRate = toNumber(sandPrice);
    const aggregateRate = toNumber(aggregatePrice);

    if (
      hasAnyPrice &&
      (
        (cementPrice.trim() !== "" && cementRate < 0) ||
        (sandPrice.trim() !== "" && sandRate < 0) ||
        (aggregatePrice.trim() !== "" && aggregateRate < 0)
      )
    ) {
      setError("Material prices cannot be negative.");
      setResult(ZERO_RESULT);
      showNotification("Material prices cannot be negative.", "error");
      return;
    }

    const sandDensityValue = Number(sandDensity);
    const aggregateDensityValue = Number(aggregateDensity);

    if (!Number.isFinite(sandDensityValue) || sandDensityValue <= 0) {
      setError("Please select a valid sand density.");
      setResult(ZERO_RESULT);
      showNotification("Invalid sand density.", "error");
      return;
    }

    if (
      !Number.isFinite(aggregateDensityValue) ||
      aggregateDensityValue <= 0
    ) {
      setError("Please select a valid aggregate density.");
      setResult(ZERO_RESULT);
      showNotification("Invalid aggregate density.", "error");
      return;
    }

    setError("");

    const output = calculateConcrete(
      l,
      w,
      d,
      lengthUnit,
      widthUnit,
      depthUnit,
      mixRatio
    );

    output.volume *= q;
    output.dryVolume *= q;
    output.totalVolume *= q;
    output.wasteVolume *= q;
    output.cementVolume *= q;
    output.cementWeight *= q;
    output.cementBags *= q;

    output.sand = Number((output.sand * q).toFixed(3));
    output.aggregate = Number((output.aggregate * q).toFixed(3));
    output.water = Number((output.water * q).toFixed(1));

    // Material cost is calculated using the selected price units.
    let totalCost = 0;

    if (cementPrice.trim() !== "" && cementRate > 0) {
      totalCost += calculateCementCost(
        output.cementWeight,
        Math.ceil(output.cementBags),
        cementRate,
        cementUnit
      );
    }

    if (sandPrice.trim() !== "" && sandRate > 0) {
      const sandQuantity = convertMaterialQuantity(
        output.sand,
        sandUnit,
        sandDensityValue
      );
      totalCost += sandQuantity * sandRate;
    }

    if (aggregatePrice.trim() !== "" && aggregateRate > 0) {
      const aggregateQuantity = convertMaterialQuantity(
        output.aggregate,
        aggregateUnit,
        aggregateDensityValue
      );
      totalCost += aggregateQuantity * aggregateRate;
    }

    totalCost = Number(totalCost.toFixed(2));

    setResult({
      volume: Number(output.volume.toFixed(3)),
      dryVolume: Number(output.dryVolume.toFixed(3)),
      totalVolume: Number(output.totalVolume.toFixed(3)),
      wasteVolume: Number(output.wasteVolume.toFixed(3)),
      cementVolume: Number(output.cementVolume.toFixed(3)),
      cementWeight: Number(output.cementWeight.toFixed(1)),
      cementBags: Math.ceil(output.cementBags),
      sand: Number(output.sand.toFixed(3)),
      aggregate: Number(output.aggregate.toFixed(3)),
      water: Number(output.water.toFixed(1)),
      totalCost,
    });

    const calculatedVolume = Number(output.volume.toFixed(3));

    const newHistory: HistoryItem[] = [
      {
        length: l,
        width: w,
        depth: d,
        volume: calculatedVolume,
      },
      ...history,
    ].slice(0, 5);

    setHistory(newHistory);
    localStorage.setItem("concrete-history", JSON.stringify(newHistory));

    addGlobalHistory(
      "Concrete Calculator",
      `${l} × ${w} × ${d}`,
      `${calculatedVolume.toFixed(2)} m³`
    );

    if (!hasAnyPrice) {
      showNotification(
        "Calculation completed. Enter local material prices to calculate cost."
      );
    } else {
      showNotification("Calculation completed successfully!");
    }
  };

  const buildResultText = () => {
    const symbol = CURRENCY_SYMBOLS[currency];

    return `Concrete Calculator Result

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags} Bags
Sand            : ${result.sand.toFixed(2)} m³
Aggregate       : ${result.aggregate.toFixed(2)} m³
Water           : ${result.water.toFixed(0)} L
Material Cost   : ${
      result.totalCost > 0
        ? `${symbol}${result.totalCost.toFixed(2)}`
        : "Not available"
    }
Currency        : ${currency}`;
  };

  const handleCopy = async () => {
    if (result.volume <= 0) return;

    try {
      await navigator.clipboard.writeText(buildResultText());
      showNotification("Results copied successfully!");
    } catch {
      showNotification("Failed to copy results.", "error");
    }
  };

  const handleShare = async () => {
    if (result.volume <= 0) return;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "Concrete Calculator Result",
          text: buildResultText(),
        });
        showNotification("Results shared successfully!");
      } else {
        showNotification(
          "Sharing is not supported on this device.",
          "error"
        );
      }
    } catch {
      // Sharing was cancelled by the user.
    }
  };

  const handleDownloadPDF = () => {
    if (result.volume <= 0) return;

    const doc = new jsPDF();
    const symbol = CURRENCY_SYMBOLS[currency];

    doc.setFontSize(20);
    doc.text("Concrete Calculator Result", 20, 20);

    doc.setFontSize(12);
    doc.text(
      `Currency : ${CURRENCY_NAMES[currency]} (${currency})`,
      20,
      35
    );
    doc.text(`Concrete Volume : ${result.volume.toFixed(2)} m3`, 20, 50);
    doc.text(`Dry Volume      : ${result.dryVolume.toFixed(2)} m3`, 20, 60);
    doc.text(`Cement Bags     : ${result.cementBags} Bags`, 20, 70);
    doc.text(`Sand            : ${result.sand.toFixed(2)} m3`, 20, 80);
    doc.text(`Aggregate       : ${result.aggregate.toFixed(2)} m3`, 20, 90);
    doc.text(`Water           : ${result.water.toFixed(0)} L`, 20, 100);
    doc.text(
      `Material Cost   : ${
        result.totalCost > 0
          ? `${symbol}${result.totalCost.toFixed(2)}`
          : "Not available"
      }`,
      20,
      110
    );

    doc.save("Concrete-Calculation.pdf");
    showNotification("PDF downloaded successfully!");
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("concrete-history");
    showNotification("History cleared successfully!");
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <CalculatorHero
            title="Concrete"
            highlight="Calculator"
            description="Calculate concrete volume, cement bags, sand, aggregate, water, and material cost."
          />

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <CalculatorForm
              length={length}
              width={width}
              depth={depth}
              quantity={quantity}
              cementUnit={cementUnit}
              sandUnit={sandUnit}
              aggregateUnit={aggregateUnit}
              sandDensity={sandDensity}
              aggregateDensity={aggregateDensity}
              setSandDensity={setSandDensity}
              setAggregateDensity={setAggregateDensity}
              cementPrice={cementPrice}
              sandPrice={sandPrice}
              aggregatePrice={aggregatePrice}
              currency={currency}
              setCurrency={(value) => setCurrency(value as CurrencyCode)}
              lengthUnit={lengthUnit}
              widthUnit={widthUnit}
              depthUnit={depthUnit}
              setLengthUnit={setLengthUnit}
              setWidthUnit={setWidthUnit}
              setDepthUnit={setDepthUnit}
              setCementUnit={setCementUnit}
              setSandUnit={setSandUnit}
              setAggregateUnit={setAggregateUnit}
              error={error}
              setLength={setLength}
              setWidth={setWidth}
              setDepth={setDepth}
              setQuantity={setQuantity}
              setCementPrice={setCementPrice}
              setSandPrice={setSandPrice}
              setAggregatePrice={setAggregatePrice}
              onCalculate={handleCalculate}
            />

            <ResultCard
              volume={result.volume}
              dryVolume={result.dryVolume}
              cementBags={result.cementBags}
              water={result.water}
              sand={result.sand}
              aggregate={result.aggregate}
              totalCost={result.totalCost}
              currency={currency}
              hasMaterialPrices={
                cementPrice.trim() !== "" &&
                sandPrice.trim() !== "" &&
                aggregatePrice.trim() !== ""
              }
              onCopy={handleCopy}
              onShare={handleShare}
              onDownload={handleDownloadPDF}
            />
          </div>

          <div className="mt-6">
            <Formula />
          </div>

          <div className="mt-6">
            <Example />
          </div>

          <div className="mt-6">
            <FAQ />
          </div>

          <div className="mt-6">
            <AboutCalculator />
          </div>

          <History history={history} onClear={handleClearHistory} />
        </div>
      </main>

      <Toast show={showToast} message={toastMessage} type={toastType} />
    </>
  );
}
