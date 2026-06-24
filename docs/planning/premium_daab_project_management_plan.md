# Premium Daab Website Project Management Plan

**Document type:** Project Management Plan / Single Source of Truth  
**Project:** Premium Daab Brand Website, Shop, WhatsApp Ordering Flow, Supabase Inventory, and Admin Platform  
**Prepared for:** Premium Daab Development, Product, Brand, Content, and Operations Teams  
**Primary launch market:** Bashundhara Residential Area, Dhaka, Bangladesh  
**Primary technology direction:** Next.js App Router, React, Node.js server actions/API routes, Supabase, Vercel target environment  
**Deployment scope:** This plan covers full website and platform build readiness. It does not cover final production deployment execution.  
**Planning assumption:** 10 developers, 14 hours/day, each major phase planned as at least one serious week of work.  
**Status:** Master working plan  

---

## 0. How to Use This Document

This Project Management Plan is the single source of truth for the Premium Daab website and platform build. Every developer, designer, content writer, QA person, product owner, and admin operator should use this document before making implementation decisions.

This plan is not a loose creative brief. It is the controlling document for:

- Product scope
- Brand website structure
- User journeys
- Admin workflows
- Supabase data model
- Inventory logic
- WhatsApp order logic
- Content requirements
- UI/UX standards
- Performance standards
- SEO/AEO/GEO/GIO/SXO/AIO readiness
- Blog strategy
- QA gates
- Acceptance criteria
- Team responsibilities
- Workstream dependencies
- Risk management
- Change control

If a feature, page, component, interaction, data field, or visual treatment is not aligned with this plan, it should not be shipped without formal approval.

### 0.1 Core Operating Rule

Premium Daab is not being built as a simple static website or a generic online shop. The website must feel like a premium Bangladeshi beverage brand while still functioning as a fast, conversion-focused ordering platform.

The homepage sells the brand feeling.  
The product page builds trust in the product.  
The availability page checks delivery eligibility.  
The order page converts the user to WhatsApp.  
The admin platform controls inventory and order confirmation manually.  
The content system builds long-term trust, search visibility, and local authority.

### 0.2 What This Plan Does Not Cover

This plan does not include final deployment execution, production domain DNS configuration, payment gateway onboarding, legal registration, vendor contracts, or live delivery operations beyond the website/admin workflows needed to support those operations.

---

## 1. Project Charter

### 1.1 Project Name

**Premium Daab Digital Brand Platform**

### 1.2 Project Purpose

Build a premium, ultra-fast, visually rich website and ordering platform for Premium Daab, Bangladesh's first branded young coconut experience. The platform must support branding, product education, availability checking by city/area, quantity-based ordering, WhatsApp order handoff, Supabase-backed order counting, manual admin confirmation, and inventory control.

### 1.3 Strategic Positioning

Premium Daab must not be positioned as a commodity coconut seller. The product must be positioned as:

> A clean, premium, ready-to-drink young coconut experience for modern Bangladeshi homes, offices, gyms, events, and daily refreshment moments.

The website should make customers feel that they are not just buying daab. They are buying a cleaner, more reliable, more beautiful, more premium version of a drink Bangladesh already loves.

### 1.4 Business Objectives

1. Build market trust for Premium Daab as a premium natural beverage brand.
2. Convert visitors into WhatsApp orders with minimal friction.
3. Launch with area-based delivery availability, starting with Bashundhara Residential Area.
4. Capture demand from unavailable areas through waitlist collection.
5. Allow admins to manually confirm, cancel, or manage orders after WhatsApp communication.
6. Allow inventory to be added, reduced, reserved, confirmed, released, and audited.
7. Create a premium digital presence that can later support online payments, subscriptions, carts, corporate orders, event orders, and expanded locations.
8. Build SEO/AEO/GEO/GIO/SXO/AIO foundations from the beginning rather than adding them later.
9. Build a blog/content system that turns product benefits, cleanliness, supply chain quality, taste consistency, and local lifestyle stories into conversion assets.

### 1.5 Success Definition

The project is successful when:

- The homepage feels premium, cinematic, and brand-first.
- The site loads fast despite high-quality visuals.
- The product journey is simple enough for Bangladeshi mobile users.
- A user can check whether Premium Daab is available in their area.
- A user can add product quantity and required delivery information.
- Final order click creates an order record and redirects to WhatsApp with structured order details.
- Order count increments only after the final order action is completed.
- Admin can review, confirm, cancel, and manage orders manually.
- Admin can add/reduce inventory and see order/inventory history.
- Unavailable areas can collect waitlist demand.
- Events/bulk orders are supported through a proper inquiry workflow.
- All public pages are content-rich, brand-aligned, and conversion-oriented.
- The platform is technically scalable, secure, accessible, responsive, and maintainable.

---

## 2. Product Scope

### 2.1 Public Website Pages

The website must include 8 primary public pages:

1. Home
2. Product / Shop
3. Availability
4. Order
5. Events & Bulk Orders
6. Our Story
7. FAQ
8. Contact

### 2.2 Admin Platform Scope

The admin platform must include:

1. Admin login/authentication
2. Admin dashboard overview
3. Order list and filtering
4. Order detail page
5. Manual order confirmation
6. Order cancellation
7. WhatsApp follow-up tracking status
8. Inventory dashboard
9. Add inventory
10. Reduce inventory
11. Inventory adjustment reason logging
12. Service area management
13. Product/pricing management
14. Waitlist management
15. Bulk/event inquiry management
16. Admin activity logging
17. Basic analytics summary
18. Role-based access foundation

### 2.3 Customer Flow Scope

The core customer flow:

1. User lands on homepage.
2. User understands brand value.
3. User checks availability or visits product page.
4. User selects city and area.
5. If available, user continues to order.
6. User chooses quantity.
7. User enters name, phone, address, and delivery note.
8. User reviews subtotal, delivery charge, and total.
9. User clicks final order button.
10. Website validates form data.
11. Website checks live inventory.
12. Website creates pending order in Supabase.
13. Website increments order count only at this final step.
14. Website reserves stock or marks stock as pending depending on final technical decision.
15. Website redirects to WhatsApp with prefilled structured message.
16. Admin manually follows up on WhatsApp.
17. Admin confirms or cancels order in admin panel.
18. Confirmed order reduces available inventory permanently.
19. Cancelled order releases reserved stock if reservation logic is used.

### 2.4 Out of Scope for First Build

The following should not be built in the first version unless specifically approved:

- Full online payment gateway
- Customer account system
- Delivery rider app
- Live order tracking map
- Multiple product catalog system beyond future-ready schema
- Marketplace-style product grid
- AI chatbot
- Subscription billing
- Loyalty program
- Franchise portal
- POS system
- SMS OTP verification
- Advanced coupon engine
- Multi-vendor management
- Production deployment execution

---

## 3. Non-Negotiable Product Principles

### 3.1 Premium First, Not Generic Ecommerce

The website must never feel like a cheap grocery shop, generic Shopify template, or ordinary food delivery landing page. Every page should feel intentional, airy, clean, premium, and culturally familiar to Bangladeshi customers.

### 3.2 Mobile-First Bangladesh Reality

Most customers will likely browse from mobile. The mobile experience is not secondary. Every core journey must work beautifully on mobile:

- Fast loading
- Clear CTA
- Large tap targets
- Simple form fields
- Easy quantity selection
- Easy WhatsApp transition
- Short enough steps
- Trust visible before final order action

### 3.3 Homepage is Branding, Not Checkout

The homepage must not be overloaded with the full order form. The homepage should create desire and confidence. Functional ordering belongs on the order page, with smaller previews/CTAs on home.

### 3.4 One Product Must Feel Rich

