"use client";

import { useEffect, useRef, useState } from "react";

import CalculatorHero from "../../components/CalculatorHero";
import CalculatorForm from "./components/CalculatorForm";
import ResultCard from "./components/ResultCard";
import Formula from "./components/Formula";
import FAQ from "./components/FAQ";
import RelatedCalculators from "./components/RelatedCalculators";
import Example from "./components/Example";
import History from "./components/History";
import AboutCalculator from "./components/AboutCalculator";
import { calculateConcrete, Unit } from "./utils/calculateConcrete";
import { jsPDF } from "jspdf";
import Toast from "../../components/Toast";

type CurrencyCode =
  | "USD"
  | "INR"
  | "EUR"
  | "GBP"
  | "AED"
  | "AUD"
  | "CAD";

type MixRatio = {
  cement: number;
  sand: number;
  aggregate: number;
};

type HistoryItem = {
  length: number;
  width: number;
  depth: number;
  volume: number;
};

type CalculationResult = {
  volume: number;
  dryVolume: number;
  totalVolume: number;
  wasteVolume: number;

  cementVolume: number;
  cementWeight: number;
  cementBags: number;

  sand: number;
  aggregate: number;
  water: number;

  totalCost: number;
};

const ZERO_RESULT: CalculationResult = {
  volume: 0,
  dryVolume: 0,
  totalVolume: 0,
  wasteVolume: 0,

  cementVolume: 0,
  cementWeight: 0,
  cementBags: 0,

  sand: 0,
  aggregate: 0,
  water: 0,

  totalCost: 0,
};

const CURRENCY_NAMES: Record<CurrencyCode, string> = {
  USD: "US Dollar",
  INR: "Indian Rupee",
  EUR: "Euro",
  GBP: "British Pound",
  AED: "UAE Dirham",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  AED: "AED ",
  AUD: "A$",
  CAD: "C$",
};

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function convertMaterialQuantity(
  quantityM3: number,
  unit: string,
  densityKgPerM3: number
): number {
  if (!Number.isFinite(quantityM3) || quantityM3 <= 0) {
    return 0;
  }

  if (!Number.isFinite(densityKgPerM3) || densityKgPerM3 <= 0) {
    return 0;
  }

  switch (unit) {
    case "m³":
      return quantityM3;

    case "yd³":
      return quantityM3 * 1.30795062;

    case "tonne":
      return (quantityM3 * densityKgPerM3) / 1000;

    case "US ton":
      return (quantityM3 * densityKgPerM3) / 907.18474;

    default:
      return quantityM3;
  }
}

function convertCementQuantity(
  cementWeightKg: number,
  unit: string
): number {
  if (!Number.isFinite(cementWeightKg) || cementWeightKg <= 0) {
    return 0;
  }

  switch (unit) {
    case "Bag":
      return cementWeightKg / 50;

    case "kg":
      return cementWeightKg;

    case "tonne":
      return cementWeightKg / 1000;

    case "US ton":
      return cementWeightKg / 907.18474;

    default:
      return cementWeightKg / 50;
  }
}

