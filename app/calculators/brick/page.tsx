import type { Metadata } from "next";
import BrickCalculatorClient from "./BrickCalculatorClient";

export const metadata: Metadata = {
  title: "Brick Calculator – Bricks, Mortar & Cost",

  description:
    "Calculate the number of bricks required for a wall, including mortar, openings, waste, and estimated material cost with this free brick calculator.",

  keywords: [
    "brick calculator",
    "brick quantity calculator",
    "bricks calculator",
    "brick wall calculator",
    "mortar calculator",
    "brick cost calculator",
    "construction calculator",
  ],

  alternates: {
    canonical:
      "https://www.cornerspan.com/calculators/brick",
  },

  openGraph: {
    title:
      "Brick Calculator – Bricks, Mortar & Cost Estimate",

    description:
      "Calculate bricks, mortar, openings, waste, and estimated material cost for your wall construction project.",

    url:
      "https://www.cornerspan.com/calculators/brick",

    siteName: "CornerSpan",
    type: "website",
  },

  twitter: {
    card: "summary",
    title:
      "Brick Calculator – Bricks, Mortar & Cost Estimate",

    description:
      "Free brick calculator for estimating bricks, mortar, waste, openings, and material cost.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BrickCalculatorPage() {
  return <BrickCalculatorClient />;
}
