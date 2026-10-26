import type { Metadata } from "next";
export const metadata: Metadata = { title: "Saved Calculators", description: "Open construction calculators you saved in this browser.", robots: { index: false, follow: true } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
