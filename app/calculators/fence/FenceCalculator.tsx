"use client";

import { useMemo, useState } from "react";
import {
  calculateFence,
  type ConcreteBagSize,
  type FenceMode,
  type FenceUnit,
} from "./calculations";

const units: { value: FenceUnit; label: string }[] = [
  { value: "ft", label: "Feet (ft)" },
  { value: "m", label: "Meters (m)" },
  { value: "in", label: "Inches (in)" },
  { value: "cm", label: "Centimeters (cm)" },
];

const numberValue = (value: string) =>
  value === ""
    ? 0
    : Number.parseFloat(value) || 0;

function Field({
  label,
  value,
  onChange,
  step = "any",
  min = 0,
  placeholder,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  step?: string;
  min?: number;
  placeholder?: string;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-800">
        {label}
      </span>

      <div className="relative">
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 pr-14 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function Result({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div
        className={`mt-1 text-xl ${
          strong
            ? "font-bold text-blue-700"
            : "font-semibold text-slate-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

export default function FenceCalculator() {
  const [mode, setMode] =
    useState<FenceMode>("wood-picket");

  const [unit, setUnit] =
    useState<FenceUnit>("ft");

  const [length, setLength] =
    useState("100");

  const [height, setHeight] =
    useState("6");

  const [spacing, setSpacing] =
    useState("8");

  const [gates, setGates] =
    useState("0");

  const [gateWidth, setGateWidth] =
    useState("4");

  const [rails, setRails] =
    useState("3");

  const [picketWidth, setPicketWidth] =
    useState("5.5");

  const [picketGap, setPicketGap] =
    useState("0.5");

  const [panelWidth, setPanelWidth] =
    useState("8");

  const [holeDiameter, setHoleDiameter] =
    useState("10");

  const [holeDepth, setHoleDepth] =
    useState("24");

  const [bagSize, setBagSize] =
    useState<ConcreteBagSize>("80");

  const [waste, setWaste] =
    useState("10");

  const [rollLength, setRollLength] =
    useState("50");

  const [corners, setCorners] =
    useState("0");

  const [paintCoverage, setPaintCoverage] =
    useState("350");

  const [paintCoats, setPaintCoats] =
    useState("2");

  const [paintSides, setPaintSides] =
    useState<1 | 2>(1);

  const [pricePost, setPricePost] =
    useState("");

  const [priceRail, setPriceRail] =
    useState("");

  const [pricePicket, setPricePicket] =
    useState("");

  const [pricePanel, setPricePanel] =
    useState("");

  const [priceConcrete, setPriceConcrete] =
    useState("");

  const [priceFabric, setPriceFabric] =
    useState("");

  const [priceLinePost, setPriceLinePost] =
    useState("");

  const [priceTerminalPost, setPriceTerminalPost] =
    useState("");

  const [priceTopRail, setPriceTopRail] =
    useState("");

  const [pricePaint, setPricePaint] =
    useState("");

  const result = useMemo(
    () =>
      calculateFence({
        mode,
        unit,

        fenceLength:
          numberValue(length),

        fenceHeight:
          numberValue(height),

        postSpacing:
          numberValue(spacing),

        gates:
          numberValue(gates),

        gateWidth:
          numberValue(gateWidth),

        railsPerSection:
          numberValue(rails),

        picketWidthIn:
          numberValue(picketWidth),

        picketGapIn:
          numberValue(picketGap),

        panelWidth:
          numberValue(panelWidth),

        postHoleDiameterIn:
          numberValue(holeDiameter),

        postHoleDepthIn:
          numberValue(holeDepth),

        concreteBagSize:
          bagSize,

        wastePercent:
          numberValue(waste),

        chainRollLength:
          numberValue(rollLength),

        chainCorners:
          numberValue(corners),

        paintCoverageSqFt:
          numberValue(paintCoverage),

        paintCoats:
          numberValue(paintCoats),

        paintSides,

        pricePost:
          pricePost === ""
            ? undefined
            : numberValue(pricePost),

        priceRail:
          priceRail === ""
            ? undefined
            : numberValue(priceRail),

        pricePicket:
          pricePicket === ""
            ? undefined
            : numberValue(pricePicket),

        pricePanel:
          pricePanel === ""
            ? undefined
            : numberValue(pricePanel),

        priceConcreteBag:
          priceConcrete === ""
            ? undefined
            : numberValue(priceConcrete),

        priceChainFabricPerFt:
          priceFabric === ""
            ? undefined
            : numberValue(priceFabric),

        priceLinePost:
          priceLinePost === ""
            ? undefined
            : numberValue(priceLinePost),

        priceTerminalPost:
          priceTerminalPost === ""
            ? undefined
            : numberValue(
                priceTerminalPost,
              ),

        priceTopRailPerFt:
          priceTopRail === ""
            ? undefined
            : numberValue(
                priceTopRail,
              ),

        pricePaintPerGallon:
          pricePaint === ""
            ? undefined
            : numberValue(pricePaint),
      }),
    [
      mode,
      unit,
      length,
      height,
      spacing,
      gates,
      gateWidth,
      rails,
      picketWidth,
      picketGap,
      panelWidth,
      holeDiameter,
      holeDepth,
      bagSize,
      waste,
      rollLength,
      corners,
      paintCoverage,
      paintCoats,
      paintSides,
      pricePost,
      priceRail,
      pricePicket,
      pricePanel,
      priceConcrete,
      priceFabric,
      priceLinePost,
      priceTerminalPost,
      priceTopRail,
      pricePaint,
    ],
  );

  const display = (
    value: number,
    digits = 1,
  ) =>
    Number.isFinite(value)
      ? value
          .toFixed(digits)
          .replace(/\.0+$/, "")
      : "—";

  const money = (
    value: number | null,
  ) =>
    value === null
      ? "Enter prices below"
      : `$${value.toLocaleString(
          undefined,
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        )}`;

  return (
    <section className="mx-auto max-w-4xl px-3 sm:px-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

        {/* Fence Type */}
        <div className="mb-5 grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1">
          {[
            [
              "wood-picket",
              "Wood / Picket",
            ],
            [
              "wood-panel",
              "Fence Panels",
            ],
            [
              "chain-link",
              "Chain Link",
            ],
          ].map(
            ([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setMode(
                    value as FenceMode,
                  )
                }
                className={`rounded-lg px-2 py-2.5 text-sm font-semibold transition ${
                  mode === value
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {label}
              </button>
            ),
          )}
        </div>

        {/* Basic dimensions */}
        <div className="grid gap-4 sm:grid-cols-2">

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-800">
              Measurement unit
            </span>

            <select
              value={unit}
              onChange={(e) =>
                setUnit(
                  e.target.value as FenceUnit,
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {units.map(
                (item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ),
              )}
            </select>
          </label>

          <Field
            label="Fence length"
            value={length}
            onChange={setLength}
            suffix={unit}
            placeholder="100"
          />

          <Field
            label="Fence height"
            value={height}
            onChange={setHeight}
            suffix={unit}
            placeholder="6"
          />

          <Field
            label="Post spacing"
            value={spacing}
            onChange={setSpacing}
            suffix={unit}
            placeholder="8"
          />

          <Field
            label="Number of gates"
            value={gates}
            onChange={setGates}
            step="1"
            placeholder="0"
          />

          <Field
            label="Gate width each"
            value={gateWidth}
            onChange={setGateWidth}
            suffix={unit}
            placeholder="4"
          />
        </div>

        {/* Wood materials */}
        {mode !== "chain-link" && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="font-semibold text-slate-900">
              Fence materials
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">

              {mode ===
              "wood-picket" ? (
                <>
                  <Field
                    label="Picket / board width"
                    value={picketWidth}
                    onChange={
                      setPicketWidth
                    }
                    suffix="in"
                    placeholder="5.5"
                  />

                  <Field
                    label="Gap between pickets"
                    value={picketGap}
                    onChange={
                      setPicketGap
                    }
                    suffix="in"
                    placeholder="0.5"
                  />
                </>
              ) : (
                <Field
                  label="Panel width"
                  value={panelWidth}
                  onChange={
                    setPanelWidth
                  }
                  suffix={unit}
                  placeholder="8"
                />
              )}

              <Field
                label="Rails per section"
                value={rails}
                onChange={setRails}
                step="1"
                placeholder="3"
              />
            </div>
          </div>
        )}

        {/* Chain link */}
        {mode ===
          "chain-link" && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="font-semibold text-slate-900">
              Chain-link details
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">

              <Field
                label="Mesh roll length"
                value={rollLength}
                onChange={
                  setRollLength
                }
                suffix={unit}
                placeholder="50"
              />

              <Field
                label="Corners"
                value={corners}
                onChange={setCorners}
                step="1"
                placeholder="0"
              />
            </div>
          </div>
        )}

        {/* Concrete */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="font-semibold text-slate-900">
            Concrete for posts
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Enter the actual hole dimensions you plan to use.
            Concrete bag coverage varies by product, so verify
            the bag label before ordering.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">

            <Field
              label="Hole diameter"
              value={holeDiameter}
              onChange={
                setHoleDiameter
              }
              suffix="in"
              placeholder="10"
            />

            <Field
              label="Hole depth"
              value={holeDepth}
              onChange={
                setHoleDepth
              }
              suffix="in"
              placeholder="24"
            />

            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-slate-800">
                Concrete bag
              </span>

              <select
                value={bagSize}
                onChange={(e) =>
                  setBagSize(
                    e.target.value as ConcreteBagSize,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="50">
                  50 lb
                </option>
                <option value="60">
                  60 lb
                </option>
                <option value="80">
                  80 lb
                </option>
              </select>
            </label>
          </div>
        </div>

        {/* Paint / waste */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <Field
            label="Waste allowance"
            value={waste}
            onChange={setWaste}
            suffix="%"
            placeholder="10"
          />

          <Field
            label="Paint / stain coverage"
            value={paintCoverage}
            onChange={
              setPaintCoverage
            }
            suffix="sq ft/gal"
            placeholder="350"
          />

          <Field
            label="Paint / stain coats"
            value={paintCoats}
            onChange={setPaintCoats}
            step="1"
            placeholder="2"
          />

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-800">
              Fence sides to coat
            </span>

            <select
              value={paintSides}
              onChange={(e) =>
                setPaintSides(
                  Number(
                    e.target.value,
                  ) as 1 | 2,
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="1">
                One side
              </option>

              <option value="2">
                Both sides
              </option>
            </select>
          </label>
        </div>

        {/* Optional prices */}
        <details className="mt-6 rounded-xl border border-slate-200">
          <summary className="cursor-pointer px-4 py-3 font-semibold text-slate-900">
            Optional material prices
          </summary>

          <div className="grid gap-4 border-t border-slate-200 p-4 sm:grid-cols-2">

            <Field
              label="Price per post"
              value={pricePost}
              onChange={setPricePost}
              suffix="$"
            />

            <Field
              label="Price per rail"
              value={priceRail}
              onChange={setPriceRail}
              suffix="$"
            />

            <Field
              label="Price per picket"
              value={pricePicket}
              onChange={setPricePicket}
              suffix="$"
            />

            <Field
              label="Price per panel"
              value={pricePanel}
              onChange={setPricePanel}
              suffix="$"
            />

            <Field
              label="Price per concrete bag"
              value={priceConcrete}
              onChange={setPriceConcrete}
              suffix="$"
            />

            <Field
              label="Chain fabric / linear ft"
              value={priceFabric}
              onChange={setPriceFabric}
              suffix="$"
            />

            <Field
              label="Price per line post"
              value={priceLinePost}
              onChange={setPriceLinePost}
              suffix="$"
            />

            <Field
              label="Price per terminal post"
              value={priceTerminalPost}
              onChange={
                setPriceTerminalPost
              }
              suffix="$"
            />

            <Field
              label="Top rail / linear ft"
              value={priceTopRail}
              onChange={
                setPriceTopRail
              }
              suffix="$"
            />

            <Field
              label="Paint / stain per gallon"
              value={pricePaint}
              onChange={setPricePaint}
              suffix="$"
            />
          </div>
        </details>

        {/* Results */}
        <div className="mt-7">

          <h2 className="text-lg font-bold text-slate-900">
            Your fence estimate
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Planning estimate. Actual quantities depend on
            layout, corners, gate placement, product dimensions
            and local installation practice.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

            <Result
              label="Fence area"
              value={`${display(
                result.fenceAreaSqFt,
              )} sq ft`}
            />

            <Result
              label="Net fence length"
              value={`${display(
                result.netFenceLengthFt,
              )} ft`}
            />

            <Result
              label="Sections"
              value={`${result.sections}`}
            />

            <Result
              label="Posts needed"
              value={`${result.posts}`}
              strong
            />

            {/* Rails apply only to wood/picket and panel fences */}
            {mode !== "chain-link" && (
              <Result
                label="Rails needed"
                value={`${result.rails}`}
              />
            )}

            {mode ===
              "wood-picket" && (
              <>
                <Result
                  label="Pickets exact"
                  value={`${result.picketsExact}`}
                />

                <Result
                  label="Pickets to order"
                  value={`${result.picketsToOrder}`}
                  strong
                />
              </>
            )}

            {mode ===
              "wood-panel" && (
              <>
                <Result
                  label="Panels exact"
                  value={`${result.panelsExact}`}
                />

                <Result
                  label="Panels to order"
                  value={`${result.panelsToOrder}`}
                  strong
                />
              </>
            )}

            {mode ===
              "chain-link" && (
              <>
                <Result
                  label="Line posts"
                  value={`${result.linePosts}`}
                />

                <Result
                  label="Terminal posts"
                  value={`${result.terminalPosts}`}
                  strong
                />

                <Result
                  label="Chain-link fabric"
                  value={`${display(
                    result.chainFabricFt,
                  )} ft`}
                />

                <Result
                  label="Fabric rolls"
                  value={`${result.chainRolls}`}
                  strong
                />

                <Result
                  label="Top rail"
                  value={`${display(
                    result.topRailFt,
                  )} ft`}
                />
              </>
            )}

            <Result
              label="Concrete per post"
              value={`${display(
                result.concretePerPostCuFt,
                2,
              )} cu ft`}
            />

            <Result
              label="Total concrete"
              value={`${display(
                result.concreteTotalCuFt,
                2,
              )} cu ft`}
            />

            <Result
              label="Concrete bags"
              value={`${result.concreteBags}`}
              strong
            />

            <Result
              label="Paint / stain"
              value={`${display(
                result.paintGallons,
                2,
              )} gal`}
            />

            <Result
              label="Estimated material cost"
              value={money(
                result.estimatedCost,
              )}
              strong
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs leading-5 text-slate-600">
          <strong className="text-slate-900">
            Important:
          </strong>{" "}
          This is a planning estimator, not an engineering or
          building-code calculation. Confirm post spacing,
          footing depth, frost requirements, gate framing,
          product coverage and local code requirements with
          your supplier or qualified installer.
        </div>
      </div>
    </section>
  );
}