Since the shop currently has one main product, the product page must be deep and premium rather than empty. The page should explain product quality, freshness, hygiene, use cases, quantity, price, and availability.

### 3.5 WhatsApp Is the Bridge, Not a Shortcut

WhatsApp ordering is a strategic choice for trust and manual confirmation in Bangladesh. The website must still behave like a proper platform before redirecting:

- Validate details
- Calculate totals
- Record order
- Count order
- Reserve/check inventory
- Send structured message to WhatsApp
- Let admin confirm manually

### 3.6 Admin Platform Is Not Optional

Because final confirmation happens manually through WhatsApp, the admin platform is mandatory. Without it, order count, inventory, and fulfillment will become unreliable.

### 3.7 No Fake Claims

The website must not claim health benefits, hygiene standards, delivery timings, certifications, or supply chain guarantees that the business cannot actually support. Copy should be strong but credible.

### 3.8 Ultra-Fast With Premium Visuals

Premium visuals cannot be an excuse for a slow website. Every asset must be optimized and served correctly. Motion must be elegant, not heavy.

---

## 4. Stakeholders

### 4.1 Primary Business Stakeholders

| Stakeholder | Responsibility |
|---|---|
| Brand Owner | Final brand, product, pricing, and operational approval |
| Project Owner | Overall scope, priority, quality, and timeline control |
| Operations Lead | Inventory, delivery readiness, order confirmation, manual WhatsApp handling |
| Marketing Lead | Launch messaging, campaigns, content, local positioning |
| Development Lead | Technical delivery, architecture, code quality, reviews |
| Design Lead | UI/UX, design system, interaction quality, visual consistency |
| Content Lead | Website copy, blog stories, FAQ, SEO/AEO content |
| Admin Users | Daily order confirmation, inventory adjustment, service area updates |

### 4.2 Development Team Assumption

Team size: 10 developers/designers working 14 hours/day. The work should be organized like a serious product build, not a rushed landing page.

Suggested distribution:

| Role | Count | Main Responsibility |
|---|---:|---|
| Product/Project Manager | 1 | Scope control, sprint planning, acceptance checks |
| UI/UX Designer | 1 | Page designs, flows, components, interaction logic |
| Frontend Developers | 3 | Public site, responsive UI, animations, forms |
| Backend/Supabase Developers | 2 | Data model, APIs, RLS, order/inventory logic |
| Admin Platform Developer | 1 | Admin dashboard, workflows, tables, controls |
| QA/Accessibility/Performance Engineer | 1 | Testing, audits, defect control, performance budgets |
| Content/SEO Implementer | 1 | Metadata, content integration, schema, internal links |

If the actual team differs, responsibilities must still be covered.

---

## 5. Governance Model

### 5.1 Decision Authority

| Decision Type | Owner | Approval Required |
|---|---|---|
| Brand identity changes | Brand Owner | Yes |
| Page structure changes | Project Owner + Design Lead | Yes |
| Data model changes | Development Lead + Backend Lead | Yes |
| Admin workflow changes | Operations Lead + Development Lead | Yes |
| Pricing/delivery fee changes | Business Owner + Operations Lead | Yes |
| SEO/content positioning | Marketing Lead + Project Owner | Yes |
| Major scope additions | Project Owner | Yes |

### 5.2 Change Control

No major scope change should enter development directly. All changes must pass through:

1. Change request written clearly.
2. Impact analysis: design, frontend, backend, admin, content, QA, timeline.
3. Priority assignment: must-have, should-have, could-have, not-now.
4. Approval by project owner.
5. Update this Project Management Plan or related phase document.
6. Add tasks to backlog.
7. Implement only after sprint planning.

### 5.3 Weekly Phase Gate

At the end of every phase/week, the team must complete:

- Demo
- Design review
- Technical review
- QA review
- Content review
- Performance check
- Scope change log
- Risk update
- Decision log update
- Next-week readiness check

A phase is not complete because code exists. It is complete only when acceptance criteria pass.

---

## 6. Master Timeline and Phase Structure

This build should be organized into 12 major phases. Each phase is designed as at least one week of serious work for the full team.

### 6.1 Phase List

| Phase | Title | Primary Outcome |
|---:|---|---|
| 1 | Project Foundation & Requirements Lock | Scope, flows, data decisions, asset map locked |
| 2 | Design System & Visual Language | Premium UI system, components, motion rules |
| 3 | Technical Foundation & Supabase Schema | Project skeleton, database, auth, API strategy |
| 4 | Global Layout, Assets & Component Library | Reusable layout/components/assets ready |
| 5 | Homepage Branding Build | Premium homepage completed |
| 6 | Product, Availability, Order & WhatsApp Flow | Core conversion journey working |
| 7 | Admin Platform, Inventory & Confirmation | Manual operations platform working |
| 8 | Secondary Pages, Waitlist & Bulk Inquiry | Events, story, FAQ, contact, waitlist complete |
| 9 | Motion, Performance & Media Optimization | Premium visual polish without speed loss |
| 10 | QA, Security, Accessibility & Hardening | Production-quality build readiness |
| 11 | SEO/AEO/GEO/GIO/SXO/AIO & Local Positioning | Search, AI answer, local conversion foundations |
| 12 | Blog Strategy & Story-Led Conversion System | Long-form blog system and editorial roadmap |

### 6.2 Build Philosophy by Phase

The phases are sequential but not completely isolated. Design, content, backend, and QA should start earlier than their final implementation phase. The team must avoid the common failure pattern where design finishes too late, admin gets ignored, and QA starts only at the end.

Each week must produce working deliverables, not only discussions.

---

## 7. Asset Inventory and Usage Plan

### 7.1 Current Image Assets

The current asset folder includes:

```text
D:\premium_dab\product image.jpeg
D:\premium_dab\Product label close-up.png
D:\premium_dab\Product topstraw detail.png
D:\premium_dab\4 dab pack.png
D:\premium_dab\6 dab family pack.png
D:\premium_dab\dab cart.png
D:\premium_dab\Front-facing product hero.png
D:\premium_dab\menu.png
D:\premium_dab\Premium Daab logo.png
D:\premium_dab\premium_daab_product_cutout_actual_transparent.png
D:\premium_dab\premium_daab_product_cutout_full_canvas_transparent.png
D:\premium_dab\Product angled left.png
D:\premium_dab\Product angled right.png
```

### 7.2 Asset Management Rules

1. All images must be copied into the project repository under a clean structure.
2. No component should reference local Windows paths directly.
3. Assets should be renamed into web-safe lowercase kebab-case.
4. Original files should be preserved in an `/assets/originals` or design archive folder.
5. Web-optimized files should be generated separately.
6. Every image must have a defined page and section usage.
7. Images with text should be used carefully; web text should be HTML text wherever possible.
8. The transparent PNG must be tested on dark, light, and gradient backgrounds.
9. Avoid generating more AI images until the existing image set is fully integrated.
10. If Antigravity generates images, it must follow the current Premium Daab visual system and must not create random generic coconut visuals.

### 7.3 Recommended Web Asset Names

| Original | Web Name |
|---|---|
| Premium Daab logo.png | premium-daab-logo.png |
| Front-facing product hero.png | product-hero-front.png |
| Product angled left.png | product-angle-left.png |
| Product angled right.png | product-angle-right.png |
| Product topstraw detail.png | product-top-straw-detail.png |
| Product label close-up.png | product-label-closeup.png |
| product image.jpeg | product-main-packaged.jpeg |
| 4 dab pack.png | packaging-4-dab-pack.png |
| 6 dab family pack.png | packaging-6-dab-family-pack.png |
| dab cart.png | portable-daab-cart.png |
| menu.png | premium-daab-menu-board.png |
| premium_daab_product_cutout_actual_transparent.png | product-cutout-transparent.png |
| premium_daab_product_cutout_full_canvas_transparent.png | product-cutout-full-canvas-transparent.png |

