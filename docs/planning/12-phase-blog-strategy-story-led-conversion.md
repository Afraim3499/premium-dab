# Phase 12 — Blog Strategy, Story-Led Content System, Conversion Writing Plan

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
Create a blog/content system that builds trust, educates customers, supports SEO/AEO/GEO/SXO, and converts readers into buyers. No blog should be thin, generic, or robotic. Each blog must feel like a full story connected to Bangladeshi life, daily heat, family routines, office breaks, food hygiene concerns, events, and the desire for clean natural refreshment.

## Blog philosophy
Premium Daab blogs should not be short posts. They should read like:
- A real story.
- A useful guide.
- A trust-building explanation.
- A conversion path to product, availability, or events.

Every blog must include:
- Strong opening scene.
- Clear customer problem.
- Useful explanation.
- Premium Daab connection.
- Natural internal links.
- FAQ-style answer block.
- Soft conversion CTA.

## Blog categories

### 1. Health and natural refreshment
Topics:
- Why young coconut feels refreshing in Bangladesh’s heat.
- Coconut water and everyday hydration.
- No added sugar vs common sweet drinks.
- Post-walk or post-workout natural refreshment.
- Morning hydration rituals.

Important rule:
Do not make medical claims. Do not imply cure, treatment, or disease prevention.

### 2. Cleanliness and hygiene
Topics:
- Why clean preparation matters.
- The difference between buying random street daab and branded prepared daab.
- How handling, washing, cutting, and packing build trust.
- Why families care about hygienic serving.
- Why office teams need reliable refreshment.

### 3. Taste consistency
Topics:
- Why every daab does not taste the same.
- How selection affects sweetness, freshness, and water quality.
- What customers expect from a premium brand.
- Why consistency matters for repeat ordering.

### 4. Size and quality consistency
Topics:
- Why size consistency matters in ordering.
- Small vs large daab explanation.
- Family packs and event planning.
- How Premium Daab should communicate quantity clearly.

### 5. Supply chain and quality checks
Topics:
- From farm/source selection to customer doorstep.
- How premium brands maintain quality.
- Cold handling and freshness windows.
- Batch checks and rejection standards.
- Why supply chain discipline matters.

### 6. Event and lifestyle content
Topics:
- Daab as a wedding welcome drink.
- Office refreshment culture.
- Gym/café partnership ideas.
- Family summer gatherings.
- Rooftop hangouts and natural drinks.

### 7. Local content
Topics:
- Premium Daab in Bashundhara Residential Area.
- Why area-wise delivery helps freshness.
- How local delivery creates better service.
- Waiting list and expansion story.

## Blog length rule
Each blog should usually be:
- 1,200–2,000 words for pillar articles.
- 900–1,300 words for supporting stories.
- Never publish 300-word thin posts.

## Blog structure template

```md
# Blog Title

## Opening story
Start with a real Bangladeshi moment: heat, office break, family guest, gym, rooftop, delivery, or concern about cleanliness.

## The real problem
Explain the customer tension clearly.

## What people usually do
Describe current behavior without insulting it.

## What better looks like
Introduce quality, cleanliness, selection, consistency, and delivery logic.

## Where Premium Daab fits
Connect the brand naturally. Do not hard sell too early.

## Practical guide/checklist
Give readers useful takeaways.

## FAQ answer block
Answer 3–5 common questions.

## Soft CTA
Guide to:
- Check Availability
- View Product
- Order on WhatsApp
- Events & Bulk Orders
```

## Internal linking rules
Every blog must link to:
- Product page
- Availability page
- Order page or Events page depending on intent
- FAQ page if answering objections

Use natural anchor text:
- “check if Premium Daab is available in your area”
- “see the Premium Daab product experience”
- “order Premium Daab through WhatsApp”
- “plan Premium Daab for events and bulk orders”

## First 24 blog topics

### Health / natural refreshment
1. Why Young Coconut Feels Like the Right Drink for a Hot Dhaka Day
2. Morning Refreshment in Bangladesh: Why Daab Still Feels Timeless
3. No Added Sugar, No Heavy Feeling: The Simple Appeal of Young Coconut
4. After a Walk or Workout: Why People Reach for Natural Coconut Water

