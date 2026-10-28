# 02 · Design System Implementation

Status: done

## Goal
Implement the comprehensive Roam design system derived from the reference design sheet, including typography, colors, spacing, radius, shadows, motion, and reusable component primitives, matching the visual language of the reference.

## Decisions
- Token architecture: Design tokens defined as typed objects in `roam/src/theme/` (`colors.ts`, `spacing.ts`, `typography.ts`, `radius.ts`, `shadows.ts`, `motion.ts`, `index.ts`) and mirrored in `roam/global.css` under Tailwind v4 `@theme` for utility-first NativeWind v5 support.
- Color palette:
  - Primary Yellow: `#FFC629` (Primary actions, active states)
  - Lavender: `#C9B4FF` (Secondary actions, highlights, badges)
  - Text Primary: `#0B0B1A` (Headings, primary text)
  - Text Secondary: `#6B7280` (Body text, secondary text)
  - Surface White: `#FFFFFF` (Cards, sheets, modals)
  - Surface Gray: `#F4F5F7` (App background, input fields)
  - Border Gray: `#E5E7EB` (Dividers, borders)
  - Glass Blur: `rgba(255, 255, 255, 0.7)` (Tab bar, glass surfaces)
  - Semantic status: Success `#10B981` / `#ECFDF5`, Error `#EF4444` / `#FEF2F2`, Info/Superhost `#3B82F6` / `#EFF6FF`.
- Typography scale:
  - Display: 56px, bold, line-height 1.0 (for hero/welcome statements)
  - Heading: 28px, bold, line-height 1.2
  - Title: 20px, bold/semibold, line-height 1.25
  - Body: 16px, regular, line-height 1.5
  - BodyMedium: 16px, medium (500), line-height 1.5
  - Caption: 14px, medium (500), line-height 1.4
  - Small / Footnote: 12px, regular, line-height 1.33
  - Button: 17px, medium (500), line-height 1.2
- Font family: Plus Jakarta Sans via `@expo-google-fonts/plus-jakarta-sans` (loaded with `expo-font`), with clean fallback to system geometric sans (`System` / `-apple-system`).
- Icon library: `@expo/vector-icons` (Ionicons / Feather / MaterialCommunityIcons) for cross-platform vector iconography matching the reference's outlined geometric style.
- Spacing: 4-point grid: `xs: 4`, `sm: 8`, `md: 16`, `lg: 24`, `xl: 32`, `xxl: 48` (with `12` and `20` helper steps).
- Radius: `sm: 8`, `md: 12`, `lg: 16`, `xl: 24`, `full: 9999`. Continuous curve (`borderCurve: "continuous"`) on all non-capsule rounded corners.
- Shadows: Card (`0 2px 8px rgba(0,0,0,0.06)`), Raised (`0 4px 16px rgba(0,0,0,0.10)`), Glass (`0 8px 32px rgba(0,0,0,0.08)`).
- Reusable components created in `roam/src/components/`:
  - `ThemedText`: Text primitive with variant and color props.
  - `Button`: Primary yellow pill, secondary bordered pill, ghost, with pressed state feedback and loading indicator.
  - `IconButton`: Circular/rounded icon button with pressed feedback.
  - `SearchInput` & `InputField`: Styled search bar and form inputs with left icon, clear/eye toggles, and focus state.
  - `FilterChip` & `CategoryChip`: Filter and category selection chips with active/inactive states.
  - `ListingCard`: Property card with rounded image, floating favorite button, title, location, rating, amenity tags, and price.
  - `PolicyCard`: Policy disclosure card with lavender icon container, title, subtitle, and right chevron.
  - `ProfileRow`: Navigation list row with icon, title, and right chevron.
  - `SegmentedControl`: Dark capsule segment picker (e.g. List / Map).
  - `Badge`: Tag/badge primitive (Guest favorite, New, 20% off, Superhost).
  - `AlertBanner`: Status alert component (Success, Error).
- Verification showcase: `roam/src/app/index.tsx` will render a categorized showcase displaying all 15 sections from the reference image for direct visual verification.

