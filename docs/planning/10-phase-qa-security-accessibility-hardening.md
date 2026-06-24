# Phase 10 — QA, Security, Accessibility, Data Integrity, End-to-End Build Hardening

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
Harden the entire website before deployment preparation. This phase is not deployment. It is the final build-quality gate that ensures the customer journey, admin workflow, database logic, UI, content, performance, accessibility, and security are ready.

## Test coverage areas

### Public journey tests
Test:
1. Homepage loads.
2. Product page loads.
3. Availability checker works.
4. Available area allows order path.
5. Unavailable area blocks order and offers waitlist.
6. Quantity updates totals correctly.
7. Required fields validate correctly.
8. Final order button creates Supabase order.
9. WhatsApp redirect opens with correct message.
10. Order is not created before final click.
11. Duplicate clicks do not create duplicate orders.
12. Mobile journey is smooth.

### Admin journey tests
Test:
1. Admin login works.
2. Unauthenticated user cannot access admin.
3. Orders list shows pending order.
4. Order detail shows all information.
5. Admin can confirm order.
6. Inventory reduces after confirmation.
7. Admin can cancel order.
8. Cancelled order does not reduce inventory incorrectly.
9. Admin can add inventory.
10. Admin can reduce inventory.
11. Admin can update area availability.
12. Role restrictions work.

### Database tests
Test:
- Order row required fields.
- Price snapshot correctness.
- Delivery charge correctness.
- Status transitions.
- Inventory movements.
- Audit logs.
- Waitlist entries.
- Bulk inquiries.

### Security tests
Check:
- Admin route protection.
- Server-side authorization.
- No service role key exposed to frontend.
- RLS policies where required.
- Form validation server-side.
- Rate limiting or basic anti-spam where possible.
- Environment variable safety.

### Accessibility tests
Check:
- Keyboard navigation.
- Focus states.
- Form labels.
- Error messages.
- Contrast.
- Alt text.
- Mobile tap target sizes.
- Reduced motion.
- Semantic headings.

### Browser/device tests
Minimum:
- Chrome desktop.
- Edge desktop.
- Safari iOS if available.
- Chrome Android if available.
- Common Bangladesh mobile viewport widths.

## Content QA
Review:
- No typos.
- No inconsistent “Dab/Daab” spelling unless intentional.
- No fake claims.
- No unsupported health claims.
- Prices consistent.
- Service area text consistent.
- WhatsApp number consistent.
- Tone is premium but not unnatural.

## Visual QA
Check:
- Images are not blurry.
- Product logo not cropped badly.
- Cart image not distorted.
- Menu image not over-compressed.
- Mobile hero not too tall.
- Buttons visible.
- Forms readable.
- Footer not overcrowded.

## Reliability hardening
Implement:
- Error boundaries.
- Not-found page.
- Loading pages where needed.
- Empty states in admin.
- Retry guidance.
- Safe fallbacks for missing images.
- Clean console with no avoidable errors.

## Week plan

### Day 1
Create QA checklist and automated smoke tests.

### Day 2
Run public journey testing and fix issues.

### Day 3
Run admin journey testing and fix issues.

### Day 4
Run database integrity and inventory transition tests.

### Day 5
Run accessibility, browser, and mobile testing.

### Day 6
Run security and content QA.

### Day 7
Final hardening review, issue freeze, and build-readiness report.

## Deliverables
- QA test checklist.
- Public flow test results.
- Admin flow test results.
- Accessibility report.
- Security checklist.
- Performance follow-up notes.
- Bug list with resolved/open status.
- Build-readiness report.

## Acceptance criteria
This phase is complete only when:
- All critical flows work.
- No critical security issue remains.
- No critical database integrity issue remains.
- Order count logic is proven correct.
- Admin confirmation/inventory logic is proven correct.
- Mobile user can complete order without confusion.
- Admin can operate without developer help.
- The project is ready for deployment preparation, though deployment itself is outside this phase.
