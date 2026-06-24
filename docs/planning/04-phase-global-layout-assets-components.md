# Phase 04 — Global Layout, Asset Pipeline, Core Public UI Components

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
Build the global website shell and reusable public components that all eight public pages will use. This phase connects the design system to actual routes and ensures assets load fast and correctly.

## Primary outcomes
By the end of this phase:
- Header is production-ready.
- Mobile navigation is production-ready.
- Footer is production-ready.
- Global CTA sections are built.
- Asset pipeline is clean.
- Image optimization rules are applied.
- Basic page layout shells exist.
- Public pages share consistent spacing and visual language.
- Website feels premium before content is fully complete.

## Asset pipeline requirements
Move assets into:

```txt
/public/assets/premium-daab/
```

Recommended names:
- `logo.png`
- `product-main.jpeg`
- `product-hero.png`
- `product-angle-left.png`
- `product-angle-right.png`
- `product-top-straw.png`
- `product-label-closeup.png`
- `product-cutout.png`
- `product-cutout-full-canvas.png`
- `menu-board.png`
- `cart-coconut.png`
- `pack-4.png`
- `pack-6.png`
```

Create `lib/assets.ts`:

```ts
export const premiumDaabAssets = {
  logo: "/assets/premium-daab/logo.png",
  productHero: "/assets/premium-daab/product-hero.png",
  productMain: "/assets/premium-daab/product-main.jpeg",
  productAngleLeft: "/assets/premium-daab/product-angle-left.png",
  productAngleRight: "/assets/premium-daab/product-angle-right.png",
  productTopStraw: "/assets/premium-daab/product-top-straw.png",
  productLabelCloseup: "/assets/premium-daab/product-label-closeup.png",
  productCutout: "/assets/premium-daab/product-cutout.png",
  productCutoutFullCanvas: "/assets/premium-daab/product-cutout-full-canvas.png",
  menuBoard: "/assets/premium-daab/menu-board.png",
  cartCoconut: "/assets/premium-daab/cart-coconut.png",
  pack4: "/assets/premium-daab/pack-4.png",
  pack6: "/assets/premium-daab/pack-6.png",
} as const;
```

## Global layout components

### Public header
Must include:
- Logo
- Home
- Product
- Availability
- Events
- Our Story
- FAQ
- Contact
- Check Availability CTA
- Mobile menu

Behavior:
- Transparent/light over hero if suitable.
- Sticky after scrolling.
- Compact mobile header.
- CTA always visible on desktop.
- Mobile CTA inside drawer and possibly sticky bottom CTA.

### Footer
Must include:
- Logo
- Short brand description.
- Quick links.
- Contact/WhatsApp.
- Service area note: starting from Bashundhara Residential Area and selected Dhaka areas.
- Social links placeholders.
- Payment support placeholders.
- Product of Bangladesh line.
- Copyright.

### Global CTA bands
Create reusable CTA sections:
- Check availability CTA
- Order on WhatsApp CTA
- Events/bulk order CTA
- Waitlist CTA

### Section components
Create:
- `Section`
- `SectionEyebrow`
- `SectionHeading`
- `SectionIntro`
- `FeatureGrid`
- `ImageFrame`
- `PremiumDivider`
- `TrustStrip`
- `MomentCard`
- `PageHero`

## Visual details
Use:
- Cream background.
- Deep green sections.
- Soft palm shadows.
- Gold divider droplets.
- Rounded cards.
- Balanced whitespace.
- Large product visuals.

Do not:
- Add fake labels to images.
- Over-crop product logo.
- Use low-resolution hero backgrounds.
- Use generic stock imagery unless clearly instructed.
- Make footer too heavy on mobile.

## Performance requirements
- Use Next/Image for all local images.
- Preload only critical hero image.
- Add explicit width/height.
- Use responsive sizes.
- Convert large images to optimized versions if necessary.
- Lazy-load below-fold images.
- Use CSS gradients/patterns instead of huge background files when possible.

## Week plan

### Day 1
Place and rename assets. Create asset registry. Test all image paths.

### Day 2
Build public layout shell, header, mobile nav, route highlighting.

### Day 3
Build footer and global CTA components.

### Day 4
Build section primitives, image frame components, trust strip, cards.

### Day 5
Create placeholder shells for all eight public pages using real layout spacing.

### Day 6
Mobile responsiveness pass across all public layout components.

### Day 7
Performance pass, image loading checks, visual QA screenshots.

## Deliverables
- Public layout system.
- Header and mobile nav.
- Footer.
- CTA components.
- Section primitives.
- Asset registry.
- Public page shells.
- Performance notes for image usage.

## Acceptance criteria
This phase is complete only when:
- All public pages share the same premium layout language.
- Header/footer work on mobile and desktop.
- Assets are organized and loaded through a registry.
- No broken images.
- No image stretching.
- Core Web Vitals are not damaged by the global layout.
