import DimensionInputRow from "./DimensionInputRow";
import UnitSelect, { LENGTH_OPTIONS } from "./UnitSelect";
import type { LengthUnit } from "../../lib/units";

type Props = {
  title: string;
  quantity: string;
  onQuantityChange: (value: string) => void;
  width: string;
  onWidthChange: (value: string) => void;
  widthUnit: LengthUnit;
  onWidthUnitChange: (value: LengthUnit) => void;
  height: string;
  onHeightChange: (value: string) => void;
  heightUnit: LengthUnit;
  onHeightUnitChange: (value: LengthUnit) => void;
};

export default function OpeningSection({
  title,
  quantity,
  onQuantityChange,
  width,
  onWidthChange,
  widthUnit,
  onWidthUnitChange,
  height,
  onHeightChange,
  heightUnit,
  onHeightUnitChange,
}: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-base font-bold text-slate-900">{title}</h3>

      <div className="mt-3 space-y-3">
        <label className="block text-sm font-semibold text-slate-700">
          Quantity
          <input
            type="number"
            min="0"
            step="1"
            value={quantity}
            onChange={(event) => onQuantityChange(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          />
        </label>

        <DimensionInputRow
          label="Width"
          value={width}
          onValueChange={onWidthChange}
          unit={widthUnit}
          unitOptions={LENGTH_OPTIONS}
          onUnitChange={onWidthUnitChange}
          placeholder="0"
        />

        <DimensionInputRow
          label="Height"
          value={height}
          onValueChange={onHeightChange}
          unit={heightUnit}
          unitOptions={LENGTH_OPTIONS}
          onUnitChange={onHeightUnitChange}
          placeholder="0"
        />
      </div>
    </section>
  );
}
