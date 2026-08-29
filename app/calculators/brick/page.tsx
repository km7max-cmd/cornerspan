import type { Metadata } from "next";
import BrickCalculatorClient from "./BrickCalculatorClient";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";

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
      "Brick Calculator – Bricks, Mortar & Cost | CornerSpan",

    description:
      "Calculate bricks, mortar, openings, waste, and estimated material cost for your wall construction project.",

    url:
      "https://www.cornerspan.com/calculators/brick",

    siteName: "CornerSpan",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CornerSpan Brick Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Brick Calculator – Bricks, Mortar & Cost | CornerSpan",

    description:
      "Free brick calculator for estimating bricks, mortar, waste, openings, and material cost.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BrickCalculatorPage() {
  return (
    <>
      <CalculatorStructuredData
        name="Brick Calculator"
        url="https://www.cornerspan.com/calculators/brick"
        description="Free online brick calculator for estimating bricks, mortar, openings, waste, and material cost for wall construction."
      />

      <BrickCalculatorClient />
    </>
  );
}
