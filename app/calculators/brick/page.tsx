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

type MainSection =
  | "wall"
  | "openings"
  | "brick"
  | "required"
  | "cost"
  | "mortar"
  | "components"
  | null;

export default function BrickCalculator() {
  // =========================================================
  // WALL
  // =========================================================

  const [wallType, setWallType] =
    useState<"single" | "double">("single");

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

  const [mortarJoint, setMortarJoint] =
    useState("0.375");

  // =========================================================
  // BRICK COST
  // =========================================================

  const [waste, setWaste] = useState("5");

  const [currency, setCurrency] =
    useState("USD");

  const [price, setPrice] =
    useState("0.85");

  // =========================================================
  // MORTAR
  // =========================================================

  const [calculateMortar, setCalculateMortar] =
    useState(false);

  const [dryRatio, setDryRatio] =
    useState("1.52");

  const [mortarWastage, setMortarWastage] =
    useState("10");

  const [mortarRatio, setMortarRatio] =
    useState("1:5");

  const [cementDensity, setCementDensity] =
    useState("1440");

  const [bagSize, setBagSize] =
    useState("50");

  // =========================================================
  // ACCORDION
  // =========================================================

  const [openSection, setOpenSection] =
    useState<MainSection>("wall");

  const currencySymbol =
    CURRENCY_SYMBOLS[currency] || "$";

  const toggleSection = (
    section: MainSection
  ) => {
    setOpenSection((current) =>
      current === section
        ? null
        : section
    );
  };

  // =========================================================
  // CALCULATION
  // =========================================================

  const result = useMemo(() => {
    const length =
      Math.max(
        0,
        Number(wallLength) || 0
      );

    const height =
      Math.max(
        0,
        Number(wallHeight) || 0
      );

    const quantity =
      Math.max(
        1,
        Number(wallQuantity) || 1
      );

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

    const bWidth =
      Math.max(
        0,
        Number(brickWidth) || 0
      );

    const joint =
      Math.max(
        0,
        Number(mortarJoint) || 0
      );

    const brickWastePercent =
      Math.max(
        0,
        Number(waste) || 0
      );

    const brickPrice =
      Math.max(
        0,
        Number(price) || 0
      );

    // =======================================================
    // WALL AREA
    // =======================================================

    const grossWallArea =
      length *
      height *
      quantity;

    // =======================================================
    // DOOR
    // =======================================================

    const doorQty =
      Math.max(
        0,
        Number(door.quantity) || 0
      );

    const doorWidth =
      Math.max(
        0,
        Number(door.width) || 0
      );

    const doorHeight =
      Math.max(
        0,
        Number(door.height) || 0
      );

    const doorArea =
      doorQty *
      doorWidth *
      doorHeight;

    // =======================================================
    // WINDOW
    // =======================================================

    const windowQty =
      Math.max(
        0,
        Number(window.quantity) || 0
      );

    const windowWidth =
      Math.max(
        0,
        Number(window.width) || 0
      );

    const windowHeight =
      Math.max(
        0,
        Number(window.height) || 0
      );

    const windowArea =
      windowQty *
      windowWidth *
      windowHeight;

    // =======================================================
    // NET WALL AREA
    // =======================================================

    const openingArea =
      doorArea +
      windowArea;

    const netWallArea =
      Math.max(
        0,
        grossWallArea -
          openingArea
      );

    // =======================================================
    // EFFECTIVE BRICK FACE
    // =======================================================

    const effectiveLength =
      bLength + joint;

    const effectiveHeight =
      bHeight + joint;

    const effectiveBrickFaceSqIn =
      effectiveLength *
      effectiveHeight;

    const effectiveBrickFaceSqFt =
      effectiveBrickFaceSqIn /
      144;

    // =======================================================
    // BASE BRICKS
    // =======================================================

    let baseBricks =
      effectiveBrickFaceSqFt > 0
        ? netWallArea /
          effectiveBrickFaceSqFt
        : 0;

    if (wallType === "double") {
      baseBricks *= 2;
    }

    // =======================================================
    // BRICK WASTE
    // =======================================================

    const wasteBricks =
      baseBricks *
      (brickWastePercent / 100);

    const totalBricks =
      Math.ceil(
        baseBricks +
          wasteBricks
      );

    // =======================================================
    // BRICK COST
    // =======================================================

    const brickCost =
      totalBricks *
      brickPrice;

    // =======================================================
    // BRICKS / SQ FT
    // =======================================================

    const bricksPerSqFt =
      effectiveBrickFaceSqFt > 0
        ? 1 /
          effectiveBrickFaceSqFt
        : 0;

    // =======================================================
    // WALL THICKNESS
    //
    // Brick width is in inches.
    // Single = one brick width.
    // Double = two brick widths.
    // =======================================================

    const wallThicknessIn =
      bWidth *
      (wallType === "double"
        ? 2
        : 1);

    const wallThicknessFt =
      wallThicknessIn /
      12;

    // =======================================================
    // WALL VOLUME
    // =======================================================

    const wallVolume =
      netWallArea *
      wallThicknessFt;

    // =======================================================
    // BRICK SOLID VOLUME
    //
    // Use base bricks before wastage because
    // waste is ordering allowance, not mortar volume.
    // =======================================================

    const brickVolumeEachCuIn =
      bLength *
      bHeight *
      bWidth;

    const brickVolumeEachCuFt =
      brickVolumeEachCuIn /
      1728;

    const brickSolidVolume =
      baseBricks *
      brickVolumeEachCuFt;

    // =======================================================
    // WET MORTAR VOLUME
    // =======================================================

    const wetMortarVolume =
      Math.max(
        0,
        wallVolume -
          brickSolidVolume
      );

    // =======================================================
    // DRY MORTAR
    // =======================================================

    const dryVolumeRatio =
      Math.max(
        1,
        Number(dryRatio) || 1.52
      );

    const dryMortarVolume =
      wetMortarVolume *
      dryVolumeRatio;

    // =======================================================
    // MORTAR WASTAGE
    // =======================================================

    const mortarWastePercent =
      Math.max(
        0,
        Number(mortarWastage) || 0
      );

    const mortarWasteVolume =
      dryMortarVolume *
      (mortarWastePercent /
        100);

    const totalDryMortarVolume =
      dryMortarVolume +
      mortarWasteVolume;

    // =======================================================
    // MORTAR RATIO
    // =======================================================

    const ratioParts =
      mortarRatio
        .split(":")
        .map(Number);

    const cementPart =
      ratioParts[0] || 1;

    const sandPart =
      ratioParts[1] || 5;

    const ratioTotal =
      cementPart +
      sandPart;

    // =======================================================
    // CEMENT
    // =======================================================

    const cementVolume =
      ratioTotal > 0
        ? totalDryMortarVolume *
          (cementPart /
            ratioTotal)
        : 0;

    const cementDensityValue =
      Math.max(
        0,
        Number(cementDensity) ||
          1440
      );

    const cementWeight =
      cementVolume *
      cementDensityValue;

    const bagSizeValue =
      Math.max(
        1,
        Number(bagSize) || 50
      );

    const cementBags =
      cementWeight /
      bagSizeValue;

    // =======================================================
    // SAND
    // =======================================================

    const sandVolume =
      ratioTotal > 0
        ? totalDryMortarVolume *
          (sandPart /
            ratioTotal)
        : 0;

    return {
      grossWallArea,
      doorArea,
      windowArea,
      openingArea,
      netWallArea,

      effectiveLength,
      effectiveHeight,

      baseBricks,
      wasteBricks,
      totalBricks,
      brickCost,
      bricksPerSqFt,

      wallThicknessIn,
      wallThicknessFt,
      wallVolume,

      brickSolidVolume,

      wetMortarVolume,
      dryMortarVolume,
      mortarWasteVolume,
      totalDryMortarVolume,

      cementPart,
      sandPart,
      cementVolume,
      cementWeight,
      cementBags,
      sandVolume,
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

    dryRatio,
    mortarWastage,
    mortarRatio,
    cementDensity,
    bagSize,
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

    setCalculateMortar(false);

    setDryRatio("1.52");
    setMortarWastage("10");
    setMortarRatio("1:5");
    setCementDensity("1440");
    setBagSize("50");

    setOpenSection("wall");
  };

  // =========================================================
  // CLASSES
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
    id: Exclude<MainSection, null>;
    title: string;
    description: string;
  }) => {
    const isOpen =
      openSection === id;

    return (
      <button
        type="button"
        onClick={() =>
          toggleSection(id)
        }
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
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
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
          description="Calculate bricks, mortar, cement, sand, openings, waste and estimated material cost."
        />

        <div className="mx-auto mt-6 max-w-xl">

          {/* =================================================
              DIAGRAM
          ================================================= */}

          <section className="mb-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-5 sm:px-7">

              <h2 className="text-2xl font-bold text-slate-900">
                Brick Wall
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Wall and brick dimension reference
              </p>

            </div>

            <div className="bg-gradient-to-b from-slate-50 to-blue-50 px-4 py-5">

              <svg
                viewBox="0 0 500 260"
                className="mx-auto h-auto w-full max-w-md"
                role="img"
                aria-label="Brick wall dimension diagram"
              >

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
                  x="460"
                  y="140"
                  fill="#1d4ed8"
                  fontSize="17"
                  fontWeight="700"
                  transform="rotate(90 460 140)"
                  textAnchor="middle"
                >
                  Height
                </text>

              </svg>

              <div className="mx-auto mt-2 max-w-sm rounded-xl bg-white px-4 py-3 text-center shadow-sm">

                <p className="text-sm text-slate-500">
                  Brick size
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
              MAIN ACCORDIONS
          ================================================= */}

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* =================================================
                WALL
            ================================================= */}

            <div>

              <SectionHeader
                id="wall"
                title="Wall Details"
                description="Set wall type, length, height and quantity."
              />

              {openSection === "wall" && (
                <div className="border-t border-slate-100 p-5 sm:px-7 sm:py-6">

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
                        className={`rounded-xl border p-4 text-left ${
                          wallType === "single"
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200"
                        }`}
                      >
                        <div className="font-semibold">
                          Single
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
                        className={`rounded-xl border p-4 text-left ${
                          wallType === "double"
                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                            : "border-slate-200"
                        }`}
                      >
                        <div className="font-semibold">
                          Double
                        </div>

                        <div className="mt-1 text-xs text-slate-500">
                          Two brick layers
                        </div>
                      </button>

                    </div>

                  </div>

                  <div className="mb-4">

                    <label className={labelClass}>
                      Wall Length
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200">

                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={wallLength}
                        onChange={(e) =>
                          setWallLength(e.target.value)
                        }
                        placeholder="Enter wall length"
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 outline-none"
                      />

                      <span className={unitClass}>
                        ft
                      </span>

                    </div>

                  </div>

                  <div className="mb-4">

                    <label className={labelClass}>
                      Wall Height
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200">

                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={wallHeight}
                        onChange={(e) =>
                          setWallHeight(e.target.value)
                        }
                        placeholder="Enter wall height"
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 outline-none"
                      />

                      <span className={unitClass}>
                        ft
                      </span>

                    </div>

                  </div>

                  <div>

                    <label className={labelClass}>
                      Quantity
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200">

                      <input
                        type="number"
                        min="1"
                        value={wallQuantity}
                        onChange={(e) =>
                          setWallQuantity(e.target.value)
                        }
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 outline-none"
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
                description="Subtract doors and windows from wall area."
              />

              {openSection === "openings" && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:px-7 sm:py-6">

                  <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4">

                    <h3 className="mb-4 text-lg font-bold">
                      Door
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-3">

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

                  <div className="rounded-2xl border border-slate-200 bg-white p-4">

                    <h3 className="mb-4 text-lg font-bold">
                      Window
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-3">

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
                description="Set brick dimensions and mortar joint."
              />

              {openSection === "brick" && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:px-7 sm:py-6">

                  {[
                    [
                      "Brick Length",
                      brickLength,
                      setBrickLength,
                    ],
                    [
                      "Brick Height",
                      brickHeight,
                      setBrickHeight,
                    ],
                    [
                      "Brick Width",
                      brickWidth,
                      setBrickWidth,
                    ],
                  ].map(
                    ([label, value, setter], index) => (
                      <div
                        key={String(label)}
                        className={
                          index < 2
                            ? "mb-4"
                            : "mb-4"
                        }
                      >
                        <label className={labelClass}>
                          {String(label)}
                        </label>

                        <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={String(value)}
                            onChange={(e) =>
                              (
                                setter as (
                                  value: string
                                ) => void
                              )(
                                e.target.value
                              )
                            }
                            className="h-12 min-w-0 flex-1 bg-transparent px-3 outline-none"
                          />

                          <span className={unitClass}>
                            in
                          </span>

                        </div>

                      </div>
                    )
                  )}

                  <div>

                    <label className={labelClass}>
                      Mortar Joint Thickness
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
                description="Bricks, waste and total quantity."
              />

              {openSection === "required" && (
                <div className="border-t border-slate-100 p-5 sm:px-7 sm:py-6">

                  <div className="mb-5">

                    <label className={labelClass}>
                      Brick Wastage
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200">

                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={waste}
                        onChange={(e) =>
                          setWaste(e.target.value)
                        }
                        className="h-12 min-w-0 flex-1 bg-transparent px-3 outline-none"
                      />

                      <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                        %
                      </span>

                    </div>

                  </div>

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

                      <p className="mt-1 text-2xl font-bold">
                        {result.bricksPerSqFt.toFixed(2)}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">
                        Waste Bricks
                      </p>

                      <p className="mt-1 text-xl font-bold">
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
                MORTAR CHECKBOX
            ================================================= */}

            <div className="border-t border-slate-100 bg-white p-4 sm:px-7">

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={calculateMortar}
                  onChange={(e) =>
                    setCalculateMortar(
                      e.target.checked
                    )
                  }
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm font-medium text-slate-700">
                  Calculate mortar materials
                </span>

              </label>

              <p className="mt-1 pl-8 text-xs text-slate-500">
                Calculate cement and sand required for the mortar.
              </p>

            </div>

            {/* =================================================
                MORTAR NEEDED
            ================================================= */}

            {calculateMortar && (
              <div className="border-t border-slate-100">

                <SectionHeader
                  id="mortar"
                  title="Mortar Needed"
                  description="Calculate wet and dry mortar volume."
                />

                {openSection === "mortar" && (
                  <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:px-7 sm:py-6">

                    <div className="grid grid-cols-2 gap-3">

                      <div className="rounded-2xl bg-blue-50 p-4">
                        <p className="text-sm text-slate-500">
                          Wet Volume
                        </p>

                        <p className="mt-1 text-xl font-bold text-blue-700">
                          {result.wetMortarVolume.toFixed(3)} m³
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">
                          Dry Volume Ratio
                        </p>

                        <p className="mt-1 text-xl font-bold">
                          {dryRatio} : 1
                        </p>
                      </div>

                    </div>

                    <div className="mt-4">

                      <label className={labelClass}>
                        Dry Volume / Wet Volume Ratio
                      </label>

                      <input
                        type="number"
                        min="1"
                        step="0.01"
                        value={dryRatio}
                        onChange={(e) =>
                          setDryRatio(
                            e.target.value
                          )
                        }
                        className={inputClass}
                      />

                    </div>

                    <div className="mt-4">

                      <label className={labelClass}>
                        Mortar Wastage
                      </label>

                      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={mortarWastage}
                          onChange={(e) =>
                            setMortarWastage(
                              e.target.value
                            )
                          }
                          className="h-12 min-w-0 flex-1 bg-transparent px-3 outline-none"
                        />

                        <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm text-slate-500">
                          %
                        </span>

                      </div>

                    </div>

                    <div className="mt-5 rounded-2xl bg-green-50 p-5">

                      <p className="text-sm text-slate-500">
                        Total Dry Mortar
                      </p>

                      <p className="mt-1 text-3xl font-bold text-green-700">
                        {result.totalDryMortarVolume.toFixed(3)} m³
                      </p>

                    </div>

                  </div>
                )}

              </div>
            )}

            {/* =================================================
                MORTAR COMPONENTS
            ================================================= */}

            {calculateMortar && (
              <div className="border-t border-slate-100">

                <SectionHeader
                  id="components"
                  title="Mortar Components"
                  description="Calculate cement and sand quantities."
                />

                {openSection === "components" && (
                  <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:px-7 sm:py-6">

                    {/* Ratio */}

                    <div className="mb-5">

                      <label className={labelClass}>
                        Mortar Ratio
                      </label>

                      <div className="space-y-2">

                        {[
                          ["1:6", "For plaster"],
                          ["1:5", "For brickwork"],
                          ["1:4", "For exterior plaster"],
                          ["1:3", "Rich mortar mix"],
                        ].map(
                          ([ratio, text]) => (
                            <label
                              key={ratio}
                              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${
                                mortarRatio === ratio
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-slate-200 bg-white"
                              }`}
                            >
                              <input
                                type="radio"
                                name="mortarRatio"
                                value={ratio}
                                checked={
                                  mortarRatio === ratio
                                }
                                onChange={() =>
                                  setMortarRatio(
                                    ratio
                                  )
                                }
                                className="h-4 w-4"
                              />

                              <span className="text-sm">
                                <strong>
                                  {ratio}
                                </strong>{" "}
                                — {text}
                              </span>
                            </label>
                          )
                        )}

                      </div>

                    </div>

                    {/* Cement Volume */}

                    <div className="mb-4 rounded-2xl bg-white p-4">

                      <p className="text-sm text-slate-500">
                        Volume of Cement
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        {result.cementVolume.toFixed(3)} m³
                      </p>

                    </div>

                    {/* Density */}

                    <div className="mb-4">

                      <label className={labelClass}>
                        Cement Density
                      </label>

                      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                        <input
                          type="number"
                          min="0"
                          value={cementDensity}
                          onChange={(e) =>
                            setCementDensity(
                              e.target.value
                            )
                          }
                          className="h-12 min-w-0 flex-1 bg-transparent px-3 outline-none"
                        />

                        <span className={unitClass}>
                          kg/m³
                        </span>

                      </div>

                    </div>

                    {/* Cement Weight */}

                    <div className="mb-4 rounded-2xl bg-white p-4">

                      <p className="text-sm text-slate-500">
                        Weight of Cement
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        {result.cementWeight.toFixed(1)} kg
                      </p>

                    </div>

                    {/* Bag Size */}

                    <div className="mb-4">

                      <label className={labelClass}>
                        Bag Size
                      </label>

                      <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                        <input
                          type="number"
                          min="1"
                          value={bagSize}
                          onChange={(e) =>
                            setBagSize(
                              e.target.value
                            )
                          }
                          className="h-12 min-w-0 flex-1 bg-transparent px-3 outline-none"
                        />

                        <span className={unitClass}>
                          kg
                        </span>

                      </div>

                    </div>

                    {/* Bags */}

                    <div className="mb-4 rounded-2xl bg-blue-50 p-5">

                      <p className="text-sm text-slate-500">
                        Bags of Cement Needed
                      </p>

                      <p className="mt-1 text-3xl font-bold text-blue-700">
                        {result.cementBags.toFixed(2)}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Approx.{" "}
                        {Math.ceil(
                          result.cementBags
                        )} bags to purchase
                      </p>

                    </div>

                    {/* Sand */}

                    <div className="rounded-2xl bg-white p-5">

                      <p className="text-sm text-slate-500">
                        Volume of Sand
                      </p>

                      <p className="mt-1 text-3xl font-bold text-slate-900">
                        {result.sandVolume.toFixed(3)} m³
                      </p>

                    </div>

                  </div>
                )}

              </div>
            )}

            {/* =================================================
                COST
            ================================================= */}

            <div className="border-t border-slate-100">

              <SectionHeader
                id="cost"
                title="Cost of Materials"
                description="Estimate brick material cost."
              />

              {openSection === "cost" && (
                <div className="border-t border-slate-100 bg-slate-50/60 p-5 sm:px-7 sm:py-6">

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

                  <div className="mb-5">

                    <label className={labelClass}>
                      Price per Brick
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">

                      <span className="flex h-12 items-center px-3 font-semibold text-slate-500">
                        {currencySymbol}
                      </span>

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
                        className="h-12 min-w-0 flex-1 bg-transparent px-2 outline-none"
                      />

                      <span className="flex h-12 items-center border-l border-slate-200 px-3 text-sm text-slate-500">
                        / brick
                      </span>

                    </div>

                  </div>

                  <div className="rounded-2xl bg-green-50 p-5">

                    <p className="text-sm text-slate-500">
                      Estimated Brick Cost
                    </p>

                    <p className="mt-1 text-3xl font-bold text-green-700">
                      {currencySymbol}
                      {result.brickCost.toFixed(2)}
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
              Calculation Summary
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

              {calculateMortar && (
                <>
                  <div className="rounded-2xl bg-slate-50 p-4">

                    <p className="text-sm text-slate-500">
                      Cement Bags
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {Math.ceil(
                        result.cementBags
                      )}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">

                    <p className="text-sm text-slate-500">
                      Sand
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {result.sandVolume.toFixed(2)} m³
                    </p>

                  </div>
                </>
              )}

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
                  `Total Bricks: ${result.totalBricks}\n` +
                  `Brick Cost: ${currencySymbol}${result.brickCost.toFixed(2)}` +
                  (calculateMortar
                    ? `\nCement: ${Math.ceil(
                        result.cementBags
                      )} bags\nSand: ${result.sandVolume.toFixed(
                        2
                      )} m³`
                    : "");

                if (
                  typeof navigator !==
                    "undefined" &&
                  navigator.share
                ) {
                  await navigator.share({
                    title:
                      "CornerSpan Brick Calculation",
                    text,
                  });
                } else if (
                  typeof navigator !==
                    "undefined" &&
                  navigator.clipboard
                ) {
                  await navigator.clipboard.writeText(
                    text
                  );

                  alert(
                    "Result copied."
                  );
                }
              }}
              className="h-12 rounded-xl bg-blue-600 px-4 font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Share Result
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="h-12 rounded-xl border border-slate-200 bg-white px-4 font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Clear All
            </button>

          </div>

          {/* =================================================
              NOTE
          ================================================= */}

          <section className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <h3 className="mb-2 text-lg font-bold text-slate-900">
              Calculator Note
            </h3>

            <p className="text-sm leading-6 text-slate-600">
              Results are estimates based on the entered wall,
              brick, mortar and opening dimensions. Actual
              material requirements may vary because of brick
              size, joint thickness, construction method,
              cutting and site conditions.
            </p>

          </section>

        </div>

      </div>

    </main>
  );
}
