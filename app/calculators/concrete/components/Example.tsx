export default function Example() {
  return (
    <section className="mt-10 rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="text-3xl font-black text-slate-900">
        Worked Example
      </h2>

      <p className="mt-3 text-slate-600">
        Example calculation using common slab dimensions.
      </p>

      <div className="mt-8 rounded-2xl border border-slate-200 p-6">

        <h3 className="text-xl font-bold text-slate-900">
          Input Values
        </h3>

        <ul className="mt-4 space-y-2 text-slate-700">
          <li>• Length = 10 m</li>
          <li>• Width = 5 m</li>
          <li>• Depth = 0.15 m</li>
        </ul>

        <hr className="my-6" />

        <h3 className="text-xl font-bold text-slate-900">
          Step 1 – Concrete Volume
        </h3>

        <code className="mt-3 block rounded-xl bg-slate-100 p-4 text-lg font-bold">
          10 × 5 × 0.15 = 7.50 m³
        </code>

        <h3 className="mt-8 text-xl font-bold text-slate-900">
          Step 2 – Dry Volume
        </h3>

        <code className="mt-3 block rounded-xl bg-slate-100 p-4 text-lg font-bold">
          7.50 × 1.54 = 11.55 m³
        </code>

        <h3 className="mt-8 text-xl font-bold text-slate-900">
          Step 3 – Cement Bags
        </h3>

        <code className="mt-3 block rounded-xl bg-slate-100 p-4 text-lg font-bold">
          7.50 × 29 = 218 Bags
        </code>

        <h3 className="mt-8 text-xl font-bold text-slate-900">
          Step 4 – Sand
        </h3>

        <code className="mt-3 block rounded-xl bg-slate-100 p-4 text-lg font-bold">
          11.55 × 0.42 = 4.85 m³
        </code>

        <h3 className="mt-8 text-xl font-bold text-slate-900">
          Step 5 – Aggregate
        </h3>

        <code className="mt-3 block rounded-xl bg-slate-100 p-4 text-lg font-bold">
          11.55 × 0.84 = 9.70 m³
        </code>

      </div>

    </section>
  );
}
