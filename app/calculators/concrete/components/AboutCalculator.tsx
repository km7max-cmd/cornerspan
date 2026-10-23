const tableOfContents = [
  { id: "about-concrete-calculator", label: "About This Calculator" },
  { id: "what-can-you-calculate", label: "What Can You Calculate?" },
  { id: "how-to-use", label: "How to Use the Calculator" },
  { id: "concrete-volume", label: "How Concrete Volume Is Calculated" },
  { id: "material-estimate", label: "Concrete Material Estimates" },
  { id: "supported-units", label: "Supported Measurement Units" },
  { id: "accuracy", label: "Accuracy and Limitations" },
];

const linkClass =
  "font-semibold text-blue-700 underline decoration-blue-200 underline-offset-2 transition hover:text-blue-900";

export default function AboutCalculator() {
  return (
    <section
      className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby="about-concrete-calculator-heading"
    >
      <header className="border-b border-slate-100 px-5 py-5 sm:px-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          Concrete Calculator Guide
        </p>

        <h2
          id="about-concrete-calculator-heading"
          className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
        >
          Concrete Calculator Guide: Volume, Materials and Cost
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Learn how to estimate concrete volume in cubic yards and cubic
          feet, calculate cement, sand and aggregate quantities, and
          understand the assumptions behind material cost estimates.
        </p>
      </header>

      <div className="px-5 py-5 sm:px-7 sm:py-7">
        {/* Infographic directly below the calculator results */}
        <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img
            src="/concrete-calculator-infographic.webp"
            alt="Concrete calculator infographic showing length, width, thickness, concrete volume and estimated cement, sand and aggregate quantities"
            width={1536}
            height={864}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-center text-xs leading-5 text-slate-500 sm:text-sm">
            Concrete volume and material estimates depend on project
            dimensions, mix ratio and material assumptions.
          </figcaption>
        </figure>

        {/* Table of contents */}
        <nav
          aria-label="Table of contents"
          className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5"
        >
          <h2 className="text-lg font-black text-slate-900">
            Table of Contents
          </h2>

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

        {/* Introduction */}
        <section
          id="about-concrete-calculator"
          className="mt-7 scroll-mt-24 space-y-4 text-sm leading-7 text-slate-600 sm:text-base"
        >
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
            About This Concrete Calculator
          </h2>

          <p>
            This free concrete calculator helps homeowners, contractors
            and DIY users estimate concrete for slabs, footings and other
            rectangular sections. Enter the dimensions, select a unit
            for each measurement, choose a mix ratio and calculate the
            estimated volume and material quantities.
          </p>

          <p>
            For US construction projects, results are presented in cubic
            yards and cubic feet, with metric equivalents where useful.
            If you are planning a slab, first determine its surface area
            with the{" "}
            <a href="/calculators/area" className={linkClass}>
              Area Calculator
            </a>
            , then use the slab thickness to calculate volume.
          </p>

          <p>
            Concrete estimates are only one part of project planning.
            For a masonry wall, the{" "}
            <a href="/calculators/brick" className={linkClass}>
              Brick Calculator
            </a>{" "}
            can help estimate brick quantities. For a driveway or
            sub-base, use the{" "}
            <a href="/calculators/gravel" className={linkClass}>
              Gravel Calculator
            </a>{" "}
            to estimate aggregate material. For an outdoor patio, the{" "}
            <a href="/calculators/paver" className={linkClass}>
              Paver Calculator
            </a>{" "}
            can help plan paver quantities.
          </p>
        </section>

        {/* What it calculates */}
        <section
          id="what-can-you-calculate"
          className="mt-8 scroll-mt-24"
        >
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
            What Can You Calculate?
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
            The calculator estimates the quantities needed for
            preliminary material planning. Available outputs include:
          </p>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Wet concrete volume",
              "Volume in cubic yards and cubic feet",
              "Estimated 94 lb cement bags",
              "Sand quantity",
              "Aggregate quantity",
              "Estimated mixing water",
              "Material cost from entered prices",
              "Multiple identical sections",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700"
                >
                  ✓
                </span>
                <span className="text-sm font-medium leading-6 text-slate-700 sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* How to use */}
        <section id="how-to-use" className="mt-8 scroll-mt-24">
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
            How to Use the Concrete Calculator
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
            Follow these steps to estimate the concrete requirements
            for your project.
          </p>

          <ol className="mt-4 space-y-3">
            {[
              "Enter the length, width and depth or thickness.",
              "Choose the correct unit for each dimension, such as feet or inches.",
              "Enter the number of identical sections you want to calculate.",
              "Select the concrete mix ratio supported by the calculator.",
              "Optionally enter cement, sand and aggregate prices to estimate material cost.",
              "Calculate the result and review the volume, material quantities and cost.",
            ].map((text, index) => (
              <li
                key={text}
                className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span className="pt-0.5 text-sm leading-6 text-slate-600 sm:text-base">
                  {text}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Volume formula */}
        <section id="concrete-volume" className="mt-8 scroll-mt-24">
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
            How Concrete Volume Is Calculated
          </h2>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              For a rectangular slab, multiply the length by the width
              and the thickness. All dimensions must be converted to
              consistent units before multiplying.
            </p>

            <div className="my-5 rounded-xl border border-blue-100 bg-white px-4 py-5 text-center">
              <p className="text-lg font-black text-slate-900 sm:text-xl">
                Volume = Length × Width × Thickness
              </p>
            </div>

            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              For example, a 10 ft × 10 ft slab with a 4-inch thickness
              has a theoretical volume of about 33.33 cubic feet, or
              1.23 cubic yards. This is the wet concrete volume before
              any separate allowance for placement waste.
            </p>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="font-bold text-slate-900">
                US Volume Conversions
              </h3>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                <li>1 cubic yard = 27 cubic feet</li>
                <li>1 cubic yard ≈ 0.7646 cubic meters</li>
                <li>1 cubic meter ≈ 35.3147 cubic feet</li>
              </ul>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              If the project includes adjacent paving or a patio, use
              the{" "}
              <a href="/calculators/paver" className={linkClass}>
                Paver Calculator
              </a>{" "}
              for the paver layout and this calculator for any
              rectangular concrete sections.
            </p>
          </div>
        </section>

        {/* Material estimates */}
        <section id="material-estimate" className="mt-8 scroll-mt-24">
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
            Concrete Material Estimates
          </h2>

          <div className="mt-4 space-y-5 rounded-2xl bg-slate-50 p-5">
            <div>
              <h3 className="font-bold text-slate-900">Cement Bags</h3>
              <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
                This US-oriented estimate uses a 94 lb cement bag.
                Bag counts depend on the calculated cement weight and
                selected mix ratio. This estimates cement as an
                ingredient, not the number of premixed concrete bags
                needed for a project.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Sand and Aggregate
              </h3>
              <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
                Sand and aggregate quantities are estimated from the
                selected mix ratio and dry-volume factor. Their weight
                depends on material density. For separate driveway
                base material planning, the{" "}
                <a href="/calculators/gravel" className={linkClass}>
                  Gravel Calculator
                </a>{" "}
                can provide a complementary estimate.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Water Requirement
              </h3>
              <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
                Water is estimated using the calculator's assumed
                water-cement ratio. Actual water demand depends on the
                specified mix design, aggregate moisture, admixtures
                and required workability. Follow the approved mix
                design for structural concrete.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Material Cost</h3>
              <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
                Enter the price per selected unit for each material.
                The cost estimate depends on the entered price,
                selected unit, material density and calculated
                quantity. Delivery, labor, equipment, taxes and
                other charges may not be included.
              </p>
            </div>
          </div>
        </section>

        {/* Supported units */}
        <section id="supported-units" className="mt-8 scroll-mt-24">
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
            Supported Measurement Units
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
            Choose units that match your measurements. The calculator
            supports these dimension units:
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Feet (ft)",
              "Inches (in)",
              "Meters (m)",
              "Centimeters (cm)",
              "Millimeters (mm)",
            ].map((unit) => (
              <span
                key={unit}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 sm:text-sm"
              >
                {unit}
              </span>
            ))}
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            When comparing measurements from different plans, convert
            dimensions carefully. If you need the area alone before
            calculating concrete volume, open the{" "}
            <a href="/calculators/area" className={linkClass}>
              Area Calculator
            </a>
            .
          </p>
        </section>

        {/* Accuracy and limitations */}
        <section id="accuracy" className="mt-8 scroll-mt-24">
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
            Accuracy and Limitations
          </h2>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm leading-7 text-amber-900 sm:text-base">
              This calculator provides preliminary quantity estimates.
              Actual requirements vary with the mix design, aggregate
              grading, moisture, compaction, formwork dimensions and
              placement losses. The calculation does not add a separate
              waste allowance.
            </p>

            <p className="mt-3 text-sm leading-7 text-amber-900 sm:text-base">
              For structural concrete, follow the project-specific
              engineering design, construction drawings and applicable
              standards. Verify material quantities with your concrete
              supplier before placing an order.
            </p>
          </div>
        </section>

        {/* External reference */}
        <aside className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-lg font-black text-slate-900 sm:text-xl">
            Professional Concrete Guidance
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
            For professional concrete design, specifications and
            construction guidance, consult the American Concrete
            Institute and the standards applicable to your project.
          </p>

          <a
            href="https://www.concrete.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
          >
            American Concrete Institute
            <span className="ml-2" aria-hidden="true">
              ↗
            </span>
          </a>
        </aside>
      </div>
    </section>
  );
}
