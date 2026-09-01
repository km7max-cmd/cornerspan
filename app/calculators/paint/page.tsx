import type { Metadata } from "next";
import PaintCalculator from "./PaintCalculator";

const pageUrl =
  "https://www.cornerspan.com/calculators/paint";

export const metadata: Metadata = {
  title:
    "Paint Calculator | How Much Paint Do I Need?",

  description:
    "Free paint calculator to estimate how many gallons of paint you need for walls and ceilings, including doors, windows, coats and paint cost.",

  keywords: [
    "paint calculator",
    "paint estimator",
    "how much paint do I need",
    "paint quantity calculator",
    "paint calculator by room",
    "house paint calculator",
  ],

  alternates: {
    canonical: pageUrl,
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
    title:
      "Paint Calculator | How Much Paint Do I Need?",
    description:
      "Free paint calculator to estimate paint quantity and cost for walls and ceilings.",
    url: pageUrl,
    siteName: "CornerSpan",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CornerSpan Paint Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Paint Calculator | How Much Paint Do I Need?",
    description:
      "Calculate paint required for walls and ceilings, including coats, doors, windows and cost.",
    images: ["/og-image.png"],
  },
};

export default function Page() {
  return <PaintCalculator />;
}
