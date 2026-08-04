"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import FAQ from "../../../components/FAQ";

export default function TileCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [tileLength, setTileLength] = useState("12");
  const [tileWidth, setTileWidth] = useState("12");
  const [waste, setWaste] = useState("10");
  const [price, setPrice] = useState("2.50");

  const result = useMemo(() => {
    const roomArea = (Number(length) || 0) * (Number(width) || 0);
    const tileArea =
      ((Number(tileLength) || 12) *
        (Number(tileWidth) || 12)) / 144;

    const tiles = Math.ceil(
      (roomArea / tileArea) *
      (1 + (Number(waste) || 0) / 100)
    );

    const cost = tiles * (Number(price) || 0);

    return {
      roomArea,
      tiles,
      cost,
    };
  }, [
    length,
    width,
    tileLength,
    tileWidth,
    waste,
    price,
  ]);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Breadcrumb current="Tile Calculator" />

      <h1 className="text-4xl font-bold">
        Tile Calculator
      </h1>

      <p className="mt-2 mb-8 text-slate-600">
        Professional Tile Flooring Estimator
      </p>
            <div className="space-y-4">

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Room Length (ft)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Room Width (ft)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Tile Length (in)"
          value={tileLength}
          onChange={(e) => setTileLength(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Tile Width (in)"
          value={tileWidth}
          onChange={(e) => setTileWidth(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Waste (%)"
          value={waste}
          onChange={(e) => setWaste(e.target.value)}
        />

        <input
          className="w-full rounded-lg border p-3"
          type="number"
          placeholder="Price per Tile ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="rounded-xl bg-slate-100 p-5 space-y-2">
          <h2 className="text-2xl font-bold">
            Results
          </h2>

          <p>
            📐 Floor Area:
            <b> {result.roomArea.toFixed(2)} sq ft</b>
          </p>

          <p>
            🧱 Tiles Required:
            <b> {result.tiles}</b>
          </p>

          <p className="text-xl font-bold text-green-600">
            💲 Estimated Cost:
            <b> ${result.cost.toFixed(2)}</b>
          </p>
        </div>
      </div>
            <FAQ
        items={[
          {
            question: "How many extra tiles should I buy?",
            answer:
              "It is recommended to buy 5–10% extra tiles for cuts, breakage and future repairs.",
          },
          {
            question: "What is the most common tile size?",
            answer:
              "12×12 inch and 24×24 inch tiles are among the most common residential sizes.",
          },
          {
            question: "Should I include waste?",
            answer:
              "Yes. Always include at least 10% waste for a standard installation.",
          },
        ]}
      />
    </main>
  );
}