### 7.4 Image Placement Plan

| Page | Main Images |
|---|---|
| Home | product-hero-front, product-cutout-transparent, portable-daab-cart, packaging visuals |
| Product | product-hero-front, product-angle-left, product-angle-right, product-top-straw-detail, product-label-closeup |
| Availability | product-cutout-transparent, product-main-packaged, location graphics generated in UI |
| Order | product-cutout-transparent, small product thumbnail |
| Events | portable-daab-cart, packaging-4-dab-pack, packaging-6-dab-family-pack |
| Our Story | product-main-packaged, top detail, cart, packaging |
| FAQ | product-cutout-transparent, detail shots |
| Contact | product-cutout-transparent, cart or product hero |
| Admin | product thumbnail, no heavy visual usage |

---

## 8. Information Architecture

### 8.1 Public Navigation

Primary nav:

- Home
- Product
- Availability
- Events
- Our Story
- FAQ
- Contact

Primary CTA:

- Check Availability

Secondary CTA:

- Order on WhatsApp

### 8.2 Public Page Purposes

| Page | Purpose | Conversion Goal |
|---|---|---|
| Home | Brand desire and trust | Check availability |
| Product | Product value and quality | Start order/check availability |
| Availability | Area eligibility | Continue to order or join waitlist |
| Order | Order completion | WhatsApp handoff |
| Events | Bulk/event inquiry | WhatsApp bulk inquiry |
| Our Story | Emotional trust | Visit product/availability |
| FAQ | Remove doubts | Order/contact |
| Contact | Direct communication | WhatsApp/contact form |

### 8.3 Admin Routes

Suggested admin structure:

```text
/admin/login
/admin
/admin/orders
/admin/orders/[id]
/admin/inventory
/admin/inventory/adjustments
/admin/products
/admin/service-areas
/admin/waitlist
/admin/bulk-inquiries
/admin/settings
/admin/activity-log
```

---

## 9. User Journey Specification

### 9.1 Primary Customer Journey

**Step 1: Awareness**  
User sees Premium Daab on social, through word of mouth, Google, or local promotion in Bashundhara R/A.

**Step 2: Brand Landing**  
User lands on homepage. The first impression must communicate freshness, purity, and premium presentation within 3 seconds.

**Step 3: Trust Formation**  
User sees proof points: 100% natural, hygienically prepared, premium quality, product of Bangladesh, delivered fresh.

**Step 4: Product Interest**  
User explores product page or clicks availability CTA.

**Step 5: Availability Check**  
User selects city and area. If available, user gets a positive result and CTA to order. If unavailable, user joins waitlist.

**Step 6: Order Detail Entry**  
User enters required delivery information and quantity.

**Step 7: Price Confirmation**  
User sees unit price, quantity, subtotal, delivery charge, and total.

**Step 8: Final Order Click**  
User clicks final WhatsApp order button. This is the exact point where order count is recorded.

**Step 9: WhatsApp Redirect**  
User lands in WhatsApp with structured message ready to send.

**Step 10: Manual Confirmation**  
Admin confirms details, timing, and availability through WhatsApp.

**Step 11: Admin Status Update**  
Admin changes order status to confirmed or cancelled.

**Step 12: Fulfillment**  
Operations team prepares and delivers order.

### 9.2 Unavailable Area Journey

1. User checks city/area.
2. Area is unavailable.
3. User sees polite coming-soon message.
4. User can submit name, phone, area, interest quantity, and notes.
5. Waitlist record is created.
6. Admin can view demand by area.
7. Marketing/operations can prioritize expansion.

### 9.3 Bulk/Event Journey

1. User visits Events page.
2. User sees cart/setup, packaging, use cases.
3. User submits event type, date, location, estimated quantity, phone, and notes.
4. Bulk inquiry is recorded.
5. WhatsApp message is generated for quick discussion.
6. Admin follows up manually.
7. Admin updates inquiry status.

---

## 10. Functional Requirements

### 10.1 Product/Shop Requirements

- Show one main product clearly.
- Show price.
- Show quantity selector.
- Show availability CTA.
- Show product trust points.
- Show product images/details.
- Support future product expansion without redesigning entire architecture.

### 10.2 Availability Requirements

- City dropdown.
- Area dropdown dependent on city.
- Service area status: available, coming soon, disabled.
- Delivery fee per area.
- Estimated delivery window per area.
- Minimum order quantity per area, if needed.
- Available result state.
- Unavailable result state.
- Waitlist CTA.
- Admin area management.

### 10.3 Order Requirements

Required fields:

- Name
- Phone number
- City
- Area
- Full address
- Quantity
- Delivery note optional

Calculated fields:

- Unit price
- Quantity
- Subtotal
- Delivery charge
- Total

Order creation requirements:

- Validate all required fields.
- Validate phone number format for Bangladesh.
- Validate area availability.
- Validate inventory.
- Create pending order in Supabase.
- Count order only after final order click.
- Generate order code.
- Generate WhatsApp message.
- Redirect to WhatsApp.

### 10.4 Admin Order Requirements

Admin must be able to:

- View all orders.
- Filter by status.
- Search by customer name/phone/order code.
- View order detail.
- Mark WhatsApp contacted.
- Confirm order.
- Cancel order.
- Add internal note.
- See total, delivery area, delivery charge, quantity.
- See created timestamp.
- See confirmation timestamp.
- See cancellation reason.

### 10.5 Inventory Requirements

Inventory must support:

- Current stock count.
- Reserved stock count, if reservation logic is used.
- Confirmed sold count.
- Manual stock addition.
- Manual stock reduction.
- Reason for every adjustment.
- Admin who made adjustment.
- Timestamp.
- Product-level inventory.
- Future area/location-level inventory possibility.

### 10.6 Order Status Requirements

Suggested statuses:

```text
draft_client_side_only
pending_whatsapp
whatsapp_sent_assumed
contacted
confirmed
preparing
out_for_delivery
delivered
cancelled
expired
```

For first build, at minimum:

```text
pending_whatsapp
confirmed
cancelled
```

Recommended first build:

```text
pending_whatsapp
contacted
confirmed
cancelled
delivered
```

---

## 11. Technical Architecture

### 11.1 Stack

- Next.js App Router
- React
- TypeScript strongly recommended
- Node.js runtime where needed
- Supabase database/auth/storage
- Vercel target hosting environment
- Tailwind CSS
- Server Actions or API routes for order/admin operations
- Framer Motion or lightweight motion library if performance remains good

### 11.2 Architecture Principles

1. Keep public site mostly server-rendered/static where possible.
2. Use client components only where interaction is necessary.
3. Do not expose Supabase service role key to browser.
4. Use RLS policies carefully.
5. Use server-side validation for all order and admin actions.
6. Keep image optimization strict.
7. Avoid heavy animation libraries unless necessary.
8. Keep admin platform functional, fast, and secure.
9. Maintain clear separation between public customer actions and admin actions.
10. Design schema for future growth without overengineering first release.

### 11.3 Suggested Folder Structure

