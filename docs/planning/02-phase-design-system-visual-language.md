# Phase 02 — Design System, Visual Language, Motion Rules, Component Blueprint

## Team model for every phase

Assume 10 developers working 14 hours/day. Treat each phase as a full one-week sprint, not a small task list.

Suggested allocation:
- 1 Technical Lead / Architect
- 1 UI Systems Lead
- 3 Frontend Developers
- 2 Backend / Supabase Developers
- 1 Admin Platform Developer
- 1 QA / Test Automation Developer
- 1 Content/SEO/UX Implementation Developer

Daily rhythm:
- Start of day: 30-minute plan and blocker review.
- Midday: component/API integration sync.
- End of day: QA review, screenshot review, issue list, next-day lock.
- Every phase must end with a written handoff and acceptance checklist.


## Phase duration
Minimum 1 full week.

## Phase objective
Build the complete Premium Daab design system before production pages are implemented. This phase should make the website look premium by default, not by manually styling each section randomly.

## Primary outcomes
By the end of this phase, the team must have:
- Final color system.
- Typography scale.
- Spacing scale.
- Button system.
- Card system.
- Form system.
- Navigation system.
- Footer system.
- Product media treatment.
- Motion rules.
- Responsive breakpoints.
- Accessibility contrast checks.
- Reusable UI component plan.

## Design principles
Premium Daab must not look like a generic ecommerce template. The design should feel like:
- A premium beverage brand.
- A clean Bangladeshi natural product.
- A modern lifestyle refreshment.
- A website people trust enough to order from.

## Brand color system

### Primary colors
- Deep coconut green: `#063D28`
- Dark premium green: `#022C1E`
- Leaf green: `#2F6B3A`
- Cream white: `#F8F3E6`
- Coconut ivory: `#FFF9EC`
- Warm sand: `#E6D5B8`
- Premium gold: `#C49A3A`
- Soft gold: `#E0C477`

### Functional colors
- Success green: `#137A42`
- Warning amber: `#B7791F`
- Error red: `#B42318`
- Text dark: `#14251B`
- Muted text: `#5F6F63`
- Border soft: `#E5D9C4`

## Typography direction
Use a premium serif for hero/headline moments and a clean sans-serif for all functional reading.

Recommended pairing:
- Headline: Playfair Display, Cormorant Garamond, or similar premium serif.
- Body: Inter, Manrope, or similar clean sans-serif.

Rules:
- No thin unreadable fonts.
- Hero text can be large and cinematic.
- Forms must use highly readable sans-serif.
- Do not overuse all-caps.
- Bangla text must use a high-quality Bangla font if used in UI or menu sections.

## Component system

### Buttons
Create:
- Primary CTA: deep green background, cream text, subtle gold edge or highlight.
- Secondary CTA: transparent/cream background with green border.
- WhatsApp CTA: green with WhatsApp icon and clear label.
- Admin action buttons: confirm, cancel, paid, delivered, edit.

Button states:
- Default
- Hover
- Active
- Disabled
- Loading
- Success

### Cards
Create:
- Product card
- Feature card
- Availability result card
- Order summary card
- Admin order card
- Service area card
- FAQ accordion card
- Blog card
- Event use-case card

Cards must use:
- Soft cream background.
- Subtle border.
- Large radius.
- Minimal shadow.
- Gold micro-accent only when useful.

### Forms
Create:
- Text input
- Phone input
- Select
- Textarea
- Quantity stepper
- Admin filters
- Admin table controls
- Error state
- Helper text
- Required field labels

Forms must feel premium, not default browser forms.

### Navigation
Public header:
- Logo left
- Nav links center/right
- Primary CTA: Check Availability
- Mobile hamburger drawer
- Sticky behavior after scroll

Admin header/sidebar:
- Orders
- Inventory
- Products
- Service Areas
- Settings
- Logout

### Footer
Footer must include:
- Logo
- Brand one-liner
- Quick links
- Contact
- Service area mention
- Social links
- Payment support display
- Product of Bangladesh line

## Motion rules
Motion should feel slow, clean, and premium.

Use:
- Smooth fade-up sections.
- Gentle product parallax.
- Soft palm shadow movement.
- Hover lift on cards.
- Button micro-interactions.
- Quantity counter animation.
- Admin status badge transitions.

Avoid:
- Fast flashy animation.
- Too many moving leaves.
- Motion that delays ordering.
- Heavy JavaScript animation on mobile.

Suggested tools:
- CSS transitions for most interactions.
- Framer Motion only for high-impact areas if performance remains strong.
- Respect `prefers-reduced-motion`.

## Image treatment rules
Images must be:
- Cropped intentionally.
- Optimized with Next/Image.
- Given explicit width/height.
- Used in WebP/AVIF where possible.
- Never stretched.
- Never blurry.
- Never used as giant uncompressed backgrounds.

For assets with text, avoid placing new text on top.

## Responsive design requirements
Breakpoints:
- Mobile: 360–767
- Tablet: 768–1023
- Desktop: 1024–1439
- Large desktop: 1440+

Mobile is the highest priority because customers in Bangladesh will mostly use phones.

## Week plan

### Day 1
Create design tokens: colors, fonts, spacing, radius, shadows, z-index, breakpoints.

### Day 2
Create base UI components: buttons, inputs, cards, badges, icons, container, section headers.

### Day 3
Create public layout components: header, mobile nav, footer, CTA band, product media frame.

### Day 4
Create order UI components: quantity selector, price summary, availability result, WhatsApp CTA, form validation visuals.

### Day 5
Create admin UI components: sidebar, tables, filters, order status badge, admin forms, action modals.

### Day 6
Create motion patterns and responsive behavior. Test reduced-motion.

### Day 7
Review in Storybook or local component preview. Fix inconsistencies.

## Deliverables
- Design token file.
- Tailwind theme extension.
- Base component library.
- Motion guideline.
- Responsive guideline.
- UI preview route or Storybook-like internal page.
- Screenshot review folder.

## Acceptance criteria
This phase is complete only when:
- The team can build every page using reusable components.
- Buttons, cards, forms, headers, and footers are final enough for production.
- Mobile and desktop patterns are defined.
- Motion rules are implemented safely.
- No page needs one-off random styling to look premium.