export default function ConcreteCalculator() {
  // ==================================================
  // Dimensions
  // ==================================================

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [quantity, setQuantity] = useState("1");

  // ==================================================
  // Dimension Units
  // ==================================================

  const [lengthUnit, setLengthUnit] =
    useState<Unit>("Meter");

  const [widthUnit, setWidthUnit] =
    useState<Unit>("Meter");

  const [depthUnit, setDepthUnit] =
    useState<Unit>("Meter");

  // ==================================================
  // Currency
  // ==================================================

  const [currency, setCurrency] =
    useState<CurrencyCode>("INR");

  /*
   * This stores the currency in which the user
   * originally entered the material prices.
   *
   * Example:
   *
   * User enters:
   * Cement = 450 INR
   *
   * Then changes currency:
   * USD
   *
   * The 450 is converted to USD.
   */
  const priceCurrencyRef =
    useRef<CurrencyCode>("INR");

  const [currencyLoading, setCurrencyLoading] =
    useState(false);

  const [currencyError, setCurrencyError] =
    useState("");

  // ==================================================
  // Material Prices
  //
  // IMPORTANT:
  // No fake/default material prices.
  // User enters local market prices.
  // ==================================================

  const [cementPrice, setCementPrice] =
    useState("");

  const [sandPrice, setSandPrice] =
    useState("");

  const [aggregatePrice, setAggregatePrice] =
    useState("");

  // ==================================================
  // Material Units
  // ==================================================

  const [cementUnit, setCementUnit] =
    useState("Bag");

  const [sandUnit, setSandUnit] =
    useState("m³");

  const [aggregateUnit, setAggregateUnit] =
    useState("m³");

  // ==================================================
  // Material Densities
  // ==================================================

  const [sandDensity, setSandDensity] =
    useState("1600");

  const [aggregateDensity, setAggregateDensity] =
    useState("1500");

  // ==================================================
  // Error
  // ==================================================

  const [error, setError] =
    useState("");

  // ==================================================
  // Result
  // ==================================================

  const [result, setResult] =
    useState<CalculationResult>(ZERO_RESULT);

  // ==================================================
  // History
  // ==================================================

  const [history, setHistory] =
    useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory =
      localStorage.getItem("concrete-history");

    if (!savedHistory) {
      return;
    }

    try {
      const parsed =
        JSON.parse(savedHistory);

      if (Array.isArray(parsed)) {
        setHistory(parsed);
      }
    } catch {
      setHistory([]);
    }
  }, []);

  // ==================================================
  // Toast
  // ==================================================

  const [showToast, setShowToast] =
    useState(false);

  const [toastMessage, setToastMessage] =
    useState("");

  const [toastType, setToastType] =
    useState<"success" | "error">("success");

  useEffect(() => {
    if (!showToast) {
      return;
    }

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showToast]);

  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // ==================================================
  // Currency Conversion
  //
  // Frankfurter API
  // No API key required.
  // ==================================================

  useEffect(() => {
    const oldCurrency =
      priceCurrencyRef.current;

    const newCurrency =
      currency;

    if (oldCurrency === newCurrency) {
      return;
    }

    const hasPrices =
      cementPrice.trim() !== "" ||
      sandPrice.trim() !== "" ||
      aggregatePrice.trim() !== "";

    /*
     * If there are no entered prices,
     * simply change the currency.
     */
    if (!hasPrices) {
      priceCurrencyRef.current =
        newCurrency;

      setCurrencyError("");

      return;
    }

    let cancelled = false;

    const convertPrices = async () => {
      setCurrencyLoading(true);
      setCurrencyError("");

      try {
        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/${oldCurrency}/${newCurrency}`
        );

        if (!response.ok) {
          throw new Error(
            "Currency rate unavailable."
          );
        }

        const data: {
          rate?: number;
        } = await response.json();

        if (
          !data.rate ||
          !Number.isFinite(data.rate)
        ) {
          throw new Error(
            "Invalid currency rate."
          );
        }

        if (cancelled) {
          return;
        }

        const rate = data.rate;

        const convert = (
          value: string
        ): string => {
          if (value.trim() === "") {
            return "";
          }

          const n = Number(value);

          if (!Number.isFinite(n)) {
            return value;
          }

          return (n * rate).toFixed(2);
        };

        setCementPrice(
          convert(cementPrice)
        );

        setSandPrice(
          convert(sandPrice)
        );

        setAggregatePrice(
          convert(aggregatePrice)
        );

        priceCurrencyRef.current =
          newCurrency;

        /*
         * Existing result is no longer valid
         * because the displayed material prices
         * have changed.
         */
        setResult((previous) => ({
          ...previous,
          totalCost: 0,
        }));

        showNotification(
          `Prices converted from ${oldCurrency} to ${newCurrency}.`
        );
      } catch {
        if (cancelled) {
          return;
        }

        /*
         * IMPORTANT:
         * Keep old price currency reference.
         *
         * This prevents a wrong conversion if
         * the API fails.
         */
        setCurrencyError(
          `Unable to get the latest ${oldCurrency} → ${newCurrency} exchange rate.`
        );

        showNotification(
          "Currency conversion failed. Please try again.",
          "error"
        );
      } finally {
        if (!cancelled) {
          setCurrencyLoading(false);
        }
      }
    };

    convertPrices();

    return () => {
      cancelled = true;
    };
  }, [
    currency,
    cementPrice,
    sandPrice,
    aggregatePrice,
  ]);

  // ==================================================
  // Calculate
  // ==================================================

  const handleCalculate = (
    mixRatio: MixRatio
  ) => {
    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);
    const q = Number(quantity);

    // --------------------------------------------------
    // Dimension validation
    // --------------------------------------------------

    if (
      !length.trim() ||
      !width.trim() ||
      !depth.trim()
    ) {
      setError(
        "Please fill in all dimension fields."
      );

      setResult(ZERO_RESULT);

      showNotification(
        "Please fill in all dimension fields.",
        "error"
      );

      return;
    }

    if (
      !Number.isFinite(l) ||
      !Number.isFinite(w) ||
      !Number.isFinite(d) ||
      l <= 0 ||
      w <= 0 ||
      d <= 0
    ) {
      setError(
        "Length, Width and Depth must be greater than zero."
      );

      setResult(ZERO_RESULT);

      showNotification(
        "Dimension values must be greater than zero.",
        "error"
      );

      return;
    }

    // --------------------------------------------------
    // Quantity validation
    // --------------------------------------------------

    if (
      !Number.isFinite(q) ||
      q <= 0
    ) {
      setError(
        "Quantity must be greater than zero."
      );

      setResult(ZERO_RESULT);

      showNotification(
        "Quantity must be greater than zero.",
        "error"
      );

      return;
    }

    // --------------------------------------------------
    // Mix ratio validation
    // --------------------------------------------------

    if (
      !mixRatio ||
      mixRatio.cement <= 0 ||
      mixRatio.sand <= 0 ||
      mixRatio.aggregate <= 0
    ) {
      setError(
        "Please enter a valid concrete mix ratio."
      );

      setResult(ZERO_RESULT);

      showNotification(
        "Invalid concrete mix ratio.",
        "error"
      );

      return;
    }

    // --------------------------------------------------
    // Material price validation
    //
    // Prices are optional.
    //
    // If blank:
    // calculation still works,
    // but total material cost cannot be calculated.
    // --------------------------------------------------

    const hasAnyPrice =
      cementPrice.trim() !== "" ||
      sandPrice.trim() !== "" ||
      aggregatePrice.trim() !== "";

    const cementRate =
      toNumber(cementPrice);

    const sandRate =
      toNumber(sandPrice);

    const aggregateRate =
      toNumber(aggregatePrice);

    if (
      hasAnyPrice &&
      (
        cementRate < 0 ||
        sandRate < 0 ||
        aggregateRate < 0
      )
    ) {
      setError(
        "Material prices cannot be negative."
      );

      setResult(ZERO_RESULT);

      showNotification(
        "Material prices cannot be negative.",
        "error"
      );

      return;
    }

    // --------------------------------------------------
    // Density validation
    // --------------------------------------------------

    const sandDensityValue =
      Number(sandDensity);

    const aggregateDensityValue =
      Number(aggregateDensity);

    if (
      !Number.isFinite(
        sandDensityValue
      ) ||
      sandDensityValue <= 0
    ) {
      setError(
        "Please select a valid sand density."
      );

      setResult(ZERO_RESULT);

      showNotification(
        "Invalid sand density.",
        "error"
      );

      return;
    }

    if (
      !Number.isFinite(
        aggregateDensityValue
      ) ||
      aggregateDensityValue <= 0
    ) {
      setError(
        "Please select a valid aggregate density."
      );

      setResult(ZERO_RESULT);

      showNotification(
        "Invalid aggregate density.",
        "error"
      );

      return;
    }

    setError("");

    // ==================================================
    // Concrete Calculation
    // ==================================================

    const output =
      calculateConcrete(
        l,
        w,
        d,
        lengthUnit,
        widthUnit,
        depthUnit,
        mixRatio
      );

    // --------------------------------------------------
    // Apply quantity
    // --------------------------------------------------

    output.volume *= q;
    output.dryVolume *= q;
    output.totalVolume *= q;
    output.wasteVolume *= q;

    output.cementVolume *= q;
    output.cementWeight *= q;
    output.cementBags *= q;

    output.sand = Number(
      (
        output.sand * q
      ).toFixed(3)
    );

    output.aggregate = Number(
      (
        output.aggregate * q
      ).toFixed(3)
    );

    output.water = Number(
      (
        output.water * q
      ).toFixed(1)
    );

    // ==================================================
    // Material Cost
    // ==================================================

    let totalCost = 0;

    /*
     * Cement
     *
     * calculateConcrete gives cementWeight
     * in kilograms.
     *
     * We convert it to the selected price unit.
     */

    if (
      cementPrice.trim() !== "" &&
      cementRate > 0
    ) {
      const cementQuantity =
        convertCementQuantity(
          output.cementWeight,
          cementUnit
        );

      totalCost +=
        cementQuantity * cementRate;
    }

    /*
     * Sand
     */

    if (
      sandPrice.trim() !== "" &&
      sandRate > 0
    ) {
      const sandQuantity =
        convertMaterialQuantity(
          output.sand,
          sandUnit,
          sandDensityValue
        );

      totalCost +=
        sandQuantity * sandRate;
    }

    /*
     * Aggregate
     */

    if (
      aggregatePrice.trim() !== "" &&
      aggregateRate > 0
    ) {
      const aggregateQuantity =
        convertMaterialQuantity(
          output.aggregate,
          aggregateUnit,
          aggregateDensityValue
        );

      totalCost +=
        aggregateQuantity *
        aggregateRate;
    }

    totalCost = Number(
      totalCost.toFixed(2)
    );

    // ==================================================
    // Save Result
    // ==================================================

    setResult({
      volume: Number(
        output.volume.toFixed(3)
      ),

      dryVolume: Number(
        output.dryVolume.toFixed(3)
      ),

      totalVolume: Number(
        output.totalVolume.toFixed(3)
      ),

      wasteVolume: Number(
        output.wasteVolume.toFixed(3)
      ),

      cementVolume: Number(
        output.cementVolume.toFixed(3)
      ),

      cementWeight: Number(
        output.cementWeight.toFixed(1)
      ),

      cementBags: Math.ceil(
        output.cementBags
      ),

      sand: Number(
        output.sand.toFixed(3)
      ),

      aggregate: Number(
        output.aggregate.toFixed(3)
      ),

      water: Number(
        output.water.toFixed(1)
      ),

      totalCost,
    });

    // ==================================================
    // History
    // ==================================================

    const newHistory: HistoryItem[] = [
      {
        length: l,
        width: w,
        depth: d,
        volume: Number(
          output.volume.toFixed(3)
        ),
      },
      ...history,
    ].slice(0, 5);

    setHistory(newHistory);

    localStorage.setItem(
      "concrete-history",
      JSON.stringify(newHistory)
    );

    // ==================================================
    // Notification
    // ==================================================

    if (
      cementPrice.trim() === "" &&
      sandPrice.trim() === "" &&
      aggregatePrice.trim() === ""
    ) {
      showNotification(
        "Calculation completed. Enter local material prices to calculate cost."
      );
    } else {
      showNotification(
        "Calculation completed successfully!"
      );
    }
  };

  // ==================================================
  // Copy
  // ==================================================

  const handleCopy = async () => {
    if (result.volume <= 0) {
      return;
    }

    const symbol =
      CURRENCY_SYMBOLS[currency];

    const text =
      `Concrete Calculator Result

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags} Bags
Sand            : ${result.sand.toFixed(2)} m³
Aggregate       : ${result.aggregate.toFixed(2)} m³
Water           : ${result.water.toFixed(0)} L
Material Cost   : ${
        result.totalCost > 0
          ? `${symbol}${result.totalCost.toLocaleString()}`
          : "Not available"
      }
Currency        : ${currency}`;

    try {
      await navigator.clipboard.writeText(
        text
      );

      showNotification(
        "Results copied successfully!"
      );
    } catch {
      showNotification(
        "Failed to copy results.",
        "error"
      );
    }
  };

  // ==================================================
  // Share
  // ==================================================

  const handleShare = async () => {
    if (result.volume <= 0) {
      return;
    }

    const symbol =
      CURRENCY_SYMBOLS[currency];

    const text =
      `Concrete Calculator Result

Concrete Volume : ${result.volume.toFixed(2)} m³
Dry Volume      : ${result.dryVolume.toFixed(2)} m³
Cement Bags     : ${result.cementBags} Bags
Sand            : ${result.sand.toFixed(2)} m³
Aggregate       : ${result.aggregate.toFixed(2)} m³
Water           : ${result.water.toFixed(0)} L
Material Cost   : ${
        result.totalCost > 0
          ? `${symbol}${result.totalCost.toLocaleString()}`
          : "Not available"
      }`;

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.share
      ) {
        await navigator.share({
          title:
            "Concrete Calculator Result",
          text,
        });

        showNotification(
          "Results shared successfully!"
        );
      } else {
        showNotification(
          "Sharing is not supported on this device.",
          "error"
        );
      }
    } catch {
      // User cancelled share.
    }
  };

  // ==================================================
  // PDF
  // ==================================================

  const handleDownloadPDF = () => {
    if (result.volume <= 0) {
      return;
    }

    const doc = new jsPDF();

    const symbol =
      CURRENCY_SYMBOLS[currency];

    doc.setFontSize(20);

    doc.text(
      "Concrete Calculator Result",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Currency : ${CURRENCY_NAMES[currency]} (${currency})`,
      20,
      35
    );

    doc.text(
      `Concrete Volume : ${result.volume.toFixed(2)} m3`,
      20,
      50
    );

    doc.text(
      `Dry Volume      : ${result.dryVolume.toFixed(2)} m3`,
      20,
      60
    );

    doc.text(
      `Cement Bags     : ${result.cementBags} Bags`,
      20,
      70
    );

    doc.text(
      `Sand            : ${result.sand.toFixed(2)} m3`,
      20,
      80
    );

    doc.text(
      `Aggregate       : ${result.aggregate.toFixed(2)} m3`,
      20,
      90
    );

    doc.text(
      `Water           : ${result.water.toFixed(0)} L`,
      20,
      100
    );

    doc.text(
      `Material Cost   : ${
        result.totalCost > 0
          ? `${symbol}${result.totalCost.toFixed(2)}`
          : "Not available"
      }`,
      20,
      110
    );

    doc.save(
      "Concrete-Calculation.pdf"
    );

    showNotification(
      "PDF downloaded successfully!"
    );
  };

  // ==================================================
  // Clear History
  // ==================================================

  const handleClearHistory = () => {
    setHistory([]);

    localStorage.removeItem(
      "concrete-history"
    );

    showNotification(
      "History cleared successfully!"
    );
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-100">

        <div className="mx-auto max-w-7xl px-6 py-10">

          <CalculatorHero
            title="Concrete"
            highlight="Calculator"
            description="Calculate concrete volume, cement bags, sand, aggregate, water, and material cost."
          />

          {/* Currency loading/error notice */}

          {(currencyLoading ||
            currencyError) && (
            <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">

              {currencyLoading && (
                <span>
                  Updating material prices using the latest exchange rate...
                </span>
              )}

              {!currencyLoading &&
                currencyError && (
                  <span>
                    {currencyError}
                  </span>
                )}

            </div>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-2">

            {/* ==================================================
                Calculator Form
            ================================================== */}

            <CalculatorForm
              length={length}
              width={width}
              depth={depth}
              quantity={quantity}

              cementUnit={cementUnit}
              sandUnit={sandUnit}
              aggregateUnit={aggregateUnit}

              sandDensity={sandDensity}
              aggregateDensity={
                aggregateDensity
              }

              setSandDensity={
                setSandDensity
              }

              setAggregateDensity={
                setAggregateDensity
              }

              cementPrice={cementPrice}
              sandPrice={sandPrice}
              aggregatePrice={
                aggregatePrice
              }

              currency={currency}
              setCurrency={(value) =>
                setCurrency(
                  value as CurrencyCode
                )
              }

              lengthUnit={lengthUnit}
              widthUnit={widthUnit}
              depthUnit={depthUnit}

              setLengthUnit={
                setLengthUnit
              }

              setWidthUnit={
                setWidthUnit
              }

              setDepthUnit={
                setDepthUnit
              }

              setCementUnit={
                setCementUnit
              }

              setSandUnit={
                setSandUnit
              }

              setAggregateUnit={
                setAggregateUnit
              }

              error={error}

              setLength={setLength}
              setWidth={setWidth}
              setDepth={setDepth}
              setQuantity={setQuantity}

              setCementPrice={
                setCementPrice
              }

              setSandPrice={
                setSandPrice
              }

              setAggregatePrice={
                setAggregatePrice
              }

              onCalculate={
                handleCalculate
              }
            />

            {/* ==================================================
                Result Card
            ================================================== */}

            <ResultCard
              volume={result.volume}
              dryVolume={
                result.dryVolume
              }
              cementBags={
                result.cementBags
              }
              sand={result.sand}
              aggregate={
                result.aggregate
              }
              totalCost={
                result.totalCost
              }
              currency={currency}
              onCopy={handleCopy}
              onShare={handleShare}
              onDownload={
                handleDownloadPDF
              }
            />

          </div>

          {/* ==================================================
              Related Calculators
          ================================================== */}

          <div className="mt-6">
            <RelatedCalculators />
          </div>

          {/* ==================================================
              Formula
          ================================================== */}

          <div className="mt-6">
            <Formula />
          </div>

          {/* ==================================================
              Example
          ================================================== */}

          <div className="mt-6">
            <Example />
          </div>

          {/* ==================================================
              FAQ
          ================================================== */}

          <div className="mt-6">
            <FAQ />
          </div>

          {/* ==================================================
              About
          ================================================== */}

          <div className="mt-6">
            <AboutCalculator />
          </div>

          {/* ==================================================
              History
          ================================================== */}

          <History
            history={history}
            onClear={
              handleClearHistory
            }
          />

        </div>
      </main>

      <Toast
        show={showToast}
        message={toastMessage}
        type={toastType}
      />
    </>
  );
}
