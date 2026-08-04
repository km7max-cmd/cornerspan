import "./globals.css";
import type { Metadata } from "next";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "CornerSpan",
  description: "USA Construction Calculators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
  {children}
  <Footer />
</body>
    </html>
  );
}
