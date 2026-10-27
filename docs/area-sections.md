# Multiple-section area and material estimates

The Area Calculator still opens in Single shape mode. Its eight shape formulas, quantity multiplier, units and existing URLs are unchanged. Multiple sections is an optional, lazily loaded calculator; each mode retains its input state while switching.

Multiple sections supports up to 20 independently measured shapes. Every section must be valid before a total or transfer link is available. Added area must exceed removed area. Feet, inches, yards and meters are converted before summing; waste is not included. The worked example is 12 × 10 ft + 6 × 5 ft = 150 sq ft, or 144 sq ft after removing a 2 × 3 ft opening.

`/calculators/area?example=l-shaped#area-mode` loads the example. Canonical URLs stay unchanged.

Transfers to Tile and Paint use `from=area&area_sqft=<unrounded number>`. Unknown, duplicate, malformed, non-positive and unsafe values are ignored. There are no storage writes or external requests in the transfer. Tile accepts an explicit known area and applies its existing waste/box rounding. Paint's separate known-surface mode accepts actual painted area, applies coats once, and does not infer wall dimensions or subtract openings again. This new paint mode uses US gallons and USD; the original room mode retains its unit and currency options.

Validation commands:

```sh
node scripts/test-area-sections.cjs
node scripts/test-calculator-validation.cjs
npm run build
```

Check mode switching and field preservation; blank/invalid sections; mixed units; subtracting too much; the example link; and both transfers. A 150 sq ft tile area with 24 × 24 in tiles, 10% waste and four tiles per box gives 44 purchased tiles. A 150 sq ft painted surface at two coats and 350 sq ft per US gallon gives a 0.86-gallon estimate and a 1-gallon purchase quantity.
