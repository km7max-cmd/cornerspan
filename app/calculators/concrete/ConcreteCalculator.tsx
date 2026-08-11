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

import { jsPDF } from "jspdf";
import Toast from "../../components/Toast";

type Unit = "Meter" | "Feet" | "Centimeter" | "Millimeter" | "Inch";

type ConcreteForm =
  | "Slab"
  | "Wall"
  | "Footer"
  | "Column"
  | "Curb, Gutter Barrier"
  | "Stairs";

export default function ConcreteCalculator() {
  // --------------------------------------------------
  // Concrete Form
  // --------------------------------------------------

  const [concreteForm, setConcreteForm] =
    useState<ConcreteForm>("Slab");

  // --------------------------------------------------
  // Dimensions
  // --------------------------------------------------

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [quantity, setQuantity] = useState("1");

  // Individual units
  const [lengthUnit, setLengthUnit] =
    useState<Unit>("Meter");

  const [widthUnit, setWidthUnit] =
    useState<Unit>("Meter");

  const [depthUnit, setDepthUnit] =
    useState<Unit>("Meter");

  // --------------------------------------------------
  // Material Prices
  // --------------------------------------------------

  const [cementPrice, setCementPrice] = useState("450");
  const [sandPrice, setSandPrice] = useState("1800");
  const [aggregatePrice, setAggregatePrice] =
    useState("1400");

  const [cementUnit, setCementUnit] =
    useState("Bag");

  const [sandUnit, setSandUnit] =
    useState("m3");

  const [aggregateUnit, setAggregateUnit] =
    useState("m3");

  // --------------------------------------------------
  // Currency
  // --------------------------------------------------

  const [currency, setCurrency] =
    useState("USD");

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
    cementBags: 0,
    sand: 0,
    aggregate: 0,
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
    const savedHistory =
      localStorage.getItem("concrete-history");

    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {
        localStorage.removeItem("concrete-history");
      }
    }
  }, []);

  // --------------------------------------------------
  // Toast
  // --------------------------------------------------

  const [showToast, setShowToast] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

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
  // Convert any unit → Meter
  // --------------------------------------------------

  const convertToMeters = (
    value: number,
    unit: Unit
  ) => {
    switch (unit) {
      case "Feet":
        return value * 0.3048;

      case "Centimeter":
        return value / 100;

      case "Millimeter":
        return value / 1000;

      case "Inch":
        return value * 0.0254;

      case "Meter":
      default:
        return value;
    }
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
      setError(
        "Please fill in Length, Width and Height / Depth."
      );

      showNotification(
        "Please fill in all dimensions.",
        "error"
      );

      return;
    }

    // Positive values
    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(d) ||
      l <= 0 ||
      w <= 0 ||
      d <= 0
    ) {
      setError(
        "All dimensions must be greater than zero."
      );

      showNotification(
        "Values must be greater than zero.",
        "error"
      );

      return;
    }

    // Quantity
    if (!Number.isFinite(q) || q <= 0) {
      setError(
        "Quantity must be greater than 0."
      );

      showNotification(
        "Quantity must be greater than 0.",
        "error"
      );

      return;
    }

    // Material prices
    const cement = Number(cementPrice);
    const sand = Number(sandPrice);
    const aggregate = Number(aggregatePrice);

    if (
      !Number.isFinite(cement) ||
      !Number.isFinite(sand) ||
      !Number.isFinite(aggregate) ||
      cement < 0 ||
      sand < 0 ||
      aggregate < 0
    ) {
      setError(
        "Material prices cannot be negative."
      );

      showNotification(
        "Please enter valid material prices.",
        "error"
      );

      return;
    }

    setError("");

    // ------------------------------------------------
    // Convert dimensions to meters
    // ------------------------------------------------

    const lengthM = convertToMeters(
      l,
      lengthUnit
    );

    const widthM = convertToMeters(
      w,
      widthUnit
    );

    const depthM = convertToMeters(
      d,
      depthUnit
    );

    // ------------------------------------------------
    // Concrete volume
    // ------------------------------------------------

    const volume =
      lengthM *
      widthM *
      depthM *
      q;

    // ------------------------------------------------
    // Dry volume
    // ------------------------------------------------

    const dryVolume =
      volume * 1.54;

    // ------------------------------------------------
    // Material quantities
    // ------------------------------------------------

    const cementBags =
      volume * 29;

    const sandQuantity =
      dryVolume * 0.42;

    const aggregateQuantity =
      dryVolume * 0.84;

    // ------------------------------------------------
    // Material Cost
    //
    // Prices are already entered in selected currency.
    // Therefore NO exchange-rate conversion here.
    // ------------------------------------------------

    let cementCost = 0;
    let sandCost = 0;
    let aggregateCost = 0;

    if (cementUnit === "Bag") {
      cementCost =
        cementBags * cement;
    }

    if (sandUnit === "m3") {
      sandCost =
        sandQuantity * sand;
    }

    if (aggregateUnit === "m3") {
      aggregateCost =
        aggregateQuantity * aggregate;
    }

    const totalCost =
      cementCost +
      sandCost +
      aggregateCost;

    // ------------------------------------------------
    // Result
    // ------------------------------------------------

    const finalResult = {
      volume,
      dryVolume,
      cementBags,
      sand: sandQuantity,
      aggregate: aggregateQuantity,
      totalCost,
    };

    setResult(finalResult);

    // ------------------------------------------------
    // History
    // ------------------------------------------------

    const newHistory = [
      {
        length: l,
        width: w,
        depth: d,
        volume,
      },
      ...history,
    ].slice(0, 5);

    setHistory(newHistory);

    localStorage.setItem(
      "concrete-history",
      JSON.stringify(newHistory)
    );

    showNotification(
      "Calculation completed successfully!"
    );
  };

  // --------------------------------------------------
  // Copy
  // --------------------------------------------------

  const handleCopy = async () => {
    const text = `Concrete Calculator Result

Concrete Form : ${concreteForm}

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags.toFixed(0)} Bags
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

Concrete Form : ${concreteForm}

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags.toFixed(0)} Bags
Sand            : ${result.sand.toFixed(2)} m³
Aggregate       : ${result.aggregate.toFixed(2)} m³
Total Cost      : ${result.totalCost.toFixed(2)} ${currency}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title:
            "Concrete Calculator Result",
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
      `Concrete Form : ${concreteForm}`,
      20,
      35
    );

    doc.text(
      `Concrete Volume : ${result.volume.toFixed(2)} m3`,
      20,
      48
    );

    doc.text(
      `Dry Volume : ${result.dryVolume.toFixed(2)} m3`,
      20,
      58
    );

    doc.text(
      `Cement Bags : ${result.cementBags.toFixed(0)} Bags`,
      20,
      68
    );

    doc.text(
      `Sand : ${result.sand.toFixed(2)} m3`,
      20,
      78
    );

    doc.text(
      `Aggregate : ${result.aggregate.toFixed(2)} m3`,
      20,
      88
    );

    doc.text(
      `Total Cost : ${result.totalCost.toFixed(2)} ${currency}`,
      20,
      98
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
              concreteForm={concreteForm}
              setConcreteForm={setConcreteForm}

              length={length}
              width={width}
              depth={depth}
              quantity={quantity}

              lengthUnit={lengthUnit}
              widthUnit={widthUnit}
              depthUnit={depthUnit}

              cementPrice={cementPrice}
              sandPrice={sandPrice}
              aggregatePrice={aggregatePrice}

              cementUnit={cementUnit}
              sandUnit={sandUnit}
              aggregateUnit={aggregateUnit}

              currency={currency}
              setCurrency={setCurrency}

              error={error}

              setLength={setLength}
              setWidth={setWidth}
              setDepth={setDepth}
              setQuantity={setQuantity}

              setLengthUnit={setLengthUnit}
              setWidthUnit={setWidthUnit}
              setDepthUnit={setDepthUnit}

              setCementPrice={setCementPrice}
              setSandPrice={setSandPrice}
              setAggregatePrice={setAggregatePrice}

              setCementUnit={setCementUnit}
              setSandUnit={setSandUnit}
              setAggregateUnit={setAggregateUnit}

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
              onDownload={handleDownloadPDF}
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
