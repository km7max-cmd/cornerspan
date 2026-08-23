export type Unit =
  | "feet"
  | "inches"
  | "meters"
  | "yards";

export type Shape =
  | "Known Area"
  | "Room"
  | "Wall with Window"
  | "Cathedral Wall"
  | "Square"
  | "Rectangle"
  | "Rectangle Border"
  | "Circle"
  | "Circle Border"
  | "Annulus"
  | "Triangle"
  | "Triangle 1/2 b×h"
  | "Trapezoid";

export type CalculatorInputs = {
  shape: Shape;

  length: string;
  lengthUnit: Unit;

  width: string;
  widthUnit: Unit;

  height: string;
  heightUnit: Unit;

  quantity: string;

  borderWidth: string;
  borderWidthUnit: Unit;

  sideA: string;
  sideAUnit: Unit;

  sideB: string;
  sideBUnit: Unit;

  sideC: string;
  sideCUnit: Unit;

  windowWidth: string;
  windowWidthUnit: Unit;

  windowHeight: string;
  windowHeightUnit: Unit;

  windowQuantity: string;

  knownArea: string;
  knownAreaUnit: Unit;

  waste: string;
  price: string;
};

export type CalculationResult = {
  squareFeet: number;
  squareInches: number;
  squareYards: number;
  squareMeters: number;
  acres: number;
  cost: number | null;
};
