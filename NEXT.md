# Miniature Light Lab · NEXT

## Current stage

Driver acceptance: subject mask and cumulative pre-shading guide.

## Implemented

- Paint-photo crop and multi-scale relighting.
- Value, band, contour, and colour-reference modes.
- Offline GW / Vallejo / AK paint catalogue with automatic same-brand NMM ramps.
- Manual subject mask with remove, restore, brush-size, and reset controls.
- Three cumulative, action-oriented pre-shading stages: shadow blocks, main light planes, and restrained edge highlights.
- Gray sketch, classic zenithal, and NMM underpainting presets.
- Hand-paint, drybrush, and airbrush construction languages. Hand-paint is the default and uses one monotonic soft edge per coverage region to avoid artificial contour echoes.
- Pre-shading uses the resolved lighting values without a second blur, preserving form detail; the final white pass is restricted by raised-detail weighting.
- Current-step PNG export with the subject mask applied.
- Printable four-panel construction sheet export containing the masked source, all three cumulative stages, and the current lighting recipe.

## Acceptance checklist

- Mask editing is responsive and removed background stays excluded after editing.
- Changing crop or form scale visibly resets the mask as documented.
- Each of the three stages makes a distinct, useful change: large shadow block, main light plane, then sparse edge focus.
- Hand-paint mode looks executable with a brush rather than like a perfect digital gradient.
- Drybrush white visibly favors raised local detail; airbrush remains the smooth comparison option.
- All three presets remain readable on a real miniature photo.
- Export matches the currently selected preset, step, crop, and mask.
- Four-panel export preserves the currently visible preview step after generating all three construction stages.

## Next after acceptance

Add reversible mask editing (single-step undo) before expanding the automatic subject-selection workflow.
