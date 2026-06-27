import Image from "next/image";
import Link from "next/link";
import AvailabilityChecker from "@/components/availability/AvailabilityChecker";
import PremiumBadge from "@/components/brand/PremiumBadge";
import Button from "@/components/ui/Button";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";

export const metadata: Metadata = {
  title: "Premium Daab — 100% Natural Young Coconut Delivered Fresh",
  description:
    "Premium Daab brings fresh young coconut into a clean, premium, ready-to-drink experience for homes, offices, events, and selected delivery areas in Dhaka.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Premium Daab — 100% Natural Young Coconut Delivered Fresh",
    description:
      "Premium Daab brings fresh young coconut into a clean, premium, ready-to-drink experience for homes, offices, events, and selected delivery areas in Dhaka.",
    url: "/",
    type: "website",
    images: [
      {
        url: "/assets/premium-daab/product-cutout.webp",
        width: 600,
        height: 900,
        alt: "Premium Daab Product Cutout",
      },
    ],
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Premium Daab",
    "url": SITE_URL
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Premium Daab",
    "url": SITE_URL,
    "logo": `${SITE_URL}/assets/premium-daab/logo.webp`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+8801410120299",
      "contactType": "customer service",
      "email": "Premiumdaab@gmail.com",
      "availableLanguage": ["English", "Bengali"]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Premium Daab",
    "image": `${SITE_URL}/assets/premium-daab/product-cutout.webp`,
    "telephone": "01410120299",
    "url": SITE_URL,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dhaka",
      "addressRegion": "Dhaka Division",
      "addressCountry": "BD"
    },
    "geo": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 23.8161,
        "longitude": 90.4260
      },
      "geoRadius": "5000"
    },
    "areaServed": [
      "Bashundhara Residential Area",
      "Gulshan",
      "Banani",
      "Dhanmondi",
      "Uttara",
      "Dhaka"
    ]
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <JsonLd data={localBusinessSchema} />
      <div className="flex flex-col w-full bg-pd-cream-50 font-sans antialiased overflow-x-hidden">
      
      {/* 1. Product-Focus Hero Section */}
      <section className="relative w-full bg-[#FAF5EB] lg:h-[802px] min-h-[650px] lg:min-h-0 overflow-hidden">
        {/* Atmospheric background effects */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Warm golden radial glow behind product area */}
          <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(198,154,61,0.12)_0%,transparent_70%)]" />
          {/* Soft green ambient in top-left */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(11,58,34,0.06)_0%,transparent_70%)]" />
          {/* Bottom edge fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF5EB] to-transparent" />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-12 h-full flex flex-col lg:flex-row items-center lg:items-start lg:gap-8">

          {/* Left: Text Content */}
          <div className="w-full lg:w-[48%] flex flex-col gap-6 lg:gap-7 text-left pt-8 pb-12 lg:py-0 lg:pt-14 xl:pt-16 order-2 lg:order-1">

            {/* Premium Badge */}
            <div className="animate-hero-badge">
              <PremiumBadge>100% Natural · Delivered Fresh</PremiumBadge>
            </div>

            {/* Gold accent line */}
            <div className="animate-hero-gold-line h-[2px] bg-gradient-to-r from-pd-gold-500 to-pd-gold-600/40 rounded-full" />

            {/* Cinematic headline */}
            <h1 className="animate-hero-rise text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-serif text-pd-green-900 leading-[1.04] tracking-tight" style={{ animationDelay: "0.3s" }}>
              Premium Daab, <br />
              <span className="italic font-normal text-pd-gold-600 drop-shadow-[0_4px_20px_rgba(198,154,61,0.25)]">beautifully served.</span>
            </h1>

            {/* Subheadline */}
            <h2 className="animate-hero-rise text-lg sm:text-xl lg:text-2xl font-sans font-bold text-pd-green-800/90 leading-snug tracking-tight max-w-md" style={{ animationDelay: "0.5s" }}>
              Bangladesh&apos;s favorite natural drink, redesigned into a premium experience.
            </h2>

            {/* CTA Buttons */}
            <div className="animate-hero-rise flex flex-wrap gap-4 mt-1" style={{ animationDelay: "0.7s" }}>
              <Link href="/availability" className="inline-flex h-14 items-center justify-center rounded-2xl bg-pd-green-900 px-8 text-base font-bold text-pd-cream-50 transition-all duration-300 hover:bg-pd-green-800 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(11,58,34,0.25)] active:translate-y-0 active:scale-[0.98]">
                Check Availability
              </Link>
              <Link href="/order" className="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-pd-green-900 text-pd-green-900 bg-transparent px-8 text-base font-bold transition-all duration-300 hover:bg-pd-green-900 hover:text-pd-cream-50 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(11,58,34,0.15)] active:translate-y-0 active:scale-[0.98]">
                Order Online
              </Link>
            </div>

            {/* Trust strip */}
            <div className="animate-hero-rise flex items-center gap-6 mt-2 text-sm font-semibold text-pd-green-800/70 font-sans tracking-wide" style={{ animationDelay: "0.9s" }}>
              <span>100% Natural</span>
              <span className="w-1 h-1 rounded-full bg-pd-gold-500" />
              <span>0 Preservatives</span>
              <span className="w-1 h-1 rounded-full bg-pd-gold-500" />
              <span>Fresh & Pure</span>
            </div>
          </div>

          {/* Right: Product Cutout — pixel-perfect, no stretching */}
          <div className="w-full lg:w-[52%] flex items-center justify-center relative order-1 lg:order-2 pt-8 pb-4 lg:py-0 lg:pt-2 xl:pt-4">
            {/* Golden halo glow behind product */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] lg:w-[560px] lg:h-[560px] rounded-full bg-[radial-gradient(circle,rgba(198,154,61,0.18)_0%,rgba(198,154,61,0.06)_50%,transparent_70%)] pointer-events-none" />
            {/* Subtle green ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] lg:w-[640px] lg:h-[640px] rounded-full border border-pd-gold-500/10 pointer-events-none" />

            {/* Product Image */}
            <div className="relative w-[280px] h-[420px] sm:w-[340px] sm:h-[510px] lg:w-[420px] lg:h-[630px] xl:w-[460px] xl:h-[690px] animate-hero-rise" style={{ animationDelay: "0.2s" }}>
              <Image
                src="/assets/premium-daab/product-cutout.webp"
                alt="Premium Daab Young Coconut"
                fill
                priority
                className="object-contain drop-shadow-[0_30px_60px_rgba(11,58,34,0.20)] hover:drop-shadow-[0_40px_80px_rgba(198,154,61,0.25)] transition-all duration-700"
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 380px, 480px"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Premium Trust Badges */}
      <section className="py-24 bg-white border-b border-pd-border relative z-10">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1 */}
            <div className="flex flex-col gap-4 p-8 rounded-2xl border border-pd-gold-400 bg-[#FCF9F0] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-pd-cream-100/80 flex items-center justify-center border border-pd-border text-pd-gold-600 shadow-sm">
                <svg className="w-6 h-6 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.2 0-2.4.3-3.6.9-2.5 1.3-4.4 3.7-4.4 7.1 0 4.1 3.4 8 8 10 4.6-2 8-5.9 8-10 0-3.4-1.9-5.8-4.4-7.1-1.2-.6-2.4-.9-3.6-.9z" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-pd-green-950 text-lg">Freshly Selected</h3>
              <p className="text-base text-pd-muted leading-relaxed font-sans">
                Young coconuts selected for natural freshness.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col gap-4 p-8 rounded-2xl border border-pd-gold-400 bg-[#FCF9F0] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-pd-cream-100/80 flex items-center justify-center border border-pd-border text-pd-gold-600 shadow-sm">
                <svg className="w-6 h-6 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-pd-green-950 text-lg">Hygienically Prepared</h3>
              <p className="text-base text-pd-muted leading-relaxed font-sans">
                Clean handling with careful preparation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col gap-4 p-8 rounded-2xl border border-pd-gold-400 bg-[#FCF9F0] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-pd-cream-100/80 flex items-center justify-center border border-pd-border text-pd-gold-600 shadow-sm">
                <svg className="w-6 h-6 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 10.18a6 6 0 00-3.84-5.43L12 3 8.16 4.75A6 6 0 004 10.18v4.3a6 6 0 001.3 3.67L12 22l6.7-3.85a6 6 0 001.3-3.67v-4.3z" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-pd-green-950 text-lg">Delivered to Your Doorstep</h3>
              <p className="text-base text-pd-muted leading-relaxed font-sans">
                Fresh delivery in selected areas.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col gap-4 p-8 rounded-2xl border border-pd-gold-400 bg-[#FCF9F0] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-pd-cream-100/80 flex items-center justify-center border border-pd-border text-pd-gold-600 shadow-sm">
                <svg className="w-6 h-6 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="font-sans font-bold text-pd-green-950 text-lg">Order Online</h3>
              <p className="text-base text-pd-muted leading-relaxed font-sans">
                Simple ordering with WhatsApp confirmation.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Brand Story / Transformation Section */}
      <section className="py-28 bg-pd-cream-50 border-b border-pd-border relative">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Label close up visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-pd-gold-500/15 blur-[100px] pointer-events-none -z-10" />
            <div className="relative w-full max-w-[440px] aspect-[0.8] rounded-[40px] overflow-hidden border border-pd-border/60 shadow-2xl p-3 bg-white/60 backdrop-blur-sm transition-transform duration-700 hover:scale-[1.02] group">
              <div className="relative w-full h-full rounded-[28px] overflow-hidden">
                <Image
                  src="/assets/premium-daab/product-label-closeup.webp"
                  alt="Premium Daab Label Detail"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-w-[440px]) 100vw, 440px"
                />
              </div>
            </div>
          </div>

          {/* Editorial text */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div>
              <span className="text-pd-gold-600 uppercase tracking-widest text-xs font-bold font-sans">
                FROM NATURAL REFRESHMENT TO PREMIUM EXPERIENCE
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-pd-green-900 leading-[1.12]">
              Daab has always been natural. <br />
              <span className="italic font-normal text-pd-gold-500">We made the experience premium.</span>
            </h2>
            
            <p className="text-base sm:text-lg text-pd-muted leading-relaxed font-sans max-w-xl">
              Daab is already one of Bangladesh’s most loved natural drinks. Premium Daab improves the experience around it — cleaner handling, better presentation, thoughtful packaging, and a brand that feels ready for homes, offices, rooftops, cafés, gyms, and events.
            </p>
            
            {/* Small value row */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-6 border-t border-pd-border/45 text-sm font-semibold text-pd-green-950 font-sans">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pd-gold-500" />
                100% Natural
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pd-gold-500" />
                No Added Sugar
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pd-gold-500" />
                Hygienic Handling
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pd-gold-500" />
                Designed for Modern Lifestyle
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Product Experience Section */}
      <section className="py-28 bg-white border-b border-pd-border">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text and lists */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left order-2 lg:order-1">
            <h2 className="text-4xl sm:text-5xl font-serif text-pd-green-900 leading-tight">
              Meet the Premium Daab experience.
            </h2>
            <p className="text-base sm:text-lg text-pd-muted leading-relaxed font-sans">
              Naturally refreshing, beautifully presented, and served with the care a premium natural product deserves.
            </p>

            <ul className="flex flex-col gap-4 font-sans text-base text-pd-text mt-4">
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-pd-gold-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-pd-green-950">100% natural young coconut</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-pd-gold-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-pd-green-955">No added sugar</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-pd-gold-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-pd-green-955">No artificial preservatives</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-pd-gold-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-pd-green-955">Cleaner presentation and handling</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-pd-gold-500 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold text-pd-green-955">Designed for daily refreshment and special moments</span>
              </li>
            </ul>

            <div className="mt-6">
              <Link href="/product" className="inline-flex h-14 items-center justify-center rounded-xl bg-pd-green-900 px-8 text-base font-semibold text-pd-cream-50 transition-all duration-300 hover:bg-pd-green-800 hover:-translate-y-0.5 active:translate-y-0">
                View Product Details
              </Link>
            </div>
          </div>

          {/* Product Cutout Image (724x1097 aspect ratio: 0.66) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-pd-gold-500/20 blur-[90px] pointer-events-none -z-10" />
            <div className="relative w-full max-w-[360px] aspect-[0.66] transition-transform duration-700 hover:scale-[1.04] group">
              <Image
                src="/assets/premium-daab/product-cutout.webp"
                alt="Premium Daab Product Cutout"
                fill
                className="object-contain filter drop-shadow-[0_25px_50px_rgba(198,154,61,0.3)]"
                sizes="(max-w-[360px]) 100vw, 360px"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 5. Standalone Signature Availability Section */}
      <section className="py-28 bg-[#FAF5EB] border-b border-pd-border relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 -translate-y-1/2 right-12 w-[450px] h-[450px] rounded-full bg-pd-green-955/5 blur-[120px]" />
        </div>
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Header instructions */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <h2 className="text-4xl sm:text-6xl font-serif text-pd-green-900 leading-[1.12]">
              Is Premium Daab <br />
              <span className="italic font-normal text-pd-gold-500">available near you?</span>
            </h2>
            <p className="text-base sm:text-lg text-pd-muted leading-relaxed font-sans max-w-xl">
              Premium Daab is currently available in selected areas. Choose your city and area to check delivery availability.
            </p>
          </div>

          {/* Checker Card Panel */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-lg shadow-2xl hover:shadow-[0_20px_55px_rgba(11,58,34,0.1)] transition-shadow duration-500 rounded-3xl">
              <AvailabilityChecker />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Made for Everyday Refreshment Section (Visual Cards Grid) */}
      <section className="py-28 bg-white border-b border-pd-border">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 text-center">
          <h2 className="text-4xl sm:text-6xl font-serif text-pd-green-900 leading-tight mb-4">
            Made for everyday refreshment <br className="hidden sm:inline" />
            <span className="italic font-normal text-pd-gold-500">and premium moments.</span>
          </h2>
          <p className="text-base sm:text-lg text-pd-muted leading-relaxed font-sans max-w-2xl mx-auto mb-20">
            A clean presentation and reliable taste fit seamlessly into your modern lifestyle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Moment 1 */}
            <div className="group rounded-3xl border border-pd-border/70 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg text-left flex flex-col">
              <div className="relative w-full h-80 overflow-hidden bg-[#FAF5EB]">
                <Image
                  src="/assets/premium-daab/moment-morning.webp"
                  alt="Morning Refreshment"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-w-[400px]) 100vw, 400px"
                />
              </div>
              <div className="p-6 border-t border-pd-border/40">
                <h3 className="font-sans font-bold text-pd-green-955 text-lg mb-2">Morning Refreshment</h3>
                <p className="text-sm text-pd-muted leading-relaxed font-sans">
                  Start your day with something natural, clean, and refreshing.
                </p>
              </div>
            </div>

            {/* Moment 2 */}
            <div className="group rounded-3xl border border-pd-border/70 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg text-left flex flex-col">
              <div className="relative w-full h-80 overflow-hidden bg-[#FAF5EB]">
                <Image
                  src="/assets/premium-daab/moment-office.webp"
                  alt="Office Break"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-w-[400px]) 100vw, 400px"
                />
              </div>
              <div className="p-6 border-t border-pd-border/40">
                <h3 className="font-sans font-bold text-pd-green-955 text-lg mb-2">Office Break</h3>
                <p className="text-sm text-pd-muted leading-relaxed font-sans">
                  A fresh, healthier alternative for workplace refreshment.
                </p>
              </div>
            </div>

            {/* Moment 3 */}
            <div className="group rounded-3xl border border-pd-border/70 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg text-left flex flex-col">
              <div className="relative w-full h-80 overflow-hidden bg-[#FAF5EB]">
                <Image
                  src="/assets/premium-daab/moment-workout.webp"
                  alt="Post-Workout Hydration"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-w-[400px]) 100vw, 400px"
                />
              </div>
              <div className="p-6 border-t border-pd-border/40">
                <h3 className="font-sans font-bold text-pd-green-955 text-lg mb-2">Post-Workout Hydration</h3>
                <p className="text-sm text-pd-muted leading-relaxed font-sans">
                  Naturally refreshing after movement, heat, or outdoor activity.
                </p>
              </div>
            </div>

            {/* Moment 4 */}
            <div className="group rounded-3xl border border-pd-border/70 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg text-left flex flex-col">
              <div className="relative w-full h-80 overflow-hidden bg-[#FAF5EB]">
                <Image
                  src="/assets/premium-daab/moment-guest.webp"
                  alt="Guest Serving"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-w-[400px]) 100vw, 400px"
                />
              </div>
              <div className="p-6 border-t border-pd-border/40">
                <h3 className="font-sans font-bold text-pd-green-955 text-lg mb-2">Guest Serving</h3>
                <p className="text-sm text-pd-muted leading-relaxed font-sans">
                  Serve something simple, beautiful, and memorable to visitors.
                </p>
              </div>
            </div>

            {/* Moment 5 */}
            <div className="group rounded-3xl border border-pd-border/70 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg text-left flex flex-col">
              <div className="relative w-full h-80 overflow-hidden bg-[#FAF5EB]">
                <Image
                  src="/assets/premium-daab/pack-6.webp"
                  alt="Family Orders"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-w-[400px]) 100vw, 400px"
                />
              </div>
              <div className="p-6 border-t border-pd-border/40">
                <h3 className="font-sans font-bold text-pd-green-955 text-lg mb-2">Family Orders</h3>
                <p className="text-sm text-pd-muted leading-relaxed font-sans">
                  Bring home a natural refreshment everyone understands and loves.
                </p>
              </div>
            </div>

            {/* Moment 6 */}
            <div className="group rounded-3xl border border-pd-border/70 overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg text-left flex flex-col">
              <div className="relative w-full h-80 overflow-hidden bg-[#FAF5EB]">
                <Image
                  src="/assets/premium-daab/cart-coconut.webp"
                  alt="Events & Catering"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                  sizes="(max-w-[400px]) 100vw, 400px"
                />
              </div>
              <div className="p-6 border-t border-pd-border/40">
                <h3 className="font-sans font-bold text-pd-green-955 text-lg mb-2">Events & Catering</h3>
                <p className="text-sm text-pd-muted leading-relaxed font-sans">
                  A premium welcome drink setup for gatherings and special events.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Billboard Event Cart Section (High-Contrast Split) */}
      <section className="py-28 bg-pd-green-950 text-pd-cream-50 relative overflow-hidden">
        {/* Soft forest glow background */}
        <div className="absolute inset-0 bg-radial-gradient from-pd-green-900/50 to-transparent opacity-70 pointer-events-none" />
        
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Text content details (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div>
              <span className="text-pd-gold-500 uppercase tracking-widest text-xs font-bold font-sans">
                BUILT FOR EVERY MOMENT
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-pd-cream-50 leading-[1.12]">
              A premium daab experience, <br />
              <span className="italic font-normal text-pd-gold-500">wherever the moment happens.</span>
            </h2>
            
            <p className="text-base sm:text-lg text-pd-cream-100/60 leading-relaxed font-sans max-w-xl">
              From pop-up carts to office deliveries and event counters, Premium Daab is built to turn a familiar natural drink into a more polished serving experience.
            </p>
            
            <div className="mt-3">
              <Link
                href="/events"
                className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-pd-gold-500 bg-transparent px-8 text-base font-bold text-pd-gold-500 transition-all duration-300 hover:bg-pd-gold-500 hover:text-pd-green-950 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_14px_rgba(198,154,61,0.15)]"
              >
                Explore Events & Bulk Orders
              </Link>
            </div>
          </div>

          {/* Mobile Cart image (1122x1402 aspect ratio: 0.8) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-pd-gold-500/10 blur-[100px] pointer-events-none -z-10" />
            <div className="relative w-full max-w-[420px] aspect-[0.8] rounded-[40px] overflow-hidden border border-pd-green-800 shadow-2xl p-3 bg-pd-green-900/40 backdrop-blur-sm transition-transform duration-700 hover:scale-[1.02] group">
              <div className="relative w-full h-full rounded-[28px] overflow-hidden">
                <Image
                  src="/assets/premium-daab/cart-coconut.webp"
                  alt="Premium Daab Event Cart"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-w-[420px]) 100vw, 420px"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Commerce-Focused Packaging Section */}
      <section className="py-28 bg-white border-b border-pd-border">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 text-center">
          <h2 className="text-4xl sm:text-6xl font-serif text-pd-green-900 leading-tight mb-4">
            Freshness, packed for groups.
          </h2>
          <p className="text-base sm:text-lg text-pd-muted leading-relaxed font-sans max-w-xl mx-auto mb-20">
            Premium Daab pack options are designed for family orders, office refreshment, and small gatherings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
            
            {/* 4 Pack Box */}
            <div className="flex flex-col gap-6 p-8 rounded-[32px] border-2 border-pd-border bg-[#FCF9F0] shadow-md hover:shadow-[0_20px_50px_rgba(11,58,34,0.06)] hover:border-pd-green-800 transition-all duration-300 text-left relative overflow-hidden group">
              <div className="relative w-full aspect-[1.33] rounded-2xl overflow-hidden border border-pd-border bg-white shadow-inner">
                <Image
                  src="/assets/premium-daab/pack-4.webp"
                  alt="Premium Daab 4 Pack Bundle"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-w-[460px]) 100vw, 460px"
                />
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-3xl font-bold text-pd-green-900">4 Daab Pack</h3>
                    <span className="font-sans font-bold text-pd-gold-600 text-4xl drop-shadow-[0_2px_8px_rgba(198,154,61,0.15)]">৳480</span>
                  </div>
                </div>
                
                <p className="text-base text-pd-muted font-sans leading-relaxed flex-1">
                  Perfect for small families, guests, and office refreshment.
                </p>

                <Link href="/order?pack=4" className="w-full mt-2">
                  <Button variant="primary" className="w-full h-14 font-bold text-base shadow-sm">
                    Order 4 Pack
                  </Button>
                </Link>
              </div>
            </div>

            {/* 6 Pack Box */}
            <div className="flex flex-col gap-6 p-8 rounded-[32px] border-2 border-pd-border bg-[#FCF9F0] shadow-md hover:shadow-[0_20px_50px_rgba(11,58,34,0.06)] hover:border-pd-green-800 transition-all duration-300 text-left relative overflow-hidden group">
              <div className="relative w-full aspect-[1.33] rounded-2xl overflow-hidden border border-pd-border bg-white shadow-inner">
                <Image
                  src="/assets/premium-daab/pack-6.webp"
                  alt="Premium Daab 6 Pack Bundle"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-w-[460px]) 100vw, 460px"
                />
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-serif text-3xl font-bold text-pd-green-900">6 Daab Family Pack</h3>
                    <span className="font-sans font-bold text-pd-gold-600 text-4xl drop-shadow-[0_2px_8px_rgba(198,154,61,0.15)]">৳720</span>
                  </div>
                </div>
                
                <p className="text-base text-pd-muted font-sans leading-relaxed flex-1">
                  Best for family gatherings, meetings, rooftops, and weekend hosting.
                </p>

                <Link href="/order?pack=6" className="w-full mt-2">
                  <Button variant="primary" className="w-full h-14 font-bold text-base shadow-sm">
                    Order Family Pack
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Final CTA Section */}
      <section className="py-28 bg-pd-green-950 text-pd-cream-50/80 text-center relative overflow-hidden">
        {/* Decorative background visual overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-pd-green-900/50 to-transparent opacity-75 pointer-events-none" />
        
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-4xl sm:text-6xl font-serif text-pd-cream-50 leading-tight">
            Ready to try Premium Daab?
          </h2>
          <p className="text-base sm:text-xl text-pd-cream-100/60 leading-relaxed font-sans max-w-xl mx-auto">
            Check your area, choose your quantity, and place your order online.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Link
              href="/availability"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-pd-cream-50 px-8 text-base font-bold text-pd-green-950 transition-all duration-300 hover:bg-pd-cream-100 hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
            >
              Check Availability
            </Link>
            <Link
              href="/order"
              className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-pd-cream-200/30 bg-transparent px-8 text-base font-bold text-pd-cream-50 transition-all duration-300 hover:bg-pd-cream-100/10 hover:-translate-y-0.5 active:translate-y-0"
            >
              Order Online
            </Link>
          </div>
        </div>
      </section>

    </div>
    </>
  );
}
