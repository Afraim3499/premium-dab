# Phase 01 — Project Foundation, Premium Direction, Requirements Lock

# Premium Daab Website Build — Phase Plan Context

This phase plan is written for Antigravity / AI-assisted development and a 10-person development team working 14 hours per day. Each phase is planned as a minimum one-week sprint. Do not compress phases unless the work is actually finished, reviewed, and accepted.

## Core product direction
Premium Daab is not a generic coconut seller. It is a premium Bangladeshi young coconut brand with a branded website, premium visuals, area availability checking, one-product shop flow, WhatsApp order handoff, and a manual admin confirmation process.

## Public pages
1. Home
2. Product / Shop
3. Availability
4. Order
5. Events & Bulk Orders
6. Our Story
7. FAQ
8. Contact

## Admin platform
The admin platform must support:
- Order review after the customer clicks final order and is redirected to WhatsApp.
- Manual accept / cancel / mark delivered / mark paid flow.
- Inventory increase / decrease.
- Service area management.
- Product price and stock management.
- WhatsApp message status notes.
- Basic order analytics and order counts.

## Current assets available locally
Use the user's local image assets and ask the user to place them under `/public/assets/premium-daab/` using clean names.

Source file list provided by user:
- D:\premium_dab\product image.jpeg
- D:\premium_dab\Product label close-up.png
- D:\premium_dab\Product topstraw detail.png
- D:\premium_dab\4 dab pack.png
- D:\premium_dab\6 dab family pack.png
- D:\premium_dab\dab cart.png
- D:\premium_dab\Front-facing product hero.png
- D:\premium_dab\menu.png
- D:\premium_dab\Premium Daab logo.png
- D:\premium_dab\premium_daab_product_cutout_actual_transparent.png
- D:\premium_dab\premium_daab_product_cutout_full_canvas_transparent.png
- D:\premium_dab\Product angled left.png
- D:\premium_dab\Product angled right.png

Recommended project asset names:
- `/public/assets/premium-daab/logo.png`
- `/public/assets/premium-daab/product-main.jpeg`
- `/public/assets/premium-daab/product-hero.png`
- `/public/assets/premium-daab/product-angle-left.png`
- `/public/assets/premium-daab/product-angle-right.png`
- `/public/assets/premium-daab/product-top-straw.png`
- `/public/assets/premium-daab/product-label-closeup.png`
- `/public/assets/premium-daab/product-cutout.png`
- `/public/assets/premium-daab/product-cutout-full-canvas.png`
- `/public/assets/premium-daab/menu-board.png`
- `/public/assets/premium-daab/cart-coconut.png`
- `/public/assets/premium-daab/pack-4.png`
- `/public/assets/premium-daab/pack-6.png`

## Tech stack
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Node.js / Route Handlers / Server Actions
- Supabase Postgres
- Supabase Auth for admin
- Supabase Storage optional later; initially use local/public assets
- Vercel later, but deployment is not part of these 10 build phases

## Non-negotiable product logic
- Order count must increase only when the final order button is clicked after all required customer/order fields are valid and the app prepares the WhatsApp redirect.
- That created order is still `pending_whatsapp_confirmation` or similar until admin manually confirms.
- Inventory must not be permanently reduced until admin accepts the order. Optional soft reservation may be used, but final stock reduction happens only on admin accept.
- Admin can add or reduce inventory manually.
- Admin can accept, cancel, mark paid, mark delivered, and write notes.
- Customer flow must stay simple: brand experience → availability check → product/quantity → order details → final CTA → WhatsApp message.



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
Lock the project’s product direction, design quality bar, information architecture, asset inventory, functional requirements, customer journey, admin journey, and engineering standards before anyone starts building production screens.

The main risk at this stage is building quickly but building the wrong thing. This phase prevents that.

## Primary outcomes
By the end of this phase, the team must have:
- A confirmed product scope for the first build.
- A final page map.
- A final admin scope.
- A clean asset inventory.
- A confirmed customer journey.
- A confirmed admin journey.
- Supabase data model direction.
- Design system direction.
- Naming conventions.
- Motion and performance rules.
- A proper issue/task board.
- A definition of done for every page and feature.

## Workstreams

