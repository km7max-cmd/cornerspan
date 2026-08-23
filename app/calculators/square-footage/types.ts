export type Unit =
  | "feet"
  | "inches"
  | "yards"
  | "meters";

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
  lengthInches: string;

  width: string;
  widthInches: string;

  height: string;
  heightInches: string;

  quantity: string;

  unit: Unit;

  borderWidth: string;
  borderWidthInches: string;

  sideA: string;
  sideAInches: string;

  sideB: string;
  sideBInches: string;

  sideC: string;
  sideCInches: string;

  windowWidth: string;
  windowWidthInches: string;

  windowHeight: string;
  windowHeightInches: string;

  windowQuantity: string;

  knownArea: string;

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
