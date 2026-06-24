# Phase 03 — Technical Foundation, Repository Structure, Supabase Schema, Local Environment

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
Build the engineering foundation for the website and admin platform. This phase is not about visual page completion. It is about creating a stable, scalable base so later phases do not collapse under messy structure.

## Primary outcomes
By the end of this phase:
- Next.js App Router project is structured properly.
- TypeScript is strict.
- Tailwind and design tokens are connected.
- Supabase is connected.
- Supabase schema is implemented locally/remote dev.
- Admin auth direction is implemented.
- Environment variables are documented.
- API/server actions are planned.
- Database types are generated.
- Core utilities are created.

## Recommended folder structure

```txt
app/
  (public)/
    page.tsx
    product/page.tsx
    availability/page.tsx
    order/page.tsx
    events/page.tsx
    our-story/page.tsx
    faq/page.tsx
    contact/page.tsx
  admin/
    login/page.tsx
    page.tsx
    orders/page.tsx
    orders/[id]/page.tsx
    inventory/page.tsx
    products/page.tsx
    service-areas/page.tsx
    settings/page.tsx
  api/
    orders/create/route.ts
    whatsapp/message/route.ts
components/
  ui/
  layout/
  public/
  order/
  admin/
lib/
  supabase/
  validations/
  whatsapp/
  pricing/
  inventory/
  seo/
  analytics/
data/
  static/
public/
  assets/premium-daab/
types/
supabase/
```

## Supabase tables

### `products`
Fields:
- `id`
- `slug`
- `name`
- `description`
- `price`
- `is_active`
- `image_url`
- `created_at`
- `updated_at`

### `inventory`
Fields:
- `id`
- `product_id`
- `stock_available`
- `stock_reserved`
- `stock_sold`
- `last_adjusted_by`
- `updated_at`

### `inventory_movements`
Fields:
- `id`
- `product_id`
- `order_id`
- `movement_type` — add, reduce, reserve, release, confirm_sale, cancel
- `quantity`
- `reason`
- `admin_user_id`
- `created_at`

### `service_areas`
Fields:
- `id`
- `city`
- `area`
- `slug`
- `is_available`
- `delivery_charge`
- `estimated_delivery_min`
- `estimated_delivery_max`
- `sort_order`
- `created_at`
- `updated_at`

### `orders`
Fields:
- `id`
- `order_number`
- `customer_name`
- `customer_phone`
- `city`
- `area`
- `address`
- `delivery_note`
- `product_id`
- `product_name_snapshot`
- `unit_price_snapshot`
- `quantity`
- `subtotal`
- `delivery_charge`
- `total`
- `status`
- `whatsapp_message`
- `whatsapp_redirected_at`
- `admin_confirmed_at`
- `cancelled_at`
- `delivered_at`
- `payment_status`
- `payment_method`
- `admin_notes`
- `created_at`
- `updated_at`

### `order_events`
Fields:
- `id`
- `order_id`
- `event_type`
- `from_status`
- `to_status`
- `message`
- `admin_user_id`
- `created_at`

### `waitlist`
Fields:
- `id`
- `name`
- `phone`
- `city`
- `area`
- `source_page`
- `created_at`

### `admin_users`
Fields:
- `id`
- `email`
- `full_name`
- `role`
- `is_active`
- `created_at`

## Order count rule
An order must be counted only when:
- Required fields are valid.
- Quantity is valid.
- Area is available.
- Price and delivery charge are calculated.
- Customer clicks the final order button.
- Supabase order row is created.
- WhatsApp message is generated.

Do not count:
- Product page views.
- Quantity changes.
- Cart edits.
- Form partial entries.
- Availability checks.
- Draft client-side carts.

## Inventory rule
For v1:
- Do not permanently reduce inventory when customer clicks final order.
- Create order with status `pending_admin_confirmation`.
- Admin manually confirms after WhatsApp conversation.
- On admin confirm, reduce `stock_available` and increase `stock_sold`.
- If insufficient stock during confirmation, admin must see warning and cannot confirm without stock adjustment.

Optional:
- Use `stock_reserved` for pending orders, but set expiry and release logic. Do not overcomplicate v1 unless required.

## Auth
Use Supabase Auth for admin users.
- Public pages require no auth.
- Admin pages require auth.
- Admin roles: `owner`, `manager`, `staff`.
- Only owner/manager can adjust inventory and product price.
- Staff can update order statuses only if allowed.

## Validation
Use Zod or equivalent:
- Order form validation.
- Phone number validation.
- Service area validation.
- Admin status transition validation.
- Inventory adjustment validation.

## Week plan

### Day 1
Create repository structure, install dependencies, configure TypeScript, Tailwind, linting, formatting.

### Day 2
Create Supabase project connection, environment variable setup, database migration folder.

### Day 3
Implement database schema migrations and seed data for one product and initial service areas.

### Day 4
Implement Supabase server/client utilities and auth helper functions.

### Day 5
Implement validation schemas and shared types.

### Day 6
Implement initial API/server action skeletons for orders, availability, inventory, and admin status updates.

### Day 7
Run local tests, fix type errors, document environment setup and hand off to Phase 04.

## Deliverables
- Next.js project foundation.
- Supabase schema migrations.
- Seed data.
- Auth utilities.
- Validation schemas.
- Typed database access layer.
- Local environment setup guide.

## Acceptance criteria
This phase is complete only when:
- Project runs locally without errors.
- TypeScript passes.
- Supabase schema exists.
- Seed product, service area, and inventory data exist.
- Admin auth skeleton works.
- Public routes and admin routes exist as placeholders.
- Order, service area, inventory, and admin types are defined.
