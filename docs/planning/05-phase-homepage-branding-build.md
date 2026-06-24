# Phase 05 — Homepage Branding Build

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
Build the homepage as a premium brand experience. The homepage must not become a long order form or generic ecommerce page. It should make Bangladeshi customers feel Premium Daab is cleaner, more beautiful, and more reliable than ordinary daab purchasing.

## Homepage goal
The homepage should make the visitor think:

> This is not just daab. This is a premium young coconut experience I can trust, serve, gift, and order.

## Required homepage sections

### 1. Cinematic hero
Use:
- `Front-facing product hero.png` or `product-hero.png`
- Logo in header only, not repeated too aggressively.
- Strong headline.

Copy direction:
- “100% Natural. Beautifully Served. Delivered Fresh.”
- “Premium Daab brings Bangladesh’s favorite natural refreshment into a cleaner, more premium, ready-to-drink experience.”

CTAs:
- Check Availability
- Order on WhatsApp

Hero details:
- Product image prominent.
- Palm shadow.
- Cream background.
- Deep green and gold accents.
- Mobile-first composition.

### 2. Trust strip
Cards:
- Freshly Selected
- Hygienically Prepared
- Delivered Fresh
- WhatsApp Ordering

Use line icons, not big images.

### 3. Brand statement
Headline:
- “Daab has always been natural. We made the experience premium.”

Support copy:
- Explain the transformation from everyday daab to clean, branded, delivery-ready premium daab.

### 4. Product preview
Use:
- Product cutout
- Product angled left/right
- Product top/straw detail

Content:
- Natural hydration.
- Clean presentation.
- Ready to drink.
- Premium serving experience.

CTA:
- View Product

### 5. Availability preview
Mini area checker:
- City dropdown.
- Area dropdown.
- Result card.
- Button to full availability page.

Do not include full order form on homepage.

### 6. Made for moments
Use cards:
- Morning refreshment
- Office break
- Guest serving
- Post-workout
- Family summer order
- Events & catering

If no lifestyle images are available, use elegant icon cards and product-led layouts, not random AI images.

### 7. Events and bulk preview
Use:
- `dab cart.png`
- `4 dab pack.png`
- `6 dab family pack.png`

Content:
- Offices
- Weddings
- Rooftops
- Cafés
- Gyms
- Brand activations

CTA:
- Explore Events & Bulk Orders

### 8. Final CTA
Headline:
- “Check if Premium Daab is available near you.”

CTA:
- Check Availability
- Contact on WhatsApp

## Motion requirements
- Hero product soft fade/slide.
- Cards fade-up on scroll.
- Button hover micro-interaction.
- No heavy carousel.
- No motion that delays CTA.

## Backend dependencies
Homepage availability preview can fetch available city/area data from Supabase or static fallback if Phase 06 is not ready.

## Week plan

### Day 1
Build hero section with final product image and responsive layout.

### Day 2
Build trust strip and brand statement section.

### Day 3
Build product preview and availability preview section.

### Day 4
Build made-for-moments and events preview sections.

### Day 5
Build final CTA and homepage footer integration.

### Day 6
Motion, mobile responsiveness, and image optimization.

### Day 7
Full homepage QA: visual polish, copy review, performance check, screenshot approval.

## Deliverables
- Completed homepage route `/`.
- Responsive hero and all homepage sections.
- Reusable homepage components if needed.
- Mobile screenshot set.
- Desktop screenshot set.

## Acceptance criteria
This phase is complete only when:
- Homepage feels premium and brand-first.
- It does not look like a grocery site.
- Main CTAs are clear.
- It uses available assets properly.
- Mobile load and layout are excellent.
- The homepage naturally pushes users to availability, product, order, and events pages.
