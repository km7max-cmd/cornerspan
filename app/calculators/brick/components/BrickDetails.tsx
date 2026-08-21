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
    "h-12 min-w-0 flex-1 bg-transparent px-3 text-base text-slate-900 outline-none";

  const selectClass =
    "h-12 border-l border-slate-200 bg-white px-3 text-sm font-semibold text-blue-700 outline-none";

  const labelClass =
    "mb-1.5 block text-sm font-semibold text-slate-700";

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
            Set brick dimensions, mortar joint and waste.
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
        <div className="border-t border-slate-100 bg-white p-5 sm:px-7 sm:py-6">

          {/* =================================================
              COMMON BRICK SIZES
          ================================================= */}

          <div className="mb-6">

            <label className={labelClass}>
              Common Brick Size
            </label>

            <div className="space-y-2">

              {COMMON_BRICK_SIZES.map(
                (brick) => {
                  const selected =
                    brickLength ===
                      brick.length &&
                    brickHeight ===
                      brick.height &&
                    brickWidth ===
                      brick.width &&
                    brickUnit ===
                      brick.unit;

                  return (
                    <button
                      key={brick.name}
                      type="button"
                      onClick={() =>
                        applyBrickSize(
                          brick.length,
                          brick.height,
                          brick.width,
                          brick.unit
                        )
                      }
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                        selected
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >

                      <div>

                        <p className="text-sm font-semibold text-slate-900">
                          {brick.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {brick.length} ×{" "}
                          {brick.height} ×{" "}
                          {brick.width}{" "}
                          {brick.unit}
                        </p>

                      </div>

                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {selected && (
                          <span className="text-xs">
                            ✓
                          </span>
                        )}
                      </span>

                    </button>
                  );
                }
              )}

            </div>

          </div>

          {/* =================================================
              BRICK LENGTH
          ================================================= */}

          <div className="mb-4">

            <label className={labelClass}>
              Brick Length
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
              />

              <select
                value={brickUnit}
                onChange={(event) =>
                  setBrickUnit(
                    event.target.value as LengthUnit
                  )
                }
                className={selectClass}
                aria-label="Brick length unit"
              >
                {LENGTH_UNIT_OPTIONS.map(
                  (option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.value}
                    </option>
                  )
                )}
              </select>

            </div>

          </div>

          {/* =================================================
              BRICK HEIGHT
          ================================================= */}

          <div className="mb-4">

            <label className={labelClass}>
              Brick Height
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
              />

              <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm font-semibold text-blue-700">
                {brickUnit}
              </span>

            </div>

          </div>

          {/* =================================================
              BRICK WIDTH
          ================================================= */}

          <div className="mb-5">

            <label className={labelClass}>
              Brick Width
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
              />

              <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm font-semibold text-blue-700">
                {brickUnit}
              </span>

            </div>

          </div>

          {/* =================================================
              MORTAR JOINT
          ================================================= */}

          <div className="mb-5">

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
                text-slate-900
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
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

          {/* =================================================
              WASTE
          ================================================= */}

          <div>

            <label className={labelClass}>
              Brick Waste
            </label>

            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

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
              />

              <span className="flex h-12 items-center border-l border-slate-200 px-4 text-sm font-semibold text-slate-500">
                %
              </span>

            </div>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              A 5–10% allowance is commonly used for
              breakage, cutting and site waste.
            </p>

          </div>

        </div>
      )}

    </section>
  );
}