```text
/src
  /app
    /(public)
      /page.tsx
      /product/page.tsx
      /availability/page.tsx
      /order/page.tsx
      /events/page.tsx
      /our-story/page.tsx
      /faq/page.tsx
      /contact/page.tsx
      /blog/page.tsx
      /blog/[slug]/page.tsx
    /admin
      /login/page.tsx
      /page.tsx
      /orders/page.tsx
      /orders/[id]/page.tsx
      /inventory/page.tsx
      /service-areas/page.tsx
      /waitlist/page.tsx
      /bulk-inquiries/page.tsx
      /settings/page.tsx
  /components
    /layout
    /brand
    /forms
    /product
    /availability
    /order
    /admin
    /motion
    /seo
  /lib
    /supabase
    /validators
    /whatsapp
    /pricing
    /inventory
    /seo
    /analytics
  /content
    /pages
    /blogs
    /faq
  /styles
  /types
/public
  /images
    /brand
    /product
    /packaging
    /cart
    /icons
```

---

## 12. Supabase Data Model

### 12.1 Tables Overview

Core tables:

- products
- inventory
- inventory_adjustments
- service_areas
- orders
- order_events
- waitlist_entries
- bulk_inquiries
- admin_profiles
- admin_activity_log
- site_settings
- blog_posts

### 12.2 Products Table

Suggested fields:

```text
id uuid primary key
slug text unique not null
name text not null
description text
unit_label text default 'unit'
price_bdt integer not null
is_active boolean default true
sort_order integer default 0
image_url text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### 12.3 Inventory Table

```text
id uuid primary key
product_id uuid references products(id)
stock_available integer not null default 0
stock_reserved integer not null default 0
stock_confirmed_sold integer not null default 0
low_stock_threshold integer default 10
updated_at timestamptz default now()
```

### 12.4 Inventory Adjustments Table

```text
id uuid primary key
product_id uuid references products(id)
adjustment_type text check in ('add','reduce','reserve','release','confirm_sale','manual_correction')
quantity integer not null
reason text not null
order_id uuid null references orders(id)
admin_id uuid null
created_at timestamptz default now()
```

### 12.5 Service Areas Table

```text
id uuid primary key
city text not null
area text not null
slug text unique not null
status text check in ('available','coming_soon','disabled')
delivery_charge_bdt integer default 0
estimated_delivery_min_minutes integer
estimated_delivery_max_minutes integer
minimum_quantity integer default 1
sort_order integer default 0
created_at timestamptz default now()
updated_at timestamptz default now()
```

Initial priority area:

```text
City: Dhaka
Area: Bashundhara Residential Area
Status: available
```

### 12.6 Orders Table

```text
id uuid primary key
order_code text unique not null
customer_name text not null
customer_phone text not null
city text not null
area text not null
address text not null
delivery_note text
product_id uuid references products(id)
quantity integer not null
unit_price_bdt integer not null
subtotal_bdt integer not null
delivery_charge_bdt integer not null
total_bdt integer not null
status text not null default 'pending_whatsapp'
whatsapp_message text not null
whatsapp_redirected_at timestamptz
admin_note text
confirmed_at timestamptz
cancelled_at timestamptz
cancellation_reason text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### 12.7 Order Events Table

```text
id uuid primary key
order_id uuid references orders(id)
event_type text not null
from_status text
new_status text
note text
admin_id uuid null
created_at timestamptz default now()
```

### 12.8 Waitlist Entries Table

```text
id uuid primary key
name text
phone text not null
city text not null
area text not null
estimated_quantity integer
note text
source_page text
status text default 'new'
created_at timestamptz default now()
```

### 12.9 Bulk Inquiries Table

```text
id uuid primary key
name text not null
phone text not null
email text
organization text
event_type text
event_date date
city text
area text
location text
estimated_quantity integer
message text
status text default 'new'
admin_note text
created_at timestamptz default now()
updated_at timestamptz default now()
```

### 12.10 Admin Profiles Table

```text
id uuid primary key
user_id uuid references auth.users(id)
name text not null
role text check in ('owner','manager','operator','viewer')
is_active boolean default true
created_at timestamptz default now()
```

---

## 13. Order Count and Inventory Logic

### 13.1 Order Count Rule

An order must be counted only when the user clicks the final order button after:

- Product quantity is selected.
- Customer information is filled.
- City/area is selected.
- Address is filled.
- Pricing has been calculated.
- System has validated availability and inventory.
- Website is ready to create a WhatsApp handoff.

A user visiting the product page, changing quantity, checking area, or filling partial form must not increment order count.

### 13.2 Recommended Order Creation Flow

1. User clicks final CTA.
2. Client sends form to server action/API.
3. Server validates required fields.
4. Server checks service area status.
5. Server checks inventory.
6. Server creates order with status `pending_whatsapp`.
7. Server creates order event `order_created_from_final_click`.
8. Server updates/reserves inventory depending on selected strategy.
9. Server returns WhatsApp URL.
10. Client redirects user to WhatsApp.

### 13.3 Inventory Strategy Options

#### Option A: Reserve Stock on WhatsApp Redirect

When pending order is created, reserve stock immediately.

Pros:

- Prevents overselling.
- Better for limited daily inventory.

Cons:

- Users may not send WhatsApp message after redirect.
- Requires expiry/release logic.

Needed if using this option:

- Auto-expire pending orders after X minutes/hours.
- Release reserved stock when order is cancelled/expired.
- Admin can manually release stock.

#### Option B: Reduce Stock Only on Admin Confirmation

When pending order is created, stock is not reduced. Stock reduces only after admin confirms order.

Pros:

- Simpler.
- Better aligned with manual WhatsApp confirmation.

Cons:

- Risk of accepting too many pending orders if inventory is low.

#### Recommended First Build

Use a conservative hybrid:

- Check inventory before creating pending order.
- Create `pending_whatsapp` order.
- Track pending quantity separately.
- Admin confirmation reduces available stock permanently.
- If inventory is low, admin sees warning before confirming.

If operations expects very limited stock per day, use reservation with expiry.

---

## 14. Admin Platform Requirements

### 14.1 Admin Dashboard

Dashboard must show:

- Today's orders
- Pending WhatsApp orders
- Confirmed orders
- Cancelled orders
- Delivered orders
- Current inventory
- Low stock warning
- New waitlist entries
- New bulk inquiries
- Recent admin activity

### 14.2 Orders Page

Required features:

- Table/list view
- Search by phone/name/order code
- Filter by status
- Filter by date
- Filter by area
- Sort newest first
- Quick status badges
- Quick total value
- View detail action

### 14.3 Order Detail Page

Must show:

- Order code
- Customer name
- Phone
- Address
- City/area
- Product
- Quantity
- Unit price
- Delivery fee
- Total
- Status history
- WhatsApp message
- Admin notes
- Confirmation/cancellation actions

### 14.4 Confirmation Flow

Before confirming, admin must see:

- Current inventory
- Ordered quantity
- Remaining inventory after confirmation
- Customer contact status
- Any delivery constraints

Confirmation action:

- Changes status to `confirmed`
- Adds order event
- Updates inventory confirmed/sold count
- Records admin and timestamp

### 14.5 Cancellation Flow

Admin must choose or write cancellation reason:

- Customer did not respond
- Area unavailable
- Inventory unavailable
- Duplicate order
- Customer cancelled
- Wrong information
- Other

Cancellation action:

- Changes status to `cancelled`
- Adds order event
- Releases reserved stock if needed
- Records admin and timestamp

### 14.6 Inventory Dashboard

Must show:

- Product name
- Available stock
- Pending/reserved stock
- Confirmed sold stock
- Low stock threshold
- Last updated time
- Add stock button
- Reduce stock button
- Adjustment history

### 14.7 Service Area Management

Admin can:

- Add city/area
- Mark area as available/coming soon/disabled
- Set delivery charge
- Set estimated delivery range
- Set minimum quantity
- Reorder areas

### 14.8 Waitlist Management

Admin can:

- View entries
- Filter by city/area
- Mark contacted
- Mark converted
- Export later if needed

### 14.9 Bulk Inquiry Management

Admin can:

