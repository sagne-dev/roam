# 04 · Onboarding Horizontal Carousel

Status: done

## Goal
Enable horizontal swiping on the onboarding hero area across 3 curated destinations (Whistler, BC; Amalfi, Italy; Joshua Tree, CA), dynamically updating the floating location tag and pagination indicator as users swipe between places.

## Decisions
- Swiper mechanism: Horizontal paging `FlatList` with `pagingEnabled`, `showsHorizontalScrollIndicator={false}`, `bounces={false}`, and `decelerationRate="fast"` for native 60fps gesture response.
- Curated destinations (Unsplash):
  1. Whistler, BC: Mountain lake cabin sunset (`photo-1542314831-068cd1dbfeeb`).
  2. Amalfi, Italy: Cliffside Mediterranean oceanfront villa (`photo-1533105079780-92b9be482077`).
  3. Joshua Tree, CA: Secluded architectural desert cabin at twilight (`photo-1510798831971-661eb04b3739`).
- Location Tag: Floating translucent frosted pill (`rgba(20, 20, 30, 0.55)`) positioned on the lower-left above the bottom sheet, dynamically displaying the active slide's destination name with a map pin icon.
- Carousel Indicator: Elegant 3-dot pagination indicator positioned alongside the location tag, indicating the active slide (expanded active dot in white/primary, inactive dots in translucent white `rgba(255, 255, 255, 0.4)`).
- Layout integrity: Top header ("roam" wordmark and "Skip" pill) and bottom sheet card remain static and anchored, matching the exact reference design while only the hero area swipes.

## Out of scope
- Dynamic remote CMS / Sanity fetching for onboarding slides (slides are client-curated for instant load).
- Automated autoplay timer (user-driven swipe feels most intentional and avoids unexpected shifts).

## Steps
### 1. Define Carousel Slide Data Model
Define the `OnboardingSlide` type and data array with 3 distinct places (Whistler, BC; Amalfi, Italy; Joshua Tree, CA) and their respective Unsplash image URLs in `roam/src/app/index.tsx`.
Done when data model is strictly typed.

### 2. Implement Horizontal Paging Swiper
Replace single hero image with a horizontal `FlatList` sized to screen width, rendering `Image` from `expo-image` with `contentFit="cover"` and `priority="high"`.
Done when user can swipe smoothly between all 3 destination images with native paging snap.

### 3. Add Dynamic Location Pill & Pagination Dots
Track `activeIndex` via `onMomentumScrollEnd` and render the active destination's name in the floating location pill, plus a companion 3-dot indicator.
Done when swiping updates the location text and dot indicator without jitter.

### 4. Verify Type Check & Linting
Run `npx tsc --noEmit` and `npx eslint .` to ensure 0 TypeScript errors and 0 lint warnings.
Done when both commands exit with code 0.

## Verification
- Swipe gesture: Swipe horizontally left and right across the hero area; verify snappy paging snap on each of the 3 images.
- Dynamic tag: Verify slide 1 shows "Whistler, BC", slide 2 shows "Amalfi, Italy", slide 3 shows "Joshua Tree, CA".
- Dot indicators: Verify dots update active state smoothly per slide.
- Static checks: `npx tsc --noEmit` and `npx eslint .` pass cleanly.

## AGENTS.md updates
None.

## Result
Horizontal onboarding carousel implemented in `roam/src/app/index.tsx`.
- Users can swipe horizontally across 3 curated high-resolution Unsplash destinations: Whistler, BC; Amalfi, Italy; and Joshua Tree, CA.
- Floating location tag dynamically updates to reflect the active place ("Whistler, BC", "Amalfi, Italy", "Joshua Tree, CA").
- Sleek 3-dot pagination pill indicates active slide position.
- Header ("roam" and "Skip") and white bottom sheet card stay anchored and perfectly framed.
- TypeScript compiler and ESLint checks pass with 0 errors.

