import type { Metadata } from "next";
import PaverCalculator from "./PaverCalculator";

export const metadata: Metadata = {
  title: "Paver Calculator | Paver Count, Base & Sand",
  description:
    "Estimate paver quantity, base gravel volume, bedding sand volume, and total material cost.",
};

export default function Page() {
  return <PaverCalculator />;
}
