// app/utils/currency.ts

export type CurrencyCode =
  | "USD"
  | "INR"
  | "EUR"
  | "GBP"
  | "AED"
  | "AUD"
  | "CAD";

export type CurrencyInfo = {
  code: CurrencyCode;
  name: string;
  symbol: string;
  flag: string;
};

// --------------------------------------------------
// Currency List
// --------------------------------------------------

export const currencies: CurrencyInfo[] = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    flag: "🇺🇸",
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    flag: "🇮🇳",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    flag: "🇪🇺",
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    flag: "🇬🇧",
  },
  {
    code: "AED",
    name: "UAE Dirham",
    symbol: "AED ",
    flag: "🇦🇪",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    flag: "🇦🇺",
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    flag: "🇨🇦",
  },
];

// --------------------------------------------------
// Exchange Rates
// Base currency = USD
//
// Example:
// 1 USD = 87 INR
// 1 USD = 0.86 EUR
// --------------------------------------------------

export const exchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  INR: 87,
  EUR: 0.86,
  GBP: 0.74,
  AED: 3.67,
  AUD: 1.53,
  CAD: 1.38,
};


// --------------------------------------------------
// Convert USD → Selected Currency
// --------------------------------------------------

export function convertFromUSD(
  amountUSD: number,
  currency: CurrencyCode
): number {
  return amountUSD * exchangeRates[currency];
}


// --------------------------------------------------
// Get Currency Symbol
// --------------------------------------------------

export function getCurrencySymbol(
  currency: CurrencyCode
): string {
  const found = currencies.find(
    (item) => item.code === currency
  );

  return found?.symbol ?? "$";
}


// --------------------------------------------------
// Get Full Currency Information
// --------------------------------------------------

export function getCurrencyInfo(
  currency: CurrencyCode
): CurrencyInfo {
  return (
    currencies.find(
      (item) => item.code === currency
    ) ?? currencies[0]
  );
}
