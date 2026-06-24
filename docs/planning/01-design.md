# Premium Daab — Design Direction

## Project Intent

Build a premium, fast, brand-first ecommerce experience for Bangladeshi customers. This is not a generic coconut seller website. Premium Daab should feel like a clean, modern, natural refreshment brand that has upgraded the everyday Bangladeshi daab experience.

The homepage is primarily for branding. The shop/order journey is separate and should be direct, mobile-first, and conversion-focused.

## Core Brand Positioning

**Premium Daab** is a clean, fresh, beautifully served young coconut experience for modern Bangladesh.

Position the brand as:

- 100% natural
- Clean and hygienic
- Freshly served
- Premium but approachable
- Built for homes, offices, gyms, rooftops, events, and everyday refreshment
- Product of Bangladesh

Do not position it like a cheap commodity daab seller.

## Visual Mood

The website should feel:

- Premium
- Calm
- Fresh
- Tropical
- Clean
- Trustworthy
- Bangladeshi, but modern
- Natural, not rustic
- Elegant, not loud

Avoid:

- Overcrowded grocery-style layouts
- Loud neon colors
- Too many stock-looking lifestyle photos
- Generic ecommerce grids
- Excessive AI-looking faces
- Cheap health-product design
- Too much text over images
- Making everything one long landing page

## Color System

Use these as the working palette:

```css
--pd-green-950: #062918;
--pd-green-900: #0B3A22;
--pd-green-800: #104A2D;
--pd-green-700: #185C38;

--pd-cream-50: #FFFDF7;
--pd-cream-100: #F8F2E5;
--pd-cream-200: #EFE4CC;

--pd-gold-500: #C69A3D;
--pd-gold-600: #A87D24;

--pd-text: #112318;
--pd-muted: #667468;
--pd-border: rgba(11,58,34,0.16);
```

Primary background: warm cream/off-white.

Primary text: deep green.

Accent: restrained gold.

Use dark green sections sparingly for footer, sticky order CTA, admin highlights, and major CTA sections.

## Typography

Use a premium editorial contrast:

- Headings: high-end serif font, large, elegant, spacious.
- Body: clean sans-serif, readable on mobile.
- Navigation/labels/buttons: sans-serif, medium weight.

Suggested web-safe direction:

- Heading: `Cormorant Garamond`, `Playfair Display`, or equivalent premium serif.
- Body/UI: `Inter`, `Manrope`, or equivalent modern sans-serif.

Do not use thin unreadable type. Mobile readability matters more than decorative elegance.

## Image Asset Manifest

Antigravity should copy the supplied files into the app and normalize the names like this:

```txt
D:\premium_dab\Premium Daab logo.png
→ /public/assets/brand/premium-daab-logo.png

D:\premium_dab\product image.jpeg
→ /public/assets/product/product-main.jpeg

D:\premium_dab\Front-facing product hero.png
→ /public/assets/product/front-facing-product-hero.png

D:\premium_dab\Product angled left.png
→ /public/assets/product/product-angled-left.png

D:\premium_dab\Product angled right.png
→ /public/assets/product/product-angled-right.png

D:\premium_dab\Product topstraw detail.png
→ /public/assets/product/product-top-straw-detail.png

D:\premium_dab\Product label close-up.png
→ /public/assets/product/product-label-close-up.png

D:\premium_dab\premium_daab_product_cutout_actual_transparent.png
→ /public/assets/product/product-cutout-transparent.png

D:\premium_dab\premium_daab_product_cutout_full_canvas_transparent.png
→ /public/assets/product/product-cutout-full-canvas.png

D:\premium_dab\menu.png
→ /public/assets/brand/menu-board.png

D:\premium_dab\dab cart.png
→ /public/assets/events/dab-cart.png

D:\premium_dab\4 dab pack.png
→ /public/assets/packs/4-dab-pack.png

D:\premium_dab\6 dab family pack.png
→ /public/assets/packs/6-dab-family-pack.png
```

For v1, do not generate extra website images unless a section cannot work without it. If Antigravity generates any missing image, it must match the Premium Daab visual system: cream background, deep green, restrained gold, clean Bangladeshi premium context, no fake labels, no random text.

## Image Usage Rules

Use the actual assets carefully:

