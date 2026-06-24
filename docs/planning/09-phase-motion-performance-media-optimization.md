# Phase 09 — Premium Interaction, Motion, Performance Engineering, Media Optimization

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
Make the site feel premium without sacrificing speed. This phase is where the team polishes transitions, motion, image loading, page speed, and perceived performance.

## Primary outcomes
By the end of this phase:
- Motion is refined.
- Page transitions feel smooth.
- Images are optimized.
- LCP/CLS/INP risks are reduced.
- Mobile performance is strong.
- Admin performance remains functional.
- UI feels alive but not heavy.

## Premium motion strategy

### Use motion for
- Hero product entrance.
- Section fade-up.
- Card hover.
- Quantity selector.
- Availability result.
- Order success/redirect state.
- Admin status updates.

### Avoid motion for
- Form labels.
- Critical order submission.
- Anything that blocks WhatsApp redirect.
- Heavy background loops.
- Large JS animation packages where CSS is enough.

## Implementation rules
- Respect `prefers-reduced-motion`.
- Use CSS transitions by default.
- Use Framer Motion only for selected components if needed.
- Keep animations under 300–700ms depending on context.
- Avoid layout shifts.
- Animate opacity/transform, not expensive layout properties.

## Image optimization

### Required
- Compress all images.
- Generate WebP/AVIF where practical.
- Use Next/Image.
- Provide width/height.
- Use `priority` only on primary hero image.
- Lazy-load below-fold media.
- Use blur placeholders or dominant color placeholders.
- Avoid loading all product images on homepage.

### Asset-specific rules
- Logo should be SVG/optimized PNG.
- Transparent product cutout should be compressed without destroying alpha.
- Hero image should be responsive.
- Menu image and packaging images should not be loaded above fold unless needed.
- Cart image should be optimized for Events page.

## Performance targets
Not deployment, but local/Lighthouse checks should target:
- Mobile LCP under 2.5s where possible.
- CLS under 0.1.
- INP under 200ms where possible.
- JavaScript kept minimal.
- No huge unused libraries.
- No unoptimized image above 500KB unless justified.

## Loading states
Create polished loading states:
- Availability checking.
- Order submission.
- Admin order status update.
- Inventory update.
- Bulk inquiry submission.
- Waitlist submission.

Loading should feel calm and trustworthy.

## Error states
Create friendly but clear error states:
- Network issue.
- Order creation failed.
- Area unavailable.
- Inventory not enough.
- Admin action failed.
- Invalid phone/address.

## Admin performance
Admin pages should not over-animate. Admin needs clarity and speed:
- Fast tables.
- Clear filters.
- Server-side pagination if orders grow.
- Minimal decorative images.
- Fast status updates.

## Week plan

### Day 1
Audit current image sizes, JS bundle, route loading, and layout shifts.

### Day 2
Optimize images, convert formats, implement responsive image sizes.

### Day 3
Add premium motion to public pages.

### Day 4
Add order/availability/admin loading and error states.

### Day 5
Run Lighthouse and manual mobile speed checks. Remove heavy code.

### Day 6
Refine perceived performance: skeletons, lazy sections, critical CSS, route prefetching.

### Day 7
Final motion and performance review with screenshots and metrics.

## Deliverables
- Optimized image assets.
- Motion implementation.
- Loading states.
- Error states.
- Lighthouse/performance notes.
- Reduced-motion support.
- Mobile performance report.

## Acceptance criteria
This phase is complete only when:
- The site feels premium but loads fast.
- Motion does not feel cheap or excessive.
- No major layout shift is visible.
- Critical order path is not slowed by animation.
- Mobile experience is smooth.
- Admin remains fast and usable.
