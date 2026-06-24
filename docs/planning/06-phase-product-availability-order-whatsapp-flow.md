# Phase 06 — Product, Availability, Cart, Order, WhatsApp Conversion Flow

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
Build the complete customer conversion flow from product interest to final WhatsApp redirect. This is the revenue-critical phase.

## Pages covered
- `/product`
- `/availability`
- `/order`

## Product page requirements

### Product page purpose
Make the single product feel complete, premium, trustworthy, and worth ordering.

### Required sections
1. Product hero
2. Product price and quantity selector
3. What makes it premium
4. Freshness and hygiene
5. Natural benefits
6. What is included
7. Menu/packaging preview
8. CTA to check availability/order

### Images
Use:
- Product main image.
- Product angled left.
- Product angled right.
- Product top/straw detail.
- Product label close-up.
- Product cutout.
- Menu image.
- 4-pack and 6-pack images.

## Availability page requirements

### Availability page purpose
Let customers check if Premium Daab is available in their city/area.

### Logic
Customer selects:
- City
- Area

If available:
- Show available success state.
- Show delivery charge.
- Show estimated delivery time.
- CTA: Continue to Order.

If unavailable:
- Show not available yet.
- Show waitlist form or WhatsApp waitlist button.
- Store waitlist interest in Supabase.

### Service area model
Service areas must be manageable from admin:
- city
- area
- availability
- delivery charge
- estimated delivery range

Start with Bashundhara Residential Area as the primary local position. Add other Dhaka areas only if the business wants them visible.

## Order page requirements

### Order form fields
Required:
- Name
- Phone number
- City
- Area
- Full address
- Quantity

Optional:
- Delivery note

### Order summary
Show:
- Product name
- Unit price
- Quantity
- Subtotal
- Delivery charge
- Total

### Final order button logic
The final CTA should say:
- “Place Order on WhatsApp”

When clicked:
1. Validate all required fields.
2. Validate area is available.
3. Validate quantity is available.
4. Create order in Supabase with status `pending_admin_confirmation`.
5. Store WhatsApp message in order row.
6. Count the order only at this moment.
7. Redirect to WhatsApp using encoded message.

### WhatsApp message format
```txt
Hello Premium Daab, I want to place an order.

Order ID: PD-XXXX
Name: [customer name]
Phone: [phone]
City: [city]
Area: [area]
Address: [address]
Product: Premium Daab
Quantity: [quantity]
Unit Price: ৳[price]
Subtotal: ৳[subtotal]
Delivery Charge: ৳[delivery]
Total: ৳[total]
Delivery Note: [note]

Please confirm availability and delivery time.
```

## Supabase interaction
Create:
- `getAvailableAreas()`
- `getProduct()`
- `calculateOrderTotal()`
- `createPendingOrder()`
- `buildWhatsAppMessage()`

## Edge cases
Handle:
- Invalid phone number.
- Missing address.
- Area unavailable.
- Quantity zero.
- Product inactive.
- Inventory unavailable.
- Supabase order creation failure.
- WhatsApp popup blocked.
- Duplicate clicking.

Prevent duplicate order rows by:
- Disabling button while submitting.
- Creating idempotency key per checkout attempt if needed.

## Week plan

### Day 1
Build product page layout and content sections.

### Day 2
Build availability page UI and service-area data fetching.

### Day 3
Build order page form, quantity logic, and price calculation.

### Day 4
Build order creation backend and WhatsApp message generator.

### Day 5
Connect product → availability → order journey with preserved state.

### Day 6
Handle validation, loading states, errors, duplicate click protection, mobile QA.

### Day 7
End-to-end order flow QA with database verification and WhatsApp redirect testing.

## Deliverables
- `/product`
- `/availability`
- `/order`
- Working order creation.
- Working WhatsApp redirect.
- Order count rule implemented.
- Area availability logic.
- Price and delivery calculation.
- Validation and error states.

## Acceptance criteria
This phase is complete only when:
- A real customer can check area, select quantity, enter details, click final order, create a Supabase order, and open WhatsApp.
- No order is counted before final CTA click.
- Order data is saved before WhatsApp redirect.
- Unavailable areas do not allow normal order placement.
- Mobile order flow is fast and clear.