### Homepage
- Hero: `front-facing-product-hero.png` or `product-main.jpeg`
- Product cutout: `product-cutout-transparent.png`
- Brand detail section: `product-label-close-up.png`
- Cart preview: `dab-cart.png`
- Pack preview: `4-dab-pack.png` and `6-dab-family-pack.png`

### Product / Shop
- Hero/detail: `product-angled-left.png`, `product-angled-right.png`
- Detail cards: `product-top-straw-detail.png`, `product-label-close-up.png`
- Cart/product summary: `product-cutout-transparent.png`

### Availability
- Product cutout: `product-cutout-full-canvas.png`
- Soft hero: `product-main.jpeg`

### Order
- Product summary thumbnail: `product-cutout-transparent.png`
- Keep this page clean. No heavy visual clutter.

### Events & Bulk Orders
- Hero: `dab-cart.png`
- Packaging: `4-dab-pack.png`, `6-dab-family-pack.png`

### Our Story
- Use product and pack images as brand artifacts. Do not invent farm imagery unless approved.

### FAQ / Contact
- Reuse product cutout and cart image lightly.

## Layout System

Use a spacious premium layout:

- Max content width: 1180px–1280px.
- Section vertical padding: 72px desktop, 48px tablet, 32px mobile.
- Cards: rounded 20px–28px, subtle border, soft shadow, cream/white background.
- Do not overuse drop shadows.
- Use generous whitespace.
- Keep forms clean and highly readable.

## Header

Desktop:

- Left: logo
- Center: navigation
- Right: CTA button

Navigation:

- Home
- Product
- Availability
- Events
- Our Story
- FAQ
- Contact

Primary CTA:

- Check Availability

Secondary CTA in context:

- Order on WhatsApp

Mobile:

- Sticky top header
- Logo left
- Menu button right
- Bottom sticky CTA may appear on order/product pages only.

## Footer

Footer should be dark green and premium.

Include:

- Logo
- Short brand line
- WhatsApp / phone / email placeholders
- Quick links
- Social links
- Payment icons / text
- Product of Bangladesh note

Footer line:

**100% Natural · Premium Quality · Product of Bangladesh**

## Motion Direction

Use refined motion, not flashy animation.

Recommended:

- Hero image slow fade/slide-in
- Palm-shadow style background movement using CSS only if lightweight
- Buttons: small lift on hover
- Cards: subtle reveal on scroll
- Quantity selector: smooth micro interaction
- Availability result: gentle success/coming-soon state transition
- Order success/WhatsApp redirect: clear loading state

Avoid:

- Heavy Lottie for core content
- Large autoplay videos
- Excessive parallax
- Motion that slows mobile devices
- Animating layout-critical content before it loads

Use `prefers-reduced-motion` support.

## Component Style

### Buttons

Primary:

- Deep green background
- Cream text
- Rounded 12px–16px
- Medium weight
- Clear hover state

Secondary:

- Cream/transparent background
- Green border
- Green text

WhatsApp button:

- Green, icon left, clear label.

### Cards

Use three core card types:

1. Brand proof cards
2. Product information cards
3. Functional cards: order, availability, admin status

### Forms

Inputs:

- 48px–52px height
- Clear labels
- Rounded 12px
- Strong focus state
- Error text under input
- Use `inputmode="tel"` for phone
- Use dropdowns for city/area
- Do not require account creation

## Bangladeshi UX Details

Use:

- Tk or ৳ consistently.
- Phone validation for Bangladesh numbers.
- City/area selector before address.
- WhatsApp as the main conversion path.
- Cash on delivery / bKash / Nagad support language where relevant.
- Manual confirmation wording.

Do not pretend payment is fully online unless implemented.

## Admin UI Direction

Admin should be simple and operational, not decorative.

Style:

- Clean dashboard
- Dark green accent
- Status chips
- Inventory table
- Order table
- Quick actions

Admin pages must not carry the same heavy brand animations as the public website. Speed and clarity matter.

## Premium But Fast

Performance matters. The website must look premium without becoming slow.

Implementation requirements:

- Use `next/image` or optimized image components.
- Use local optimized assets.
- Preload only the hero image.
- Lazy-load below-fold images.
- Keep background decorations CSS-based where possible.
- Use responsive image sizes.
- Compress large PNG/JPEG assets before deployment.
- Avoid massive client bundles.
- Keep admin code separated from public website code.

## Final Design Principle

The homepage should sell the feeling.

The shop/order pages should remove friction.

The admin should support manual operations without confusion.
