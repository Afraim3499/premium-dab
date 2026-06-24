# Scope and Route Specifications

## 1. Product Scope

### In-Scope (Phase 1–12 Deliverables)
1. **8 Public Website Pages**: Landing page, single product page, availability checker, order form, bulk/events page, story page, FAQs, and a contact form.
2. **Interactive Customer Checkout Flow**: Allows customers to choose a product quantity, check delivery availability by city/area, and submit order details.
3. **Supabase Integration**: Stores orders, inventory levels, service areas, waitlist submissions, and admin logs.
4. **WhatsApp Checkout Hand-off**: Server-side preparation of a structured order message that redirects the customer to the official Premium Daab WhatsApp line.
5. **Admin Operations Platform**: Includes admin login, an operations dashboard, order status transitions (WhatsApp redirected, contacted, confirmed, cancelled, delivered), inventory control (audits/adjustments), and service area configuration.
6. **Waitlist collection**: Captures name, phone, and location for customers checking unavailable delivery zones.
7. **Basic Analytics**: Simple admin insights (orders today, pending vs confirmed sales, inventory alerts).

### Out-of-Scope (Future Enhancements)
*   Online payment gateways (bKash/Nagad automated integration; billing will be handled manually/COD initially).
*   Customer account creation and order history portal (guest checkout only).
*   Live delivery map tracking.
*   Automated AI chatbot support.
*   Product subscription plans.
*   Loyalty program or advanced promo coupon engine.

---

## 2. Platform Routes

### Public Pages (Customer-Facing)
| Route | Component/Page Name | Purpose |
|---|---|---|
| `/` | `Home` | Brand experience, proof points, and quick availability CTA. |
| `/product` | `ProductDetail` | In-depth quality, hygiene, packaging showcase, and pricing. |
| `/availability` | `AvailabilityCheck` | Select city/area to determine service eligibility. |
| `/order` | `OrderForm` | Unified cart summary, address details, and checkout trigger. |
| `/events` | `EventsInquiry` | Bulk order inquiries, portable carts, and packaging options. |
| `/our-story` | `BrandStory` | Mission, supply chain transparency, and quality benchmarks. |
| `/faq` | `FAQSupport` | Interactive Accordion for standard customer doubts. |
| `/contact` | `ContactUs` | General business inquiry form and map coordinates. |

### Protected Pages (Admin Platform)
All admin routes are protected and require a verified admin role session.
*   `/admin/login`: Sign-in screen using Supabase Auth.
*   `/admin`: Dashboard showing performance metrics, stock notifications, and recent logs.
*   `/admin/orders`: Order tables with filters (status, date, search by name/phone/code).
*   `/admin/orders/[id]`: Detailed view of a customer order with action buttons to adjust status, view raw WhatsApp message, and save internal notes.
*   `/admin/inventory`: Current product stock tables showing on-hand, reserved, and available counts.
*   `/admin/areas`: Service area list, toggle availability state, adjust delivery fees and estimated delivery times.
*   `/admin/settings`: Manage configurations (WhatsApp business line, global minimum order quantity, defaults).

### API / Server Action Route Handlers
*   `POST /api/availability`: Matches requested city and area against database. Returns availability status, delivery charges, and timing.
*   `POST /api/orders/prepare`: Validates stock and inputs, writes a new order record in the database with status `whatsapp_redirected`, reserves stock, and outputs the pre-filled WhatsApp link.
*   `POST /api/admin/orders/[id]/status`: Transition orders (e.g. from `whatsapp_redirected` to `confirmed` or `cancelled`). Reduces available inventory permanently upon confirmation, or releases it upon cancellation.
*   `POST /api/admin/inventory/adjust`: Admin manual stock adjustments. Requires adjustment reason logging.
