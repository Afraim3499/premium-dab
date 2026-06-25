import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/entity-facts";

export const metadata: Metadata = {
  title: "Our Sourcing & Freshness Commitment | Premium Dab",
  description:
    "Learn how Premium Dab sources young coconuts from local orchards in Bangladesh, cleans them in our sorting hub, and delivers them fresh to Bashundhara R/A and Dhaka.",
  alternates: {
    canonical: "/our-story",
  },
  openGraph: {
    title: "Our Sourcing & Freshness Commitment | Premium Dab",
    description:
      "Learn how Premium Dab sources young coconuts from local orchards in Bangladesh, cleans them in our sorting hub, and delivers them fresh.",
    url: "/our-story",
    type: "website",
  },
};

const TIMELINE_STEPS = [
  {
    step: "01",
    title: "Orchard Sourcing",
    description: "We work directly with local farmers in Bangladesh's coastal zones, selecting trees that yield optimal water sweetness and tender coconut flesh.",
  },
  {
    step: "02",
    title: "Double Quality Screening",
    description: "Coconuts arrive at our centralized Dhaka hub. Each unit is screened for shell integrity, weight consistency, and water fullness.",
  },
  {
    step: "03",
    title: "Hygienic Shaving & Prep",
    description: "Our team carefully shaves the green husk in a sanitized facility, preparing a clean, flat-based white dome that stands elegantly on any table.",
  },
  {
    step: "04",
    title: "Fresh Chilled Delivery",
    description: "Every order is chilled and dispatched through our logistics network, reaching your doorstep within hours of your requested delivery time.",
  },
];

export default function OurStoryPage() {
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
        "name": "Our Story",
        "item": `${SITE_URL}/our-story`
      }
    ]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <div className="flex-1 bg-pd-cream-50 font-sans antialiased pb-24">
      {/* 1. Narrative Hero */}
      <section className="bg-[#FAF5EB] border-b border-pd-border/40 py-20 sm:py-28 text-center px-6">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-4 sm:gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
            The Journey
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-pd-green-900 leading-tight">
            A Natural Legacy, Elevated
          </h1>
          <p className="text-base sm:text-lg text-pd-muted leading-relaxed max-w-2xl">
            In Bangladesh, the young coconut (daab) is a timeless daily refreshment. We set out to bridge the gap between traditional street-side hydration and modern hygienic standards.
          </p>
        </div>
      </section>

      {/* 2. Core Comparison Section */}
      <section className="py-16 sm:py-24 mx-auto max-w-[1280px] px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div className="flex flex-col gap-6 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
              The Evolution
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-pd-green-900 leading-tight">
              Why We Redesigned the Daab Experience
            </h2>
            <p className="text-sm sm:text-base text-pd-muted leading-relaxed">
              For generations, enjoying a daab in Dhaka meant standing by busy roadsides, navigating unpredictable pricing, and sipping from dusty husks. We believed this national treasure deserved a cleaner, more beautiful serving experience.
            </p>
            <p className="text-sm sm:text-base text-pd-muted leading-relaxed">
              Premium Dab brings young coconuts into modern homes, corporate desks, and celebratory events with a selection and sanitation process that ensures every sip is pure, clean, and perfectly sweet.
            </p>
          </div>

          <div className="bg-white border border-pd-border/80 rounded-3xl p-8 sm:p-10 shadow-sm text-left flex flex-col gap-6">
            <h3 className="font-serif text-2xl font-bold text-pd-green-950">
              The Premium Dab Promise
            </h3>
            <ul className="flex flex-col gap-5">
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-pd-green-950 text-sm">Hygienically Shaved & Washed</span>
                  <span className="text-xs text-pd-muted leading-relaxed">Prepared in a clean environment, free of roadside contaminants.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-pd-green-950 text-sm">Flat-Based Standable Design</span>
                  <span className="text-xs text-pd-muted leading-relaxed">Serves beautifully on dinner tables or office desks without tilting.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-pd-green-950 text-sm">100% Raw & Untouched</span>
                  <span className="text-xs text-pd-muted leading-relaxed">Zero added sugar, zero water dilution, and absolutely no preservatives.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Farm-to-Table Timeline Step-by-Step */}
      <section className="bg-white border-y border-pd-border/40 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 text-center">
          <div className="mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-pd-green-900 mt-2">
              From Soil to Serving
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {TIMELINE_STEPS.map((step) => (
              <div key={step.step} className="flex flex-col gap-4 text-left border-l-2 border-pd-gold-500/30 pl-6 relative">
                <span className="font-serif text-5xl font-extrabold text-pd-gold-600/30 leading-none">
                  {step.step}
                </span>
                <h3 className="font-serif text-lg font-bold text-pd-green-950 mt-1">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-pd-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Local Farming & Sustainability Commitments */}
      <section className="py-16 sm:py-24 mx-auto max-w-4xl px-6 text-center">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-16 h-10 flex items-center justify-center border border-pd-gold-500/50 bg-[#FAF5EB] rounded-xl text-xs font-bold text-pd-gold-600 uppercase tracking-widest">
            BD
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-pd-green-900">
            Proudly Sourced in Bangladesh
          </h2>
          <p className="text-sm sm:text-base text-pd-muted leading-relaxed max-w-2xl">
            By sourcing our coconuts directly from farmers in the southern coastal regions, we support rural farming communities, reduce intermediary markups, and guarantee that you receive authentic, fresh Bangladeshi coconuts.
          </p>
          <div className="flex gap-4 mt-6">
            <Link
              href="/product"
              className="h-12 px-8 bg-pd-green-900 hover:bg-pd-green-800 text-white font-semibold rounded-xl flex items-center justify-center shadow-sm text-sm border-0 transition"
            >
              Order Premium Daab
            </Link>
            <Link
              href="/events"
              className="h-12 px-8 border border-pd-border bg-white text-pd-green-950 hover:bg-pd-cream-50 font-semibold rounded-xl flex items-center justify-center text-sm transition"
            >
              Learn About Events
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
