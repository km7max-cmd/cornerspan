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
  const fieldClass =
    "flex h-12 min-w-0 overflow-hidden rounded-xl border border-slate-300 bg-white transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100";

  const inputClass =
    "min-w-0 flex-1 bg-transparent px-3 text-base font-medium text-slate-900 outline-none placeholder:text-slate-400";

  const unitClass =
    "flex h-12 shrink-0 items-center border-l border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-blue-700";

  const selectClass =
    "h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

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

  const currentPresetValue =
    `${brickLength}-${brickHeight}-${brickWidth}-${brickUnit}`;

  return (
    <section className="border-b border-slate-200">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-slate-50 sm:px-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">
            🧱
          </span>

          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Brick Details
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Brick size, mortar joint and waste
            </p>
          </div>
        </div>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xl font-medium transition ${
            open
              ? "bg-slate-200 text-slate-700"
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
        <div className="px-4 pb-5 sm:px-5">
          {/* =================================================
              COMMON BRICK SIZE
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3">
              <label className={labelClass}>
                Common Brick Size
              </label>

              <p className="text-xs leading-5 text-slate-500">
                Select a preset or enter your own dimensions below.
              </p>
            </div>

            <select
              value={currentPresetValue}
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
              className={selectClass}
              aria-label="Common brick size"
            >
              {COMMON_BRICK_SIZES.map((brick) => (
                <option
                  key={brick.name}
                  value={`${brick.length}-${brick.height}-${brick.width}-${brick.unit}`}
                >
                  {brick.name} — {brick.length} ×{" "}
                  {brick.height} × {brick.width}{" "}
                  {brick.unit}
                </option>
              ))}

              {!COMMON_BRICK_SIZES.some(
                (brick) =>
                  `${brick.length}-${brick.height}-${brick.width}-${brick.unit}` ===
                  currentPresetValue
              ) && (
                <option value={currentPresetValue}>
                  Custom Size
                </option>
              )}
            </select>
          </div>

          {/* =================================================
              UNIT
          ================================================= */}

          <div className="mt-4">
            <label className={labelClass}>
              Brick Dimension Unit
            </label>

            <select
              value={brickUnit}
              onChange={(event) =>
                setBrickUnit(
                  event.target.value as LengthUnit
                )
              }
              className={selectClass}
              aria-label="Brick dimension unit"
            >
              {LENGTH_UNIT_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* =================================================
              LENGTH + HEIGHT
          ================================================= */}

          <div className="mt-4 grid grid-cols-2 gap-3">
            {/* Length */}

            <div className="min-w-0">
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
                  placeholder="8"
                  className={inputClass}
                  aria-label="Brick length"
                />

                <span className={unitClass}>
                  {brickUnit}
                </span>
              </div>
            </div>

            {/* Height */}

            <div className="min-w-0">
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
                  placeholder="2.25"
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
            {/* Width */}

            <div className="min-w-0">
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
                  placeholder="3.625"
                  className={inputClass}
                  aria-label="Brick width"
                />

                <span className={unitClass}>
                  {brickUnit}
                </span>
              </div>
            </div>

            {/* Mortar Joint */}

            <div className="min-w-0">
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
                className={selectClass}
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
              WASTE
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
                placeholder="10"
                className={inputClass}
                aria-label="Brick waste percentage"
              />

              <span className="flex h-12 shrink-0 items-center border-l border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-500">
                %
              </span>
            </div>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Allowance for breakage, cutting and damaged
              bricks.
            </p>
          </div>

          {/* =================================================
              LIVE DIMENSION SUMMARY
          ================================================= */}

          <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-blue-700">
                  Brick Dimensions
                </p>

                <p className="mt-0.5 text-xs text-blue-600">
                  Length × Height × Width
                </p>
              </div>

              <p className="shrink-0 text-right text-sm font-bold text-blue-700">
                {brickLength || "0"} ×{" "}
                {brickHeight || "0"} ×{" "}
                {brickWidth || "0"}{" "}
                {brickUnit}
              </p>
            </div>
          </div>

          {/* =================================================
              MORTAR JOINT SUMMARY
          ================================================= */}

          <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <span className="text-sm text-slate-600">
              Mortar Joint
            </span>

            <span className="text-sm font-bold text-slate-900">
              {mortarJoint} in
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
