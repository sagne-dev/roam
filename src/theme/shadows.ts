/**
 * Roam Design System - Shadows
 * Modern boxShadow strings for clean elevation across platforms
 */
export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  card: "0 2px 8px rgba(0, 0, 0, 0.06)",
  raised: "0 4px 16px rgba(0, 0, 0, 0.10)",
  glass: "0 8px 32px rgba(0, 0, 0, 0.08)",
  floating: "0 12px 36px rgba(0, 0, 0, 0.14)",
} as const;

export type ShadowToken = keyof typeof shadows;

