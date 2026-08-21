"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import CalculatorHero from "../../components/CalculatorHero";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  AED: "AED",
  AUD: "A$",
  CAD: "C$",
};

export default function BrickCalculator() {
  // =========================================================
  // WALL
  // =========================================================

  const [wallLength, setWallLength] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [quantity, setQuantity] = useState("1");

  // =========================================================
  // DOOR
  // =========================================================

  const [doorOpen, setDoorOpen] = useState(false);
  const [doorQuantity, setDoorQuantity] = useState("0");
  const [doorWidth, setDoorWidth] = useState("3");
  const [doorHeight, setDoorHeight] = useState("7");

  // =========================================================
  // WINDOW
  // =========================================================

  const [windowOpen, setWindowOpen] = useState(false);
  const [windowQuantity, setWindowQuantity] = useState("0");
  const [windowWidth, setWindowWidth] = useState("4");
  const [windowHeight, setWindowHeight] = useState("4");

  // =========================================================
  // BRICK SETTINGS
  // =========================================================

  const [brickSettingsOpen, setBrickSettingsOpen] =
    useState(false);

  const [brickLength, setBrickLength] =
    useState("8");

  const [brickHeight, setBrickHeight] =
    useState("2.25");

  const [mortarJoint, setMortarJoint] =
    useState("0.375");

  const [waste, setWaste] =
    useState("10");

  const [price, setPrice] =
    useState("0.85");

  const [currency, setCurrency] =
    useState("USD");

  const currencySymbol =
    CURRENCY_SYMBOLS[currency] || "$";

  // =========================================================
  // CALCULATION
  // =========================================================

  const result = useMemo(() => {
    const length =
      Number(wallLength) || 0;

    const height =
      Number(wallHeight) || 0;

    const walls =
      Math.max(1, Number(quantity) || 1);

    const rawWallArea =
      length * height * walls;

    // -------------------------
    // Door area
    // -------------------------

    const doors =
      Math.max(0, Number(doorQuantity) || 0);

    const dWidth =
      Math.max(0, Number(doorWidth) || 0);

    const dHeight =
      Math.max(0, Number(doorHeight) || 0);

    const doorArea =
      doors * dWidth * dHeight;

    // -------------------------
    // Window area
    // -------------------------

    const windows =
      Math.max(0, Number(windowQuantity) || 0);

    const wWidth =
      Math.max(0, Number(windowWidth) || 0);

    const wHeight =
      Math.max(0, Number(windowHeight) || 0);

    const windowArea =
      windows * wWidth * wHeight;

    // -------------------------
    // Net wall area
    // -------------------------

    const openingsArea =
      doorArea + windowArea;

    const wallArea =
      Math.max(
        0,
        rawWallArea - openingsArea
      );

    // -------------------------
    // Brick dimensions
    // -------------------------

    const bLength =
      Math.max(
        0,
        Number(brickLength) || 0
      );

    const bHeight =
      Math.max(
        0,
        Number(brickHeight) || 0
      );

    const joint =
      Math.max(
        0,
        Number(mortarJoint) || 0
      );

    // Effective brick size
    const effectiveLength =
      bLength + joint;

    const effectiveHeight =
      bHeight + joint;

    const effectiveBrickArea =
      effectiveLength *
      effectiveHeight;

    const effectiveBrickAreaSqFt =
      effectiveBrickArea / 144;

    // -------------------------
    // Bricks
    // -------------------------

    const bricksPerSqFt =
      effectiveBrickAreaSqFt > 0
        ? 1 / effectiveBrickAreaSqFt
        : 0;

    const baseBricks =
      bricksPerSqFt > 0
        ? wallArea * bricksPerSqFt
        : 0;

    const wastePercent =
      Math.max(
        0,
        Number(waste) || 0
      );

    const wasteBricks =
      baseBricks *
      (wastePercent / 100);

    const totalBricks =
      Math.ceil(
        baseBricks + wasteBricks
      );

    // -------------------------
    // Cost
    // -------------------------

    const brickPrice =
      Math.max(
        0,
        Number(price) || 0
      );

    const cost =
      totalBricks * brickPrice;

    return {
      rawWallArea,
      doorArea,
      windowArea,
      openingsArea,
      wallArea,
      baseBricks,
      wasteBricks,
      totalBricks,
      cost,
      bricksPerSqFt,
    };
  }, [
    wallLength,
    wallHeight,
    quantity,

    doorQuantity,
    doorWidth,
    doorHeight,

    windowQuantity,
    windowWidth,
    windowHeight,

    brickLength,
    brickHeight,
    mortarJoint,
    waste,
    price,
  ]);

  // =========================================================
  // STYLES
  // =========================================================

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-sm font-semibold text-slate-700";

  const unitClass =
    "flex h-12 items-center border-l border-slate-200 px-4 text-sm font-semibold text-blue-700";

  // =========================================================
  // UI
  // =========================================================

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-10">

        <Breadcrumb current="Brick Calculator" />

        <CalculatorHero
          title="Brick"
          highlight="Calculator"
          description="Calculate the number of bricks required for a wall, including openings, mortar joints, waste and estimated cost."
        />

        <div className="mx-auto mt-6 max-w-xl">

          {/* =================================================
              BRICK PREVIEW
          ================================================= */}

          <section className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Brick Dimensions
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Standard brick size with mortar joint.
              </p>

            </div>

            <div className="bg-gradient-to-b from-slate-50 to-blue-50 px-4 py-6">

              <div className="relative mx-auto flex h-56 max-w-md items-center justify-center">

                <svg
                  viewBox="0 0 500 260"
                  className="h-full w-full"
                  role="img"
                  aria-label="Brick dimension diagram"
                >

                  <ellipse
                    cx="250"
                    cy="218"
                    rx="170"
                    ry="18"
                    fill="#dbeafe"
                  />

                  <rect
                    x="115"
                    y="85"
                    width="270"
                    height="85"
                    rx="6"
                    fill="#d96b45"
                    stroke="#9f3f25"
                    strokeWidth="3"
                  />

                  <line
                    x1="205"
                    y1="85"
                    x2="205"
                    y2="170"
                    stroke="#b44e31"
                    strokeWidth="3"
                  />

                  <line
                    x1="295"
                    y1="85"
                    x2="295"
                    y2="170"
                    stroke="#b44e31"
                    strokeWidth="3"
                  />

                  <line
                    x1="125"
                    y1="95"
                    x2="375"
                    y2="95"
                    stroke="#ef9a78"
                    strokeWidth="3"
                  />

                  <line
                    x1="115"
                    y1="58"
                    x2="385"
                    y2="58"
                    stroke="#2563eb"
                    strokeWidth="4"
                  />

                  <polygon
                    points="115,58 130,49 130,67"
                    fill="#2563eb"
                  />

                  <polygon
                    points="385,58 370,49 370,67"
                    fill="#2563eb"
                  />

                  <text
                    x="250"
                    y="43"
                    textAnchor="middle"
                    fill="#1d4ed8"
                    fontSize="18"
                    fontWeight="700"
                  >
                    Length
                  </text>

                  <line
                    x1="420"
                    y1="85"
                    x2="420"
                    y2="170"
                    stroke="#2563eb"
                    strokeWidth="4"
                  />

                  <polygon
                    points="420,85 411,100 429,100"
                    fill="#2563eb"
                  />

                  <polygon
                    points="420,170 411,155 429,155"
                    fill="#2563eb"
                  />

                  <text
                    x="440"
                    y="132"
                    fill="#1d4ed8"
                    fontSize="17"
                    fontWeight="700"
                  >
                    Height
                  </text>

                  <line
                    x1="115"
                    y1="190"
                    x2="145"
                    y2="190"
                    stroke="#64748b"
                    strokeWidth="5"
                  />

                  <line
                    x1="145"
                    y1="190"
                    x2="175"
                    y2="190"
                    stroke="#cbd5e1"
                    strokeWidth="5"
                    strokeDasharray="4 5"
                  />

                  <text
                    x="250"
                    y="215"
                    textAnchor="middle"
                    fill="#475569"
                    fontSize="16"
                    fontWeight="600"
                  >
                    Mortar joint included
                  </text>

                </svg>

              </div>

              <div className="mx-auto mt-2 max-w-sm rounded-xl bg-white px-4 py-3 text-center shadow-sm">

                <p className="text-sm text-slate-500">
                  Standard brick
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {brickLength || "8"} ×{" "}
                  {brickHeight || "2.25"} inches
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              MAIN CALCULATOR
          ================================================= */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* =================================================
                WALL DIMENSIONS
            ================================================= */}

            <div className="p-5 sm:p-7">

              <div className="mb-6">

                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Wall Dimensions
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Enter the dimensions of the wall you want to build.
                </p>

              </div>

              {/* Wall Length */}

              <div className="mb-4">

                <label className={labelClass}>
                  Wall Length
                </label>

                <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    placeholder="Enter wall length"
                    value={wallLength}
                    onChange={(e) =>
                      setWallLength(e.target.value)
                    }
                    className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none"
                  />

                  <div className={unitClass}>
                    ft
                  </div>

                </div>

              </div>

              {/* Wall Height */}

              <div className="mb-4">

                <label className={labelClass}>
                  Wall Height
                </label>

                <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                  <input
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    placeholder="Enter wall height"
                    value={wallHeight}
                    onChange={(e) =>
                      setWallHeight(e.target.value)
                    }
                    className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none"
                  />

                  <div className={unitClass}>
                    ft
                  </div>

                </div>

              </div>

              {/* Quantity */}

              <div>

                <label className={labelClass}>
                  Quantity
                </label>

                <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(e.target.value)
                    }
                    className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none"
                  />

                  <div className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                    walls
                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                DOOR & WINDOW ACCORDION
            ================================================= */}

            <div className="border-t border-slate-100 bg-slate-50/60">

              <button
                type="button"
                onClick={() =>
                  setDoorOpen(!doorOpen)
                }
                className="flex w-full items-center justify-between px-5 py-5 text-left sm:px-7"
              >

                <div>

                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    Door & Window Openings
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Subtract doors and windows from wall area.
                  </p>

                </div>

                <span className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl font-semibold text-slate-600 shadow-sm">
                  {doorOpen ? "−" : "+"}
                </span>

              </button>

              {doorOpen && (

                <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-7">

                  {/* =================================================
                      DOOR ACCORDION
                  ================================================= */}

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

                    <button
                      type="button"
                      onClick={() =>
                        setDoorOpen(!doorOpen)
                      }
                      className="hidden"
                    />

                    <div className="border-b border-slate-100 px-5 py-4">

                      <h3 className="text-lg font-bold text-slate-900">
                        Door
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Enter the number and size of doors.
                      </p>

                    </div>

                    <div className="p-5">

                      {/* Door Quantity */}

                      <div className="mb-4">

                        <label className={labelClass}>
                          Quantity
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="1"
                          inputMode="numeric"
                          value={doorQuantity}
                          onChange={(e) =>
                            setDoorQuantity(
                              e.target.value
                            )
                          }
                          className={inputClass}
                        />

                      </div>

                      <div className="grid grid-cols-2 gap-3">

                        {/* Door Width */}

                        <div>

                          <label className={labelClass}>
                            Width
                          </label>

                          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={doorWidth}
                              onChange={(e) =>
                                setDoorWidth(
                                  e.target.value
                                )
                              }
                              className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                            />

                            <div className="flex h-12 items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                              ft
                            </div>

                          </div>

                        </div>

                        {/* Door Height */}

                        <div>

                          <label className={labelClass}>
                            Height
                          </label>

                          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={doorHeight}
                              onChange={(e) =>
                                setDoorHeight(
                                  e.target.value
                                )
                              }
                              className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                            />

                            <div className="flex h-12 items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                              ft
                            </div>

                          </div>

                        </div>

                      </div>

                      <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">

                        Door opening area:{" "}

                        <span className="font-semibold text-slate-900">
                          {result.doorArea.toFixed(2)} sq ft
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* =================================================
                      WINDOW ACCORDION
                  ================================================= */}

                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">

                    <button
                      type="button"
                      onClick={() =>
                        setWindowOpen(!windowOpen)
                      }
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >

                      <div>

                        <h3 className="text-lg font-bold text-slate-900">
                          Window
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Enter the number and size of windows.
                        </p>

                      </div>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-lg font-semibold text-slate-600">
                        {windowOpen ? "−" : "+"}
                      </span>

                    </button>

                    {windowOpen && (

                      <div className="border-t border-slate-100 p-5">

                        {/* Window Quantity */}

                        <div className="mb-4">

                          <label className={labelClass}>
                            Quantity
                          </label>

                          <input
                            type="number"
                            min="0"
                            step="1"
                            inputMode="numeric"
                            value={windowQuantity}
                            onChange={(e) =>
                              setWindowQuantity(
                                e.target.value
                              )
                            }
                            className={inputClass}
                          />

                        </div>

                        <div className="grid grid-cols-2 gap-3">

                          {/* Window Width */}

                          <div>

                            <label className={labelClass}>
                              Width
                            </label>

                            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                              <input
                                type="number"
                                min="0"
                                step="any"
                                value={windowWidth}
                                onChange={(e) =>
                                  setWindowWidth(
                                    e.target.value
                                  )
                                }
                                className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                              />

                              <div className="flex h-12 items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                                ft
                              </div>

                            </div>

                          </div>

                          {/* Window Height */}

                          <div>

                            <label className={labelClass}>
                              Height
                            </label>

                            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                              <input
                                type="number"
                                min="0"
                                step="any"
                                value={windowHeight}
                                onChange={(e) =>
                                  setWindowHeight(
                                    e.target.value
                                  )
                                }
                                className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                              />

                              <div className="flex h-12 items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                                ft
                              </div>

                            </div>

                          </div>

                        </div>

                        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-500">

                          Window opening area:{" "}

                          <span className="font-semibold text-slate-900">
                            {result.windowArea.toFixed(2)} sq ft
                          </span>

                        </div>

                      </div>

                    )}

                  </div>

                </div>

              )}

            </div>

            {/* =================================================
                BRICK SETTINGS ACCORDION
            ================================================= */}

            <div className="border-t border-slate-100">

              <button
                type="button"
                onClick={() =>
                  setBrickSettingsOpen(
                    !brickSettingsOpen
                  )
                }
                className="flex w-full items-center justify-between bg-slate-50/60 px-5 py-5 text-left sm:px-7"
              >

                <div>

                  <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    Brick Settings
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Brick size, mortar joint, waste and price.
                  </p>

                </div>

                <span className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl font-semibold text-slate-600 shadow-sm">
                  {brickSettingsOpen ? "−" : "+"}
                </span>

              </button>

              {brickSettingsOpen && (

                <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:p-7">

                  {/* Brick Length */}

                  <div className="mb-4">

                    <label className={labelClass}>
                      Brick Length
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={brickLength}
                        onChange={(e) =>
                          setBrickLength(
                            e.target.value
                          )
                        }
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <div className={unitClass}>
                        in
                      </div>

                    </div>

                  </div>

                  {/* Brick Height */}

                  <div className="mb-4">

                    <label className={labelClass}>
                      Brick Height
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={brickHeight}
                        onChange={(e) =>
                          setBrickHeight(
                            e.target.value
                          )
                        }
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <div className={unitClass}>
                        in
                      </div>

                    </div>

                  </div>

                  {/* Mortar */}

                  <div className="mb-4">

                    <label className={labelClass}>
                      Mortar Joint
                    </label>

                    <select
                      value={mortarJoint}
                      onChange={(e) =>
                        setMortarJoint(
                          e.target.value
                        )
                      }
                      className={inputClass}
                    >

                      <option value="0.25">
                        1/4 inch
                      </option>

                      <option value="0.375">
                        3/8 inch — Standard
                      </option>

                      <option value="0.5">
                        1/2 inch
                      </option>

                      <option value="0.625">
                        5/8 inch
                      </option>

                    </select>

                  </div>

                  {/* Waste */}

                  <div className="mb-4">

                    <label className={labelClass}>
                      Waste
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={waste}
                        onChange={(e) =>
                          setWaste(
                            e.target.value
                          )
                        }
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <div className="flex h-12 items-center border-l border-slate-200 px-4 text-sm font-semibold text-slate-500">
                        %
                      </div>

                    </div>

                  </div>

                  {/* Currency */}

                  <div className="mb-4">

                    <label className={labelClass}>
                      Currency
                    </label>

                    <select
                      value={currency}
                      onChange={(e) =>
                        setCurrency(
                          e.target.value
                        )
                      }
                      className={inputClass}
                    >

                      <option value="USD">
                        🇺🇸 US Dollar ($)
                      </option>

                      <option value="INR">
                        🇮🇳 Indian Rupee (₹)
                      </option>

                      <option value="EUR">
                        🇪🇺 Euro (€)
                      </option>

                      <option value="GBP">
                        🇬🇧 British Pound (£)
                      </option>

                      <option value="AED">
                        🇦🇪 UAE Dirham (AED)
                      </option>

                      <option value="AUD">
                        🇦🇺 Australian Dollar (A$)
                      </option>

                      <option value="CAD">
                        🇨🇦 Canadian Dollar (C$)
                      </option>

                    </select>

                  </div>

                  {/* Price */}

                  <div>

                    <label className={labelClass}>
                      Price per Brick
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <div className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
                        {currencySymbol}
                      </div>

                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={price}
                        onChange={(e) =>
                          setPrice(
                            e.target.value
                          )
                        }
                        placeholder="0.00"
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <div className="flex h-12 items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                        / brick
                      </div>

                    </div>

                  </div>

                </div>

              )}

            </div>

            {/* =================================================
                RESULT
            ================================================= */}

            <div className="border-t border-slate-100 p-5 sm:p-7">

              <h2 className="mb-5 text-2xl font-bold text-slate-900">
                Calculation Result
              </h2>

              {/* Wall Area */}

              <div className="mb-4 rounded-2xl bg-blue-50 p-5">

                <p className="text-sm font-medium text-slate-500">
                  Net Wall Area
                </p>

                <p className="mt-1 text-3xl font-bold text-blue-600">
                  {result.wallArea.toFixed(2)} sq ft
                </p>

              </div>

              <div className="grid grid-cols-2 gap-3">

                {/* Total Bricks */}

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Total Bricks
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {result.totalBricks.toLocaleString()}
                  </p>

                </div>

                {/* Bricks per sqft */}

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Bricks / sq ft
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {result.bricksPerSqFt.toFixed(2)}
                  </p>

                </div>

                {/* Base Bricks */}

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Base Bricks
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {Math.ceil(
                      result.baseBricks
                    ).toLocaleString()}
                  </p>

                </div>

                {/* Waste */}

                <div className="rounded-2xl bg-slate-50 p-4">

                  <p className="text-sm text-slate-500">
                    Waste Bricks
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {Math.ceil(
                      result.wasteBricks
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

              {/* Openings summary */}

              {(result.doorArea > 0 ||
                result.windowArea > 0) && (

                <div className="mt-4 rounded-2xl bg-amber-50 p-4">

                  <p className="text-sm font-medium text-amber-700">
                    Openings Deducted
                  </p>

                  <p className="mt-1 text-lg font-bold text-amber-900">
                    {result.openingsArea.toFixed(2)} sq ft
                  </p>

                </div>

              )}

              {/* Cost */}

              <div className="mt-4 rounded-2xl bg-green-50 p-5">

                <p className="text-sm font-medium text-slate-500">
                  Estimated Material Cost
                </p>

                <p className="mt-1 text-3xl font-bold text-green-700">
                  {currencySymbol}
                  {result.cost.toFixed(2)}
                </p>

              </div>

            </div>

            {/* =================================================
                NOTE
            ================================================= */}

            <div className="border-t border-slate-100 px-5 py-4 sm:px-7">

              <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                Brick quantity is an estimate based on net wall
                area, brick face dimensions, mortar joint and
                selected waste percentage. Door and window
                openings are deducted from the wall area.
                Actual requirements may vary depending on
                construction method and site conditions.
              </p>

            </div>

          </section>

          {/* =================================================
              TIPS
          ================================================= */}

          <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Brick Calculator Tips
            </h3>

            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700">

              <li>
                Add 5–10% extra bricks for breakage and cutting.
              </li>

              <li>
                Mortar joints affect the number of bricks required.
              </li>

              <li>
                Door and window openings are deducted automatically.
              </li>

              <li>
                Brick dimensions can vary by region and manufacturer.
              </li>

            </ul>

          </section>

        </div>

      </div>

    </main>
  );
}
