import type {
  CalculationResult,
  CalculatorInputs,
  Unit,
} from "./types";

export const unitToFeet: Record<Unit, number> = {
  feet: 1,
  inches: 1 / 12,
  yards: 3,
  meters: 3.280839895,
};

function num(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function positiveQuantity(value: string): number {
  return Math.max(num(value), 1);
}

function toFeet(value: string, unit: Unit): number {
  return num(value) * unitToFeet[unit];
}

function toSquareFeet(value: string, unit: Unit): number {
  const factor = unitToFeet[unit];
  return num(value) * factor * factor;
}

export function calculateSquareFootage(
  inputs: CalculatorInputs
): CalculationResult | null {
  const {
    shape,
    unit,
    length,
    width,
    height,
    quantity,
    borderWidth,
    sideA,
    sideB,
    sideC,
    windowWidth,
    windowHeight,
    windowQuantity,
    knownArea,
    waste,
    price,
  } = inputs;

  const qty = positiveQuantity(quantity);

  let areaSqFt = 0;

  switch (shape) {
    case "Known Area": {
      areaSqFt =
        toSquareFeet(knownArea, unit) * qty;

      break;
    }

    case "Rectangle":
    case "Room": {
      const l = toFeet(length, unit);
      const w = toFeet(width, unit);

      areaSqFt = l * w * qty;

      break;
    }

    case "Square": {
      const side = toFeet(length, unit);

      areaSqFt = side * side * qty;

      break;
    }

    case "Wall with Window": {
      const wallWidth = toFeet(length, unit);
      const wallHeight = toFeet(height, unit);

      const grossWallArea =
        wallWidth * wallHeight;

      const winWidth =
        toFeet(windowWidth, unit);

      const winHeight =
        toFeet(windowHeight, unit);

      const winQty =
        positiveQuantity(windowQuantity);

      const openingArea =
        winWidth *
        winHeight *
        winQty;

      const singleWallArea =
        Math.max(
          grossWallArea - openingArea,
          0
        );

      areaSqFt =
        singleWallArea * qty;

      break;
    }

    case "Cathedral Wall": {
      const wallWidth = toFeet(width, unit);
      const wallHeight = toFeet(height, unit);
      const triangleHeight = toFeet(sideA, unit);

      const rectangleArea =
        wallWidth * wallHeight;

      const triangleArea =
        (wallWidth * triangleHeight) / 2;

      areaSqFt =
        (rectangleArea + triangleArea) * qty;

      break;
    }

    case "Rectangle Border": {
      const l = toFeet(length, unit);
      const w = toFeet(width, unit);
      const border = toFeet(borderWidth, unit);

      const outerArea = l * w;

      const innerLength =
        Math.max(l - border * 2, 0);

      const innerWidth =
        Math.max(w - border * 2, 0);

      const innerArea =
        innerLength * innerWidth;

      areaSqFt =
        Math.max(
          outerArea - innerArea,
          0
        ) * qty;

      break;
    }

    case "Circle": {
      const diameter =
        toFeet(length, unit);

      const radius =
        diameter / 2;

      areaSqFt =
        Math.PI *
        radius *
        radius *
        qty;

      break;
    }

    case "Circle Border":
    case "Annulus": {
      const outerDiameter =
        toFeet(length, unit);

      const border =
        toFeet(borderWidth, unit);

      const outerRadius =
        outerDiameter / 2;

      const innerRadius =
        Math.max(
          outerRadius - border,
          0
        );

      const outerArea =
        Math.PI *
        outerRadius *
        outerRadius;

      const innerArea =
        Math.PI *
        innerRadius *
        innerRadius;

      areaSqFt =
        Math.max(
          outerArea - innerArea,
          0
        ) * qty;

      break;
    }

    case "Triangle": {
      const a = toFeet(sideA, unit);
      const b = toFeet(sideB, unit);
      const c = toFeet(sideC, unit);

      const semiPerimeter =
        (a + b + c) / 2;

      if (
        a <= 0 ||
        b <= 0 ||
        c <= 0 ||
        semiPerimeter <= a ||
        semiPerimeter <= b ||
        semiPerimeter <= c
      ) {
        return null;
      }

      areaSqFt =
        Math.sqrt(
          semiPerimeter *
            (semiPerimeter - a) *
            (semiPerimeter - b) *
            (semiPerimeter - c)
        ) * qty;

      break;
    }

    case "Triangle 1/2 b×h": {
      const base =
        toFeet(sideA, unit);

      const triangleHeight =
        toFeet(height, unit);

      areaSqFt =
        (base *
          triangleHeight) /
          2 *
        qty;

      break;
    }

    case "Trapezoid": {
      const baseA =
        toFeet(sideA, unit);

      const baseB =
        toFeet(sideB, unit);

      const trapezoidHeight =
        toFeet(height, unit);

      areaSqFt =
        ((baseA + baseB) / 2) *
        trapezoidHeight *
        qty;

      break;
    }

    default:
      return null;
  }

  if (
    !Number.isFinite(areaSqFt) ||
    areaSqFt <= 0
  ) {
    return null;
  }

  const wastePercent =
    Math.max(num(waste), 0);

  const finalArea =
    areaSqFt *
    (1 + wastePercent / 100);

  const squareFeet =
    finalArea;

  const squareInches =
    squareFeet * 144;

  const squareYards =
    squareFeet / 9;

  const squareMeters =
    squareFeet * 0.09290304;

  const acres =
    squareFeet / 43560;

  const cost =
    price.trim() !== ""
      ? squareFeet * num(price)
      : null;

  return {
    squareFeet,
    squareInches,
    squareYards,
    squareMeters,
    acres,
    cost,
  };
}
