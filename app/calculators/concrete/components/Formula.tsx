export default function Formula() {
  return (
    <section className="mt-10 rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="text-3xl font-black text-slate-900">
        Formula
      </h2>

      <p className="mt-3 text-slate-600">
        The calculator uses standard civil engineering formulas to estimate
        concrete volume and material quantities.
      </p>

      <div className="mt-8 space-y-5">

        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900">
            Concrete Volume
          </h3>

          <code className="mt-3 block rounded-xl bg-slate-100 p-4 text-lg font-bold">
            Volume = Length × Width × Depth
          </code>
        </div>

        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900">
            Dry Volume
          </h3>

          <code className="mt-3 block rounded-xl bg-slate-100 p-4 text-lg font-bold">
            Dry Volume = Wet Volume × 1.54
          </code>
        </div>

        <div className="rounded-2xl border border-slate-200 p-5">
          <h3 className="font-bold text-slate-900">
            Cement Bags
          </h3>

          <code className="mt-3 block rounded-xl bg-slate-100 p-4 text-lg font-bold">
            Cement Bags = Concrete Volume × 29
          </code>
        </div>

      </div>

    </section>
  );
}
