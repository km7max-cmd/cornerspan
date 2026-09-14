"use client";

import { useMemo, useState } from "react";
import {
  calculateFence,
  type FenceMode,
  type FenceUnit,
  type ConcreteBagSize,
} from "./calculations";

type ResultProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function Result({ label, value, highlight = false }: ResultProps) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-blue-200 bg-blue-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </div>

      <div
        className={`mt-1 text-xl font-bold ${
          highlight ? "text-blue-700" : "text-slate-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function SectionHeader({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
        {number}
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
    </div>
  );
}

function InputLabel({
  label,
  hint,
}: {
  label: string;
  hint?: string;
}) {
  return (
    <div className="mb-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const selectClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function FenceCalculator() {
  const [mode, setMode] = useState<FenceMode>("wood-picket");

  const [projectLength, setProjectLength] = useState("100");
  const [projectHeight, setProjectHeight] = useState("6");
  const [projectUnit, setProjectUnit] = useState<FenceUnit>("ft");

  const [postSpacing, setPostSpacing] = useState("8");

  const [gateCount, setGateCount] = useState("0");
  const [gateWidth, setGateWidth] = useState("4");

  const [railsPerSection, setRailsPerSection] = useState("3");

  const [picketWidth, setPicketWidth] = useState("5.5");
  const [picketGap, setPicketGap] = useState("0.5");

  const [panelWidth, setPanelWidth] = useState("8");

  const [holeDiameter, setHoleDiameter] = useState("10");
  const [holeDepth, setHoleDepth] = useState("24");
  const [concreteBagSize, setConcreteBagSize] =
    useState<ConcreteBagSize>("80");

  const [wastePercent, setWastePercent] = useState("10");

  const [chainRollLength, setChainRollLength] = useState("50");
  const [chainCorners, setChainCorners] = useState("0");

  const [paintCoverage, setPaintCoverage] = useState("350");
  const [paintCoats, setPaintCoats] = useState("2");
  const [paintSides, setPaintSides] = useState("1");

  const [pricePost, setPricePost] = useState("");
  const [priceRail, setPriceRail] = useState("");
  const [pricePicket, setPricePicket] = useState("");
  const [pricePanel, setPricePanel] = useState("");
  const [priceConcreteBag, setPriceConcreteBag] = useState("");
  const [priceChainFabricFt, setPriceChainFabricFt] = useState("");
  const [priceLinePost, setPriceLinePost] = useState("");
  const [priceTerminalPost, setPriceTerminalPost] = useState("");
  const [priceTopRailFt, setPriceTopRailFt] = useState("");
  const [pricePaintGallon, setPricePaintGallon] = useState("");

  const result = useMemo(() => {
    return calculateFence({
      mode,
      projectLength,
      projectHeight,
      projectUnit,
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
    });
  }, [
    mode,
    projectLength,
    projectHeight,
    projectUnit,
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

  const isChainLink = mode === "chain-link";
  const isPanel = mode === "wood-panel";

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Calculator shell */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-6 sm:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Fence Calculator
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Estimate fence posts, rails, pickets, panels, concrete,
            chain-link fabric, paint and material costs for your project.
          </p>
        </div>

        {/* Fence type */}
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <SectionHeader
            number={1}
            title="Choose Fence Type"
            description="Select the fence style you are planning to build."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => setMode("wood-picket")}
              className={`rounded-xl border-2 p-4 text-left transition ${
                mode === "wood-picket"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="font-bold text-slate-900">
                Wood / Picket
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Posts, rails and individual pickets
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("wood-panel")}
              className={`rounded-xl border-2 p-4 text-left transition ${
                mode === "wood-panel"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="font-bold text-slate-900">
                Fence Panels
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Pre-built panels between posts
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("chain-link")}
              className={`rounded-xl border-2 p-4 text-left transition ${
                mode === "chain-link"
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="font-bold text-slate-900">
                Chain Link
              </div>

              <div className="mt-1 text-xs text-slate-500">
                Fabric, line posts and terminal posts
              </div>
            </button>
          </div>
        </div>

        {/* Project dimensions */}
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <SectionHeader
            number={2}
            title="Project Dimensions"
            description="Enter the total fence length and height."
          />

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <InputLabel label="Fence Length" />

              <input
                type="number"
                min="0"
                step="any"
                value={projectLength}
                onChange={(e) => setProjectLength(e.target.value)}
                className={inputClass}
                placeholder="Enter length"
              />
            </div>

            <div>
              <InputLabel label="Fence Height" />

              <input
                type="number"
                min="0"
                step="any"
                value={projectHeight}
                onChange={(e) => setProjectHeight(e.target.value)}
                className={inputClass}
                placeholder="Enter height"
              />
            </div>

            <div>
              <InputLabel label="Measurement Unit" />

              <select
                value={projectUnit}
                onChange={(e) =>
                  setProjectUnit(e.target.value as FenceUnit)
                }
                className={selectClass}
              >
                <option value="ft">Feet</option>
                <option value="m">Meters</option>
                <option value="in">Inches</option>
                <option value="cm">Centimeters</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fence settings */}
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <SectionHeader
            number={3}
            title="Fence Settings"
            description="Adjust spacing and material dimensions for your fence."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <InputLabel
                label="Post Spacing"
                hint="Typical spacing is around 6–8 ft."
              />

              <input
                type="number"
                min="0"
                step="any"
                value={postSpacing}
                onChange={(e) => setPostSpacing(e.target.value)}
                className={inputClass}
              />
            </div>

            {!isChainLink && (
              <div>
                <InputLabel label="Rails Per Section" />

                <input
                  type="number"
                  min="0"
                  step="1"
                  value={railsPerSection}
                  onChange={(e) =>
                    setRailsPerSection(e.target.value)
                  }
                  className={inputClass}
                />
              </div>
            )}

            {mode === "wood-picket" && (
              <>
                <div>
                  <InputLabel label="Picket Width" />

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={picketWidth}
                    onChange={(e) =>
                      setPicketWidth(e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <InputLabel
                    label="Gap Between Pickets"
                    hint="Use 0 for a solid installation."
                  />

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={picketGap}
                    onChange={(e) =>
                      setPicketGap(e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {isPanel && (
              <div>
                <InputLabel label="Panel Width" />

                <input
                  type="number"
                  min="0"
                  step="any"
                  value={panelWidth}
                  onChange={(e) => setPanelWidth(e.target.value)}
                  className={inputClass}
                />
              </div>
            )}

            {isChainLink && (
              <>
                <div>
                  <InputLabel
                    label="Chain-Link Roll Length"
                    hint="Length of one fabric roll."
                  />

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={chainRollLength}
                    onChange={(e) =>
                      setChainRollLength(e.target.value)
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <InputLabel
                    label="Corners"
                    hint="Number of corner posts."
                  />

                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={chainCorners}
                    onChange={(e) =>
                      setChainCorners(e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Gates */}
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <SectionHeader
            number={4}
            title="Gates"
            description="Add gates if your fence layout includes them."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <InputLabel label="Number of Gates" />

              <input
                type="number"
                min="0"
                step="1"
                value={gateCount}
                onChange={(e) => setGateCount(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <InputLabel label="Gate Width" />

              <input
                type="number"
                min="0"
                step="any"
                value={gateWidth}
                onChange={(e) => setGateWidth(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Concrete */}
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <SectionHeader
            number={5}
            title="Post Hole & Concrete"
            description="Estimate concrete needed for your fence posts."
          />

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <InputLabel label="Hole Diameter (in)" />

              <input
                type="number"
                min="0"
                step="any"
                value={holeDiameter}
                onChange={(e) => setHoleDiameter(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <InputLabel label="Hole Depth (in)" />

              <input
                type="number"
                min="0"
                step="any"
                value={holeDepth}
                onChange={(e) => setHoleDepth(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <InputLabel label="Concrete Bag Size" />

              <select
                value={concreteBagSize}
                onChange={(e) =>
                  setConcreteBagSize(
                    e.target.value as ConcreteBagSize
                  )
                }
                className={selectClass}
              >
                <option value="50">50 lb</option>
                <option value="60">60 lb</option>
                <option value="80">80 lb</option>
              </select>
            </div>
          </div>
        </div>

        {/* Waste */}
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <SectionHeader
            number={6}
            title="Waste Allowance"
            description="Add extra material to account for cuts, damage and installation waste."
          />

          <div className="max-w-sm">
            <InputLabel label="Waste Percentage" />

            <input
              type="number"
              min="0"
              step="1"
              value={wastePercent}
              onChange={(e) => setWastePercent(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Paint */}
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <SectionHeader
            number={7}
            title="Paint or Stain"
            description="Optional estimate for painting or staining the fence."
          />

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <InputLabel label="Coverage (sq ft / gallon)" />

              <input
                type="number"
                min="0"
                step="any"
                value={paintCoverage}
                onChange={(e) => setPaintCoverage(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <InputLabel label="Number of Coats" />

              <input
                type="number"
                min="0"
                step="1"
                value={paintCoats}
                onChange={(e) => setPaintCoats(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <InputLabel label="Sides to Paint" />

              <select
                value={paintSides}
                onChange={(e) => setPaintSides(e.target.value)}
                className={selectClass}
              >
                <option value="1">1 side</option>
                <option value="2">2 sides</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
          <SectionHeader
            number={8}
            title="Optional Material Pricing"
            description="Enter unit prices if you also want an estimated material cost."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {!isChainLink && (
              <>
                <div>
                  <InputLabel label="Price per Post" />

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={pricePost}
                    onChange={(e) => setPricePost(e.target.value)}
                    className={inputClass}
                    placeholder="Optional"
                  />
                </div>

                {!isPanel && (
                  <div>
                    <InputLabel label="Price per Rail" />

                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={priceRail}
                      onChange={(e) => setPriceRail(e.target.value)}
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                )}

                {mode === "wood-picket" && (
                  <div>
                    <InputLabel label="Price per Picket" />

                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={pricePicket}
                      onChange={(e) =>
                        setPricePicket(e.target.value)
                      }
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                )}

                {isPanel && (
                  <div>
                    <InputLabel label="Price per Panel" />

                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={pricePanel}
                      onChange={(e) =>
                        setPricePanel(e.target.value)
                      }
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                )}
              </>
            )}

            {isChainLink && (
              <>
                <div>
                  <InputLabel label="Price per Line Post" />

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={priceLinePost}
                    onChange={(e) =>
                      setPriceLinePost(e.target.value)
                    }
                    className={inputClass}
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <InputLabel label="Price per Terminal Post" />

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={priceTerminalPost}
                    onChange={(e) =>
                      setPriceTerminalPost(e.target.value)
                    }
                    className={inputClass}
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <InputLabel label="Price per ft of Fabric" />

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={priceChainFabricFt}
                    onChange={(e) =>
                      setPriceChainFabricFt(e.target.value)
                    }
                    className={inputClass}
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <InputLabel label="Price per ft of Top Rail" />

                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={priceTopRailFt}
                    onChange={(e) =>
                      setPriceTopRailFt(e.target.value)
                    }
                    className={inputClass}
                    placeholder="Optional"
                  />
                </div>
              </>
            )}

            <div>
              <InputLabel label="Price per Concrete Bag" />

              <input
                type="number"
                min="0"
                step="any"
                value={priceConcreteBag}
                onChange={(e) =>
                  setPriceConcreteBag(e.target.value)
                }
                className={inputClass}
                placeholder="Optional"
              />
            </div>

            <div>
              <InputLabel label="Price per Gallon of Paint" />

              <input
                type="number"
                min="0"
                step="any"
                value={pricePaintGallon}
                onChange={(e) =>
                  setPricePaintGallon(e.target.value)
                }
                className={inputClass}
                placeholder="Optional"
              />
            </div>
          </div>
        </div>

        {/* Calculate */}
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-6 sm:px-8">
          <button
            type="button"
            className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Calculate Fence Estimate
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">
            Estimates are based on the dimensions and material settings
            entered above.
          </p>
        </div>

        {/* Results */}
        <div className="bg-slate-50 px-5 py-7 sm:px-8">
          <div className="mb-6">
            <div className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Your Estimate
            </div>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Fence Material Results
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review the estimated quantities below.
            </p>
          </div>

          {/* Main results */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Result
              label="Fence Area"
              value={`${result.fenceArea.toFixed(0)} sq ft`}
              highlight
            />

            <Result
              label="Fence Sections"
              value={`${result.sections}`}
            />

            <Result
              label="Posts Needed"
              value={`${result.posts}`}
              highlight
            />

            {!isChainLink && (
              <Result
                label="Rails Needed"
                value={`${result.rails}`}
              />
            )}

            {mode === "wood-picket" && (
              <>
                <Result
                  label="Pickets Exact"
                  value={`${result.picketsExact}`}
                />

                <Result
                  label="Pickets to Order"
                  value={`${result.picketsToOrder}`}
                  highlight
                />
              </>
            )}

            {isPanel && (
              <>
                <Result
                  label="Panels Exact"
                  value={`${result.panelsExact}`}
                />

                <Result
                  label="Panels to Order"
                  value={`${result.panelsToOrder}`}
                  highlight
                />
              </>
            )}

            {isChainLink && (
              <>
                <Result
                  label="Line Posts"
                  value={`${result.linePosts}`}
                />

                <Result
                  label="Terminal Posts"
                  value={`${result.terminalPosts}`}
                />

                <Result
                  label="Fabric"
                  value={`${result.chainFabricFt.toFixed(1)} ft`}
                />

                <Result
                  label="Fabric Rolls"
                  value={`${result.chainRolls}`}
                  highlight
                />

                <Result
                  label="Top Rail"
                  value={`${result.topRailFt.toFixed(1)} ft`}
                />
              </>
            )}
          </div>

          {/* Concrete */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-900">
              Concrete Estimate
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Based on your post-hole dimensions and number of posts.
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Result
                label="Concrete / Post"
                value={`${result.concretePerPost.toFixed(2)} cu ft`}
              />

              <Result
                label="Total Concrete"
                value={`${result.totalConcreteCuFt.toFixed(2)} cu ft`}
              />

              <Result
                label={`${concreteBagSize}-lb Bags`}
                value={`${result.concreteBags}`}
                highlight
              />
            </div>
          </div>

          {/* Paint */}
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-900">
              Paint or Stain Estimate
            </h3>

            <div className="mt-4">
              <Result
                label="Paint Needed"
                value={`${result.paintGallons.toFixed(2)} gallons`}
                highlight
              />
            </div>
          </div>

          {/* Cost */}
          {result.totalCost !== null && (
            <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Estimated Material Cost
              </div>

              <div className="mt-1 text-3xl font-bold text-slate-900">
                ${result.totalCost.toFixed(2)}
              </div>

              <p className="mt-2 text-xs text-slate-600">
                Cost is based only on the optional material prices you
                entered. Labor and local taxes are not included.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