- View inquiries
- Filter by event date/type/status
- Update status
- Add note
- Contact through WhatsApp

---

## 15. Design System

### 15.1 Brand Feeling

The website should feel:

- Premium
- Clean
- Natural
- Bangladeshi
- Fresh
- Trustworthy
- Softly luxurious
- Modern but not foreign
- Warm but not cheap

### 15.2 Visual Tokens

Suggested colors:

| Token | Use |
|---|---|
| Deep Coconut Green | Headers, CTAs, footer, premium surfaces |
| Cream / Off-white | Page background |
| Soft Gold | Accent lines, icons, separators |
| Coconut White | Product surfaces/cards |
| Leaf Green | Secondary accents |
| Charcoal Green | Body text / dark UI |

### 15.3 Typography Direction

- Headlines: premium serif or elegant display type.
- Body: clean modern sans-serif.
- Bangla typography must be readable and not overly decorative.
- Avoid thin fonts for critical UI.
- Use large line-height and comfortable spacing.

### 15.4 Layout Principles

- Use generous whitespace.
- Avoid overcrowding sections.
- One main idea per section.
- Use strong hero images but do not cover the page with images.
- Keep forms clean and calm.
- Use sticky CTA on mobile where helpful.
- Avoid overusing palm leaves.
- Use product photography as brand proof, not decoration.

### 15.5 Motion Principles

Motion should feel like:

- Slow reveal
- Soft tropical shadow movement
- Gentle product float
- Smooth scroll transitions
- Premium fade/slide, not flashy animation

Avoid:

- Bouncy cartoon motion
- Heavy parallax on mobile
- Fast rotating product animations
- Cursor gimmicks that hurt usability
- Motion that blocks ordering

---

## 16. Page Specifications

## 16.1 Home Page

### Purpose

Create desire, establish brand, introduce Premium Daab as a premium young coconut experience, and move users toward availability check.

### Required Sections

1. Hero
2. Brand proof strip
3. Brand idea: “Daab has always been natural. We made the experience premium.”
4. Product preview
5. Availability CTA module
6. Made for moments
7. Events/bulk order preview
8. Packaging/cart preview
9. Final CTA
10. Footer

### Key CTAs

- Check Availability
- View Product
- Order on WhatsApp

### Acceptance Criteria

- Above-the-fold communicates product and premium feeling instantly.
- Homepage is not overloaded with full checkout.
- CTAs are visible on desktop and mobile.
- Visuals are optimized.
- Messaging is direct and conversion-oriented.

## 16.2 Product / Shop Page

### Purpose

Make one product feel complete, trustworthy, and worth buying.

### Required Sections

1. Product hero
2. Price and quantity selector
3. Product image gallery/detail shots
4. What makes it premium
5. Freshness and hygiene section
6. Natural refreshment section
7. Packaging options preview if relevant
8. FAQ preview
9. CTA to availability/order

### Acceptance Criteria

- Product does not feel like a thin one-item listing.
- User understands price, quality, size/quantity, and order process.
- Page supports future product expansion.

## 16.3 Availability Page

### Purpose

Let user check if delivery is available in their city/area.

### Required Sections

1. Hero
2. City/area selector
3. Available result state
4. Unavailable result state
5. Waitlist form
6. Currently served areas
7. Delivery process
8. CTA to order

### Acceptance Criteria

- Area result is clear.
- Bashundhara Residential Area is positioned as the launch/local focus.
- Unavailable users are not lost.
- Delivery fee and estimated timing are visible when available.

## 16.4 Order Page

### Purpose

Complete customer order and redirect to WhatsApp.

### Required Sections

1. Product summary
2. Customer information form
3. City/area selection
4. Quantity selector
5. Price breakdown
6. Trust note
7. Final WhatsApp order button
8. Error/success states

### Acceptance Criteria

- Form cannot submit incomplete data.
- Total updates correctly.
- Final click creates order and redirects to WhatsApp.
- Order count increments only after final click.
- Mobile form is easy to complete.

## 16.5 Events & Bulk Orders Page

### Purpose

Convert offices, weddings, gyms, cafés, rooftops, and brand activations into bulk leads.

### Required Sections

1. Event hero using cart visual
2. Use cases
3. Cart/setup showcase
4. Packaging showcase
5. Bulk inquiry form
6. Why Premium Daab for events
7. WhatsApp bulk CTA

### Acceptance Criteria

- Page feels premium hospitality, not generic catering.
- Inquiry form captures required operational details.
- WhatsApp bulk message is structured.

## 16.6 Our Story Page

### Purpose

Build emotional and cultural trust.

### Required Sections

1. Story hero
2. Why Premium Daab exists
3. Bangladesh connection
4. Farm-to-customer journey
5. Cleanliness and care philosophy
6. Vision statement
7. CTA to product/availability

### Acceptance Criteria

- Story is authentic and not exaggerated.
- Copy connects Bangladeshi daab culture with modern premium service.
- Page creates trust, not just brand fluff.

## 16.7 FAQ Page

### Purpose

Remove doubts before ordering.

### Categories

- Product
- Freshness
- Hygiene
- Delivery
- Ordering
- Payment
- Events/bulk orders
- Availability

### Acceptance Criteria

- Answers are clear and direct.
- FAQ supports SEO and AI-answer readiness.
- CTAs appear after relevant questions.

## 16.8 Contact Page

### Purpose

Make the brand reachable and trustworthy.

### Required Sections

1. Contact hero
2. WhatsApp card
3. Phone/email/social cards
4. Contact form
5. Service area note
6. Business inquiry CTA

### Acceptance Criteria

- Contact options are obvious.
- WhatsApp CTA is primary.
- Local positioning is present.

---

## 17. Content Strategy

### 17.1 Voice and Tone

The copy should be:

- Clear
- Premium
- Human
- Trustworthy
- Locally relevant
- Not robotic
- Not overpromising
- Not generic wellness marketing

### 17.2 Language Strategy

Use English for premium brand clarity with selective Bangla/Banglish where culturally useful. Avoid mixing languages randomly. If a full Bangla version is needed later, it should be intentional, not a patchwork.

### 17.3 Key Messaging Pillars

1. 100% natural refreshment
2. Clean and hygienically prepared
3. Premium presentation
4. Delivered fresh in selected areas
5. Product of Bangladesh
6. Perfect for daily moments and events
7. Simple WhatsApp ordering
8. Bashundhara R/A launch focus

### 17.4 Conversion Copy Rules

- Every major section should answer one user doubt.
- Every page should have a next action.
- CTAs should not be vague.
- Avoid generic “Learn more” where a specific CTA works.
- Use trust microcopy near forms.
- Use clear total price before WhatsApp redirect.

---

## 18. Blog and Content Platform

### 18.1 Blog Purpose

The blog is not for thin SEO posts. It must build trust, educate customers, and convert readers into product page visits, availability checks, and orders.

### 18.2 Blog Themes

- Health benefits of natural daab/coconut water
- Cleanliness and hygiene in preparation
- Taste consistency
- Size and quality consistency
- Supply chain quality checks
- Why fresh daab is different from bottled drinks
- Summer hydration in Dhaka
- Office refreshment culture
- Event welcome drinks
- Family refreshment stories
- Bashundhara R/A delivery convenience
- How Premium Daab selects young coconuts

### 18.3 Blog Requirements

Every blog should include:

- Story-led opening
- Real-life Bangladeshi context
- Clear educational value
- Product relevance
- Internal links to product/availability/order/events
- FAQ section
- Local search cues where relevant
- No thin content
- No unsupported health claims
- Strong final CTA

### 18.4 Blog Length Standard

Each blog should be substantial. As a working standard:

