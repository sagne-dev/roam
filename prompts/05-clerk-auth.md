# 05 · Clerk Authentication Integration

Status: done

## Goal
Replace mocked authentication with live Clerk authentication using `@clerk/expo`: implement custom-styled email sign-up with email OTP verification code, sign-in, persistent sessions via `expo-secure-store`, route protection, and sign-out functionality, supported by Clerk's official MCP server.

## Decisions
- MCP Server: Clerk's official streamable HTTP MCP server `https://mcp.clerk.com/mcp` configured in `~/.gemini/config/mcp_config.json` and `.agents/mcp_config.json`.
- Email Sign-Up Flow (`roam/src/app/(auth)/sign-up.tsx`):
  - Two-step in-place flow preserving Roam styling:
    1. Form step: Collect Full Name, Email, and Password. Calls `signUp.create()` and `signUp.prepareEmailAddressVerification({ strategy: "email_code" })`.
    2. Verification step: Displays "Verify your email", target email, 6-digit code `InputField`, "Verify & continue" button, and "Resend code" action. Calls `signUp.attemptEmailAddressVerification({ code })` and `setActive()`.
- Email Sign-In Flow (`roam/src/app/(auth)/sign-in.tsx`):
  - Calls `signIn.create({ identifier: email, password })`. On status complete, activates session with `setActive()` and redirects to app.
  - Displays error alerts with `AlertBanner` on invalid credentials.
- Session Persistence:
  - Enabled via `tokenCache` from `@clerk/expo/token-cache` backed by `expo-secure-store` inside `ClerkProvider` in `roam/src/app/_layout.tsx`.
- Protected Routes:
  - Create a route protection observer in `roam/src/app/_layout.tsx` using `useAuth()` and `useSegments()`.
  - When `isLoaded` and `isSignedIn`, prevent accessing `(auth)` screens by redirecting to `/design-system`.
  - When accessing protected features while logged out, redirect to `/(auth)/sign-in`.
- Sign Out:
  - Add a Roam-styled Sign Out button on `roam/src/app/design-system.tsx` calling `signOut()` from `useAuth()`.
  - Clears secure token cache and redirects user back to Onboarding.
- Fallback & Error Handling:
  - Displays a clean Roam `AlertBanner` if Clerk Publishable Key is missing from `.env` or if network/API calls fail.

## Out of scope
- Third-party social OAuth native app credentials setup (Apple Developer / Google Cloud console OAuth client IDs).
- Sanity user document sync (handled in backend integration plan).

## Steps
### 1. Configure Clerk MCP Server
Register `https://mcp.clerk.com/mcp` in `~/.gemini/config/mcp_config.json` and `roam/.agents/mcp_config.json`.
Done when MCP config is active and valid.

### 2. Implement Real Clerk Sign-Up with Email Code Verification
Update `roam/src/app/(auth)/sign-up.tsx` with `useSignUp()`:
- Form state for name, email, password.
- Verification code state (`pendingVerification`, `code`).
- Resend code and error handling with `AlertBanner`.
Done when user can create account, receive verification code, verify, and activate session.

### 3. Implement Real Clerk Sign-In
Update `roam/src/app/(auth)/sign-in.tsx` with `useSignIn()`:
- Submit identifier and password to `signIn.create()`.
- Activate session and handle error messages cleanly.
Done when user can authenticate with existing credentials.

### 4. Implement Route Protection & Session Observer
Update `roam/src/app/_layout.tsx` to observe auth state with `useAuth()` and `useSegments()` to redirect unauthenticated or authenticated users appropriately.
Done when auth state drives navigation rules.

### 5. Implement Sign-Out Functionality
Add Sign Out control to `roam/src/app/design-system.tsx` utilizing `useAuth().signOut()`.
Done when tapping Sign Out terminates the active session and navigates to Onboarding.

### 6. Verify Compilation and Tests
Run `npx tsc --noEmit` and `npx eslint .` to ensure 0 type errors and 0 lint warnings.
Done when both pass with exit code 0.

## Verification
- MCP connection: Verify MCP configuration is written to config files.
- Sign Up: Fill sign up form -> triggers email verification step -> enter code -> session activates.
- Sign In: Enter valid credentials -> session activates -> routes to design system / app.
- Protected Routes: Verify logged in users are redirected from auth routes, and signed out users cannot access protected routes.
- Sign Out: Tap Sign Out -> active session terminates -> returns to onboarding.
- Static checks: `npx tsc --noEmit` and `npx eslint .` pass with 0 errors.

## AGENTS.md updates
- Clerk authentication handles sign-up, sign-in, verification code, route protection, and sign-out.

## Result
Live Clerk authentication integrated across Roam with custom design system styling.
- Configured official Clerk MCP server (`https://mcp.clerk.com/mcp`) in `~/.gemini/config/mcp_config.json` and `roam/.agents/mcp_config.json`.
- Implemented real email sign-up with 6-digit OTP code verification (`prepareEmailAddressVerification` and `attemptEmailAddressVerification`) in `roam/src/app/(auth)/sign-up.tsx`.
- Implemented real email sign-in (`signIn.create`) in `roam/src/app/(auth)/sign-in.tsx`.
- Implemented persistent sessions via `@clerk/expo/token-cache` and `expo-secure-store`.
- Configured route protection observer in `roam/src/app/_layout.tsx` to handle authentication transitions.
- Added Sign Out button on `roam/src/app/design-system.tsx` calling `signOut()` from `useAuth()`.
- Verified TypeScript compilation and ESLint pass with 0 errors.

