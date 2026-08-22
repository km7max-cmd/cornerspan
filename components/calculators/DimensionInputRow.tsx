import UnitSelect from "./UnitSelect";

type UnitOption<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  unit: T;
  unitOptions: UnitOption<T>[];
  onUnitChange: (unit: T) => void;
  placeholder: string;
  step?: string;
};

export default function DimensionInputRow<T extends string>({
  label,
  value,
  onValueChange,
  unit,
  unitOptions,
  onUnitChange,
  placeholder,
  step = "0.01",
}: Props<T>) {
  return (
    <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          type="number"
          step={step}
          min="0"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
        />
        <UnitSelect
          value={unit}
          options={unitOptions}
          onChange={onUnitChange}
          ariaLabel={`${label} unit`}
        />
      </div>
    </div>
  );
}
