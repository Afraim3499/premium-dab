# Premium Daab — Technical Architecture

## Stack

Use this stack:

- Frontend: Next.js App Router with React
- Runtime/API: Next.js Route Handlers on Vercel
- Styling: Tailwind CSS
- Database: Supabase Postgres
- Auth: Supabase Auth for admin
- Hosting: Vercel
- Image handling: local `/public/assets` + optimized image rendering
- Order completion: WhatsApp redirect after database order creation

This is not a static site. It has live area availability, inventory logic, order creation, order count, and admin confirmation workflow.

## Core Product Rule

For v1, the public shop should focus on one main sellable product:

**Premium Daab — Single Unit**

The packaging assets can be used for visual brand/bulk-order sections, but do not force a multi-product catalog unless the owner asks later.

The database can still be extensible so new SKUs can be added later:

- Single Daab
- 4 Dab Pack
- 6 Dab Family Pack
- Coconut Milk Shake
- Event / Bulk Order

Only mark the launch SKU as active for public checkout.

## Public Routes

```txt
/
 /product
 /availability
 /order
 /events
 /our-story
 /faq
 /contact
```

## Admin Routes

```txt
/admin/login
/admin
/admin/orders
/admin/orders/[id]
/admin/inventory
/admin/areas
/admin/settings
```

Use route protection. Public users must not access admin data.

## Recommended Folder Structure

```txt
premium-daab/
  app/
    layout.tsx
    page.tsx
    product/page.tsx
    availability/page.tsx
    order/page.tsx
    events/page.tsx
    our-story/page.tsx
    faq/page.tsx
    contact/page.tsx

    admin/
      layout.tsx
      login/page.tsx
      page.tsx
      orders/page.tsx
      orders/[id]/page.tsx
      inventory/page.tsx
      areas/page.tsx
      settings/page.tsx

    api/
      availability/route.ts
      orders/prepare/route.ts
      admin/orders/[id]/status/route.ts
      admin/inventory/adjust/route.ts

  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileNav.tsx
    brand/
      SectionEyebrow.tsx
      PremiumBadge.tsx
      ImageCard.tsx
      BrandProofStrip.tsx
    product/
      ProductHero.tsx
      ProductGallery.tsx
      QuantitySelector.tsx
      ProductSummaryCard.tsx
    order/
      OrderForm.tsx
      OrderSummary.tsx
      WhatsAppOrderButton.tsx
    availability/
      AvailabilityChecker.tsx
      AvailabilityResult.tsx
      AreaSelector.tsx
    admin/
      AdminSidebar.tsx
      AdminTopbar.tsx
      OrderTable.tsx
      InventoryTable.tsx
      StatusBadge.tsx

  lib/
    supabase/
      client.ts
      server.ts
      admin.ts
    data/
      assets.ts
      nav.ts
    validation/
      order.ts
      phone.ts
    whatsapp.ts
    money.ts

  public/
    assets/
      brand/
      product/
      events/
      packs/
```

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_WHATSAPP_NUMBER=
ADMIN_EMAIL_ALLOWLIST=
```

Never expose the service role key to the browser.

## Supabase Tables

### 1. products

Stores public and future product/SKU information.

```sql
create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  price_bdt integer not null,
  is_active boolean not null default true,
  is_public_checkout boolean not null default false,
  image_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Seed:

```txt
slug: premium-daab-single
name: Premium Daab
price_bdt: 120
is_active: true
is_public_checkout: true
```

Other SKUs can exist as inactive/bulk-only later.

### 2. inventory

Use stock-on-hand plus reserved stock. This prevents accidental overselling after a WhatsApp redirect.

```sql
create table inventory (
  product_id uuid primary key references products(id) on delete cascade,
  stock_on_hand integer not null default 0,
  stock_reserved integer not null default 0,
  low_stock_threshold integer not null default 10,
  updated_at timestamptz not null default now()
);
```

Available stock:

```sql
stock_on_hand - stock_reserved
```

### 3. service_areas

Controls delivery availability and delivery charge.

```sql
create table service_areas (
  id uuid primary key default gen_random_uuid(),
  city text not null,
  area text not null,
  is_available boolean not null default false,
  delivery_charge_bdt integer not null default 0,
  estimated_delivery_text text default '2–4 hours',
  sort_order integer default 0,
  created_at timestamptz not null default now(),
  unique(city, area)
);
```

