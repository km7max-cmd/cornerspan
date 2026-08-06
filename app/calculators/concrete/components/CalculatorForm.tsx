type CalculatorFormProps = {
  length: string;
  width: string;
  depth: string;
  unit: string;
  setLength: (value: string) => void;
  setWidth: (value: string) => void;
  setDepth: (value: string) => void;
  setUnit: (value: string) => void;
};

export default function CalculatorForm({
  length,
  width,
  depth,
  unit,
  setLength,
  setWidth,
  setDepth,
  setUnit,
}: CalculatorFormProps) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Concrete Dimensions
      </h2>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Length
          </label>

          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="Enter length"
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Width
          </label>

          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="Enter width"
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Depth
          </label>

          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            placeholder="Enter depth"
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Unit
          </label>

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
          >
            <option value="Meter">Meter</option>
            <option value="Feet">Feet</option>
            <option value="Centimeter">Centimeter</option>
            <option value="Millimeter">Millimeter</option>
            <option value="Inch">Inch</option>
          </select>
        </div>

      </div>

    </section>
  );
}
