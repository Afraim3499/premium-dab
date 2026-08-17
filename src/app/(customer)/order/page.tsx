import { Metadata } from "next";
import OrderClient from "./OrderClient";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Order Fresh Young Coconut Online via WhatsApp | Premium Daab",
  description:
    "Confirm your Premium Daab order details, select your delivery area, and complete checkout. Fast WhatsApp redirected order confirmation in Dhaka.",
  alternates: {
    canonical: "/order",
  },
  openGraph: {
    title: "Order Fresh Young Coconut Online via WhatsApp | Premium Daab",
    description:
      "Confirm your Premium Daab order details, select your delivery area, and complete checkout. Fast WhatsApp redirected order confirmation in Dhaka.",
    url: "/order",
    type: "website",
    images: [
      {
        url: "/assets/premium-daab/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Order Fresh Young Coconut Online via WhatsApp | Premium Daab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Order Fresh Young Coconut Online via WhatsApp | Premium Daab",
    description:
      "Confirm your Premium Daab order details, select your delivery area, and complete checkout. Fast WhatsApp redirected order confirmation in Dhaka.",
    images: ["/assets/premium-daab/og-image.webp"],
  },
};

export default function OrderPage() {
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
        "name": "Order",
        "item": `${SITE_URL}/order`
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <OrderClient />
    </>
  );
}
