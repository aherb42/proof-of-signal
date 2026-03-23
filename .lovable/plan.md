

# Make All Pages Full-Width

## What Changes

Four pages currently use `container mx-auto max-w-2xl` constraining content to ~672px. Update them to use the same full-width pattern as the landing page (`Index.tsx`): `w-full px-8 md:px-16 lg:px-24` with `max-w-[1600px] mx-auto`.

## Pages to Update

| Page | File | Current constraint |
|------|------|--------------------|
| Dashboard | `src/pages/Dashboard.tsx` | `container mx-auto px-6 py-10 max-w-2xl` |
| Patterns | `src/pages/Patterns.tsx` | `container mx-auto px-6 py-10 max-w-2xl` |
| Profile | `src/pages/Profile.tsx` | `container mx-auto px-6 py-10 max-w-2xl` |
| Onboarding | `src/pages/Onboarding.tsx` | `max-w-md` on content (centered — keep this one centered by design) |

**Onboarding** should stay centered since it's a focused step-by-step flow. Only Dashboard, Patterns, and Profile need the full-width treatment.

## Specific Changes

For Dashboard, Patterns, and Profile, replace the outer content wrapper:

**From:** `container mx-auto px-6 py-10 max-w-2xl`
**To:** `w-full px-8 md:px-16 lg:px-24 py-10 max-w-[1600px] mx-auto`

For Dashboard and Patterns, consider using a two-column grid layout at `lg:` breakpoint to take advantage of the wider space (e.g., form + timeline side by side on Dashboard).

## Prompt to Execute

> Make Dashboard, Patterns, and Profile pages full-width to match the landing page layout. Replace `container mx-auto px-6 py-10 max-w-2xl` with `w-full px-8 md:px-16 lg:px-24 py-10 max-w-[1600px] mx-auto` in all three files. On Dashboard, use a two-column `lg:grid-cols-2` layout: left column for the checklist + signal form, right column for the timeline. On Patterns, use the full width for the tag distribution bars and insight card. On Profile, spread the content sections across the wider space. Do NOT change Onboarding — it should stay centered. Make all changes in one pass.

This should take **1 credit** (single message, three file edits).

