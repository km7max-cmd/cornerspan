"use client";

import type {
  LengthUnit,
  MortarJoint,
} from "../types";

import {
  LENGTH_UNIT_OPTIONS,
  MORTAR_JOINT_OPTIONS,
  COMMON_BRICK_SIZES,
} from "../data/brickOptions";

type BrickDetailsProps = {
  open: boolean;
  onToggle: () => void;

  brickLength: string;
  setBrickLength: (value: string) => void;

  brickHeight: string;
  setBrickHeight: (value: string) => void;

  brickWidth: string;
  setBrickWidth: (value: string) => void;

  brickUnit: LengthUnit;
  setBrickUnit: (value: LengthUnit) => void;

  mortarJoint: MortarJoint;
  setMortarJoint: (value: MortarJoint) => void;

  waste: string;
  setWaste: (value: string) => void;
};

export default function BrickDetails({
  open,
  onToggle,

  brickLength,
  setBrickLength,

  brickHeight,
  setBrickHeight,

  brickWidth,
  setBrickWidth,

  brickUnit,
  setBrickUnit,

  mortarJoint,
  setMortarJoint,

  waste,
  setWaste,
}: BrickDetailsProps) {
  const inputClass =
    "h-12 min-w-0 flex-1 bg-transparent px-3 text-base font-medium text-slate-900 outline-none";

  const unitClass =
    "flex h-12 shrink-0 items-center border-l border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-blue-700";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  const fieldClass =
    "flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100";

  const applyBrickSize = (
    length: string,
    height: string,
    width: string,
    unit: LengthUnit
  ) => {
    setBrickLength(length);
    setBrickHeight(height);
    setBrickWidth(width);
    setBrickUnit(unit);
  };

  return (
    <section className="border-b border-slate-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
      >
        <div className="min-w-0">

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Brick Details
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Brick size, mortar joint and waste
          </p>

        </div>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-semibold transition ${
            open
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {open ? "−" : "+"}
        </span>

      </button>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 sm:px-7 sm:py-6">

          {/* =================================================
              BRICK SIZE
          ================================================= */}

          <div className="mb-5">

            <label className={labelClass}>
              Brick Size
            </label>

            <select
              value={`${brickLength}-${brickHeight}-${brickWidth}-${brickUnit}`}
              onChange={(event) => {
                const selected =
                  COMMON_BRICK_SIZES.find(
                    (brick) =>
                      `${brick.length}-${brick.height}-${brick.width}-${brick.unit}` ===
                      event.target.value
                  );

                if (selected) {
                  applyBrickSize(
                    selected.length,
                    selected.height,
                    selected.width,
                    selected.unit
                  );
                }
              }}
              className="
                h-12
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                text-base
                font-semibold
                text-blue-700
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            >
              {COMMON_BRICK_SIZES.map((brick) => (
                <option
                  key={brick.name}
                  value={`${brick.length}-${brick.height}-${brick.width}-${brick.unit}`}
                >
                  {brick.name} ({brick.length} ×{" "}
                  {brick.height} × {brick.width}{" "}
                  {brick.unit})
                </option>
              ))}
            </select>

          </div>

          {/* =================================================
              LENGTH + HEIGHT
          ================================================= */}

          <div className="grid grid-cols-2 gap-3">

            {/* Brick Length */}

            <div>

              <label className={labelClass}>
                Length
              </label>

              <div className={fieldClass}>

                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={brickLength}
                  onChange={(event) =>
                    setBrickLength(
                      event.target.value
                    )
                  }
                  className={inputClass}
                  aria-label="Brick length"
                />

                <span className={unitClass}>
                  {brickUnit}
                </span>

              </div>

            </div>

            {/* Brick Height */}

            <div>

              <label className={labelClass}>
                Height
              </label>

              <div className={fieldClass}>

                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={brickHeight}
                  onChange={(event) =>
                    setBrickHeight(
                      event.target.value
                    )
                  }
                  className={inputClass}
                  aria-label="Brick height"
                />

                <span className={unitClass}>
                  {brickUnit}
                </span>

              </div>

            </div>

          </div>

          {/* =================================================
              WIDTH + MORTAR JOINT
          ================================================= */}

          <div className="mt-4 grid grid-cols-2 gap-3">

            {/* Brick Width */}

            <div>

              <label className={labelClass}>
                Width
              </label>

              <div className={fieldClass}>

                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={brickWidth}
                  onChange={(event) =>
                    setBrickWidth(
                      event.target.value
                    )
                  }
                  className={inputClass}
                  aria-label="Brick width"
                />

                <span className={unitClass}>
                  {brickUnit}
                </span>

              </div>

            </div>

            {/* Mortar Joint */}

            <div>

              <label className={labelClass}>
                Mortar Joint
              </label>

              <select
                value={mortarJoint}
                onChange={(event) =>
                  setMortarJoint(
                    event.target.value as MortarJoint
                  )
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-base
                  font-semibold
                  text-blue-700
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                "
                aria-label="Mortar joint"
              >
                {MORTAR_JOINT_OPTIONS.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  )
                )}
              </select>

            </div>

          </div>

          {/* =================================================
              BRICK WASTE
          ================================================= */}

          <div className="mt-4">

            <label className={labelClass}>
              Brick Waste
            </label>

            <div className={fieldClass}>

              <input
                type="number"
                min="0"
                max="100"
                step="1"
                inputMode="numeric"
                value={waste}
                onChange={(event) =>
                  setWaste(
                    event.target.value
                  )
                }
                className={inputClass}
                aria-label="Brick waste percentage"
              />

              <span className="flex h-12 shrink-0 items-center border-l border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-500">
                %
              </span>

            </div>

            <p className="mt-1.5 text-xs text-slate-500">
              Usually 5–10% for breakage and cutting.
            </p>

          </div>

          {/* =================================================
              LIVE SIZE SUMMARY
          ================================================= */}

          <div className="mt-5 rounded-xl bg-blue-50 px-4 py-3">

            <div className="flex items-center justify-between gap-3">

              <div>
                <p className="text-sm font-semibold text-blue-700">
                  Brick dimensions
                </p>

                <p className="mt-0.5 text-xs text-blue-600">
                  L × H × W
                </p>
              </div>

              <p className="text-sm font-bold text-blue-700">
                {brickLength || "0"} ×{" "}
                {brickHeight || "0"} ×{" "}
                {brickWidth || "0"}{" "}
                {brickUnit}
              </p>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