Seed examples:

```txt
Dhaka / Bashundhara R/A / available / 40
Dhaka / Gulshan / coming soon / 60
Dhaka / Banani / coming soon / 60
Dhaka / Uttara / coming soon / 70
Dhaka / Dhanmondi / coming soon / 70
```

### 4. orders

Create an order only when the final order button is clicked after all required fields and cart information are valid.

```sql
create type order_status as enum (
  'whatsapp_redirected',
  'contacted',
  'confirmed',
  'cancelled',
  'delivered'
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,

  customer_name text not null,
  customer_phone text not null,
  city text not null,
  area text not null,
  full_address text not null,
  delivery_note text,

  product_id uuid not null references products(id),
  quantity integer not null check (quantity > 0),

  unit_price_bdt integer not null,
  subtotal_bdt integer not null,
  delivery_charge_bdt integer not null,
  total_bdt integer not null,

  status order_status not null default 'whatsapp_redirected',

  whatsapp_message text not null,
  whatsapp_redirect_url text not null,

  admin_note text,
  confirmed_at timestamptz,
  cancelled_at timestamptz,
  delivered_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Order number pattern:

```txt
PD-YYYYMMDD-0001
```

### 5. inventory_movements

Every stock change must be logged.

```sql
create type inventory_movement_type as enum (
  'manual_add',
  'manual_reduce',
  'reserved_for_order',
  'released_from_cancelled_order',
  'confirmed_order_deducted'
);

create table inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id),
  order_id uuid references orders(id),
  movement_type inventory_movement_type not null,
  quantity integer not null,
  note text,
  created_by uuid,
  created_at timestamptz not null default now()
);
```

### 6. admin_users

```sql
create table admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null check (role in ('owner', 'manager', 'operator')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
```

### 7. waitlist

For unavailable areas.

```sql
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text not null,
  city text not null,
  area text not null,
  created_at timestamptz not null default now()
);
```

## Order Count Rule

Order count must be based only on the final validated order click.

Do not count:

- Page visit
- Product view
- Quantity change
- Add to cart
- Availability check
- Incomplete form submission

Count only when:

1. Required customer fields are valid.
2. Area is available.
3. Product is active.
4. Inventory is available.
5. Server creates the order row.
6. WhatsApp redirect URL is generated and returned.

The database order row is the order count source of truth.

## Order Flow

### Customer Side

1. User visits homepage.
2. User checks availability.
3. User goes to product/order page.
4. User selects quantity.
5. User enters name, phone, city, area, address, delivery note.
6. User clicks final CTA: **Place Order on WhatsApp**.
7. Frontend sends POST request to `/api/orders/prepare`.
8. Server validates:
   - phone
   - city/area
   - area availability
   - product active
   - quantity
   - available inventory
9. Server creates order.
10. Server reserves inventory.
11. Server generates WhatsApp URL.
12. Frontend redirects user to WhatsApp.
13. Admin manually confirms/cancels after WhatsApp conversation.

### Admin Side

1. New order appears as `whatsapp_redirected`.
2. Admin contacts/continues WhatsApp conversation.
3. Admin changes status:
   - `contacted`
   - `confirmed`
   - `cancelled`
   - `delivered`
4. If confirmed:
   - reduce stock_on_hand
   - release reserved stock
   - log movement
5. If cancelled:
   - release reserved stock
   - log movement
6. Admin can manually add/reduce stock anytime.

## WhatsApp Message Format

Build the message server-side, not only client-side.

```txt
Hello Premium Daab, I want to place an order.

Order No: PD-YYYYMMDD-0001

Name: [customer_name]
Phone: [customer_phone]
City: [city]
Area: [area]
Address: [full_address]
Delivery Note: [delivery_note]

Product: Premium Daab
Quantity: [quantity]
Unit Price: Tk [unit_price]
Subtotal: Tk [subtotal]
Delivery Charge: Tk [delivery_charge]
Total: Tk [total]

