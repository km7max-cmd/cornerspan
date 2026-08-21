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

type Opening = {
  quantity: string;
  width: string;
  height: string;
};

export default function BrickCalculator() {
  // =========================================================
  // WALL
  // =========================================================

  const [wallType, setWallType] = useState<"single" | "double">("single");

  const [wallLength, setWallLength] = useState("");
  const [wallHeight, setWallHeight] = useState("");
  const [wallQuantity, setWallQuantity] = useState("1");

  // =========================================================
  // OPENINGS
  // =========================================================

  const [door, setDoor] = useState<Opening>({
    quantity: "0",
    width: "3",
    height: "7",
  });

  const [window, setWindow] = useState<Opening>({
    quantity: "0",
    width: "4",
    height: "4",
  });

  // =========================================================
  // BRICK
  // =========================================================

  const [brickLength, setBrickLength] = useState("8");
  const [brickHeight, setBrickHeight] = useState("2.25");
  const [brickWidth, setBrickWidth] = useState("3.75");

  const [mortarJoint, setMortarJoint] = useState("0.375");

  // =========================================================
  // BRICKS / COST
  // =========================================================

  const [waste, setWaste] = useState("5");

  const [currency, setCurrency] = useState("USD");

  const [price, setPrice] = useState("0.85");

  // =========================================================
  // ACCORDIONS
  // =========================================================

  const [openSection, setOpenSection] = useState<
    "wall" | "openings" | "brick" | "required" | "cost" | null
  >("wall");

  const currencySymbol =
    CURRENCY_SYMBOLS[currency] || "$";

  // =========================================================
  // ACCORDION
  // =========================================================

  const toggleSection = (
    section: "wall" | "openings" | "brick" | "required" | "cost"
  ) => {
    setOpenSection((current) =>
      current === section ? null : section
    );
  };

  // =========================================================
  // CALCULATION
  // =========================================================

  const result = useMemo(() => {
    const length = Math.max(0, Number(wallLength) || 0);

    const height = Math.max(0, Number(wallHeight) || 0);

    const quantity = Math.max(
      1,
      Number(wallQuantity) || 1
    );

    const bLength = Math.max(
      0,
      Number(brickLength) || 0
    );

    const bHeight = Math.max(
      0,
      Number(brickHeight) || 0
    );

    const bWidth = Math.max(
      0,
      Number(brickWidth) || 0
    );

    const joint = Math.max(
      0,
      Number(mortarJoint) || 0
    );

    const wastePercent = Math.max(
      0,
      Number(waste) || 0
    );

    const brickPrice = Math.max(
      0,
      Number(price) || 0
    );

    // ---------------------------------------------------------
    // WALL AREA
    // ---------------------------------------------------------

    const grossWallArea =
      length * height * quantity;

    // ---------------------------------------------------------
    // DOOR AREA
    // ---------------------------------------------------------

    const doorQty = Math.max(
      0,
      Number(door.quantity) || 0
    );

    const doorWidth = Math.max(
      0,
      Number(door.width) || 0
    );

    const doorHeight = Math.max(
      0,
      Number(door.height) || 0
    );

    const doorArea =
      doorQty *
      doorWidth *
      doorHeight;

    // ---------------------------------------------------------
    // WINDOW AREA
    // ---------------------------------------------------------

    const windowQty = Math.max(
      0,
      Number(window.quantity) || 0
    );

    const windowWidth = Math.max(
      0,
      Number(window.width) || 0
    );

    const windowHeight = Math.max(
      0,
      Number(window.height) || 0
    );

    const windowArea =
      windowQty *
      windowWidth *
      windowHeight;

    // ---------------------------------------------------------
    // NET WALL AREA
    // ---------------------------------------------------------

    const openingArea =
      doorArea + windowArea;

    const netWallArea = Math.max(
      0,
      grossWallArea - openingArea
    );

    // ---------------------------------------------------------
    // EFFECTIVE BRICK FACE
    //
    // Brick length + mortar
    // Brick height + mortar
    // ---------------------------------------------------------

    const effectiveLength =
      bLength + joint;

    const effectiveHeight =
      bHeight + joint;

    const brickFaceAreaSqIn =
      effectiveLength *
      effectiveHeight;

    const brickFaceAreaSqFt =
      brickFaceAreaSqIn / 144;

    // ---------------------------------------------------------
    // BASE BRICKS
    // ---------------------------------------------------------

    let baseBricks =
      brickFaceAreaSqFt > 0
        ? netWallArea /
          brickFaceAreaSqFt
        : 0;

    // Double wall = approximately two brick faces
    if (wallType === "double") {
      baseBricks *= 2;
    }

    // ---------------------------------------------------------
    // WASTE
    // ---------------------------------------------------------

    const wasteBricks =
      baseBricks *
      (wastePercent / 100);

    const totalBricks =
      Math.ceil(
        baseBricks + wasteBricks
      );

    // ---------------------------------------------------------
    // COST
    // ---------------------------------------------------------

    const cost =
      totalBricks * brickPrice;

    // ---------------------------------------------------------
    // BRICKS PER SQ FT
    // ---------------------------------------------------------

    const bricksPerSqFt =
      brickFaceAreaSqFt > 0
        ? 1 / brickFaceAreaSqFt
        : 0;

    return {
      grossWallArea,
      doorArea,
      windowArea,
      openingArea,
      netWallArea,
      baseBricks,
      wasteBricks,
      totalBricks,
      cost,
      bricksPerSqFt,
      effectiveLength,
      effectiveHeight,
      bWidth,
    };
  }, [
    wallType,
    wallLength,
    wallHeight,
    wallQuantity,
    door,
    window,
    brickLength,
    brickHeight,
    brickWidth,
    mortarJoint,
    waste,
    price,
  ]);

  // =========================================================
  // CLEAR
  // =========================================================

  const clearAll = () => {
    setWallType("single");

    setWallLength("");
    setWallHeight("");
    setWallQuantity("1");

    setDoor({
      quantity: "0",
      width: "3",
      height: "7",
    });

    setWindow({
      quantity: "0",
      width: "4",
      height: "4",
    });

    setBrickLength("8");
    setBrickHeight("2.25");
    setBrickWidth("3.75");

    setMortarJoint("0.375");

    setWaste("5");

    setCurrency("USD");

    setPrice("0.85");

    setOpenSection("wall");
  };

  // =========================================================
  // SHARED CLASSES
  // =========================================================

  const inputClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const labelClass =
    "mb-1.5 block text-sm font-semibold text-slate-700";

  const unitClass =
    "flex h-12 items-center border-l border-slate-200 px-4 text-sm font-semibold text-blue-700";

  // =========================================================
  // SECTION HEADER
  // =========================================================

  const SectionHeader = ({
    id,
    title,
    description,
  }: {
    id: "wall" | "openings" | "brick" | "required" | "cost";
    title: string;
    description: string;
  }) => {
    const isOpen = openSection === id;

    return (
      <button
        type="button"
        onClick={() => toggleSection(id)}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
      >
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
            isOpen
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 sm:py-10">

        <Breadcrumb current="Brick Calculator" />

        <CalculatorHero
          title="Brick"
          highlight="Calculator"
          description="Calculate bricks required for walls with openings, mortar joints, waste and estimated material cost."
        />

        <div className="mx-auto mt-6 max-w-xl">

          {/* =================================================
              BRICK DIAGRAM
          ================================================= */}

          <section className="mb-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Brick Wall
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Wall dimensions and brick layout reference
              </p>

            </div>

            <div className="bg-gradient-to-b from-slate-50 to-blue-50 px-4 py-5">

              <svg
                viewBox="0 0 500 260"
                className="mx-auto h-auto w-full max-w-md"
                role="img"
                aria-label="Brick wall dimension diagram"
              >

                {/* Wall */}

                <rect
                  x="100"
                  y="70"
                  width="300"
                  height="125"
                  rx="5"
                  fill="#df7049"
                  stroke="#a84329"
                  strokeWidth="4"
                />

                {/* Horizontal mortar */}

                <line
                  x1="100"
                  y1="112"
                  x2="400"
                  y2="112"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                <line
                  x1="100"
                  y1="153"
                  x2="400"
                  y2="153"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                {/* Vertical joints */}

                <line
                  x1="175"
                  y1="70"
                  x2="175"
                  y2="112"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                <line
                  x1="250"
                  y1="70"
                  x2="250"
                  y2="112"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                <line
                  x1="325"
                  y1="70"
                  x2="325"
                  y2="112"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                <line
                  x1="140"
                  y1="112"
                  x2="140"
                  y2="153"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                <line
                  x1="215"
                  y1="112"
                  x2="215"
                  y2="153"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                <line
                  x1="290"
                  y1="112"
                  x2="290"
                  y2="153"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                <line
                  x1="365"
                  y1="112"
                  x2="365"
                  y2="153"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                <line
                  x1="175"
                  y1="153"
                  x2="175"
                  y2="195"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                <line
                  x1="250"
                  y1="153"
                  x2="250"
                  y2="195"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                <line
                  x1="325"
                  y1="153"
                  x2="325"
                  y2="195"
                  stroke="#b94e32"
                  strokeWidth="4"
                />

                {/* Length arrow */}

                <line
                  x1="100"
                  y1="35"
                  x2="400"
                  y2="35"
                  stroke="#2563eb"
                  strokeWidth="4"
                />

                <polygon
                  points="100,35 116,25 116,45"
                  fill="#2563eb"
                />

                <polygon
                  points="400,35 384,25 384,45"
                  fill="#2563eb"
                />

                <text
                  x="250"
                  y="25"
                  textAnchor="middle"
                  fill="#1d4ed8"
                  fontSize="18"
                  fontWeight="700"
                >
                  Wall Length
                </text>

                {/* Height arrow */}

                <line
                  x1="435"
                  y1="70"
                  x2="435"
                  y2="195"
                  stroke="#2563eb"
                  strokeWidth="4"
                />

                <polygon
                  points="435,70 425,86 445,86"
                  fill="#2563eb"
                />

                <polygon
                  points="435,195 425,179 445,179"
                  fill="#2563eb"
                />

                <text
                  x="455"
                  y="137"
                  fill="#1d4ed8"
                  fontSize="17"
                  fontWeight="700"
                  transform="rotate(90 455 137)"
                  textAnchor="middle"
                >
                  Wall Height
                </text>

              </svg>

              <div className="mx-auto mt-2 max-w-sm rounded-xl bg-white px-4 py-3 text-center shadow-sm">

                <p className="text-sm text-slate-500">
                  Standard brick
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {brickLength || "8"} ×{" "}
                  {brickHeight || "2.25"} ×{" "}
                  {brickWidth || "3.75"} in
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              MAIN ACCORDION
          ================================================= */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* =================================================
                WALL DETAILS
            ================================================= */}

            <div>

              <SectionHeader
                id="wall"
                title="Wall Details"
                description="Enter the size and type of wall."
              />

              {openSection === "wall" && (
                <div className="border-t border-slate-100 p-5 sm:px-7 sm:py-6">

                  {/* Wall Type */}

                  <div className="mb-6">

                    <label className={labelClass}>
                      Type of Wall
                    </label>

                    <div className="grid grid-cols-2 gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          setWallType("single")
                        }
                        className={`rounded-xl border p-4 text-left transition ${
                          wallType === "single"
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="font-semibold text-slate-900">
                          Single Wall
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          One brick layer
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setWallType("double")
                        }
                        className={`rounded-xl border p-4 text-left transition ${
                          wallType === "double"
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="font-semibold text-slate-900">
                          Double Wall
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          Two brick layers
                        </div>
                      </button>

                    </div>

                  </div>

                  {/* Length */}

                  <div className="mb-4">

                    <label className={labelClass}>
                      Wall Length
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <input
                        type="number"
                        min="0"
                        step="any"
                        inputMode="decimal"
                        value={wallLength}
                        onChange={(e) =>
                          setWallLength(e.target.value)
                        }
                        placeholder="Enter wall length"
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <span className={unitClass}>
                        ft
                      </span>

                    </div>

                  </div>

                  {/* Height */}

                  <div className="mb-4">

                    <label className={labelClass}>
                      Wall Height
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <input
                        type="number"
                        min="0"
                        step="any"
                        inputMode="decimal"
                        value={wallHeight}
                        onChange={(e) =>
                          setWallHeight(e.target.value)
                        }
                        placeholder="Enter wall height"
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <span className={unitClass}>
                        ft
                      </span>

                    </div>

                  </div>

                  {/* Quantity */}

                  <div>

                    <label className={labelClass}>
                      Quantity
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={wallQuantity}
                        onChange={(e) =>
                          setWallQuantity(e.target.value)
                        }
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                        walls
                      </span>

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* =================================================
                OPENINGS
            ================================================= */}

            <div className="border-t border-slate-100">

              <SectionHeader
                id="openings"
                title="Door & Window Openings"
                description="Subtract openings from the wall area."
              />

              {openSection === "openings" && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:px-7 sm:py-6">

                  {/* Door */}

                  <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">

                    <h3 className="mb-4 text-lg font-bold text-slate-900">
                      Door
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                      <div>
                        <label className={labelClass}>
                          Quantity
                        </label>

                        <input
                          type="number"
                          min="0"
                          value={door.quantity}
                          onChange={(e) =>
                            setDoor({
                              ...door,
                              quantity: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Width (ft)
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={door.width}
                          onChange={(e) =>
                            setDoor({
                              ...door,
                              width: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Height (ft)
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={door.height}
                          onChange={(e) =>
                            setDoor({
                              ...door,
                              height: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>

                    </div>

                  </div>

                  {/* Window */}

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">

                    <h3 className="mb-4 text-lg font-bold text-slate-900">
                      Window
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                      <div>
                        <label className={labelClass}>
                          Quantity
                        </label>

                        <input
                          type="number"
                          min="0"
                          value={window.quantity}
                          onChange={(e) =>
                            setWindow({
                              ...window,
                              quantity: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Width (ft)
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={window.width}
                          onChange={(e) =>
                            setWindow({
                              ...window,
                              width: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Height (ft)
                        </label>

                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={window.height}
                          onChange={(e) =>
                            setWindow({
                              ...window,
                              height: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* =================================================
                BRICK DETAILS
            ================================================= */}

            <div className="border-t border-slate-100">

              <SectionHeader
                id="brick"
                title="Brick Details"
                description="Set brick size and mortar joint."
              />

              {openSection === "brick" && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:px-7 sm:py-6">

                  {/* Length */}

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
                          setBrickLength(e.target.value)
                        }
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <span className={unitClass}>
                        in
                      </span>

                    </div>

                  </div>

                  {/* Height */}

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
                          setBrickHeight(e.target.value)
                        }
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <span className={unitClass}>
                        in
                      </span>

                    </div>

                  </div>

                  {/* Width */}

                  <div className="mb-4">

                    <label className={labelClass}>
                      Brick Width
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={brickWidth}
                        onChange={(e) =>
                          setBrickWidth(e.target.value)
                        }
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <span className={unitClass}>
                        in
                      </span>

                    </div>

                  </div>

                  {/* Mortar */}

                  <div>

                    <label className={labelClass}>
                      Mortar Joint Thickness
                    </label>

                    <select
                      value={mortarJoint}
                      onChange={(e) =>
                        setMortarJoint(e.target.value)
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

                </div>
              )}

            </div>

            {/* =================================================
                BRICKS REQUIRED
            ================================================= */}

            <div className="border-t border-slate-100">

              <SectionHeader
                id="required"
                title="Bricks Required"
                description="View quantity and waste estimate."
              />

              {openSection === "required" && (
                <div className="border-t border-slate-100 p-5 sm:px-7 sm:py-6">

                  {/* Waste */}

                  <div className="mb-5">

                    <label className={labelClass}>
                      Brick Wastage
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={waste}
                        onChange={(e) =>
                          setWaste(e.target.value)
                        }
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 text-base outline-none"
                      />

                      <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm font-semibold text-slate-500">
                        %
                      </span>

                    </div>

                  </div>

                  {/* Result */}

                  <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-2xl bg-blue-50 p-4">

                      <p className="text-sm text-slate-500">
                        Bricks Needed
                      </p>

                      <p className="mt-1 text-2xl font-bold text-blue-700">
                        {Math.ceil(
                          result.baseBricks
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">

                      <p className="text-sm text-slate-500">
                        Bricks / sq ft
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        {result.bricksPerSqFt.toFixed(2)}
                      </p>

                    </div>

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

                    <div className="rounded-2xl bg-green-50 p-4">

                      <p className="text-sm text-slate-500">
                        Total Bricks
                      </p>

                      <p className="mt-1 text-2xl font-bold text-green-700">
                        {result.totalBricks.toLocaleString()}
                      </p>

                    </div>

                  </div>

                </div>
              )}

            </div>

            {/* =================================================
                COST
            ================================================= */}

            <div className="border-t border-slate-100">

              <SectionHeader
                id="cost"
                title="Cost of Materials"
                description="Estimate the total brick material cost."
              />

              {openSection === "cost" && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:px-7 sm:py-6">

                  {/* Currency */}

                  <div className="mb-4">

                    <label className={labelClass}>
                      Currency
                    </label>

                    <select
                      value={currency}
                      onChange={(e) =>
                        setCurrency(e.target.value)
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

                  <div className="mb-5">

                    <label className={labelClass}>
                      Price per Brick
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <span className="flex h-12 items-center px-3 text-base font-semibold text-slate-500">
                        {currencySymbol}
                      </span>

                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={price}
                        onChange={(e) =>
                          setPrice(e.target.value)
                        }
                        placeholder="0.00"
                        className="h-12 min-w-0 flex-1 bg-transparent px-2 text-base outline-none"
                      />

                      <span className="flex h-12 items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                        / brick
                      </span>

                    </div>

                  </div>

                  {/* Cost */}

                  <div className="rounded-2xl bg-green-50 p-5">

                    <p className="text-sm font-medium text-slate-500">
                      Estimated Cost
                    </p>

                    <p className="mt-1 text-3xl font-bold text-green-700">
                      {currencySymbol}
                      {result.cost.toFixed(2)}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      Based on {result.totalBricks.toLocaleString()} bricks
                    </p>

                  </div>

                </div>
              )}

            </div>

          </section>

          {/* =================================================
              QUICK RESULT
          ================================================= */}

          <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

            <h2 className="text-xl font-bold text-slate-900">
              Quick Result
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-blue-50 p-4">

                <p className="text-sm text-slate-500">
                  Net Wall Area
                </p>

                <p className="mt-1 text-xl font-bold text-blue-700">
                  {result.netWallArea.toFixed(2)} sq ft
                </p>

              </div>

              <div className="rounded-2xl bg-green-50 p-4">

                <p className="text-sm text-slate-500">
                  Total Bricks
                </p>

                <p className="mt-1 text-xl font-bold text-green-700">
                  {result.totalBricks.toLocaleString()}
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="mt-5 grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={async () => {
                const text =
                  `CornerSpan Brick Calculator\n\n` +
                  `Wall Area: ${result.netWallArea.toFixed(2)} sq ft\n` +
                  `Total Bricks: ${result.totalBricks.toLocaleString()}\n` +
                  `Estimated Cost: ${currencySymbol}${result.cost.toFixed(2)}`;

                if (
                  typeof navigator !== "undefined" &&
                  navigator.share
                ) {
                  await navigator.share({
                    title: "Brick Calculation",
                    text,
                  });
                } else if (
                  typeof navigator !== "undefined" &&
                  navigator.clipboard
                ) {
                  await navigator.clipboard.writeText(text);
                  alert("Result copied.");
                }
              }}
              className="h-12 rounded-xl bg-blue-600 px-4 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Share Result
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="h-12 rounded-xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
            >
              Clear All
            </button>

          </div>

          {/* =================================================
              NOTE
          ================================================= */}

          <section className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <h3 className="mb-2 text-lg font-bold text-slate-900">
              Brick Calculator Note
            </h3>

            <p className="text-sm leading-6 text-slate-600">
              This calculator provides an estimate based on wall
              dimensions, openings, brick face dimensions, mortar
              joint and wastage. Actual brick requirements can vary
              depending on construction method, mortar thickness,
              local brick sizes and site conditions.
            </p>

          </section>

          {/* =================================================
              TIPS
          ================================================= */}

          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Brick Calculator Tips
            </h3>

            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">

              <li>
                Add extra bricks for breakage and cutting.
              </li>

              <li>
                Door and window openings are deducted from wall area.
              </li>

              <li>
                Mortar joints change the number of bricks required.
              </li>

              <li>
                Brick dimensions vary by region and manufacturer.
              </li>

            </ul>

          </section>

        </div>

      </div>

    </main>
  );
}