### 1. Brand and experience audit
Review all supplied Premium Daab assets:
- Logo
- Product hero
- Product angle shots
- Top/straw detail
- Label close-up
- 4-pack image
- 6-pack image
- Cart image
- Menu image
- Transparent product cutouts

Document:
- Which images are final production assets.
- Which images need cropping.
- Which images need compression.
- Which images are suitable only for internal reference.
- Which images should never be stretched, blurred, or overused.

### 2. Page and route confirmation
Confirm these public routes:
- `/`
- `/product`
- `/availability`
- `/order`
- `/events`
- `/our-story`
- `/faq`
- `/contact`

Confirm admin routes:
- `/admin/login`
- `/admin`
- `/admin/orders`
- `/admin/orders/[id]`
- `/admin/inventory`
- `/admin/products`
- `/admin/service-areas`
- `/admin/settings`

### 3. Customer journey lock
The final customer flow must be:
1. Customer lands on homepage.
2. Customer understands Premium Daab as a premium Bangladeshi young coconut experience.
3. Customer checks delivery availability.
4. Customer selects product and quantity.
5. Customer fills name, phone, city, area, address, delivery note.
6. Customer sees subtotal, delivery charge, and total.
7. Customer clicks final order button.
8. System validates all required fields.
9. System creates a pending order in Supabase and increments order count.
10. System generates WhatsApp message.
11. Customer is redirected to WhatsApp.
12. Admin later manually confirms or cancels order.

### 4. Admin journey lock
Admin must be able to:
- View new orders.
- Open each order.
- See full WhatsApp message payload.
- Accept order after manual WhatsApp confirmation.
- Cancel order.
- Add internal notes.
- Reduce stock only when accepted.
- Restore/release stock when canceled if any soft-reservation exists.
- Mark order as paid.
- Mark order as delivered.
- Edit service area availability.
- Edit delivery charge by area.
- Edit product price.
- Add stock.
- Reduce stock.

### 5. Data and event logic lock
Define order states:
- `draft_client_only` — before final click, not in database.
- `pending_whatsapp_redirect` — order created after final click and before/while WhatsApp opens.
- `pending_admin_confirmation` — WhatsApp opened, admin has not confirmed.
- `confirmed`
- `cancelled`
- `preparing`
- `out_for_delivery`
- `delivered`

Keep it practical. The database should store the post-final-click order even if the customer does not finish the WhatsApp conversation, because the business needs to measure attempted orders.

### 6. Design quality bar
The site must feel:
- Premium
- Clean
- Bangladeshi
- Fresh
- Trustworthy
- Mobile-first
- Fast
- Smooth
- Not marketplace-like
- Not generic food-delivery-like
- Not too text-heavy

The homepage must be branding-first. The product page and order page handle conversion.

### 7. Sprint board setup
Create tasks for:
- Design system
- Layout components
- Public pages
- Admin platform
- Supabase schema
- WhatsApp message builder
- Inventory logic
- Availability logic
- Accessibility
- Performance
- SEO/AEO/GEO/GIO/SXO/AIO phase
- Blog phase

## Week plan

### Day 1
Project kickoff, asset review, final scope confirmation, page map confirmation.

### Day 2
Customer journey and admin journey workshop. Create flow diagrams.

### Day 3
Data model planning. Confirm order states, inventory behavior, and admin actions.

### Day 4
Design system planning. Confirm colors, typography, spacing, motion behavior, component patterns.

### Day 5
Technical architecture review. Confirm Next.js structure, Supabase client/server split, auth direction.

### Day 6
Write acceptance criteria for all public pages and admin features.

### Day 7
Phase review, gap list, lock Phase 02 handoff.

## Deliverables
- Project scope document.
- Final route map.
- Asset inventory document.
- Customer journey flow.
- Admin journey flow.
- Data logic notes.
- Design quality bar.
- Sprint board with tasks.
- Acceptance criteria for Phase 02.

## Acceptance criteria
This phase is complete only when:
- Every team member knows what is being built.
- The eight public pages are confirmed.
- The admin platform scope is confirmed.
- The order lifecycle is confirmed.
- Asset names and placements are confirmed.
- The team has a visible task board.
- The next phase can start without guessing.
