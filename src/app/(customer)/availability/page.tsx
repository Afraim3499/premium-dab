import { Metadata } from "next";
import AvailabilityClient from "./AvailabilityClient";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";

export const metadata: Metadata = {
  title: "Check Delivery Availability — Bashundhara R/A & Dhaka | Premium Dab",
  description:
    "Verify if Premium Dab delivers to your location in Dhaka. Serving Bashundhara Residential Area, Gulshan, Banani, and more with fresh young coconut delivery.",
  alternates: {
    canonical: "/availability",
  },
  openGraph: {
    title: "Check Delivery Availability — Bashundhara R/A & Dhaka | Premium Dab",
    description:
      "Verify if Premium Dab delivers to your location in Dhaka. Serving Bashundhara Residential Area, Gulshan, Banani, and more.",
    url: "/availability",
    type: "website",
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
