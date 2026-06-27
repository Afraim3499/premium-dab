import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";

export const metadata: Metadata = {
  title: "Contact Premium Daab — Phone, WhatsApp & Support | Premium Daab",
  description:
    "Get in touch with the Premium Daab team. Phone/WhatsApp support at 01410120299, email at Premiumdaab@gmail.com, or check delivery coverage.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Premium Daab — Phone, WhatsApp & Support | Premium Daab",
    description:
      "Get in touch with the Premium Daab team. Phone/WhatsApp support at 01410120299, email at Premiumdaab@gmail.com.",
    url: "/contact",
    type: "website",
  },
};

const CONTACT_CARDS = [
  {
    title: "WhatsApp Channel",
    value: "+880 1410-120299",
    description: "Fast-track your orders, send digital payments screenshot, or chat directly with our guest relations team.",
    linkText: "Start Chatting",
    href: "https://wa.me/8801410120299?text=Hello%20Premium%20Dab!%20I%20have%20an%20inquiry.",
    icon: (
      <svg className="w-6 h-6 text-pd-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Voice Support",
    value: "01410120299",
    description: "Available from 10:00 AM to 8:00 PM daily. Call us for urgent order modifications or group reservations.",
    linkText: "Call Now",
    href: "tel:01410120299",
    icon: (
      <svg className="w-6 h-6 text-pd-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: "Email Inquiry",
    value: "Premiumdaab@gmail.com",
    description: "For corporate partnerships, marketing opportunities, or feedback, drop us an email anytime.",
    linkText: "Send Email",
    href: "mailto:Premiumdaab@gmail.com",
    icon: (
      <svg className="w-6 h-6 text-pd-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
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
        "name": "Contact",
        "item": `${SITE_URL}/contact`
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="flex-1 bg-pd-cream-50 font-sans antialiased pb-24">
      {/* 1. Header Hero */}
      <section className="bg-[#FAF5EB] border-b border-pd-border/40 py-16 sm:py-24 text-center px-6">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-pd-green-900 leading-tight">
            We Are Here to Assist
          </h1>
          <p className="text-sm sm:text-base text-pd-muted leading-relaxed max-w-xl">
            Have questions about ordering, delivery coverage, or our selection standards? Choose your preferred way of reaching out.
          </p>
        </div>
      </section>

      {/* 2. Contact Cards Grid */}
      <section className="py-16 mx-auto max-w-[1280px] px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTACT_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-pd-border/60 hover:border-pd-gold-500/40 p-8 rounded-3xl transition-all duration-300 hover:shadow-md flex flex-col gap-5 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-pd-cream-50 flex items-center justify-center flex-shrink-0">
                {card.icon}
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <h3 className="font-sans font-bold text-pd-green-950 text-base">
                  {card.title}
                </h3>
                <span className="font-serif text-xl font-bold text-pd-green-900 overflow-hidden text-ellipsis whitespace-nowrap">
                  {card.value}
                </span>
                <p className="text-xs sm:text-sm text-pd-muted leading-relaxed mt-2">
                  {card.description}
                </p>
              </div>
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-full h-11 border border-pd-border hover:bg-pd-cream-50 text-pd-green-950 font-semibold rounded-xl flex items-center justify-center text-sm transition-colors"
              >
                {card.linkText}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Delivery Coverage Callout */}
      <section className="mx-auto max-w-3xl px-6">
        <div className="bg-[#FAF5EB] border border-pd-gold-500/20 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="flex flex-col gap-2 max-w-md">
            <h3 className="font-serif text-2xl font-bold text-pd-green-900 leading-tight">
              Looking for Delivery?
            </h3>
            <p className="text-sm text-pd-muted leading-relaxed">
              We are expanding daily across Dhaka. Check if your sector or block is currently in our active service area, or register to join the launch waitlist.
            </p>
          </div>
          <Link
            href="/availability"
            className="h-12 px-8 bg-pd-green-900 hover:bg-pd-green-800 text-white font-semibold rounded-xl flex items-center justify-center shadow-sm text-sm border-0 transition-colors whitespace-nowrap"
          >
            Check Availability
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
