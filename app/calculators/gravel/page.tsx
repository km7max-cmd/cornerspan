import type { Metadata } from "next";
import GravelCalculator from "./GravelCalculator";

export const metadata: Metadata = {
  title: "Gravel Calculator | Cubic Yards, Tons & Cost",
  description:
    "Estimate gravel volume in cubic feet and cubic yards, convert to tons, add waste, and calculate material cost.",
};

export default function Page() {
  return <GravelCalculator />;
}
