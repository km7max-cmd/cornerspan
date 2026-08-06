"use client";

import { useMemo, useState } from "react";

import Hero from "./components/Hero";
import CalculatorForm from "./components/CalculatorForm";
import ResultCard from "./components/ResultCard";

export default function ConcreteCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [unit, setUnit] = useState("Meter");

  const volume = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);

    if (!l || !w || !d) return 0;

    return l * w * d;
  }, [length, width, depth]);

  const dryVolume = useMemo(() => {
    return volume * 1.54;
  }, [volume]);

  const bags = useMemo(() => {
    return Math.ceil(volume * 29);
  }, [volume]);

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
            volume={volume}
            dryVolume={dryVolume}
            bags={bags}
          />

        </div>

      </div>

    </main>
  );
}
