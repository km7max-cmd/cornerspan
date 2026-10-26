import type { Metadata } from "next";
export const metadata: Metadata = { title: "Recent Calculators & History", description: "Find recently opened calculators, search saved concrete estimates and export results to CSV.", robots: { index: false, follow: true } };
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
