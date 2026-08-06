import type { Metadata } from "next";
import ConcreteCalculator from "./ConcreteCalculator";

export const metadata: Metadata = {
  title: "Concrete Calculator | CornerSpan",
  description:
    "Free online Concrete Calculator to estimate concrete volume, cement bags, dry volume and material quantity for slabs, footings, beams and columns.",
  keywords: [
    "Concrete Calculator",
    "Concrete Volume Calculator",
    "Concrete Estimator",
    "Concrete Cost Calculator",
    "Construction Calculator",
    "CornerSpan",
  ],
  alternates: {
    canonical: "/calculators/concrete",
  },
  openGraph: {
    title: "Concrete Calculator | CornerSpan",
    description:
      "Calculate concrete volume, cement bags and material quantity instantly.",
    type: "website",
  },
};

export default function Page() {
  return <ConcreteCalculator />;
}
