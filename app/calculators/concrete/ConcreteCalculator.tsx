"use client";

import { useEffect, useState } from "react";

import Hero from "./components/Hero";
import CalculatorForm from "./components/CalculatorForm";
import ResultCard from "./components/ResultCard";
import Formula from "./components/Formula";
import FAQ from "./components/FAQ";
import RelatedCalculators from "./components/RelatedCalculators";
import Example from "./components/Example";
import History from "./components/History";
import { calculateConcrete } from "./utils/calculateConcrete";
import { jsPDF } from "jspdf";
import Toast from "../../components/Toast";
export default function ConcreteCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [quantity, setQuantity] = useState("1");

const [cementPrice, setCementPrice] = useState("450");
const [sandPrice, setSandPrice] = useState("1800");
const [aggregatePrice, setAggregatePrice] = useState("1400");

const [unit, setUnit] = useState("Meter");
  
  const [currency, setCurrency] = useState("USD");

  const [error, setError] = useState("");

  const [result, setResult] = useState({
  volume: 0,
  dryVolume: 0,
  cementBags: 0,
  sand: 0,
  aggregate: 0,
  totalCost: 0,
});
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
    setHistory(JSON.parse(savedHistory));
  }
}, []);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

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
  const exchangeRates = {
  USD: 1,
  INR: 87,
  EUR: 0.86,
  GBP: 0.74,
  AED: 3.67,
  AUD: 1.53,
  CAD: 1.38,
};
  const handleCalculate = () => {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);
    const q = Number(quantity);

    if (!length || !width || !depth) {
      setError("Please fill in all fields.");

      setResult({
  volume: 0,
  dryVolume: 0,
  cementBags: 0,
  sand: 0,
  aggregate: 0,
  totalCost: 0,
});

      showNotification("Please fill in all fields.", "error");
      return;
    }

    if (l <= 0 || w <= 0 || d <= 0) {
      setError("Values must be greater than zero.");

      setResult({
  volume: 0,
  dryVolume: 0,
  cementBags: 0,
  sand: 0,
  aggregate: 0,
  totalCost: 0,
});

      showNotification("Values must be greater than zero.", "error");
      return;
    }

    setError("");
 if (q <= 0) {
  setError("Quantity must be greater than 0.");

  setResult({
    volume: 0,
    dryVolume: 0,
    cementBags: 0,
    sand: 0,
    aggregate: 0,
    totalCost: 0,
  });

  showNotification("Quantity must be greater than 0.", "error");
  return;
}

const cement = Number(cementPrice);
const sandRate = Number(sandPrice);
const aggregateRate = Number(aggregatePrice);

if (
  cement < 0 ||
  sandRate < 0 ||
  aggregateRate < 0
) {
  setError("Material prices cannot be negative.");

  setResult({
    volume: 0,
    dryVolume: 0,
    cementBags: 0,
    sand: 0,
    aggregate: 0,
    totalCost: 0,
  });

  showNotification("Material prices cannot be negative.", "error");
  return;
}
    const output = calculateConcrete(
      l,
      w,
      d,
      unit as any
    );
const qty = Number(quantity);

output.volume *= qty;
output.dryVolume *= qty;
output.cementBags *= qty;
output.sand *= qty;
output.aggregate *= qty;
    const totalInUSD =
  output.cementBags * Number(cementPrice) +
  output.sand * Number(sandPrice) +
  output.aggregate * Number(aggregatePrice);


    
    setResult({
  ...output,
  totalCost: totalInUSD,
});
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

    };
  const handleCopy = async () => {
    const text = `Concrete Calculator Result

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags} Bags
Sand            : ${result.sand.toFixed(2)} m³
Aggregate       : ${result.aggregate.toFixed(2)} m³`;

    try {
      await navigator.clipboard.writeText(text);
      showNotification("Results copied successfully!");
    } catch {
      showNotification("Failed to copy results.", "error");
    }
  };

  const handleShare = async () => {
    const text = `Concrete Calculator Result

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags} Bags
Sand            : ${result.sand.toFixed(2)} m³
Aggregate       : ${result.aggregate.toFixed(2)} m³`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Concrete Calculator Result",
          text,
        });

        showNotification("Results shared successfully!");
      } else {
        showNotification("Sharing is not supported.", "error");
      }
    } catch {
      // User cancelled share
    }
  };

  const handleDownloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Concrete Calculator Result", 20, 20);

  doc.setFontSize(12);

  doc.text(`Concrete Volume : ${result.volume.toFixed(2)} m³`, 20, 40);
  doc.text(`Dry Volume      : ${result.dryVolume.toFixed(2)} m³`, 20, 50);
  doc.text(`Cement Bags     : ${result.cementBags} Bags`, 20, 60);
  doc.text(`Sand            : ${result.sand.toFixed(2)} m³`, 20, 70);
  doc.text(`Aggregate       : ${result.aggregate.toFixed(2)} m³`, 20, 80);

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

          <Hero />

          <div className="mt-10 grid gap-8 lg:grid-cols-2">

            <CalculatorForm
  length={length}
  width={width}
  depth={depth}
  quantity={quantity}
cementPrice={cementPrice}
sandPrice={sandPrice}
aggregatePrice={aggregatePrice}
  currency={currency}
  unit={unit}
  error={error}
  setLength={setLength}
  setWidth={setWidth}
  setDepth={setDepth}
  setQuantity={setQuantity}
setCementPrice={setCementPrice}
setSandPrice={setSandPrice}
setAggregatePrice={setAggregatePrice}   
setCurrency={setCurrency}
  setUnit={setUnit}
  onCalculate={handleCalculate}
/>

            <ResultCard
              volume={result.volume}
              dryVolume={result.dryVolume}
              bags={result.cementBags}
              sand={result.sand}
              aggregate={result.aggregate}
              totalCost={
  result.totalCost *
  exchangeRates[currency as keyof typeof exchangeRates]
}
              currency={currency}
              onCopy={handleCopy}
              onShare={handleShare}
              onDownload={handleDownloadPDF}
            />

          </div>

          <div className="mt-12">
            <Formula />
          </div>

          <div className="mt-12">
            <Example />
          </div>

          <div className="mt-12">
            <FAQ />
          </div>

          <div className="mt-12">
            <RelatedCalculators />
          </div>
<div className="mt-12">
  <History
  history={history}
  onClear={handleClearHistory}
/>
</div>
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
