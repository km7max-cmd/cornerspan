"use client";

import { useMemo, useState } from "react";
import {
  calculateFence,
  type FenceMode,
  type FenceUnit,
  type ConcreteBagSize,
} from "./calculations";

type ResultCardProps = {
  label: string;
  value: string;
  primary?: boolean;
};

function ResultCard({
  label,
  value,
  primary = false,
}: ResultCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        primary
          ? "border-blue-200 bg-blue-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p
        className={`mt-1 text-2xl font-bold tracking-tight ${
          primary ? "text-blue-700" : "text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {children}

      {hint && (
        <p className="mt-1 text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const selectClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function FenceCalculator() {
  const [mode, setMode] =
    useState<FenceMode>("wood-picket");

  const [projectLength, setProjectLength] =
    useState("100");

  const [projectHeight, setProjectHeight] =
    useState("6");

  const [projectUnit, setProjectUnit] =
    useState<FenceUnit>("ft");

  const [postSpacing, setPostSpacing] =
    useState("8");

  const [gateCount, setGateCount] =
    useState("0");

  const [gateWidth, setGateWidth] =
    useState("4");

  const [railsPerSection, setRailsPerSection] =
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

  const [concreteBagSize, setConcreteBagSize] =
    useState<ConcreteBagSize>("80");

  const [wastePercent, setWastePercent] =
    useState("10");

  const [chainRollLength, setChainRollLength] =
    useState("50");

  const [chainCorners, setChainCorners] =
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

  const [priceConcreteBag, setPriceConcreteBag] =
    useState("");

  const [priceChainFabricFt, setPriceChainFabricFt] =
    useState("");

  const [priceLinePost, setPriceLinePost] =
    useState("");

  const [priceTerminalPost, setPriceTerminalPost] =
    useState("");

  const [priceTopRailFt, setPriceTopRailFt] =
    useState("");

  const [pricePaintGallon, setPricePaintGallon] =
    useState("");

  const result = useMemo(() => {
    return calculateFence({
      mode,

      unit: projectUnit,

      fenceLength:
        Number(projectLength) || 0,

      fenceHeight:
        Number(projectHeight) || 0,

      postSpacing:
        Number(postSpacing) || 0,

      gates:
        Number(gateCount) || 0,

      gateWidth:
        Number(gateWidth) || 0,

      railsPerSection:
        Number(railsPerSection) || 0,

      picketWidthIn:
        Number(picketWidth) || 0,

      picketGapIn:
        Number(picketGap) || 0,

      panelWidth:
        Number(panelWidth) || 0,

      postHoleDiameterIn:
        Number(holeDiameter) || 0,

      postHoleDepthIn:
        Number(holeDepth) || 0,

      concreteBagSize,

      wastePercent:
        Number(wastePercent) || 0,

      chainRollLength:
        Number(chainRollLength) || 0,

      chainCorners:
        Number(chainCorners) || 0,

      paintCoverageSqFt:
        Number(paintCoverage) || 0,

      paintCoats:
        Number(paintCoats) || 0,

      paintSides,

      pricePost:
        pricePost === ""
          ? undefined
          : Number(pricePost),

      priceRail:
        priceRail === ""
          ? undefined
          : Number(priceRail),

      pricePicket:
        pricePicket === ""
          ? undefined
          : Number(pricePicket),

      pricePanel:
        pricePanel === ""
          ? undefined
          : Number(pricePanel),

      priceConcreteBag:
        priceConcreteBag === ""
          ? undefined
          : Number(priceConcreteBag),

      priceChainFabricPerFt:
        priceChainFabricFt === ""
          ? undefined
          : Number(priceChainFabricFt),

      priceLinePost:
        priceLinePost === ""
          ? undefined
          : Number(priceLinePost),

      priceTerminalPost:
        priceTerminalPost === ""
          ? undefined
          : Number(priceTerminalPost),

      priceTopRailPerFt:
        priceTopRailFt === ""
          ? undefined
          : Number(priceTopRailFt),

      pricePaintPerGallon:
        pricePaintGallon === ""
          ? undefined
          : Number(pricePaintGallon),
    });
  }, [
    mode,
    projectUnit,
    projectLength,
    projectHeight,
    postSpacing,
    gateCount,
    gateWidth,
    railsPerSection,
    picketWidth,
    picketGap,
    panelWidth,
    holeDiameter,
    holeDepth,
    concreteBagSize,
    wastePercent,
    chainRollLength,
    chainCorners,
    paintCoverage,
    paintCoats,
    paintSides,
    pricePost,
    priceRail,
    pricePicket,
    pricePanel,
    priceConcreteBag,
    priceChainFabricFt,
    priceLinePost,
    priceTerminalPost,
    priceTopRailFt,
    pricePaintGallon,
  ]);

  const isChainLink =
    mode === "chain-link";

  const isPanel =
    mode === "wood-panel";

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

        {/* Calculator header */}
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg text-white">
              📐
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Construction Calculator
              </p>

              <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Fence Material Calculator
              </h2>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Enter your fence dimensions to estimate the materials
            needed for your project.
          </p>
        </div>

        {/* Main calculator area */}
        <div className="grid lg:grid-cols-2">

          {/* LEFT — INPUTS */}
          <div className="border-b border-slate-200 lg:border-b-0 lg:border-r">
            <div className="px-5 py-6 sm:px-8">

              {/* Fence type */}
              <div>
                <p className="mb-3 text-sm font-bold text-slate-900">
                  Fence Type
                </p>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setMode("wood-picket")
                    }
                    className={`rounded-lg border-2 px-3 py-3 text-sm font-semibold transition ${
                      mode === "wood-picket"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    Wood / Picket
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setMode("wood-panel")
                    }
                    className={`rounded-lg border-2 px-3 py-3 text-sm font-semibold transition ${
                      mode === "wood-panel"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    Panels
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setMode("chain-link")
                    }
                    className={`rounded-lg border-2 px-3 py-3 text-sm font-semibold transition ${
                      mode === "chain-link"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    Chain Link
                  </button>
                </div>
              </div>

              {/* Primary dimensions */}
              <div className="mt-7">
                <p className="mb-3 text-sm font-bold text-slate-900">
                  Fence Dimensions
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Fence Length">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={projectLength}
                      onChange={(e) =>
                        setProjectLength(
                          e.target.value,
                        )
                      }
                      className={inputClass}
                      placeholder="100"
                    />
                  </Field>

                  <Field label="Fence Height">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={projectHeight}
                      onChange={(e) =>
                        setProjectHeight(
                          e.target.value,
                        )
                      }
                      className={inputClass}
                      placeholder="6"
                    />
                  </Field>

                  <Field label="Unit">
                    <select
                      value={projectUnit}
                      onChange={(e) =>
                        setProjectUnit(
                          e.target.value as FenceUnit,
                        )
                      }
                      className={selectClass}
                    >
                      <option value="ft">
                        Feet
                      </option>

                      <option value="m">
                        Meters
                      </option>

                      <option value="in">
                        Inches
                      </option>

                      <option value="cm">
                        Centimeters
                      </option>
                    </select>
                  </Field>
                </div>
              </div>

              {/* Post spacing */}
              <div className="mt-5">
                <Field
                  label="Post Spacing"
                  hint="Common residential spacing is approximately 6–8 ft."
                >
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={postSpacing}
                    onChange={(e) =>
                      setPostSpacing(
                        e.target.value,
                      )
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* Calculate button */}
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  Calculate Fence Materials
                </button>

                <p className="mt-2 text-center text-xs text-slate-500">
                  Results update automatically as you change your inputs.
                </p>
              </div>

              {/* Advanced options */}
              <details className="mt-6 overflow-hidden rounded-xl border border-slate-200">
                <summary className="cursor-pointer list-none px-4 py-4 text-sm font-bold text-slate-900">
                  <span className="flex items-center justify-between">
                    <span>More Fence Options</span>
                    <span className="text-slate-400">
                      +
                    </span>
                  </span>
                </summary>

                <div className="border-t border-slate-200 px-4 py-5">

                  {/* Material settings */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Material Settings
                    </h3>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">

                      {!isChainLink && (
                        <Field label="Rails Per Section">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={railsPerSection}
                            onChange={(e) =>
                              setRailsPerSection(
                                e.target.value,
                              )
                            }
                            className={inputClass}
                          />
                        </Field>
                      )}

                      {mode === "wood-picket" && (
                        <>
                          <Field label="Picket Width (in)">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={picketWidth}
                              onChange={(e) =>
                                setPicketWidth(
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                            />
                          </Field>

                          <Field label="Picket Gap (in)">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={picketGap}
                              onChange={(e) =>
                                setPicketGap(
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                            />
                          </Field>
                        </>
                      )}

                      {isPanel && (
                        <Field label="Panel Width">
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={panelWidth}
                            onChange={(e) =>
                              setPanelWidth(
                                e.target.value,
                              )
                            }
                            className={inputClass}
                          />
                        </Field>
                      )}

                      {isChainLink && (
                        <>
                          <Field
                            label="Chain-Link Roll Length (ft)"
                            hint="Length of one fabric roll."
                          >
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={chainRollLength}
                              onChange={(e) =>
                                setChainRollLength(
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                            />
                          </Field>

                          <Field label="Corners">
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={chainCorners}
                              onChange={(e) =>
                                setChainCorners(
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                            />
                          </Field>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Gates */}
                  <div className="mt-7 border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-bold text-slate-900">
                      Gates
                    </h3>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <Field label="Number of Gates">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={gateCount}
                          onChange={(e) =>
                            setGateCount(
                              e.target.value,
                            )
                          }
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Gate Width">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={gateWidth}
                          onChange={(e) =>
                            setGateWidth(
                              e.target.value,
                            )
                          }
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Concrete */}
                  <div className="mt-7 border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-bold text-slate-900">
                      Post Hole & Concrete
                    </h3>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <Field label="Hole Diameter (in)">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={holeDiameter}
                          onChange={(e) =>
                            setHoleDiameter(
                              e.target.value,
                            )
                          }
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Hole Depth (in)">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={holeDepth}
                          onChange={(e) =>
                            setHoleDepth(
                              e.target.value,
                            )
                          }
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Concrete Bag">
                        <select
                          value={concreteBagSize}
                          onChange={(e) =>
                            setConcreteBagSize(
                              e.target.value as ConcreteBagSize,
                            )
                          }
                          className={selectClass}
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
                      </Field>
                    </div>
                  </div>

                  {/* Waste */}
                  <div className="mt-7 border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-bold text-slate-900">
                      Waste Allowance
                    </h3>

                    <div className="mt-4 max-w-xs">
                      <Field
                        label="Waste Percentage"
                        hint="10% is a common starting point for material estimates."
                      >
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={wastePercent}
                          onChange={(e) =>
                            setWastePercent(
                              e.target.value,
                            )
                          }
                          className={inputClass}
                        />
                      </Field>
                    </div>
                  </div>

                  {/* Paint */}
                  <div className="mt-7 border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-bold text-slate-900">
                      Paint or Stain
                    </h3>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <Field label="Coverage / Gallon">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={paintCoverage}
                          onChange={(e) =>
                            setPaintCoverage(
                              e.target.value,
                            )
                          }
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Coats">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={paintCoats}
                          onChange={(e) =>
                            setPaintCoats(
                              e.target.value,
                            )
                          }
                          className={inputClass}
                        />
                      </Field>

                      <Field label="Sides">
                        <select
                          value={paintSides}
                          onChange={(e) =>
                            setPaintSides(
                              Number(
                                e.target.value,
                              ) as 1 | 2,
                            )
                          }
                          className={selectClass}
                        >
                          <option value="1">
                            1 side
                          </option>

                          <option value="2">
                            2 sides
                          </option>
                        </select>
                      </Field>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mt-7 border-t border-slate-200 pt-6">
                    <h3 className="text-sm font-bold text-slate-900">
                      Material Pricing
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Optional. Enter your local material prices.
                    </p>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">

                      {!isChainLink && (
                        <>
                          <Field label="Price / Post">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={pricePost}
                              onChange={(e) =>
                                setPricePost(
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                              placeholder="Optional"
                            />
                          </Field>

                          {!isPanel && (
                            <Field label="Price / Rail">
                              <input
                                type="number"
                                min="0"
                                step="any"
                                value={priceRail}
                                onChange={(e) =>
                                  setPriceRail(
                                    e.target.value,
                                  )
                                }
                                className={inputClass}
                                placeholder="Optional"
                              />
                            </Field>
                          )}

                          {mode === "wood-picket" && (
                            <Field label="Price / Picket">
                              <input
                                type="number"
                                min="0"
                                step="any"
                                value={pricePicket}
                                onChange={(e) =>
                                  setPricePicket(
                                    e.target.value,
                                  )
                                }
                                className={inputClass}
                                placeholder="Optional"
                              />
                            </Field>
                          )}

                          {isPanel && (
                            <Field label="Price / Panel">
                              <input
                                type="number"
                                min="0"
                                step="any"
                                value={pricePanel}
                                onChange={(e) =>
                                  setPricePanel(
                                    e.target.value,
                                  )
                                }
                                className={inputClass}
                                placeholder="Optional"
                              />
                            </Field>
                          )}
                        </>
                      )}

                      {isChainLink && (
                        <>
                          <Field label="Price / Line Post">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={priceLinePost}
                              onChange={(e) =>
                                setPriceLinePost(
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                              placeholder="Optional"
                            />
                          </Field>

                          <Field label="Price / Terminal Post">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={priceTerminalPost}
                              onChange={(e) =>
                                setPriceTerminalPost(
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                              placeholder="Optional"
                            />
                          </Field>

                          <Field label="Price / ft Fabric">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={priceChainFabricFt}
                              onChange={(e) =>
                                setPriceChainFabricFt(
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                              placeholder="Optional"
                            />
                          </Field>

                          <Field label="Price / ft Top Rail">
                            <input
                              type="number"
                              min="0"
                              step="any"
                              value={priceTopRailFt}
                              onChange={(e) =>
                                setPriceTopRailFt(
                                  e.target.value,
                                )
                              }
                              className={inputClass}
                              placeholder="Optional"
                            />
                          </Field>
                        </>
                      )}

                      <Field label="Price / Concrete Bag">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={priceConcreteBag}
                          onChange={(e) =>
                            setPriceConcreteBag(
                              e.target.value,
                            )
                          }
                          className={inputClass}
                          placeholder="Optional"
                        />
                      </Field>

                      <Field label="Price / Gallon Paint">
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={pricePaintGallon}
                          onChange={(e) =>
                            setPricePaintGallon(
                              e.target.value,
                            )
                          }
                          className={inputClass}
                          placeholder="Optional"
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>

          {/* RIGHT — RESULTS */}
          <div className="bg-slate-50 px-5 py-6 sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Your Estimate
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Materials Needed
                </h2>
              </div>

              <div className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-500 shadow-sm">
                {projectUnit.toUpperCase()}
              </div>
            </div>

            {/* Primary result */}
            <div className="mt-6 rounded-2xl border border-blue-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Fence Area
              </p>

              <p className="mt-1 text-4xl font-bold tracking-tight text-blue-700">
                {result.fenceAreaSqFt.toFixed(0)}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                square feet
              </p>
            </div>

            {/* Main materials */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ResultCard
                label="Fence Sections"
                value={`${result.sections}`}
              />

              <ResultCard
                label="Posts Needed"
                value={`${result.posts}`}
                primary
              />

              {!isChainLink && (
                <ResultCard
                  label="Rails Needed"
                  value={`${result.rails}`}
                />
              )}

              {mode === "wood-picket" && (
                <>
                  <ResultCard
                    label="Pickets Exact"
                    value={`${result.picketsExact}`}
                  />

                  <ResultCard
                    label="Pickets to Order"
                    value={`${result.picketsToOrder}`}
                    primary
                  />
                </>
              )}

              {isPanel && (
                <>
                  <ResultCard
                    label="Panels Exact"
                    value={`${result.panelsExact}`}
                  />

                  <ResultCard
                    label="Panels to Order"
                    value={`${result.panelsToOrder}`}
                    primary
                  />
                </>
              )}

              {isChainLink && (
                <>
                  <ResultCard
                    label="Line Posts"
                    value={`${result.linePosts}`}
                  />

                  <ResultCard
                    label="Terminal Posts"
                    value={`${result.terminalPosts}`}
                  />

                  <ResultCard
                    label="Fabric"
                    value={`${result.chainFabricFt.toFixed(
                      1,
                    )} ft`}
                  />

                  <ResultCard
                    label="Fabric Rolls"
                    value={`${result.chainRolls}`}
                    primary
                  />

                  <ResultCard
                    label="Top Rail"
                    value={`${result.topRailFt.toFixed(
                      1,
                    )} ft`}
                  />
                </>
              )}
            </div>

            {/* Concrete */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Concrete
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <ResultCard
                  label="Per Post"
                  value={`${result.concretePerPostCuFt.toFixed(
                    2,
                  )} cu ft`}
                />

                <ResultCard
                  label="Total"
                  value={`${result.concreteTotalCuFt.toFixed(
                    2,
                  )} cu ft`}
                />

                <ResultCard
                  label={`${concreteBagSize}-lb Bags`}
                  value={`${result.concreteBags}`}
                  primary
                />
              </div>
            </div>

            {/* Paint */}
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                Paint / Stain
              </h3>

              <div className="mt-4">
                <ResultCard
                  label="Estimated Paint"
                  value={`${result.paintGallons.toFixed(
                    2,
                  )} gal`}
                  primary
                />
              </div>
            </div>

            {/* Cost */}
            {result.estimatedCost !== null && (
              <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  Estimated Material Cost
                </p>

                <p className="mt-1 text-3xl font-bold text-slate-900">
                  ${result.estimatedCost.toFixed(2)}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Based on the prices entered above. Labor,
                  delivery, permits and taxes are not included.
                </p>
              </div>
            )}

            {/* Small note */}
            <p className="mt-5 text-xs leading-5 text-slate-500">
              Estimates are for planning purposes. Actual material
              requirements can vary with fence layout, terrain,
              installation method and local requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
