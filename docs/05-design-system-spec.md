# Design System & Visual Tokens Specification

This document details the design system, color palette tokens, typography rules, component styling specifications, and motion guidelines for the Premium Daab brand website.

---

## 1. Visual Tokens (CSS Variables)

```css
:root {
  /* Green Color Scale (Purity & Premium feel) */
  --pd-green-950: #062918;
  --pd-green-900: #0B3A22; /* Primary Brand Green */
  --pd-green-800: #104A2D;
  --pd-green-700: #185C38;
  
  /* Cream Color Scale (Tropical Backgrounds) */
  --pd-cream-50: #FFFDF7;  /* Main Page Background */
  --pd-cream-100: #F8F2E5; /* Alternative Section Background */
  --pd-cream-200: #EFE4CC; /* Accent Border & Highlights */
  
  /* Gold Color Scale (Refined Accents) */
  --pd-gold-500: #C69A3D; /* Accents, Icons, Badges */
  --pd-gold-600: #A87D24; /* Hover/Focus state gold */

  /* Text & Border Color Scales */
  --pd-text: #112318;
  --pd-muted: #667468;
  --pd-border: rgba(11, 58, 34, 0.16);

  /* Spacing Scale */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 72px;

  /* Border Radii */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
}
```

---

## 2. Typography

We use editorial typographic contrast to balance premium look and mobile readability:
*   **Headings (H1, H2, H3)**: Font family `Cormorant Garamond` (or `Playfair Display` fallback). Serif, elegant, spacious letter-spacing.
*   **Body & UI Details**: Font family `Inter` (or `Manrope` fallback). Sans-serif, highly legible at small scales on mobile screens.

```css
h1, h2, h3 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  color: var(--pd-green-900);
}

body, button, input, select, textarea {
  font-family: 'Inter', sans-serif;
  color: var(--pd-text);
}
```

---

## 3. UI Component Specifications

### A. Buttons
*   **Primary Button**: Green background (`--pd-green-900`), cream text (`--pd-cream-50`), rounded 12px–16px, medium weight, subtle lift hover animation.
*   **Secondary Button**: Transparent background, green border (`--pd-border`), green text (`--pd-green-900`), rounded 12px–16px.
*   **WhatsApp Action Button**: Vivid WhatsApp green color block (`#25D366`), white text, featuring an SVG WhatsApp icon aligned left, with high-visibility CTA copy.

### B. Cards
1.  **Brand Proof Card**: Airy layouts, `--pd-cream-100` background, subtle green borders (`--pd-border`), spacious padding.
2.  **Product Information Card**: Elevated container, rounded 20px–28px, holds details like unit size, delivery charges, and product angled images.
3.  **Admin Operational Card**: Minimalist flat table styling, utilizing white/cream alternate background fills to prioritize readability over decoration.

### C. Forms
*   **Input Fields**: Height: 48px–52px. Large labels, border rounded to 12px. Error alerts appear in red text immediately beneath the input field when validation fails. Focus states use an outline of `--pd-green-700`.

---

## 4. Layout and Structure

*   **Maximum Width**: Public container max-width: `1280px` (with auto horizontal margins).
*   **Section Padding**:
    *   Desktop: `72px` vertical padding.
    *   Tablet: `48px` vertical padding.
    *   Mobile: `32px` vertical padding.
*   **Global Layout**: Sticky top header (logo, nav links, primary "Check Availability" CTA) and a rich, dark-green footer (`--pd-green-950` background with gold `--pd-gold-500` details).

---

## 5. CSS Motion Guidelines

Animations must remain lightweight and preserve mobile scrolling smoothness:
1.  **Transitions**: Use `transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);` for hover animations.
2.  **Hero Fade**: Slowly fade-in the primary product cutout on page load.
3.  **No Heavy Blockers**: Avoid using complex parallax libraries or autoplaying videos that restrict scrolling performance on iOS/Android browsers.
4.  **Accessibility**: Fully support standard CSS media queries for `@media (prefers-reduced-motion: reduce)`.
