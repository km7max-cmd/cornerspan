import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeProvider from "./components/ThemeProvider";

const GA_MEASUREMENT_ID = "G-F6Y04EJR2P";

export const metadata: Metadata = {
  title: {
    default: "Free Construction Calculators | CornerSpan",
    template: "%s | CornerSpan",
  },

  description:
    "Free online construction calculators for concrete, brick, steel, paint, tile and roofing. Get fast, accurate material estimates for your next project.",

  keywords: [
    "construction calculator",
    "construction calculators",
    "concrete calculator",
    "brick calculator",
    "brick quantity calculator",
    "steel calculator",
    "paint calculator",
    "tile calculator",
    "roofing calculator",
  ],

  authors: [{ name: "CornerSpan" }],
  creator: "CornerSpan",
  publisher: "CornerSpan",

  openGraph: {
    title: "Free Construction Calculators | CornerSpan",
    description:
      "Free online construction calculators for concrete, brick, steel, paint, tile and roofing. Get fast, accurate material estimates.",
    url: "https://www.cornerspan.com/",
    type: "website",
    locale: "en_US",
    siteName: "CornerSpan",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Construction Calculators - CornerSpan",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Construction Calculators | CornerSpan",
    description:
      "Free online construction calculators for concrete, brick, steel, paint, tile and roofing.",
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
          strategy="lazyOnload"
        />

        <Script id="google-analytics" strategy="lazyOnload">
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
