# 01 · NativeWind v5 Setup

Status: approved

## Goal
Configure NativeWind v5 RC0 with Tailwind CSS v4 in the Roam Expo React Native app, enabling utility-first styling with `className` on native and web.

## Decisions
- NativeWind v5 target: `nativewind@5.0.0-rc.0` and `react-native-css@3.1.0-rc.0` pinned exactly, per NativeWind v5 documentation.
- Tailwind CSS v4 dependencies: `tailwindcss@4.1.12`, `@tailwindcss/postcss@4.1.12`, `postcss`, `lightningcss@1.30.1` installed as devDependencies.
- Lightningcss override: pinned to `"1.30.1"` in `roam/package.json` `"overrides"` to prevent deserialization errors during builds.
- Metro configuration: `roam/metro.config.js` created using `getDefaultConfig` and wrapped with `withNativewind(config)` from `nativewind/metro`.
- PostCSS configuration: `roam/postcss.config.mjs` created with `@tailwindcss/postcss`.
- CSS root file: `roam/global.css` created with Tailwind v4 `@import "tailwindcss/theme.css" layer(theme);`, `@import "tailwindcss/preflight.css" layer(base);`, `@import "tailwindcss/utilities.css";`, and `@import "nativewind/theme";`.
- Root import: imported in `roam/src/app/_layout.tsx` (`import "../../global.css";`).
- TypeScript declarations: `roam/nativewind-env.d.ts` created with `/// <reference types="react-native-css/types" />`.
- Verification component: updated `roam/src/app/index.tsx` to verify styling via `className` (e.g. layout, typography, and theme colors).
- Babel configuration: no NativeWind Babel preset or JSX import source changes needed for v5 (default `babel-preset-expo` is preserved).

## Out of scope
- Design system token definitions or complete screen redesigns (covered in upcoming design system / screen plans).
- Custom font loading or third-party component wrappers beyond what's needed for NativeWind v5 verification.

## Steps
### 1. Install NativeWind v5, React Native CSS, and Tailwind v4 dependencies
Install `nativewind@5.0.0-rc.0` and `react-native-css@3.1.0-rc.0` as exact dependencies, and `tailwindcss@4.1.12`, `@tailwindcss/postcss@4.1.12`, `postcss`, `lightningcss@1.30.1` as devDependencies. Add the `"overrides": { "lightningcss": "1.30.1" }` field to `roam/package.json`.
Done when `package.json` reflects the dependencies and `npm install` finishes cleanly.

### 2. Configure PostCSS and create global.css
Create `roam/postcss.config.mjs` exporting the `@tailwindcss/postcss` plugin configuration.
Create `roam/global.css` importing Tailwind v4 theme, preflight, unlayered utilities, and `nativewind/theme`.
Done when both files exist in the project root with the correct directives.

### 3. Configure Metro bundler with withNativewind
Create `roam/metro.config.js` wrapping Expo's default Metro configuration with `withNativewind(config)` from `nativewind/metro`.
Done when `metro.config.js` exists and exports the wrapped configuration.

### 4. Configure TypeScript declarations
Create `roam/nativewind-env.d.ts` with `/// <reference types="react-native-css/types" />`. Ensure `roam/tsconfig.json` includes `nativewind-env.d.ts`.
Done when TypeScript recognizes `className` on React Native elements without compiler errors.

### 5. Import global.css in root layout and verify styling on Index screen
Import `../../global.css` in `roam/src/app/_layout.tsx`.
Update `roam/src/app/index.tsx` to replace `StyleSheet.create` with Tailwind utility classes (`className="flex-1 items-center justify-center bg-white dark:bg-black"`, etc.).
Done when `npx tsc --noEmit` passes and Expo can build/bundle the screen with NativeWind classes.

## Verification
- Run `npx tsc --noEmit` inside `roam/` to verify type checking passes with `nativewind-env.d.ts`.
- Run an Expo export / dry run or test bundle with `npx expo export --dry-run` or start check to verify Metro compiles `global.css` and Tailwind utilities without error.

## AGENTS.md updates
Add NativeWind v5 decisions to the "Who owns what" and "Rules" sections of `AGENTS.md`:
- Styling: NativeWind v5 (`nativewind@5.0.0-rc.0` + Tailwind CSS v4) with `@tailwindcss/postcss` and `nativewind/metro`.
