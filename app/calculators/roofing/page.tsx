import type { Metadata } from "next";
import RoofingCalculator from "./RoofingCalculator";

export const metadata: Metadata = {
  title: "Roofing Shingle Calculator | Squares, Bundles & Cost",
  description:
    "Estimate roofing area with pitch, convert to squares and bundles, and calculate shingle cost.",
};

export default function Page() {
  return <RoofingCalculator />;
}
