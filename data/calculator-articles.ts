import { articleImages } from "./article-images";
import { planningArticles } from "./planning-articles";

export type ArticleTable = { caption: string; headers: string[]; rows: string[][] };

export type CalculatorArticle = {
 seoTitle?: string;
 imageAlt?: string;
 imageCaption?: string;
 exampleLink?: { href: string; label: string };
 slug:string; title:string; description:string; category:string; tags:string[]; calculatorHref:string; publishedAt:string; modifiedAt:string; intro:string[]; formula:string; example:string[][]; sections:{id:string;title:string;paragraphs:string[];table?:ArticleTable}[]; mistakes:string[]; faqs:{question:string;answer:string}[]; sources:{label:string;href:string}[]; image:string|null; related:string[];
};

const articles: CalculatorArticle[] = [
  ...planningArticles,
  {
    "slug": "paver-calculation-guide",
    "title": "How Many Pavers for a 10x10 Patio? Sizes & Waste",
    "description": "Estimate pavers for a 10x10 patio with 12x12 or 4x8 units. Compare counts, cutting allowances, pallet coverage and a worked material-cost example.",
    "category": "Landscaping",
    "tags": [
      "paver",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/paver",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "A 10x10 patio needs 110 pavers if each covers 1 square foot and you allow 10% for cuts. With 4x8-inch installed coverage, the same patio needs 495 pavers including that allowance.",
      "A piece count is only half the shopping decision. A small paver might look cheaper on the shelf but take several times as many pieces to cover your patio. Start with installed coverage, then compare what each finished square foot will cost.",
      "The example below uses a simple square patio and single-size pavers. Its 10% allowance and $2 unit price are illustrative inputs, not requirements or current market prices. Use the dimensions and coverage supplied for your selected product."
    ],
    "formula": "Pavers to order = round up [patio area ÷ paver coverage × (1 + waste % ÷ 100)]",
    "example": [
      [
        "Patio",
        "10 ft × 10 ft",
        "100 sq ft"
      ],
      [
        "Paver face",
        "12 in × 12 in ÷ 144",
        "1 sq ft"
      ],
      [
        "With 10% allowance",
        "100 ÷ 1 × 1.10",
        "110 pavers"
      ],
      [
        "At $2 per paver",
        "110 × $2",
        "$220"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Compare 10x10 and 10x12 patios",
        "paragraphs": [
          "A 10x12-foot patio has 120 square feet. At one square foot per paver and 10% extra, order 132 pieces. At 4x8-inch coverage, the adjusted count is 594 pieces. Confirm installed coverage with the supplier before using either count."
        ]
      },
      {
        "id": "section-1",
        "title": "Measure the patio and the paver coverage",
        "paragraphs": [
          "Break an L-shaped patio into rectangles and add their areas. Deduct permanent planting beds or other spaces that will not be paved. Measure the layout rather than relying on the dimensions of an old sketch.",
          "Convert paver dimensions from inches to square feet by dividing length × width by 144. Nominal product names do not always equal installed dimensions. A multi-size pattern may be sold by layer or pallet, so use its published coverage instead of treating every unit as the same rectangle."
        ]
      },
      {
        "id": "section-2",
        "title": "Allow for cuts, then round the purchase quantity",
        "paragraphs": [
          "A straight rectangular layout and a diagonal border can have different cutting losses. Choose an allowance from the actual design, including curves and edge pieces. Keep the underlying area calculation unrounded until the final piece count.",
          "For a 10-by-12-foot patio, keep the full 120-square-foot area through the calculation and round only the final order. If a pack holds 20 one-square-foot pavers, the 132-piece adjusted requirement needs seven packs, or 140 purchased pieces. Price those seven packs when comparing suppliers."
        ]
      },
      {
        "id": "section-3",
        "title": "Turn pieces into a complete materials budget",
        "paragraphs": [
          "The $220 example covers pavers only. Add separate quotes for base aggregate, bedding material, jointing material, edging and delivery. Installed depth for the base depends on the approved pavement section, soil, drainage and intended loading; it cannot be selected from surface area alone.",
          "If purchasing by pallet, divide the required coverage by the supplier’s pallet coverage and round up only where full pallets are required. Price the actual purchased quantity and check whether unused full packs can be returned."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "Compare two pavers before you choose",
        "paragraphs": [
          "Suppose a 12x12 paver costs $2 and a 4x8 paver costs $0.60. Using the coverage assumptions above, the larger unit costs $2 per square foot before waste. The smaller unit needs 4.5 pieces per square foot, so it costs $2.70 per square foot. The lower sticker price is the more expensive surface in this example.",
          "For the 10x10 patio with 10% extra, the two material totals are $220 for 110 large pavers and $297 for 495 small pavers. These are made-up prices to show the comparison, not quotes. Pattern, color, load rating and installation requirements still need to suit your project.",
          "Before placing the order, write down the product name, installed coverage, pieces per pack, required packs and delivery charge. If the supplier prices a mixed-size kit by pallet, compare its stated coverage directly with your adjusted patio area. Keep edging and base quantities on separate lines so they don't disappear from the budget."
        ]
      },
      {
        "id": "section-4",
        "title": "Use the Paver Calculator",
        "paragraphs": [
          "Enter project length and width in feet, then paver length and width in inches. Set the waste percentage and optional unit price, and calculate. A 10 × 10 ft project with 12 × 12 in pavers, 10% waste and a $2 price should produce 110 pieces and $220.",
          "Check the drawing and supplier packaging before treating the output as an order. For mixed-size kits, use the vendor’s pattern coverage and compare it with the calculator’s area result."
        ]
      }
    ],
    "mistakes": [
      "Using inches as though they were feet.",
      "Adding a second allowance to a pallet quote that already includes it.",
      "Assuming base material is included in the paver count.",
      "Ignoring partial pavers needed at curved edges."
    ],
    "faqs": [
      {
        "question": "How many 12-inch pavers cover 100 square feet?",
        "answer": "If each paver covers exactly one square foot, 100 pieces cover the area before cuts. A 10% allowance gives 110 pieces."
      },
      {
        "question": "How many 4-by-8-inch pavers cover a square foot?",
        "answer": "A 4-by-8-inch rectangular face covers 32/144 square feet, or 4.5 pieces per square foot before waste. Confirm the product’s installed module."
      },
      {
        "question": "Is 10% waste always required?",
        "answer": "No. It is the assumption in this example. Pattern, borders, curves and breakage affect the allowance."
      },
      {
        "question": "Can I estimate mixed-size paver kits?",
        "answer": "Use the kit’s coverage per layer or pallet; a single rectangular paver size does not represent every pattern."
      },
      {
        "question": "Does the result include sand and base?",
        "answer": "No. Estimate each separate layer using its area and specified depth."
      },
      {
        "question": "Should I round the patio area first?",
        "answer": "Keep full precision through the calculation, then round the final pieces or required packs up."
      }
    ],
    "sources": [
      {
        "label": "Belgard patio planning resources",
        "href": "https://www.belgard.com/plan-design/planning-tools/"
      }
    ],
    "image": "/cornerspan-paver-calculator-hero.webp",
    "related": [
      "/blog/construction-material-takeoff-checklist",
      "/blog/tile-calculation-guide",
      "/blog/gravel-calculation-guide"
    ]
  },
  {
    "slug": "tile-calculation-guide",
    "title": "How Many 12x12 Tiles for 100 Square Feet?",
    "description": "Find how many 12x12 tiles and boxes cover 100 square feet with a 10% allowance. Compare 12x24 tiles, carton rounding and a tile-only cost example.",
    "category": "Flooring",
    "tags": [
      "tile",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/tile",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "For 100 square feet, you need 110 tiles when each 12x12 tile covers one square foot and you add 10% for cuts. With ten tiles per box, that is 11 boxes.",
      "The number on the calculator and the number in your cart can differ. Tile comes in boxes, and one extra required tile can mean buying another full carton. Work out the coverage first; round the purchase quantity only after you've allowed for cuts.",
      "This example assumes a rectangular floor, 12-by-12-inch tiles, 10 tiles per box and a 10% planning allowance. Check the actual box label, because a product sold as a nominal 12-inch tile can have different dimensions or stated coverage."
    ],
    "formula": "Tiles = round up [surface area ÷ tile area × allowance factor]; boxes = round up [tiles ÷ tiles per box]",
    "example": [
      [
        "Floor",
        "10 ft × 10 ft",
        "100 sq ft"
      ],
      [
        "Tile area",
        "12 × 12 ÷ 144",
        "1 sq ft"
      ],
      [
        "With 10% allowance",
        "100 × 1.10",
        "110 tiles"
      ],
      [
        "Boxes of 10",
        "110 ÷ 10",
        "11 boxes"
      ],
      [
        "At $20 per box",
        "11 × $20",
        "$220"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "12x12 versus 12x24 tiles for 100 square feet",
        "paragraphs": [
          "If each 12x24 tile covers 2 square feet, 100 square feet needs 50 tiles before waste or 55 with a 10% allowance. Boxes of eight require seven boxes, giving 56 purchased tiles. Use the carton’s stated coverage if it differs from nominal dimensions."
        ]
      },
      {
        "id": "section-1",
        "title": "Measure floors, walls and recesses separately",
        "paragraphs": [
          "Split an irregular floor into smaller rectangles and add the areas. For walls, use width × tiled height and deduct only openings that genuinely remove tile coverage. Include tiled niches, returns or a separate backsplash as their own sections.",
          "A tile count is not a layout drawing. Establish the starting line, joint spacing and border layout before ordering. Daltile’s floor-installation guidance includes dry layout and uniform joints; those layout decisions affect where cuts occur."
        ]
      },
      {
        "id": "section-2",
        "title": "Distinguish required tiles from purchased tiles",
        "paragraphs": [
          "For the example, 110 tiles fit exactly into eleven 10-tile boxes. If the box holds eight tiles instead, round 110 ÷ 8 up to fourteen boxes. You would purchase 112 tiles, leaving two beyond the adjusted requirement.",
          "Keep the measured area unrounded until you calculate whole tiles. Then round to full boxes. If your supplier gives coverage per carton, use that figure to cross-check the order; a mismatch is a reason to recheck tile dimensions and packing details."
        ]
      },
      {
        "id": "section-3",
        "title": "Budget for the entire installation",
        "paragraphs": [
          "The example’s $220 is an illustrative tile-only price. Mortar, grout, waterproofing, trim, underlayment, delivery and labor are separate. Do not calculate grout quantity from tile count alone: joint width, depth and tile geometry matter.",
          "Discuss the cut allowance and spare stock with the installer. Pattern, room shape and future replacement needs can justify different quantities. Confirm shade, caliber or batch details when those apply to the product, and keep matching spare material where practical."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "When the cheaper box costs more",
        "paragraphs": [
          "Consider two hypothetical options for a floor that needs 110 square feet after the cutting allowance. Box A covers 10 square feet and costs $20: eleven boxes cost $220. Box B covers 8 square feet and costs $17: fourteen boxes cost $238. Box B has the lower box price, but the higher total.",
          "Compare price per covered square foot, then calculate whole boxes for your room. Don't assume a 12-inch product name guarantees exactly one square foot of coverage per tile. The carton coverage is the useful number when ordering.",
          "Keep a note of the product code, color, size and batch information from the box. Ask about matching replacement stock and returns before ordering extra cartons. Decide whether spare tiles for later repairs are already included in your allowance; adding them twice quietly inflates the order."
        ]
      },
      {
        "id": "section-4",
        "title": "Use the Tile Calculator",
        "paragraphs": [
          "Enter the room dimensions and unit, choose the actual tile dimensions, and enter tiles per box. Set waste and the supplier’s box price. The example should display 110 tiles, eleven boxes and $220.",
          "If a carton advertises square-foot coverage, compare the calculated coverage with the label. For mosaics, mixed formats or unusual shapes, the manufacturer’s coverage per sheet or pack may be more useful than a single rectangular tile measurement."
        ]
      }
    ],
    "mistakes": [
      "Pricing the required tiles when only complete boxes can be purchased.",
      "Using a nominal tile name without reading carton coverage.",
      "Forgetting tiled returns or niches.",
      "Counting an allowance twice."
    ],
    "faqs": [
      {
        "question": "How many boxes cover 100 square feet?",
        "answer": "It depends on box coverage. With ten one-square-foot tiles per box and a 10% allowance, buy eleven boxes."
      },
      {
        "question": "Should waste be added before box rounding?",
        "answer": "Yes. Apply the chosen allowance to the raw tile requirement, round tiles up, then round up to whole boxes."
      },
      {
        "question": "Are grout joints included automatically?",
        "answer": "This area estimate does not model a detailed joint layout. Check the product’s coverage and installer’s layout."
      },
      {
        "question": "Is 10% enough for diagonal tile?",
        "answer": "Not necessarily. Discuss the actual pattern and cutting plan with the installer."
      },
      {
        "question": "Can I use this for wall tile?",
        "answer": "Yes, using the actual wall area to be tiled and the correct product coverage."
      },
      {
        "question": "Does tile cost include installation?",
        "answer": "No. The sample price and calculator’s box-price estimate cover tile material only."
      }
    ],
    "sources": [
      {
        "label": "Daltile floor tile installation and layout",
        "href": "https://www.daltile.com/how-to/how-to-install-tile/how-to-install-floor-tile"
      }
    ],
    "image": "/cornerspan-tile-calculator-hero.webp",
    "related": [
      "/blog/paver-calculation-guide",
      "/blog/area-calculation-guide"
    ]
  },
  {
    "slug": "paint-calculation-guide",
    "title": "How Much Paint for a 10x10 Room? Walls & Ceiling",
    "description": "Estimate paint for a 10x10 room with 8-foot walls and two coats. See gallon rounding, a separate ceiling estimate and a comparison with a 10x12 room.",
    "category": "Painting",
    "tags": [
      "paint",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/paint",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "A 10x10 room with 8-foot walls needs about 1.83 gallons for two coats at 350 square feet per gallon, before subtracting openings. Rounded to quarter-gallon purchases, buy 2 gallons for the walls.",
      "A 10x10 room describes the floor, but you're painting the walls. Wall height and the number of coats are what change the answer. Keep the ceiling, trim and primer as separate jobs, especially when they use different products.",
      "Use the coverage on the chosen paint’s label or technical data sheet. The examples below assume 350 square feet per gallon per coat; texture, porosity, preparation and application can change actual usage."
    ],
    "formula": "Gallons = net painted area (sq ft) × coats ÷ coverage (sq ft per gallon per coat)",
    "example": [
      [
        "Room walls",
        "2 × (10 + 10) × 8",
        "320 sq ft"
      ],
      [
        "Two coats",
        "320 × 2",
        "640 coat-sq-ft"
      ],
      [
        "At 350 sq ft/gallon",
        "640 ÷ 350",
        "1.83 gallons"
      ],
      [
        "Quarter-gallon purchase rounding",
        "Round 1.8286 up to next 0.25",
        "2 gallons"
      ],
      [
        "At $45/gallon",
        "2 × $45",
        "$90"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Paint for a 10x12 room and a separate ceiling",
        "paragraphs": [
          "A 10x12 room with 8-foot walls has 352 square feet of wall area before openings. Two coats at 350 square feet per gallon need about 2.01 gallons, rounded up to 2.25 gallons if purchasing in quarts. A 10x10 ceiling alone needs about 0.57 gallon for two coats at the same coverage, rounded to 0.75 gallon. Check product coverage and available can sizes."
        ]
      },
      {
        "id": "section-1",
        "title": "Calculate the wall area first",
        "paragraphs": [
          "For a rectangular room, multiply the perimeter by wall height. A 10 × 10 ft room with 8 ft walls has 40 ft of perimeter and 320 sq ft of wall area before openings. Measure each wall separately when heights vary.",
          "Deduct significant unpainted openings when making a net-area estimate, but confirm the dimensions rather than assuming every door or window is identical. CornerSpan’s room options use standard opening allowances; account separately for openings that differ materially."
        ]
      },
      {
        "id": "section-2",
        "title": "Estimate a ceiling separately",
        "paragraphs": [
          "A flat ceiling uses length × width. The same 10 × 10 ft room has a 100 sq ft ceiling. Two coats at 350 sq ft per gallon require about 0.57 gallon before purchase rounding; ceiling height is not needed for that flat-area calculation.",
          "The calculator rounds US purchases to quarter-gallon increments. This ceiling example becomes 0.75 gallon. That is a quantity estimate, not a promise that the selected product is available in every container size or that quarts cost one-quarter of a gallon’s price."
        ]
      },
      {
        "id": "section-3",
        "title": "Choose coverage and coats from the product",
        "paragraphs": [
          "Sherwin-Williams describes its paint calculator as an approximate planning tool and recommends confirming quantities for the project. Use the specific paint’s coverage instead of assuming all finishes and surfaces consume the same amount.",
          "Calculate primer separately if it has a different coverage rate or coat count. A major color change, rough substrate or unfinished surface may require a different system than the example. Do not treat extra coats as a substitute for suitable preparation."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "What changes when you subtract a door and window?",
        "paragraphs": [
          "Start with the example's 320 square feet of walls. A 3x7-foot door removes 21 square feet, and a 3x4-foot window removes another 12. That leaves 287 square feet to coat. At two coats and 350 square feet per gallon, the calculated amount falls to 1.64 gallons.",
          "Buying in quarter-gallon increments would round that to 1.75 gallons. Compare the actual shelf price of a gallon plus three quarts with two gallons; the smaller volume isn't automatically the cheaper purchase. Keep some matching paint for touch-ups if that is part of your plan.",
          "An opening deduction only belongs in the wall total. It doesn't reduce the ceiling area, and it doesn't account for painting the door or trim with a different finish. If the label gives a coverage range, compare the result at both ends before choosing a quantity."
        ]
      },
      {
        "id": "section-4",
        "title": "Build a realistic paint budget",
        "paragraphs": [
          "At the illustrative $45 per gallon, the two-gallon wall purchase is $90. CornerSpan estimates quart costs proportionally from a per-gallon price, so replace that estimate with actual shelf or contractor pricing before purchasing.",
          "The calculator’s optional labor rate applies to net painted surface area, not area multiplied by coat count. Verify the scope of a labor quote. Add primer, tape, rollers, protection, repairs, tax and delivery separately. Enter the actual dimensions, coats and coverage in the Paint Calculator and check the result before ordering."
        ]
      }
    ],
    "mistakes": [
      "Using floor area for wall paint.",
      "Multiplying by coat count twice.",
      "Assuming primer and finish paint share a coverage rate.",
      "Treating an estimated quart price as a supplier quote."
    ],
    "faqs": [
      {
        "question": "Does a 10-by-10 room need one gallon?",
        "answer": "Not automatically. The walls in this example need about 1.83 gallons for two coats before container rounding."
      },
      {
        "question": "Does a ceiling calculation need height?",
        "answer": "A flat ceiling uses length and width only. Vaulted or sloped ceilings need their actual surface area."
      },
      {
        "question": "How does the calculator round US paint purchases?",
        "answer": "It rounds up to the next quarter gallon, then expresses that as gallons and quarts."
      },
      {
        "question": "Can I use liters?",
        "answer": "Yes. Use the metric setting and the coverage appropriate to liters and square meters."
      },
      {
        "question": "Should primer be included in the same total?",
        "answer": "Calculate primer separately when its coverage or coat count differs from the finish paint."
      },
      {
        "question": "Are openings always deducted exactly?",
        "answer": "Preset openings are approximations. Measure unusual openings and adjust the estimate accordingly."
      }
    ],
    "sources": [
      {
        "label": "Sherwin-Williams paint calculator guidance",
        "href": "https://www.sherwin-williams.com/homeowners/color/color-tools/paint-calculator"
      }
    ],
    "image": "/paint-calculator.webp",
    "related": [
      "/blog/tile-calculation-guide",
      "/blog/area-calculation-guide"
    ]
  },
  {
    "slug": "asphalt-calculation-guide",
    "title": "How Many Tons of Asphalt for a 20x50 Driveway?",
    "description": "Calculate asphalt tons for a 20x50 driveway at 2, 3 or 4 inches. See density assumptions, compacted volume, a 5% allowance and a material-cost example.",
    "category": "Paving",
    "tags": [
      "asphalt",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/asphalt",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "A 20x50 driveway at 3 inches thick requires 18.125 US tons at an assumed compacted density of 145 pounds per cubic foot. A 5% allowance raises that estimate to about 19.03 tons.",
      "An asphalt quote is easier to check when area, finished thickness and tons appear on separate lines. That lets you see whether two contractors are pricing the same amount of pavement before you compare their totals.",
      "This is a quantity calculation, not a pavement design. The example’s thickness, density and allowance are assumptions for the arithmetic. Traffic, subgrade, drainage and the selected mix determine the project specification."
    ],
    "formula": "US tons = length (ft) × width (ft) × thickness (in) ÷ 12 × density (lb/cu ft) ÷ 2,000",
    "example": [
      [
        "Driveway area",
        "20 ft × 50 ft",
        "1,000 sq ft"
      ],
      [
        "Compacted volume",
        "1,000 × 3/12",
        "250 cu ft"
      ],
      [
        "At assumed 145 lb/cu ft",
        "250 × 145 ÷ 2,000",
        "18.125 US tons"
      ],
      [
        "Example 5% allowance",
        "18.125 × 1.05",
        "19.03125 US tons"
      ],
      [
        "At illustrative $100/ton",
        "19.03125 × $100",
        "$1,903.13"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Compare 2-, 3- and 4-inch asphalt quantities",
        "paragraphs": [
          "For the same 1,000-square-foot area and density, 2 inches requires about 12.08 US tons, 3 inches 18.13 tons and 4 inches 24.17 tons before an allowance. With 5% extra, these become about 12.69, 19.03 and 25.38 tons. These are quantity comparisons, not pavement thickness recommendations; use the project specification and supplier density."
        ]
      },
      {
        "id": "section-1",
        "title": "Measure the actual paving footprint",
        "paragraphs": [
          "Separate a driveway, apron and parking pad into simple shapes. Add their areas and deduct sections that will remain unpaved. If the driveway widens, measure multiple widths rather than multiplying its narrowest width by the entire length.",
          "Use the compacted lift thickness specified for the work. Inches must be divided by 12 before combining them with length and width in feet. An error in depth affects the entire tonnage estimate."
        ]
      },
      {
        "id": "section-2",
        "title": "Confirm the density and unit of sale",
        "paragraphs": [
          "The 145 lb/cu ft value here is an example input. Confirm the appropriate density with the mix supplier or contractor; mix composition and compaction matter. The Asphalt Paving Handbook discusses how materials and construction conditions affect compaction.",
          "A US short ton is not a metric tonne. If a supplier quotes metric tonnes, convert consistently: one US short ton is about 0.907185 metric tonne. Do not apply a price per tonne directly to a result labeled US tons."
        ]
      },
      {
        "id": "section-3",
        "title": "Apply allowances without counting compaction twice",
        "paragraphs": [
          "The example starts with finished compacted volume and a density appropriate to that basis. Do not add a loose-volume compaction factor on top of it without understanding what the supplier’s conversion already includes.",
          "Keep a separate allowance for defined measurement uncertainty, irregular areas or handling needs. Five percent is used only to show the calculation. Confirm final delivery quantities, plant dispatch increments and any minimum charges before scheduling."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "Why two driveway estimates can show different tonnage",
        "paragraphs": [
          "For the 1,000-square-foot example, increasing thickness from 3 to 4 inches increases volume by one-third. At the same assumed density, that adds about 6.04 US tons before any allowance. A quote based on 4 inches shouldn't be compared with a 3-inch quote as though the material quantities were identical.",
          "Ask each supplier or contractor to state the paved area, compacted thickness, mix density, included allowance and whether the quote covers base work. Keep delivery, minimum-load charges and installation separate from a material-only price. This makes differences visible without guessing which quote is correct.",
          "If the supplier gives density in pounds per cubic foot, use that value directly in the calculation. If the quote gives only a total price per ton, don't infer density from price. Confirm the design thickness with the person responsible for the pavement specification; the calculator only estimates the resulting quantity."
        ]
      },
      {
        "id": "section-4",
        "title": "Use the Asphalt Calculator and compare quotes",
        "paragraphs": [
          "Select US units, enter 20 ft by 50 ft, choose a 3-inch compacted thickness and enter the assumed density of 145 lb/cu ft. Set 5% waste and $100 per US ton to reproduce the example. The displayed tonnage is rounded; costs should be based on full precision or the actual invoiced quantity.",
          "The sample $1,903.13 covers asphalt material at the assumed rate. Base preparation, demolition, trucking, placement, compaction, equipment and taxes may be separate. Ask for an itemized scope and check that both quotes use the same area and pavement section."
        ]
      }
    ],
    "mistakes": [
      "Using loose thickness as finished thickness.",
      "Entering 3 feet instead of 3 inches.",
      "Confusing US tons and metric tonnes.",
      "Treating material cost as the full installed driveway price."
    ],
    "faqs": [
      {
        "question": "How many tons cover 1,000 square feet?",
        "answer": "At 3 inches and an assumed 145 lb/cu ft, the base estimate is 18.125 US tons. Other depths or densities change it."
      },
      {
        "question": "Is 145 lb/cu ft always correct?",
        "answer": "No. It is the example value; confirm the mix density for the job."
      },
      {
        "question": "Should I use compacted thickness?",
        "answer": "Use the thickness and density on a consistent basis. This example uses the specified compacted thickness."
      },
      {
        "question": "Does waste include compaction?",
        "answer": "Not automatically. Avoid counting a compaction adjustment twice when the estimate already uses finished volume and density."
      },
      {
        "question": "What is the difference between a ton and a tonne?",
        "answer": "A US short ton is 2,000 lb; a metric tonne is 1,000 kg."
      },
      {
        "question": "Does the calculator choose pavement thickness?",
        "answer": "No. It estimates material for the thickness you enter; design and site conditions must establish that thickness."
      }
    ],
    "sources": [
      {
        "label": "Asphalt Paving Handbook: factors affecting compaction",
        "href": "https://handbook.asphaltpavement.org/section/8-4-factors-affecting-compaction/"
      },
      {
        "label": "Vulcan Materials quantity calculators",
        "href": "https://www.vulcanmaterials.com/construction-materials/product-calculators"
      }
    ],
    "image": "/cornerspan-asphalt-calculator-hero.webp",
    "related": [
      "/blog/gravel-calculation-guide",
      "/blog/area-calculation-guide"
    ]
  },
  {
    "slug": "gravel-calculation-guide",
    "title": "How Much Gravel for a 10x20 Area? Yards & Tons",
    "description": "Estimate gravel for a 10x20 area at 3 or 4 inches deep. Convert cubic yards to US tons with a stated density, add an allowance and check delivery units.",
    "category": "Landscaping",
    "tags": [
      "gravel",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/gravel",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "A 10x20 area at 3 inches deep needs about 1.85 cubic yards of gravel before an allowance. With 10% extra, that is about 2.04 cubic yards or 2.85 US tons at an assumed 1.4 tons per cubic yard.",
      "A gravel yard may quote tons while your measurements give cubic yards. That's where estimates often go wrong. Keep both numbers in your notes and ask the supplier which density they use for the specific material you're buying.",
      "The same cubic yard can weigh different amounts depending on aggregate type, grading and moisture. The 1.4 US tons per cubic yard used below is an assumption for a worked example, not a universal gravel density."
    ],
    "formula": "Cubic yards = length (ft) × width (ft) × depth (in) ÷ 324; US tons = cubic yards × density (US tons/cu yd)",
    "example": [
      [
        "Path area",
        "10 ft × 20 ft",
        "200 sq ft"
      ],
      [
        "Volume at 3 inches",
        "200 × 3 ÷ 324",
        "1.85185 cu yd"
      ],
      [
        "Example 10% allowance",
        "1.85185 × 1.10",
        "2.03704 cu yd"
      ],
      [
        "At assumed 1.4 tons/cu yd",
        "2.03704 × 1.4",
        "2.85185 US tons"
      ],
      [
        "At illustrative $50/ton",
        "2.85185 × $50",
        "$142.59"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Gravel at 3 inches versus 4 inches deep",
        "paragraphs": [
          "At 4 inches, the same 200 square feet needs about 2.47 cubic yards before extra material. A 10% allowance gives about 2.72 cubic yards; at 1.4 US tons per cubic yard, that is about 3.80 tons. Use the supplier’s density for the selected aggregate. An allowance is not a measured compaction conversion."
        ]
      },
      {
        "id": "section-1",
        "title": "Measure depth as carefully as length and width",
        "paragraphs": [
          "For a rectangular path, multiply length and width to find area. Divide the planned depth in inches by 12 to get feet, multiply by area, then divide cubic feet by 27. The combined divisor is 324 when depth remains in inches.",
          "For curves, split the footprint into short rectangles or use the Area Calculator for geometric sections. Where depth varies, estimate separate zones. A single shallow measurement can underestimate the material needed to fill low spots."
        ]
      },
      {
        "id": "section-2",
        "title": "Ask the supplier about density and compaction",
        "paragraphs": [
          "Use the product name and grading on the quote rather than a generic label such as gravel. Confirm whether the supplier’s conversion refers to loose delivered material or the compacted layer you need. Vulcan’s quantity guidance recommends reviewing estimates with a local sales representative.",
          "Do not apply an arbitrary compaction percentage to every aggregate. If the project specifies a compacted layer, obtain an appropriate loose-to-compacted allowance from the contractor or supplier and keep it separate from any other waste allowance."
        ]
      },
      {
        "id": "section-3",
        "title": "Convert the estimate into an order",
        "paragraphs": [
          "For the example, the adjusted estimate is about 2.04 cubic yards or 2.85 US tons at the stated density. These rounded display values are useful for discussion, but the supplier may sell in different increments or invoice measured delivered weight.",
          "At the illustrative $50 per US ton, the unrounded material estimate is $142.59. Delivery, minimum loads, access limitations and tax can change the total substantially. Do not infer that a household vehicle can carry the order from volume alone; compare weight with its rated capacity."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "Compare a quote by the yard with a quote by the ton",
        "paragraphs": [
          "Using the example's 2.03704 cubic yards and assumed density of 1.4 US tons per cubic yard, imagine one supplier quotes $60 per cubic yard and another quotes $50 per ton. The first material subtotal is about $122.22; the second is about $142.59. These illustrative prices only become comparable if both quotes describe the same material and delivery basis.",
          "A different density changes the tonnage without changing the space you need to fill. At an assumed 1.6 tons per cubic yard, the same volume is about 3.26 tons rather than 2.85. Ask for the product-specific conversion instead of choosing a density that makes the order look cheaper.",
          "Write down the stone type, grading, intended finished depth and whether the supplier's quantity is loose or compacted. A general 10% allowance does not prove how much the material will compact. For a specified base layer, ask how the ordered loose quantity should relate to the finished volume."
        ]
      },
      {
        "id": "section-4",
        "title": "Enter the example in the Gravel Calculator",
        "paragraphs": [
          "Enter a 10 × 20 ft area, 3-inch depth, 10% waste and density of 1.4 US tons per cubic yard. Choose USD and a price of $50 per US ton. Review both the volume and weight results.",
          "If buying bags, use the volume or weight printed on those bags and round the bag count up. A bag’s weight cannot be treated as its cubic-foot coverage without a justified density conversion."
        ]
      }
    ],
    "mistakes": [
      "Using cubic feet as cubic yards.",
      "Assuming every gravel product has the same density.",
      "Adding compaction twice.",
      "Comparing a price per cubic yard with a price per ton without conversion."
    ],
    "faqs": [
      {
        "question": "How much gravel covers 200 square feet at 3 inches?",
        "answer": "The geometric volume is about 1.85 cubic yards before any allowance."
      },
      {
        "question": "How many tons are in one yard of gravel?",
        "answer": "There is no universal value. Multiply one cubic yard by the supplier’s density in US tons per cubic yard."
      },
      {
        "question": "Why does the calculator ask for density?",
        "answer": "Volume alone cannot determine weight. Density links cubic yards to US tons."
      },
      {
        "question": "Should I add 10% extra?",
        "answer": "Use a project-specific allowance. Ten percent is only the assumption in this example."
      },
      {
        "question": "Can I use the formula for a circular area?",
        "answer": "Yes. Calculate the circle’s area first, then multiply by depth and convert the volume."
      },
      {
        "question": "Is delivery included in the price result?",
        "answer": "No. The price-per-ton calculation estimates the material charge only."
      }
    ],
    "sources": [
      {
        "label": "Vulcan Materials aggregate and asphalt quantity tools",
        "href": "https://www.vulcanmaterials.com/construction-materials/product-calculators"
      }
    ],
    "image": "/cornerspan-gravel-calculator-hero.webp",
    "related": [
      "/blog/how-to-calculate-construction-project-cost",
      "/blog/paver-calculation-guide",
      "/blog/asphalt-calculation-guide"
    ]
  },
  {
    "slug": "topsoil-calculation-guide",
    "title": "How Much Topsoil for 200 Square Feet? Yards & Bags",
    "description": "Calculate topsoil for 200 square feet at 3 or 6 inches deep. Compare bulk cubic yards and 0.75-cubic-foot bags, with a clear allowance and rounding example.",
    "category": "Landscaping",
    "tags": [
      "topsoil",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/topsoil",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-27",
    "intro": [
      "Covering 200 square feet with 3 inches of topsoil takes 50 cubic feet. With a 10% allowance, order about 2.04 cubic yards or 74 bags holding 0.75 cubic foot each.",
      "The useful shopping comparison is delivered volume. Bags make small quantities easy to handle; bulk soil can have a lower material price but an extra delivery charge. Calculate the same finished area and depth for both options before choosing.",
      "Volume does not tell you whether a soil is suitable for a lawn, garden bed or planting mix. Check the existing soil and intended use separately. The depth and allowance in this article are example inputs, not a prescription for every yard."
    ],
    "formula": "Cubic feet = area (sq ft) × depth (in) ÷ 12; cubic yards = cubic feet ÷ 27",
    "example": [
      [
        "Garden area",
        "10 ft × 20 ft",
        "200 sq ft"
      ],
      [
        "Added depth",
        "200 × 3/12",
        "50 cu ft"
      ],
      [
        "Example 10% allowance",
        "50 × 1.10",
        "55 cu ft"
      ],
      [
        "Bulk quantity",
        "55 ÷ 27",
        "2.03704 cu yd"
      ],
      [
        "0.75-cu-ft bags",
        "Round up 55 ÷ 0.75",
        "74 bags"
      ],
      [
        "At illustrative $40/cu yd",
        "55 ÷ 27 × $40",
        "$81.48"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Compare 3-inch and 6-inch topsoil layers",
        "paragraphs": [
          "A 6-inch layer over 200 square feet needs 100 cubic feet, or about 3.70 cubic yards, before an allowance. With 10% extra, the requirement becomes 110 cubic feet or about 4.07 cubic yards. Divide 110 by 0.75 and round up to 147 bags. Depth selection depends on the planting and site plan; these examples only estimate volume."
        ]
      },
      {
        "id": "section-1",
        "title": "Measure the depth you are adding",
        "paragraphs": [
          "Measure the surface area and the additional soil depth, not the total depth of existing soil. Split sloped or uneven areas into zones when they require different amounts. For raised beds, use inside dimensions and deduct the volume already occupied by material you will retain.",
          "One cubic yard is 27 cubic feet. For example, one cubic yard spread 2 inches deep covers 162 square feet. Oregon State Extension uses that relationship in its raised-bed guidance; it is a volume conversion, not a universal recommendation for soil depth."
        ]
      },
      {
        "id": "section-2",
        "title": "Compare bulk soil and bagged products",
        "paragraphs": [
          "The example’s adjusted volume is 55 cu ft. Dividing by 0.75 cu ft per bag gives 73.33 bags, so a whole-bag purchase requires 74. Those bags contain 55.5 cu ft in total, slightly more than the target.",
          "For bulk delivery, ask about the seller’s measurement and minimum order. Read the bag’s stated volume rather than assuming a 40-pound bag always contains the same cubic feet. Moisture and product composition can change weight."
        ]
      },
      {
        "id": "section-3",
        "title": "Allow for settling without assuming a universal percentage",
        "paragraphs": [
          "The 10% allowance is used to demonstrate the math. Confirm how the selected product behaves when spread and settled. Deliberate heavy compaction, normal settling and an allowance for uneven ground are different issues and should not be combined blindly.",
          "Inspect the product description and ask about texture, organic content, debris and suitability for the planting area. Topsoil, compost and potting mix are not interchangeable simply because they are sold by volume."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "Bags versus bulk: include the delivery charge",
        "paragraphs": [
          "The example needs 55 cubic feet after its allowance. At 0.75 cubic foot per bag, 74 bags provide 55.5 cubic feet. If each bag costs an illustrative $4, the bagged subtotal is $296. At an illustrative $40 per cubic yard, the unrounded bulk quantity costs about $81.48 before delivery or minimum-order rounding.",
          "With those assumptions, about $214.52 separates the material subtotals. A delivery charge above that difference could reverse the price comparison. Ask about the supplier's minimum quantity and selling increment before relying on the bulk subtotal; you may have to pay for more than 2.03704 cubic yards.",
          "Price alone won't tell you whether two soils are interchangeable. Ask what the product contains and whether it suits the intended use. Also plan where the load can be dropped and how it will reach the bed or lawn. Those details can matter more than a small difference in price per yard."
        ]
      },
      {
        "id": "section-4",
        "title": "Use the Topsoil Calculator and compare costs",
        "paragraphs": [
          "Enter 10 ft length, 20 ft width and 3 inches depth. Choose the example 10% allowance and 0.75-cu-ft bag size. The calculator should report about 2.04 cubic yards and 74 bags; weight depends on the density you choose.",
          "At an illustrative $40 per cubic yard, the target volume costs $81.48 before delivery and tax. The Topsoil Calculator focuses on quantities, so calculate this price separately. Using the same illustrative $4 per bag as the comparison above, 74 bags cost $296. Keep the bag price consistent when comparing that option with bulk delivery. Compare the actual delivered totals and product quality, not just these hypothetical material prices."
        ]
      }
    ],
    "mistakes": [
      "Using total soil depth instead of added depth.",
      "Treating a bag’s pounds as cubic feet.",
      "Forgetting inside bed dimensions.",
      "Assuming topsoil and compost are the same product."
    ],
    "faqs": [
      {
        "question": "How much soil covers 200 square feet at 3 inches?",
        "answer": "It takes 50 cubic feet, or about 1.85 cubic yards, before any allowance."
      },
      {
        "question": "How many 0.75-cu-ft bags equal a cubic yard?",
        "answer": "Twenty-seven divided by 0.75 equals 36 bags."
      },
      {
        "question": "Is a cubic yard always the same weight?",
        "answer": "No. Moisture and composition change soil weight; use the supplier’s density when estimating tons."
      },
      {
        "question": "Should I add extra for settling?",
        "answer": "Ask about the selected product and installation. The 10% in this example is not a universal rule."
      },
      {
        "question": "Can I use this for raised beds?",
        "answer": "Yes, for volume. Use inside dimensions and choose a suitable growing medium separately."
      },
      {
        "question": "Does the calculator include delivery pricing?",
        "answer": "No. Obtain material and delivery quotes from the supplier."
      }
    ],
    "sources": [
      {
        "label": "Oregon State Extension: raised bed gardening",
        "href": "https://extension.oregonstate.edu/catalog/fs-270-raised-bed-gardening"
      }
    ],
    "image": "/cornerspan-topsoil-calculator-hero-optimized.webp",
    "related": [
      "/blog/sod-turf-calculation-guide",
      "/blog/gravel-calculation-guide"
    ]
  },
  {
    "slug": "fence-calculation-guide",
    "title": "How Many Fence Posts for 100 Feet? Spacing & Gates",
    "description": "Count fence posts for a straight 100-foot run at 6- or 8-foot spacing. See section rounding, gate and corner adjustments, and a worked picket estimate.",
    "category": "Fencing",
    "tags": [
      "fence",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/fence",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-28",
    "intro": [
      "A single straight 100-foot fence run with no gates needs 14 posts when the maximum spacing is 8 feet: round 100 ÷ 8 up to 13 sections, then add one end post.",
      "Sketch the fence before counting posts. A straight run, a closed loop and a run interrupted by a gate can have the same total length and need different posts. Mark each endpoint and corner so a shared post isn't counted twice.",
      "The worked example below is one straight, open-ended, 100-foot run with no gates. An 8-foot maximum spacing is an arithmetic assumption, not a specification for every fence system. Confirm the selected system’s requirements and local project constraints before construction."
    ],
    "formula": "For one straight open run: sections = round up [run length ÷ maximum spacing]; posts = sections + 1",
    "example": [
      [
        "Run",
        "100 ft, no gates",
        "100 ft"
      ],
      [
        "Sections",
        "Round up 100 ÷ 8",
        "13 sections"
      ],
      [
        "Posts",
        "13 + 1",
        "14 posts"
      ],
      [
        "Picket module",
        "5.5 in board + 0.5 in gap",
        "6 in"
      ],
      [
        "Base pickets",
        "1,200 in ÷ 6 in",
        "200 pickets"
      ],
      [
        "Example 10% picket allowance",
        "200 × 1.10",
        "220 pickets"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Compare 6-foot and 8-foot post spacing",
        "paragraphs": [
          "At a maximum spacing of 6 feet, a straight 100-foot run needs 17 sections and 18 posts. At 8 feet, a 200-foot run needs 25 sections and 26 posts. These counts assume an open-ended straight run. Draw corners, gates and separate runs before counting unique posts; closed loops and fixed-length panels need different treatment."
        ]
      },
      {
        "id": "section-1",
        "title": "Draw the layout before counting posts",
        "paragraphs": [
          "For the straight-run example, thirteen sections keep the average spacing below 8 feet. You may choose a different arrangement to fit prefabricated panels, terrain or a required gate location. Panel dimensions can determine post spacing rather than the other way around.",
          "A closed loop does not have the same endpoint count as an open run. Two runs meeting at a corner may share a post, while a gate creates its own support requirements. List each run and identify shared posts so they are neither omitted nor counted twice."
        ]
      },
      {
        "id": "section-2",
        "title": "Estimate pickets using width plus gap",
        "paragraphs": [
          "Convert the run to inches before dividing by the picket module. Here, 100 ft becomes 1,200 inches. A 5.5-inch board with a 0.5-inch gap uses a 6-inch repeating module, giving an approximate 200-board base count.",
          "This is an area-layout estimate. The exact first and last gaps, board orientation, trim and panel framing can change the count. For privacy, overlapping or shadowbox layouts, use the appropriate construction detail rather than treating them as a single row of spaced boards."
        ]
      },
      {
        "id": "section-3",
        "title": "Keep post concrete and rails separate",
        "paragraphs": [
          "Rail quantity depends on the number of rails per section and whether stock lengths can be used efficiently. Hole diameter and depth determine post-concrete volume. Use the required footing dimensions and the selected concrete bag’s published yield; do not choose foundation depth from this material estimate.",
          "QUIKRETE provides product-specific post-setting guidance. Follow the instructions for the product actually purchased. Before digging, arrange utility locating and confirm property boundaries, gate clearances and applicable project requirements."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "A 100-foot fence with a 4-foot gate",
        "paragraphs": [
          "Suppose a 4-foot gate divides a 100-foot layout into two 48-foot fence runs. At a maximum spacing of 8 feet, each run has six sections and seven posts. The two runs therefore have 14 posts in total, including the two posts bordering the gate. The gate itself is separate from the 12 fence sections.",
          "The count happens to match the no-gate example, but the purchase list doesn't: gate posts may have different requirements, the gate needs hardware, and only 96 feet need fence infill. If the opening moves, recalculate each run because section rounding can change the count.",
          "The Fence Calculator's wood and panel model returns 15 posts for these inputs: ceil(96 / 8) + 1 base posts + 2 additional gate posts. It does not ask where the gate sits or identify shared posts. The 14-post worked layout above counts the gate posts as the ends of the two fence runs. Use the calculator as an initial allowance, then count each actual run and shared post before ordering; its total is not an exact layout takeoff.",
          "For fixed-width panels, confirm how the manufacturer measures panel length and post spacing. Don't treat an 8-foot nominal panel as a promise that every post center can be exactly 8 feet apart. Use the layout and system dimensions to produce the final post schedule."
        ]
      },
      {
        "id": "section-4",
        "title": "Build a purchase list with the Fence Calculator",
        "paragraphs": [
          "Enter run length, height, spacing and the chosen fence mode. Add gates only when they are part of the layout, then review the post, rail, picket, concrete and optional paint quantities separately. Inspect the assumptions behind each result rather than treating every number as an exact shop drawing.",
          "As a partial budget, fourteen posts at an illustrative $25 each cost $350, and 220 pickets at $3 each cost $660: $1,010 for those two items. Rails, hardware, concrete, gates, delivery, tax and labor are still missing. Use actual purchase quantities and prices for a complete estimate."
        ]
      }
    ],
    "mistakes": [
      "Using the open-run post formula for a closed loop.",
      "Subtracting gate width without adding gate posts.",
      "Ignoring the gap between pickets.",
      "Assuming a partial materials subtotal is the full fence cost."
    ],
    "faqs": [
      {
        "question": "How many posts are needed for 100 feet?",
        "answer": "For one straight open run with maximum 8-foot spacing and no gates, the example needs thirteen sections and fourteen posts."
      },
      {
        "question": "Does a corner need two posts?",
        "answer": "Not necessarily. The layout and fence system determine whether the corner post is shared."
      },
      {
        "question": "How do I count pickets?",
        "answer": "Use the actual board width plus the intended gap as the repeating module, then allow for the end layout and waste."
      },
      {
        "question": "Are gate posts included automatically?",
        "answer": "Only when the gate inputs and layout assumptions represent your design. Check gate supports separately."
      },
      {
        "question": "Does the calculator choose hole depth?",
        "answer": "No. Enter the depth required for the project and local conditions."
      },
      {
        "question": "Can I estimate chain-link fence?",
        "answer": "Use the chain-link mode and its roll, terminal-post and top-rail inputs instead of a wood-picket formula."
      }
    ],
    "sources": [
      {
        "label": "QUIKRETE post-setting instructions",
        "href": "https://www.quikrete.com/athome/settingposts.asp"
      }
    ],
    "image": "/cornerspan-fence-calculator-hero.webp",
    "related": [
      "/blog/brick-calculation-guide",
      "/blog/area-calculation-guide"
    ]
  },
  {
    "slug": "roofing-calculation-guide",
    "title": "How Many Shingle Bundles for a 20x30 Roof?",
    "description": "Estimate shingle bundles from a 20x30 roof footprint, pitch and waste. Compare 3:12 and 6:12 slopes, roofing squares and product-specific bundle coverage.",
    "category": "Roofing",
    "tags": [
      "roofing",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/roofing",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "A 20x30 horizontal roof footprint at a uniform 6:12 pitch needs 23 shingle bundles when you allow 10% waste and each bundle covers 33.3 square feet. This excludes separate starter and ridge-cap products.",
      "A floor plan gives you a starting point, not the finished roof surface. The pitch adds area, and overhangs can make the roof footprint larger than the building below it. Check what your measurements include before calculating bundles.",
      "This article uses a simple uniform-pitch roof with a 20-by-30-foot footprint. It does not model valleys, dormers or multiple pitches. Use drawings or professional measurements where direct access would be unsafe."
    ],
    "formula": "Roof area = horizontal footprint × √[1 + (pitch rise ÷ 12)²]; roofing squares = area ÷ 100",
    "example": [
      [
        "Horizontal footprint",
        "20 ft × 30 ft",
        "600 sq ft"
      ],
      [
        "6:12 pitch multiplier",
        "√(1 + (6/12)²)",
        "1.118034"
      ],
      [
        "Sloped surface",
        "600 × 1.118034",
        "670.82 sq ft"
      ],
      [
        "Example 10% allowance",
        "670.82 × 1.10",
        "737.90 sq ft"
      ],
      [
        "Roofing squares",
        "737.90 ÷ 100",
        "7.379 squares"
      ],
      [
        "At 33.3 sq ft/bundle",
        "Round up 737.90 ÷ 33.3",
        "23 bundles"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Compare 3:12 and 6:12 roof pitches",
        "paragraphs": [
          "At 3:12 pitch, a 600-square-foot horizontal footprint gives about 618.47 square feet of sloped surface. With 10% extra, that becomes 680.31 square feet, requiring 21 bundles at 33.3 square feet each. At 6:12 pitch, the adjusted area is about 737.90 square feet and requires 23 bundles. Include overhangs in the horizontal roof measurements and estimate complex roof planes separately."
        ]
      },
      {
        "id": "section-1",
        "title": "Understand the footprint and pitch",
        "paragraphs": [
          "The footprint is the horizontal projection of the roof area being measured. Include relevant eaves and overhangs in those dimensions. Do not use interior room dimensions when they omit parts of the roof.",
          "A 6:12 pitch rises 6 inches for every 12 inches of horizontal run. The multiplier converts horizontal area to sloped area for a uniform pitch. If you already measured the actual sloped surface, do not apply the multiplier again."
        ]
      },
      {
        "id": "section-2",
        "title": "Convert squares to the product’s bundle coverage",
        "paragraphs": [
          "One roofing square is 100 square feet. Bundle coverage varies by shingle product, so the example uses an explicit 33.3 sq ft per bundle rather than assuming every product takes exactly three bundles per square. GAF’s bundle guidance explains the distinction between squares and packaging.",
          "For 737.90 adjusted square feet, divide by the selected bundle coverage and round up. Starter, hip and ridge shingles may be separate products with different coverage units. Do not assume the field-shingle bundle count includes those accessories."
        ]
      },
      {
        "id": "section-3",
        "title": "Use a project-specific allowance",
        "paragraphs": [
          "The example’s 10% allowance demonstrates the calculation. Roof geometry, layout, cuts and the product’s installation pattern affect the allowance needed. Separate areas with different pitches before adding their adjusted quantities.",
          "A simple rectangle calculator cannot fully describe a complex roof from one pair of dimensions. Compare the estimate with the roof plan and contractor’s takeoff. Valleys, penetrations and changes in roof shape need explicit attention."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "Does your 20x30 measurement include the overhangs?",
        "paragraphs": [
          "If 20x30 feet describes the building and the roof projects 1 foot beyond every side, the horizontal roof footprint becomes 22x32 feet, or 704 square feet. At a uniform 6:12 pitch, that gives about 787.10 square feet of sloped surface before waste.",
          "With a 10% allowance, the adjusted surface is about 865.81 square feet. At the example's 33.3 square feet per bundle, round up to 27 bundles. That's four more than the 23-bundle example without those added overhangs. Don't add the overhang a second time if your original measurements already extend to the roof edges.",
          "Ask the supplier to list field shingles, starter strips and ridge-cap products separately. Check bundle coverage for the exact shingle, then confirm the roof's valleys, dormers and changes in pitch have been measured. Use plans or a qualified measurement service when measuring the roof directly would be unsafe."
        ]
      },
      {
        "id": "section-4",
        "title": "Check the pricing basis in the Roofing Calculator",
        "paragraphs": [
          "Enter 20 ft by 30 ft, 6:12 pitch, 10% waste and 33.3 sq ft bundle coverage. The calculator should show about 7.38 roofing squares and 23 bundles. Its optional price-per-square calculation rounds the square quantity up to a whole square before pricing.",
          "At an illustrative $150 per square, eight rounded squares produce a $1,200 material estimate. A separate quote of $50 per bundle would instead make 23 bundles cost $1,150. These are different pricing assumptions, not a contradiction. Underlayment, flashing, ventilation, tear-off, disposal, labor and tax remain separate."
        ]
      }
    ],
    "mistakes": [
      "Applying pitch to area that is already measured on the slope.",
      "Ignoring overhangs.",
      "Assuming all bundles have identical coverage.",
      "Treating the field-shingle estimate as a complete roof-system price."
    ],
    "faqs": [
      {
        "question": "What is a roofing square?",
        "answer": "It is 100 square feet of roof surface."
      },
      {
        "question": "How many bundles are in a square?",
        "answer": "Use the selected product’s stated coverage; there is no single bundle count that fits every shingle."
      },
      {
        "question": "Does a 600-square-foot footprint need six squares?",
        "answer": "Only if the relevant roof surface were flat and no allowance applied. Pitch increases sloped surface area."
      },
      {
        "question": "Why is my cost based on eight squares?",
        "answer": "The example calculator pricing rounds 7.379 squares up to eight whole squares before applying a per-square price."
      },
      {
        "question": "Can this model a complex roof?",
        "answer": "Calculate separate roof sections or use a detailed takeoff. One rectangle and pitch cannot represent every feature."
      },
      {
        "question": "Are ridge caps included?",
        "answer": "Not necessarily. Estimate accessory products using their own coverage and installation requirements."
      }
    ],
    "sources": [
      {
        "label": "GAF: shingle bundles and roofing squares",
        "href": "https://www.gaf.com/en-us/blog/your-home/how-many-bundles-of-shingles-are-in-a-square---63a47862-f7e1-4e73-abcf-8d09917a8b8d"
      }
    ],
    "image": "/roofing-calculator-hero.webp",
    "related": [
      "/blog/area-calculation-guide",
      "/blog/asphalt-calculation-guide"
    ]
  },
  {
    "slug": "sod-turf-calculation-guide",
    "title": "How Much Sod for 200 Square Feet? Rolls & Pallets",
    "description": "Estimate sod for 200 square feet using roll coverage and a cutting allowance. Compare a 500-square-foot lawn, whole pallets and the actual purchase cost.",
    "category": "Landscaping",
    "tags": [
      "sod-turf",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/sod-turf",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "For a 200-square-foot lawn, a 10% cutting allowance gives 220 square feet of sod. If each piece or roll covers 10 square feet, buy 22 pieces; actual roll and pallet coverage varies by supplier.",
      "The awkward part of a sod order is often the packaging. Your lawn might need 220 square feet while the supplier sells 500-square-foot pallets. Ask about individual rolls and partial pallets before treating the calculator's area cost as the checkout price.",
      "The dimensions of a sod piece and the coverage of a pallet vary by supplier. This example assumes 10 sq ft per piece and 500 sq ft per pallet so that every conversion is explicit. Confirm your supplier’s figures before ordering."
    ],
    "formula": "Order area = lawn area × (1 + allowance % ÷ 100); units = round up [order area ÷ coverage per unit]",
    "example": [
      [
        "Lawn",
        "10 ft × 20 ft",
        "200 sq ft"
      ],
      [
        "Example 10% cutting allowance",
        "200 × 1.10",
        "220 sq ft"
      ],
      [
        "Pieces covering 10 sq ft",
        "220 ÷ 10",
        "22 pieces"
      ],
      [
        "Full pallets covering 500 sq ft",
        "Round up 220 ÷ 500",
        "1 pallet"
      ],
      [
        "At illustrative $0.80/sq ft",
        "220 × $0.80",
        "$176"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Compare 200- and 500-square-foot lawns",
        "paragraphs": [
          "A 500-square-foot lawn with 10% extra needs 550 square feet, or 55 pieces covering 10 square feet each. If the seller offers only complete 500-square-foot pallets, that means two pallets rather than one. Ask whether partial pallets are available, and price the quantity you actually buy."
        ]
      },
      {
        "id": "section-1",
        "title": "Measure only the area to receive sod",
        "paragraphs": [
          "Divide the lawn into rectangles, triangles or other manageable shapes. Add those areas, then subtract patios, paths, planting beds and other surfaces that will not receive sod. For a curved edge, take multiple measurements rather than guessing one average dimension.",
          "Keep a small sketch with the section measurements. It helps avoid overlaps when you combine several areas and lets the supplier or installer review the assumptions. A measured 200 sq ft lawn is distinct from the 220 sq ft example order allowance."
        ]
      },
      {
        "id": "section-2",
        "title": "Choose the purchase unit before pricing",
        "paragraphs": [
          "Twenty-two 10-sq-ft pieces cover the adjusted example exactly. If the seller requires complete 500-sq-ft pallets, one pallet provides much more than the 220-sq-ft target. Ask whether partial pallets or individual pieces are available.",
          "Do not price 220 sq ft at a piece rate or one pallet at an area rate. Select the same unit used in the supplier’s quote. The Sod and Turf Calculator supports area, piece and pallet pricing; pallet pricing requires the actual coverage per pallet."
        ]
      },
      {
        "id": "section-3",
        "title": "Plan handling and installation with the order",
        "paragraphs": [
          "The 10% allowance is illustrative. Tight curves, islands and narrow strips can create more cutting loss than a simple rectangle. Discuss the layout with the installer before deciding on extra coverage.",
          "University of Minnesota Extension advises laying sod promptly after delivery. Schedule preparation and installation so fresh material is not left waiting while the site is still being graded. Follow local and supplier guidance for the selected grass and establishment conditions."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "The difference between needed area and paid-for area",
        "paragraphs": [
          "For the example's 220-square-foot requirement, a supplier charging an illustrative $0.80 per square foot for individual pieces would charge $176 before delivery. If the only available purchase is a full 500-square-foot pallet at the same rate, the material charge becomes $400. The required lawn coverage hasn't changed; the selling unit has.",
          "For a 500-square-foot lawn needing 550 square feet after its allowance, compare one full pallet plus 50 square feet of loose pieces with two full pallets. Ask whether the loose pieces are the same product and whether their per-square-foot price differs. Keep the supplier's actual roll coverage beside the count.",
          "Measure beds, paths and permanent features before ordering. Then arrange delivery around site readiness and the supplier's handling instructions. The estimate tells you how much surface to cover; it doesn't decide which grass suits your location or replace the product's installation guidance."
        ]
      },
      {
        "id": "section-4",
        "title": "Use the Sod and Turf Calculator",
        "paragraphs": [
          "Enter length 10 ft, width 20 ft, coverage 10 sq ft per piece and 10% waste. The result should be 22 pieces for 220 sq ft. If investigating pallet pricing, enter 500 sq ft per pallet to see the full-pallet count.",
          "At an illustrative $0.80 per square foot, the target coverage costs $176. That does not mean a full pallet will be sold for $176. Enter an actual pallet price when buying by pallet, and add delivery, preparation, installation and taxes separately."
        ]
      }
    ],
    "mistakes": [
      "Assuming every roll covers the same area.",
      "Charging only for target coverage when full pallets must be bought.",
      "Counting beds or paths as lawn.",
      "Ordering before the site is ready for installation."
    ],
    "faqs": [
      {
        "question": "How many pieces cover 200 square feet?",
        "answer": "At 10 sq ft per piece, the base count is 20. With the example 10% allowance, it is 22 pieces."
      },
      {
        "question": "How many square feet are on a pallet?",
        "answer": "Ask the supplier. The 500-sq-ft figure here is an example, not a universal pallet size."
      },
      {
        "question": "Is sod sold by weight?",
        "answer": "Use the supplier’s sales unit. This calculator estimates area, pieces and pallets rather than transport weight."
      },
      {
        "question": "Should I subtract flower beds?",
        "answer": "Yes, when those areas will not receive sod."
      },
      {
        "question": "Can I price a partial pallet?",
        "answer": "Only if the supplier offers it. Otherwise use the whole-pallet count and price."
      },
      {
        "question": "Does the estimate select the grass variety?",
        "answer": "No. Match the grass to the site and local growing conditions separately."
      }
    ],
    "sources": [
      {
        "label": "University of Minnesota Extension: seeding and sodding lawns",
        "href": "https://extension.umn.edu/garden-and-home/yard-and-garden/lawns-and-landscapes-in-minnesota/seeding-and-sodding-home-lawns"
      }
    ],
    "image": "/cornerspan-sod-turf-calculator-hero.webp",
    "related": [
      "/blog/topsoil-calculation-guide",
      "/blog/area-calculation-guide"
    ]
  },
  {
    "slug": "steel-calculation-guide",
    "title": "How Much Do 10-Foot 12 mm Steel Bars Weigh?",
    "description": "Calculate the weight of 10-foot 12 mm solid steel bars in pounds and kilograms. Compare 10 or 20 bars, US #4 rebar and a clearly stated price assumption.",
    "category": "Steel",
    "tags": [
      "steel",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/steel",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-27",
    "intro": [
      "Using the approximate diameter-squared formula, one 10-foot 12 mm solid steel bar weighs about 5.97 pounds. Ten weigh about 59.73 pounds; this estimate does not make 12 mm bar equivalent to US #4 rebar.",
      "Start with the bar designation on your material list. A metric diameter and a US rebar number aren't interchangeable just because they look close. Once the specified product is clear, you can compare its nominal weight with a supplier's quote.",
      "CornerSpan’s calculator currently uses metric diameter buttons with feet or meters for length. It is a solid-round-bar approximation, not a US bar-number selector. For standard US rebar takeoffs, use published nominal weights per foot instead of substituting the nearest metric button."
    ],
    "formula": "Approximate weight (kg) = diameter² (mm) × length (m) × quantity ÷ 162; pounds = kilograms × 2.20462",
    "example": [
      [
        "Length per bar",
        "10 ft × 0.3048",
        "3.048 m"
      ],
      [
        "Ten 12 mm bars",
        "12² × 3.048 × 10 ÷ 162",
        "27.09333 kg"
      ],
      [
        "Convert to pounds",
        "27.09333 × 2.20462",
        "59.73 lb"
      ],
      [
        "At illustrative $1/lb",
        "Unrounded pounds × $1",
        "$59.73"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Compare one, ten and twenty 10-foot bars",
        "paragraphs": [
          "Using d² × length in meters ÷ 162, one 12 mm bar at 10 feet weighs about 2.709 kilograms or 5.973 pounds. Ten weigh about 59.73 pounds and twenty about 119.46 pounds. US #4 rebar at a nominal 0.668 pound per foot weighs 6.68 pounds per 10-foot piece. Use the specified US bar designation and supplier weight when ordering."
        ]
      },
      {
        "id": "section-1",
        "title": "Collect the diameter, cut length and quantity",
        "paragraphs": [
          "List each diameter and cut length as a separate line. Ten identical straight bars can share one calculation, but different lengths should not be combined under an average unless the total length is preserved accurately. Use scheduled cut lengths when a fabrication schedule is available.",
          "The diameter-squared shortcut estimates solid round steel. It does not calculate pipe, tubing, angle or plate correctly. Those shapes need the appropriate cross-sectional area or a manufacturer’s unit-weight table."
        ]
      },
      {
        "id": "section-2",
        "title": "Understand metric diameters versus US rebar sizes",
        "paragraphs": [
          "The calculator’s 12 mm option is not US #4 rebar. A #4 bar has a nominal half-inch diameter and a published nominal weight of 0.668 lb/ft. Ten 10-foot #4 bars therefore have a nominal total weight of 66.8 lb, rather than the 59.73 lb metric-diameter example.",
          "That difference reflects different inputs, not a pounds conversion error. Use the US Rebar Weight Guide for a chart and length-based takeoff. Do not choose a bar diameter or reinforcement spacing from a weight calculator; those belong in the project design."
        ]
      },
      {
        "id": "section-3",
        "title": "Add only the allowance you actually need",
        "paragraphs": [
          "For a separate 5% allowance, multiply the unrounded 59.7316 lb estimate by 1.05 to obtain about 62.72 lb. Five percent is an example, not a default requirement. Check the cutting plan, packaging and supplier’s minimum quantities.",
          "A scheduled cut length may already include hooks or laps. Adding a second percentage for those details would overstate the requirement. If the purchase must be whole stock bars, convert the target back to pieces and price the actual order."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "A weight estimate is not a cutting schedule",
        "paragraphs": [
          "Ten pieces at 10 feet each require 100 feet of finished bar. In a simplified example, five 20-foot stock bars could supply that length if cutting allowances are ignored. Whether that layout works in practice depends on the required finished lengths, cutting method, bends and usable stock length.",
          "Keep a separate cutting list with each diameter or bar designation, finished length and piece count. Don't use a blanket waste percentage to stand in for lap lengths or bend details that should already appear on an approved schedule. Confirm the purchased lengths and any fabrication charges with the supplier.",
          "When comparing prices, check whether the quote is per piece, per pound or per ton. For standard US rebar, use the nominal weight for that bar designation to convert between those bases. The calculator's metric solid-bar approximation is useful for its stated inputs, but it should not silently replace the specified US product."
        ]
      },
      {
        "id": "section-4",
        "title": "Use USD-per-pound pricing consistently",
        "paragraphs": [
          "Choose 12 mm diameter, 10 feet length, quantity ten and no waste to reproduce the base example in the Steel Calculator. Enter $1 per pound to obtain the illustrative $59.73 material cost. Metric weight details may also appear, but the price field is USD per pound.",
          "At a 5% allowance, the same unit price gives about $62.72 before supplier rounding. Delivery, cutting, bending, coating, tax and labor are not automatically included. If the quote is per kilogram, convert the rate before using a per-pound price field: dollars per pound equals dollars per kilogram divided by 2.20462."
        ]
      }
    ],
    "mistakes": [
      "Treating a metric diameter as a US bar number.",
      "Using feet in a formula that requires meters.",
      "Applying a kilogram price to pounds.",
      "Counting laps or hooks twice."
    ],
    "faqs": [
      {
        "question": "How much do ten 10-foot 12 mm bars weigh?",
        "answer": "The diameter-squared approximation gives about 27.09 kg or 59.73 lb before an allowance."
      },
      {
        "question": "Is 12 mm the same as #4 rebar?",
        "answer": "No. US #4 has a nominal 12.7 mm diameter; use its published unit weight for a US rebar takeoff."
      },
      {
        "question": "What units does the price field use?",
        "answer": "USD per pound. Convert a per-kilogram quote before entering it."
      },
      {
        "question": "Is the result an exact delivered weight?",
        "answer": "No. It is an estimate. Product tolerances, actual lengths and the supplier’s weight basis can affect the invoice."
      },
      {
        "question": "Can I use this for hollow pipe?",
        "answer": "No. Hollow sections require their actual section geometry or published weight per foot."
      },
      {
        "question": "Should I add waste to every bar schedule?",
        "answer": "Only for a defined need. Check whether the schedule and cutting plan already include the material you intend to allow for."
      }
    ],
    "sources": [
      {
        "label": "Caltrans nominal reinforcing-bar data (PDF)",
        "href": "https://dot.ca.gov/-/media/dot-media/programs/engineering/documents/bridgedesigndetails/chapter-12/202509bdd131reinforcement-a11y.pdf"
      },
      {
        "label": "CRSI bar identification",
        "href": "https://www.crsi.org/reinforcing-basics/reinforcing-steel/bar-identification/"
      }
    ],
    "image": "/images/guides/steel-12mm-10ft-weight.svg",
    "related": [
      "/blog/brick-calculation-guide",
      "/blog/area-calculation-guide"
    ],
    "imageAlt": "Ten 10-foot 12 mm solid steel bars weigh approximately 27.09 kilograms or 59.73 pounds before an allowance.",
    "imageCaption": "The diagram uses the same ten 10-foot, 12 mm bars as the worked example. It is a solid round-bar approximation, not a US #4 rebar takeoff."
  },
  {
    "slug": "brick-calculation-guide",
    "title": "How Many Bricks for a 12x8 Wall With a Window?",
    "description": "Estimate bricks for a 12x8 wall with a 3x4 window using brick face size and mortar joints. See a 5% allowance, a solid-wall comparison and material cost.",
    "category": "Brick",
    "tags": [
      "brick",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/brick",
    "publishedAt": "2026-08-25",
    "modifiedAt": "2026-10-26",
    "intro": [
      "A 12x8 wall with a 3x4 window needs 605 bricks with a 5% allowance when each brick-and-joint face module is 21 square inches. The net wall area is 84 square feet and the base count is 576 bricks.",
      "The window opening saves bricks, but mortar joints affect the count too. Use the brick's visible face dimensions together with the intended joint width. Dividing by the bare brick face alone makes the estimate look larger than the installed wall requires.",
      "The worked example is a 12-by-8-foot wall with a 3-by-4-foot window. It uses a stated US modular brick face and a 3/8-inch joint. Confirm the selected manufacturer’s dimensions and coverage instead of assuming every product with the same name is identical."
    ],
    "formula": "Bricks = round up [net wall area (sq ft) × 144 ÷ ((brick length + joint) × (brick height + joint)) × allowance factor]",
    "example": [
      [
        "Gross wall",
        "12 ft × 8 ft",
        "96 sq ft"
      ],
      [
        "Window",
        "3 ft × 4 ft",
        "12 sq ft"
      ],
      [
        "Net area",
        "96 − 12",
        "84 sq ft"
      ],
      [
        "Face module",
        "(7.625 + 0.375) × (2.25 + 0.375)",
        "21 sq in"
      ],
      [
        "Base bricks",
        "84 × 144 ÷ 21",
        "576 bricks"
      ],
      [
        "Example 5% allowance",
        "Round up 576 × 1.05",
        "605 bricks"
      ],
      [
        "At illustrative $0.80/brick",
        "605 × $0.80",
        "$484"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Compare a solid wall with a window opening",
        "paragraphs": [
          "Without the 3x4-foot window, the same 12x8 wall has 96 square feet of face area. At 21 square inches per module, the raw count is about 658.29 bricks. Apply 5% before rounding up to 692 bricks. The calculation estimates one wall face; it does not include additional wythes, special corner units or a structural design."
        ]
      },
      {
        "id": "section-1",
        "title": "Measure the wall and its openings",
        "paragraphs": [
          "Measure each wall face and deduct the windows or doors that will not be filled with brick. Add returns and separate wall sections only when they are actually part of the brickwork. Keep a sketch so you do not deduct an opening twice.",
          "The example’s 84 sq ft is net wall area. It is not the building’s floor area and does not include a second brick layer. If the design uses multiple wythes or a different bond, use the appropriate detail rather than multiplying every wall by an arbitrary thickness factor."
        ]
      },
      {
        "id": "section-2",
        "title": "Include mortar joints in the repeating face module",
        "paragraphs": [
          "The stated face is 7 5/8 inches long by 2 1/4 inches high. Adding 3/8 inch in each direction gives an 8 by 2 5/8 inch estimating module, or 21 square inches. Dividing 144 by 21 gives about 6.86 bricks per square foot.",
          "This direct geometric module is not a substitute for a manufacturer’s nominal coursing layout. The Brick Industry Association and manufacturer dimension tables distinguish unit measurements and coordinated masonry dimensions. Use the product’s published coverage when it is available for your layout."
        ]
      },
      {
        "id": "section-3",
        "title": "Apply waste before final whole-brick rounding",
        "paragraphs": [
          "The base count here is exactly 576. With an illustrative 5% allowance, the result is 604.8, so buy at least 605 individual bricks before packaging constraints. Do not round an intermediate bricks-per-square-foot value to a whole number.",
          "Cuts, corners, breakage and special shapes require consideration beyond a simple area factor. Ask the mason which allowance and special units are needed. If the supplier sells only complete packs, round the adjusted requirement to that pack size and budget for the actual purchase."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "What happens if you leave mortar joints out?",
        "paragraphs": [
          "The example brick face measures 7.625 by 2.25 inches, or 17.15625 square inches. Dividing the 84-square-foot net wall by that bare face area gives about 705.05 bricks. With 5% extra and final rounding, the result would be 741 bricks.",
          "Including the stated 3/8-inch joints gives a 21-square-inch module and an adjusted count of 605 bricks. That's 136 fewer bricks in this simplified comparison. Neither number accounts for special shapes or multiple layers; the point is to use installed coverage rather than the bare face area.",
          "Before ordering, separate standard face bricks from corners, returns, sills and other special units shown in the design. Ask whether the supplier sells complete packs and whether its published coverage already assumes a mortar joint. Keep mortar and delivery as separate costs so the brick-only subtotal isn't mistaken for the finished wall price."
        ]
      },
      {
        "id": "section-4",
        "title": "Use the Brick Calculator and build the budget",
        "paragraphs": [
          "Enter the wall and window dimensions, select one brick layer and choose the US modular preset. Confirm brick dimensions and a 3/8-inch joint, then enter 5% waste and the illustrative $0.80 unit price. Review the result against the example’s 605 bricks and $484 brick-only cost.",
          "Mortar, delivery, tax, equipment, reinforcement and labor are separate. A retaining wall also needs an appropriate engineered system and drainage; ordinary facing-brick quantity math does not establish that the wall can retain soil. Use the detailed Brick Calculation Guide for additional dimension and layout considerations."
        ]
      }
    ],
    "mistakes": [
      "Using gross wall area when large openings should be deducted.",
      "Ignoring mortar joints.",
      "Rounding bricks per square foot before calculating the wall.",
      "Treating a facing-brick count as retaining-wall design."
    ],
    "faqs": [
      {
        "question": "How many bricks cover one square foot?",
        "answer": "For the stated modular face and 3/8-inch joint, the geometric count is about 6.86. Other products and layouts differ."
      },
      {
        "question": "How many bricks does this 12-by-8 wall need?",
        "answer": "After deducting the 3-by-4 window and applying the example 5% allowance, the estimate is 605 bricks."
      },
      {
        "question": "Should I round before adding waste?",
        "answer": "Keep the raw estimate through the allowance step, then round up to whole bricks."
      },
      {
        "question": "Do I use actual or nominal brick dimensions?",
        "answer": "Use the stated unit face dimensions and intended joint for this formula, or the manufacturer’s published installed coverage."
      },
      {
        "question": "Does the price include mortar?",
        "answer": "The $484 example covers bricks only. Add other materials and services separately."
      },
      {
        "question": "Can this formula design a retaining wall?",
        "answer": "No. It estimates material quantity, not structural stability, drainage or reinforcement requirements."
      }
    ],
    "sources": [
      {
        "label": "Brick Industry Association: dimensioning and estimating (PDF)",
        "href": "https://www.gobrick.com/media/file/10-dimensioning-and-estimating-brick-masonry.pdf"
      },
      {
        "label": "Glen-Gery brick sizes and coverage",
        "href": "https://www.glengery.com/brick-sizes"
      }
    ],
    "image": "/brick-calculation-guide.png",
    "related": [
      "/blog/fence-calculation-guide",
      "/blog/area-calculation-guide"
    ]
  },
  {
    "slug": "area-calculation-guide",
    "title": "Area in Square Feet: 8 Shapes, Formulas & Examples",
    "description": "Calculate area in square feet for eight shapes and combined layouts. Follow rectangle, circle and triangle examples, then convert square feet to acres.",
    "category": "Measurements",
    "tags": [
      "area",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/area",
    "exampleLink": {
      "href": "/calculators/area?example=l-shaped#area-mode",
      "label": "Try the 150 sq ft L-shaped example in the calculator"
    },
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-27",
    "intro": [
      "For a rectangle, multiply length by width in feet to get square feet. A 12x15-foot floor is 180 square feet, 20 square yards or about 0.00413 acre. Other shapes need their own formulas and measured dimensions.",
      "Draw the space as you measure it. For an awkward outline, a few labeled rectangles are often easier to check than one complicated calculation. Keep the sketch so you can see which surfaces you've counted and which you've left out.",
      "The Area Calculator supports eight shapes and a quantity multiplier. Its optional Multiple sections mode adds differently sized sections and subtracts openings. This article explains how to select the right dimensions and combine simple sections. It complements the detailed trapezoid article without requiring every project to fit a single rectangle."
    ],
    "formula": "Rectangle: length × width; circle: π × radius²; triangle: base × perpendicular height ÷ 2",
    "example": [
      [
        "Rectangular floor",
        "12 ft × 15 ft",
        "180 sq ft"
      ],
      [
        "Square yards",
        "180 ÷ 9",
        "20 sq yd"
      ],
      [
        "Acres",
        "180 ÷ 43,560",
        "About 0.00413 acre"
      ],
      [
        "Two identical floors",
        "180 × 2",
        "360 sq ft"
      ],
      [
        "Circular bed, 5-ft radius",
        "π × 5²",
        "About 78.54 sq ft"
      ],
      [
        "Triangle, 12-ft base and 8-ft height",
        "12 × 8 ÷ 2",
        "48 sq ft"
      ]
    ],
    "sections": [
      {
        "id": "size-comparison",
        "title": "Calculate an L-shaped area without double counting",
        "paragraphs": [
          "Split an L-shaped floor into non-overlapping rectangles. A 12x10-foot section plus a 6x5-foot section totals 120 + 30 = 150 square feet. If your measured rectangles overlap, subtract the shared area once. For a circle, use the radius rather than the diameter in πr².",
          "In Multiple sections mode, enter the two rectangles as separate Add area sections. To exclude a 2x3-foot opening, add a third rectangle and select Subtract area: 150 − 6 = 144 square feet. The calculator shows both added and removed areas so you can check the deduction."
        ]
      },
      {
        "id": "section-1",
        "title": "Choose the shape and measure the right dimensions",
        "paragraphs": [
          "A rectangle needs length and width; a square needs one side. A circle uses radius, which is half the diameter. For triangles and parallelograms, height means the perpendicular distance to the base, not the length of a sloping side.",
          "A trapezoid uses the two parallel sides and their perpendicular separation: area = (side A + side B) × height ÷ 2. An ellipse uses the two semi-axes, each half its full axis. A circular sector uses radius and central angle in degrees: area = angle ÷ 360 × π × radius²."
        ]
      },
      {
        "id": "section-2",
        "title": "Keep length conversions separate from area conversions",
        "paragraphs": [
          "Convert every input dimension to the same unit before multiplying. Twelve inches equal one foot, but 144 square inches equal one square foot because both dimensions must be converted. Similarly, one square yard equals nine square feet.",
          "For the 12 × 15 ft example, 180 sq ft equals about 0.00413 acre. A small area is not zero acres simply because a display uses too few decimal places. Keep sufficient precision for the conversion and round only the result you need to report."
        ]
      },
      {
        "id": "section-3",
        "title": "Break irregular spaces into sections",
        "paragraphs": [
          "An L-shaped floor can be measured as two non-overlapping rectangles. Calculate each area, add them, and subtract any opening that should not receive material. Keep a labeled sketch to show which dimensions belong to each section.",
          "Do not force a curved or highly irregular boundary into a rectangle without stating the approximation. For property or legal boundary measurements, use the appropriate survey information; a shape calculator is not a boundary survey. Repeated identical sections can use the quantity multiplier. For differently sized sections, choose Multiple sections and enter each part separately; the calculator combines their areas."
        ]
      },
      {
        "id": "ordering-decisions",
        "title": "How much can a small measurement error change the answer?",
        "paragraphs": [
          "A 12x15-foot rectangle is 180 square feet. If both measurements were actually 3 inches longer, the area would be 12.25 × 15.25 = 186.8125 square feet. That's about 6.81 square feet more, or 3.8%. Small differences in two dimensions compound when multiplied.",
          "Write feet and inches explicitly: 12 feet 3 inches is 12.25 feet, not 12.3 feet. Recheck dimensions near recesses or angled walls rather than adding a material allowance to hide uncertain measurements. Waste belongs to the material order; it doesn't correct the measured surface.",
          "For a combined layout, label each section and note whether the shapes overlap. Calculate each once, add the non-overlapping areas, then subtract openings if the material won't cover them. Keep the measured area separate from the later purchase quantity so the same sketch can support flooring, paint or landscaping estimates."
        ]
      },
      {
        "id": "section-4",
        "title": "Move from area to a material estimate",
        "paragraphs": [
          "Enter the rectangle’s 12 ft length and 15 ft width in the Area Calculator to obtain 180 sq ft. Choose quantity two only if both sections have those same dimensions. Change the shape to compare a circular bed or triangular area.",
          "The Area Calculator measures geometry; it does not select product coverage, layer depth or an ordering allowance. Send the area to the relevant paint, tile, paver, sod or bulk-material calculation. For example, a 10% material allowance on 180 sq ft is 198 sq ft, while a 3-inch layer over 180 sq ft is 45 cu ft. These are different operations."
        ]
      }
    ],
    "mistakes": [
      "Entering diameter in a radius field.",
      "Using a sloping side as perpendicular height.",
      "Dividing square inches by 12 instead of 144.",
      "Counting overlapping sections twice."
    ],
    "faqs": [
      {
        "question": "How many acres are 180 square feet?",
        "answer": "Divide by 43,560: approximately 0.00413 acre."
      },
      {
        "question": "Which dimensions does an ellipse need?",
        "answer": "The semi-major and semi-minor axes, each half of the corresponding full axis."
      },
      {
        "question": "How do I measure an L-shaped room?",
        "answer": "Split it into non-overlapping rectangles, calculate each area and add the results."
      },
      {
        "question": "Can I multiply area by the number of rooms?",
        "answer": "Only if the rooms have identical dimensions. Otherwise use Multiple sections, enter each room's dimensions and add their areas."
      },
      {
        "question": "Does area include waste?",
        "answer": "Geometric area does not. Apply an ordering allowance in the material estimate when appropriate."
      },
      {
        "question": "Is square footage the same as volume?",
        "answer": "No. Square footage measures surface area. Multiply by a depth in feet to obtain cubic feet."
      }
    ],
    "sources": [
      {
        "label": "OpenStax: area formulas and worked geometry",
        "href": "https://openstax.org/books/contemporary-mathematics/pages/10-6-area"
      }
    ],
    "image": "/cornerspan-area-calculator-hero.webp",
    "related": [
      "/blog/tile-calculation-guide",
      "/blog/topsoil-calculation-guide"
    ]
  },
  {
    "slug": "concrete-calculation-guide",
    "title": "Concrete for a 20x12 Slab: Cubic Yards & Bag Counts",
    "description": "Calculate concrete for a 20x12 slab. Compare 4- and 6-inch thickness, cubic yards, 60- and 80-lb premix bags, and clearly stated ordering allowances.",
    "category": "Concrete",
    "tags": [
      "concrete",
      "construction",
      "materials"
    ],
    "calculatorHref": "/calculators/concrete",
    "publishedAt": "2026-08-25",
    "modifiedAt": "2026-10-28",
    "intro": [
      "A 20x12-foot slab at 4 inches thick contains 80 cubic feet, or about 2.96 cubic yards, of concrete. An illustrative 5% ordering allowance raises the target to 84 cubic feet, or about 3.11 cubic yards. Those are different quantities: one describes the space, and the other includes extra material.",
      "Start with the dimensions on your plan, then check the actual formwork and depth before ordering. A small depth difference across a large slab can use more concrete than a percentage allowance suggests. This guide keeps the geometric volume, allowance and supplier rounding on separate lines.",
      "The slab thicknesses below are arithmetic examples, not recommendations for a driveway, footing or structural slab. Use the project specification for thickness, reinforcement and concrete requirements. Premixed concrete bags are also different from bags of Portland cement; both appear in estimating discussions but cannot be substituted for each other."
    ],
    "formula": "Rectangular volume (cu ft) = length (ft) × width (ft) × thickness (in) ÷ 12; cubic yards = cubic feet ÷ 27. Combined: cubic yards = length × width × thickness in inches ÷ 324.",
    "example": [
      [
        "Slab footprint",
        "20 ft × 12 ft",
        "240 sq ft"
      ],
      [
        "Thickness conversion",
        "4 in ÷ 12",
        "1/3 ft"
      ],
      [
        "Geometric volume",
        "240 × 4/12",
        "80 cu ft"
      ],
      [
        "Convert to cubic yards",
        "80 ÷ 27",
        "2.96296 cu yd"
      ],
      [
        "Example 5% allowance",
        "80 × 1.05",
        "84 cu ft"
      ],
      [
        "Adjusted yardage",
        "84 ÷ 27",
        "3.11111 cu yd"
      ],
      [
        "80-lb premix at 0.60 cu ft/bag",
        "Round up 84 ÷ 0.60",
        "140 bags"
      ]
    ],
    "sections": [
      {
        "id": "slab-comparison",
        "title": "Compare slab sizes and 4-inch versus 6-inch thickness",
        "paragraphs": [
          "At the same 20x12-foot footprint, changing thickness from 4 to 6 inches increases volume by 50%: 80 cubic feet becomes 120. Before an allowance, that is about 2.96 versus 4.44 cubic yards. A supplier comparing those two quantities is quoting different amounts of concrete.",
          "The table keeps 5% as a stated example so the rows are comparable. Calculate with full precision and round only the displayed yardage; confirm the actual order increment and allowance with the supplier."
        ],
        "table": {
          "caption": "Rectangular slabs: geometric volume and an illustrative 5% allowance. These thicknesses are calculation inputs, not design guidance.",
          "headers": [
            "Footprint",
            "Thickness",
            "Base cu yd",
            "With 5% (cu yd)"
          ],
          "rows": [
            [
              "10 × 10 ft",
              "4 in",
              "1.23",
              "1.30"
            ],
            [
              "12 × 12 ft",
              "4 in",
              "1.78",
              "1.87"
            ],
            [
              "20 × 12 ft",
              "4 in",
              "2.96",
              "3.11"
            ],
            [
              "20 × 12 ft",
              "6 in",
              "4.44",
              "4.67"
            ]
          ]
        }
      },
      {
        "id": "depth-check",
        "title": "Why another half inch can exceed your allowance",
        "paragraphs": [
          "If the actual average depth of the 20x12 slab is 4.5 inches, its volume is 240 × 4.5/12 = 90 cubic feet. That is 10 cubic feet more than the 4-inch estimate, an increase of 12.5%. The example 5% allowance on 80 cubic feet adds only 4 cubic feet, so it would not cover that measured difference.",
          "Take depth measurements at several points. Separate thickened edges, pads and other deeper zones when the design includes them. Where two elements meet, make sure the same concrete is not counted in both volumes. An allowance should follow the measured estimate rather than hide an uncertain depth."
        ]
      },
      {
        "id": "premix-bags",
        "title": "How many 60-lb or 80-lb concrete bags for the slab?",
        "paragraphs": [
          "QUIKRETE lists approximate yields of 0.60 cubic foot for an 80-lb bag and 0.45 cubic foot for a 60-lb bag of its Concrete Mix No. 1101. Check the data sheet for the exact product you buy; bag weight alone does not establish the yield of every mix.",
          "Divide the adjusted 84-cubic-foot target by the stated yield, then round up to whole bags. The 60-lb option needs 187 bags and provides about 84.15 cubic feet at that yield; the 80-lb option needs 140 bags. Consider handling, mixing capacity and placement logistics when comparing a large bag order with delivered concrete."
        ],
        "table": {
          "caption": "Bag counts for the same 84-cu-ft target, already including the example 5% allowance. Yields are for QUIKRETE Concrete Mix No. 1101.",
          "headers": [
            "Bag size",
            "Yield per bag",
            "Division",
            "Whole bags"
          ],
          "rows": [
            [
              "80 lb",
              "0.60 cu ft",
              "84 ÷ 0.60 = 140",
              "140"
            ],
            [
              "60 lb",
              "0.45 cu ft",
              "84 ÷ 0.45 ≈ 186.67",
              "187"
            ]
          ]
        }
      },
      {
        "id": "delivery-and-cost",
        "title": "Compare the purchased quantity and delivered price",
        "paragraphs": [
          "Suppose a ready-mix supplier offers the specified concrete in quarter-yard increments. The 3.11111-cubic-yard target would round up to 3.25 cubic yards. At an invented $150 per cubic yard, the material subtotal is $487.50. The quarter-yard increment and price are examples; ask the supplier what applies to your order.",
          "For comparison, 140 premix bags at an invented $6 each cost $840 before tax and handling. That arithmetic does not show which option has the lower complete project cost. Obtain delivery, small-load, equipment and placement charges, and compare products that meet the same project requirements.",
          "When requesting the ready-mix quote, provide the required concrete specification, quantity, placement method, site access and delivery timing. NRMCA’s ordering guidance explains why the producer needs project details in addition to yardage. Record the agreed allowance so it is not added a second time."
        ]
      },
      {
        "id": "footings-beams-columns",
        "title": "Calculate footings, beams and columns separately",
        "paragraphs": [
          "For rectangular elements, use length × width × depth with all three measurements in feet. The examples below show volume only; their dimensions do not establish whether an element is structurally suitable.",
          "For a round column, use π × radius² × height. A 12-inch-diameter, 8-foot-tall cylinder has a radius of 0.5 foot and a volume of about 6.28 cubic feet. Using the 1-foot diameter as the radius would make that result four times too large.",
          "If the 80-cu-ft slab, 30-cu-ft footing and 15-cu-ft beam are genuinely separate, non-overlapping volumes, their total is 125 cubic feet, or about 4.63 cubic yards before an allowance. Do not add a full beam volume where part of it is already included in the slab."
        ],
        "table": {
          "caption": "Illustrative rectangular element dimensions, before any allowance.",
          "headers": [
            "Element",
            "Dimensions in feet",
            "Volume"
          ],
          "rows": [
            [
              "Footing",
              "30 × 2 × 0.5",
              "30 cu ft"
            ],
            [
              "Beam",
              "20 × 0.75 × 1",
              "15 cu ft"
            ],
            [
              "Column",
              "1.5 × 1.5 × 10",
              "22.5 cu ft"
            ]
          ]
        }
      },
      {
        "id": "use-calculator",
        "title": "Reproduce the slab volume in the Concrete Calculator",
        "paragraphs": [
          "Enter a length of 20 Feet, width of 12 Feet and depth of 4 Inch. The geometric volume should correspond to 80 cubic feet, approximately 2.96 cubic yards or 2.265 cubic meters. Keep the depth unit in inches rather than entering the number 4 as feet.",
          "The calculator also estimates separate cement, sand and aggregate quantities from its mix-ratio assumptions. Its cement-bag count uses 94-lb Portland cement bags; it is not the 80-lb premixed-concrete bag count in this article. Calculate premix bags from finished volume and the selected product’s yield as shown above.",
          "Use the geometric volume result to check the measurements. Apply the agreed ordering allowance and supplier increment separately. Neither the calculator’s ingredient estimate nor this quantity guide replaces a specified concrete mix or structural design."
        ]
      }
    ],
    "mistakes": [
      "Entering a thickness in inches while leaving the unit set to feet.",
      "Rounding 4/12 to 0.3 before calculating the slab volume.",
      "Treating 94-lb cement bags as 80-lb bags of premixed concrete.",
      "Counting an overlap between a slab, beam or footing twice.",
      "Comparing material-only prices with a delivered or installed quote."
    ],
    "faqs": [
      {
        "question": "How much concrete is needed for a 20x12 slab at 4 inches?",
        "answer": "The geometric volume is 80 cubic feet, or about 2.96 cubic yards. The illustrative 5% allowance used here raises it to 84 cubic feet, or about 3.11 cubic yards before supplier rounding."
      },
      {
        "question": "How many 80-lb concrete bags does the example need?",
        "answer": "At a stated yield of 0.60 cubic foot per bag, the 84-cubic-foot adjusted target needs 140 bags. Check your selected product’s yield before using that count."
      },
      {
        "question": "How many cubic feet are in one cubic yard?",
        "answer": "One cubic yard contains 27 cubic feet. Divide cubic feet by 27 to convert a volume to cubic yards."
      },
      {
        "question": "Does a 6-inch slab use twice as much as a 4-inch slab?",
        "answer": "No. With the same footprint, 6 ÷ 4 = 1.5, so it uses 50% more concrete. The appropriate thickness must come from the project design."
      },
      {
        "question": "Is 5% extra always enough?",
        "answer": "No. It is the allowance chosen for these examples. Check actual depth, formwork, excavation and the supplier’s guidance before agreeing on an order."
      },
      {
        "question": "Why does the calculator show a different cement-bag number?",
        "answer": "Its cement-bag result estimates one ingredient using 94-lb Portland cement bags. The bags in this article contain premixed concrete, including aggregates, and are counted using finished-volume yield."
      }
    ],
    "sources": [
      {
        "label": "QUIKRETE Concrete Mix No. 1101: bag sizes and yield (PDF)",
        "href": "https://www.quikrete.com/pdfs/data_sheet-concrete%20mix%201101.pdf"
      },
      {
        "label": "NRMCA CIP 31: ordering ready mixed concrete (PDF)",
        "href": "https://www.nrmca.org/wp-content/uploads/2021/01/31pr.pdf"
      }
    ],
    "image": null,
    "related": [
      "/guides/concrete-volume",
      "/blog/square-footage-calculation-guide",
      "/blog/gravel-calculation-guide"
    ]
  },
  {
    "slug": "square-footage-calculation-guide",
    "title": "Square Footage for Flooring: Feet, Inches & Cartons",
    "description": "Calculate room square footage with feet and inches. Follow L-shaped room and wall examples, then compare flooring waste, carton coverage and purchase costs.",
    "category": "Measurements",
    "tags": [
      "square-footage",
      "area",
      "measurements"
    ],
    "calculatorHref": "/calculators/square-footage",
    "publishedAt": "2026-08-25",
    "modifiedAt": "2026-10-28",
    "intro": [
      "For a rectangular surface, multiply length by width in feet. A 12x10-foot room is 120 square feet. If the measurements include inches, convert those inches before multiplying: 10 ft 6 in by 12 ft 3 in is 10.5 × 12.25 = 128.625 square feet.",
      "Keep the measured area and the amount you buy separate. Flooring comes in cartons, paint has a coverage rate, and concrete needs a thickness as well as an area. This guide follows a room measurement through those decisions instead of stopping at length times width.",
      "The examples use US feet and inches. Prices, carton coverage and the 10% cutting allowance are illustrative inputs. Use your product’s coverage and installation instructions when turning the measurement into an order."
    ],
    "formula": "Square feet = (length feet + length inches ÷ 12) × (width feet + width inches ÷ 12). For several sections, add their non-overlapping areas and subtract only surfaces excluded from the project.",
    "example": [
      [
        "Room length",
        "10 ft + 6/12 ft",
        "10.5 ft"
      ],
      [
        "Room width",
        "12 ft + 3/12 ft",
        "12.25 ft"
      ],
      [
        "Measured area",
        "10.5 × 12.25",
        "128.625 sq ft"
      ],
      [
        "Example 10% allowance",
        "128.625 × 1.10",
        "141.4875 sq ft"
      ],
      [
        "Cartons covering 23.5 sq ft each",
        "Round up 141.4875 ÷ 23.5",
        "7 cartons"
      ],
      [
        "Actual purchased coverage",
        "7 × 23.5",
        "164.5 sq ft"
      ],
      [
        "At an illustrative $68 per carton",
        "7 × $68",
        "$476"
      ]
    ],
    "sections": [
      {
        "id": "room-comparison",
        "title": "Compare room dimensions without rounding the area early",
        "paragraphs": [
          "A room described as approximately 10x12 may measure 10 ft 6 in by 12 ft 3 in. That adds 8.625 square feet compared with a 120-square-foot rectangle, before any cutting allowance. Measure rather than ordering from a rounded room description.",
          "Six inches is half a foot, so 10 ft 6 in becomes 10.5 ft, not 10.6 ft. The table shows several complete calculations. Keep the unrounded result until the final display or package-count step."
        ],
        "table": {
          "caption": "Measured rectangular areas. The last column uses an example 10% allowance before package rounding.",
          "headers": [
            "Dimensions",
            "Calculation in feet",
            "Area (sq ft)",
            "With 10% (sq ft)"
          ],
          "rows": [
            [
              "12 ft × 10 ft",
              "12 × 10",
              "120",
              "132"
            ],
            [
              "10 ft 6 in × 12 ft",
              "10.5 × 12",
              "126",
              "138.6"
            ],
            [
              "10 ft 6 in × 12 ft 3 in",
              "10.5 × 12.25",
              "128.625",
              "141.4875"
            ],
            [
              "15 ft × 20 ft",
              "15 × 20",
              "300",
              "330"
            ]
          ]
        }
      },
      {
        "id": "l-shaped-room",
        "title": "Measure an L-shaped room, closet or separate section",
        "paragraphs": [
          "Sketch the outline and divide it into rectangles that do not overlap. A 10x8-foot main section and a 6x5-foot side section total 80 + 30 = 110 square feet. If a closet is already inside the measured main rectangle, do not add it again.",
          "Only subtract a permanent opening or excluded area when the finish will not cover it. In the example below, an excluded 2x3-foot opening removes 6 square feet, leaving 104. Confirm the installation plan before deducting cabinet or appliance footprints.",
          "For several different measurements, the Area Calculator’s Multiple sections mode can add the sections and subtract openings. It also lets you transfer the resulting area to Tile or to Paint’s known-surface mode. For paint, measure the actual walls or ceiling you intend to coat."
        ],
        "table": {
          "caption": "L-shaped room example with one excluded opening; sections must not overlap.",
          "headers": [
            "Section",
            "Calculation",
            "Area change"
          ],
          "rows": [
            [
              "Main section",
              "10 ft × 8 ft",
              "+80 sq ft"
            ],
            [
              "Side section",
              "6 ft × 5 ft",
              "+30 sq ft"
            ],
            [
              "Excluded opening",
              "2 ft × 3 ft",
              "−6 sq ft"
            ],
            [
              "Net area",
              "80 + 30 − 6",
              "104 sq ft"
            ]
          ]
        }
      },
      {
        "id": "flooring-cartons",
        "title": "Turn square footage into whole flooring cartons",
        "paragraphs": [
          "Use the coverage printed on the carton. Divide the area including your chosen allowance by that coverage, then round up to a whole carton. Lowe’s flooring planner uses this area-to-carton approach; the exact allowance and installation details still depend on the selected product.",
          "For the 128.625-square-foot room with 10% extra, the target is 141.4875 square feet. Six cartons covering 23.5 square feet each provide only 141 square feet, so the example needs seven. Rounding the target down to 141 before counting cartons would hide that shortfall.",
          "The following two products use invented prices to demonstrate a comparison. A lower carton price does not always mean a lower room total. Compare the same required coverage and the actual number of cartons you must buy. Underlayment, trim, transitions, delivery, tax and labor are separate."
        ],
        "table": {
          "caption": "Two hypothetical carton offers for a 141.4875-sq-ft target. These are example prices, not supplier quotes.",
          "headers": [
            "Offer",
            "Coverage/carton",
            "Price/carton",
            "Cartons",
            "Purchased sq ft",
            "Material total"
          ],
          "rows": [
            [
              "A",
              "23.5 sq ft",
              "$68",
              "7",
              "164.5",
              "$476"
            ],
            [
              "B",
              "20 sq ft",
              "$60",
              "8",
              "160",
              "$480"
            ]
          ]
        }
      },
      {
        "id": "wall-area",
        "title": "Keep wall area separate from floor area",
        "paragraphs": [
          "One wall 12 feet wide and 8 feet high has 96 square feet of surface. Deducting a 3x4-foot window leaves 84 square feet of wall finish. That wall calculation says nothing about the floor area of the room.",
          "For four rectangular walls of equal height, use 2 × (room length + room width) × wall height, then account for unpainted openings. A 12x10 room with 8-foot walls has 352 square feet of gross wall area and a separate 120-square-foot flat ceiling. Sloped ceilings and varying wall heights need their actual dimensions.",
          "Apply paint coats and product coverage after finding the painted surface area. A floor-covering waste percentage should not automatically become a paint allowance or an extra coat."
        ]
      },
      {
        "id": "units-and-scope",
        "title": "Convert square units and distinguish area from volume",
        "paragraphs": [
          "There are 144 square inches in one square foot, because both sides of a 12-inch square are converted. Divide square inches by 144, not by 12. Divide square feet by 9 for square yards; multiply by 0.09290304 for square meters.",
          "For example, 180 square feet equals 20 square yards or about 16.72 square meters. Concrete volume needs another measurement: a 4-inch layer over 180 square feet is 180 × 4/12 = 60 cubic feet, about 2.22 cubic yards before an allowance.",
          "These are material-planning measurements. A flooring estimate is not a certified measurement of a home’s advertised living area. If a listing, appraisal or permit requires a particular measurement method, use the rules and professional measurements appropriate to that purpose."
        ]
      },
      {
        "id": "use-calculator",
        "title": "Enter feet and inches in the Square Footage Calculator",
        "paragraphs": [
          "Choose Rectangle and the ft & in input option. Enter length 10 feet 6 inches, width 12 feet 3 inches and quantity 1. With waste at zero, the measured area is 128.625 square feet, which may display rounded. A 10% allowance produces 141.4875 square feet before packaging.",
          "Keep full precision when dividing by carton coverage. The Square Footage Calculator’s area-price estimate is different from the cost of whole cartons; use the actual carton count and price for the purchase comparison above.",
          "Quantity is suitable for identical sections. Measure differently sized rooms separately or combine them in the Area Calculator’s Multiple sections mode. Keep a labeled sketch so each room, closet and opening appears only once."
        ]
      }
    ],
    "mistakes": [
      "Entering 10 ft 6 in as 10.6 feet instead of 10.5 feet.",
      "Adding a closet that is already included in the room rectangle.",
      "Rounding the target area down before calculating whole cartons.",
      "Using floor area as the paintable wall area.",
      "Adding the same cutting allowance in both the area and material calculator."
    ],
    "faqs": [
      {
        "question": "How do I calculate square footage with feet and inches?",
        "answer": "Divide each inch measurement by 12, add it to the feet, then multiply the two dimensions. For 10 ft 6 in by 12 ft 3 in, calculate 10.5 × 12.25 = 128.625 square feet."
      },
      {
        "question": "How many square feet are in a 12x10 room?",
        "answer": "A rectangular room measuring exactly 12 feet by 10 feet has 120 square feet. Additional closets or alcoves should be counted only when they are outside that measured rectangle."
      },
      {
        "question": "How do I measure an L-shaped room?",
        "answer": "Split it into non-overlapping rectangles, calculate each area and add the results. Subtract any excluded opening once. The example here totals 110 square feet before a 6-square-foot opening, or 104 afterward."
      },
      {
        "question": "Should I add 10% to every measurement?",
        "answer": "No. Preserve the measured area, then choose an allowance for the actual material and layout. Ten percent is the example used here, not a requirement for every project."
      },
      {
        "question": "Why are seven cartons needed when six almost cover the target?",
        "answer": "Six cartons at 23.5 square feet provide 141 square feet, below the example’s 141.4875-square-foot target. Whole-carton rounding gives seven; check actual coverage and allowance before ordering."
      },
      {
        "question": "Is a square foot the same as a cubic foot?",
        "answer": "No. Square feet measure surface area. Multiply that area by a depth in feet to get cubic feet of volume."
      }
    ],
    "sources": [
      {
        "label": "Lowe’s wood and laminate flooring project planner (PDF)",
        "href": "https://www.lowes.com/pdf/project-planner.pdf"
      }
    ],
    "image": "/square-footage-guide.webp",
    "imageAlt": "How to calculate square footage: CornerSpan measurement guide",
    "related": [
      "/blog/how-to-use-a-construction-calculator",
      "/blog/area-calculation-guide",
      "/blog/tile-calculation-guide",
      "/blog/paint-calculation-guide",
      "/blog/concrete-calculation-guide"
    ]
  }
];

export const calculatorArticles: CalculatorArticle[] = articles.map(article => {
  const illustration = articleImages[`/blog/${article.slug}`];
  return illustration ? { ...article, image: illustration.src, imageAlt: illustration.alt, imageCaption: illustration.caption, modifiedAt: "2026-10-29" } : article;
});
