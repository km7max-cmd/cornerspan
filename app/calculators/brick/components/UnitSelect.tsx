"use client";

type UnitOption = {
  value: string;
  label: string;
};

type UnitSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: UnitOption[];
  ariaLabel?: string;
};

export default function UnitSelect({
  value,
  onChange,
  options,
  ariaLabel = "Select unit",
}: UnitSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
      aria-label={ariaLabel}
      className="
        h-12
        min-w-[92px]
        border-l
        border-slate-200
        bg-white
        px-3
        text-sm
        font-semibold
        text-blue-700
        outline-none
        transition
        focus:bg-blue-50
      "
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
