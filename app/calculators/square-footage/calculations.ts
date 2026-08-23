import type {
  CalculationError,
  CalculationResult,
  CalculatorInputs,
} from "./types";

function num(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function quantity(value: string): number {
  const n = num(value);
  return n > 0 ? n : 1;
}

function measurement(
  feet: string,
  inches: string
): number {
  return num(feet) + num(inches) / 12;
}

function validMeasurement(
  feet: string,
  inches: string
): boolean {
  return measurement(feet, inches) > 0;
}

function errorFor(
  result: CalculationResult | null,
  error: CalculationError
): {
  result: CalculationResult | null;
  error: CalculationError;
} {
  return {
    result,
    error,
  };
}

export function calculateSquareFootage(
  inputs: CalculatorInputs
): {
  result: CalculationResult | null;
  error: CalculationError;
} {
  const {
    shape,

    lengthFeet,
    lengthInches,

    widthFeet,
    widthInches,

    heightFeet,
    heightInches,

    quantity: quantityValue,

    borderFeet,
    borderInches,

    sideAFeet,
    sideAInches,

    sideBFeet,
    sideBInches,

    sideCFeet,
    sideCInches,

    windowWidthFeet,
    windowWidthInches,

    windowHeightFeet,
    windowHeightInches,

    windowQuantity,

    knownArea,

    waste,
    price,
  } = inputs;

  const qty = quantity(quantityValue);

  let areaSqFt = 0;

  switch (shape) {
    case "Known Area": {
      const area = num(knownArea);

      if (area <= 0) {
        return errorFor(null, "Area");
      }

      areaSqFt = area * qty;
      break;
    }

    case "Rectangle":
    case "Room": {
      if (
        !validMeasurement(
          lengthFeet,
          lengthInches
        )
      ) {
        return errorFor(null, "Length");
      }

      if (
        !validMeasurement(
          widthFeet,
          widthInches
        )
      ) {
        return errorFor(null, "Width");
      }

      const length = measurement(
        lengthFeet,
        lengthInches
      );

      const width = measurement(
        widthFeet,
        widthInches
      );

      areaSqFt = length * width * qty;
      break;
    }

    case "Square": {
      if (
        !validMeasurement(
          lengthFeet,
          lengthInches
        )
      ) {
        return errorFor(null, "Length");
      }

      const side = measurement(
        lengthFeet,
        lengthInches
      );

      areaSqFt = side * side * qty;
      break;
    }

    case "Wall with Window": {
      if (
        !validMeasurement(
          lengthFeet,
          lengthInches
        )
      ) {
        return errorFor(null, "Length");
      }

      if (
        !validMeasurement(
          heightFeet,
          heightInches
        )
      ) {
        return errorFor(null, "Height");
      }

      if (
        !validMeasurement(
          windowWidthFeet,
          windowWidthInches
        )
      ) {
        return errorFor(null, "Window Width");
      }

      if (
        !validMeasurement(
          windowHeightFeet,
          windowHeightInches
        )
      ) {
        return errorFor(null, "Window Height");
      }

      const wallWidth = measurement(
        lengthFeet,
        lengthInches
      );

      const wallHeight = measurement(
        heightFeet,
        heightInches
      );

      const winWidth = measurement(
        windowWidthFeet,
        windowWidthInches
      );

      const winHeight = measurement(
        windowHeightFeet,
        windowHeightInches
      );

      const winQty = quantity(windowQuantity);

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
      if (
        !validMeasurement(
          widthFeet,
          widthInches
        )
      ) {
        return errorFor(null, "Width");
      }

      if (
        !validMeasurement(
          heightFeet,
          heightInches
        )
      ) {
        return errorFor(null, "Height");
      }

      if (
        !validMeasurement(
          sideAFeet,
          sideAInches
        )
      ) {
        return errorFor(null, "Side A");
      }

      const wallWidth = measurement(
        widthFeet,
        widthInches
      );

      const wallHeight = measurement(
        heightFeet,
        heightInches
      );

      const triangleHeight = measurement(
        sideAFeet,
        sideAInches
      );

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
      if (
        !validMeasurement(
          lengthFeet,
          lengthInches
        )
      ) {
        return errorFor(null, "Length");
      }

      if (
        !validMeasurement(
          widthFeet,
          widthInches
        )
      ) {
        return errorFor(null, "Width");
      }

      if (
        !validMeasurement(
          borderFeet,
          borderInches
        )
      ) {
        return errorFor(null, "Border Width");
      }

      const length = measurement(
        lengthFeet,
        lengthInches
      );

      const width = measurement(
        widthFeet,
        widthInches
      );

      const border = measurement(
        borderFeet,
        borderInches
      );

      const outerArea =
        length * width;

      const innerLength =
        Math.max(
          length - border * 2,
          0
        );

      const innerWidth =
        Math.max(
          width - border * 2,
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
      if (
        !validMeasurement(
          lengthFeet,
          lengthInches
        )
      ) {
        return errorFor(null, "Length");
      }

      const diameter = measurement(
        lengthFeet,
        lengthInches
      );

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
      if (
        !validMeasurement(
          lengthFeet,
          lengthInches
        )
      ) {
        return errorFor(null, "Length");
      }

      if (
        !validMeasurement(
          borderFeet,
          borderInches
        )
      ) {
        return errorFor(null, "Border Width");
      }

      const outerDiameter =
        measurement(
          lengthFeet,
          lengthInches
        );

      const border =
        measurement(
          borderFeet,
          borderInches
        );

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
      if (
        !validMeasurement(
          sideAFeet,
          sideAInches
        )
      ) {
        return errorFor(null, "Side A");
      }

      if (
        !validMeasurement(
          sideBFeet,
          sideBInches
        )
      ) {
        return errorFor(null, "Side B");
      }

      if (
        !validMeasurement(
          sideCFeet,
          sideCInches
        )
      ) {
        return errorFor(null, "Side C");
      }

      const a = measurement(
        sideAFeet,
        sideAInches
      );

      const b = measurement(
        sideBFeet,
        sideBInches
      );

      const c = measurement(
        sideCFeet,
        sideCInches
      );

      const semiPerimeter =
        (a + b + c) / 2;

      if (
        semiPerimeter <= a ||
        semiPerimeter <= b ||
        semiPerimeter <= c
      ) {
        return errorFor(null, "Side C");
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
      if (
        !validMeasurement(
          sideAFeet,
          sideAInches
        )
      ) {
        return errorFor(null, "Side A");
      }

      if (
        !validMeasurement(
          heightFeet,
          heightInches
        )
      ) {
        return errorFor(null, "Height");
      }

      const base = measurement(
        sideAFeet,
        sideAInches
      );

      const triangleHeight =
        measurement(
          heightFeet,
          heightInches
        );

      areaSqFt =
        (base * triangleHeight) /
        2 *
        qty;

      break;
    }

    case "Trapezoid": {
      if (
        !validMeasurement(
          sideAFeet,
          sideAInches
        )
      ) {
        return errorFor(null, "Side A");
      }

      if (
        !validMeasurement(
          sideBFeet,
          sideBInches
        )
      ) {
        return errorFor(null, "Side B");
      }

      if (
        !validMeasurement(
          heightFeet,
          heightInches
        )
      ) {
        return errorFor(null, "Height");
      }

      const baseA = measurement(
        sideAFeet,
        sideAInches
      );

      const baseB = measurement(
        sideBFeet,
        sideBInches
      );

      const trapezoidHeight =
        measurement(
          heightFeet,
          heightInches
        );

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
    return errorFor(null, "Length");
  }

  const wastePercent =
    Math.max(num(waste), 0);

  const finalArea =
    areaSqFt *
    (1 + wastePercent / 100);

  const squareFeet = finalArea;

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
      ? squareFeet * Math.max(num(price), 0)
      : null;

  return {
    result: {
      squareFeet,
      squareInches,
      squareYards,
      squareMeters,
      acres,
      cost,
    },
    error: null,
  };
}
