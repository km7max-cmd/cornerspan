
const tableOfContents = [
  { id: "about-concrete-calculator", label: "About This Calculator" },
  { id: "what-can-you-calculate", label: "What Can You Calculate?" },
  { id: "how-to-use", label: "How to Use the Calculator" },
  { id: "concrete-volume", label: "How Concrete Volume Is Calculated" },
  { id: "material-estimate", label: "Concrete Material Estimates" },
  { id: "supported-units", label: "Supported Measurement Units" },
  { id: "accuracy", label: "Accuracy and Limitations" },
];

export default function AboutCalculator() {
  return (
    <section
      className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
      aria-labelledby="about-concrete-calculator"
    >
      <header className="border-b border-slate-100 px-5 py-5 sm:px-7">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          Concrete Calculator Guide
        </p>

        <h2
          id="about-concrete-calculator"
          className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl"
        >
          About This Concrete Calculator
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          Estimate concrete volume in cubic yards and cubic feet, along
          with cement, sand, aggregate, water and approximate material
          costs for common construction projects.
        </p>
      </header>

      <div className="px-5 py-5 sm:px-7 sm:py-7">
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

        <div
          id="about-concrete-calculator"
          className="mt-7 scroll-mt-24 space-y-5 text-sm leading-7 text-slate-600 sm:text-base"
        >
          <p>
            This free concrete calculator helps homeowners, contractors
            and DIY users estimate the amount of concrete needed for
            projects such as slabs, footings, walls and columns. Enter
            the dimensions, select a measurement unit and calculate the
            estimated concrete volume.
          </p>

          <p>
            For projects in the United States, the results can be
            understood in cubic yards and cubic feet. The calculator
            also estimates cement bags, sand, aggregate and mixing water
            using its selected calculation assumptions.
          </p>

          <p>
            Use the estimates for preliminary material planning. Actual
            ordering quantities and concrete mix requirements should be
            verified against project specifications and supplier guidance.
          </p>
        </div>

        <figure className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <img
            src="/concrete-calculator-infographic.webp"
            alt="Concrete volume calculation using length, width and depth, with material quantity estimates"
            width={1536}
            height={864}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-3 text-center text-xs leading-5 text-slate-500 sm:text-sm">
            Concrete volume depends on the dimensions and quantity of
            each section.
          </figcaption>
        </figure>

        <section
          id="what-can-you-calculate"
          className="mt-8 scroll-mt-24"
        >
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            What Can You Calculate?
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Use these estimates to plan material quantities before
            contacting a concrete supplier.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <FeatureItem text="Wet concrete volume" />
            <FeatureItem text="Volume in cubic yards and cubic feet" />
            <FeatureItem text="Estimated 94 lb cement bags" />
            <FeatureItem text="Sand quantity" />
            <FeatureItem text="Aggregate quantity" />
            <FeatureItem text="Estimated mixing water" />
            <FeatureItem text="Material cost based on entered prices" />
            <FeatureItem text="Multiple identical sections" />
          </div>
        </section>

        <section id="how-to-use" className="mt-8 scroll-mt-24">
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            How to Use the Concrete Calculator
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Follow these steps to estimate the concrete requirements
            for your project.
          </p>

          <div className="mt-4 space-y-3">
            <Step
              number="1"
              text="Select the concrete project type available in the calculator."
            />
            <Step
              number="2"
              text="Enter the length, width and depth or thickness."
            />
            <Step
              number="3"
              text="Choose the appropriate unit for each dimension, such as feet or inches."
            />
            <Step
              number="4"
              text="Enter the number of identical sections you need to calculate."
            />
            <Step
              number="5"
              text="Select an available concrete mix ratio or enter a custom ratio if supported."
            />
            <Step
              number="6"
              text="Optionally enter local prices for cement, sand and aggregate."
            />
            <Step
              number="7"
              text="Calculate and review the estimated volume, materials and cost."
            />
          </div>
        </section>

        <section id="concrete-volume" className="mt-8 scroll-mt-24">
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            How Concrete Volume Is Calculated
          </h3>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              For a rectangular slab, multiply its length by its width
              and thickness. Convert all measurements to the same unit
              before multiplying.
            </p>

            <div className="my-5 rounded-xl border border-blue-100 bg-white px-4 py-4 text-center">
              <p className="text-lg font-black text-slate-900 sm:text-xl">
                Volume = Length × Width × Thickness
              </p>
            </div>

            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              For measurements in feet, the result is cubic feet.
              Divide cubic feet by 27 to convert to cubic yards.
              For example, a 10 ft × 10 ft slab with a 4-inch
              thickness has a theoretical volume of approximately
              33.33 ft³, or 1.23 yd³.
            </p>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-bold text-slate-900">
                Useful US volume conversions
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li>1 cubic yard = 27 cubic feet</li>
                <li>1 cubic yard ≈ 0.7646 cubic meters</li>
                <li>1 cubic meter ≈ 35.3147 cubic feet</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="material-estimate" className="mt-8 scroll-mt-24">
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            Concrete Material Estimates
          </h3>

          <div className="mt-4 space-y-4 rounded-2xl bg-slate-50 p-5">
            <div>
              <h4 className="font-bold text-slate-900">
                Cement bags
              </h4>
              <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
                The US-oriented estimate uses a 94 lb cement bag.
                The number of bags depends on the concrete volume,
                selected mix ratio and calculation assumptions.
                This is an estimate for cement as an ingredient,
                not premixed concrete bags.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900">
                Sand and aggregate
              </h4>
              <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
                Quantities are estimated from the selected mix ratio
                and dry-volume factor. Material density is used when
                converting volume into weight-based pricing units.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900">
                Water requirement
              </h4>
              <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
                The calculator uses an estimated water-cement ratio.
                Actual water requirements depend on the specified
                mix design, aggregate moisture, admixtures and
                workability requirements.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900">
                Material cost
              </h4>
              <p className="mt-1 text-sm leading-7 text-slate-600 sm:text-base">
                Enter the unit price for each material to estimate
                its cost. The result depends on the price, selected
                unit, material density and calculated quantity.
                Supplier delivery fees, labor, equipment, taxes and
                other expenses are not necessarily included.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            Related Construction Calculators
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Explore other CornerSpan tools for construction
            measurements and material planning.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <InternalLink
              href="/calculators/area"
              title="Area Calculator"
              description="Calculate the area of common geometric shapes."
            />
            <InternalLink
              href="/calculators/brick"
              title="Brick Calculator"
              description="Estimate the number of bricks required for a wall."
            />
            <InternalLink
              href="/calculators/gravel"
              title="Gravel Calculator"
              description="Estimate gravel volume and material quantities."
            />
            <InternalLink
              href="/calculators/paver"
              title="Paver Calculator"
              description="Estimate paver quantities for outdoor surfaces."
            />
          </div>
        </section>

        <section id="supported-units" className="mt-8 scroll-mt-24">
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            Supported Measurement Units
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            Choose the units that match your project measurements.
            Each dimension can use its own supported unit.
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
        </section>

        <section id="accuracy" className="mt-8 scroll-mt-24">
          <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
            Accuracy and Limitations
          </h3>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm leading-7 text-amber-900 sm:text-base">
              The calculator provides preliminary quantity estimates.
              Actual requirements can vary with the mix design,
              aggregate grading, moisture, compaction, formwork
              dimensions and placement losses. The current calculation
              does not add a separate waste allowance.
            </p>

            <p className="mt-3 text-sm leading-7 text-amber-900 sm:text-base">
              For structural concrete, follow the project-specific
              engineering design, construction drawings and applicable
              standards. Verify material quantities with your concrete
              supplier before placing an order.
            </p>
          </div>
        </section>

        <aside className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            Professional Concrete Guidance
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            For professional concrete design, specifications and
            construction guidance, consult the American Concrete
            Institute and the standards applicable to your project.
          </p>

          <a
            href="https://www.concrete.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50"
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

function FeatureItem({ text }: { text: string }) {
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
