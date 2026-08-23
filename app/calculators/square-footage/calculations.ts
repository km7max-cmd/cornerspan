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
  const n = num(value);

  return n > 0 ? n : 1;
}

/**
 * Converts a linear measurement into feet.
 *
 * When unit = feet:
 *   value = feet
 *   extraInches = additional inches
 *
 * Example:
 *   10 ft + 6 in = 10.5 ft
 */
function toFeet(
  value: string,
  unit: Unit,
  extraInches = "0"
): number {
  const mainValue = num(value);

  if (unit === "feet") {
    return mainValue + num(extraInches) / 12;
  }

  return mainValue * unitToFeet[unit];
}

export function calculateSquareFootage(
  inputs: CalculatorInputs
): CalculationResult | null {
  const {
    shape,
    unit,

    length,
    lengthInches,

    width,
    widthInches,

    height,
    heightInches,

    quantity,

    borderWidth,
    borderWidthInches,

    sideA,
    sideAInches,

    sideB,
    sideBInches,

    sideC,
    sideCInches,

    windowWidth,
    windowWidthInches,

    windowHeight,
    windowHeightInches,

    windowQuantity,

    knownArea,

    waste,
    price,
  } = inputs;

  const qty = positiveQuantity(quantity);

  let areaSqFt = 0;

  switch (shape) {
    case "Known Area": {
      const area = num(knownArea);

      if (area <= 0) {
        return null;
      }

      /**
       * Known Area is interpreted according to selected unit.
       *
       * feet  -> square feet
       * inches -> square inches
       * yards -> square yards
       * meters -> square meters
       */
      switch (unit) {
        case "feet":
          areaSqFt = area * qty;
          break;

        case "inches":
          areaSqFt = (area / 144) * qty;
          break;

        case "yards":
          areaSqFt = area * 9 * qty;
          break;

        case "meters":
          areaSqFt = area * 10.7639104167 * qty;
          break;
      }

      break;
    }

    case "Rectangle":
    case "Room": {
      const l = toFeet(
        length,
        unit,
        lengthInches
      );

      const w = toFeet(
        width,
        unit,
        widthInches
      );

      if (l <= 0 || w <= 0) {
        return null;
      }

      areaSqFt = l * w * qty;

      break;
    }

    case "Square": {
      const side = toFeet(
        length,
        unit,
        lengthInches
      );

      if (side <= 0) {
        return null;
      }

      areaSqFt = side * side * qty;

      break;
    }

    case "Wall with Window": {
      const wallWidth = toFeet(
        length,
        unit,
        lengthInches
      );

      const wallHeight = toFeet(
        height,
        unit,
        heightInches
      );

      const winWidth = toFeet(
        windowWidth,
        unit,
        windowWidthInches
      );

      const winHeight = toFeet(
        windowHeight,
        unit,
        windowHeightInches
      );

      const winQty =
        positiveQuantity(windowQuantity);

      if (
        wallWidth <= 0 ||
        wallHeight <= 0
      ) {
        return null;
      }

      const grossWallArea =
        wallWidth *
        wallHeight *
        qty;

      const openingArea =
        winWidth *
        winHeight *
        winQty;

      areaSqFt = Math.max(
        grossWallArea - openingArea,
        0
      );

      break;
    }

    case "Cathedral Wall": {
      const wallWidth = toFeet(
        width,
        unit,
        widthInches
      );

      const wallHeight = toFeet(
        height,
        unit,
        heightInches
      );

      const triangleHeight = toFeet(
        sideA,
        unit,
        sideAInches
      );

      if (
        wallWidth <= 0 ||
        wallHeight <= 0 ||
        triangleHeight <= 0
      ) {
        return null;
      }

      const rectangleArea =
        wallWidth * wallHeight;

      const triangleArea =
        (wallWidth * triangleHeight) / 2;

      areaSqFt =
        (rectangleArea + triangleArea) *
        qty;

      break;
    }

    case "Rectangle Border": {
      const l = toFeet(
        length,
        unit,
        lengthInches
      );

      const w = toFeet(
        width,
        unit,
        widthInches
      );

      const border = toFeet(
        borderWidth,
        unit,
        borderWidthInches
      );

      if (
        l <= 0 ||
        w <= 0 ||
        border <= 0
      ) {
        return null;
      }

      const outerArea = l * w;

      const innerLength =
        Math.max(
          l - border * 2,
          0
        );

      const innerWidth =
        Math.max(
          w - border * 2,
          0
        );

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
      const diameter = toFeet(
        length,
        unit,
        lengthInches
      );

      if (diameter <= 0) {
        return null;
      }

      const radius = diameter / 2;

      areaSqFt =
        Math.PI *
        radius *
        radius *
        qty;

      break;
    }

    case "Circle Border":
    case "Annulus": {
      const outerDiameter = toFeet(
        length,
        unit,
        lengthInches
      );

      const border = toFeet(
        borderWidth,
        unit,
        borderWidthInches
      );

      if (
        outerDiameter <= 0 ||
        border <= 0
      ) {
        return null;
      }

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
      const a = toFeet(
        sideA,
        unit,
        sideAInches
      );

      const b = toFeet(
        sideB,
        unit,
        sideBInches
      );

      const c = toFeet(
        sideC,
        unit,
        sideCInches
      );

      if (
        a <= 0 ||
        b <= 0 ||
        c <= 0
      ) {
        return null;
      }

      const semiPerimeter =
        (a + b + c) / 2;

      if (
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
      const base = toFeet(
        sideA,
        unit,
        sideAInches
      );

      const triangleHeight = toFeet(
        height,
        unit,
        heightInches
      );

      if (
        base <= 0 ||
        triangleHeight <= 0
      ) {
        return null;
      }

      areaSqFt =
        (base * triangleHeight) /
        2 *
        qty;

      break;
    }

    case "Trapezoid": {
      const baseA = toFeet(
        sideA,
        unit,
        sideAInches
      );

      const baseB = toFeet(
        sideB,
        unit,
        sideBInches
      );

      const trapezoidHeight =
        toFeet(
          height,
          unit,
          heightInches
        );

      if (
        baseA <= 0 ||
        baseB <= 0 ||
        trapezoidHeight <= 0
      ) {
        return null;
      }

      areaSqFt =
        ((baseA + baseB) / 2) *
        trapezoidHeight *
        qty;

      break;
    }
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
    squareFeet *
    0.09290304;

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
