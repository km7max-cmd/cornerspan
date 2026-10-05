export default function AboutCalculator() {
  const tableOfContents = [
    {
      id: "about-concrete-calculator",
      label: "About This Concrete Calculator",
    },
    {
      id: "what-can-you-calculate",
      label: "What Can You Calculate?",
    },
    {
      id: "how-to-use",
      label: "How to Use the Concrete Calculator",
    },
    {
      id: "concrete-volume",
      label: "How Concrete Volume Is Calculated",
    },
    {
      id: "material-estimate",
      label: "Concrete Material Estimate",
    },
    {
      id: "supported-units",
      label: "Supported Measurement Units",
    },
    {
      id: "accuracy",
      label: "Accuracy and Estimation",
    },
  ];

  return (
    <section
      className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby="about-concrete-calculator"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          Concrete Calculator Guide
        </p>

        <h2
          id="about-concrete-calculator"
          className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
        >
          About This Concrete Calculator
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
          Estimate concrete volume, material quantities, and approximate
          material cost for slabs, footings, walls, columns, stairs, and
          other common concrete projects.
        </p>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="px-5 py-5 sm:px-7 sm:py-7">

        {/* =================================================
            TABLE OF CONTENTS
        ================================================= */}

        <nav
          aria-label="Table of contents"
          className="rounded-2xl border border-blue-100 bg-blue-50 p-5"
        >
          <h3 className="text-lg font-black text-slate-900">
            Table of Contents
          </h3>

          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {tableOfContents.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-white hover:text-blue-900"
                >
                  <span className="font-bold text-blue-500">
                    {index + 1}.
                  </span>

                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <div className="mt-7 space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
          <p>
            This free concrete calculator helps estimate the amount of
            concrete required for common residential and construction
            projects. Enter the dimensions of the area, choose your
            measurement units, and the calculator estimates the required
            concrete volume.
          </p>

          <p>
            Depending on the selected calculation options, you can also
            estimate cement, sand, aggregate, water, material quantities,
            waste allowance, and approximate material cost.
          </p>

          <p>
            The calculator is designed to make concrete quantity estimation
            easier before purchasing materials or preparing a project
            estimate. Results are estimates and should be checked against
            project drawings, specifications, and local construction
            requirements.
          </p>
        </div>

        {/* =================================================
            INFOGRAPHIC
        ================================================= */}

        <figure className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img
            src="/concrete-calculator-infographic.webp"
            alt="Concrete calculator infographic showing length, width, depth, concrete volume calculation, and material planning"
            width={1536}
            height={864}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />

          <figcaption className="px-4 py-3 text-center text-xs leading-5 text-slate-500 sm:text-sm">
            Concrete volume is estimated from project dimensions such as
            length, width, depth, and quantity.
          </figcaption>
        </figure>

        {/* =================================================
            WHAT CAN YOU CALCULATE
        ================================================= */}

        <div
          id="what-can-you-calculate"
          className="mt-8 scroll-mt-24"
        >
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            What Can You Calculate?
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Use the calculator to estimate common concrete quantities and
            material requirements for construction planning.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <FeatureItem text="Concrete volume" />
            <FeatureItem text="Estimated cement bags" />
            <FeatureItem text="Sand quantity" />
            <FeatureItem text="Aggregate quantity" />
            <FeatureItem text="Estimated water requirement" />
            <FeatureItem text="Material waste allowance" />
            <FeatureItem text="Estimated material cost" />
            <FeatureItem text="Multiple concrete sections" />
          </div>
        </div>

        {/* =================================================
            HOW TO USE
        ================================================= */}

        <div
          id="how-to-use"
          className="mt-8 scroll-mt-24"
        >
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            How to Use the Concrete Calculator
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Follow these steps to calculate the estimated concrete quantity
            for your project.
          </p>

          <div className="mt-4 space-y-3">
            <Step
              number="1"
              text="Choose the type of concrete work, such as slab, wall, footing, column, or stairs."
            />

            <Step
              number="2"
              text="Enter the length, width, and depth or height of the concrete section."
            />

            <Step
              number="3"
              text="Select the appropriate measurement unit for each dimension."
            />

            <Step
              number="4"
              text="Enter the quantity if you are calculating multiple identical concrete sections."
            />

            <Step
              number="5"
              text="Choose a concrete mix ratio or enter a custom mix where supported."
            />

            <Step
              number="6"
              text="Enter local material prices if you want an approximate concrete material cost."
            />

            <Step
              number="7"
              text="Review the calculated concrete volume and estimated material requirements."
            />
          </div>
        </div>

        {/* =================================================
            CONCRETE VOLUME
        ================================================= */}

        <div
          id="concrete-volume"
          className="mt-8 scroll-mt-24"
        >
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            How Concrete Volume Is Calculated
          </h3>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              For a basic rectangular concrete section, the volume is
              calculated by multiplying length, width, and depth.
            </p>

            <div className="my-5 rounded-xl border border-blue-100 bg-white px-4 py-4 text-center">
              <p className="text-lg font-black text-slate-900 sm:text-xl">
                Concrete Volume = Length × Width × Depth
              </p>
            </div>

            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              If the same concrete section is repeated, the calculated volume
              is multiplied by the required quantity. The calculator then
              converts the result into the appropriate volume unit.
            </p>
          </div>
        </div>

        {/* =================================================
            MATERIAL ESTIMATE
        ================================================= */}

        <div
          id="material-estimate"
          className="mt-8 scroll-mt-24"
        >
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            Concrete Material Estimate
          </h3>

          <div className="mt-4 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              The calculator estimates material quantities from the entered
              dimensions, quantity, and selected concrete mix ratio. Cement,
              sand, aggregate, and water estimates depend on the calculation
              assumptions and mix settings selected in the calculator.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Cement estimates may use a standard cement density and bag
              size, while water estimates can use a selected water-cement
              ratio. These assumptions are intended for preliminary
              estimating rather than final concrete mix design.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Material prices vary by location, supplier, transportation,
              material quality, quantity purchased, and market conditions.
              Cost results should therefore be treated as estimates rather
              than final quotations.
            </p>
          </div>
        </div>

        {/* =================================================
            INTERNAL LINKS
        ================================================= */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            Related Construction Calculators
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Explore other CornerSpan calculators that can help with
            construction measurements and quantity planning.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <InternalLink
              href="/calculators/area"
              title="Area Calculator"
              description="Calculate the area of common shapes and spaces."
            />

            <InternalLink
              href="/calculators/square-footage"
              title="Square Footage Calculator"
              description="Calculate square footage for rooms and surfaces."
            />

            <InternalLink
              href="/calculators/brick"
              title="Brick Calculator"
              description="Estimate bricks required for a wall."
            />

            <InternalLink
              href="/calculators"
              title="All Construction Calculators"
              description="Browse the complete CornerSpan calculator collection."
            />
          </div>
        </div>

        {/* =================================================
            UNITS
        ================================================= */}

        <div
          id="supported-units"
          className="mt-8 scroll-mt-24"
        >
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            Supported Measurement Units
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            The calculator supports common construction measurement units
            so you can enter dimensions using the units normally used for
            your project.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Meters",
              "Feet",
              "Centimeters",
              "Millimeters",
              "Inches",
            ].map((unit) => (
              <span
                key={unit}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 sm:text-sm"
              >
                {unit}
              </span>
            ))}
          </div>
        </div>

        {/* =================================================
            ACCURACY
        ================================================= */}

        <div
          id="accuracy"
          className="mt-8 scroll-mt-24"
        >
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            Accuracy and Estimation
          </h3>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm leading-7 text-amber-900 sm:text-base">
              Calculator results are intended for preliminary quantity and
              cost estimation. Actual concrete requirements can vary because
              of project dimensions, mix design, aggregate grading, moisture,
              compaction, formwork, wastage, construction methods, and site
              conditions.
            </p>

            <p className="mt-3 text-sm leading-7 text-amber-900 sm:text-base">
              For structural concrete, always follow the project-specific
              engineering design, construction drawings, specifications, and
              applicable local standards.
            </p>
          </div>
        </div>

        {/* =================================================
            EXTERNAL REFERENCE
        ================================================= */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            Concrete Standards and Professional Reference
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            For professional concrete design, specifications, testing, and
            construction guidance, consult recognized engineering
            organizations and the standards applicable to your project.
          </p>

          <a
            href="https://www.concrete.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-900"
          >
            American Concrete Institute (ACI)
            <span className="ml-2" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        {/* =================================================
            FINAL NOTE
        ================================================= */}

        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h3 className="text-base font-bold text-blue-900 sm:text-lg">
            Planning Tip
          </h3>

          <p className="mt-2 text-sm leading-7 text-blue-800 sm:text-base">
            Before ordering concrete or construction materials, verify the
            calculated dimensions, openings, quantities, waste allowance,
            mix requirements, and local material prices. For major structural
            work, use the project drawings and professional engineering
            specifications as the final reference.
          </p>
        </div>
      </div>
    </section>
  );
}


/* =========================================================
   FEATURE ITEM
========================================================= */

function FeatureItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700"
      >
        ✓
      </span>

      <span className="text-sm font-semibold text-slate-700 sm:text-base">
        {text}
      </span>
    </div>
  );
}


/* =========================================================
   STEP
========================================================= */

function Step({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
        {number}
      </span>

      <p className="pt-0.5 text-sm leading-6 text-slate-600 sm:text-base">
        {text}
      </p>
    </div>
  );
}


/* =========================================================
   INTERNAL LINK
========================================================= */

function InternalLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
    >
      <span className="block text-sm font-bold text-blue-700 sm:text-base">
        {title}
      </span>

      <span className="mt-1 block text-xs leading-5 text-slate-600 sm:text-sm">
        {description}
      </span>
    </a>
  );
}
