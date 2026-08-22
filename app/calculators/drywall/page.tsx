import type { Metadata } from "next";
import DrywallCalculator from "./DrywallCalculator";

export const metadata: Metadata = {
  title: "Drywall Calculator | Sheet Count & Cost",
  description:
    "Estimate drywall sheet quantity for wall and ceiling coverage with opening deductions, waste, and cost.",
};

export default function Page() {
  return <DrywallCalculator />;
}
