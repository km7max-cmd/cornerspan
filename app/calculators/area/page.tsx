import type { Metadata } from "next";
import AreaCalculator from "./AreaCalculator";

export const metadata: Metadata = {
  title: "Area Calculator | Calculate Area in Square Feet & Meters",
  description:
    "Free area calculator for rectangles, squares, circles, triangles, trapezoids, parallelograms, ellipses and sectors. Calculate area in square feet, square meters, square yards and acres.",
  keywords: [
    "area calculator",
    "calculate area",
    "area calculation",
    "area formula",
    "square feet area calculator",
    "square meter area calculator",
    "rectangle area calculator",
    "square area calculator",
    "circle area calculator",
    "triangle area calculator",
    "trapezoid area calculator",
    "floor area calculator",
    "room area calculator",
    "land area calculator",
    "construction area calculator",
  ],
  alternates: {
    canonical: "/calculators/area",
  },
  openGraph: {
    title: "Area Calculator | Calculate Area in Square Feet & Meters",
    description:
      "Calculate area for rectangles, squares, circles, triangles and other common shapes in square feet, square meters, square yards and acres.",
    url: "https://www.cornerspan.com/calculators/area",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Area Calculator | Calculate Area in Square Feet & Meters",
    description:
      "Calculate area for common shapes in square feet, square meters, square yards and acres.",
  },
};

export default function AreaPage() {
  return <AreaCalculator />;
}
