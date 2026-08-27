import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeProvider from "./components/ThemeProvider";

const GA_MEASUREMENT_ID = "G-F6Y04EJR2P";

export const metadata: Metadata = {
  title: {
    default:
      "CornerSpan | Professional Construction Calculators",
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
  title: "Construction Calculator – Free Online Tools | CornerSpan",
  description:
    "Free online construction calculators for concrete, bricks, steel, paint, tiles and roofing materials.",
  type: "website",
  locale: "en_US",
  siteName: "CornerSpan",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "CornerSpan Free Construction Calculators",
    },
  ],
},

  
  twitter: {
  card: "summary_large_image",
  title: "Construction Calculator – Free Online Tools | CornerSpan",
  description:
    "Free online construction calculators for concrete, bricks, steel, paint, tiles and roofing materials.",
  images: ["/og-image.png"],
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
      <body className="bg-[var(--background)] text-[var(--foreground)] antialiased">

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <ThemeProvider>

          <Header />

          <main className="pt-[76px]">
            {children}
          </main>

          <Footer />

        </ThemeProvider>

      </body>
    </html>
  );
}
