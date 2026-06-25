import { Metadata } from "next";
import EventsClient from "./EventsClient";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";

export const metadata: Metadata = {
  title: "Corporate Catering & Bulk Event Young Coconut | Premium Dab",
  description:
    "Book Premium Dab for weddings, corporate refreshments, and social events in Dhaka. Clean, hygienic, premium young coconut bar setup for your guests.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Corporate Catering & Bulk Event Young Coconut | Premium Dab",
    description:
      "Book Premium Dab for weddings, corporate refreshments, and social events in Dhaka. Clean, hygienic, premium young coconut bar setup for your guests.",
    url: "/events",
    type: "website",
  },
};

export default function EventsPage() {
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
        "name": "Events",
        "item": `${SITE_URL}/events`
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <EventsClient />
    </>
  );
}