- Minimum: 1,200 words
- Ideal: 1,800–2,500 words
- Deep pillar articles: 3,000+ words

Quality matters more than word count, but short/thin blogs are not acceptable.

---

## 19. SEO, AEO, GEO, GIO, SXO, AIO Plan

### 19.1 SEO

- Unique title/meta for every page.
- Clean URL structure.
- Internal linking between main pages and blog.
- Product schema.
- Local business schema where applicable.
- FAQ schema.
- Breadcrumb schema.
- Optimized images with alt text.
- Fast Core Web Vitals.
- Blog topical clusters.

### 19.2 AEO — Answer Engine Optimization

Every page and blog should answer direct questions clearly:

- Is Premium Daab available in Bashundhara R/A?
- How do I order Premium Daab?
- Is Premium Daab natural?
- How fresh is the daab?
- Can I order Premium Daab for events?
- What is the price of Premium Daab?

### 19.3 GEO — Generative Engine Optimization

Content should be structured so AI search/assistants can understand:

- What Premium Daab is
- Where it serves
- What it sells
- How ordering works
- Why it is different
- How events/bulk orders work

Use clear definitions, entity consistency, structured sections, and FAQ blocks.

### 19.4 GIO — Generative Interface Optimization

The site should be easy to reference in AI-driven user interfaces. Content blocks should be modular, answer-focused, and semantically structured.

### 19.5 SXO — Search Experience Optimization

Search traffic must convert. Every search-intent page should provide a direct path to:

- Check availability
- View product
- Place order
- Contact via WhatsApp
- Submit event inquiry

### 19.6 AIO — AI Optimization

Prepare content so future AI workflows can summarize, recommend, and route users correctly. Keep entities, schema, and FAQs clean.

### 19.7 Local Positioning: Bashundhara Residential Area

The first local positioning target is Bashundhara R/A.

Required content signals:

- Bashundhara Residential Area delivery availability
- Dhaka launch focus
- Delivery convenience for residents
- Office/home/gym/event use cases in the area
- Local service-area page or section
- Local FAQ entries

---

## 20. Performance Plan

### 20.1 Performance Budgets

Targets:

- Lighthouse performance: 90+ where possible
- Largest Contentful Paint: under 2.5s on good connection
- Cumulative Layout Shift: under 0.1
- Interaction to Next Paint: under 200ms where possible
- Image sizes aggressively optimized
- No unnecessary client-side JavaScript

### 20.2 Image Optimization

- Use Next.js Image where appropriate.
- Convert large assets to WebP/AVIF where possible.
- Maintain PNG only when transparency is required.
- Use responsive image sizes.
- Avoid loading below-the-fold images eagerly.
- Use blur placeholders or subtle skeletons.
- Do not use massive uncompressed hero images.

### 20.3 Motion Performance

- Respect reduced-motion preference.
- Use CSS transforms and opacity where possible.
- Avoid layout-thrashing animations.
- Avoid heavy parallax on mobile.
- Test on mid-range Android devices.

---

## 21. Security and Privacy Plan

### 21.1 Public Form Security

- Server-side validation for all forms.
- Rate limiting recommended.
- Honeypot field for spam.
- Sanitization of text inputs.
- No direct client-side privileged Supabase writes unless RLS is strict.

### 21.2 Admin Security

- Supabase Auth.
- Admin role table.
- RLS policies.
- No service role key exposed.
- Admin activity logging.
- Strong password policy through auth provider settings.
- Session handling.

### 21.3 Customer Data Privacy

Collected data:

- Name
- Phone
- Address
- Order details
- Delivery note

Rules:

- Use data only for order fulfillment and support.
- Do not expose order data publicly.
- Do not leak customer phone/address in logs visible to non-admins.
- Consider retention policy later.

---

## 22. Accessibility Plan

### 22.1 Accessibility Standards

Follow WCAG-minded practical standards:

- Semantic headings
- Keyboard navigation
- Visible focus states
- Sufficient contrast
- Form labels
- Error messages tied to fields
- Alt text for meaningful images
- Reduced motion support
- Buttons not only icons
- Mobile tap target size

### 22.2 Form Accessibility

- Every input must have a label.
- Required fields must be clear.
- Errors must be readable and specific.
- Do not rely only on red color.
- Phone input should support Bangladesh numbers.

### 22.3 Motion Accessibility

- Respect `prefers-reduced-motion`.
- Avoid nausea-inducing movement.
- Do not animate critical form content in a way that blocks completion.

---

## 23. QA Plan

### 23.1 QA Types

- Functional QA
- Responsive QA
- Browser QA
- Admin workflow QA
- Database QA
- Inventory logic QA
- WhatsApp redirect QA
- Performance QA
- Accessibility QA
- Content QA
- SEO QA
- Security QA

### 23.2 Core Test Cases

#### Availability

- Available area shows order CTA.
- Coming soon area shows waitlist CTA.
- Disabled area blocks order.
- Delivery charge updates by area.

#### Order

- Empty form cannot submit.
- Invalid phone number blocked.
- Quantity cannot be below minimum.
- Total calculates correctly.
- Pending order created on final click.
- WhatsApp message includes correct information.
- Order count increments only after final click.

#### Admin

- Admin can login.
- Non-admin cannot access admin.
- Order status can change.
- Inventory updates correctly.
- Cancellation releases stock if reservation exists.
- Activity log records actions.

#### Mobile

- Header works.
- CTA visible.
- Forms usable.
- Images not oversized.
- No horizontal scroll.

### 23.3 Defect Severity

| Severity | Definition | Example |
|---|---|---|
| Critical | Blocks order/admin/core flow | Order cannot be created |
| High | Major broken experience | Wrong total calculation |
| Medium | Usability or visual issue | Layout broken on one breakpoint |
| Low | Minor polish | Spacing inconsistency |

No critical or high defect should remain before build handoff.

---

## 24. Analytics and Tracking Plan

### 24.1 Events to Track

- Page view
- Check availability click
- City selected
- Area selected
- Available result shown
- Unavailable result shown
- Waitlist submitted
- Product quantity changed
- Final order clicked
- WhatsApp redirect generated
- Bulk inquiry submitted
- Contact WhatsApp clicked
- FAQ expanded
- Blog CTA clicked

### 24.2 Admin Metrics

- Orders by status
- Orders by area
- Confirmed/cancelled ratio
- Average quantity
- Inventory changes
- Waitlist by area
- Bulk inquiries by type

### 24.3 Conversion Funnel

Core funnel:

Homepage/Product page view → Availability check → Available result → Order form started → Final order click → WhatsApp redirect → Admin confirmed

---

## 25. Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---:|---:|---|
| Website looks generic, not premium | Medium | High | Strict design review, use brand assets correctly |
| Site becomes slow due to visuals | High | High | Image optimization, performance budget, lazy loading |
| Order count increments too early | Medium | High | Server-side final-click order creation only |
| Inventory mismatch after WhatsApp | High | High | Admin confirmation logic, status tracking, inventory logs |
| Admin platform underbuilt | Medium | High | Phase 7 dedicated to admin and operations |
| Area availability confusion | Medium | Medium | Clear available/unavailable states and service area management |
| AI-generated assets look inconsistent | Medium | Medium | Use existing approved assets first, strict image direction |
| Copy overpromises health/hygiene | Medium | High | Content review and claims discipline |
| Mobile form friction | Medium | High | Mobile-first QA and tap target standards |
| Supabase RLS misconfiguration | Medium | High | Backend review, test non-admin access |
| Blog becomes thin SEO content | Medium | Medium | Story-led editorial requirements and word count standards |
| Team builds without shared decisions | High | High | This PMP, weekly gates, decision log |

---

## 26. Communication Plan

### 26.1 Daily Cadence

