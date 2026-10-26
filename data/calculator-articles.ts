export type CalculatorArticle = {
 slug:string; title:string; description:string; category:string; tags:string[]; calculatorHref:string; publishedAt:string; modifiedAt:string; intro:string[]; formula:string; example:string[][]; sections:{id:string;title:string;paragraphs:string[]}[]; mistakes:string[]; faqs:{question:string;answer:string}[]; sources:{label:string;href:string}[]; image:string|null; related:string[];
};

export const calculatorArticles: CalculatorArticle[] = [
  {
    "slug": "paver-calculation-guide",
    "title": "How Many Pavers Do I Need? Patio Quantity & Cost",
    "description": "Calculate pavers for a patio or walkway using square feet, paver size and waste. Follow a 10-by-10-foot example, then estimate pieces and material cost in USD.",
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
      "A patio estimate starts with two areas: the space you want to cover and the coverage of one paver. Divide the first by the second, allow for the cuts in your layout, and round up to whole pieces. Do not confuse the patio surface with its aggregate base or bedding layer; those need separate quantities.",
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
          "For a slightly longer 10.001 × 10 ft patio using the same inputs, the adjusted requirement is just over 110 pieces, so 111 pieces is correct. Whole-number estimates should not gain a piece solely because of floating-point rounding."
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
      "/blog/square-footage-calculation-guide",
      "/blog/concrete-calculation-guide"
    ]
  },
  {
    "slug": "tile-calculation-guide",
    "title": "How Many Tiles and Boxes Do I Need?",
    "description": "Estimate tiles and whole boxes from room size, tile dimensions and a chosen waste allowance. See a 100-square-foot example and compare material costs in USD.",
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
      "Buying tile requires two rounding steps: whole tiles and whole boxes. Measure the surface, divide by one tile’s coverage, apply the allowance for your layout, and then convert the resulting tile count into cartons. The quantity you purchase can exceed the quantity needed on the floor.",
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
          "Keep the area and waste calculation unrounded until the whole-tile step. Avoid rounding an exact 110-piece target to 111 due to numerical noise, because that can trigger an unnecessary extra carton."
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
      "/blog/square-footage-calculation-guide",
      "/blog/concrete-calculation-guide"
    ]
  },
  {
    "slug": "paint-calculation-guide",
    "title": "How Much Paint Do I Need? Walls, Ceilings & Gallons",
    "description": "Calculate paint gallons from wall or ceiling area, coats and product coverage. Follow room examples, understand quart rounding, and estimate a USD paint budget.",
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
      "Paint quantity depends on the surface you will coat, the number of coats and the product’s coverage rate. Floor area alone is not enough for wall painting. A room with tall walls needs more paint than a shorter room with the same floor plan.",
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
      "/blog/square-footage-calculation-guide",
      "/blog/concrete-calculation-guide"
    ]
  },
  {
    "slug": "asphalt-calculation-guide",
    "title": "How to Calculate Asphalt Tonnage for a Driveway",
    "description": "Estimate asphalt in US tons from driveway area, compacted thickness and mix density. Follow a worked example, add an allowance, and check a sample material cost.",
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
      "An asphalt estimate turns a planned pavement volume into weight. Measure the paved area, use the specified compacted thickness, and multiply by the mix density supplied for the job. The result is commonly quoted in US short tons, each equal to 2,000 pounds.",
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
      "/blog/square-footage-calculation-guide",
      "/blog/concrete-calculation-guide"
    ]
  },
  {
    "slug": "gravel-calculation-guide",
    "title": "How Much Gravel Do I Need? Cubic Yards & US Tons",
    "description": "Calculate gravel volume and weight for a driveway or path using feet, inches and supplier density. See cubic-yard, US-ton and USD cost examples before ordering.",
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
      "Gravel can be sold by volume or weight, so a useful estimate keeps cubic yards and US tons separate. First calculate the space to fill. Convert that volume to weight only after selecting a density suitable for the exact material.",
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
      "/blog/square-footage-calculation-guide",
      "/blog/concrete-calculation-guide"
    ]
  },
  {
    "slug": "topsoil-calculation-guide",
    "title": "How Much Topsoil Do I Need? Yards, Bags & Depth",
    "description": "Estimate topsoil in cubic yards and bags from garden area and depth. Follow a 10-by-20-foot example, compare purchase units, and check an illustrative USD budget.",
    "category": "Landscaping",
    "tags": [
      "topsoil",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/topsoil",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "Topsoil quantity is a volume calculation: area multiplied by the depth you intend to add. Buying by cubic yard is common for bulk delivery, while bags usually state a smaller volume. Calculate both on the same basis before comparing prices.",
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
        "id": "section-4",
        "title": "Use the Topsoil Calculator and compare costs",
        "paragraphs": [
          "Enter 10 ft length, 20 ft width and 3 inches depth. Choose the example 10% allowance and 0.75-cu-ft bag size. The calculator should report about 2.04 cubic yards and 74 bags; weight depends on the density you choose.",
          "At an illustrative $40 per cubic yard, the target volume costs $81.48 before delivery and tax. The Topsoil Calculator focuses on quantities, so calculate this price separately. If bags cost $3 each, the 74-bag example costs $222. Compare the actual delivered totals and product quality, not just these hypothetical material prices."
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
    "image": "/cornerspan-topsoil-calculator-hero.webp",
    "related": [
      "/blog/square-footage-calculation-guide",
      "/blog/concrete-calculation-guide"
    ]
  },
  {
    "slug": "fence-calculation-guide",
    "title": "How to Estimate Fence Posts, Sections and Pickets",
    "description": "Estimate fence posts, sections and pickets from run length, spacing and board width. Follow a 100-foot example and prepare a material checklist before ordering.",
    "category": "Fencing",
    "tags": [
      "fence",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/fence",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "A fence estimate should separate the layout into runs, gates, corners and endpoints. Dividing total length by spacing gives a useful starting point, but a single total cannot describe every arrangement of posts. Count shared corners and gate posts from the actual plan.",
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
      "/blog/square-footage-calculation-guide",
      "/blog/concrete-calculation-guide"
    ]
  },
  {
    "slug": "roofing-calculation-guide",
    "title": "How to Calculate Roofing Squares and Shingle Bundles",
    "description": "Convert roof footprint and pitch into roofing squares, then estimate shingle bundles with waste. Follow a US-unit example and compare square-based material costs.",
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
      "Roofing material is based on sloped roof surface, not simply the building’s floor area. Start with the horizontal roof footprint, account for pitch, then apply the chosen allowance and convert the result into the coverage units sold by the supplier.",
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
      "/blog/square-footage-calculation-guide",
      "/blog/concrete-calculation-guide"
    ]
  },
  {
    "slug": "sod-turf-calculation-guide",
    "title": "How Much Sod Do I Need? Rolls, Pieces and Pallets",
    "description": "Calculate sod from lawn square footage, cutting allowance and supplier coverage. Compare pieces, rolls and pallets with a worked example and sample USD costs.",
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
      "Sod is purchased as a physical product: pieces, rolls or pallets with stated coverage. Start with the lawn area, subtract beds and paths, add an allowance for the actual cutting layout, and divide by the coverage of the unit you intend to buy.",
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
      "/blog/square-footage-calculation-guide",
      "/blog/concrete-calculation-guide"
    ]
  },
  {
    "slug": "steel-calculation-guide",
    "title": "Steel Bar Weight Calculator: Pounds and USD Cost",
    "description": "Estimate solid round steel bar weight from metric diameter, feet and quantity. Convert to pounds, apply a chosen allowance, and calculate material cost in USD.",
    "category": "Steel",
    "tags": [
      "steel",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/steel",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "A steel-weight calculator is useful when a material list gives diameter, length and the number of bars but the supplier prices material by weight. The key is to keep diameter and length units consistent before converting the result into pounds.",
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
    "image": "/images/guides/rebar-weight.svg",
    "related": [
      "/guides/steel-weight",
      "/blog/concrete-calculation-guide"
    ]
  },
  {
    "slug": "brick-calculation-guide",
    "title": "How Many Bricks Do I Need? Wall Quantity and Cost",
    "description": "Estimate bricks for a wall after deducting openings and adding waste. Follow a US modular-brick example, round the order correctly, and calculate a USD budget.",
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
      "To estimate facing bricks, calculate the net wall area and divide it by the face area of one brick plus its mortar joints. This method estimates a single layer of brickwork. Wall thickness, bonding details, corners and special shapes can change the actual order.",
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
      "/guides/brick-calculation",
      "/guides/us-brick-sizes",
      "/blog/how-many-bricks-10-foot-retaining-wall"
    ]
  },
  {
    "slug": "area-calculation-guide",
    "title": "How to Calculate Area: Shapes, Square Feet and Acres",
    "description": "Calculate area for rectangles, circles, triangles and irregular project layouts. Follow US-unit examples, convert square feet to acres, and avoid measurement errors.",
    "category": "Measurements",
    "tags": [
      "area",
      "material-estimates",
      "construction"
    ],
    "calculatorHref": "/calculators/area",
    "publishedAt": "2026-10-26",
    "modifiedAt": "2026-10-26",
    "intro": [
      "Area is the starting point for estimating paint, flooring, sod, gravel coverage and many other materials. Choose a shape that matches the measured space, use consistent length units, and calculate the surface before applying product-specific waste or thickness.",
      "The Area Calculator supports eight shapes and a quantity multiplier. This article explains how to select the right dimensions and combine simple sections. It complements the detailed trapezoid article without requiring every project to fit a single rectangle."
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
          "Do not force a curved or highly irregular boundary into a rectangle without stating the approximation. For property or legal boundary measurements, use the appropriate survey information; a shape calculator is not a boundary survey. Repeated identical sections can use the quantity multiplier, but differently sized sections need separate calculations."
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
        "answer": "Only if the rooms have identical dimensions. Otherwise calculate them separately."
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
      "/blog/trapezoid-area-calculation",
      "/blog/square-footage-calculation-guide",
      "/blog/tile-calculation-guide"
    ]
  }
];
