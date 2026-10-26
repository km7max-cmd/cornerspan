# Browser settings and calculator shortcuts

## Available features
- All 14 calculators can be saved using the actions beside their worked examples. Legacy title-based favorites resolve to canonical calculator slugs; duplicate/unknown entries are ignored.
- Recently opened calculators are saved locally, deduplicated and limited to 14. Reopening starts a new estimate; inputs are not restored.
- The History page distinguishes recent tools from saved results. Only the Concrete Calculator currently records calculation results. The global history retains up to 100 results.
- History search filters calculator names, summaries and result text. CSV download exports only the filtered results, with UTC timestamps and spreadsheet-formula escaping.
- Copy calculator link copies the page URL, not entered measurements or results. A selectable text field is available if clipboard access fails.
- Settings include light/dark/device theme, reduced motion, activity recording, reset preferences, activity/favorites clearing and JSON backup download. Device reduced-motion settings are respected too.
- Turning activity saving off stops new recent visits and concrete history records. Existing activity is retained until cleared. Favorites remain a manual action.
- JSON backup is a download for personal records; import is not implemented. Data is not synchronized across devices.
- Unimplemented notification delivery controls were removed. Browser notification permissions previously granted are managed in browser settings.

## Implementation and privacy boundaries
Browser data reads validate stored shapes. Storage failures return false and visible actions report failures. Pages subscribe to both same-tab data events and cross-tab storage events. These controls do not change analytics or advertising settings. Clearing site data in the browser removes these records.

## Validation
`node scripts/test-browser-data.cjs` checks all 14 favorites, legacy data normalization, same/cross-tab events, activity opt-out, recent-list deduplication, history cap/deletion, malformed and blocked storage, and CSV formula escaping.

A local React interaction harness exercised favorite removal, motion/theme/activity settings, history search and deletion. Production build and TypeScript checks cover the added components and metadata. This is not a native mobile browser or download-manager test.
