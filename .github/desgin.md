---
name: Serene Sleep
colors:
  surface: "#17130d"
  surface-dim: "#17130d"
  surface-bright: "#3e3831"
  surface-container-lowest: "#110e08"
  surface-container-low: "#1f1b14"
  surface-container: "#231f18"
  surface-container-high: "#2e2922"
  surface-container-highest: "#39342d"
  on-surface: "#ebe1d6"
  on-surface-variant: "#d0c5b5"
  inverse-surface: "#ebe1d6"
  inverse-on-surface: "#353028"
  outline: "#999081"
  outline-variant: "#4d463a"
  surface-tint: "#e1c386"
  primary: "#e1c386"
  on-primary: "#402d00"
  primary-container: "#a88d56"
  on-primary-container: "#372700"
  inverse-primary: "#725b29"
  secondary: "#d9c4a0"
  on-secondary: "#3b2f15"
  secondary-container: "#55472c"
  on-secondary-container: "#cab693"
  tertiary: "#f8b990"
  on-tertiary: "#4d2609"
  tertiary-container: "#bc845f"
  on-tertiary-container: "#442004"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#ffdfa0"
  primary-fixed-dim: "#e1c386"
  on-primary-fixed: "#261a00"
  on-primary-fixed-variant: "#584413"
  secondary-fixed: "#f6e0bb"
  secondary-fixed-dim: "#d9c4a0"
  on-secondary-fixed: "#251a04"
  on-secondary-fixed-variant: "#53452a"
  tertiary-fixed: "#ffdcc7"
  tertiary-fixed-dim: "#f8b990"
  on-tertiary-fixed: "#311300"
  on-tertiary-fixed-variant: "#673c1d"
  background: "#17130d"
  on-background: "#ebe1d6"
  surface-variant: "#39342d"
typography:
  headline-lg:
    fontFamily: Public Sans
    fontSize: 40px
    fontWeight: "700"
    lineHeight: 52px
  headline-md:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: "600"
    lineHeight: 42px
  body-lg:
    fontFamily: Public Sans
    fontSize: 22px
    fontWeight: "400"
    lineHeight: 34px
  body-md:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  label-lg:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 24px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  touch-target-min: 56px
  margin-edge: 24px
  gutter: 16px
  stack-gap: 20px
---

## Brand & Style

The design system is centered on the principles of dignity, clarity, and tranquility. Tailored for elderly users, it prioritizes cognitive ease and visual accessibility without feeling "medical" or overly clinical. The brand personality is supportive and quiet, acting as a reliable companion for a restorative night's rest.

The design style employs a **Minimalist** approach with **High-Contrast** functional elements. By utilizing expansive whitespace (or "dark space") and a restricted color palette, the system eliminates visual noise. The aesthetic is modern and clean, ensuring that the most critical information—sleep quality and time—is immediately legible at a glance, even in low-light environments.

## Colors

This design system utilizes a **dark mode** default to accommodate night-time usage and reduce eye strain for elderly users. The primary palette consists of muted gold and earthy wood tones, creating a grounded, sunset-inspired atmosphere that signals the end of the day.

For data visualization and interactive elements, high-visibility accent colors are used to ensure color-blind accessibility and high contrast against the dark background.

- **Primary:** Muted Gold (#8D743F) for core surfaces and branding.
- **Secondary:** Warm Bronze (#867556) for active states and secondary buttons.
- **Tertiary:** Burnt Sienna (#9F6B48) for specialized data highlights or caution states.
- **Text:** High-contrast warm taupe (#7D766D) for secondary labels and off-white for primary readability, maintaining a contrast ratio exceeding WCAG standards for older eyes.

## Typography

Typography in this design system is optimized for maximum legibility and Traditional Chinese character clarity. **Public Sans** is selected for its neutral, institutional clarity and excellent numerals.

For Traditional Chinese support, the system defaults to **Noto Sans TC**. To accommodate age-related vision changes:

- **Large Base Size:** The minimum body text size is 18px.
- **Generous Leading:** Line height is increased to prevent "crowding" of dense Traditional Chinese characters.
- **Weight:** Avoid light weights; use Regular (400) for body and Bold (700) for headers to maintain stroke definition against dark backgrounds.
- **Hierarchy:** Use scale rather than color tinting to indicate hierarchy, ensuring that even lower-priority information remains readable.

## Layout & Spacing

The layout follows a **Fixed Grid** model on mobile devices to ensure predictable placement of interactive elements. A simplified 4-column grid is used for internal card layouts, while the overall page structure relies on a single-column vertical stack to minimize cognitive load.

- **Touch Targets:** All interactive elements (buttons, toggles, list items) must have a minimum height of 56px to accommodate reduced motor precision.
- **Rhythm:** An 8px linear scale governs the spacing, with a heavy emphasis on large gaps (20px+) between distinct functional groups to prevent accidental taps.
- **Safe Zones:** Generous 24px side margins ensure content does not bleed into the curved edges of modern devices, maintaining high visibility for the start and end of Chinese text lines.

## Elevation & Depth

This design system uses **Tonal Layers** rather than complex shadows to define hierarchy. In a dark environment, subtle differences in surface lightness are more effective and less visually fatiguing than heavy drop shadows.

- **Level 0 (Background):** Purest dark for the base canvas.
- **Level 1 (Cards/Containers):** Slightly lighter warm-grey to define content areas.
- **Level 2 (Interactions):** Active elements use a golden stroke or fill to appear "closer" to the user.
- **Outlines:** Low-contrast 1px borders are used to define the boundaries of cards and inputs, ensuring that even users with low contrast sensitivity can perceive the container limits.

## Shapes

The shape language is **Rounded**, utilizing a 0.5rem (8px) base radius. This creates a friendly and approachable feel while maintaining enough structure to look organized and reliable.

- **Buttons:** Large, rounded-lg (16px) corners to create a distinct "pill-like" appearance that is clearly tappable.
- **Cards:** Use rounded-xl (24px) to encapsulate sleep data modules, creating soft "islands" of information.
- **Icons:** Use thick, rounded strokes (min 2pt stroke weight) to match the UI's radius, ensuring they remain legible at larger scales.

## Components

### Buttons

Primary buttons are high-contrast, solid-fill muted gold blocks with bold text. Secondary buttons use a thick 2px ghost-border style. Every button includes a large icon (24px+) paired with text to ensure the function is clear.

### Cards

Data cards are the primary vessel for sleep metrics. They feature a single primary metric (e.g., "82" Sleep Score) in a large display font, followed by a clear Traditional Chinese label. Cards should never contain more than three points of information.

### Lists

Lists items are separated by clear horizontal dividers. Each list item has a minimum height of 64px and uses a "chevron-right" icon to clearly indicate navigability.

### Toggles & Controls

Switches are oversized with high-contrast color shifts (Taupe for OFF, Gold for ON). Sliders for "Wake Up Time" use large, tactile handles that are easy to grab and drag.

### Navigation

The bottom navigation bar uses large icons with text labels. The active state is indicated by both a color change and a thick top-border highlight, providing redundant cues for the user.

### Data Visualization

Sleep stages are represented by thick, horizontal bars rather than thin lines. High-contrast tonal colors (Gold, Bronze, Sienna) differentiate phases without relying on fine-print legends.
