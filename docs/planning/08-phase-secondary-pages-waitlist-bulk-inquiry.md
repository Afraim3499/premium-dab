# Phase 08 — Events, Our Story, FAQ, Contact, Waitlist and Business Inquiry Flows

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
Complete the remaining public pages and secondary conversion paths. These pages build trust, increase bulk-order opportunities, answer objections, and make the business reachable.

## Pages covered
- `/events`
- `/our-story`
- `/faq`
- `/contact`

## Events & Bulk Orders page

### Purpose
Generate higher-ticket orders from:
- Offices
- Weddings
- Rooftops
- Cafés
- Gyms
- Brand activations
- Corporate gatherings
- Family events

### Required sections
1. Event hero using cart image.
2. Occasion cards.
3. Packaging section using 4-pack and 6-pack images.
4. Bulk inquiry form.
5. Why Premium Daab works for events.
6. WhatsApp bulk order CTA.
7. FAQ preview for events.

### Bulk inquiry form fields
- Name
- Phone
- Event type
- Event date
- Estimated quantity
- Location
- Message

Form submission options:
- Save to Supabase `bulk_inquiries`.
- Open WhatsApp with prefilled bulk inquiry message.

Recommended table: `bulk_inquiries`
- id
- name
- phone
- event_type
- event_date
- quantity
- location
- message
- status
- created_at

## Our Story page

### Purpose
Make the brand feel meaningful, local, and trustworthy.

### Required sections
1. Story hero.
2. “Daab has always been natural. We made the experience premium.”
3. The problem with ordinary daab experience.
4. Premium Daab promise: clean, selected, presented, delivered.
5. Product of Bangladesh positioning.
6. Farm-to-you journey.
7. Quality and hygiene commitment.
8. CTA to availability/order.

Tone:
- Human.
- Grounded.
- Not fake luxury.
- Not overly formal.
- Bangladeshi but premium.

## FAQ page

### Purpose
Remove purchase objections.

### FAQ categories
- Product
- Freshness
- Hygiene
- Delivery
- Ordering
- Payment
- Events & Bulk
- Service Area

### Required features
- Category filters.
- Accordion interactions.
- Search/filter optional if time allows.
- CTA to WhatsApp support.

Important FAQ topics:
- Is it fresh?
- Is it 100% natural?
- Does it contain sugar/preservatives?
- How is it prepared?
- Where do you deliver?
- How long does delivery take?
- Can I order for events?
- Can I pay with cash/bKash/Nagad?
- How do I know my order is confirmed?
- What happens after I click WhatsApp order?

## Contact page

### Purpose
Create trust and give clear ways to reach Premium Daab.

### Required sections
1. Contact hero.
2. WhatsApp card.
3. Phone card.
4. Email/social card.
5. Service area card.
6. Business inquiry CTA.
7. Contact form or WhatsApp-first form.
8. Map placeholder or area note.

## Waitlist flow
Used when area is unavailable.

Fields:
- Name
- Phone
- City
- Area
- Source page

Admin should be able to view waitlist later. For this phase, saving to Supabase is enough.

## Week plan

### Day 1
Build Events page layout and content.

### Day 2
Build bulk inquiry form and WhatsApp/Supabase flow.

### Day 3
Build Our Story page.

### Day 4
Build FAQ page and accordion/category logic.

### Day 5
Build Contact page and contact/waitlist support.

### Day 6
Connect waitlist and bulk inquiry backend storage.

### Day 7
Mobile QA, content polish, trust checks, CTA checks.

## Deliverables
- `/events`
- `/our-story`
- `/faq`
- `/contact`
- Bulk inquiry flow.
- Waitlist flow.
- Contact support flow.
- FAQ content and UI.

## Acceptance criteria
This phase is complete only when:
- Every non-shop public page has a clear purpose and CTA.
- Events page can collect serious bulk leads.
- FAQ answers the real objections before purchase.
- Contact page makes the business feel reachable.
- Unavailable-area customers can join waitlist.
- Pages do not feel filler or thin.
