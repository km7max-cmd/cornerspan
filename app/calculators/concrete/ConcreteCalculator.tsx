
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

const KG_PER_US_TON = 907.18474;
const KG_PER_LB = 0.45359237;
const M3_PER_YD3 = 0.764554857984;
const FT3_PER_M3 = 35.3146667;

function toNumber(value: string): number {
  if (!value.trim()) return 0;

  const number = Number(value);
  return Number.isFinite(number) ? number : Number.NaN;
}

function convertMaterialQuantity(
  quantityM3: number,
  unit: string,
  densityKgPerM3: number
): number {
  if (
    !Number.isFinite(quantityM3) ||
    quantityM3 < 0 ||
    !Number.isFinite(densityKgPerM3) ||
    densityKgPerM3 <= 0
  ) {
    return 0;
  }

  const weightKg = quantityM3 * densityKgPerM3;

  switch (unit) {
    case "m³":
      return quantityM3;

    case "yd³":
      return quantityM3 / M3_PER_YD3;

    case "ft³":
      return quantityM3 * FT3_PER_M3;

    case "kg":
      return weightKg;

    case "lb":
      return weightKg / KG_PER_LB;

    case "tonne":
      return weightKg / 1000;

    case "ton":
    case "US ton":
      return weightKg / KG_PER_US_TON;

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
  if (
    !Number.isFinite(price) ||
    price < 0 ||
    !Number.isFinite(cementWeightKg) ||
    cementWeightKg < 0
  ) {
    return 0;
  }

  switch (unit) {
    case "Bag":
    case "bag":
      // US cement bag: 94 lb.
      return Math.ceil(cementBags) * price;

    case "lb":
      return (cementWeightKg / KG_PER_LB) * price;

    case "kg":
      return cementWeightKg * price;

    case "tonne":
      return (cementWeightKg / 1000) * price;

    case "ton":
    case "US ton":
      return (cementWeightKg / KG_PER_US_TON) * price;

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
  const [sandUnit, setSandUnit] = useState("yd³");
  const [aggregateUnit, setAggregateUnit] = useState("yd³");

  const [sandDensity, setSandDensity] = useState("1600");
  const [aggregateDensity, setAggregateDensity] = useState("1500");

  const [error, setError] = useState("");
  const [result, setResult] =
    useState<CalculationResult>(ZERO_RESULT);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] =
    useState<"success" | "error">("success");

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("concrete-history");

      if (!savedHistory) return;

      const parsed: unknown = JSON.parse(savedHistory);

      if (Array.isArray(parsed)) {
        setHistory(parsed as HistoryItem[]);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2500);

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
      showNotification(
        "Please fill in all dimension fields.",
        "error"
      );
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
      setError(
        "Length, width and depth must be greater than zero."
      );
      setResult(ZERO_RESULT);
      showNotification(
        "Dimension values must be greater than zero.",
        "error"
      );
      return;
    }

    if (!Number.isFinite(q) || q <= 0) {
      setError("Quantity must be greater than zero.");
      setResult(ZERO_RESULT);
      showNotification(
        "Quantity must be greater than zero.",
        "error"
      );
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

    const priceInputs = [
      cementPrice,
      sandPrice,
      aggregatePrice,
    ];

    const invalidPrice = priceInputs.some((value) => {
      if (!value.trim()) return false;

      const parsed = Number(value);

      return !Number.isFinite(parsed) || parsed < 0;
    });

    if (invalidPrice) {
      setError(
        "Material prices must be valid numbers and cannot be negative."
      );
      setResult(ZERO_RESULT);
      showNotification(
        "Enter valid non-negative material prices.",
        "error"
      );
      return;
    }

    const sandDensityValue = Number(sandDensity);
    const aggregateDensityValue = Number(aggregateDensity);

    if (
      !Number.isFinite(sandDensityValue) ||
      sandDensityValue <= 0
    ) {
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

    try {
      const output = calculateConcrete(
        l,
        w,
        d,
        lengthUnit,
        widthUnit,
        depthUnit,
        mixRatio
      );

      const volume = output.volume * q;
      const dryVolume = output.dryVolume * q;
      const totalVolume = output.totalVolume * q;
      const wasteVolume = output.wasteVolume * q;
      const cementVolume = output.cementVolume * q;
      const cementWeight = output.cementWeight * q;
      const cementBags = Math.ceil(
  (output.cementWeightLb * q) / 94
);
      const sand = output.sand * q;
      const aggregate = output.aggregate * q;

      // The result card expects water in litres.
      // One kg of mixing water is approximately one litre.
      const water = output.water * q;

      const cementRate = toNumber(cementPrice);
      const sandRate = toNumber(sandPrice);
      const aggregateRate = toNumber(aggregatePrice);

      let totalCost = 0;

      if (cementPrice.trim() !== "") {
        totalCost += calculateCementCost(
          cementWeight,
          cementBags,
          cementRate,
          cementUnit
        );
      }

      if (sandPrice.trim() !== "") {
        const sandQuantity = convertMaterialQuantity(
          sand,
          sandUnit,
          sandDensityValue
        );

        totalCost += sandQuantity * sandRate;
      }

      if (aggregatePrice.trim() !== "") {
        const aggregateQuantity = convertMaterialQuantity(
          aggregate,
          aggregateUnit,
          aggregateDensityValue
        );

        totalCost += aggregateQuantity * aggregateRate;
      }

      totalCost = Number(totalCost.toFixed(2));

      const nextResult: CalculationResult = {
        volume: Number(volume.toFixed(3)),
        dryVolume: Number(dryVolume.toFixed(3)),
        totalVolume: Number(totalVolume.toFixed(3)),
        wasteVolume: Number(wasteVolume.toFixed(3)),
        cementVolume: Number(cementVolume.toFixed(3)),
        cementWeight: Number(cementWeight.toFixed(1)),
        cementBags: Math.ceil(cementBags),
        sand: Number(sand.toFixed(3)),
        aggregate: Number(aggregate.toFixed(3)),
        water: Number(water.toFixed(1)),
        totalCost,
      };

      setResult(nextResult);

      const newHistory: HistoryItem[] = [
        {
          length: l,
          width: w,
          depth: d,
          volume: Number(volume.toFixed(3)),
        },
        ...history,
      ].slice(0, 5);

      setHistory(newHistory);

      try {
        localStorage.setItem(
          "concrete-history",
          JSON.stringify(newHistory)
        );
      } catch {
        // Calculation remains usable if browser storage is unavailable.
      }

      addGlobalHistory(
        "Concrete Calculator",
        `${l} × ${w} × ${d}`,
        `${volume.toFixed(2)} m³`
      );

      const hasAnyPrice = priceInputs.some(
        (value) => value.trim() !== ""
      );

      if (!hasAnyPrice) {
        showNotification(
          "Calculation completed. Enter material prices to estimate cost."
        );
      } else {
        showNotification("Calculation completed successfully!");
      }
    } catch {
      setError("Unable to calculate. Please check your inputs.");
      setResult(ZERO_RESULT);
      showNotification(
        "Unable to calculate. Please check your inputs.",
        "error"
      );
    }
  };

  const buildResultText = () => {
    const symbol = CURRENCY_SYMBOLS[currency];
    const volumeYd3 = result.volume / M3_PER_YD3;
    const volumeFt3 = result.volume * FT3_PER_M3;
    const dryVolumeYd3 = result.dryVolume / M3_PER_YD3;
    const sandYd3 = result.sand / M3_PER_YD3;
    const aggregateYd3 = result.aggregate / M3_PER_YD3;
    const waterGallons = result.water / 3.785411784;

    return `Concrete Calculator Result

Concrete Volume: ${volumeYd3.toFixed(2)} yd³
Concrete Volume: ${volumeFt3.toFixed(2)} ft³
Concrete Volume: ${result.volume.toFixed(3)} m³
Dry Volume: ${dryVolumeYd3.toFixed(2)} yd³
Cement: ${result.cementBags} bags (94 lb each)
Sand: ${sandYd3.toFixed(2)} yd³
Aggregate: ${aggregateYd3.toFixed(2)} yd³
Water: ${waterGallons.toFixed(2)} US gal
Material Cost: ${
      result.totalCost > 0
        ? `${symbol}${result.totalCost.toFixed(2)}`
        : "Not available"
    }
Currency: ${currency}`;
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
      // The user may cancel the share dialog.
    }
  };

  const handleDownloadPDF = () => {
    if (result.volume <= 0) return;

    const doc = new jsPDF();
    const symbol = CURRENCY_SYMBOLS[currency];

    const volumeYd3 = result.volume / M3_PER_YD3;
    const volumeFt3 = result.volume * FT3_PER_M3;
    const dryVolumeYd3 = result.dryVolume / M3_PER_YD3;
    const sandYd3 = result.sand / M3_PER_YD3;
    const aggregateYd3 = result.aggregate / M3_PER_YD3;
    const waterGallons = result.water / 3.785411784;

    doc.setFontSize(20);
    doc.text("Concrete Calculator Result", 20, 20);

    doc.setFontSize(11);

    const lines = [
      `Currency: ${CURRENCY_NAMES[currency]} (${currency})`,
      `Concrete Volume: ${volumeYd3.toFixed(2)} yd3`,
      `Concrete Volume: ${volumeFt3.toFixed(2)} ft3`,
      `Concrete Volume: ${result.volume.toFixed(3)} m3`,
      `Dry Volume: ${dryVolumeYd3.toFixed(2)} yd3`,
      `Cement: ${result.cementBags} bags (94 lb each)`,
      `Sand: ${sandYd3.toFixed(2)} yd3`,
      `Aggregate: ${aggregateYd3.toFixed(2)} yd3`,
      `Water: ${waterGallons.toFixed(2)} US gal`,
      `Material Cost: ${
        result.totalCost > 0
          ? `${symbol}${result.totalCost.toFixed(2)}`
          : "Not available"
      }`,
    ];

    let y = 38;

    lines.forEach((line) => {
      doc.text(line, 20, y);
      y += 10;
    });

    doc.save("Concrete-Calculation.pdf");
    showNotification("PDF downloaded successfully!");
  };

  const handleClearHistory = () => {
    setHistory([]);

    try {
      localStorage.removeItem("concrete-history");
    } catch {
      // Ignore storage errors.
    }

    showNotification("History cleared successfully!");
  };

  const hasMaterialPrices =
    cementPrice.trim() !== "" ||
    sandPrice.trim() !== "" ||
    aggregatePrice.trim() !== "";

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
        <div className="mx-auto w-full max-w-[1600px] px-2 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-10">
          <CalculatorHero
            title="Concrete"
            highlight="Calculator"
            description="Calculate concrete volume in cubic yards and cubic feet, estimate 94 lb cement bags, sand, aggregate, water, and material cost."
          />

          <div className="mt-4 grid w-full min-w-0 grid-cols-1 gap-5 lg:mt-6 lg:grid-cols-2 lg:gap-6">
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
              setCurrency={(value) =>
                setCurrency(value as CurrencyCode)
              }
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
              hasMaterialPrices={hasMaterialPrices}
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

          <History
            history={history}
            onClear={handleClearHistory}
          />
        </div>
      </main>

      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
      />
    </>
  );
}
