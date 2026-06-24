# Supabase Data Schema & Logic Specifications

This document defines the SQL schemas, RLS policies, and backend transaction rules governing orders and inventory control.

---

## 1. Database Schema

All database migrations will be written in standard Postgres syntax matching the following structures:

### A. Core Types and Enums
```sql
create type order_status as enum (
  'whatsapp_redirected',
  'contacted',
  'confirmed',
  'cancelled',
  'delivered'
);

create type inventory_movement_type as enum (
  'manual_add',
  'manual_reduce',
  'reserved_for_order',
  'released_from_cancelled_order',
  'confirmed_order_deducted'
);

create type admin_role as enum (
  'owner',
  'manager',
  'operator'
);
```

### B. Products Table
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

### C. Inventory Table
```sql
create table inventory (
  product_id uuid primary key references products(id) on delete cascade,
  stock_on_hand integer not null default 0,
  stock_reserved integer not null default 0,
  low_stock_threshold integer not null default 10,
  updated_at timestamptz not null default now()
);
```

### D. Service Areas Table
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

### E. Orders Table
```sql
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

### F. Inventory Movements Table
```sql
create table inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id),
  order_id uuid references orders(id),
  movement_type inventory_movement_type not null,
  quantity integer not null,
  note text,
  created_by uuid, -- References auth.users(id)
  created_at timestamptz not null default now()
);
```

### G. Waitlist Table
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

### H. Admin Users Table
```sql
create table admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  role admin_role not null default 'operator',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
```

---

## 2. Inventory and Reservation Logic

Available stock is dynamically calculated at any moment using:
$$\text{Available Stock} = \text{stock\_on\_hand} - \text{stock\_reserved}$$

### Transaction Rules:
1. **Order Attempt (Checkout Redirect)**:
    *   System checks if $\text{Requested Quantity} \le \text{Available Stock}$.
    *   If valid, creates a pending order row and increments `stock_reserved` by the requested quantity.
    *   Creates an `inventory_movements` record of type `reserved_for_order`.
2. **Order Confirmation by Admin**:
    *   System changes order status to `confirmed`.
    *   Decreases `stock_reserved` by the order quantity.
    *   Decreases `stock_on_hand` by the order quantity.
    *   Creates an `inventory_movements` record of type `confirmed_order_deducted`.
3. **Order Cancellation by Admin**:
    *   System changes order status to `cancelled`.
    *   Decreases `stock_reserved` by the order quantity (releasing stock).
    *   Creates an `inventory_movements` record of type `released_from_cancelled_order`.

---

## 3. Order Count Rule

The order counter is strictly tied to database transactions:
*   **The Single Source of Truth** for orders is the row count of the `orders` table.
*   No client-side metrics (e.g. click trackers, cart additions, session logs) should be treated as placing an order.
*   An order is recorded only when the server successfully executes the transaction, inserts the row, reserves the inventory, and returns the WhatsApp payload.

---

## 4. Row Level Security (RLS) Policies

All tables must have RLS enabled (`alter table [table_name] enable row level security;`).

### Public Client Permissions:
*   `products`: SELECT only for active products (`is_active = true`).
*   `service_areas`: SELECT only.
*   `waitlist`: INSERT only.
*   `orders`: INSERT only (via protected backend server actions; direct public client inserts are disabled).

### Administrative Permissions:
*   Authenticated users with roles in `admin_users` have full SELECT, INSERT, and UPDATE permissions across all tables (orders, inventory, service_areas, admin_users, inventory_movements).
*   DELETE permission is disabled globally on `orders` and `inventory_movements` to preserve strict audit trails.
