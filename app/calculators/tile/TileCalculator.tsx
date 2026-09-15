"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";

type Unit = "ft" | "m";

const TILE_SIZES = [
  "12×12",
  "12×24",
  "16×16",
  "18×18",
  "24×24",
  "24×48",
];

function formatNumber(value: number, decimals = 2) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [roomUnit, setRoomUnit] = useState<Unit>("ft");

  const [tileLength, setTileLength] = useState("24");
  const [tileWidth, setTileWidth] = useState("24");

  const [tilesPerBox, setTilesPerBox] = useState("4");
  const [waste, setWaste] = useState("10");
  const [boxPrice, setBoxPrice] = useState("");

  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    const rLength = Number(roomLength);
    const rWidth = Number(roomWidth);
    const tLength = Number(tileLength);
    const tWidth = Number(tileWidth);
    const boxTiles = Number(tilesPerBox);
    const wastePercent = Number(waste) || 0;
    const price = Number(boxPrice) || 0;

    if (
      !Number.isFinite(rLength) ||
      rLength <= 0 ||
      !Number.isFinite(rWidth) ||
      rWidth <= 0 ||
      !Number.isFinite(tLength) ||
      tLength <= 0 ||
      !Number.isFinite(tWidth) ||
      tWidth <= 0 ||
      !Number.isFinite(boxTiles) ||
      boxTiles <= 0
    ) {
      return null;
    }

    const roomLengthFeet =
      roomUnit === "ft" ? rLength : rLength * 3.280839895;

    const roomWidthFeet =
      roomUnit === "ft" ? rWidth : rWidth * 3.280839895;

    const roomArea = roomLengthFeet * roomWidthFeet;

    const tileArea = (tLength * tWidth) / 144;

    const exactTiles = roomArea / tileArea;

    const areaWithWaste =
      roomArea * (1 + wastePercent / 100);

    const tilesWithWaste =
      Math.ceil(areaWithWaste / tileArea);

    const boxes = Math.ceil(tilesWithWaste / boxTiles);

    const finalTiles = boxes * boxTiles;

    const actualCoverage = finalTiles * tileArea;

    const extraTiles = finalTiles - Math.ceil(exactTiles);

    const estimatedCost =
      price > 0 ? boxes * price : null;

    return {
      roomArea,
      tileArea,
      exactTiles,
      areaWithWaste,
      tilesWithWaste,
      boxes,
      finalTiles,
      actualCoverage,
      extraTiles,
      estimatedCost,
    };
  }, [
    roomLength,
    roomWidth,
    roomUnit,
    tileLength,
    tileWidth,
    tilesPerBox,
    waste,
    boxPrice,
  ]);

  const handleCalculate = () => {
    setCalculated(true);

    setTimeout(() => {
      document.getElementById("tile-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const applyTileSize = (size: string) => {
    const [lengthValue, widthValue] = size.split("×");

    setTileLength(lengthValue);
    setTileWidth(widthValue);
    setCalculated(false);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <Breadcrumb current="Tile Calculator" />

      {/* Heading */}
      <section className="mb-7">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Tile Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Calculate how many tiles and boxes you need for floors, walls and
          other tiling projects.
        </p>
      </section>

      {/* Calculator */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
        {/* Display */}
        <div className="bg-slate-900 px-5 py-5 sm:px-7">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Tile Quantity Calculator
          </p>

          <div className="mt-3 rounded-2xl bg-slate-800 px-5 py-4">
            <p className="text-xs font-medium text-slate-400">
              {calculated && result
                ? "TILES REQUIRED"
                : "ENTER YOUR VALUES"}
            </p>

            <p className="mt-1 text-3xl font-bold text-white sm:text-4xl">
              {calculated && result
                ? `${result.boxes} Boxes`
                : "Tile Quantity"}
            </p>

            {calculated && result && (
              <p className="mt-1 text-sm text-slate-400">
                {result.finalTiles} tiles
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7">
          {/* Room Dimensions */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Room Dimensions
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_110px]">
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Length"
                value={roomLength}
                onChange={(e) => {
                  setRoomLength(e.target.value);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-lg font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Width"
                value={roomWidth}
                onChange={(e) => {
                  setRoomWidth(e.target.value);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-lg font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

              <select
                value={roomUnit}
                onChange={(e) => {
                  setRoomUnit(e.target.value as Unit);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3.5 font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="ft">Feet</option>
                <option value="m">Meters</option>
              </select>
            </div>
          </div>

          {/* Tile Size */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Tile Size
              <span className="ml-2 font-normal text-slate-400">
                Inches
              </span>
            </label>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {TILE_SIZES.map((size) => {
                const [l, w] = size.split("×");

                const active =
                  tileLength === l && tileWidth === w;

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => applyTileSize(size)}
                    className={`rounded-xl border px-2 py-3 text-sm font-bold transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {size}"
                  </button>
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Tile length"
                value={tileLength}
                onChange={(e) => {
                  setTileLength(e.target.value);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Tile width"
                value={tileWidth}
                onChange={(e) => {
                  setTileWidth(e.target.value);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Enter custom tile dimensions if your tile size is not listed.
            </p>
          </div>

          {/* Box + Waste */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="tiles-per-box"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Tiles Per Box
              </label>

              <input
                id="tiles-per-box"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                placeholder="Example: 4"
                value={tilesPerBox}
                onChange={(e) => {
                  setTilesPerBox(e.target.value);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-lg font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="tile-waste"
                className="mb-2 block text-sm font-bold text-slate-800"
              >
                Waste Allowance
              </label>

              <select
                id="tile-waste"
                value={waste}
                onChange={(e) => {
                  setWaste(e.target.value);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-base font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="0">0% — Exact</option>
                <option value="5">5% — Simple layout</option>
                <option value="10">10% — Recommended</option>
                <option value="15">15% — Diagonal / complex</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div className="mt-6">
            <label
              htmlFor="tile-price"
              className="mb-2 block text-sm font-bold text-slate-800"
            >
              Price Per Box
              <span className="ml-2 font-normal text-slate-400">
                Optional
              </span>
            </label>

            <div className="relative max-w-md">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                ₹
              </span>

              <input
                id="tile-price"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="Example: 850"
                value={boxPrice}
                onChange={(e) => {
                  setBoxPrice(e.target.value);
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 pl-9 text-lg font-semibold outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Calculate */}
          <button
            type="button"
            onClick={handleCalculate}
            className="mt-7 w-full rounded-2xl bg-blue-600 px-5 py-4 text-lg font-bold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Calculate Tiles
          </button>
        </div>
      </section>

      {/* Results */}
      <section
        id="tile-results"
        className="mt-8 scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-7"
      >
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Tile Calculation Result
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {result
              ? `${roomLength} × ${roomWidth} ${
                  roomUnit === "ft" ? "ft" : "m"
                } · ${tileLength}" × ${tileWidth}"`
              : "Your tile quantity will appear here."}
          </p>
        </div>

        {!result ? (
          <div className="rounded-2xl bg-slate-50 px-5 py-10 text-center">
            <p className="text-base font-medium text-slate-500">
              Enter room and tile dimensions to calculate.
            </p>
          </div>
        ) : (
          <>
            {/* Main Result */}
            <div className="rounded-2xl bg-slate-900 p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Boxes Needed
              </p>

              <p className="mt-2 text-4xl font-bold text-white sm:text-5xl">
                {result.boxes} Boxes
              </p>

              <p className="mt-2 text-base text-slate-400">
                {result.finalTiles} tiles
              </p>
            </div>

            {/* Breakdown */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <ResultCard
                label="Room Area"
                value={`${formatNumber(result.roomArea)} sq ft`}
              />

              <ResultCard
                label="Tile Area"
                value={`${formatNumber(result.tileArea, 3)} sq ft`}
              />

              <ResultCard
                label="Exact Tiles"
                value={`${Math.ceil(result.exactTiles)} pcs`}
              />

              <ResultCard
                label="Area With Waste"
                value={`${formatNumber(result.areaWithWaste)} sq ft`}
              />

              <ResultCard
                label="Tiles To Order"
                value={`${result.finalTiles} pcs`}
              />

              <ResultCard
                label="Actual Coverage"
                value={`${formatNumber(result.actualCoverage)} sq ft`}
              />
            </div>

            {result.estimatedCost !== null && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-medium text-slate-500">
                  Estimated Material Cost
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  ₹{formatNumber(result.estimatedCost)}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {result.boxes} boxes × ₹
                  {formatNumber(Number(boxPrice))}
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}
