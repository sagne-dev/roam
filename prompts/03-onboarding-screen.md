# 03 · Onboarding Screen & Authentication Flow

Status: done

## Goal
Implement the high-fidelity onboarding screen matching the reference design (hero cabin sunset Unsplash image, "Whistler, BC" frosted location pill, "roam" header with warm "Skip" pill, bottom sheet with lavender indicator bar, headline, body copy, "Get started" arrow button, and "Continue with Google" action) and connect navigation into the authentication flow.

## Decisions
- Screen entry point: `roam/src/app/index.tsx` becomes the Onboarding screen. The previous design system showcase moves to `roam/src/app/design-system.tsx` so it remains fully accessible.
- Unsplash Hero Image: Curated high-resolution Unsplash photo of a warm modern wooden lake cabin nestled in pine trees against an alpine sunset, loaded via `expo-image` with subtle prefetch and smooth fade-in.
- Whistler, BC Location Tag: Positioned floating on the lower-left area of the hero image above the bottom card. Features a location pin icon with "Whistler, BC" in white Plus Jakarta Sans text, housed in a frosted translucent dark capsule (`rgba(20, 20, 30, 0.55)`).
- Header Layout: Overlaid on the hero top with safe area insets. Contains the bold lowercase "roam" wordmark (`PlusJakartaSans_700Bold`, 30px) on the left, and a soft warm pill button (`#FDECC7` / `rgba(254, 235, 180, 0.85)`) on the right labeled "Skip".
- Bottom Sheet Card: Pure white card (`colors.surfaceWhite`) with top rounded corners (`borderTopLeftRadius: 36`, `borderTopRightRadius: 36`), containing:
  - Lavender Accent Indicator: 38x4px rounded pill bar in `colors.lavender` (`#C9B4FF`) at the top-left.
  - Headline: "Find a stay that\nfits your story" in `PlusJakartaSans_700Bold` (30px, line-height 36px, `colors.textPrimary`).
  - Subtitle: "From mountain cabins to oceanfront villas, roam helps you find unforgettable stays for every kind of trip." in `PlusJakartaSans_400Regular` (15px, line-height 22px, `colors.textSecondary`).
  - "Get started" CTA: Primary yellow full-width pill button (`colors.primary`), 56px height, with centered text and right-aligned arrow (`Ionicons` `arrow-forward`). Tapping navigates to `/(auth)/sign-up`.
  - "Continue with Google" CTA: Full-width button with official multicolor Google G logo and dark text (`colors.textPrimary`), 52px height. Tapping connects to Google authentication / `/(auth)/sign-in`.
  - "Skip" CTA: Tapping "Skip" navigates to the main app / `/design-system` as guest mode.
- Authentication Flow:
  - Scaffold `roam/src/app/(auth)/_layout.tsx` for clean stack navigation with back button support.
  - Scaffold `roam/src/app/(auth)/sign-in.tsx` and `roam/src/app/(auth)/sign-up.tsx` using Roam design system components (`InputField`, `Button`, `ThemedText`), allowing users to toggle between sign-in and sign-up, sign in with email/password, or use Google SSO.

## Out of scope
- Production Clerk backend OAuth credentials exchange (keys will be added via Clerk CLI / `.env`).
- Backend Sanity GROQ property data fetching.

## Steps
### 1. Create Google Logo Icon Component
Create `roam/src/components/google-icon.tsx` rendering the crisp multi-color Google "G" logo vector to use in authentication buttons. Export from `roam/src/components/index.ts`.
Done when component renders crisp vector icon at specified dimensions.

### 2. Scaffold Authentication Flow Routes
Create:
- `roam/src/app/(auth)/_layout.tsx`: Stack navigator with back header for auth screens.
- `roam/src/app/(auth)/sign-in.tsx`: Sign-in screen with email, password, "Sign in" button, Google button, and link to sign-up.
- `roam/src/app/(auth)/sign-up.tsx`: Sign-up screen with full name, email, password, "Create account" button, Google button, and link to sign-in.
Done when auth routes compile and allow back-and-forth navigation.

### 3. Relocate Design System Showcase
Move existing showcase from `roam/src/app/index.tsx` to `roam/src/app/design-system.tsx` so all components remain verifiable and interactive.
Done when `/design-system` renders the design system showcase without errors.

### 4. Implement Onboarding Screen
Build `roam/src/app/index.tsx` matching the reference image:
- Fullscreen hero background image from Unsplash (Whistler sunset lake cabin).
- Floating "Whistler, BC" frosted location pill.
- Top header with "roam" wordmark and "Skip" pill button.
- Bottom sheet with lavender accent bar, bold headline, descriptive copy, "Get started" CTA with arrow icon, and "Continue with Google" CTA.
- Safe area context integration for edge-to-edge layout.
Done when onboarding screen visually matches the reference design.

### 5. Wire Navigation & Interactions
Connect:
- "Get started" -> `/(auth)/sign-up`
- "Continue with Google" -> `/(auth)/sign-in`
- "Skip" -> `/design-system` (guest explore)
Done when tapping buttons performs fluid navigation transitions.

### 6. Verify Type Safety and Linting
Run `npx tsc --noEmit` and `npx expo lint` from `roam/`.
Done when all checks pass with zero errors.

## Verification
- Visual inspection: Compare rendered onboarding screen to attached reference image (layout, typography, colors, pill shapes, padding, icons).
- Navigation flow:
  1. Open app -> Onboarding screen displays.
  2. Tap "Get started" -> Navigates smoothly to `/(auth)/sign-up`.
  3. On sign-up screen, tap "Sign in" link -> Navigates to `/(auth)/sign-in`.
  4. On sign-in screen, tap back -> Returns to Onboarding.
  5. On onboarding screen, tap "Continue with Google" -> Navigates to auth.
  6. On onboarding screen, tap "Skip" -> Navigates to guest view.
- Static checks: `npx tsc --noEmit` passes with 0 errors.

## AGENTS.md updates
- Entry route `src/app/index.tsx` is the Onboarding screen; showcase is at `src/app/design-system.tsx`.
- Auth routes live under `src/app/(auth)/`.

## Result
Onboarding screen and authentication flow implemented and fully connected.
- `roam/src/app/index.tsx` renders the pixel-close onboarding screen with Unsplash Whistler cabin sunset hero, Whistler BC frosted location tag, "roam" wordmark header with warm "Skip" pill, and white bottom sheet with lavender accent bar, headline, subtitle, yellow "Get started" button with arrow, and "Continue with Google".
- `roam/src/app/(auth)/` contains `_layout.tsx`, `sign-in.tsx`, and `sign-up.tsx` matching Roam design system tokens.
- Design system showcase preserved at `roam/src/app/design-system.tsx`.
- Both TypeScript compilation (`tsc --noEmit`) and ESLint (`npx eslint .`) pass with zero errors.

