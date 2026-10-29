import type { CalculatorArticle } from "./calculator-articles";

export const roofPitchArticle: CalculatorArticle = {
  slug: "how-to-calculate-roof-pitch",
  title: "Roof Pitch Calculator: Rise, Run & Degrees",
  description: "Calculate roof pitch from rise and run, convert pitch to degrees, and check a 2:12–12:12 chart with worked examples and roof area multipliers.",
  category: "Roofing",
  tags: ["roof-pitch", "roofing", "measurements"],
  calculatorHref: "/calculators/roofing",
  publishedAt: "2026-10-29",
  modifiedAt: "2026-10-29",
  intro: [
    "To calculate roof pitch, divide the vertical rise by the horizontal run, then multiply by 12. A roof that rises 6 inches across 12 inches of run has a 6:12 pitch, an angle of about 26.57°, and a 50% slope. Those three numbers describe the same incline in different ways.",
    "Use the calculator below to enter your own measurements or convert a known pitch or angle. The examples then show how to check the answer, handle feet and inches, and use pitch when estimating roof surface area. A pitch of 6:12 does not mean a 6-degree roof."
  ],
  formula: "Rise per 12 = 12 × rise ÷ horizontal run. Angle in degrees = arctan(rise ÷ run) × 180 ÷ π. Slope % = 100 × rise ÷ run. Convert rise and run to the same unit first.",
  example: [
    ["Measurements", "6 in rise and 12 in horizontal run", "Same units"],
    ["Rise-to-run ratio", "6 ÷ 12", "0.5"],
    ["Pitch", "12 × 0.5", "6:12"],
    ["Angle above horizontal", "arctan(0.5), in degree mode", "26.57°"],
    ["Slope percentage", "0.5 × 100", "50%"],
    ["Area multiplier", "√(1 + 0.5²)", "1.118034×"]
  ],
  sections: [
    {
      id: "rise-and-run",
      title: "What rise and run mean on a roof",
      paragraphs: [
        "Rise is the vertical change between two points on the same roof slope. Run is the horizontal distance between those points. The diagonal connecting them is the sloping length; it is not the run. This distinction is the reason a tape measurement along the roof cannot be entered into the run field unchanged.",
        "Throughout this guide, roof pitch means inches of rise per 12 inches of horizontal run, the notation commonly used in US roofing estimates. The ratio is scale independent: 6 inches over 12 inches and 5 feet over 10 feet both describe 6:12.",
        "On a simple symmetrical gable, the horizontal run from one wall to a centered ridge is half the wall-to-wall span. A 20-foot span gives a 10-foot run, not a 20-foot run. That shortcut does not apply to an off-center ridge, a shed roof, or a measurement extending beyond the walls to the eaves. Use dimensions for the specific plane and endpoints you are evaluating."
      ]
    },
    {
      id: "use-the-calculator",
      title: "How to use the roof pitch calculator",
      paragraphs: [
        "Choose Rise and horizontal run when you know both dimensions. Enter each number and select inches or feet independently; the calculator converts the units before dividing. A 6-inch rise with a 1-foot run should return 6:12, exactly like 6 inches over 12 inches.",
        "Choose Pitch when your drawing already says something like 4:12 or 7.5:12. Enter only the first number. Choose Angle in degrees when you have a measured angle above horizontal; enter the degree value, not a percentage. Select Calculate pitch to see the ratio, angle, slope percentage and area multiplier together.",
        "Blank inputs, negative measurements and a zero run do not produce an estimate. A zero rise is accepted as a mathematical horizontal surface; it does not establish an adequate drainage design. Check measurements against drawings or a professional roof report when access is unsafe. You do not need to climb onto a roof to use this article."
      ]
    },
    {
      id: "roof-pitch-chart",
      title: "Roof pitch to degrees chart: 2:12 through 12:12",
      paragraphs: [
        "Use the first column when a plan specifies rise per 12. The angle is measured from horizontal. Slope percentage compares rise with run; it is not the percentage by which roof area increases. For example, a 6:12 slope is 50%, but its surface area is only about 11.8% larger than its horizontal projection.",
        "The chart rounds angles and percentages to two decimals and area multipliers to four. Keep full precision during a material estimate and round the final quantity according to the product's packaging. These are geometric conversions, not permitted slopes for a particular roof covering."
      ],
      table: {
        caption: "Calculated pitch conversions. The multiplier applies to horizontal projected area for one uniform slope.",
        headers: ["Pitch", "Angle", "Slope", "Area multiplier"],
        rows: [
          ["2:12", "9.46°", "16.67%", "1.0138"],
          ["3:12", "14.04°", "25.00%", "1.0308"],
          ["4:12", "18.43°", "33.33%", "1.0541"],
          ["5:12", "22.62°", "41.67%", "1.0833"],
          ["6:12", "26.57°", "50.00%", "1.1180"],
          ["7:12", "30.26°", "58.33%", "1.1577"],
          ["8:12", "33.69°", "66.67%", "1.2019"],
          ["9:12", "36.87°", "75.00%", "1.2500"],
          ["10:12", "39.81°", "83.33%", "1.3017"],
          ["11:12", "42.51°", "91.67%", "1.3566"],
          ["12:12", "45.00°", "100.00%", "1.4142"]
        ]
      }
    },
    {
      id: "degrees-to-pitch",
      title: "Convert degrees back to roof pitch",
      paragraphs: [
        "For an angle θ measured in degrees, rise per 12 = 12 × tan(θ). A 30° roof therefore has a pitch of about 6.928:12. It is not exactly 7:12, although a rough field note might round it that way. Use the unrounded result for subsequent geometry.",
        "A scientific calculator must be in degree mode for that expression. In software that expects radians, convert first: radians = degrees × π ÷ 180. Going the other way, convert the output of arctan to degrees. Mixing the two modes produces a plausible-looking number for a different angle.",
        "For a quick cross-check, 45° gives 12:12 and 100% slope. A 100% slope is not vertical. A vertical line is 90° and has no finite rise-to-horizontal-run ratio; this calculator rejects 90° and larger angles."
      ]
    },
    {
      id: "feet-and-inches-example",
      title: "Worked example with mixed feet and inches",
      paragraphs: [
        "Suppose a drawing gives a rise of 2 feet 9 inches and a horizontal run of 7 feet 6 inches. Convert both to inches: rise = 2 × 12 + 9 = 33 inches; run = 7 × 12 + 6 = 90 inches. Then 12 × 33 ÷ 90 = 4.4, so the pitch is 4.4:12.",
        "The angle is about 20.14°, the slope is 36.67%, and the area multiplier is approximately 1.065103. You can reproduce the same answer by entering a 2.75-foot rise and a 7.5-foot run. Do not enter 2.9 feet to represent 2 feet 9 inches: 2.9 feet actually means 2 feet 10.8 inches.",
        "Keep the measurement resolution in mind. A reading rounded to the nearest inch does not become a highly precise roof survey because the calculator displays several decimals. Use the extra digits to avoid premature rounding, then report a result appropriate to the input measurements."
      ]
    },
    {
      id: "roof-area-multiplier",
      title: "How pitch changes the roof area estimate",
      paragraphs: [
        "For a single flat roof plane with a constant slope, the area multiplier is √(1 + (rise/run)²). Multiply the plane's horizontal projected area by that factor to obtain its sloped surface area. For a simple roof whose planes share one pitch, the same factor can be applied to their combined horizontal projected area.",
        "A 20-by-30-foot horizontal roof footprint is 600 square feet. At a uniform 6:12 pitch, 600 × 1.118033989 gives about 670.82 square feet of roof surface before waste. That is 6.7082 roofing squares because one roofing square equals 100 square feet. This example assumes the 20-by-30 dimensions already describe the roof footprint being estimated.",
        "If those are building-wall dimensions, include the roof's horizontal overhangs before using them. If you already have measured sloped surface areas, add them directly without multiplying by pitch again. Applying the multiplier twice overstates the quantity.",
        "For mixed slopes, calculate each plane separately. A 200-square-foot horizontal projection at 4:12 gives 210.82 square feet; a different 300-square-foot projection at 6:12 gives 335.41. Together they total about 546.23 square feet before allowance. Averaging the two pitch numbers is not a substitute for that calculation."
      ]
    },
    {
      id: "slope-length",
      title: "Geometric slope length is not a rafter cut list",
      paragraphs: [
        "A 10-foot horizontal run and 5-foot vertical rise form a 6:12 right triangle. The diagonal is √(10² + 5²) = 11.18034 feet, about 11 feet 2.16 inches. The same result comes from 10 × 1.118034, using the pitch multiplier.",
        "That length joins the two chosen endpoints. It does not automatically include eave extensions, ridge-board adjustments, seat cuts, connection details or required bearing. It also does not size a rafter for span or loads. Use a framing plan for the member size and cutting details; this calculation simply checks the geometry."
      ]
    },
    {
      id: "next-material-estimate",
      title: "Use the pitch in a roofing material estimate",
      paragraphs: [
        "Once you know the pitch, open CornerSpan's Roofing Calculator using the link on this page. Enter the horizontal footprint, choose the matching supported pitch, and supply a project-specific waste allowance and the selected product's bundle coverage. The existing tool has preset pitch choices, so an intermediate result such as 4.4:12 should not be silently rounded to a different preset.",
        "For a non-preset pitch, use the multiplier from this page to calculate each roof plane's area, then prepare the material takeoff from the actual product coverage. Keep field shingles, ridge caps, starter, underlayment, flashing and other items on separate lines. The linked shingle-bundle example shows the difference between measured area and whole-bundle purchases.",
        "Before selecting a covering, read the current instructions for that exact product and the project requirements. A pitch calculation cannot establish that a particular roof system is suitable. The examples here explain measurement and arithmetic; they do not provide an installation specification."
      ]
    }
  ],
  mistakes: [
    "Using the full roof span as one side's run on a symmetrical gable.",
    "Entering sloped length where the formula needs horizontal run.",
    "Dividing a rise in inches by a run in feet without conversion.",
    "Treating a 6:12 pitch as 6 degrees or 50% slope as 50% extra area.",
    "Applying a pitch multiplier to a surface area already measured on the slope.",
    "Rounding a nonstandard pitch to a preset without checking the resulting area change."
  ],
  faqs: [
    { question: "What angle is a 4:12 roof pitch?", answer: "A 4:12 pitch is arctan(4 ÷ 12), or about 18.43° above horizontal. Its slope is 33.33%, and its roof area multiplier is about 1.054093." },
    { question: "What angle is a 6:12 roof pitch?", answer: "A 6:12 roof is about 26.57° above horizontal. It rises 6 units for every 12 units of horizontal run, giving a 50% slope." },
    { question: "Is a 12:12 pitch the same as 45 degrees?", answer: "Yes. Equal rise and horizontal run give a 45° angle. The slope is 100%, and sloped area is about 1.414214 times horizontal projected area." },
    { question: "Can I calculate roof pitch using feet instead of inches?", answer: "Yes. Use consistent units before dividing, or select the correct unit for each input in the calculator. A 5-foot rise over a 10-foot run gives the same 6:12 pitch as 6 inches over 12 inches." },
    { question: "How do I convert slope percentage to roof pitch?", answer: "Multiply the percentage by 12 and divide by 100. For example, a 25% slope gives 25 × 12 ÷ 100 = 3, or 3:12. Convert to degrees with arctan(percentage ÷ 100)." },
    { question: "Does knowing the pitch tell me how many shingles to buy?", answer: "Not by itself. You also need the horizontal projected area or measured surface area, a project-specific allowance and the selected shingle's stated coverage. Accessory products require separate quantities." }
  ],
  sources: [
    { label: "GAF: roof slope notation, roof planes and roofing squares", href: "https://www.gaf.com/en-us/blog/your-home/how-to-measure-a-roofing-square-3faec381-6f6f-49ff-841f-114c59108f2a" },
    { label: "OpenStax: right-triangle trigonometry and tangent ratios", href: "https://openstax.org/books/precalculus-2e/pages/5-4-right-triangle-trigonometry" }
  ],
  image: "/images/guides/roof-pitch-rise-run.svg",
  related: ["/blog/roofing-calculation-guide", "/blog/construction-material-takeoff-checklist", "/calculators/area"]
};
