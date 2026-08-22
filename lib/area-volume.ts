export function rectangleArea(length: number, width: number): number {
  return Math.max(0, length) * Math.max(0, width);
}

export function cubicFeetFromAreaDepth(areaFt2: number, depthFt: number): number {
  return Math.max(0, areaFt2) * Math.max(0, depthFt);
}

export function cubicFeetFromInchDepth(areaFt2: number, depthInches: number): number {
  return cubicFeetFromAreaDepth(areaFt2, Math.max(0, depthInches) / 12);
}

export function cubicFeetToCubicYards(cubicFeet: number): number {
  return Math.max(0, cubicFeet) / 27;
}

export function cubicYardsToCubicFeet(cubicYards: number): number {
  return Math.max(0, cubicYards) * 27;
}
