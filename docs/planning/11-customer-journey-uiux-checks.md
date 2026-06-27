# Premium Daab — Customer Journey Checks & UI/UX Requirements

## Core Journey

The customer journey must be simple:

1. Discover the brand on homepage.
2. Understand that Premium Daab is fresh, clean, natural, and premium.
3. Check whether delivery is available in their area.
4. View product details.
5. Choose quantity.
6. Enter name, phone, city, area, address, and delivery note.
7. Click **Place Order on WhatsApp**.
8. Server creates the order and reserves inventory.
9. User redirects to WhatsApp with complete order message.
10. Admin manually confirms, cancels, or delivers the order.

## Critical Product Rule

The website is not a static brand page. It must support:

- Real availability checking
- Real order creation
- Real order count
- Real inventory reservation
- Real admin status changes
- Real manual confirmation workflow

## Public UX Principles

### 1. Homepage sells the feeling

The homepage should not look like a shop grid. It should feel like a premium brand launch.

Homepage goal:

- Create desire
- Build trust
- Explain the experience
- Guide to availability/order

### 2. Product page explains value

Since there is one main product, the product page must feel rich, not empty.

It should answer:

- What is it?
- Why is it premium?
- How fresh is it?
- How do I order?
- Where is it available?
- What does it cost?

### 3. Availability comes before commitment

Customers should know whether delivery is available before they spend time filling long forms.

Availability UX:

- City dropdown
- Area dropdown
- Instant result
- Clear available/unavailable state
- Waitlist option for unavailable areas

### 4. Order page must be frictionless

The order page should be clean, not decorative.

Required:

- Visible product summary
- Quantity selector
- Live total calculation
- Clear delivery charge
- WhatsApp order CTA
- Manual confirmation note

### 5. WhatsApp is part of the product experience

Do not treat WhatsApp as a fallback. It is the main confirmation layer for v1.

The user should understand:

- The website creates the order.
- WhatsApp opens with order details.
- The team manually confirms final delivery.

## Detailed Public Flow Checks

### Flow A — Area Available

1. User selects Dhaka.
2. User selects Bashundhara R/A.
3. System shows available result.
4. User clicks Continue to Order.
5. Order page pre-fills city/area.
6. User enters details.
7. User clicks Place Order on WhatsApp.
8. Order row is created.
9. Inventory reserved.
10. WhatsApp opens.

Pass condition:

- Order appears in admin as `whatsapp_redirected`.
- Order count increases by 1.
- Reserved stock increases by quantity.

### Flow B — Area Not Available

1. User selects unavailable area.
2. System shows coming soon message.
3. User can join waitlist.
4. No order can be placed for that area.

Pass condition:

- No order row is created.
- Waitlist entry is created only if submitted.
- User sees clear next step.

### Flow C — Out of Stock

1. User selects available area.
2. User selects quantity larger than available stock.
3. System blocks final order.

Pass condition:

- No order row is created.
- User sees stock error.
- Admin inventory remains unchanged.

### Flow D — Incomplete Form

1. User misses name/phone/address.
2. User clicks final order button.

Pass condition:

- No order row is created.
- Field-level errors appear.
- User is not redirected to WhatsApp.

### Flow E — Large Quantity

1. User selects quantity above normal threshold.
2. System suggests Events & Bulk Orders.

Pass condition:

- User is not blocked aggressively.
- They get a better path for bulk inquiry.

## Admin Journey Checks

### Admin Flow A — New Order Confirmation

1. Admin opens Orders.
2. New order is `whatsapp_redirected`.
3. Admin confirms via WhatsApp manually.
4. Admin clicks Confirm Order.

Pass condition:

- Status changes to `confirmed`.
- Reserved stock decreases.
- Stock on hand decreases.
- Inventory movement is logged.
- Confirmed timestamp is saved.

### Admin Flow B — Cancel Order

1. Admin opens pending order.
2. Admin clicks Cancel.
3. Admin adds optional reason/note.

Pass condition:

- Status changes to `cancelled`.
- Reserved stock is released.
- Stock on hand does not decrease.
- Inventory movement is logged.
- Cancelled timestamp is saved.

### Admin Flow C — Mark Delivered

1. Admin opens confirmed order.
2. Admin clicks Mark Delivered.

Pass condition:

- Status changes to `delivered`.
- Delivered timestamp is saved.
- No extra inventory deduction happens.

### Admin Flow D — Manual Inventory Add

1. Admin opens Inventory.
2. Admin adds stock.
3. Admin writes note.

Pass condition:

- Stock_on_hand increases.
- Movement is logged.
- Dashboard updates.

### Admin Flow E — Manual Inventory Reduce

1. Admin opens Inventory.
2. Admin reduces stock.
3. System checks available stock.

Pass condition:

- Cannot reduce below reserved stock.
- Movement is logged if successful.
- Dashboard updates.

## UX Copy Rules

Use clear language.

Say:

- **Check Availability**
- **Place Order on WhatsApp**
- **Manual confirmation required**
- **Delivery charge depends on area**
- **Currently not available in your area**

Avoid:

- “Checkout completed”
- “Payment successful”
- “Instant confirmed”
- “Guaranteed medical benefits”
- “Organic certified” unless legally verified

## Bangladeshi Customer Context

Design for:

- Mobile-first browsing
- WhatsApp ordering comfort
- Area-based delivery
- Manual confirmation
- Cash/mobile payment expectations
- Dhaka area names
- Clear Tk pricing
- Trust-building before purchase

## Mobile UX Requirements

Mobile is the priority.

Required:

- Header must be compact.
- CTA must be visible.
- Forms must be easy to fill.
- Quantity selector must be thumb-friendly.
- Total price should stay clear.
- Avoid large hero images blocking key actions.
- Use sticky bottom CTA only where useful.
- Do not create horizontal scroll.

## Loading States

Availability check:

- Button text: Checking...
- Result card skeleton or spinner

Order submit:

- Button text: Preparing your order...
- Disable duplicate clicks
- Show redirect message before opening WhatsApp

Admin actions:

- Disable button while updating
- Show success/error toast
- Refresh affected data

## Empty States

### No Orders

No orders yet. New WhatsApp orders will appear here after customers submit the final order form.

### No Inventory

No inventory added yet. Add stock before accepting orders.

### No Areas

No service areas added yet. Add delivery areas to enable availability checking.

## Error States

### Public

Keep errors calm and useful.

Example:

**Premium Daab is not available in this area yet. Join the waitlist and we’ll notify you when we arrive.**

### Admin

Be more specific.

Example:

**Cannot confirm this order because reserved inventory is lower than the order quantity. Check inventory movement history.**

## Accessibility Requirements

- Use semantic headings.
- Buttons must have accessible labels.
- Forms need visible labels, not placeholder-only labels.
- Color contrast must be sufficient.
- Keyboard navigation must work.
- Error messages should be connected to fields.
- Support reduced motion.

## Performance Checks

Before launch:

- Homepage loads fast on mobile.
- Hero image optimized.
- Below-fold images lazy loaded.
- No giant image files in first load.
- Admin not included in public route bundle unnecessarily.
- No heavy animations blocking interaction.
- Lighthouse performance target should be high enough for a premium ecommerce experience.

## Content QA Checklist

Before publishing:

- Brand name consistent: Premium Daab.
- Pricing shown correctly.
- No accidental “Daab” text in typed website copy unless inside provided image assets.
- No exaggerated health claims.
- No fake partner logos.
- No unavailable areas shown as available.
- WhatsApp number correct.
- Admin order status logic tested.
- Inventory reservation tested.
- Mobile order flow tested.

## Final Rule

Every page should have one clear job.

- Home: desire
- Product: trust
- Availability: eligibility
- Order: conversion
- Events: bulk inquiry
- Our Story: meaning
- FAQ: doubt removal
- Contact: support
- Admin: operations
