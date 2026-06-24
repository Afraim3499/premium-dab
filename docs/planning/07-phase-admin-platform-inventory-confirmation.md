# Phase 07 — Admin Platform, Inventory Control, Manual Confirmation Workflow

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
Build the admin platform that allows the Premium Daab team to manually manage orders after WhatsApp handoff, confirm or cancel orders, and control inventory. This phase is operationally critical.

## Admin routes
- `/admin/login`
- `/admin`
- `/admin/orders`
- `/admin/orders/[id]`
- `/admin/inventory`
- `/admin/products`
- `/admin/service-areas`
- `/admin/settings`

## Admin dashboard overview
Dashboard should show:
- New pending orders.
- Confirmed orders today.
- Delivered orders today.
- Cancelled orders.
- Current available inventory.
- Low stock warning.
- Area-wise order summary.
- Quick links to orders and inventory.

## Orders page

### Table columns
- Order number
- Customer name
- Phone
- Area
- Quantity
- Total
- Status
- Created time
- Action

### Filters
- Status
- Area
- Date range
- Payment status
- Search by phone/order number

### Statuses
- `pending_admin_confirmation`
- `confirmed`
- `preparing`
- `out_for_delivery`
- `delivered`
- `cancelled`

## Order detail page

Must show:
- Full customer details.
- Product and quantity.
- Price breakdown.
- Delivery charge.
- Total.
- WhatsApp message payload.
- Timeline/status history.
- Admin notes.
- Inventory impact warning.
- Action buttons.

### Actions
- Accept / Confirm order.
- Cancel order.
- Mark preparing.
- Mark out for delivery.
- Mark delivered.
- Mark paid.
- Add internal note.
- Copy WhatsApp message.
- Open WhatsApp with customer.

## Inventory page

### Must show
- Product name.
- Available stock.
- Reserved stock, if used.
- Sold stock.
- Last adjusted date.
- Movement history.

### Admin actions
- Add stock.
- Reduce stock.
- Correct stock.
- Add reason for adjustment.

### Inventory movement types
- manual_add
- manual_reduce
- order_confirmed
- order_cancelled
- correction

Every movement must be logged.

## Product management
Admin can edit:
- Product name
- Product price
- Product active/inactive
- Description
- Image URL if needed

For v1, keep product management minimal but safe.

## Service area management
Admin can:
- Add city/area.
- Enable/disable availability.
- Set delivery charge.
- Set estimated delivery time.
- Sort areas.
- Mark “coming soon”.

This is important for Bashundhara Residential Area-first positioning and later expansion.

## Admin role rules
Owner:
- Full access.

Manager:
- Orders, inventory, product price, service areas.

Staff:
- Orders only unless allowed.

## Security requirements
- Admin routes protected.
- Server-side permission checks.
- No public access to admin data.
- Validate all admin actions server-side.
- Never trust client-side status changes.

## Week plan

### Day 1
Build admin auth, login page, protected admin layout.

### Day 2
Build admin dashboard and order list.

### Day 3
Build order detail page and status update actions.

### Day 4
Build inventory page and inventory movement logic.

### Day 5
Build product settings and service area management.

### Day 6
Implement role checks, audit logs, admin validation, and error states.

### Day 7
Operational QA with sample orders, stock changes, and status transitions.

## Deliverables
- Working admin platform.
- Protected admin routes.
- Order management.
- Manual confirmation flow.
- Inventory management.
- Product management.
- Service area management.
- Admin role checks.
- Audit/order event logs.

## Acceptance criteria
This phase is complete only when:
- Admin can confirm and cancel real pending orders.
- Confirming an order reduces stock correctly.
- Cancelling does not incorrectly reduce stock.
- Inventory changes are logged.
- Service areas can be changed without code edits.
- Admin pages are inaccessible without login.
- Staff cannot perform owner-only actions.