Daily standup should cover:

- What was completed yesterday?
- What will be completed today?
- What is blocked?
- Any scope risk?
- Any design/content dependency?
- Any backend/admin dependency?

### 26.2 Weekly Cadence

Weekly phase review:

- Demo working build
- Review acceptance criteria
- Review defects
- Review risks
- Review performance
- Review content accuracy
- Approve/reject phase completion

### 26.3 Documentation Updates

This document must be updated when:

- Scope changes
- Data model changes
- Admin workflow changes
- Pricing logic changes
- Service area logic changes
- Major page structure changes
- New phase decision is made

---

## 27. RACI Matrix

| Work Area | Project Owner | Design Lead | Frontend | Backend | Admin Dev | QA | Content/SEO | Operations |
|---|---|---|---|---|---|---|---|---|
| Scope control | A | C | C | C | C | C | C | C |
| Design system | C | A/R | R | C | C | C | C | C |
| Homepage | A | R | R | C | C | R | R | C |
| Product page | A | R | R | C | C | R | R | C |
| Availability flow | A | R | R | R | C | R | C | R |
| Order flow | A | C | R | R | C | R | C | R |
| Admin platform | A | C | C | R | R | R | C | R |
| Inventory logic | A | C | C | R | R | R | C | R |
| Content | A | C | C | C | C | C | R | C |
| SEO/AEO/GEO | A | C | R | C | C | R | R | C |
| QA | A | C | R | R | R | R | C | C |

Legend:

- A = Accountable
- R = Responsible
- C = Consulted

---

## 28. Definition of Done

### 28.1 Component Definition of Done

A component is done only when:

- It matches design system.
- It is responsive.
- It handles loading/empty/error states where relevant.
- It is accessible.
- It does not create layout shift.
- It has clean props/types.
- It has been reviewed.

### 28.2 Page Definition of Done

A page is done only when:

- All sections are implemented.
- Copy is final or approved placeholder.
- Images are optimized.
- CTAs work.
- Metadata exists.
- Mobile and desktop are tested.
- No obvious performance issue.
- QA defects resolved.

### 28.3 Flow Definition of Done

A flow is done only when:

- Happy path works.
- Error paths work.
- Edge cases are tested.
- Data writes are correct.
- Admin visibility exists where needed.
- Analytics events are triggered.
- QA has approved.

### 28.4 Project Build Readiness Definition

The project is build-ready when:

- All 8 public pages are complete.
- Core order journey works.
- Admin platform works.
- Inventory logic works.
- Waitlist works.
- Bulk inquiry works.
- Performance budget passes.
- Accessibility review passes.
- SEO/AEO/GEO foundations are implemented.
- Content is not thin.
- Critical/high defects are closed.
- Admin operations can use the platform without developer help.

---

## 29. Detailed Phase Plan

## Phase 1 — Project Foundation & Requirements Lock

### Objective

Lock the full product direction, page scope, customer journey, admin workflows, technical decisions, asset map, and acceptance criteria.

### Workstreams

- Product scope finalization
- User journey mapping
- Admin workflow mapping
- Asset audit
- Content requirements
- Technical assumptions
- Risk identification

### Deliverables

- Locked sitemap
- Locked customer journey
- Locked admin journey
- Asset naming map
- Initial data model approval
- Open questions log
- Risk register v1

### Acceptance Criteria

- No developer is unclear about what is being built.
- All 8 pages are defined.
- Admin platform scope is defined.
- Order count rule is understood.
- Inventory logic direction is selected or documented.

## Phase 2 — Design System & Visual Language

### Objective

Create the complete premium design system for Premium Daab.

### Workstreams

- Color system
- Typography
- Component visual states
- Buttons and forms
- Cards and surfaces
- Motion rules
- Mobile layout rules
- Image usage rules

### Deliverables

- Design tokens
- Component library design
- Page wireframes
- Motion direction
- Responsive rules

### Acceptance Criteria

- Design does not look generic.
- Components are reusable.
- Mobile behavior is defined.
- Visual hierarchy is clear.

## Phase 3 — Technical Foundation & Supabase Schema

### Objective

Set up project skeleton, Supabase schema, API/server action strategy, and auth foundation.

### Workstreams

- Next.js setup
- TypeScript config
- Tailwind setup
- Supabase setup
- Database migrations
- RLS planning
- Server validation
- Environment variables

### Deliverables

- Working app skeleton
- Database tables
- Supabase client/server utilities
- Auth foundation
- Validation schemas

### Acceptance Criteria

- Local app runs.
- Supabase connection works.
- Tables are created.
- Basic admin auth direction works.
- No secret exposed to client.

## Phase 4 — Global Layout, Assets & Component Library

### Objective

Build reusable foundation for all pages.

### Workstreams

- Header/navigation
- Footer
- CTA components
- Section wrappers
- Product cards
- Form fields
- Availability widgets
- Image optimization
- Asset conversion

### Deliverables

- Global layout
- Component library
- Optimized images
- Base metadata helpers

### Acceptance Criteria

- Components are reusable.
- Assets load correctly.
- Mobile header works.
- Footer supports all pages.

## Phase 5 — Homepage Branding Build

### Objective

Build the premium brand-first homepage.

### Workstreams

- Hero
- Brand proof
- Story preview
- Product preview
- Availability preview
- Events preview
- Final CTA
- Motion polish

### Deliverables

- Completed homepage
- Mobile homepage
- SEO metadata
- Performance review

### Acceptance Criteria

- Homepage creates premium feeling.
- It is not overloaded with checkout.
- CTAs route correctly.
- Mobile load is fast.

## Phase 6 — Product, Availability, Order & WhatsApp Flow

### Objective

Build the core conversion journey.

### Workstreams

- Product/shop page
- Availability page
- Order page
- Pricing logic
- Validation
- Order creation
- WhatsApp message generation
- Order count logic

### Deliverables

- Product page complete
- Availability check complete
- Order form complete
- WhatsApp redirect working
- Supabase pending order creation

### Acceptance Criteria

- Order count increments only after final click.
- WhatsApp message is accurate.
- Area availability controls the flow.
- Total price is correct.

## Phase 7 — Admin Platform, Inventory & Confirmation

### Objective

Build the admin system required for manual confirmation and inventory control.

### Workstreams

- Admin auth
- Dashboard
- Orders list/detail
- Confirm/cancel actions
- Inventory dashboard
- Inventory adjustments
- Service area management
- Activity logs

### Deliverables

- Working admin platform
- Manual confirmation flow
- Inventory adjustment flow
- Order status history

### Acceptance Criteria

- Admin can manage all pending orders.
- Admin can confirm/cancel orders.
- Inventory updates correctly.
- Admin actions are logged.

## Phase 8 — Secondary Pages, Waitlist & Bulk Inquiry

### Objective

Complete supporting brand and conversion pages.

### Workstreams

- Events page
- Our Story page
- FAQ page
- Contact page
- Waitlist form
- Bulk inquiry form
- WhatsApp bulk message

### Deliverables

- All secondary pages complete
- Waitlist records saved
- Bulk inquiries saved
- Contact options working

### Acceptance Criteria

- Pages are not thin.
- Forms work.
- Content supports trust and conversion.

## Phase 9 — Motion, Performance & Media Optimization

### Objective

Make the site feel premium without sacrificing speed.

### Workstreams

- Motion refinement
- Image optimization
- Lazy loading
- Code splitting
- Font optimization
- Lighthouse checks
- Mobile performance testing

### Deliverables

- Optimized media
- Motion system implemented
- Performance report
- Reduced-motion support

### Acceptance Criteria

- Site remains fast.
- Motion enhances, not distracts.
- Core pages pass performance budgets.

