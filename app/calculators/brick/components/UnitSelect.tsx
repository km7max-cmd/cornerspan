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
  className?: string;
};

export default function UnitSelect({
  value,
  onChange,
  options,
  ariaLabel = "Select unit",
  className = "",
}: UnitSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
      aria-label={ariaLabel}
      className={`
        h-12
        min-w-[92px]
        shrink-0
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
        ${className}
      `}
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
