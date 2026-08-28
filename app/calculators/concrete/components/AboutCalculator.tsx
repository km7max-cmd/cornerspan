export default function AboutCalculator() {
  return (
    <section className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-slate-100 px-5 py-5 sm:px-7">

        <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
          About the Calculator
        </p>

        <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
          About This Concrete Calculator
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
          A practical tool for estimating concrete volume and common
          material requirements.
        </p>

      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="px-5 py-5 sm:px-7 sm:py-7">

        <div className="space-y-5 text-sm leading-6 text-slate-600 sm:text-base">

          <p>
            This free concrete calculator helps estimate the amount of
            concrete required for common construction work. It calculates
            concrete volume and can also estimate cement, sand, aggregate,
            water, and material cost.
          </p>

          <p>
            Enter the dimensions of the concrete work, select the appropriate
            units, choose a concrete mix ratio, and enter material prices if
            you want an estimated material cost.
          </p>

        </div>

        {/* =================================================
            WHAT CAN YOU CALCULATE
        ================================================= */}

        <div className="mt-7">

          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            What Can You Calculate?
          </h3>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">

            <FeatureItem text="Concrete volume" />

            <FeatureItem text="Estimated cement bags" />

            <FeatureItem text="Sand quantity" />

            <FeatureItem text="Aggregate quantity" />

            <FeatureItem text="Estimated water requirement" />

            <FeatureItem text="Estimated material cost" />

          </div>

        </div>

        {/* =================================================
            HOW TO USE
        ================================================= */}

        <div className="mt-7">

          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            How to Use the Calculator
          </h3>

          <div className="mt-4 space-y-3">

            <Step
              number="1"
              text="Choose the type of concrete work, such as slab, wall, footer, column, or stairs."
            />

            <Step
              number="2"
              text="Enter the length, width, and depth or height."
            />

            <Step
              number="3"
              text="Select the appropriate measurement unit for each dimension."
            />

            <Step
              number="4"
              text="Enter the quantity if you are calculating multiple identical pieces."
            />

            <Step
              number="5"
              text="Choose a concrete mix ratio or enter a custom mix."
            />

            <Step
              number="6"
              text="Enter local material prices if you want to estimate cost."
            />

            <Step
              number="7"
              text="Tap Calculate Concrete to view the estimated requirements."
            />

          </div>

        </div>

        {/* =================================================
            MATERIAL ESTIMATE
        ================================================= */}

        <div className="mt-7 rounded-2xl bg-slate-50 p-5">

          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            Concrete Material Estimate
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
            The calculator estimates material quantities from the entered
            dimensions, quantity, and selected mix ratio. Cement is estimated
            using a 1440 kg/m³ density and a 50 kg standard bag. Water is
            estimated using a 0.50 water-cement ratio.
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Material prices vary by location, supplier, material quality,
            transportation, and market conditions. Cost results should
            therefore be treated as estimates rather than final quotations.
          </p>

        </div>

        {/* =================================================
            UNITS
        ================================================= */}

        <div className="mt-7">

          <h3 className="text-lg font-black text-slate-900 sm:text-xl">
            Supported Measurement Units
          </h3>

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
            FINAL NOTE
        ================================================= */}

        <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">

          <h3 className="text-base font-bold text-amber-900 sm:text-lg">
            Estimation Only
          </h3>

          <p className="mt-2 text-sm leading-6 text-amber-800 sm:text-base">
            This calculator is intended for quantity and cost estimation.
            Actual concrete requirements can vary because of mix design,
            material properties, moisture, aggregate grading, wastage,
            construction methods, and project specifications. Structural
            concrete should follow the project-specific engineering design
            and applicable standards.
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

      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
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