## Out of scope
- Full backend integration (Sanity GROQ queries, Clerk authentication flow, Jev AI evaluation) — these will be built in subsequent feature plans.
- Standalone multi-screen navigation setup (screen navigation flows will be built in the navigation plan).

## Steps
### 1. Install font and icon dependencies
Install `@expo-google-fonts/plus-jakarta-sans` and `@expo/vector-icons` using `npx expo install`.
Done when `package.json` reflects dependencies and installs cleanly.

### 2. Configure font loading in root layout
Update `roam/src/app/_layout.tsx` to load Plus Jakarta Sans weights (400 Regular, 500 Medium, 600 SemiBold, 700 Bold) using `useFonts` and prevent splash screen flicker with `SplashScreen.preventAutoHideAsync()`.
Done when fonts load smoothly on app start.

### 3. Create theme tokens in src/theme/ and update global.css
Create:
- `roam/src/theme/colors.ts`
- `roam/src/theme/spacing.ts`
- `roam/src/theme/typography.ts`
- `roam/src/theme/radius.ts`
- `roam/src/theme/shadows.ts`
- `roam/src/theme/motion.ts`
- `roam/src/theme/index.ts`
Update `roam/global.css` with `@theme` block defining `--color-brand-*`, `--font-*`, `--radius-*` for NativeWind v5 utilities.
Done when theme exports all tokens and TypeScript compiles without error.

### 4. Implement core typography and button primitives
Create:
- `roam/src/components/themed-text.tsx`
- `roam/src/components/button.tsx`
- `roam/src/components/icon-button.tsx`
Done when buttons support primary, secondary, loading, disabled, and icon buttons with proper touch feedback.

### 5. Implement inputs, chips, and controls
Create:
- `roam/src/components/input-field.tsx` and `roam/src/components/search-input.tsx`
- `roam/src/components/filter-chip.tsx` and `roam/src/components/category-chip.tsx`
- `roam/src/components/segmented-control.tsx`
- `roam/src/components/badge.tsx`
- `roam/src/components/alert-banner.tsx`
Done when inputs, chips, segmented controls, badges, and alerts render according to the design reference.

### 6. Implement complex composite components
Create:
- `roam/src/components/listing-card.tsx`
- `roam/src/components/policy-card.tsx`
- `roam/src/components/profile-row.tsx`
Done when listing card, policy card, and profile rows match reference specs.

### 7. Build design system showcase screen & verify
Update `roam/src/app/index.tsx` to render an interactive catalog displaying all 15 reference sections.
Run `npx tsc --noEmit` and verify Metro bundle works cleanly.

## Verification
- Type check: Run `npx tsc --noEmit` inside `roam/` to verify zero TypeScript errors across all theme and component files.
- Bundle test: Run `npx expo export --dry-run` to verify Metro compiles all components, fonts, and styles without bundler failures.
- Visual inspection: Launch Expo and verify each section (Brand, Colors, Typography, Buttons, Inputs, Chips, Cards, Alerts, Badges) renders faithfully against the reference image.

## AGENTS.md updates
Add the design system tokens and component conventions to the "Who owns what" and "Rules" sections of `AGENTS.md`.

## Result
Implemented the complete Roam design system derived from the reference specifications:
- Installed `@expo-google-fonts/plus-jakarta-sans` and `@expo/vector-icons`.
- Configured font loading in `roam/src/app/_layout.tsx` with splash screen coordination.
- Created typed tokens in `roam/src/theme/` (`colors.ts`, `spacing.ts`, `typography.ts`, `radius.ts`, `shadows.ts`, `motion.ts`, `index.ts`) and mirrored in `roam/global.css` under `@theme`.
- Built reusable components in `roam/src/components/`: `ThemedText`, `Button`, `IconButton`, `InputField`, `SearchInput`, `FilterChip`, `CategoryChip`, `SegmentedControl`, `Badge`, `AlertBanner`, `Toggle`, `Stepper`, `PolicyCard`, `ProfileRow`, `ListingCard`, `LiquidGlassTabBar`.
- Built the interactive showcase screen in `roam/src/app/index.tsx` demonstrating all 15 sections.
- Verified with `npx tsc --noEmit`, `npx expo lint`, and `npx expo export -p ios`. All checks passed with zero errors.

