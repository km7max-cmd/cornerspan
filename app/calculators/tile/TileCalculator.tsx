"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";

type SurfaceType = "floor" | "wall";
type AreaUnit = "ft" | "m";
type TileUnit = "in" | "cm";

type Currency = {
  code: string;
  name: string;
  symbol: string;
};

const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
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

function formatNumber(value: number, decimals = 2) {
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

function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-slate-900">
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

  /*
   * Global currency.
   * USD is the default because CornerSpan
   * targets USA + global search traffic.
   */
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

    /*
     * Convert project dimensions to feet.
     */
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

    /*
     * Convert tile dimensions to inches.
     */
    const tileLengthInches =
      tileUnit === "in"
        ? tileL
        : tileL / 2.54;

    const tileWidthInches =
      tileUnit === "in"
        ? tileW
        : tileW / 2.54;

    /*
     * One tile area in square feet.
     */
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

    /*
     * Boxes must always be rounded up.
     */
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
      exactTiles,
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

  const handleCalculate = () => {
    setCalculated(true);

    setTimeout(() => {
      document
        .getElementById("tile-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

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
    "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-lg font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const selectClass =
    "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 font-semibold outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">

      <Breadcrumb current="Tile Calculator" />

      {/* Page Heading */}
      <section className="mb-7">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Tile Calculator
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
          Calculate how many tiles and boxes you need for
          floors, walls and other tile installation projects.
        </p>
      </section>

      {/* Hero Image */}
      <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Image
          src="/cornerspan-tile-calculator-hero.webp"
          alt="Tile Calculator for estimating tile quantity, boxes, waste and cost"
          width={1774}
          height={887}
          priority
          className="h-auto w-full"
        />
      </section>

      {/* Calculator */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

        {/* Display */}
        <div className="bg-slate-900 px-5 py-5 sm:px-7">

          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Tile Quantity Calculator
          </p>

          <div className="mt-3 rounded-2xl bg-slate-800 px-5 py-5">

            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              {calculated && result
                ? "Tiles Required"
                : "Calculate Your Tile Quantity"}
            </p>

            <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              {calculated && result
                ? `${result.tilesToOrder} Tiles · ${result.boxes} Boxes`
                : "Enter your project details below"}
            </p>

          </div>
        </div>

        {/* Calculator Body */}
        <div className="p-5 sm:p-7">

          {/* Surface Type */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-800">
              Surface Type
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  handleSurfaceChange("floor")
                }
                className={`rounded-xl border px-4 py-3.5 text-base font-bold transition ${
                  surfaceType === "floor"
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                Floor
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSurfaceChange("wall")
                }
                className={`rounded-xl border px-4 py-3.5 text-base font-bold transition ${
                  surfaceType === "wall"
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                Wall
              </button>

            </div>
          </div>

          {/* Surface Dimensions */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-800">
              {surfaceType === "floor"
                ? "Floor Dimensions"
                : "Wall Dimensions"}
            </label>

            <p className="mb-3 text-xs text-slate-500">
              {surfaceType === "floor"
                ? "Enter the floor length and width."
                : "Enter the wall height and width."}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_110px]">

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
                <option value="ft">
                  Feet
                </option>

                <option value="m">
                  Meters
                </option>
              </select>

            </div>
          </div>

          {/* Tile Unit */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-800">
              Tile Measurement Unit
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => {
                  setTileUnit("in");
                  setCalculated(false);
                }}
                className={`rounded-xl border px-4 py-3 font-bold transition ${
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
                className={`rounded-xl border px-4 py-3 font-bold transition ${
                  tileUnit === "cm"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                Centimeters
              </button>

            </div>
          </div>

          {/* Tile Size */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-800">
              {surfaceType === "floor"
                ? "Common Floor Tile Sizes"
                : "Common Wall Tile Sizes"}
            </label>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">

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
                    className={`rounded-xl border px-2 py-3 text-sm font-bold transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
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

            {/* Custom Tile Size */}
            <div className="mt-3">

              <p className="mb-2 text-xs font-medium text-slate-500">
                Or enter a custom tile size:
              </p>

              <div className="grid grid-cols-2 gap-3">

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
          </div>

          {/* Boxes + Waste */}
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
                  setTilesPerBox(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                className={inputClass}
              />

              <p className="mt-2 text-xs text-slate-500">
                Check your tile carton for the exact number.
              </p>

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
                className={selectClass}
              >
                <option value="0">
                  0% — Exact
                </option>

                <option value="5">
                  5% — Simple layout
                </option>

                <option value="10">
                  10% — Recommended
                </option>

                <option value="15">
                  15% — Diagonal / complex
                </option>
              </select>

            </div>
          </div>

          {/* Global Currency + Price */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-bold text-slate-800">
              Tile Price
              <span className="ml-2 font-normal text-slate-400">
                Optional
              </span>
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[180px_1fr]">

              {/* Currency */}
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
                      {currency.code} —{" "}
                      {currency.symbol}
                    </option>
                  )
                )}
              </select>

              {/* Price */}
              <div className="relative">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">
                  {selectedCurrency.symbol}
                </span>

                <input
                  id="tile-price"
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
                  className={`${inputClass} pl-12`}
                />

              </div>

            </div>

            <p className="mt-2 text-xs text-slate-500">
              Select the currency used for your tile price.
              No automatic exchange-rate conversion is applied.
            </p>

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
              ? `${surfaceType === "floor" ? "Floor" : "Wall"} · ${surfaceLength} × ${surfaceWidth} ${areaUnit === "ft" ? "ft" : "m"} · ${tileLength} × ${tileWidth} ${tileUnit}`
              : "Your tile quantity will appear here."}
          </p>

        </div>

        {!result ? (

          <div className="rounded-2xl bg-slate-50 px-5 py-10 text-center">

            <p className="text-base font-medium text-slate-500">
              Enter your project and tile dimensions to calculate.
            </p>

          </div>

        ) : (

          <>

            {/* Main Result */}
            <div className="rounded-2xl bg-slate-900 p-6 text-center">

              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Tiles To Order
              </p>

              <p className="mt-2 text-4xl font-bold text-white sm:text-5xl">
                {result.tilesToOrder} Tiles
              </p>

              <p className="mt-2 text-base text-slate-400">
                {result.boxes} Boxes
              </p>

            </div>

            {/* Breakdown */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              <ResultCard
                label="Surface Area"
                value={`${formatNumber(
                  result.surfaceArea
                )} sq ft`}
              />

              <ResultCard
                label="Tile Area"
                value={`${formatNumber(
                  result.tileArea,
                  3
                )} sq ft`}
              />

              <ResultCard
                label="Exact Tiles"
                value={`${result.exactTilesRounded} pcs`}
              />

              <ResultCard
                label="Area With Waste"
                value={`${formatNumber(
                  result.areaWithWaste
                )} sq ft`}
              />

              <ResultCard
                label="Tiles With Waste"
                value={`${result.tilesWithWaste} pcs`}
              />

              <ResultCard
                label="Tiles Per Box"
                value={`${Number(
                  tilesPerBox
                )} pcs`}
              />

              <ResultCard
                label="Actual Coverage"
                value={`${formatNumber(
                  result.actualCoverage
                )} sq ft`}
              />

              <ResultCard
                label="Waste Tiles"
                value={`${result.wasteTiles} pcs`}
              />

              <ResultCard
                label="Box Rounding Extra"
                value={`${result.boxRoundingExtra} pcs`}
              />

              {result.estimatedCost !== null && (
                <ResultCard
                  label={`Estimated Cost (${currencyCode})`}
                  value={formatCurrency(
                    result.estimatedCost,
                    selectedCurrency
                  )}
                />
              )}

            </div>

            {/* Summary */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

              <h3 className="text-lg font-bold text-slate-900">
                Calculation Summary
              </h3>

              <div className="mt-3 space-y-2 text-sm leading-6 text-slate-700">

                <p>
                  Surface area:{" "}
                  <strong>
                    {formatNumber(
                      result.surfaceArea
                    )}{" "}
                    sq ft
                  </strong>
                </p>

                <p>
                  Tile area:{" "}
                  <strong>
                    {formatNumber(
                      result.tileArea,
                      3
                    )}{" "}
                    sq ft
                  </strong>
                </p>

                <p>
                  Waste allowance:{" "}
                  <strong>
                    {waste}%
                  </strong>
                </p>

                <p>
                  Tiles to order:{" "}
                  <strong>
                    {result.tilesToOrder} tiles
                  </strong>
                </p>

                <p>
                  Boxes required:{" "}
                  <strong>
                    {result.boxes} boxes
                  </strong>
                </p>

                {result.estimatedCost !== null && (
                  <p>
                    Estimated material cost:{" "}
                    <strong>
                      {formatCurrency(
                        result.estimatedCost,
                        selectedCurrency
                      )}
                    </strong>
                  </p>
                )}

              </div>
            </div>

          </>
        )}
      </section>

      {/* Note */}
      <p className="mt-6 text-xs leading-5 text-slate-500">
        This calculator provides an estimate for planning and
        material purchasing. Actual tile requirements may vary
        because of room shape, cuts, layout pattern, damaged
        tiles, grout joints and installation conditions.
      </p>

    </main>
  );
}
