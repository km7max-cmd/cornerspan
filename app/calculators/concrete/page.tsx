import type { Metadata } from "next";
import Breadcrumb from "../../../components/Breadcrumb";
import ConcreteCalculator from "./ConcreteCalculator";
import CalculatorStructuredData from "../../../components/CalculatorStructuredData";

export const metadata: Metadata = {
  title: "Concrete Calculator",

  description:
    "Free concrete calculator to calculate concrete volume, cement bags, sand, aggregate, water, and estimated material cost for slabs, walls, footings, columns, and stairs.",

  alternates: {
    canonical: "https://www.cornerspan.com/calculators/concrete",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Concrete Calculator | CornerSpan",
    description:
      "Calculate concrete volume, cement bags, sand, aggregate, water, and estimated material cost for construction projects.",
    type: "website",
    url: "https://www.cornerspan.com/calculators/concrete",
    siteName: "CornerSpan",
    images: [
      {
        url: "/og-image.png",
        alt: "CornerSpan Concrete Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Concrete Calculator | CornerSpan",
    description:
      "Calculate concrete volume, cement, sand, aggregate, water, and estimated material cost.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <Breadcrumb current="Concrete Calculator" />

      <CalculatorStructuredData
        name="Concrete Calculator"
        url="https://www.cornerspan.com/calculators/concrete"
        description="Free online concrete calculator for calculating concrete volume, cement bags, sand, aggregate, water, and estimated material cost."
      />

      <ConcreteCalculator />
    </>
  );
}
