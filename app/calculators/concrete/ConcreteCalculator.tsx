"use client";

import { useState } from "react";

import Hero from "./components/Hero";
import CalculatorForm from "./components/CalculatorForm";
import ResultCard from "./components/ResultCard";
import Formula from "./components/Formula";
import FAQ from "./components/FAQ";
import RelatedCalculators from "./components/RelatedCalculators";
import Example from "./components/Example";
import { calculateConcrete } from "./utils/calculateConcrete";

export default function ConcreteCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [unit, setUnit] = useState("Meter");

  const [error, setError] = useState("");

  const [result, setResult] = useState({
    volume: 0,
    dryVolume: 0,
    cementBags: 0,
    sand: 0,
    aggregate: 0,
  });

  const handleCalculate = () => {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);

    if (!length || !width || !depth) {
      setError("Please fill in all fields.");

      setResult({
        volume: 0,
        dryVolume: 0,
        cementBags: 0,
        sand: 0,
        aggregate: 0,
      });

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
      });

      return;
    }

    setError("");

    const output = calculateConcrete(
      l,
      w,
      d,
      unit as any
    );

    setResult(output);
  };

  const handleCopy = async () => {
    const text = `Concrete Calculator Result

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags} Bags
Sand            : ${result.sand} m³
Aggregate       : ${result.aggregate} m³`;

    try {
      await navigator.clipboard.writeText(text);
      alert("✅ Results copied successfully!");
    } catch {
      alert("❌ Failed to copy results.");
    }
  };
  
const handleShare = async () => {
  const text = `Concrete Calculator Result

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags} Bags
Sand            : ${result.sand} m³
Aggregate       : ${result.aggregate} m³`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Concrete Calculator Result",
        text,
      });
    } else {
      alert("Sharing is not supported on this device.");
    }
  } catch {
    // User cancelled or share failed
  }
};
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        <Hero />

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          <CalculatorForm
            length={length}
            width={width}
            depth={depth}
            unit={unit}
            error={error}
            setLength={setLength}
            setWidth={setWidth}
            setDepth={setDepth}
            setUnit={setUnit}
            onCalculate={handleCalculate}
          />

          <ResultCard
  volume={result.volume}
  dryVolume={result.dryVolume}
  bags={result.cementBags}
  sand={result.sand}
  aggregate={result.aggregate}
  onCopy={handleCopy}
  onShare={handleShare}
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

      </div>
    </main>
  );
}
