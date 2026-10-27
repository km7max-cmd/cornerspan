import { calculateArea, shapes, unitToFeet, type Shape, type Unit } from "./areaMath";
import { isTransferableArea } from "../shared/areaTransfer";

export const MAX_SECTIONS = 20;
export type AreaSection = {
  id: number;
  name: string;
  shape: Shape;
  unit: Unit;
  operation: "add" | "subtract";
  values: Record<string, string>;
};

export function emptySection(id: number): AreaSection {
  return { id, name: `Section ${id}`, shape: "Rectangle", unit: "feet", operation: "add", values: {} };
}

export function lShapeExample(): AreaSection[] {
  return [
    { ...emptySection(1), name: "Main section", values: { length: "12", width: "10" } },
    { ...emptySection(2), name: "Side section", values: { length: "6", width: "5" } },
  ];
}

export function calculateSections(sections: AreaSection[]) {
  const areas = sections.map(section => shapes.includes(section.shape) && Object.hasOwn(unitToFeet, section.unit)
    && (section.operation === "add" || section.operation === "subtract")
    ? calculateArea(section.shape, section.values, section.unit, "1") : null);
  const empty = { areas, added: null, deducted: null, total: null };
  if (!sections.length || sections.length > MAX_SECTIONS || areas.some(area => !isTransferableArea(area))) {
    return { ...empty, error: "Complete every section with positive measurements. Remove any unused section. Use smaller values if the total exceeds the supported range." };
  }
  let added = 0;
  let deducted = 0;
  sections.forEach((section, i) => {
    if (section.operation === "add") added += areas[i]!;
    else deducted += areas[i]!;
  });
  if (!isTransferableArea(added) || !Number.isFinite(deducted) || deducted > Number.MAX_SAFE_INTEGER) {
    return { ...empty, error: "Add at least one valid section and keep the total within the supported range." };
  }
  const total = added - deducted;
  if (!isTransferableArea(total)) return { areas, added, deducted, total: null, error: "The area being removed must be smaller than the area being added." };
  return { areas, added, deducted, total, error: null };
}
