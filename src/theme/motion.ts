/**
 * Roam Design System - Motion
 * Standardized timing durations for micro-interactions and transitions
 */
export const motion = {
  fast: 150, // state feedback: press, toggle, chips
  base: 250, // element transitions: modals, alerts, cards
  slow: 400, // large surfaces: sheets, screen transitions
} as const;

export type MotionToken = keyof typeof motion;

