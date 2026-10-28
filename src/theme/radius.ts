/**
 * Roam Design System - Radius
 * Smooth continuous curvature for modern iOS/Android surfaces
 */
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999, // capsules & pills
} as const;

export type RadiusToken = keyof typeof radius;

