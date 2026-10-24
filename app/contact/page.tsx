import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact CornerSpan with questions about construction calculators, report a calculation issue, or suggest a new tool or feature.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | CornerSpan",
    description: "Contact CornerSpan with questions about construction calculators, report a calculation issue, or suggest a new tool or feature.",
    url: "/contact",
    type: "website",
    siteName: "CornerSpan",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | CornerSpan",
    description: "Contact CornerSpan with questions about construction calculators, report a calculation issue, or suggest a new tool or feature.",
    images: ["/og-image.png"],
  },
};

import ContactPageClient from "./ContactPageClient";

export default function ContactPage() {
  return <ContactPageClient />;
}
