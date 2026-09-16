"use client";

import { useMemo, useState } from "react";

type Unit = "ft" | "m";

type Currency =
  | "USD"
  | "INR"
  | "EUR"
  | "GBP"
  | "CAD"
  | "AUD"
  | "AED";

const CURRENCIES: Record<Currency, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  CAD: "C$",
  AUD: "A$",
  AED: "د.إ",
};

const GRAVEL_TYPES = [
  {
    name: "Crushed Stone",
    density: 1.4,
  },
  {
    name: "Pea Gravel",
    density: 1.5,
  },
  {
    name: "River Rock",
    density: 1.45,
  },
  {
    name: "Road Base",
    density: 1.6,
  },
  {
    name: "Limestone",
    density: 1.5,
  },
];

function toFeet(value: number, unit: Unit) {
  return unit === "ft" ? value : value * 3.280839895;
}

function formatNumber(value: number, decimals = 2) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return value.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
  });
}

export default function GravelCalculator() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("4");

  const [depthUnit, setDepthUnit] = useState<"in" | "ft">("in");

  const [unit, setUnit] = useState<Unit>("ft");

  const [gravelType, setGravelType] =
    useState("Crushed Stone");

  const [density, setDensity] = useState("1.4");

  const [waste, setWaste] = useState("10");

  const [currency, setCurrency] =
    useState<Currency>("USD");

  const [pricePerTon, setPricePerTon] = useState("");

  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);

    const wastePct = Number(waste);
    const densityValue = Number(density);
    const price = Number(pricePerTon);

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(d) ||
      l <= 0 ||
      w <= 0 ||
      d <= 0
    ) {
      return null;
    }

    if (
      !Number.isFinite(densityValue) ||
      densityValue <= 0
    ) {
      return null;
    }

    const lengthFt = toFeet(l, unit);
    const widthFt = toFeet(w, unit);

    let depthFt = 0;

    if (depthUnit === "in") {
      depthFt = d / 12;
    } else {
      depthFt =
        unit === "ft"
          ? d
          : d * 3.280839895;
    }

    const areaSqFt =
      lengthFt * widthFt;

    const volumeCuFt =
      areaSqFt * depthFt;

    const volumeCuYd =
      volumeCuFt / 27;

    const volumeCuM =
      volumeCuFt * 0.0283168466;

    const wasteMultiplier =
      1 + Math.max(0, wastePct || 0) / 100;

    const orderCuFt =
      volumeCuFt * wasteMultiplier;

    const orderCuYd =
      volumeCuYd * wasteMultiplier;

    const orderCuM =
      volumeCuM * wasteMultiplier;

    const exactTons =
      volumeCuYd * densityValue;

    const orderTons =
      orderCuYd * densityValue;

    const wasteTons =
      orderTons - exactTons;

    const cost =
      Number.isFinite(price) && price > 0
        ? orderTons * price
        : null;

    return {
      areaSqFt,
      volumeCuFt,
      volumeCuYd,
      volumeCuM,
      orderCuFt,
      orderCuYd,
      orderCuM,
      exactTons,
      orderTons,
      wasteTons,
      cost,
    };
  }, [
    length,
    width,
    depth,
    depthUnit,
    unit,
    density,
    waste,
    pricePerTon,
  ]);

  function calculate() {
    setCalculated(true);

    setTimeout(() => {
      document
        .getElementById("gravel-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }

  function handleGravelChange(value: string) {
    setGravelType(value);

    const selected =
      GRAVEL_TYPES.find(
        (item) => item.name === value
      );

    if (selected) {
      setDensity(
        String(selected.density)
      );
    }
  }

  return (
    <section className="w-full">
      {/* Calculator Header */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
        <div className="px-5 py-5 sm:px-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            GRAVEL CALCULATOR
          </p>

          <h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Gravel Calculator
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Estimate gravel volume, cubic yards,
            tons, waste and material cost for your
            project.
          </p>
        </div>

        {/* Calculator Body */}
        <div className="bg-slate-100 p-4 sm:p-6">
          <div className="space-y-4">
            {/* Project Unit */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Project Unit
              </label>

              <div className="grid grid-cols-2 gap-2">
                {(["ft", "m"] as Unit[]).map(
                  (value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() =>
                        setUnit(value)
                      }
                      className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                        unit === value
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {value === "ft"
                        ? "Feet (ft)"
                        : "Meters (m)"}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Dimensions */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Project Dimensions
              </h2>

              <div className="grid gap-3 sm:grid-cols-3">
                <InputField
                  label={`Length (${unit})`}
                  value={length}
                  onChange={setLength}
                />

                <InputField
                  label={`Width (${unit})`}
                  value={width}
                  onChange={setWidth}
                />

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Depth
                  </label>

                  <div className="flex overflow-hidden rounded-xl border border-slate-300 bg-white">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={depth}
                      onChange={(e) =>
                        setDepth(
                          e.target.value
                        )
                      }
                      className="min-w-0 flex-1 px-3 py-3 text-sm font-semibold outline-none"
                    />

                    <select
                      value={depthUnit}
                      onChange={(e) =>
                        setDepthUnit(
                          e.target.value as
                            | "in"
                            | "ft"
                        )
                      }
                      className="border-l border-slate-200 bg-slate-50 px-2 text-sm font-bold outline-none"
                    >
                      <option value="in">
                        in
                      </option>

                      <option value="ft">
                        ft
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Gravel Material */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
                Gravel Material
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Gravel Type
                  </label>

                  <select
                    value={gravelType}
                    onChange={(e) =>
                      handleGravelChange(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-blue-500"
                  >
                    {GRAVEL_TYPES.map(
                      (item) => (
                        <option
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <InputField
                  label="Density (tons / cubic yard)"
                  value={density}
                  onChange={setDensity}
                />
              </div>
            </div>

            {/* Waste */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Waste / Extra Allowance
              </label>

              <div className="grid grid-cols-5 gap-1.5">
                {[
                  "0",
                  "5",
                  "10",
                  "15",
                  "20",
                ].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setWaste(value)
                    }
                    className={`rounded-lg border px-2 py-2.5 text-xs font-bold sm:text-sm ${
                      waste === value
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </div>

            {/* Cost */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    Currency
                  </label>

                  <select
                    value={currency}
                    onChange={(e) =>
                      setCurrency(
                        e.target
                          .value as Currency
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold outline-none"
                  >
                    {(
                      Object.entries(
                        CURRENCIES
                      ) as [
                        Currency,
                        string
                      ][]
                    ).map(
                      ([code, symbol]) => (
                        <option
                          key={code}
                          value={code}
                        >
                          {code} ({symbol})
                        </option>
                      )
                    )}
                  </select>
                </div>

                <InputField
                  label="Price per Ton (optional)"
                  value={pricePerTon}
                  onChange={setPricePerTon}
                  placeholder="e.g. 55"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              type="button"
              onClick={calculate}
              className="w-full rounded-xl bg-blue-600 px-5 py-4 text-base font-extrabold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Calculate Gravel
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {calculated && result && (
        <div
          id="gravel-results"
          className="mt-5 scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
        >
          {/* Main Result */}
          <div className="bg-slate-950 px-5 py-5 text-white sm:px-7">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              GRAVEL TO ORDER
            </p>

            <div className="mt-1 flex flex-wrap items-end gap-x-3 gap-y-1">
              <span className="text-4xl font-black tracking-tight">
                {formatNumber(
                  result.orderTons
                )}
              </span>

              <span className="pb-1 text-lg font-bold text-slate-300">
                tons
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              About{" "}
              {formatNumber(
                result.orderCuYd
              )}{" "}
              cubic yards including{" "}
              {waste}% allowance.
            </p>
          </div>

          {/* Result Cards */}
          <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 sm:grid-cols-4 sm:p-5">
            <ResultBox
              label="Cubic Yards"
              value={formatNumber(
                result.orderCuYd
              )}
              unit="yd³"
            />

            <ResultBox
              label="Cubic Feet"
              value={formatNumber(
                result.orderCuFt
              )}
              unit="ft³"
            />

            <ResultBox
              label="Cubic Meters"
              value={formatNumber(
                result.orderCuM
              )}
              unit="m³"
            />

            <ResultBox
              label="Area"
              value={formatNumber(
                result.areaSqFt
              )}
              unit="ft²"
            />
          </div>

          {/* Breakdown */}
          <div className="border-t border-slate-200 p-5 sm:p-7">
            <h2 className="text-lg font-extrabold text-slate-900">
              Calculation Breakdown
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <BreakdownRow
                label="Exact gravel volume"
                value={`${formatNumber(
                  result.volumeCuYd
                )} yd³`}
              />

              <BreakdownRow
                label="Exact gravel weight"
                value={`${formatNumber(
                  result.exactTons
                )} tons`}
              />

              <BreakdownRow
                label="Waste / allowance"
                value={`${waste}%`}
              />

              <BreakdownRow
                label="Additional gravel"
                value={`${formatNumber(
                  result.wasteTons
                )} tons`}
              />

              <BreakdownRow
                label="Recommended order"
                value={`${formatNumber(
                  result.orderTons
                )} tons`}
                strong
              />

              {result.cost !== null && (
                <BreakdownRow
                  label="Estimated material cost"
                  value={`${
                    CURRENCIES[currency]
                  }${formatNumber(
                    result.cost
                  )}`}
                  strong
                />
              )}
            </div>
          </div>

          {/* Density Note */}
          <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 text-xs leading-5 text-slate-500 sm:px-7">
            Gravel density varies by material,
            moisture and compaction. Use the
            density supplied by your local gravel
            supplier for a more accurate tonnage
            estimate.
          </div>
        </div>
      )}

      {/* Formula */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-xl font-extrabold text-slate-900">
          Gravel Calculation Formula
        </h2>

        <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
          <p>
            <strong>
              Volume (cubic feet)
            </strong>{" "}
            = Length × Width × Depth
          </p>

          <p>
            <strong>
              Cubic yards
            </strong>{" "}
            = Cubic feet ÷ 27
          </p>

          <p>
            <strong>
              Weight (tons)
            </strong>{" "}
            = Cubic yards × Gravel density
          </p>

          <p>
            <strong>
              Order quantity
            </strong>{" "}
            = Exact quantity × (1 + waste ÷
            100)
          </p>
        </div>
      </div>

      {/* Example */}
      <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-7">
        <h2 className="text-lg font-extrabold text-slate-900">
          Example: 20 × 10 ft Gravel Area
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          For a 20 ft × 10 ft area with a
          4-inch depth, the required volume is
          about 2.47 cubic yards. With 10%
          allowance and a density of 1.4 tons
          per cubic yard, the recommended order
          is about 3.81 tons.
        </p>
      </div>

      {/* Important Note */}
      <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
        <strong>Important:</strong> This calculator
        provides an estimate. Actual gravel
        requirements can vary because of
        compaction, moisture, grading and the
        specific material used. Confirm final
        quantities with your supplier.
      </div>
    </section>
  );
}

/* Input Field */

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-slate-600">
        {label}
      </label>

      <input
        type="number"
        min="0"
        step="any"
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

/* Result Box */

function ResultBox({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-lg font-black text-slate-900">
        {value}

        <span className="ml-1 text-xs font-bold text-slate-500">
          {unit}
        </span>
      </p>
    </div>
  );
}

/* Breakdown Row */

function BreakdownRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-2.5 last:border-0">
      <span className="text-slate-600">
        {label}
      </span>

      <span
        className={
          strong
            ? "text-right font-extrabold text-slate-900"
            : "text-right font-bold text-slate-800"
        }
      >
        {value}
      </span>
    </div>
  );
}
