import Link from "next/link";
import SearchBar from "../components/SearchBar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Stats from "../components/Stats";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import CalculatorGuides from "../components/CalculatorGuides";
import PopularCalculators from "../components/PopularCalculators";
const categories = [
  {
    name: "Concrete",
    description: "Concrete volume & material estimation",
    icon: "🏗️",
    href: "/calculators/concrete",
  },
  {
    name: "Brick",
    description: "Bricks required for walls",
    icon: "🧱",
    href: "/calculators/brick",
  },
  {
    name: "Steel",
    description: "Steel & reinforcement calculations",
    icon: "🔩",
    href: "/calculators/steel",
  },
  {
    name: "Paint",
    description: "Paint quantity & coverage",
    icon: "🎨",
    href: "/calculators/paint",
  },
  {
    name: "Tile",
    description: "Tile quantity & area estimation",
    icon: "⬛",
    href: "/calculators/tile",
  },
  {
    name: "Roofing",
    description: "Roof area & material estimation",
    icon: "🏠",
    href: "/calculators/roofing",
  },
];

const faqs = [
  {
    question: "Are CornerSpan calculators free to use?",
    answer:
      "Yes. CornerSpan provides construction calculation tools that can be used directly in your browser without installing an app.",
  },
  {
    question: "Can I use CornerSpan on my mobile phone?",
    answer:
      "Yes. The website is designed to work on smartphones, tablets, laptops and desktop computers.",
  },
  {
    question: "What construction calculations can I do?",
    answer:
      "You can calculate concrete, bricks, steel, paint, tiles, roofing materials and other construction quantities.",
  },
  {
    question: "Are the calculator results accurate?",
    answer:
      "CornerSpan uses standard calculation formulas and practical estimation methods. Always verify final quantities against your project specifications.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No account is required to start using the available calculators.",
  },
];

const guides = [
  {
    title: "Concrete Volume Guide",
    description:
      "Learn how to calculate concrete volume using length, width and depth.",
    href: "/guides/concrete-volume",
    icon: "🏗️",
  },
  {
    title: "Brick Quantity Guide",
    description:
      "Understand how to estimate the number of bricks required for a wall.",
    href: "/calculators/brick",
    icon: "🧱",
  },
  {
    title: "Steel Estimation Guide",
    description:
      "Learn the basics of reinforcement steel quantity estimation.",
    href: "/calculators/steel",
    icon: "🔩",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pt-[80px]">

      <Hero />
      <Stats />     
      <PopularCalculators />      
      <Features />
      <HowItWorks />
      <CalculatorGuides />
      <FAQ />
      <CTA />

    </main>
  );
}
