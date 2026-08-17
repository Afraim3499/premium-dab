import { Metadata } from "next";
import AvailabilityClient from "./AvailabilityClient";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Check Delivery Availability — Bashundhara R/A & Dhaka | Premium Daab",
  description:
    "Check if Premium Daab delivers fresh young coconut to your sector or area in Dhaka.",
  alternates: {
    canonical: "/availability",
  },
  openGraph: {
    title: "Check Delivery Availability — Bashundhara R/A & Dhaka | Premium Daab",
    description:
      "Check if Premium Daab delivers fresh young coconut to your sector or area in Dhaka.",
    url: "/availability",
    siteName: "Premium Daab",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/premium-daab/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Check Delivery Availability — Bashundhara R/A & Dhaka | Premium Daab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@premiumdaab",
    title: "Check Delivery Availability — Bashundhara R/A & Dhaka | Premium Daab",
    description:
      "Check if Premium Daab delivers fresh young coconut to your sector or area in Dhaka.",
    images: ["/assets/premium-daab/og-image.webp"],
  },
  other: {
    "og:logo": `${SITE_URL}/assets/premium-daab/logo.webp`,
  },
};

export default function AvailabilityPage() {
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
        "name": "Availability",
        "item": `${SITE_URL}/availability`
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <AvailabilityClient />
    </>
  );
}
