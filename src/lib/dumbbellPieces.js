/**
 * Shared dumbbell geometry — single source of truth for Logo + Hero scatter.
 * Horizontal viewBox used by ScatterDumbbell; HORIZONTAL_RECTS used by DumbbellMark.
 */

export const VIEWBOX_HORIZONTAL = '0 0 200 72';
export const DUMBBELL_FILL = '#202A36';

/** Horizontal logo mark (matches original Logo.jsx artwork) */
export const HORIZONTAL_RECTS = [
  { x: 40, y: 20, width: 40, height: 8, rx: 2 },
  { x: 30, y: 12, width: 8, height: 24, rx: 2 },
  { x: 20, y: 8, width: 7, height: 32, rx: 2 },
  { x: 11, y: 14, width: 6, height: 20, rx: 2 },
  { x: 82, y: 12, width: 8, height: 24, rx: 2 },
  { x: 93, y: 8, width: 7, height: 32, rx: 2 },
  { x: 103, y: 14, width: 6, height: 20, rx: 2 },
];

const CY = 36;

/**
 * Realistic horizontal hero dumbbell (7 animatable parts).
 * Stacked rounded rectangles for plates and bar.
 * Tweak scatter dx/dy here to change fly-apart distance/direction.
 */
export const HORIZONTAL_PIECES = [
  {
    id: 'leftCap',
    shape: 'rect',
    geometry: { x: 14, y: 24, width: 10, height: 24, rx: 4 },
    scatter: { dx: -130, dy: -90, rotate: -38 },
    scrollRange: [0, 0.7],
    entranceDelay: 0,
  },
  {
    id: 'leftOuter',
    shape: 'rect',
    geometry: { x: 24, y: 14, width: 18, height: 44, rx: 6 },
    scatter: { dx: -100, dy: -65, rotate: -28 },
    scrollRange: [0.05, 0.78],
    entranceDelay: 0.06,
  },
  {
    id: 'leftInner',
    shape: 'rect',
    geometry: { x: 42, y: 6, width: 18, height: 60, rx: 6 },
    scatter: { dx: -65, dy: -40, rotate: -18 },
    scrollRange: [0.1, 0.85],
    entranceDelay: 0.12,
  },
  {
    id: 'bar',
    shape: 'rect',
    geometry: { x: 60, y: 30, width: 80, height: 12, rx: 2 },
    scatter: { dx: 0, dy: 75, rotate: 14 },
    scrollRange: [0.25, 1],
    entranceDelay: 0.28,
  },
  {
    id: 'rightInner',
    shape: 'rect',
    geometry: { x: 140, y: 6, width: 18, height: 60, rx: 6 },
    scatter: { dx: 65, dy: -40, rotate: 18 },
    scrollRange: [0.1, 0.85],
    entranceDelay: 0.12,
  },
  {
    id: 'rightOuter',
    shape: 'rect',
    geometry: { x: 158, y: 14, width: 18, height: 44, rx: 6 },
    scatter: { dx: 100, dy: -65, rotate: 28 },
    scrollRange: [0.05, 0.78],
    entranceDelay: 0.06,
  },
  {
    id: 'rightCap',
    shape: 'rect',
    geometry: { x: 176, y: 24, width: 10, height: 24, rx: 4 },
    scatter: { dx: 130, dy: -90, rotate: 38 },
    scrollRange: [0, 0.7],
    entranceDelay: 0,
  },
];

/** IDs of plate pieces that use radial gradients */
export const PLATE_GRADIENT_IDS = HORIZONTAL_PIECES.filter((p) => p.gradientId).map(
  (p) => p.gradientId
);

/** Compute responsive scatter multiplier (0.4–1.0) from viewport width */
export function getScatterScale(width) {
  return Math.min(1, Math.max(0.4, width / 768));
}
