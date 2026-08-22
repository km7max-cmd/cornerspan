import type { LengthUnit } from "../../lib/units";

type Option<T extends string> = {
  label: string;
  value: T;
};

type Props<T extends string> = {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
  ariaLabel: string;
};

export default function UnitSelect<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: Props<T>) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as T)}
      aria-label={ariaLabel}
      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export const LENGTH_OPTIONS: { label: string; value: LengthUnit }[] = [
  { label: "ft", value: "ft" },
  { label: "in", value: "in" },
  { label: "yd", value: "yd" },
  { label: "m", value: "m" },
  { label: "cm", value: "cm" },
];
