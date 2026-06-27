"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const OCCASIONS = [
  {
    title: "Corporate & Offices",
    description: "Keep your teams refreshed with natural hydration. Perfect for annual general meetings, corporate retreats, and office wellness days.",
    icon: (
      <svg className="w-8 h-8 text-pd-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Weddings & Galas",
    description: "Add a touch of organic elegance to your guest reception. Our clean presentation and tailored setup fit beautifully into upscale wedding designs.",
    icon: (
      <svg className="w-8 h-8 text-pd-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Cafés & Brand Activations",
    description: "Collaborate on limited-run menus or pop-ups. Ideal for gyms, retail launches, and activations looking for a high-end natural beverage partner.",
    icon: (
      <svg className="w-8 h-8 text-pd-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    title: "Rooftops & Private Parties",
    description: "Provide a unique, talk-worthy serving experience for your housewarming, garden dinners, pool parties, or private family gatherings.",
    icon: (
      <svg className="w-8 h-8 text-pd-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

const PACKAGES = [
  {
    title: "The Quad Case",
    qty: "4 Units",
    price: "৳480",
    description: "A compact case beautifully housing four selected and branded young coconuts. Perfect as a boutique gift or host contribution.",
  },
  {
    title: "The Hex Case",
    qty: "6 Units",
    price: "৳720",
    description: "Six pristine, prepped young coconuts laid in a premium container. A popular choice for weekend family brunches and small group discussions.",
  },
  {
    title: "Bespoke Cart Setup",
    qty: "10+ Units",
    price: "Inquire",
    description: "Bring the complete physical Premium Daab serving experience to your venue. Includes curated ice displays, preparation tools, and serving support.",
  },
];

const FAQS = [
  {
    question: "What is the minimum quantity for a bulk or event order?",
    answer: "For standard case deliveries, our minimum order is 1 case (4 or 6 units). For custom event setups, cart presence, or branding, we require a minimum order of 10 coconuts.",
  },
  {
    question: "Can we get custom branding on the coconuts?",
    answer: "Yes! For corporate partnerships or larger private celebrations (typically 30+ units), we can arrange a custom hot-brand stamp containing your company logo, couples initials, or event graphic.",
  },
  {
    question: "How much lead time is required to book a physical setup?",
    answer: "To ensure availability of our trained service operators and freshly sourced young coconuts, we recommend booking event setups at least 3 to 5 days in advance. Last-minute bookings may be accommodated depending on queue status.",
  },
  {
    question: "How are the coconuts prepared and kept cold?",
    answer: "Every coconut is harvested, carefully shaved, and kept chilled in our temperature-controlled facility. For physical events, they are transported in cold containers and beautifully displayed over crushed ice blocks at your venue.",
  },
];

export default function EventsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    eventDate: "",
    quantity: 10,
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value, 10) || 0 : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    // Simple validation before API call
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid Bangladeshi mobile number (e.g. 01712345678).";
    }
    if (!formData.eventType.trim()) newErrors.eventType = "Event type is required.";
    if (!formData.eventDate.trim()) newErrors.eventDate = "Event date is required.";
    if (formData.quantity < 10) newErrors.quantity = "Minimum quantity for event bulk orders is 10.";
    if (!formData.location.trim()) newErrors.location = "Event location is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/events/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessUrl(data.whatsappRedirectUrl);
      } else {
        setErrors({ form: data.error || "Failed to submit inquiry. Please try again." });
      }
    } catch (err) {
      console.error("Bulk inquiry submission error:", err);
      setErrors({ form: "A connection error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-pd-cream-50 font-sans antialiased relative">
      {/* 1. Hero Section */}
      <section className="bg-[#FAF5EB] border-b border-pd-border/40 py-16 sm:py-24 text-center px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-4 sm:gap-6">
          <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
            Events & Catering
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-pd-green-900 leading-tight">
            A More Beautiful Serving Experience
          </h1>
          <p className="text-base sm:text-lg text-pd-muted leading-relaxed max-w-2xl">
            Bring natural, chilled hydration with cleaner presentation and careful preparation to your corporate functions, wedding celebrations, and private gatherings across Dhaka.
          </p>
          <Button
            onClick={() => {
              document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="h-13 px-8 text-sm font-semibold shadow-sm mt-2"
          >
            Inquire About Event Services
          </Button>
        </div>
      </section>

      {/* 2. Occasions Grid */}
      <section className="py-16 sm:py-24 mx-auto max-w-[1280px] px-6 sm:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
            Tailored Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-pd-green-900 mt-2">
            Occasions We Elevate
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {OCCASIONS.map((occ) => (
            <div
              key={occ.title}
              className="bg-white border border-pd-border/60 hover:border-pd-gold-500/50 p-8 rounded-3xl transition-all duration-300 hover:shadow-md flex gap-5 text-left"
            >
              <div className="w-12 h-12 rounded-2xl bg-pd-cream-50 flex items-center justify-center flex-shrink-0">
                {occ.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-xl font-bold text-pd-green-900">
                  {occ.title}
                </h3>
                <p className="text-sm text-pd-muted leading-relaxed">
                  {occ.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Case Packages showcase */}
      <section className="bg-white border-y border-pd-border/40 py-16 sm:py-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 text-center">
          <div className="mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
              Packaging Options
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-pd-green-900 mt-2">
              Chilled Cases & Custom Setup
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.title}
                className="border border-pd-border/60 rounded-3xl p-8 flex flex-col gap-5 text-left bg-pd-cream-50/20 hover:bg-white hover:border-pd-gold-500/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-xl font-bold text-pd-green-900">
                    {pkg.title}
                  </h3>
                  <span className="text-xs font-bold text-pd-gold-600 uppercase tracking-widest">
                    {pkg.qty}
                  </span>
                </div>
                <div className="text-2xl font-serif text-pd-green-950 font-bold">
                  {pkg.price}
                </div>
                <p className="text-sm text-pd-muted leading-relaxed flex-1">
                  {pkg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Inquiry Form */}
      <section id="inquiry-form" className="py-16 sm:py-24 mx-auto max-w-2xl px-6">
        <div className="bg-white border border-pd-border/80 p-8 sm:p-10 rounded-3xl shadow-md text-left">
          <div className="mb-8 flex flex-col gap-1.5">
            <h2 className="font-serif text-3xl font-bold text-pd-green-900">
              Bulk Inquiry Form
            </h2>
            <p className="text-sm text-pd-muted leading-relaxed">
              Register your interest below. Our management team will check availability for your date and reach out via phone or WhatsApp.
            </p>
          </div>

          {errors.form && (
            <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm font-medium mb-6">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
            {/* Name */}
            <Input
              label="Contact Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Asif Rahman"
              error={errors.name}
              disabled={isLoading}
              required
            />

            {/* Phone */}
            <Input
              label="Mobile Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g. 01712345678"
              error={errors.phone}
              disabled={isLoading}
              required
            />

            {/* Event Type & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Event Occasion"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                placeholder="e.g. Wedding Reception"
                error={errors.eventType}
                disabled={isLoading}
                required
              />
              <Input
                label="Event Date"
                name="eventDate"
                type="text"
                value={formData.eventDate}
                onChange={handleInputChange}
                placeholder="e.g. Oct 25, 2026"
                error={errors.eventDate}
                disabled={isLoading}
                required
              />
            </div>

            {/* Quantity & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <Input
                  label="Quantity (Min 10)"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min={10}
                  error={errors.quantity}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Input
                  label="Event Location / Venue"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. Lakeshore Hotel, Gulshan"
                  error={errors.location}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-sm font-medium text-pd-text select-none">
                Special Instructions (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="e.g. Require custom hot-brand logo stamp on the coconuts, or need chilled cart setup..."
                disabled={isLoading}
                className="w-full rounded-xl border border-pd-border bg-white p-4 text-base transition-all duration-200 outline-none placeholder:text-pd-muted/60 focus:border-pd-green-700 focus:ring-1 focus:ring-pd-green-700 disabled:opacity-50 disabled:bg-pd-cream-50 resize-none font-sans"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full h-14 bg-pd-green-900 hover:bg-pd-green-800 text-pd-cream-50 font-bold border-0 shadow-sm mt-3 text-base"
            >
              Submit Lead & Open WhatsApp
            </Button>
          </form>
        </div>
      </section>

      {/* 5. FAQs Preview */}
      <section className="bg-[#FAF5EB] border-t border-pd-border/40 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-left">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
              Inquiry Support
            </span>
            <h2 className="text-3xl font-serif text-pd-green-900 mt-2">
              Common Questions About Events
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white border border-pd-border/60 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-serif font-bold text-pd-green-950 text-base sm:text-lg">
                      {faq.question}
                    </span>
                    <span className={`w-5 h-5 flex items-center justify-center text-pd-gold-600 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </button>
                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[200px]" : "max-h-0"}`}>
                    <div className="px-6 pb-6 text-sm text-pd-muted leading-relaxed border-t border-pd-border/40 pt-4 bg-pd-cream-50/10">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Modal Overlay */}
      {successUrl && (
        <div className="fixed inset-0 bg-pd-green-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl border border-pd-border p-8 max-w-md w-full shadow-xl text-center flex flex-col items-center gap-6 animate-scaleIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-700 flex items-center justify-center">
              <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-bold text-pd-green-950 text-2xl">Inquiry Saved!</h3>
              <p className="text-sm text-pd-muted leading-relaxed">
                Thank you for your bulk inquiry. We have saved your event details. Click the button below to fast-track your booking by opening WhatsApp with your prepared message details.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <a
                href={successUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSuccessUrl(null)}
                className="w-full h-12 bg-pd-green-900 hover:bg-pd-green-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm text-sm border-0 transition"
              >
                <span>Continue to WhatsApp</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <button
                onClick={() => setSuccessUrl(null)}
                className="w-full h-11 text-sm font-semibold text-pd-muted hover:text-pd-green-900 transition-colors"
              >
                Close & Stay on Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
