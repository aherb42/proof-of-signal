

# Revised Plan: Auth Flow with Signup/Login Modes and Onboarding-Aware Redirects

## Summary

Three changes to `Auth.tsx` plus a redirect handler in `App.tsx`:

1. **Dual-mode UI** (signup vs login) with mode toggle
2. **Duplicate email detection** on signup attempt
3. **Onboarding-aware redirect** after authentication

## Changes

### 1. Auth.tsx — Dual-mode page with signup/login toggle

Add a `mode` state: `'signup'` (default, linked from "Get started") or `'login'`.

| Mode | Heading | Subtext | Footer link |
|------|---------|---------|-------------|
| `signup` | "Create your account" | "Start building your signal record." | "Already have an account? Sign in" → switches to login |
| `login` | "Welcome back" | "Sign in to access your signal record." | "New here? Create an account" → switches to signup |

Support URL parameter `?mode=login` so existing-account users can be linked directly to login mode.

### 2. Auth.tsx — Duplicate email handling on signup

In signup mode, before calling `signInWithOtp`, check if the email already has an account by attempting a lookup. Since Supabase's `signInWithOtp` creates new accounts automatically (no way to distinguish), we handle this at the UX level:

- When in **signup mode** and the magic link is sent, if the user clicks the link and the profile already has `onboarding_complete = true`, that means they already had an account. Show a toast: "Looks like you already have an account — we've signed you in."
- Add a visible note under the email field in signup mode: "Already have an account? Sign in instead" as a clickable link.

**Note:** Supabase `signInWithOtp` doesn't distinguish new vs existing users at call time. The duplicate detection happens post-auth by checking the profile state. This is the standard pattern for magic-link-only auth.

### 3. Auth.tsx + App.tsx — Onboarding-aware redirect

Replace the current blanket `Navigate to="/dashboard"` with logic that checks `profiles.onboarding_complete`:

**In Auth.tsx** (when user is already authenticated on page load):
- Query `profiles` for the authenticated user
- If `onboarding_complete === false` → redirect to `/onboarding`
- If `onboarding_complete === true` → redirect to `/dashboard`

**In App.tsx** — Add an `AuthRedirect` component on the root route (`/`):
- Listens for auth state changes (handles magic link return landing on `/`)
- On auth detected: query `profiles.onboarding_complete`
- Route to `/onboarding` or `/dashboard` accordingly

This covers all three scenarios:
- **New account**: profile auto-created by trigger with `onboarding_complete = false` → sent to `/onboarding`
- **Existing account, onboarding complete**: → sent to `/dashboard`
- **Existing account, onboarding incomplete**: → sent to `/onboarding`

### Files modified

| File | What changes |
|------|-------------|
| `src/pages/Auth.tsx` | Add `mode` state, conditional headings/copy, onboarding-aware redirect logic, footer toggle links |
| `src/App.tsx` | Add `AuthRedirect` wrapper to handle magic link returns on `/` with onboarding check |

No database changes needed — the existing `profiles` table and `handle_new_user` trigger already support this.

