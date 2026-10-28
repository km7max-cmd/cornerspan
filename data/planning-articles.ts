import type { CalculatorArticle } from "./calculator-articles";

export const planningArticles: CalculatorArticle[] = [
  {
    "slug": "how-to-use-a-construction-calculator",
    "title": "How to Use a Construction Calculator: Units to Order Quantities",
    "description": "Choose the right construction calculator, enter feet and inches correctly, and check area, volume and purchase quantities with a reproducible example.",
    "category": "Estimating",
    "tags": [
      "construction",
      "material-estimates",
      "project-planning"
    ],
    "calculatorHref": "/calculators",
    "publishedAt": "2026-10-28",
    "modifiedAt": "2026-10-28",
    "intro": [
      "A construction calculator turns project measurements into a quantity: square feet of flooring, cubic yards of fill, pieces of masonry or gallons of coating. Start by deciding which quantity you need. A correct area result cannot answer a volume question until you also know the depth.",
      "This tutorial follows the input and checking process in CornerSpan’s browser tools. It uses US units and a small rectangular room to show where entry errors happen. It is not a manual for a physical Construction Master calculator, and the browser tools do not reproduce that device’s key sequences."
    ],
    "formula": "Decimal feet = whole feet + inches ÷ 12; rectangular area = length × width; volume = area × depth in matching units.",
    "example": [
      [
        "Room length",
        "11 ft 6 in = 11 + 6 ÷ 12",
        "11.5 ft"
      ],
      [
        "Room width",
        "9 ft 4 in = 9 + 4 ÷ 12",
        "9.333333… ft"
      ],
      [
        "Floor area",
        "11.5 × (9 + 4 ÷ 12)",
        "107.333333… sq ft"
      ],
      [
        "Incorrect decimal entry",
        "11.6 × 9.4",
        "109.04 sq ft — different measurements"
      ]
    ],
    "sections": [
      {
        "id": "choose-output",
        "title": "1. Choose the tool by the result you need",
        "paragraphs": [
          "Open the calculator directory and choose by material or measurement. Area and Square Footage answer surface-size questions. Concrete needs a thickness as well as a footprint. Tile and Paver connect surface area to product coverage. Paint also needs coverage and coats. Gravel and Topsoil need depth, and weight estimates additionally depend on density.",
          "Check the result label before entering anything. Linear feet measure length, square feet measure area, and cubic feet or cubic yards measure volume. If a supplier quotes by ton while your result is in cubic yards, obtain a suitable density and confirm the type of ton rather than treating the two numbers as interchangeable."
        ],
        "table": {
          "caption": "Match the purchasing question to the required information.",
          "headers": [
            "Question",
            "Tool",
            "Have ready"
          ],
          "rows": [
            [
              "How large is the floor?",
              "Area / Square Footage",
              "Shape and measured dimensions"
            ],
            [
              "How much material fills this space?",
              "Concrete / Gravel / Topsoil",
              "Footprint and specified depth"
            ],
            [
              "How many pieces cover the surface?",
              "Tile / Paver",
              "Net area and installed product coverage"
            ],
            [
              "How much paint?",
              "Paint",
              "Paintable area, coats and product coverage"
            ]
          ]
        }
      },
      {
        "id": "enter-units",
        "title": "2. Enter feet and inches without changing their meaning",
        "paragraphs": [
          "For the room above, the Square Footage tool has separate feet-and-inches entries. Enter 11 feet and 6 inches for one side, then 9 feet and 4 inches for the other. When using a single decimal-feet field instead, divide inches by 12 first. Six inches is 0.5 feet, not 0.6 feet.",
          "To avoid rounding the repeating decimal in the second side, the Area Calculator can use inches: choose Rectangle, select inches, enter length 138 and width 112, and set quantity to 1. The area is 15,456 square inches, or 107.333333… square feet. The screen may round the displayed result; use full precision in a separate calculation.",
          "Changing a unit selector is not always the same as converting an existing entry. Check the labels and values after switching units. For a fresh estimate, re-enter the original measurements in the selected units and compare the result with a simple hand calculation."
        ]
      },
      {
        "id": "read-results",
        "title": "3. Separate measured area, allowance and purchased amount",
        "paragraphs": [
          "Keep the raw 107.333333… square feet on your estimate sheet. Suppose a selected flooring product requires an illustrative 8% cutting allowance and is sold in cartons covering 15.5 square feet. Adjusted coverage is 115.92 square feet; 115.92 ÷ 15.5 is about 7.479 cartons, so eight full cartons provide 124 square feet.",
          "This is a manual purchase check, not a claim that every tool applies that carton rule. Do not add 8% again to the eight-carton order. The 8% allowance and carton coverage are example inputs, not universal flooring specifications. Use your layout and chosen product instructions.",
          "The extra 8.08 square feet between 124 purchased and 115.92 required comes from packaging. Recording it separately helps you explain the order instead of silently increasing the waste percentage."
        ]
      },
      {
        "id": "verify-result",
        "title": "4. Run a small independent check",
        "paragraphs": [
          "The room is slightly larger than 11 × 9 = 99 square feet and smaller than 12 × 10 = 120 square feet. A result near 1,000 square feet would suggest an input, unit or quantity mistake. Then reproduce the exact arithmetic using inches as shown above.",
          "Before using a material estimate, verify deductions and repeated sections too. A window may reduce a wall-face quantity; the same window should not also reduce floor area. A quantity of two can double the whole shape, so keep it at one unless the measured sections really repeat."
        ]
      },
      {
        "id": "keep-record",
        "title": "5. Keep the information needed to reproduce the estimate",
        "paragraphs": [
          "Record the tool name, mode, units, every measurement, coverage or density assumption, allowance and output. A page link alone does not preserve the input values. CornerSpan’s Favorites save tool shortcuts; its History is not a complete project ledger for all calculators.",
          "Use Settings to control local activity recording and clear saved activity. Local browser records are not an account backup across devices. For a purchase, keep a separate dated quantity sheet with the product specification and supplier quote."
        ]
      }
    ],
    "mistakes": [
      "Entering 11 ft 6 in as 11.6 ft.",
      "Using an area output as if it were a volume or weight.",
      "Applying an allowance twice: once in the tool and again to its adjusted result.",
      "Assuming that saving a favorite saves all project inputs."
    ],
    "faqs": [
      {
        "question": "What is a construction calculator?",
        "answer": "It is a tool that applies measurement and material formulas to your inputs. Depending on the tool, it can estimate area, volume, pieces, coverage or material cost; it does not establish a construction design."
      },
      {
        "question": "Can I use a construction calculator online for free?",
        "answer": "CornerSpan’s available tools run in a web browser without an account. Choose a tool from the directory and check its input units and result labels."
      },
      {
        "question": "Can I use CornerSpan as a construction calculator app on my phone?",
        "answer": "You can use the website in a phone browser. This guide does not promise an Android or iOS store app, offline operation, or the key layout of a physical calculator."
      }
    ],
    "sources": [
      {
        "label": "NIST: length, area and volume conversion factors",
        "href": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
      }
    ],
    "image": null,
    "related": [
      "/calculators/area",
      "/calculators/square-footage",
      "/blog/construction-material-takeoff-checklist",
      "/blog/square-footage-calculation-guide"
    ]
  },
  {
    "slug": "construction-material-takeoff-checklist",
    "title": "Construction Material Takeoff Checklist: A Patio Example",
    "description": "Build a traceable material takeoff for a 12x10 patio: separate pavers, base, bedding and edging, record units, and check packaging and missing scope.",
    "category": "Estimating",
    "tags": [
      "construction",
      "material-estimates",
      "project-planning"
    ],
    "calculatorHref": "/calculators",
    "publishedAt": "2026-10-28",
    "modifiedAt": "2026-10-28",
    "intro": [
      "A material takeoff is a measured list of the products a project needs before prices are attached. The useful deliverable is not one grand total: it is a set of quantities with locations, units, assumptions and purchase increments that someone else can check.",
      "This worksheet uses a 12 × 10-foot rectangular patio to demonstrate the process. The layer depths and allowances below are hypothetical estimating inputs, not a pavement design. Establish the actual section, drainage and materials from the project requirements before ordering."
    ],
    "formula": "Each takeoff line = identified scope + measured quantity + unit + product basis + allowance + purchase increment.",
    "example": [
      [
        "Surface",
        "12 × 10 ft",
        "120 sq ft"
      ],
      [
        "Pavers, assumed 1 sq ft each",
        "120 × 1.10",
        "132 pieces before pack rounding"
      ],
      [
        "Base, assumed 4 in installed depth",
        "120 × (4 ÷ 12) ÷ 27",
        "1.481481… cu yd in place"
      ],
      [
        "Bedding, assumed 1 in installed depth",
        "120 × (1 ÷ 12) ÷ 27",
        "0.370370… cu yd in place"
      ],
      [
        "All four edges",
        "2 × (12 + 10)",
        "44 linear ft"
      ]
    ],
    "sections": [
      {
        "id": "define-scope",
        "title": "Start with scope and a marked drawing",
        "paragraphs": [
          "Give each measured area an identifier, such as P1 for the main patio. Write down the drawing revision or measurement date, then mark the perimeter and the areas excluded from paving. Do not measure an attached walkway into P1 if you will also list it as a separate line.",
          "For each layer, ask whether its footprint matches the paver surface. A base may extend beyond the finished edge in the specified detail. The 120-square-foot footprint used for every layer here is only a simplifying assumption; record actual extensions separately when required.",
          "Create a missing-scope column before calculating. Depending on the design, it may need excavation, disposal, drainage, separation fabric, jointing material, edging anchors and delivery. A precise paver count does not mean the whole project has been measured."
        ]
      },
      {
        "id": "quantity-sheet",
        "title": "Use one row per material and measurement basis",
        "paragraphs": [
          "The sheet below separates installed geometry from buying decisions. Length, area, volume and piece counts cannot be added together. Only prices in a common currency can later be summed into a monetary subtotal.",
          "The paver line assumes the installed coverage is exactly one square foot per piece. A product sold under a nominal dimension may have different coverage. Replace that assumption with the selected product’s stated installed coverage, particularly for mixed-size kits."
        ],
        "table": {
          "caption": "Example takeoff sheet. Depths and percentages are assumptions, not installation instructions.",
          "headers": [
            "ID / material",
            "Measured basis",
            "Ordering check"
          ],
          "rows": [
            [
              "P1 / pavers",
              "120 sq ft; 10% example allowance = 132 sq ft",
              "132 pieces if 1 sq ft each; check full packs"
            ],
            [
              "P1 / base",
              "40 cu ft = 1.481481… cu yd in place",
              "Ask how loose delivery relates to the specified installed quantity"
            ],
            [
              "P1 / bedding",
              "10 cu ft = 0.370370… cu yd in place",
              "Confirm product, installed depth and supply unit"
            ],
            [
              "P1 / edge restraint",
              "44 ft if all sides require it",
              "Check attached edges, stock lengths, corners and anchors"
            ]
          ]
        }
      },
      {
        "id": "buying-units",
        "title": "Reconcile installed quantities with sale units",
        "paragraphs": [
          "If the example pavers are available only in packs of 20, the 132-piece requirement needs seven packs: 140 pieces. Keep both numbers. Eight pieces are packaging surplus above the adjusted requirement, not another independent cutting allowance.",
          "Base and bedding are different materials and should stay on separate lines even if both are sold by cubic yard. An in-place volume does not establish the loose delivery volume. Ask the supplier for the appropriate ordering basis for the specified material and installation condition; do not apply a guessed universal compaction multiplier.",
          "If buying by weight, record the density and whether it describes loose or compacted material. Also write down whether the quote uses US short tons or metric tonnes. The Gravel Calculator can help with a stated density, but it cannot establish that density for an unidentified load."
        ]
      },
      {
        "id": "edge-check",
        "title": "Count boundaries instead of inferring them from area",
        "paragraphs": [
          "The full perimeter of the 12 × 10 rectangle is 44 feet. If one 12-foot side is against an existing suitable boundary and the detail requires no new restraint there, the new-restraint length becomes 32 feet. That deduction is specific to the boundary detail; adjacency alone does not prove restraint is unnecessary.",
          "For an illustrative product supplied in 8-foot lengths, 44 feet requires at least six lengths by total length, whereas 32 feet requires four. A cut plan still matters: corner pieces, joint positions and unusable offcuts can change the order. Record anchors and connectors from the selected system separately."
        ]
      },
      {
        "id": "review-sheet",
        "title": "Review the takeoff before asking for prices",
        "paragraphs": [
          "Check that every measured region appears once, each layer has the correct depth, and exclusions apply to the right material. An opening in a finish layer does not necessarily remove the supporting layer. Keep the plan’s geometric dimensions distinct from procurement allowances.",
          "For each line, fill in product identity, supplier unit, pack size, allowance reason, source measurement and any unresolved question. Put “not yet measured” or “quote needed” against unknown items. A blank or zero can be mistaken for an intentional exclusion.",
          "Then send the same scope and quantity basis when requesting competing quotes. Preserve the takeoff and price sheet separately so a new unit price can update the budget without quietly changing the measured work."
        ]
      }
    ],
    "mistakes": [
      "Adding square feet, cubic yards and linear feet into a meaningless quantity total.",
      "Using surface area for every layer without checking extensions.",
      "Treating installed aggregate volume as a guaranteed delivery volume.",
      "Losing pack surplus, anchors, delivery or disposal from the purchase list."
    ],
    "faqs": [
      {
        "question": "What should a material takeoff include?",
        "answer": "For each material, record its location, product, measured dimensions, quantity, unit, deductions, allowance and purchase increment. Mark exclusions and unresolved scope explicitly."
      },
      {
        "question": "Is a material takeoff the same as a cost estimate?",
        "answer": "No. A takeoff establishes quantities. A cost estimate attaches prices and adds the labor, equipment, delivery and other costs included in its stated scope."
      },
      {
        "question": "Can I use one waste percentage for the whole project?",
        "answer": "Not reliably. Cuts, breakage, packaging and installed-versus-delivered volume are different issues. Record the reason and basis for each adjustment by material."
      }
    ],
    "sources": [
      {
        "label": "NIST: length, area and volume conversion factors",
        "href": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
      }
    ],
    "image": null,
    "related": [
      "/calculators/paver",
      "/calculators/gravel",
      "/blog/how-to-calculate-construction-project-cost",
      "/guides/concrete-volume",
      "/guides/brick-calculation"
    ]
  },
  {
    "slug": "how-to-calculate-construction-project-cost",
    "title": "How to Calculate Construction Project Cost: A Worked Budget",
    "description": "Turn measured quantities into a project budget. Compare supplier quotes, calculate person-hours, separate delivery and equipment, and label missing costs.",
    "category": "Estimating",
    "tags": [
      "construction",
      "material-estimates",
      "project-planning"
    ],
    "calculatorHref": "/calculators",
    "publishedAt": "2026-10-28",
    "modifiedAt": "2026-10-28",
    "intro": [
      "To calculate construction project cost, first define the work, measure the materials, and price the actual purchase quantities. Then add the labor, equipment and other costs included in the scope. A material calculator alone does not produce an all-in project price.",
      "The example below prices a hypothetical patio package to demonstrate budget arithmetic. Every dollar rate is invented for illustration; none is a US market average or local quote. The scope is deliberately limited so unresolved costs remain visible instead of being hidden inside a confident-looking total."
    ],
    "formula": "Defined-scope subtotal = purchased materials + delivery + person-hours × cost per person-hour + equipment + other included costs. Budget scenario = subtotal + stated contingency.",
    "example": [
      [
        "Pavers",
        "140 purchased pieces × $2.50",
        " $350.00"
      ],
      [
        "Base aggregate, quoted delivery quantity",
        "1.5 cu yd × $60",
        " $90.00"
      ],
      [
        "Edge restraint",
        "6 lengths × $24",
        " $144.00"
      ],
      [
        "Delivery",
        "One example charge",
        " $85.00"
      ],
      [
        "Labor",
        "2 people × 6 hours × $40 per person-hour",
        " $480.00"
      ],
      [
        "Equipment",
        "One example rental charge",
        " $75.00"
      ],
      [
        "Defined-scope subtotal",
        "350 + 90 + 144 + 85 + 480 + 75",
        " $1,224.00"
      ],
      [
        "Illustrative contingency",
        "10% × $1,224",
        " $122.40"
      ],
      [
        "Scenario total, exclusions remain",
        "1,224 + 122.40",
        " $1,346.40"
      ]
    ],
    "sections": [
      {
        "id": "scope-first",
        "title": "Define what the budget does and does not include",
        "paragraphs": [
          "This scenario uses the patio worksheet’s 132-piece adjusted paver requirement, rounded to seven packs of 20, and six 8-foot edge-restraint lengths. The 1.5-cubic-yard base delivery quantity is a hypothetical supplier quote assumption; it is not a conversion rule from the worksheet’s in-place volume. Confirm the supply quantity for the actual specification.",
          "The subtotal does not include bedding, jointing material, anchors, excavation, disposal, tax, permit charges or any other unpriced work. It is therefore a partial budget scenario, not the cost to build a finished patio. Keep a separate “quote needed” list and add those items before treating the estimate as complete.",
          "If a contractor supplies an installed fixed-price quote, read what it includes before adding labor or materials again. Likewise, a delivered material price may already include freight. Write the inclusions alongside each price."
        ]
      },
      {
        "id": "price-purchases",
        "title": "Use purchase quantities rather than raw requirements",
        "paragraphs": [
          "The paver requirement is 132 pieces, but the example supplier sells only packs of 20. Price 140 pieces, not 132: at $2.50 each, the difference is $20. The extra eight pieces are already in the order; do not add another pack simply because the purchase exceeds the measured requirement.",
          "Record price units exactly. A $24 edging price per 8-foot length is $3 per foot before cutting, but six lengths still cost $144. A quote per pallet, carton or short ton needs the matching purchase quantity. Comparing unit prices without unit sizes can reverse which supplier looks cheaper."
        ]
      },
      {
        "id": "compare-quotes",
        "title": "Compare two quotes on the same delivered scope",
        "paragraphs": [
          "Suppose Supplier B charges less for each paver but more for delivery. The table holds quantities constant and includes the same three material lines. It intentionally excludes labor and equipment, which are unchanged in this comparison.",
          "Supplier A is $25 cheaper on this defined delivered package even though B has the lower paver price. Before choosing, confirm that both quotes identify equivalent products, quantities, included services and any return or delivery conditions. The table is a method for comparison, not a supplier recommendation."
        ],
        "table": {
          "caption": "Invented quotes for the same purchase quantities; tax and unresolved materials are excluded.",
          "headers": [
            "Line",
            "Supplier A",
            "Supplier B"
          ],
          "rows": [
            [
              "140 pavers",
              "$350.00 at $2.50 each",
              "$329.00 at $2.35 each"
            ],
            [
              "1.5 cu yd base",
              "$90.00 at $60/cu yd",
              "$96.00 at $64/cu yd"
            ],
            [
              "6 edging lengths",
              "$144.00 at $24 each",
              "$144.00 at $24 each"
            ],
            [
              "Delivery",
              "$85.00",
              "$125.00"
            ],
            [
              "Comparable material package",
              "$669.00",
              "$694.00"
            ]
          ]
        }
      },
      {
        "id": "labor-equipment",
        "title": "Convert crew time to person-hours",
        "paragraphs": [
          "Two people working for six hours represent twelve person-hours. At a hypothetical cost of $40 per person-hour, the line is $480. Multiplying six hours by $40 would budget only one person’s time. If the quote is instead a crew-hour rate, multiply by crew-hours without multiplying the crew size again.",
          "The example $40 is a chosen budgeting input, not a wage recommendation or a statement that employment-related costs are included. Use the actual quoted rate and its scope. Check whether equipment, travel, supervision and setup are separate or already covered.",
          "For rentals, record the charged period and included items. A daily price may need separate delivery, fuel or additional rental periods. The $75 line here includes only the assumed charge shown; it is not a quote for a particular machine."
        ]
      },
      {
        "id": "uncertainty",
        "title": "Show uncertainty without hiding missing work",
        "paragraphs": [
          "The scenario adds 10% of the defined $1,224 subtotal, giving $122.40 and a scenario total of $1,346.40. The 10% is illustrative, not a rule for construction projects. State exactly which subtotal a contingency applies to.",
          "Contingency should not conceal known missing items. If bedding has not been priced, mark it as unpriced and obtain a quote; do not assume the contingency covers it. Similarly, tax and permit costs require the applicable verified amounts and should not be invented from this article.",
          "To see the effect of labor uncertainty, keeping everything else fixed and increasing the two-person duration from six to eight hours raises labor from $480 to $640. The defined subtotal becomes $1,384 and the same 10% scenario becomes $1,522.40. This sensitivity check shows which assumption is worth confirming."
        ]
      },
      {
        "id": "update-budget",
        "title": "Keep a dated estimate and revise one assumption at a time",
        "paragraphs": [
          "For each line retain the quantity source, quote date, unit, rate, included services and expiry or validity information supplied with the quote. Label each amount as quoted, calculated, assumed or still missing. When dimensions change, update the takeoff before repricing.",
          "CornerSpan’s material calculators help with quantities and supported material-price fields. They do not currently supply a ZIP-code home-building price, construction-loan payment or complete contractor bid. Use the outputs as traceable inputs to your own cost sheet, and retain the scope exclusions when sharing the number."
        ]
      }
    ],
    "mistakes": [
      "Pricing 132 required pieces when the supplier sells 140 in full packs.",
      "Comparing a pickup price with a delivered price.",
      "Confusing a person-hour rate with a crew-hour rate.",
      "Treating contingency as a substitute for known missing materials or charges."
    ],
    "faqs": [
      {
        "question": "How do I calculate total construction project cost?",
        "answer": "Define the scope, calculate purchase quantities, apply verified prices, and add the included labor, equipment, delivery and other costs. Resolve missing items and state the contingency basis before calling the total complete."
      },
      {
        "question": "Does CornerSpan estimate home construction cost by ZIP code?",
        "answer": "No. The current tools estimate material quantities and supported costs from entered values. They do not provide a location-specific whole-house construction price."
      },
      {
        "question": "Are the prices in this example current market prices?",
        "answer": "No. They are invented USD inputs used to demonstrate arithmetic and quote comparison. Replace them with prices and terms for your actual project."
      }
    ],
    "sources": [
      {
        "label": "CornerSpan patio takeoff: measured quantities and pack assumptions",
        "href": "/blog/construction-material-takeoff-checklist"
      }
    ],
    "image": null,
    "related": [
      "/blog/construction-material-takeoff-checklist",
      "/calculators/paver",
      "/calculators/gravel",
      "/blog/how-to-use-a-construction-calculator"
    ]
  }
];
