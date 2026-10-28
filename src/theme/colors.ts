/**
 * Roam Design System - Colors
 * Derived from the Roam Design System specification sheet
 */
export const colors = {
  // Core Brand Palette (from reference sheet 02)
  primary: "#FFC629", // Primary Yellow: Primary actions, active states
  lavender: "#C9B4FF", // Lavender: Secondary actions, highlights, selected chips
  textPrimary: "#0B0B1A", // Text Primary: Headings, primary text
  textSecondary: "#6B7280", // Text Secondary: Body text, secondary text, metadata
  surfaceWhite: "#FFFFFF", // Surface White: Cards, sheets, modals
  surfaceGray: "#F4F5F7", // Surface Gray: App background, input fields
  borderGray: "#E5E7EB", // Border Gray: Dividers, borders
  glassBlur: "rgba(255, 255, 255, 0.7)", // Glass Blur: Tab bar, glass surfaces
  glassBlurOverlay: "rgba(255, 255, 255, 0.85)",

  // Semantic & Status Colors (from reference sheet 14 & 15)
  success: "#10B981",
  successBackground: "#ECFDF5",
  successBorder: "#A7F3D0",
  error: "#EF4444",
  errorBackground: "#FEF2F2",
  errorBorder: "#FECACA",
  info: "#3B82F6",
  infoBackground: "#EFF6FF",
  ratingStar: "#F59E0B",

  // Dark Surfacing (e.g. Segmented Control in section 12)
  darkSurface: "#0B0B1A",
  darkSurfaceActive: "#1F2937",
  darkSurfaceMuted: "#374151",

  // Accent Tints (e.g. Policy icon circles in section 08)
  lavenderTint: "#F3EEFF",
  lavenderDark: "#7C3AED",

  // Action Text / Foreground
  onPrimary: "#0B0B1A", // Dark text on Yellow
  onLavender: "#0B0B1A", // Dark text on Lavender
  onDark: "#FFFFFF", // White text on dark surfaces
} as const;

export type ColorToken = keyof typeof colors;

