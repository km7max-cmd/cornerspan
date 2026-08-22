import type { Metadata } from "next";
import AsphaltCalculator from "./AsphaltCalculator";

export const metadata: Metadata = {
  title: "Asphalt Calculator | Tonnage & Cost",
  description:
    "Estimate asphalt paving volume, short tons, waste-adjusted tonnage, and paving material cost.",
};

export default function Page() {
  return <AsphaltCalculator />;
}