### Cleanliness / hygiene
5. The Clean Daab Experience: Why Preparation Matters as Much as Freshness
6. From Cutting to Serving: What Customers Should Expect from a Premium Daab Brand
7. Why Families Care About Hygienic Refreshment at Home
8. Office Refreshment Should Not Feel Random: A Cleaner Way to Serve Daab

### Taste consistency
9. Why Every Daab Does Not Taste the Same
10. What Makes a Young Coconut Taste Fresh, Light, and Naturally Sweet
11. The Problem with Random Taste and Why Selection Matters
12. Why Repeat Customers Need Consistency, Not Luck

### Size and quality consistency
13. Small Daab vs Large Daab: How to Choose the Right One
14. Why Size Consistency Matters When Ordering for Family or Guests
15. How to Plan Daab Quantity for a Small Gathering
16. What a Premium Quality Check Should Mean for Daab

### Supply chain / quality checks
17. From Source to Doorstep: The Journey of a Better Daab Experience
18. Why Supply Chain Discipline Matters for Fresh Young Coconut
19. What “Fresh” Should Mean in a Delivery Brand
20. How Better Handling Protects Taste, Cleanliness, and Trust

### Events / lifestyle
21. Daab as a Wedding Welcome Drink: Natural, Elegant, and Memorable
22. A Better Office Break: Serving Natural Refreshment Without the Mess
23. Rooftop Evenings and Family Gatherings: Where Premium Daab Fits Naturally
24. Why Gyms and Cafés Can Use Young Coconut as a Premium Refreshment Option

## Blog content quality checklist
Each blog must:
- Start with a human scene.
- Use plain language.
- Avoid generic AI wording.
- Include specific Bangladeshi context.
- Avoid medical overclaims.
- Explain one clear problem.
- Offer practical value.
- Include internal links.
- Include CTA.
- Include FAQ block.
- Include meta title and meta description.
- Include schema-ready summary.
- Include image recommendation.
- End with a conversion path.

## Blog implementation requirements
Build:
- `/blog`
- `/blog/[slug]`
- Blog category pages optional after enough content.
- Author block optional.
- Related posts.
- CTA blocks inside posts.
- Table of contents for long posts.
- FAQ schema for posts with FAQ sections.
- BlogPosting schema.
- OG image support.

Content can live in:
- MDX files, or
- Supabase CMS table, or
- local markdown with frontmatter.

For v1, local MDX is acceptable if admin blog editing is not required yet. If the team expects frequent editing, use Supabase or a CMS layer.

## Blog frontmatter template
```md
---
title: ""
slug: ""
description: ""
category: ""
publishedAt: ""
updatedAt: ""
readingTime: ""
primaryKeyword: ""
secondaryKeywords:
  - ""
localFocus: "Bashundhara Residential Area, Dhaka"
ctaPrimary: "Check Availability"
ctaSecondary: "View Product"
image: ""
---
```

## Week plan

### Day 1
Create blog architecture, categories, slug strategy, and content standards.

### Day 2
Build blog listing and blog detail templates.

### Day 3
Write outlines for first 24 blog posts and lock internal linking plan.

### Day 4
Write first 4 full pillar blogs.

### Day 5
Write next 4 full blogs and create reusable CTA/FAQ blocks.

### Day 6
Implement schema, metadata, related posts, and conversion CTAs.

### Day 7
Editorial review, SEO/SXO review, and publish-readiness checklist.

## Deliverables
- Blog strategy.
- Blog architecture.
- Blog template.
- 24 topic roadmap.
- 8 initial full blog outlines or drafts.
- Internal linking plan.
- Blog quality checklist.
- Conversion writing rules.

## Acceptance criteria
This phase is complete only when:
- Blog system supports long-form story-led content.
- No thin posts are planned.
- Every blog has a conversion purpose.
- Health content avoids false or medical claims.
- Cleanliness, consistency, and supply chain content builds trust.
- Blog pages link naturally to product, availability, order, FAQ, and events pages.
- The content feels made for Bangladeshi customers, not copied from generic wellness websites.
