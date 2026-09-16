"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";

type SurfaceType = "floor" | "wall";
type ProjectUnit = "ft" | "m";
type TileUnit = "in" | "cm";

type Currency = {
  code: string;
  symbol: string;
  name: string;
};

const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
];

/*
 * Common US / Global tile sizes.
 * Quick-size buttons always represent inches.
 * Custom sizes can be entered in inches or centimeters.
 */
const FLOOR_TILE_SIZES = [
  [12, 12],
  [12, 24],
  [18, 18],
  [24, 24],
  [24, 48],
  [36, 36],
] as const;

const WALL_TILE_SIZES = [
  [4, 4],
  [3, 6],
  [4, 12],
  [6, 6],
  [6, 24],
  [12, 24],
] as const;

function toFeet(value: number, unit: ProjectUnit): number {
  return unit === "m" ? value * 3.280839895013123 : value;
}

function tileToInches(value: number, unit: TileUnit): number {
  return unit === "cm" ? value / 2.54 : value;
}

function formatNumber(
  value: number,
  decimals = 2
): string {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export default function TileCalculator() {
  const [surfaceType, setSurfaceType] =
    useState<SurfaceType>("floor");

  const [roomLength, setRoomLength] = useState("12");
  const [roomWidth, setRoomWidth] = useState("10");
  const [roomUnit, setRoomUnit] =
    useState<ProjectUnit>("ft");

  const [tileLength, setTileLength] = useState("24");
  const [tileWidth, setTileWidth] = useState("24");
  const [tileUnit, setTileUnit] =
    useState<TileUnit>("in");

  const [tilesPerBox, setTilesPerBox] =
    useState("4");

  const [waste, setWaste] = useState("10");

  const [currencyCode, setCurrencyCode] =
    useState("USD");

  const [boxPrice, setBoxPrice] = useState("");

  const [calculated, setCalculated] =
    useState(false);

  const selectedCurrency = useMemo(
    () =>
      CURRENCIES.find(
        (currency) =>
          currency.code === currencyCode
      ) ?? CURRENCIES[0],
    [currencyCode]
  );

  const availableTileSizes =
    surfaceType === "floor"
      ? FLOOR_TILE_SIZES
      : WALL_TILE_SIZES;

  const result = useMemo(() => {
    const length = Number(roomLength);
    const width = Number(roomWidth);

    const tileL = Number(tileLength);
    const tileW = Number(tileWidth);

    const perBox = Number(tilesPerBox);
    const wastePercent = Number(waste);

    if (
      !Number.isFinite(length) ||
      !Number.isFinite(width) ||
      length <= 0 ||
      width <= 0 ||
      !Number.isFinite(tileL) ||
      !Number.isFinite(tileW) ||
      tileL <= 0 ||
      tileW <= 0 ||
      !Number.isFinite(perBox) ||
      perBox <= 0
    ) {
      return null;
    }

    /*
     * Project area
     */
    const lengthFt = toFeet(
      length,
      roomUnit
    );

    const widthFt = toFeet(
      width,
      roomUnit
    );

    const surfaceArea =
      lengthFt * widthFt;

    /*
     * Tile area
     */
    const tileLengthIn =
      tileToInches(
        tileL,
        tileUnit
      );

    const tileWidthIn =
      tileToInches(
        tileW,
        tileUnit
      );

    const tileAreaSqFt =
      (tileLengthIn * tileWidthIn) /
      144;

    if (tileAreaSqFt <= 0) {
      return null;
    }

    /*
     * Exact tile quantity
     */
    const exactTiles =
      surfaceArea / tileAreaSqFt;

    /*
     * Waste
     */
    const safeWaste =
      Number.isFinite(wastePercent) &&
      wastePercent >= 0
        ? wastePercent
        : 0;

    const areaWithWaste =
      surfaceArea *
      (1 + safeWaste / 100);

    const tilesWithWaste =
      Math.ceil(
        exactTiles *
          (1 + safeWaste / 100)
      );

    /*
     * Full boxes
     */
    const boxesRequired =
      Math.ceil(
        tilesWithWaste / perBox
      );

    /*
     * Actual tiles purchased
     */
    const tilesToOrder =
      boxesRequired * perBox;

    /*
     * Actual coverage
     */
    const actualCoverage =
      tilesToOrder * tileAreaSqFt;

    /*
     * Difference caused by box rounding
     */
    const boxRoundingExtra =
      Math.max(
        0,
        tilesToOrder - tilesWithWaste
      );

    /*
     * Tiles added because of waste
     */
    const wasteTiles =
      Math.max(
        0,
        tilesWithWaste -
          Math.ceil(exactTiles)
      );

    /*
     * Optional material cost
     */
    const price = Number(boxPrice);

    const estimatedCost =
      Number.isFinite(price) &&
      price > 0
        ? boxesRequired * price
        : null;

    return {
      surfaceArea,
      tileAreaSqFt,
      exactTiles,
      areaWithWaste,
      tilesWithWaste,
      boxesRequired,
      tilesToOrder,
      actualCoverage,
      boxRoundingExtra,
      wasteTiles,
      estimatedCost,
      perBox,
      safeWaste,
    };
  }, [
    roomLength,
    roomWidth,
    roomUnit,
    tileLength,
    tileWidth,
    tileUnit,
    tilesPerBox,
    waste,
    boxPrice,
  ]);

  function selectTileSize(
    length: number,
    width: number
  ) {
    setTileLength(String(length));
    setTileWidth(String(width));

    /*
     * Quick sizes are always inches.
     */
    setTileUnit("in");

    setCalculated(false);
  }

  function handleSurfaceChange(
    type: SurfaceType
  ) {
    setSurfaceType(type);

    if (type === "floor") {
      setTileLength("24");
      setTileWidth("24");
      setTileUnit("in");
    } else {
      setTileLength("4");
      setTileWidth("12");
      setTileUnit("in");
    }

    setCalculated(false);
  }

  function handleCalculate() {
    if (result) {
      setCalculated(true);
    }
  }

  function formatCurrency(
    value: number
  ): string {
    try {
      return new Intl.NumberFormat(
        "en-US",
        {
          style: "currency",
          currency:
            selectedCurrency.code,
          maximumFractionDigits: 2,
        }
      ).format(value);
    } catch {
      return `${selectedCurrency.symbol}${formatNumber(
        value
      )}`;
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">

      {/* Breadcrumb */}
      <Breadcrumb current="Tile Calculator" />

      {/* Page Heading */}
      <section className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Tile Calculator
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Calculate how many tiles and boxes you need
          for floors or walls, including waste and
          optional material cost.
        </p>
      </section>

      {/* Hero Image */}
      <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg">

        {/* Dark Calculator Header */}
        <div className="bg-slate-900 px-4 py-4 text-white sm:px-5">
          <div className="flex items-center justify-between gap-3">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                CornerSpan
              </p>

              <h2 className="mt-0.5 text-lg font-bold sm:text-xl">
                TILE QUANTITY CALCULATOR
              </h2>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-right">
              <p className="text-[9px] uppercase tracking-wide text-slate-400">
                Surface
              </p>

              <p className="text-xs font-semibold">
                {surfaceType === "floor"
                  ? "Floor"
                  : "Wall"}
              </p>
            </div>

          </div>
        </div>

        {/* Calculator Body */}
        <div className="bg-slate-100 p-3.5 sm:p-5">

          {/* Surface Type */}
          <div className="mb-4">

            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              Surface Type
            </label>

            <div className="grid grid-cols-2 gap-2">

              <button
                type="button"
                onClick={() =>
                  handleSurfaceChange(
                    "floor"
                  )
                }
                className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                  surfaceType === "floor"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Floor Tiles
              </button>

              <button
                type="button"
                onClick={() =>
                  handleSurfaceChange(
                    "wall"
                  )
                }
                className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                  surfaceType === "wall"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                Wall Tiles
              </button>

            </div>
          </div>

          {/* Surface Dimensions */}
          <div className="mb-4">

            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              {surfaceType === "wall"
                ? "Wall Height × Width"
                : "Room / Surface Length × Width"}
            </label>

            <div className="grid grid-cols-[1fr_1fr_82px] gap-2">

              <input
                type="number"
                min="0"
                step="any"
                value={roomLength}
                onChange={(e) => {
                  setRoomLength(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                placeholder={
                  surfaceType === "wall"
                    ? "Height"
                    : "Length"
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900"
              />

              <input
                type="number"
                min="0"
                step="any"
                value={roomWidth}
                onChange={(e) => {
                  setRoomWidth(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                placeholder="Width"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900"
              />

              <select
                value={roomUnit}
                onChange={(e) => {
                  setRoomUnit(
                    e.target
                      .value as ProjectUnit
                  );
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-2 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-slate-900"
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

          {/* Tile Size */}
          <div className="mb-4">

            <div className="mb-1.5 flex items-center justify-between gap-2">

              <label className="text-xs font-semibold text-slate-700">
                Tile Size
              </label>

              <div className="flex overflow-hidden rounded-lg border border-slate-300 bg-white">

                <button
                  type="button"
                  onClick={() => {
                    setTileUnit("in");
                    setCalculated(false);
                  }}
                  className={`px-2.5 py-1 text-[10px] font-semibold ${
                    tileUnit === "in"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600"
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
                  className={`px-2.5 py-1 text-[10px] font-semibold ${
                    tileUnit === "cm"
                      ? "bg-slate-900 text-white"
                      : "text-slate-600"
                  }`}
                >
                  cm
                </button>

              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">

              <input
                type="number"
                min="0"
                step="any"
                value={tileLength}
                onChange={(e) => {
                  setTileLength(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                placeholder={
                  surfaceType === "wall"
                    ? "Height"
                    : "Length"
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900"
              />

              <input
                type="number"
                min="0"
                step="any"
                value={tileWidth}
                onChange={(e) => {
                  setTileWidth(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                placeholder="Width"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900"
              />

            </div>
          </div>

          {/* Common Tile Sizes */}
          <div className="mb-4">

            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              Common{" "}
              {surfaceType === "floor"
                ? "Floor"
                : "Wall"}{" "}
              Tile Sizes
            </label>

            <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">

              {availableTileSizes.map(
                ([length, width]) => {

                  const active =
                    tileUnit === "in" &&
                    Number(
                      tileLength
                    ) === length &&
                    Number(
                      tileWidth
                    ) === width;

                  return (
                    <button
                      key={`${length}-${width}`}
                      type="button"
                      onClick={() =>
                        selectTileSize(
                          length,
                          width
                        )
                      }
                      className={`rounded-lg border px-1 py-2 text-[11px] font-semibold transition ${
                        active
                          ? "border-slate-900 bg-slate-900 text-white"
                          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {length}×{width}
                    </button>
                  );
                }
              )}

            </div>
          </div>

          {/* Tiles per Box + Waste */}
          <div className="mb-4 grid grid-cols-2 gap-2">

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Tiles per Box
              </label>

              <input
                type="number"
                min="1"
                step="1"
                value={tilesPerBox}
                onChange={(e) => {
                  setTilesPerBox(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Waste
              </label>

              <select
                value={waste}
                onChange={(e) => {
                  setWaste(
                    e.target.value
                  );
                  setCalculated(false);
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-slate-900"
              >
                <option value="0">
                  0%
                </option>

                <option value="5">
                  5%
                </option>

                <option value="10">
                  10%
                </option>

                <option value="15">
                  15%
                </option>

                <option value="20">
                  20%
                </option>
              </select>
            </div>

          </div>

          {/* Currency + Price */}
          <div className="mb-4 grid grid-cols-2 gap-2">

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Currency
              </label>

              <select
                value={currencyCode}
                onChange={(e) =>
                  setCurrencyCode(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-slate-900"
              >
                {CURRENCIES.map(
                  (currency) => (
                    <option
                      key={
                        currency.code
                      }
                      value={
                        currency.code
                      }
                    >
                      {currency.code} —{" "}
                      {currency.symbol}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Price per Box
              </label>

              <div className="relative">

                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                  {
                    selectedCurrency.symbol
                  }
                </span>

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={boxPrice}
                  onChange={(e) => {
                    setBoxPrice(
                      e.target.value
                    );
                    setCalculated(false);
                  }}
                  placeholder="Optional"
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-8 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900"
                />

              </div>
            </div>

          </div>

          {/* Calculate Button */}
          <button
            type="button"
            onClick={handleCalculate}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99]"
          >
            Calculate Tile Quantity
          </button>

          {/* Results */}
          {calculated && result && (
            <div
              id="tile-results"
              className="mt-4 overflow-hidden rounded-2xl border border-slate-300 bg-white"
            >

              {/* Result Header */}
              <div className="border-b border-slate-200 bg-slate-50 px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                  Calculation Results
                </p>
              </div>

              {/* Main Results */}
              <div className="grid grid-cols-2 gap-2 p-3">

                <div className="rounded-xl bg-slate-900 p-3 text-white">

                  <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    Tiles to Order
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {formatNumber(
                      result.tilesToOrder,
                      0
                    )}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    tiles
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">

                  <p className="text-[10px] uppercase tracking-wide text-slate-500">
                    Boxes Required
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {formatNumber(
                      result.boxesRequired,
                      0
                    )}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-500">
                    boxes ×{" "}
                    {result.perBox}{" "}
                    tiles
                  </p>

                </div>

              </div>

              {/* Breakdown */}
              <div className="grid grid-cols-2 gap-2 px-3 pb-3 sm:grid-cols-3">

                <ResultItem
                  label="Surface Area"
                  value={`${formatNumber(
                    result.surfaceArea
                  )} ft²`}
                />

                <ResultItem
                  label="Tile Area"
                  value={`${formatNumber(
                    result.tileAreaSqFt,
                    3
                  )} ft²`}
                />

                <ResultItem
                  label="Exact Tiles"
                  value={formatNumber(
                    result.exactTiles,
                    1
                  )}
                />

                <ResultItem
                  label="Area + Waste"
                  value={`${formatNumber(
                    result.areaWithWaste
                  )} ft²`}
                />

                <ResultItem
                  label="Waste Tiles"
                  value={formatNumber(
                    result.wasteTiles,
                    0
                  )}
                />

                <ResultItem
                  label="Box Rounding Extra"
                  value={formatNumber(
                    result.boxRoundingExtra,
                    0
                  )}
                />

                <ResultItem
                  label="Actual Coverage"
                  value={`${formatNumber(
                    result.actualCoverage
                  )} ft²`}
                />

                <ResultItem
                  label="Waste Allowance"
                  value={`${formatNumber(
                    result.safeWaste,
                    0
                  )}%`}
                />

                {result.estimatedCost !==
                  null && (
                  <ResultItem
                    label="Estimated Cost"
                    value={formatCurrency(
                      result.estimatedCost
                    )}
                  />
                )}

              </div>

              {/* Summary */}
              <div className="mx-3 mb-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">

                <p className="text-xs leading-5 text-slate-600">

                  For a{" "}
                  <strong className="text-slate-900">
                    {formatNumber(
                      result.surfaceArea
                    )}{" "}
                    ft²
                  </strong>{" "}
                  {surfaceType} using{" "}
                  <strong className="text-slate-900">
                    {tileLength} ×{" "}
                    {tileWidth}{" "}
                    {tileUnit === "in"
                      ? "in"
                      : "cm"}
                  </strong>{" "}
                  tiles with{" "}
                  <strong className="text-slate-900">
                    {result.safeWaste}%
                    {" "}
                    waste
                  </strong>
                  , order{" "}
                  <strong className="text-slate-900">
                    {
                      result.tilesToOrder
                    }{" "}
                    tiles
                  </strong>{" "}
                  or{" "}
                  <strong className="text-slate-900">
                    {
                      result.boxesRequired
                    }{" "}
                    boxes
                  </strong>
                  .

                </p>

              </div>

            </div>
          )}

        </div>
      </section>

      {/* Tip */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs leading-5 text-slate-600">

        <strong className="text-slate-900">
          Tip:
        </strong>{" "}
        10% waste is a common starting point
        for many straight-layout tile projects.
        More waste may be needed for diagonal,
        herringbone, irregular layouts, or rooms
        with many cuts.

      </div>

    </main>
  );
}

function ResultItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2.5">

      <p className="text-[10px] font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-0.5 text-sm font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}
