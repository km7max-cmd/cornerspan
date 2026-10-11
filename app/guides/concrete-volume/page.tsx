import Link from "next/link";
export const metadata = {
  title:
    "Concrete Volume Calculator Guide: Slabs, Cubic Yards & Examples | CornerSpan",
  description:
    "Learn how to calculate concrete volume for slabs, beams and columns in cubic feet, cubic yards and cubic meters, with worked examples and conversion formulas.",
  alternates: {
    canonical: "/guides/concrete-volume",
  },
};

const conversions = [
  ["1 cubic yard", "27 cubic feet"],
  ["1 cubic meter", "35.3147 cubic feet"],
  ["1 cubic yard", "0.7646 cubic meters"],
  ["1 foot", "12 inches"],
];

export default function ConcreteVolumeGuide() {
  return (
    <main className="min-h-screen bg-white pt-[80px] text-slate-900">
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <Link
            href="/guides"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Construction Guides
          </Link>

          <p className="mt-6 text-sm font-bold uppercase tracking-wider text-blue-600">
            Concrete Calculation Guide
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight md:text-5xl">
            How to Calculate Concrete Volume for Slabs, Beams and Columns
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
            Estimate the concrete required for a construction project using
            simple volume formulas. This guide explains dimensions, US
            customary units, metric conversions, worked examples and ordering
            allowances.
          </p>

          <Link
            href="/calculators/concrete"
            className="mt-7 inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
          >
            Open Concrete Calculator <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-10 md:py-14">
        <nav
          aria-label="Table of contents"
          className="rounded-xl border border-slate-200 bg-slate-50 p-6"
        >
          <h2 className="text-lg font-bold">In This Guide</h2>
          <ul className="mt-4 grid gap-3 text-sm text-blue-700 sm:grid-cols-2">
            <li><a className="hover:underline" href="#formula">Volume formula</a></li>
            <li><a className="hover:underline" href="#units">Units and conversions</a></li>
            <li><a className="hover:underline" href="#slab-example">Slab example</a></li>
            <li><a className="hover:underline" href="#other-shapes">Beams and columns</a></li>
            <li><a className="hover:underline" href="#ordering">Ordering concrete</a></li>
            <li><a className="hover:underline" href="#mistakes">Common mistakes</a></li>
            <li><a className="hover:underline" href="#faq">FAQs</a></li>
          </ul>
        </nav>

        <section className="mt-12">
          <h2 className="text-2xl font-bold md:text-3xl">
            What Is Concrete Volume?
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Concrete volume is the three-dimensional space that concrete must
            fill. It is commonly measured in cubic feet or cubic yards in the
            United States and cubic meters in metric calculations. Accurate
            dimensions help estimate the required concrete before ordering.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            The required volume depends on the shape, length, width and depth
            of the structure. Irregular ground, uneven forms, openings and
            changes in thickness can affect the final quantity.
          </p>
        </section>

        <section id="formula" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Concrete Volume Formula
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            For a rectangular slab, multiply its length by its width and
            thickness. Convert every measurement to the same unit before
            multiplying.
          </p>
          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Rectangular Volume
            </p>
            <p className="mt-3 text-2xl font-extrabold text-blue-700 md:text-3xl">
              Length × Width × Thickness
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Feet × feet × feet = cubic feet
            </p>
          </div>
          <p className="mt-5 leading-8 text-slate-600">
            For a rectangular structure, volume is calculated from its
            external dimensions. If the dimensions are measured in feet, the
            result is in cubic feet. Divide cubic feet by 27 to convert the
            result to cubic yards.
          </p>
        </section>

        <section id="units" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Concrete Volume Units and Conversions
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Concrete suppliers in the United States commonly quote ready-mix
            concrete in cubic yards. Some calculators and technical plans
            use cubic feet or cubic meters. Converting correctly prevents
            ordering errors.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 font-semibold">Conversion</th>
                  <th className="px-5 py-4 font-semibold">Equivalent</th>
                </tr>
              </thead>
              <tbody>
                {conversions.map(([unit, equivalent]) => (
                  <tr key={unit} className="border-t border-slate-200">
                    <td className="px-5 py-4 text-slate-700">{unit}</td>
                    <td className="px-5 py-4 font-semibold">{equivalent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="mt-7 text-xl font-bold">
            How to Convert Cubic Feet to Cubic Yards
          </h3>
          <p className="mt-3 leading-8 text-slate-600">
            Divide the volume in cubic feet by 27. For example, 54 cubic feet
            ÷ 27 = 2 cubic yards. To convert cubic yards to cubic feet,
            multiply the cubic yards by 27.
          </p>
          <div className="mt-5 rounded-xl bg-slate-50 p-5">
            <p className="font-semibold">Cubic yards = cubic feet ÷ 27</p>
            <p className="mt-2 text-slate-600">
              Cubic meters = cubic feet ÷ 35.3147
            </p>
          </div>
        </section>

        <section id="slab-example" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Example: Concrete for a 10 × 12 Foot Slab
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            Suppose you are preparing a rectangular slab that is 10 feet long,
            12 feet wide and 4 inches thick. First, convert the thickness
            from inches to feet.
          </p>
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 font-semibold">Measurement</th>
                  <th className="px-5 py-4 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">Length</td>
                  <td className="px-5 py-4 font-semibold">10 ft</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">Width</td>
                  <td className="px-5 py-4 font-semibold">12 ft</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-4">Thickness</td>
                  <td className="px-5 py-4 font-semibold">4 in ÷ 12 = 0.3333 ft</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 p-6">
            <p className="font-semibold">Step 1: Calculate cubic feet</p>
            <p className="mt-2 text-slate-700">
              10 × 12 × (4 ÷ 12) = 40 cubic feet
            </p>
            <p className="mt-5 font-semibold">Step 2: Convert to cubic yards</p>
            <p className="mt-2 text-slate-700">40 ÷ 27 = 1.48 cubic yards</p>
            <p className="mt-5 text-xl font-extrabold text-blue-700">
              Estimated volume: 1.48 yd³
            </p>
          </div>
          <p className="mt-5 leading-8 text-slate-600">
            This is the geometric volume, not a guaranteed delivery quantity.
            Check the actual form dimensions and discuss a suitable ordering
            allowance with your concrete supplier before placing an order.
          </p>
          <Link
            href="/calculators/concrete"
            className="mt-5 inline-flex font-semibold text-blue-700 hover:underline"
          >
            Calculate your own slab dimensions →
          </Link>
        </section>

        <section id="other-shapes" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Concrete Volume for Beams and Columns
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            The same volume principle applies to rectangular beams and
            columns. Use the appropriate dimensions and keep all measurements
            in consistent units.
          </p>

          <h3 className="mt-7 text-xl font-bold">Rectangular Beam Example</h3>
          <p className="mt-3 leading-8 text-slate-600">
            Consider a beam that is 12 feet long, 1 foot wide and 1.5 feet
            deep.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 p-5">
            <p className="font-semibold">Volume = length × width × depth</p>
            <p className="mt-2 text-slate-700">12 × 1 × 1.5 = 18 cubic feet</p>
            <p className="mt-2 text-slate-700">18 ÷ 27 = 0.67 cubic yards</p>
          </div>

          <h3 className="mt-7 text-xl font-bold">Rectangular Column Example</h3>
          <p className="mt-3 leading-8 text-slate-600">
            Suppose a column is 1.5 feet wide, 1.5 feet deep and 10 feet
            tall.
          </p>
          <div className="mt-4 rounded-xl border border-slate-200 p-5">
            <p className="font-semibold">Volume = width × depth × height</p>
            <p className="mt-2 text-slate-700">1.5 × 1.5 × 10 = 22.5 cubic feet</p>
            <p className="mt-2 text-slate-700">22.5 ÷ 27 = 0.83 cubic yards</p>
          </div>

          <h3 className="mt-7 text-xl font-bold">Circular Column Formula</h3>
          <p className="mt-3 leading-8 text-slate-600">
            For a cylindrical column, multiply pi by the radius squared and
            then by the height. The radius is half the diameter. Use the same
            unit for radius and height.
          </p>
          <div className="mt-4 rounded-xl bg-slate-50 p-5">
            <p className="font-semibold">Volume = π × radius² × height</p>
          </div>
          <p className="mt-4 leading-8 text-slate-600">
            For connected slabs, beams or columns, take care not to count
            overlapping concrete regions twice when combining individual
            volumes.
          </p>
        </section>

        <section id="ordering" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            How Much Extra Concrete Should You Order?
          </h2>
          <p className="mt-4 leading-8 text-slate-600">
            The calculated volume describes the space to be filled. The
            amount ordered may differ because of uneven subgrade, formwork
            variation, spillage, handling losses and placement conditions.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            For illustration, adding a 10% allowance to the 40-cubic-foot
            slab example gives 44 cubic feet, or about 1.63 cubic yards.
            This is only an example of the arithmetic, not a universal
            recommendation that every project needs 10% extra.
          </p>
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-bold">Before ordering</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
              <li>Measure the actual length, width and thickness.</li>
              <li>Check the base and formwork for uneven areas.</li>
              <li>Confirm the order quantity and delivery increments with the supplier.</li>
              <li>Follow the project's specifications and the responsible professional's instructions.</li>
            </ul>
          </div>
        </section>

        <section id="mistakes" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Common Concrete Volume Calculation Mistakes
          </h2>
          <div className="mt-6 space-y-5">
            <div>
              <h3 className="font-bold">Mixing feet and inches</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Convert thickness in inches to feet before multiplying
                dimensions measured in feet. For example, 4 inches is
                4 ÷ 12 = 0.3333 feet.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Confusing square and cubic units</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Square feet measure area. Cubic feet and cubic yards measure
                volume. A concrete estimate needs thickness as well as area.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Using nominal instead of actual dimensions</h3>
              <p className="mt-2 leading-7 text-slate-600">
                Use the dimensions specified for the actual pour, including
                the planned thickness and formwork measurements.
              </p>
            </div>
            <div>
              <h3 className="font-bold">Treating the estimate as an exact order</h3>
              <p className="mt-2 leading-7 text-slate-600">
                A volume calculation is an estimate based on dimensions.
                Confirm site conditions and the delivery quantity before
                ordering concrete.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-xl bg-slate-900 px-6 py-8 md:px-8">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Calculate Concrete for Your Project
          </h2>
          <p className="mt-3 leading-7 text-slate-300">
            Use the CornerSpan concrete calculator to work with your own
            dimensions and estimate the required volume.
          </p>
          <Link
            href="/calculators/concrete"
            className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
          >
            Open Concrete Calculator →
          </Link>
        </section>

        <section id="faq" className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Concrete Volume FAQs
          </h2>
          <div className="mt-6 divide-y divide-slate-200">
            <div className="py-5">
              <h3 className="text-lg font-bold">
                How many cubic yards of concrete do I need for a 10 × 12 slab?
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                At 4 inches thick, a 10 × 12 foot slab has a geometric volume
                of 40 cubic feet, or about 1.48 cubic yards, before any
                additional ordering allowance.
              </p>
            </div>
            <div className="py-5">
              <h3 className="text-lg font-bold">
                How do I calculate concrete in cubic yards?
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Calculate the volume in cubic feet, then divide by 27 to
                convert it to cubic yards.
              </p>
            </div>
            <div className="py-5">
              <h3 className="text-lg font-bold">
                How thick should a concrete slab be?
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                The required thickness depends on the slab's purpose, loading,
                ground conditions and local requirements. Follow the project
                design rather than choosing thickness from a volume
                calculator alone.
              </p>
            </div>
            <div className="py-5">
              <h3 className="text-lg font-bold">
                Does concrete volume include reinforcement?
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                The basic geometric estimate uses the dimensions of the
                concrete section. Reinforcement design and placement must
                follow the project's specifications.
              </p>
            </div>
            <div className="py-5">
              <h3 className="text-lg font-bold">
                Is one cubic yard always enough for a small slab?
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                No. The required quantity depends on the slab's length, width
                and thickness. Calculate the volume first and confirm the
                order quantity with your supplier.
              </p>
            </div>
            <div className="py-5">
              <h3 className="text-lg font-bold">
                Can I calculate concrete volume in cubic meters?
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Yes. Convert all dimensions to meters before multiplying.
                The resulting volume is in cubic meters. One cubic meter is
                approximately 35.3147 cubic feet.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 border-t border-slate-200 pt-10">
          <h2 className="text-2xl font-bold md:text-3xl">
            Related Construction Guides
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Explore related construction measurement topics on CornerSpan.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/guides/brick-calculation"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Brick
              </p>
              <h3 className="mt-2 text-lg font-bold">Brick Calculation Guide</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Estimate brick quantities for a wall using dimensions and
                mortar joints.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>
            <Link
              href="/guides/steel-weight"
              className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Steel
              </p>
              <h3 className="mt-2 text-lg font-bold">Steel Weight Guide</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Understand steel bar weight calculations using diameter
                and length.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                Read guide →
              </span>
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
