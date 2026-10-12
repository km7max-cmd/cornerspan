
export type HomepageFAQItem = {
  question: string;
  answer: string;
};

export const homepageFaq: HomepageFAQItem[] = [
  {
    question: "Are CornerSpan construction calculators free to use?",
    answer:
      "Yes. CornerSpan provides its available construction calculators for free, without requiring an account. Each calculator is intended to help with material estimation and project planning.",
  },
  {
    question: "Which construction materials can I estimate?",
    answer:
      "Available tools cover materials and tasks such as concrete, bricks, paint, tiles, gravel, asphalt, pavers, topsoil and sod or turf. Visit the calculators directory to see the tools currently available.",
  },
  {
    question: "What measurements do I need for a material estimate?",
    answer:
      "The required measurements depend on the calculator. A volume calculation commonly needs length, width and depth or thickness. Other estimates may require surface area, product dimensions, coverage or material-specific details.",
  },
  {
    question: "Can I rely on the result as an exact order quantity?",
    answer:
      "Treat calculator results as estimates rather than guaranteed order quantities. Actual requirements can change with product specifications, material density, coverage, installation methods, cutting, waste and site conditions. Verify important quantities against your plans and supplier guidance.",
  },
  {
    question: "Can I use CornerSpan on a mobile phone?",
    answer:
      "Yes. CornerSpan pages are designed to work on mobile phones, tablets and desktop screens. For the clearest result, enter measurements carefully and check the units displayed by the calculator.",
  },
  {
    question: "Do I need an account to use the calculators?",
    answer:
      "No account is required to use the available calculators. You can open a tool, enter the requested project details and review the estimate.",
  },
];
