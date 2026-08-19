import { Metadata } from "next";
import EventsClient from "./EventsClient";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Corporate Catering & Bulk Event Young Coconut | Premium Daab",
  description:
    "Book Premium Daab catering for weddings, corporate events, and parties with custom coconut branding in Dhaka.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Corporate Catering & Bulk Event Young Coconut | Premium Daab",
    description:
      "Book Premium Daab catering for weddings, corporate events, and parties with custom coconut branding in Dhaka.",
    url: "/events",
    siteName: "Premium Daab",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/assets/premium-daab/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Corporate Catering & Bulk Event Young Coconut | Premium Daab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@premiumdaab",
    title: "Corporate Catering & Bulk Event Young Coconut | Premium Daab",
    description:
      "Book Premium Daab catering for weddings, corporate events, and parties with custom coconut branding in Dhaka.",
    images: ["/assets/premium-daab/og-image.webp"],
  },
  other: {
    "og:logo": `${SITE_URL}/assets/premium-daab/logo.webp`,
  },
};

export default function EventsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/events#service`,
    "name": "Daab Catering & Bulk Coconut Delivery",
    "description": "Premium Daab provides fresh young coconut catering for weddings, corporate events, and parties in Dhaka. Custom branding available for orders of 30+ units.",
    "serviceType": "Coconut Catering & Daab Delivery",
    "areaServed": {
      "@type": "City",
      "name": "Dhaka",
      "addressCountry": "BD"
    },
    "provider": { "@id": `${SITE_URL}/#organization` },
    "offers": {
      "@type": "Offer",
      "description": "Bulk daab for events — minimum 10 units. Custom ice display and hot-brand logo stamps for 30+ unit orders.",
      "priceCurrency": "BDT",
      "url": `${SITE_URL}/events`
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
        "item": `${SITE_URL}/`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Events & Bulk Orders",
        "item": `${SITE_URL}/events`
      }
    ]
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <EventsClient />
    </>
  );
}
