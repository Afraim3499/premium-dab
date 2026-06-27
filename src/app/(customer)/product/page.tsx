import { Metadata } from "next";
import ProductClient from "./ProductClient";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";

export const metadata: Metadata = {
  title: "Premium Young Coconut — Raw, Natural & Untouched | Premium Daab",
  description:
    "Purchase Premium Daab young coconuts. 100% natural, hygienic handling, zero sugar added, zero preservatives. Standard single orders and multi-pack options available.",
  alternates: {
    canonical: "/product",
  },
  openGraph: {
    title: "Premium Young Coconut — Raw, Natural & Untouched | Premium Daab",
    description:
      "Purchase Premium Daab young coconuts. 100% natural, hygienic handling, zero sugar added, zero preservatives.",
    url: "/product",
    type: "website",
    images: [
      {
        url: "/assets/premium-daab/product-hero.webp",
        width: 800,
        height: 1000,
        alt: "Premium Daab Young Coconut Single Unit",
      },
    ],
  },
};

export default function ProductPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Premium Daab Young Coconut",
    "image": [
      `${SITE_URL}/assets/premium-daab/product-hero.webp`,
      `${SITE_URL}/assets/premium-daab/product-angle-left.webp`,
      `${SITE_URL}/assets/premium-daab/product-angle-right.webp`
    ],
    "description": "Selected for optimal natural sweetness and water content. Each coconut is triple-washed, custom trimmed, and served with a clean straw entry. Delivered fresh in Dhaka.",
    "sku": "premium-daab-single",
    "brand": {
      "@type": "Brand",
      "name": "Premium Daab"
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_URL}/product`,
      "priceCurrency": "BDT",
      "price": "120.00",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2027-12-31"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Product",
        "item": `${SITE_URL}/product`
      }
    ]
  };

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ProductClient />
    </>
  );
}
