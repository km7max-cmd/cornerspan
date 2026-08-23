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

  lengthFeet: string;
  lengthInches: string;

  widthFeet: string;
  widthInches: string;

  heightFeet: string;
  heightInches: string;

  quantity: string;

  borderFeet: string;
  borderInches: string;

  sideAFeet: string;
  sideAInches: string;

  sideBFeet: string;
  sideBInches: string;

  sideCFeet: string;
  sideCInches: string;

  windowWidthFeet: string;
  windowWidthInches: string;

  windowHeightFeet: string;
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

export type CalculationError =
  | "Length"
  | "Width"
  | "Height"
  | "Border Width"
  | "Side A"
  | "Side B"
  | "Side C"
  | "Window Width"
  | "Window Height"
  | "Area"
  | null;