## Phase 10 — QA, Security, Accessibility & Hardening

### Objective

Harden the build for real users and admin operations.

### Workstreams

- Functional QA
- Responsive QA
- Admin QA
- Security review
- RLS review
- Accessibility audit
- Browser testing
- Edge case testing

### Deliverables

- QA report
- Security checklist
- Accessibility checklist
- Defect log
- Resolved critical/high issues

### Acceptance Criteria

- No critical/high defects.
- Forms and admin actions are reliable.
- RLS/security checks pass.
- Accessibility basics pass.

## Phase 11 — SEO/AEO/GEO/GIO/SXO/AIO & Local Positioning

### Objective

Make the site discoverable, answerable, locally relevant, and conversion-ready.

### Workstreams

- Metadata
- Schema markup
- Local content blocks
- FAQ schema
- Product schema
- Internal linking
- Search intent mapping
- Bashundhara R/A positioning

### Deliverables

- Metadata for all pages
- Structured data
- Local positioning content
- SEO QA checklist
- AI-answer readiness checklist

### Acceptance Criteria

- Every page has clear search purpose.
- Bashundhara R/A is properly positioned.
- FAQs answer real questions.
- Internal links support conversion.

## Phase 12 — Blog Strategy & Story-Led Conversion System

### Objective

Build the long-form content engine that supports trust, education, and conversion.

### Workstreams

- Blog architecture
- Blog templates
- Editorial calendar
- Topic clusters
- Story-led article formats
- Internal CTA strategy
- Claims review process

### Deliverables

- Blog system
- Blog templates
- 20+ topic roadmap
- First pillar content outlines
- CTA/internal link model

### Acceptance Criteria

- Blog content is not thin.
- Topics support buying decisions.
- Articles link users to main conversion pages.
- Health/quality claims are responsible.

---

## 30. Blog Roadmap

### 30.1 Initial Blog Clusters

#### Cluster A: Health and Natural Refreshment

1. Why Daab Feels So Refreshing in Dhaka Heat
2. Natural Hydration: Why People in Bangladesh Trust Daab
3. Daab After a Walk, Workout, or Long Day: A Practical Refreshment Story
4. Fresh Daab vs Sugary Drinks: A Cleaner Everyday Choice
5. What Makes Young Coconut Water Naturally Appealing?

#### Cluster B: Cleanliness and Preparation

1. Why Clean Preparation Matters for a Simple Daab
2. The Journey From Coconut Selection to Your Doorstep
3. How Premium Daab Thinks About Hygiene Before Serving
4. Why Packaging and Handling Change the Daab Experience
5. The Difference Between Street Refreshment and Premium Serving

#### Cluster C: Taste, Size, and Quality Consistency

1. Why Every Daab Does Not Taste the Same
2. How Selection Affects Sweetness, Water, and Freshness
3. Why Size Consistency Matters for Family and Office Orders
4. The Challenge of Keeping Natural Products Consistent
5. What Premium Quality Means for a Young Coconut

#### Cluster D: Local Lifestyle

1. A Bashundhara Morning With Premium Daab
2. A Better Refreshment Option for Dhaka Apartments
3. Office Breaks in Bashundhara: Why Natural Refreshment Matters
4. Hosting Guests at Home With Something Simple but Premium
5. Why Premium Daab Fits Modern Dhaka Living

#### Cluster E: Events and Bulk Orders

1. Why Daab Can Be a Beautiful Welcome Drink for Weddings
2. A Natural Refreshment Counter for Corporate Events
3. Rooftop Gatherings and the Premium Daab Cart
4. Gym, Café, and Office Partnerships With Premium Daab
5. How to Plan a Bulk Daab Order for an Event

### 30.2 Blog Conversion Pattern

Every blog should include:

1. Emotional or practical opening story.
2. Educational body.
3. Premium Daab relevance.
4. Link to product page.
5. Link to availability page.
6. Link to order page.
7. FAQ block.
8. Final CTA.

---

## 31. Quality Gates

### Gate 1: Requirements Gate

- Scope locked
- Assets mapped
- Data model approved
- Customer journey approved

### Gate 2: Design Gate

- Design system approved
- Page layouts approved
- Mobile designs approved
- Motion principles approved

### Gate 3: Technical Gate

- App skeleton ready
- Supabase schema ready
- Auth foundation ready
- API/server action strategy ready

### Gate 4: Core Flow Gate

- Availability works
- Order works
- WhatsApp redirect works
- Order count logic correct

### Gate 5: Admin Gate

- Admin login works
- Orders manageable
- Inventory manageable
- Manual confirmation works

### Gate 6: Content Gate

- All pages complete
- No thin content
- Claims reviewed
- CTAs clear

### Gate 7: Quality Gate

- QA passed
- Performance passed
- Accessibility passed
- Security passed

---

## 32. Open Questions Log

The team must answer these before finalizing implementation details:

1. What is the final product price for one Premium Daab?
2. Will there be small/large daab products at launch or only one product?
3. Is Coconut Milk Shake part of website launch or only menu/cart concept?
4. What is the actual delivery charge for Bashundhara R/A?
5. What is the minimum order quantity?
6. What WhatsApp number should receive orders?
7. What admin roles are needed on day one?
8. Should pending orders reserve stock or only confirmed orders reduce inventory?
9. How long should a pending WhatsApp order remain pending before expiry?
10. What are official hygiene/preparation claims the brand can safely make?
11. What areas beyond Bashundhara R/A should show as coming soon?
12. Does the brand want English-only site or English with Bangla support later?
13. What legal/privacy notice is required for collecting phone/address?
14. Should blogs publish at launch or after core site is stable?

No team should silently guess these. If unknown, implement configurable placeholders and mark them clearly.

---

## 33. Final Build Readiness Checklist

### Product and Scope

- [ ] 8 public pages complete
- [ ] Admin platform complete
- [ ] Customer journey complete
- [ ] Admin journey complete
- [ ] Order count logic verified
- [ ] Inventory logic verified
- [ ] Waitlist flow verified
- [ ] Bulk inquiry flow verified

### Design

- [ ] Premium visual system applied
- [ ] Mobile-first layouts complete
- [ ] Images optimized and correctly used
- [ ] Motion polished and not excessive
- [ ] Forms clean and readable
- [ ] No generic template feeling

### Technical

- [ ] Supabase tables complete
- [ ] RLS policies reviewed
- [ ] Server validation complete
- [ ] Error states handled
- [ ] Admin authentication works
- [ ] No secrets exposed
- [ ] Environment variables documented

### Content

- [ ] Page copy complete
- [ ] FAQ complete
- [ ] CTAs complete
- [ ] SEO metadata complete
- [ ] Blog system ready or planned
- [ ] No unsupported claims

### QA

- [ ] Desktop QA passed
- [ ] Mobile QA passed
- [ ] Browser QA passed
- [ ] Form QA passed
- [ ] Admin QA passed
- [ ] Security QA passed
- [ ] Accessibility QA passed
- [ ] Performance QA passed

### Operations

- [ ] Admin users trained
- [ ] Order statuses understood
- [ ] Inventory adjustment rules understood
- [ ] WhatsApp confirmation process defined
- [ ] Cancellation reasons defined
- [ ] Service area management understood

---

## 34. Closing Standard

Premium Daab should not launch as a half-finished landing page with pretty images. It should launch as a disciplined brand platform with a clear customer journey, reliable admin operations, strong local positioning, and enough technical structure to scale.

The team must treat this as a real product build. Every section, field, image, status, message, and admin action matters because the brand promise is premium. A premium brand cannot afford a careless digital experience.

This document is the reference point. If implementation drifts, return here, correct the direction, and continue with discipline.
