import type { Metadata } from "next";
import BlockCalculator from "./BlockCalculator";

export const metadata: Metadata = {
  title: "Concrete Block (CMU) Calculator | Block Count & Cost",
  description:
    "Estimate concrete block quantities with opening deductions, waste allowance, and cost.",
};

export default function Page() {
  return <BlockCalculator />;
}
