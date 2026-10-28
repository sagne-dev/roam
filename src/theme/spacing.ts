/**
 * Roam Design System - Spacing
 * Built on a strict 4-point grid
 */
export const spacing = {
  xs: 4,
  sm: 8,
  12: 12,
  md: 16,
  20: 20,
  lg: 24,
  xl: 32,
  xxl: 48,
  64: 64,
} as const;

export type SpacingToken = keyof typeof spacing;

