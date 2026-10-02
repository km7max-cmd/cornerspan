"use client";

import type {
  Currency,
} from "../types";

import {
  CURRENCY_OPTIONS,
} from "../data/brickOptions";

type CostDetailsProps = {
  open: boolean;
  onToggle: () => void;

  currency: Currency;
  setCurrency: (value: Currency) => void;

  pricePerBrick: string;
  setPricePerBrick: (value: string) => void;

  cementPrice: string;
  setCementPrice: (value: string) => void;

  sandPrice: string;
  setSandPrice: (value: string) => void;
};

export default function CostDetails({
  open,
  onToggle,

  currency,
  setCurrency,

  pricePerBrick,
  setPricePerBrick,

  cementPrice,
  setCementPrice,

  sandPrice,
  setSandPrice,
}: CostDetailsProps) {
  const fieldClass =
    "flex h-12 min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100";

  const inputClass =
    "min-w-0 flex-1 bg-transparent px-3 text-base font-medium text-slate-900 outline-none";

  const unitClass =
    "flex h-12 shrink-0 items-center border-l border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-500";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-slate-700";

  const selectClass =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-base font-semibold text-blue-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const selectedCurrency =
    CURRENCY_OPTIONS.find(
      (option) =>
        option.value === currency
    );

  const currencySymbol =
    selectedCurrency?.symbol ?? "$";

  return (
    <section className="border-b border-slate-100">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7"
      >

        <div className="flex min-w-0 items-center gap-3">

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl">
            💰
          </span>

          <div className="min-w-0">

            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Material Cost
            </h2>

            <p className="mt-0.5 text-sm text-slate-500">
              Brick, cement and sand prices
            </p>

          </div>

        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl font-medium text-slate-600">
          {open ? "−" : "+"}
        </span>

      </button>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      {open && (
        <div className="px-5 pb-5 sm:px-7">

          {/* =================================================
              CURRENCY
          ================================================= */}

          <div>

            <label className={labelClass}>
              Currency
            </label>

            <select
              value={currency}
              onChange={(event) =>
                setCurrency(
                  event.target.value as Currency
                )
              }
              className={selectClass}
              aria-label="Currency"
            >
              {CURRENCY_OPTIONS.map(
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
              BRICK PRICE
          ================================================= */}

          <div className="mt-4">

            <label className={labelClass}>
              Price per Brick
            </label>

            <div className={fieldClass}>

              <span className={unitClass}>
                {currencySymbol}
              </span>

              <input
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={pricePerBrick}
                onChange={(event) =>
                  setPricePerBrick(
                    event.target.value
                  )
                }
                className={inputClass}
                aria-label="Price per brick"
                placeholder="0.00"
              />

              <span className={unitClass}>
                / brick
              </span>

            </div>

          </div>

          {/* =================================================
              CEMENT + SAND
          ================================================= */}

          <div className="mt-4 grid grid-cols-2 gap-3">

            {/* CEMENT */}

            <div className="min-w-0">

              <label className={labelClass}>
                Cement Price
              </label>

              <div className={fieldClass}>

                <span className={unitClass}>
                  {currencySymbol}
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={cementPrice}
                  onChange={(event) =>
                    setCementPrice(
                      event.target.value
                    )
                  }
                  className={inputClass}
                  aria-label="Cement price"
                  placeholder="0.00"
                />

              </div>

              <p className="mt-1.5 text-xs text-slate-500">
                Per cement bag
              </p>

            </div>

            {/* SAND */}

            <div className="min-w-0">

              <label className={labelClass}>
                Sand Price
              </label>

              <div className={fieldClass}>

                <span className={unitClass}>
                  {currencySymbol}
                </span>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={sandPrice}
                  onChange={(event) =>
                    setSandPrice(
                      event.target.value
                    )
                  }
                  className={inputClass}
                  aria-label="Sand price"
                  placeholder="0.00"
                />

              </div>

              <p className="mt-1.5 text-xs text-slate-500">
                Per m³
              </p>

            </div>

          </div>

          {/* =================================================
              COST INFO
          ================================================= */}

          <div className="mt-4 rounded-xl bg-green-50 px-4 py-3">

            <div className="flex items-center justify-between gap-3">

              <div>

                <p className="text-sm font-semibold text-green-700">
                  Cost Estimate
                </p>

                <p className="mt-0.5 text-xs leading-5 text-green-600">
                  Brick, cement and sand costs are
                  calculated automatically.
                </p>

              </div>

              <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-green-700">
                Auto
              </span>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}