Please confirm availability and delivery time.
```

Then generate:

```txt
https://wa.me/[WHATSAPP_NUMBER]?text=[encoded_message]
```

## API Routes

### POST `/api/availability`

Input:

```json
{
  "city": "Dhaka",
  "area": "Bashundhara R/A"
}
```

Output if available:

```json
{
  "available": true,
  "deliveryChargeBdt": 40,
  "estimatedDeliveryText": "2–4 hours"
}
```

Output if not available:

```json
{
  "available": false,
  "message": "Premium Daab is not available in this area yet."
}
```

### POST `/api/orders/prepare`

Input:

```json
{
  "customerName": "string",
  "customerPhone": "string",
  "city": "string",
  "area": "string",
  "fullAddress": "string",
  "deliveryNote": "string",
  "productSlug": "premium-daab-single",
  "quantity": 2
}
```

Output:

```json
{
  "orderId": "uuid",
  "orderNumber": "PD-20260625-0001",
  "whatsappUrl": "https://wa.me/...",
  "totalBdt": 280
}
```

This route must be atomic. If inventory reservation fails, do not create a visible successful order.

## Admin Features

### Dashboard

Show:

- Orders today
- Pending WhatsApp orders
- Confirmed orders
- Cancelled orders
- Delivered orders
- Available stock
- Reserved stock
- Low-stock warning
- Service area count

### Orders

Admin order table columns:

- Order number
- Created time
- Customer
- Phone
- Area
- Quantity
- Total
- Status
- Action

Order detail page:

- Customer details
- Address
- WhatsApp message
- Product/quantity
- Payment note
- Status update buttons
- Admin note
- Inventory effect note

### Inventory

Show:

- Product
- Stock on hand
- Reserved
- Available
- Low stock threshold
- Manual add stock
- Manual reduce stock
- Movement history

### Areas

Admin can:

- Add city/area
- Mark available/unavailable
- Set delivery charge
- Set estimated delivery time
- Sort areas

### Settings

Store:

- WhatsApp number
- Brand phone
- Support email
- Minimum order quantity
- Default delivery charge
- Business hours text

These can be environment variables first, then database settings later.

## Row Level Security

Enable RLS on all tables.

Public users can:

- Read active public products
- Read available service areas
- Create orders through server route only
- Create waitlist entries

Public users cannot:

- Read all orders
- Modify inventory
- Read admin users
- Update order status

Admin users can:

- Read orders
- Update order status
- Manage inventory
- Manage areas

Use server-side service role only in protected route handlers. Do not expose private keys.

## Validation Rules

### Phone

Accept Bangladeshi phone format:

- `01XXXXXXXXX`
- `+8801XXXXXXXXX`
- `8801XXXXXXXXX`

Normalize to:

```txt
+8801XXXXXXXXX
```

### Quantity

- Minimum: 1
- Maximum default: 50 for normal checkout
- For more than 50, direct user to Events & Bulk Orders.

### Address

Required:

- Minimum 10 characters
- Must include house/road/block/landmark style prompt

### Area

Must match service_areas table.

## Performance Requirements

The site should feel premium but load fast.

Required:

- Use server components where possible.
- Keep forms and interactive components as client components only where needed.
- Optimize images before deployment.
- Use `next/image`.
- Lazy-load non-hero images.
- Avoid large animation libraries unless necessary.
- Use CSS transitions and Framer Motion only if bundle impact stays controlled.
- Separate admin bundle from public bundle.
- Use skeleton states for admin tables and availability check.
- Use Vercel caching for static brand pages.
- Do not cache order/admin data incorrectly.

## SEO / Metadata

Each public page should have:

- Title
- Description
- Open Graph image
- Canonical URL
- Local business structured data later

Example homepage title:

```txt
Premium Daab — 100% Natural Young Coconut Delivered Fresh
```

Example description:

```txt
Premium Daab brings a clean, fresh, premium young coconut experience to modern Bangladesh. Check availability and order through WhatsApp.
```

## Error Handling

Customer-facing error messages should be clear:

- Area not available yet
- Product currently out of stock
- Phone number invalid
- Address missing
- Something went wrong; please try WhatsApp directly

Admin errors should be specific:

- Cannot confirm order because reserved stock is missing
- Cannot reduce inventory below reserved quantity
- Area already exists
- User not authorized

## Deployment Checklist

1. Create Supabase project.
2. Run migrations.
3. Seed product, inventory, and service areas.
4. Create first admin user.
5. Add environment variables to Vercel.
6. Upload public assets.
7. Test public flow.
8. Test WhatsApp redirect.
9. Test order count.
10. Test admin confirmation/cancellation.
11. Test inventory reservation/release.
12. Test mobile performance.
13. Deploy to production.
