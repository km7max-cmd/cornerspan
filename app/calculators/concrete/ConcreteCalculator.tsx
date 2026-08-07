"use client";

import { useMemo, useState } from "react";

import Hero from "./components/Hero";
import CalculatorForm from "./components/CalculatorForm";
import ResultCard from "./components/ResultCard";

import { calculateConcrete } from "./utils/calculateConcrete";

export default function ConcreteCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [unit, setUnit] = useState("Meter");

  const result = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);

    if (!l || !w || !d) {
      return {
        volume: 0,
        dryVolume: 0,
        cementBags: 0,
        sand: 0,
        aggregate: 0,
      };
    }

    return calculateConcrete(l, w, d, unit as any);
  }, [length, width, depth, unit]);

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
            setLength={setLength}
            setWidth={setWidth}
            setDepth={setDepth}
            setUnit={setUnit}
          />

          <ResultCard
  volume={result.volume}
  dryVolume={result.dryVolume}
  bags={result.cementBags}
  sand={result.sand}
  aggregate={result.aggregate}
/>

        </div>

      </div>

    </main>
  );
}
