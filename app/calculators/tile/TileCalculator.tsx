"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";

type SurfaceType = "floor" | "wall";
type AreaUnit = "ft" | "m";
type TileUnit = "in" | "cm";

type Currency = {
  code: string;
  symbol: string;
};

const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "CAD", symbol: "C$" },
  { code: "AUD", symbol: "A$" },
  { code: "NZD", symbol: "NZ$" },
  { code: "INR", symbol: "₹" },
  { code: "JPY", symbol: "¥" },
  { code: "CNY", symbol: "¥" },
  { code: "SGD", symbol: "S$" },
  { code: "AED", symbol: "د.إ" },
  { code: "SAR", symbol: "﷼" },
  { code: "ZAR", symbol: "R" },
  { code: "CHF", symbol: "CHF" },
];

const FLOOR_TILE_SIZES = [
  "12×12",
  "12×24",
  "18×18",
  "24×24",
  "24×48",
  "36×36",
];

const WALL_TILE_SIZES = [
  "4×4",
  "3×6",
  "4×12",
  "6×6",
  "6×24",
  "12×24",
];

function formatNumber(
  value: number,
  decimals = 2
) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatCurrency(
  value: number,
  currency: Currency
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function MiniResult({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-0.5 text-sm font-bold text-slate-900 sm:text-base">
        {value}
      </p>
    </div>
  );
}

export default function TileCalculator() {
  const [surfaceType, setSurfaceType] =
    useState<SurfaceType>("floor");

  const [surfaceLength, setSurfaceLength] =
    useState("");

  const [surfaceWidth, setSurfaceWidth] =
    useState("");

  const [areaUnit, setAreaUnit] =
    useState<AreaUnit>("ft");

  const [tileLength, setTileLength] =
    useState("24");

  const [tileWidth, setTileWidth] =
    useState("24");

  const [tileUnit, setTileUnit] =
    useState<TileUnit>("in");

  const [tilesPerBox, setTilesPerBox] =
    useState("4");

  const [waste, setWaste] =
    useState("10");

  const [boxPrice, setBoxPrice] =
    useState("");

  const [currencyCode, setCurrencyCode] =
    useState("USD");

  const [calculated, setCalculated] =
    useState(false);

  const selectedCurrency =
    CURRENCIES.find(
      (currency) =>
        currency.code === currencyCode
    ) ?? CURRENCIES[0];

  const result = useMemo(() => {
    const length = Number(surfaceLength);
    const width = Number(surfaceWidth);

    const tileL = Number(tileLength);
    const tileW = Number(tileWidth);

    const boxTiles = Number(tilesPerBox);

    const wastePercent =
      Number(waste) || 0;

    const price =
      Number(boxPrice) || 0;

    if (
      !Number.isFinite(length) ||
      length <= 0 ||
      !Number.isFinite(width) ||
      width <= 0 ||
      !Number.isFinite(tileL) ||
      tileL <= 0 ||
      !Number.isFinite(tileW) ||
      tileW <= 0 ||
      !Number.isFinite(boxTiles) ||
      boxTiles <= 0 ||
      !Number.isFinite(wastePercent) ||
      wastePercent < 0
    ) {
      return null;
    }

    const lengthFeet =
      areaUnit === "ft"
        ? length
        : length * 3.280839895;

    const widthFeet =
      areaUnit === "ft"
        ? width
        : width * 3.280839895;

    const surfaceArea =
      lengthFeet * widthFeet;

    const tileLengthInches =
      tileUnit === "in"
        ? tileL
        : tileL / 2.54;

    const tileWidthInches =
      tileUnit === "in"
        ? tileW
        : tileW / 2.54;

    const tileArea =
      (tileLengthInches *
        tileWidthInches) /
      144;

    const exactTiles =
      surfaceArea / tileArea;

    const areaWithWaste =
      surfaceArea *
      (1 + wastePercent / 100);

    const tilesWithWaste =
      Math.ceil(
        areaWithWaste / tileArea
      );

    const boxes =
      Math.ceil(
        tilesWithWaste / boxTiles
      );

    const tilesToOrder =
      boxes * boxTiles;

    const actualCoverage =
      tilesToOrder * tileArea;

    const exactTilesRounded =
      Math.ceil(exactTiles);

    const wasteTiles =
      Math.max(
        0,
        tilesWithWaste -
          exactTilesRounded
      );

    const boxRoundingExtra =
      Math.max(
        0,
        tilesToOrder -
          tilesWithWaste
      );

    const estimatedCost =
      price > 0
        ? boxes * price
        : null;

    return {
      surfaceArea,
      tileArea,
      exactTilesRounded,
      areaWithWaste,
      tilesWithWaste,
      boxes,
      tilesToOrder,
      actualCoverage,
      wasteTiles,
      boxRoundingExtra,
      estimatedCost,
    };
  }, [
    surfaceLength,
    surfaceWidth,
    areaUnit,
    tileLength,
    tileWidth,
    tileUnit,
    tilesPerBox,
    waste,
    boxPrice,
  ]);

  const applyTileSize = (
    size: string
  ) => {
    const [length, width] =
      size.split("×");

    setTileLength(length);
    setTileWidth(width);
    setCalculated(false);
  };

  const handleSurfaceChange = (
    type: SurfaceType
  ) => {
    setSurfaceType(type);

    if (type === "floor") {
      setTileLength("24");
      setTileWidth("24");
    } else {
      setTileLength("4");
      setTileWidth("12");
    }

    setCalculated(false);
  };

  const tileSizes =
    surfaceType === "floor"
      ? FLOOR_TILE_SIZES
      : WALL_TILE_SIZES;

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:px-3.5 sm:py-3";

  const selectClass =
    "w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:px-3.5 sm:py-3";

  return (
    <main className="mx-auto max-w-4xl px-3 py-4 sm:px-6 sm:py-6">

      <Breadcrumb current="Tile Calculator" />

      {/* Heading */}
      <section className="mb-4 sm:mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Tile Calculator
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
          Calculate tiles, boxes, waste and material cost
          for floors and walls.
        </p>
      </section>

      {/* Hero */}
      <section className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mb-6 sm:rounded-2xl">
        <Image
          src="/cornerspan-tile-calculator-hero.webp"
          alt="Tile Calculator for estimating tile quantity, boxes, waste and cost"
          width={1774}
          height={887}
          priority
          className="h-auto w-full"
        />
      </section>

      {/* SINGLE CALCULATOR BOX */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

        {/* Header / Display */}
        <div className="bg-slate-900 px-4 py-3.5 sm:px-6 sm:py-4">

          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Tile Quantity Calculator
          </p>

          <div className="mt-2 rounded-xl bg-slate-800 px-3 py-3 sm:px-4">

            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {calculated && result
                ? "Tiles Required"
                : "Enter Project Details"}
            </p>

            <p className="mt-0.5 text-lg font-bold text-white sm:text-2xl">
              {calculated && result
                ? `${result.tilesToOrder} Tiles · ${result.boxes} Boxes`
                : "Calculate Your Tile Quantity"}
            </p>

          </div>
        </div>

        {/* Compact Calculator */}
        <div className="p-3.5 sm:p-5">

          {/* Floor / Wall */}
          <div className="grid grid-cols-2 gap-2">

            <button
              type="button"
              onClick={() =>
                handleSurfaceChange("floor")
              }
              className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
                surfaceType === "floor"
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              Floor
            </button>

            <button
              type="button"
              onClick={() =>
                handleSurfaceChange("wall")
              }
              className={`rounded-lg border px-3 py-2.5 text-sm font-bold transition ${
                surfaceType === "wall"
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
            >
              Wall
            </button>

          </div>

          {/* Dimensions */}
          <div className="mt-3">

            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              {surfaceType === "floor"
                ? "Floor Dimensions"
                : "Wall Dimensions"}
            </label>

            <div className="grid grid-cols-[1fr_1fr_82px] gap-2">

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder={
                  surfaceType === "floor"
                    ? "Length"
                    : "Height"
                }
                value={surfaceLength}
                onChange={(e) => {
                  setSurfaceLength(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                className={inputClass}
              />

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Width"
                value={surfaceWidth}
                onChange={(e) => {
                  setSurfaceWidth(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                className={inputClass}
              />

              <select
                value={areaUnit}
                onChange={(e) => {
                  setAreaUnit(
                    e.target.value as AreaUnit
                  );
                  setCalculated(false);
                }}
                className={selectClass}
              >
                <option value="ft">ft</option>
                <option value="m">m</option>
              </select>

            </div>
          </div>

          {/* Tile Unit */}
          <div className="mt-3">

            <div className="grid grid-cols-2 gap-2">

              <button
                type="button"
                onClick={() => {
                  setTileUnit("in");
                  setCalculated(false);
                }}
                className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                  tileUnit === "in"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                Inches
              </button>

              <button
                type="button"
                onClick={() => {
                  setTileUnit("cm");
                  setCalculated(false);
                }}
                className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                  tileUnit === "cm"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                Centimeters
              </button>

            </div>
          </div>

          {/* Tile Sizes */}
          <div className="mt-3">

            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              {surfaceType === "floor"
                ? "Common Floor Tile Sizes"
                : "Common Wall Tile Sizes"}
            </label>

            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">

              {tileSizes.map((size) => {

                const [length, width] =
                  size.split("×");

                const active =
                  tileLength === length &&
                  tileWidth === width;

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() =>
                      applyTileSize(size)
                    }
                    className={`rounded-lg border px-1 py-2 text-xs font-bold transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {size}
                    {tileUnit === "in"
                      ? '"'
                      : " cm"}
                  </button>
                );
              })}

            </div>

            {/* Custom */}
            <div className="mt-2 grid grid-cols-2 gap-2">

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Tile length"
                value={tileLength}
                onChange={(e) => {
                  setTileLength(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                className={inputClass}
              />

              <input
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                placeholder="Tile width"
                value={tileWidth}
                onChange={(e) => {
                  setTileWidth(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                className={inputClass}
              />

            </div>
          </div>

          {/* Box + Waste */}
          <div className="mt-3 grid grid-cols-2 gap-2">

            <div>

              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Tiles / Box
              </label>

              <input
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                placeholder="Example: 4"
                value={tilesPerBox}
                onChange={(e) => {
                  setTilesPerBox(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                className={inputClass}
              />

            </div>

            <div>

              <label className="mb-1.5 block text-xs font-bold text-slate-700">
                Waste
              </label>

              <select
                value={waste}
                onChange={(e) => {
                  setWaste(e.target.value);
                  setCalculated(false);
                }}
                className={selectClass}
              >
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
              </select>

            </div>

          </div>

          {/* Currency + Price */}
          <div className="mt-3">

            <label className="mb-1.5 block text-xs font-bold text-slate-700">
              Price Per Box
              <span className="ml-1 font-normal text-slate-400">
                Optional
              </span>
            </label>

            <div className="grid grid-cols-[100px_1fr] gap-2">

              <select
                value={currencyCode}
                onChange={(e) => {
                  setCurrencyCode(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                className={selectClass}
                aria-label="Currency"
              >
                {CURRENCIES.map(
                  (currency) => (
                    <option
                      key={currency.code}
                      value={currency.code}
                    >
                      {currency.code}
                    </option>
                  )
                )}
              </select>

              <div className="relative">

                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                  {selectedCurrency.symbol}
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Price per box"
                  value={boxPrice}
                  onChange={(e) => {
                    setBoxPrice(
                      e.target.value
                    );
                    setCalculated(false);
                  }}
                  className={`${inputClass} pl-8`}
                />

              </div>

            </div>

          </div>

          {/* Calculate */}
          <button
            type="button"
            onClick={() =>
              setCalculated(true)
            }
            className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Calculate Tiles
          </button>

          {/* INLINE RESULTS */}
          {calculated && (
            <div className="mt-4 border-t border-slate-200 pt-4">

              {result ? (

                <>
                  {/* Main Results */}
                  <div className="grid grid-cols-2 gap-2">

                    <div className="rounded-xl bg-slate-900 px-3 py-3 text-center">

                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Tiles To Order
                      </p>

                      <p className="mt-1 text-2xl font-bold text-white">
                        {result.tilesToOrder}
                      </p>

                      <p className="text-xs text-slate-400">
                        tiles
                      </p>

                    </div>

                    <div className="rounded-xl bg-slate-900 px-3 py-3 text-center">

                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Boxes Required
                      </p>

                      <p className="mt-1 text-2xl font-bold text-white">
                        {result.boxes}
                      </p>

                      <p className="text-xs text-slate-400">
                        boxes
                      </p>

                    </div>

                  </div>

                  {/* Result Grid */}
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">

                    <MiniResult
                      label="Surface Area"
                      value={`${formatNumber(
                        result.surfaceArea
                      )} sq ft`}
                    />

                    <MiniResult
                      label="Tile Area"
                      value={`${formatNumber(
                        result.tileArea,
                        3
                      )} sq ft`}
                    />

                    <MiniResult
                      label="Exact Tiles"
                      value={`${result.exactTilesRounded}`}
                    />

                    <MiniResult
                      label="Area + Waste"
                      value={`${formatNumber(
                        result.areaWithWaste
                      )} sq ft`}
                    />

                    <MiniResult
                      label="Waste Tiles"
                      value={`${result.wasteTiles}`}
                    />

                    <MiniResult
                      label="Box Extra"
                      value={`${result.boxRoundingExtra}`}
                    />

                    <MiniResult
                      label="Coverage"
                      value={`${formatNumber(
                        result.actualCoverage
                      )} sq ft`}
                    />

                    <MiniResult
                      label="Tiles / Box"
                      value={`${Number(
                        tilesPerBox
                      )}`}
                    />

                    {result.estimatedCost !== null && (
                      <MiniResult
                        label={`Cost · ${currencyCode}`}
                        value={formatCurrency(
                          result.estimatedCost,
                          selectedCurrency
                        )}
                      />
                    )}

                  </div>

                  {/* Compact Summary */}
                  <div className="mt-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5">

                    <p className="text-xs leading-5 text-slate-700">

                      <strong>
                        {result.tilesToOrder} tiles
                      </strong>{" "}
                      in{" "}
                      <strong>
                        {result.boxes} boxes
                      </strong>{" "}
                      are needed for{" "}
                      <strong>
                        {formatNumber(
                          result.surfaceArea
                        )} sq ft
                      </strong>{" "}
                      with{" "}
                      <strong>
                        {waste}% waste
                      </strong>.

                      {result.estimatedCost !== null && (
                        <>
                          {" "}
                          Estimated material cost:{" "}
                          <strong>
                            {formatCurrency(
                              result.estimatedCost,
                              selectedCurrency
                            )}
                          </strong>
                          .
                        </>
                      )}

                    </p>

                  </div>

                </>

              ) : (

                <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-3 text-center">

                  <p className="text-sm font-semibold text-red-700">
                    Please enter valid project and tile dimensions.
                  </p>

                </div>

              )}

            </div>
          )}

        </div>
      </section>

      {/* Note */}
      <p className="mt-3 text-[11px] leading-5 text-slate-500 sm:mt-4 sm:text-xs">
        This calculator provides an estimate for planning and
        material purchasing. Actual tile requirements may vary
        because of room shape, cuts, layout pattern, damaged
        tiles, grout joints and installation conditions.
      </p>

    </main>
  );
}
