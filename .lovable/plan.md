

# Proof of Signal — Updated Plan with Imagery

This revision adds imagery strategy to the existing plan, focusing on the landing page and key moments throughout the app.

## Imagery Strategy

### Landing Page Imagery

1. **Hero Section** — Abstract illustration or subtle background graphic evoking signal/pattern themes. Think: flowing lines, interconnected nodes, or a gentle wave pattern in navy and blush pink. Not a stock photo — a crafted SVG or CSS-based visual that feels intentional and branded.

2. **Features/Storytelling Section** — Custom icon illustrations for each value proposition (e.g., a journal/notebook icon for signal capture, a constellation/connected-dots icon for pattern recognition, a compass or north star for growth direction). These should be line-art style in the brand palette, not generic flat icons.

3. **Social Proof Section** — Abstract avatar illustrations or silhouettes rather than stock headshots. Stylized, geometric representations of women in PM — maintaining privacy while feeling personal and inclusive.

4. **Final CTA Section** — A warm, gradient-washed illustration showing growth or momentum (ascending curve, blooming shape, or radiating signal waves). Reinforces the "your career, on record" message visually.

### Onboarding Imagery

5. **Welcome Screen (OB-01)** — A single hero illustration: minimal, calming, centered. Could be an abstract representation of a signal being captured — a ripple, a mark being made, a moment being noted.

6. **Signal Example Screen (OB-04)** — A subtle visual treatment around the example signal text. Perhaps a card with a soft glow or a quote-block aesthetic with a decorative element suggesting this is a real moment being preserved.

### Dashboard & Patterns

7. **Empty States** — Illustrated empty states for the timeline (before signals are logged) and the patterns page. Warm, encouraging illustrations that invite action rather than feeling barren.

8. **Insight Card (SC-03)** — A distinctive visual treatment with an icon or small illustration that differentiates insight cards from signal entries in the timeline.

### Implementation Approach

All imagery will be implemented as:
- **Inline SVGs** or **React components** for icons and illustrations (scalable, theme-aware, no external dependencies)
- **CSS gradients and shapes** for abstract backgrounds and decorative elements
- **Lucide icons** as a base, with custom SVG paths for brand-specific illustrations

No stock photography. Everything crafted to feel cohesive with the navy and blush pink palette.

### Updated File Structure Addition

```text
src/
  components/
    illustrations/
      HeroIllustration.tsx        # Landing page hero graphic
      SignalWavePattern.tsx        # Repeating pattern/background element
      FeatureIcons.tsx             # Custom icons for feature cards
      EmptyState.tsx               # Illustrated empty states
      AvatarSilhouettes.tsx        # Stylized testimonial avatars
```

Everything else from the previous plan remains unchanged. Build order stays the same — imagery components are created alongside the pages that use them.

