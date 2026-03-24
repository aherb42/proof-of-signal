

# Add Photo to Landing Page Hero (Keeping Illustration)

Add the uploaded photo alongside the existing animated signal illustration in the hero section, maintaining the wavy aesthetic.

## Approach

Place the photo in a blob/organic shape behind or beside the `HeroIllustration`, creating a layered composition where the animated signal rings overlay or sit next to the photo.

## Layout

```text
┌─────────────────────────────────────────────┐
│  Proof of Signal        [ blob-clipped  ]   │
│  Your career,           [   PHOTO       ]   │
│  on record.             [ signal rings  ]   │
│  [Get started] [Demo]   [ overlaid on   ]   │
│                         [    top         ]   │
│  ~~~~~~~~~~~~ wave divider ~~~~~~~~~~~~~~~~ │
└─────────────────────────────────────────────┘
```

## Steps

1. **Copy uploaded image** to `public/hero-photo.jpeg`

2. **Create `HeroComposition` component** (`src/components/illustrations/HeroComposition.tsx`):
   - Renders a container with the photo clipped in a blob shape using CSS `clip-path`
   - Overlays the existing `<HeroIllustration />` on top with absolute positioning
   - Photo has a soft blush border/glow to match the brand

3. **Update `src/pages/Index.tsx`**:
   - Replace the `<HeroIllustration />` in the hero right column (line ~86) with `<HeroComposition />`
   - No other section changes

## Technical Details

- CSS `clip-path` with an organic blob polygon for the photo
- `HeroIllustration` positioned absolutely over the photo with `mix-blend-mode` or partial opacity so both elements are visible
- The signal rings animate over the photo, creating a "signals emanating from you" effect

