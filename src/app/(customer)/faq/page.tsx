import { Metadata } from "next";
import FaqClient from "./FaqClient";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Natural Coconut Water | Premium Daab",
  description:
    "Got questions about Premium Daab's sourcing, hygiene, sugar content, delivery areas (including Bashundhara R/A), or pricing? Get direct answers here.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions — Natural Coconut Water | Premium Daab",
    description:
      "Got questions about Premium Daab's sourcing, hygiene, sugar content, delivery areas (including Bashundhara R/A), or pricing? Get direct answers here.",
    url: "/faq",
    type: "website",
  },
};

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Premium Daab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Premium Daab brings fresh young coconut into a clean, premium, and hygienic ready-to-drink experience for modern homes, offices, and events in Dhaka."
        }
      },
      {
        "@type": "Question",
        "name": "Does Premium Daab contain added sugar or preservatives?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely not. Every Premium Daab is 100% raw and natural young coconut water. We add zero sugar, zero water, and absolutely no artificial colorings or chemical preservatives."
        }
      },
      {
        "@type": "Question",
        "name": "How is Premium Daab prepared and served?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our coconuts are carefully harvested from southern coastal zones, screened for quality, washed, and custom-shaved in our sanitized Dhaka hub. We trim the husk to create an elegant flat-based dome that sits perfectly on your table."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Premium Daab delivery available in Dhaka?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently, our primary delivery operations are active in Bashundhara Residential Area. We are expanding coverage to Gulshan, Banani, Dhanmondi, and Uttara soon. You can verify coverage for your specific sector or block on our Availability page."
        }
      },
      {
        "@type": "Question",
        "name": "How do I order Premium Daab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can select your package on our Product page, enter your delivery address on the Order checkout page, and place your order. Our system will generate a summary and redirect you to WhatsApp to confirm your delivery slot with our team."
        }
      },
      {
        "@type": "Question",
        "name": "Can I order Premium Daab for events?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We cater corporate refreshments, weddings, and private parties. For event orders of 10+ units, we arrange customized ice displays. Custom hot-brand logo stamps are also available on request for orders of 30+ units."
        }
      }
    ]
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
        "name": "FAQ",
        "item": `${SITE_URL}/faq`
      }
    ]
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <FaqClient />
    </>
  );
}
