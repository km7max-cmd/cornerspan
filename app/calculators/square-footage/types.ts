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
  width: string;
  height: string;

  quantity: string;

  unit: Unit;

  borderWidth: string;

  sideA: string;
  sideB: string;
  sideC: string;

  windowWidth: string;
  windowHeight: string;
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
