# Asset Manifest & Renaming Guide

To ensure clean paths and prevent case-sensitive deployment issues (e.g. on Vercel), all local media assets will be organized into standardized lowercase kebab-case paths under the `/public/assets` folder.

---

## 1. Asset Mapping Manifest

| Original Workspace Filename | Target Project Asset Path | Dimensions / Type | Recommended Layout Placement |
|---|---|---|---|
| `Premium Daab logo.png` | `/public/assets/brand/premium-daab-logo.png` | Transparent PNG | Global navigation header, dark green footer. |
| `product image.jpeg` | `/public/assets/product/product-main.jpeg` | Packaged JPEG | Product overview page, blog cards, waitlist background. |
| `Front-facing product hero.png` | `/public/assets/product/product-hero-front.png` | Product Hero PNG | Main homepage hero banner. |
| `Product angled left.png` | `/public/assets/product/product-angled-left.png` | Detail view PNG | Product detail gallery (alternative perspective). |
| `Product angled right.png` | `/public/assets/product/product-angled-right.png` | Detail view PNG | Product detail gallery (alternative perspective). |
| `Product topstraw detail.png` | `/public/assets/product/product-topstraw-detail.png` | Close-up PNG | Product feature highlights (explaining the straw entry). |
| `Product label close-up.png` | `/public/assets/product/product-label-closeup.png` | Close-up PNG | Trust & verification section (label ingredients detail). |
| `premium_daab_product_cutout_actual_transparent.png` | `/public/assets/product/product-cutout-transparent.png` | Transparent PNG | Floating card graphics, page transitions, and cart overlays. |
| `premium_daab_product_cutout_full_canvas_transparent.png` | `/public/assets/product/product-cutout-full-canvas.png` | Transparent PNG | Availability check results, background graphics. |
| `menu.png` | `/public/assets/brand/menu-board.png` | Brand Board PNG | Our Story page, corporate pitch section. |
| `dab cart.png` | `/public/assets/events/dab-cart.png` | Showcase PNG | Events & Bulk order hero presentation. |
| `4 dab pack.png` | `/public/assets/packs/4-dab-pack.png` | Bundle PNG | Product bundles section, event checkout card. |
| `6 dab family pack.png` | `/public/assets/packs/6-dab-family-pack.png` | Bundle PNG | Product bundles section, family order card. |

---

## 2. Image Optimization and Usage Rules

1. **Next.js Image Component (`next/image`)**:
    *   Do not use standard HTML `<img>` tags unless explicitly justified. Always wrap images in the `<Image />` component to automatically serve WebP/AVIF formats, resize responsively, and generate blurred placeholders.
2. **Preloading & Prioritizing**:
    *   Set `priority={true}` *only* on above-the-fold hero images to bypass lazy loading:
        *   `product-hero-front.png` (on Homepage)
        *   `product-angled-left.png` / `product-angled-right.png` (on Product Detail Page)
3. **Lazy Loading**:
    *   Below-the-fold images must have `loading="lazy"` (Next.js default) enabled.
4. **Aspect Ratios & Dimensions**:
    *   Maintain high-resolution asset clarity. Never stretch images.
    *   Use CSS object-fit rules (`object-contain` or `object-cover`) to handle responsive layouts.
5. **No Local Windows Paths**:
    *   Never use absolute Windows paths (e.g. `d:/premium_dab/...`) in codebase components. All code references must be relative to the web root (e.g., `/assets/brand/premium-daab-logo.png`).
