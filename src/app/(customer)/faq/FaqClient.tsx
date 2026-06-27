"use client";

import React, { useState } from "react";

const CATEGORIES = ["All", "Product", "Freshness", "Delivery", "Payment", "Events"];

const FAQ_ITEMS = [
  {
    category: "Product",
    question: "What is Premium Daab?",
    answer: "Premium Daab brings fresh young coconut into a clean, premium, and hygienic ready-to-drink experience for modern homes, offices, and events in Dhaka.",
  },
  {
    category: "Product",
    question: "Does Premium Daab contain added sugar or preservatives?",
    answer: "Absolutely not. Every Premium Daab is 100% raw and natural young coconut water. We add zero sugar, zero water, and absolutely no artificial colorings or chemical preservatives.",
  },
  {
    category: "Product",
    question: "How is Premium Daab prepared and served?",
    answer: "Our coconuts are carefully harvested from southern coastal zones, screened for quality, washed, and custom-shaved in our sanitized Dhaka hub. We trim the husk to create an elegant flat-based dome that sits perfectly on your table.",
  },
  {
    category: "Delivery",
    question: "Where is Premium Daab delivery available in Dhaka?",
    answer: "Currently, our primary delivery operations are active in Bashundhara Residential Area. We are expanding coverage to Gulshan, Banani, Dhanmondi, and Uttara soon. You can verify coverage for your specific sector or block on our Availability page.",
  },
  {
    category: "Product",
    question: "How do I order Premium Daab?",
    answer: "You can select your package on our Product page, enter your delivery address on the Order checkout page, and place your order. Our system will generate a summary and redirect you to WhatsApp to confirm your delivery slot with our team.",
  },
  {
    category: "Events",
    question: "Can I order Premium Daab for events?",
    answer: "Yes! We cater corporate refreshments, weddings, and private parties. For event orders of 10+ units, we arrange customized ice displays. Custom hot-brand logo stamps are also available on request for orders of 30+ units.",
  },
  {
    category: "Freshness",
    question: "How long can I keep the coconuts in my refrigerator?",
    answer: "Because we carefully shave the protective green husk to provide a polished presentation, the inner shell is more exposed. We recommend keeping them refrigerated and consuming within 3 to 5 days to enjoy the best taste.",
  },
  {
    category: "Product",
    question: "Does it come with straws or opening tools?",
    answer: "No complex tools are needed! Every coconut is shaved to expose the soft 'eye' at the top, which is protected by a clean, food-safe sticker. Simply pull the sticker and insert the natural biodegradable straw (included with every order) to drink.",
  },
  {
    category: "Delivery",
    question: "How long does delivery take and what is the fee?",
    answer: "For active zones (like Bashundhara R/A), deliveries are completed within 2 to 4 hours. The delivery fee varies by area (e.g. ৳40 for Bashundhara R/A) and is shown dynamically on the checkout page before order redirection.",
  },
  {
    category: "Payment",
    question: "What payment options do you support?",
    answer: "We support Cash on Delivery (COD) as well as digital payments via bKash, Nagad, and Rocket. You can coordinate your preferred digital transaction details with our representative on WhatsApp.",
  },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    if (selectedCategory === "All") return true;
    return faq.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex-1 bg-pd-cream-50 font-sans antialiased pb-24">
      {/* 1. Header Section */}
      <section className="bg-[#FAF5EB] border-b border-pd-border/40 py-16 sm:py-24 text-center px-6">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
            Customer Care
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-pd-green-900 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-pd-muted leading-relaxed max-w-xl">
            Find answers to common questions about our products, freshness commitment, delivery zones, payments, and catering.
          </p>
        </div>
      </section>

      {/* 2. Main Q&A Content area */}
      <section className="py-12 sm:py-16 mx-auto max-w-3xl px-6">
        {/* Category Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 select-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(null);
                }}
                className={`h-10 px-5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border ${
                  isActive
                    ? "bg-pd-green-900 border-pd-green-900 text-pd-cream-50 shadow-sm"
                    : "bg-white border-pd-border/80 text-pd-muted hover:border-pd-gold-500/50 hover:text-pd-green-950"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4 min-h-[300px]">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-pd-border/60 hover:border-pd-border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm text-left"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-serif font-bold text-pd-green-950 text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <span
                      className={`w-5 h-5 flex items-center justify-center text-pd-gold-600 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-sm text-pd-muted leading-relaxed border-t border-pd-border/40 pt-4 bg-pd-cream-50/10">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-sm font-semibold text-pd-muted">No questions found matching this filter.</span>
            </div>
          )}
        </div>
      </section>

      {/* 3. Direct Support Callout */}
      <section className="mx-auto max-w-xl px-6 mt-8">
        <div className="bg-[#FAF5EB] border border-pd-gold-500/20 rounded-3xl p-8 text-center flex flex-col items-center gap-4">
          <h3 className="font-serif text-xl font-bold text-pd-green-900">
            Still Have Questions?
          </h3>
          <p className="text-xs sm:text-sm text-pd-muted leading-relaxed max-w-sm">
            We are here to help. Reach out directly on WhatsApp to speak with a guest relations representative immediately.
          </p>
          <a
            href="https://wa.me/8801410120299?text=Hello%20Premium%20Dab!%20I%20have%20a%20question..."
            target="_blank"
            rel="noopener noreferrer"
            className="h-11 px-6 bg-pd-green-900 hover:bg-pd-green-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm text-sm border-0 transition-colors mt-2"
          >
            Chat with Support
          </a>
        </div>
      </section>
    </div>
  );
}
