# Phase 11 — SEO, AEO, GEO, GIO, SXO, AIO, Local Positioning and Discoverability Excellence

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
Make Premium Daab discoverable, answerable, locally relevant, and conversion-ready across search engines, AI answer engines, local search behavior, social previews, and user experience. This phase is not about stuffing keywords. It is about making the brand clear, trustworthy, technically readable, locally positioned, and conversion-oriented.

## Definitions for this project
Use these working definitions:

- SEO: Search Engine Optimization — ranking and discoverability in traditional search.
- AEO: Answer Engine Optimization — being selected as a direct answer for questions.
- GEO: Generative Engine Optimization — making content easy for AI systems to understand and cite/summarize.
- GIO: Generative Information Optimization — making product/entity information structured, consistent, and machine-readable across the site.
- SXO: Search Experience Optimization — making search visitors satisfied and likely to convert.
- AIO: AI Optimization — broader readiness for AI-driven discovery, summaries, snippets, assistants, and future search interfaces.
- Local positioning: making Premium Daab clearly relevant to Bashundhara Residential Area and nearby Dhaka delivery behavior.

## Core positioning
Premium Daab should be positioned as:
- Premium young coconut delivery in Bashundhara Residential Area.
- Clean and hygienically prepared daab in Dhaka.
- Fresh young coconut for homes, offices, gyms, cafés, and events.
- Product of Bangladesh.
- 100% natural, no sugar added, no preservatives.

Be careful with claims:
- Do not make medical claims.
- Do not say it cures disease.
- Do not overpromise hydration/health results.
- Use “naturally refreshing,” “no added sugar,” “young coconut,” and “hygienically prepared” if accurate.

## Page-level SEO plan

### Home
Target intent:
- Premium daab Bangladesh
- Young coconut delivery Dhaka
- Premium coconut drink Bangladesh
- Fresh daab delivery

Meta title:
- Premium Daab — 100% Natural Young Coconut Delivered Fresh

Meta description:
- Premium Daab brings fresh young coconut into a clean, premium, ready-to-drink experience for homes, offices, events, and selected delivery areas in Dhaka.

### Product
Target intent:
- Premium young coconut
- Fresh daab price
- Natural daab delivery
- Young coconut 100% natural

### Availability
Target intent:
- Daab delivery Bashundhara R/A
- Daab delivery near me
- Young coconut delivery Bashundhara
- Fresh daab delivery Dhaka

### Order
Target intent:
- Order daab online
- Order young coconut on WhatsApp
- Premium Daab order

### Events
Target intent:
- Daab for events
- Coconut welcome drink wedding Bangladesh
- Corporate refreshment Dhaka
- Bulk daab order

### Our Story
Target intent:
- Premium Daab Bangladesh
- Product of Bangladesh coconut brand
- Clean daab experience

### FAQ
Target intent:
- Is daab natural?
- Is coconut water good for hydration?
- How to order fresh daab?
- Daab delivery FAQ

### Contact
Target intent:
- Premium Daab contact
- Premium Daab WhatsApp
- Daab delivery Bashundhara contact

## Local positioning: Bashundhara Residential Area
Create a clear local content layer:
- Mention Bashundhara Residential Area on Availability page.
- Add “Starting from Bashundhara R/A” in relevant service area text if true.
- Add FAQ: “Do you deliver in Bashundhara Residential Area?”
- Add structured service area data.
- Add future location pages only when there is enough real operational coverage.

Do not create fake area pages for places not served.

## Structured data plan
Implement JSON-LD:
- Organization
- LocalBusiness or FoodEstablishment where appropriate
- Product
- FAQPage
- BreadcrumbList
- WebSite
- Article/BlogPosting for blogs
- Offer for product price
- AggregateRating only if real reviews exist

## GIO entity consistency
Across the whole site, keep these entity facts consistent:
- Brand name: Premium Daab
- Product: Premium Daab young coconut
- Country: Bangladesh
- Primary local area: Bashundhara Residential Area, Dhaka
- Order channel: Website form → WhatsApp message
- Product nature: 100% natural young coconut
- Buying modes: single order, family pack, event/bulk inquiry

Create an internal `entity-facts.ts` or JSON file:
```ts
export const brandFacts = {
  brandName: "Premium Daab",
  country: "Bangladesh",
  primaryArea: "Bashundhara Residential Area, Dhaka",
  productType: "young coconut",
  orderChannel: "WhatsApp-assisted ordering",
};
```

## AEO content blocks
Add answer-style blocks:
- “What is Premium Daab?”
- “Where is Premium Daab available?”
- “How do I order Premium Daab?”
- “Can I order Premium Daab for events?”
- “Does Premium Daab contain added sugar?”
- “How is Premium Daab prepared?”

Answers should be short, factual, and visible on relevant pages.

## SXO conversion requirements
Search visitors must quickly find:
- What the product is.
- Price.
- Whether it delivers to their area.
- How to order.
- How confirmation works.
- Whether it is suitable for events.
- How to contact the brand.

Every SEO page must have a conversion CTA.

## Technical SEO checks
Implement:
- Unique metadata per page.
- Canonical URLs.
- Sitemap generation.
- Robots.txt.
- Open Graph images.
- Twitter/X card metadata.
- Clean heading hierarchy.
- Semantic HTML.
- Internal linking.
- Descriptive image alt text.
- Fast page load.
- Mobile-first layout.
- Accessible navigation.

## Local and social trust
Add:
- WhatsApp contact.
- Service area clarity.
- Contact details.
- Business inquiry route.
- Social links.
- Payment method details if active.
- Real customer reviews only when available.

## Week plan

### Day 1
Keyword and intent mapping for all pages, including Bashundhara Residential Area.

### Day 2
Write metadata, headings, AEO answer blocks, and entity facts.

### Day 3
Implement structured data for pages and product.

### Day 4
Implement sitemap, robots, canonical, OG/Twitter metadata.

### Day 5
Improve internal linking and search visitor conversion paths.

### Day 6
Run technical SEO/SXO audit and fix issues.

### Day 7
Final discoverability review and handoff to blog phase.

## Deliverables
- SEO/AEO/GEO/GIO/SXO/AIO strategy.
- Page metadata map.
- Structured data implementation.
- Entity facts file.
- Local positioning copy.
- Internal linking map.
- Search experience checklist.

## Acceptance criteria
This phase is complete only when:
- Every public page has clear search intent.
- Bashundhara R/A positioning is visible but not spammy.
- Structured data validates.
- Metadata is unique.
- Answer blocks are present.
- Search visitors are guided toward availability/order.
- No fake claims, fake reviews, or thin local pages are added.
