# Salient Presentation Design System

This skill guides modifications and additions to the Salient sales presentation. All changes must adhere to the established design language—a **refined, premium fintech aesthetic** that communicates trust, sophistication, and technical competence.

## Design Philosophy

**Aesthetic Direction: Editorial Luxury Fintech**

The Salient presentation embodies a **warm minimalism** with editorial precision. Think high-end financial publication meets modern SaaS—clean but never cold, sophisticated but approachable. Every element should feel considered and intentional.

**Core Principles:**
- **Warmth over sterility**: Cream tones instead of pure whites
- **Restraint with impact**: Generous whitespace punctuated by bold typography
- **Trust signals**: Subtle shadows, refined borders, premium feel
- **Clarity**: Information hierarchy through scale, weight, and space—not decoration

## Color System

Use these CSS variables exclusively. Never introduce new colors without updating this system.

```javascript
const colors = {
  cream: '#FAF6F2',              // Primary light background
  creamSecondary: '#F6F0E9',     // Secondary light background (data slides)
  charcoal: '#0F0F0F',           // Text, dark backgrounds, high contrast
  muted: 'rgba(15, 15, 15, 0.6)', // Secondary text, captions
  accent: '#C9A962',              // Warm gold - CTAs, highlights, key metrics
  accentMuted: 'rgba(201,169,98,0.15)', // Gold tint for subtle backgrounds
  success: '#3D7C5E',             // Muted sage green - positive indicators
  error: '#9B4D4D',               // Muted burgundy - negative indicators, warnings
};
```

**Color Usage Rules:**
- Dark theme slides: `charcoal` background with white text
- Light theme slides: `cream` background with `charcoal` text
- Secondary/data slides: `creamSecondary` background
- Accent gold is RESERVED for: CTAs, key metrics, progress indicators, final values
- Success/error colors for data visualization only—never decorative

## Typography

**Font Stack:**
- **Display/Headers**: `Halant, Georgia, serif` — A distinguished serif with character
- **Body/UI**: `Geist, system-ui, sans-serif` — Clean, modern sans-serif

**Header Styling (headerStyle):**
```javascript
{
  fontFamily: 'Halant, Georgia, serif',
  lineHeight: '0.9',        // Tight leading for impact
  letterSpacing: '-0.02em', // Slight negative tracking
  fontWeight: 400           // Regular weight, let the typeface speak
}
```

**Type Scale:**
- Hero titles: `text-8xl` (slide 1 only)
- Section titles: `text-5xl` to `text-6xl`
- Slide headers: `text-4xl`
- Subheads: `text-xl` to `text-2xl`
- Body: `text-sm` (14px)
- Captions/labels: `text-xs` (12px)
- Micro text: `text-[10px]` or `text-[9px]`

**NEVER use**: Inter, Roboto, Arial, Space Grotesk, or generic system fonts for visible text.

## Component Patterns

### SlideCanvas
Base container for all slides. Three themes: `light`, `secondary`, `dark`.
- Padding: `p-12` (48px)
- Always includes theme-appropriate background and text colors

### Badge
Breadcrumb-style context indicator. Appears top-left of content slides.
```
[gold bar] [DARK PILL WITH UPPERCASE TEXT]
```
- Vertical gold accent bar (4px × 16px, rounded)
- Dark pill with `tracking-widest` uppercase text
- Use `light` variant on dark backgrounds

### Card
Premium container with consistent styling:
- Border radius: `24px` (always)
- Light cards: white background, subtle border `rgba(0,0,0,0.04)`, soft shadow
- Dark cards: charcoal background, subtle white border `rgba(255,255,255,0.06)`
- Padding: `p-6` standard, `p-7` for feature cards

### Metric
Large data display with left border accent:
- Number: `text-5xl` with Halant serif
- Label: Uppercase, `tracking-widest`, `text-[10px]`
- Left border for visual rhythm

## Spatial Rules

**Border Radius:**
- Cards, buttons, pills: `24px` or `rounded-full`
- Internal elements: `16px` or `12px`
- Small tags/badges: `12px` or `rounded-full`
- Never use: `rounded`, `rounded-lg` generically

**Shadows:**
- Light cards: `0 4px 20px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)`
- Dark cards: `0 4px 24px rgba(0,0,0,0.3)`
- Slide container: `0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.03)`

**Spacing:**
- Slide gaps: `gap-6` to `gap-8`
- Card internal: `space-y-2` to `space-y-4`
- Grid gaps: `gap-4` to `gap-6`

## Icon Usage

Source: **Lucide React** with `strokeWidth={1.5}`

Icons appear in:
- Circular containers (light bg on dark theme, cream bg on light theme)
- Container sizing: `w-10 h-10` to `w-12 h-12` with `24px` border radius
- Icon sizing: `w-4 h-4` to `w-5 h-5`
- Always `opacity-50` or `opacity-60` unless active/highlighted

## Animation

Minimal, purposeful motion:
- Slide transitions: `0.4s ease-out` fade
- Hover states: `transition-all duration-200`
- No bouncy, playful, or attention-grabbing animations
- Motion communicates state change, never decoration

## Slide Types Reference

| Type | Theme | Purpose |
|------|-------|---------|
| title | light | High-impact opening, centered |
| agenda | light | Overview with numbered cards |
| ideal-partner | secondary | Data + characteristics |
| problem/impact | light | Pain points with metrics |
| solution-intro | dark | Transition, reset the room |
| why-salient | dark | Feature showcase |
| lifecycle-overview | light | Process visualization |
| claims-ui | secondary | Product mockup |
| phase-X | light | Process detail |
| feature-X | light/secondary | Feature deep-dive |
| comparison | light | Before/after split |
| value-prop | secondary | ROI with large metrics |
| takeaways | dark | Closing with CTA |

## What NOT to Do

- Add decorative gradients or mesh backgrounds
- Use purple, blue, or "tech startup" color schemes
- Add playful illustrations or cartoon elements
- Use rounded corners inconsistently
- Add drop shadows that feel heavy or dated
- Use more than 2-3 colors on any single slide
- Break the established component patterns
- Add animations that distract from content

## Making Changes

When modifying this presentation:

1. **New slides**: Follow the closest existing slide type pattern
2. **New components**: Build from Card, Badge, or Metric primitives
3. **New data**: Use the Metric component or established data visualization patterns
4. **Color additions**: Only within the existing palette; accent sparingly
5. **Typography**: Use only Halant (display) and Geist (body)

The goal is **invisible design**—every element should feel like it belongs, nothing should call attention to itself as "designed." The content leads; the aesthetic supports.
