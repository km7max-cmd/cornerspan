import UnitSelect from "./UnitSelect";

type PriceField<T extends string> = {
  key: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: T;
  unitOptions: { label: string; value: T }[];
  onUnitChange: (value: T) => void;
};

type Props<T extends string> = {
  title?: string;
  fields: PriceField<T>[];
};

export default function CostSection<T extends string>({
  title = "Pricing",
  fields,
}: Props<T>) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <div className="mt-3 space-y-3">
        {fields.map((field) => (
          <div key={field.key} className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <label className="text-sm font-semibold text-slate-700">{field.label}</label>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input
                type="number"
                min="0"
                step="0.01"
                value={field.value}
                onChange={(event) => field.onChange(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
              <UnitSelect
                value={field.unit}
                options={field.unitOptions}
                onChange={field.onUnitChange}
                ariaLabel={`${field.label} unit`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
