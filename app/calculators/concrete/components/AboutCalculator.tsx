export default function AboutCalculator() {
  return (
    <section className="mt-6 rounded-3xl bg-white p-5 shadow-lg sm:p-6">
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
        About This Concrete Calculator
      </h2>

      <div className="mt-3 space-y-4 text-sm leading-6 text-slate-600 sm:text-base">
        <p>
          This free concrete calculator helps you estimate the amount of
          concrete needed for construction projects. It can calculate
          concrete volume and estimate cement, sand, aggregate, water, and
          material cost.
        </p>

        <p>
          Enter the length, width, depth, and quantity of your project.
          You can select different measurement units and choose a concrete
          mix ratio to get a practical material estimate.
        </p>

        <h3 className="pt-1 text-lg font-semibold text-slate-900">
          What Can You Calculate?
        </h3>

        <ul className="list-disc space-y-1.5 pl-5">
          <li>Concrete volume for your project</li>
          <li>Estimated cement bags required</li>
          <li>Sand quantity</li>
          <li>Aggregate quantity</li>
          <li>Estimated water requirement</li>
          <li>Estimated concrete material cost</li>
        </ul>

        <h3 className="pt-1 text-lg font-semibold text-slate-900">
          How to Use the Concrete Calculator
        </h3>

        <ol className="list-decimal space-y-1.5 pl-5">
          <li>Enter the length, width, and depth of the work.</li>
          <li>Enter the quantity of concrete required.</li>
          <li>Select the appropriate measurement units.</li>
          <li>Choose the concrete mix ratio.</li>
          <li>Enter local cement, sand, and aggregate prices if required.</li>
          <li>Tap Calculate to view the estimated results.</li>
        </ol>

        <h3 className="pt-1 text-lg font-semibold text-slate-900">
          Concrete Material Estimate
        </h3>

        <p>
          The calculator provides an estimate based on the dimensions,
          quantity, mix ratio, and material settings you enter. Material
          prices can vary by location and supplier, so the cost result
          should be treated as an estimate rather than a final quotation.
        </p>

        <p>
          This online construction calculator is designed to make common
          concrete calculations faster and easier on phones, tablets, and
          computers.
        </p>
      </div>
    </section>
  );
}
