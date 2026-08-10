// app/utils/formatters.ts

import {
  CurrencyCode,
  getCurrencySymbol,
} from "./currency";

// --------------------------------------------------
// Number Formatting
// --------------------------------------------------

export function formatNumber(
  value: number,
  decimals = 2
): string {
  if (!Number.isFinite(value)) {
    return "0.00";
  }

  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}


// --------------------------------------------------
// Currency Formatting
// --------------------------------------------------

export function formatCurrency(
  amount: number,
  currency: CurrencyCode
): string {
  if (!Number.isFinite(amount)) {
    amount = 0;
  }

  const symbol = getCurrencySymbol(currency);

  return `${symbol}${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}


// --------------------------------------------------
// Result Value Formatting
// --------------------------------------------------

export function formatVolume(
  value: number
): string {
  return `${formatNumber(value, 2)} m³`;
}


export function formatArea(
  value: number
): string {
  return `${formatNumber(value, 2)} m²`;
}


// --------------------------------------------------
// Plain Text Currency
// Used for Copy / Share / PDF
// --------------------------------------------------

export function formatCurrencyText(
  amount: number,
  currency: CurrencyCode
): string {
  if (!Number.isFinite(amount)) {
    amount = 0;
  }

  const symbol = getCurrencySymbol(currency);

  return `${symbol}${formatNumber(amount, 2)}`;
}
