import "./globals.css";
import type { Metadata, Viewport } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: {
    default: "CornerSpan | Professional Construction Calculators",
    template: "%s | CornerSpan",
  },

  description:
    "Professional construction calculators for concrete, brick, steel, paint, roofing, tile and more. Fast, accurate and free online estimating tools.",

  keywords: [
    "construction calculator",
    "concrete calculator",
    "brick calculator",
    "paint calculator",
    "steel calculator",
    "roofing calculator",
    "tile calculator",
    "construction estimating calculator",
  ],

  authors: [{ name: "CornerSpan" }],
  creator: "CornerSpan",
  publisher: "CornerSpan",

  openGraph: {
    title: "CornerSpan",
    description:
      "Professional Construction Calculators for Contractors & Builders.",
    type: "website",
    locale: "en_US",
    siteName: "CornerSpan",
  },

  twitter: {
    card: "summary_large_image",
    title: "CornerSpan",
    description: "Professional Construction Calculators",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-blue-50 text-slate-900 antialiased">

        <Header />

        <main>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}
