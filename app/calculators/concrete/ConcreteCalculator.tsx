"use client";

import { useEffect, useState } from "react";

import CalculatorHero from "../../components/CalculatorHero";
import CalculatorForm from "./components/CalculatorForm";
import ResultCard from "./components/ResultCard";
import Formula from "./components/Formula";
import FAQ from "./components/FAQ";
import RelatedCalculators from "./components/RelatedCalculators";
import Example from "./components/Example";
import History from "./components/History";
import AboutCalculator from "./components/AboutCalculator";
import { calculateConcrete, Unit } from "./utils/calculateConcrete";
import { jsPDF } from "jspdf";
import Toast from "../../components/Toast";

export default function ConcreteCalculator() {
  // --------------------------------------------------
  // Dimensions
  // --------------------------------------------------

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [quantity, setQuantity] = useState("1");

  // --------------------------------------------------
  // Separate units for each dimension
  // --------------------------------------------------

  const [lengthUnit, setLengthUnit] = useState<Unit>("Meter");
  const [widthUnit, setWidthUnit] = useState<Unit>("Meter");
  const [depthUnit, setDepthUnit] = useState<Unit>("Meter");

  // --------------------------------------------------
  // Currency
  // --------------------------------------------------

  const [currency, setCurrency] = useState("USD");

  // --------------------------------------------------
  // Material prices
  // Prices are entered in selected currency
  // --------------------------------------------------

  const [cementPrice, setCementPrice] = useState("450");
  const [sandPrice, setSandPrice] = useState("1800");
  const [aggregatePrice, setAggregatePrice] = useState("1400");
  const [cementUnit, setCementUnit] = useState("Bag");
  const [sandUnit, setSandUnit] = useState("m³");
  const [aggregateUnit, setAggregateUnit] = useState("m³");
  // --------------------------------------------------
  // Error
  // --------------------------------------------------

  const [error, setError] = useState("");

  // --------------------------------------------------
  // Result
  // --------------------------------------------------

  const [result, setResult] = useState({
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
});

  // --------------------------------------------------
  // History
  // --------------------------------------------------

  const [history, setHistory] = useState<
    {
      length: number;
      width: number;
      depth: number;
      volume: number;
    }[]
  >([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("concrete-history");

    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  // --------------------------------------------------
  // Toast
  // --------------------------------------------------

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] =
    useState<"success" | "error">("success");

  useEffect(() => {
    if (!showToast) return;

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2000);

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

  // --------------------------------------------------
  // Calculate
  // --------------------------------------------------

  const handleCalculate = () => {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);
    const q = Number(quantity);

    // Required fields
    if (!length || !width || !depth) {
      setError("Please fill in all fields.");

      setResult({
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
});

      showNotification(
        "Please fill in all fields.",
        "error"
      );

      return;
    }

    // Dimensions must be positive
    if (l <= 0 || w <= 0 || d <= 0) {
      setError("Values must be greater than zero.");

      setResult({
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
});

      showNotification(
        "Values must be greater than zero.",
        "error"
      );

      return;
    }

    // Quantity validation
    if (!Number.isFinite(q) || q <= 0) {
      setError("Quantity must be greater than 0.");

      setResult({
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
});

      showNotification(
        "Quantity must be greater than 0.",
        "error"
      );

      return;
    }

    // --------------------------------------------------
    // Material price validation
    // --------------------------------------------------

    const cement = Number(cementPrice);
    const sandRate = Number(sandPrice);
    const aggregateRate = Number(aggregatePrice);

    if (
      !Number.isFinite(cement) ||
      !Number.isFinite(sandRate) ||
      !Number.isFinite(aggregateRate) ||
      cement < 0 ||
      sandRate < 0 ||
      aggregateRate < 0
    ) {
      setError("Material prices cannot be negative.");

      setResult({
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
});

      showNotification(
        "Material prices cannot be negative.",
        "error"
      );

      return;
    }

    setError("");

    // --------------------------------------------------
    // Calculate concrete
    // Each dimension can have a different unit
    // --------------------------------------------------

    const output = calculateConcrete(
      l,
      w,
      d,
      lengthUnit,
      widthUnit,
      depthUnit
    );

    // Apply quantity
    output.volume *= q;
    output.dryVolume *= q;
    output.cementBags *= q;
    output.sand = +(output.sand * q).toFixed(2);
    output.aggregate = +(output.aggregate * q).toFixed(2);

    // --------------------------------------------------
    // Total material cost
    //
    // Prices are already in selected currency.
    // Therefore NO exchange-rate conversion here.
    // --------------------------------------------------

    const totalCost =
      output.cementBags * cement +
      output.sand * sandRate +
      output.aggregate * aggregateRate;

    // --------------------------------------------------
    // Save result
    // --------------------------------------------------
 
    setResult({
  volume: output.volume,
  dryVolume: output.dryVolume,

  totalVolume: output.totalVolume,
  wasteVolume: output.wasteVolume,

  cementVolume: output.cementVolume,
  cementWeight: output.cementWeight,
  cementBags: output.cementBags,

  sand: output.sand,
  aggregate: output.aggregate,
  water: output.water,

  totalCost,
});

    // --------------------------------------------------
    // Save history
    // --------------------------------------------------

    const newHistory = [
      {
        length: l,
        width: w,
        depth: d,
        volume: output.volume,
      },
      ...history,
    ].slice(0, 5);

    setHistory(newHistory);

    localStorage.setItem(
      "concrete-history",
      JSON.stringify(newHistory)
    );

    showNotification("Calculation completed successfully!");
  };

  // --------------------------------------------------
  // Copy
  // --------------------------------------------------

  const handleCopy = async () => {
    const text = `Concrete Calculator Result

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags} Bags
Sand            : ${result.sand.toFixed(2)} m³
Aggregate       : ${result.aggregate.toFixed(2)} m³
Total Cost      : ${result.totalCost.toFixed(2)} ${currency}`;

    try {
      await navigator.clipboard.writeText(text);

      showNotification(
        "Results copied successfully!"
      );
    } catch {
      showNotification(
        "Failed to copy results.",
        "error"
      );
    }
  };

  // --------------------------------------------------
  // Share
  // --------------------------------------------------

  const handleShare = async () => {
    const text = `Concrete Calculator Result

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags} Bags
Sand            : ${result.sand.toFixed(2)} m³
Aggregate       : ${result.aggregate.toFixed(2)} m³
Total Cost      : ${result.totalCost.toFixed(2)} ${currency}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Concrete Calculator Result",
          text,
        });

        showNotification(
          "Results shared successfully!"
        );
      } else {
        showNotification(
          "Sharing is not supported.",
          "error"
        );
      }
    } catch {
      // User cancelled share
    }
  };

  // --------------------------------------------------
  // PDF
  // --------------------------------------------------

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(
      "Concrete Calculator Result",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Concrete Volume : ${result.volume.toFixed(2)} m3`,
      20,
      40
    );

    doc.text(
      `Dry Volume      : ${result.dryVolume.toFixed(2)} m3`,
      20,
      50
    );

    doc.text(
      `Cement Bags     : ${result.cementBags} Bags`,
      20,
      60
    );

    doc.text(
      `Sand            : ${result.sand.toFixed(2)} m3`,
      20,
      70
    );

    doc.text(
      `Aggregate       : ${result.aggregate.toFixed(2)} m3`,
      20,
      80
    );

    doc.text(
      `Total Cost      : ${result.totalCost.toFixed(2)} ${currency}`,
      20,
      90
    );

    doc.save(
      "Concrete-Calculation.pdf"
    );

    showNotification(
      "PDF downloaded successfully!"
    );
  };

  // --------------------------------------------------
  // Clear History
  // --------------------------------------------------

  const handleClearHistory = () => {
    setHistory([]);

    localStorage.removeItem(
      "concrete-history"
    );

    showNotification(
      "History cleared successfully!"
    );
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-10">

          <CalculatorHero
            title="Concrete"
            highlight="Calculator"
            description="Calculate concrete volume, cement bags, sand, aggregate, and material cost accurately."
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

              cementPrice={cementPrice}
              sandPrice={sandPrice}
              aggregatePrice={aggregatePrice}

              currency={currency}
              setCurrency={setCurrency}

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
              setAggregatePrice={
                setAggregatePrice
              }

              onCalculate={handleCalculate}
            />

            <ResultCard
              volume={result.volume}
              dryVolume={result.dryVolume}
              bags={result.cementBags}
              sand={result.sand}
              aggregate={result.aggregate}
              totalCost={result.totalCost}
              currency={currency}
              onCopy={handleCopy}
              onShare={handleShare}
              onDownload={
                handleDownloadPDF
              }
            />

          </div>

          {/* Related Calculators */}
          <div className="mt-6">
            <RelatedCalculators />
          </div>

          {/* Formula */}
          <div className="mt-6">
            <Formula />
          </div>

          {/* Example */}
          <div className="mt-6">
            <Example />
          </div>

          {/* FAQ */}
          <div className="mt-6">
            <FAQ />
          </div>

          {/* About */}
          <div className="mt-6">
            <AboutCalculator />
          </div>

          {/* History */}
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
