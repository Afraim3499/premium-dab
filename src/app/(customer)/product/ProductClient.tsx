"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PremiumBadge from "@/components/brand/PremiumBadge";

export default function ProductDetailPage() {
  const productImages = [
    {
      src: "/assets/premium-daab/product-hero.webp",
      alt: "Premium Daab Front View",
      label: "Signature Front",
    },
    {
      src: "/assets/premium-daab/product-angle-left.webp",
      alt: "Premium Daab Angled Left",
      label: "Left Angle",
    },
    {
      src: "/assets/premium-daab/product-angle-right.webp",
      alt: "Premium Daab Angled Right",
      label: "Right Angle",
    },
    {
      src: "/assets/premium-daab/product-top-straw.webp",
      alt: "Premium Daab Top Straw Insertion",
      label: "Straw Entry",
    },
    {
      src: "/assets/premium-daab/product-label-closeup.webp",
      alt: "Premium Daab Brand Label",
      label: "Branding",
    },
  ];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const incrementQty = () => setQuantity((prev) => Math.min(prev + 1, 50));
  const decrementQty = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex-1 bg-pd-cream-50 font-sans antialiased pb-24">
      {/* Editorial Header */}
      <div className="bg-[#FAF5EB] border-b border-pd-border/40 py-8 lg:py-12">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600 font-sans">
              Collection SKU: Single Young Coconut
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-pd-green-900 leading-tight">
              The Premium Standard
            </h1>
          </div>
        </div>
      </div>

      {/* Main Showcase Section */}
      <section className="mx-auto max-w-[1280px] px-6 sm:px-12 mt-12 lg:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Gallery Panel (Col 1-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            {/* Active Display Image */}
            <div className="relative w-full aspect-[4/5] bg-white rounded-3xl border border-pd-border/80 overflow-hidden flex items-center justify-center p-8 group shadow-sm">
              {/* Golden radial background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(198,154,61,0.06)_0%,transparent_70%)] pointer-events-none" />
              
              <div className="relative w-full h-full max-w-[450px] transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={productImages[activeImageIndex].src}
                  alt={productImages[activeImageIndex].alt}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_50px_rgba(11,58,34,0.15)]"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="grid grid-cols-5 gap-3 sm:gap-4">
              {productImages.map((img, idx) => {
                const isActive = idx === activeImageIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-2xl bg-white border-2 overflow-hidden flex items-center justify-center p-2 transition-all duration-300 ${
                      isActive
                        ? "border-pd-gold-500 shadow-md ring-2 ring-pd-gold-500/10 scale-95"
                        : "border-pd-border/60 hover:border-pd-gold-400 hover:scale-98"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Metadata & Order CTA (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col gap-8 w-full text-left">
            <div className="flex flex-col gap-4">
              {/* Premium Badge */}
              <div className="w-fit">
                <PremiumBadge>100% Natural · Delivered Fresh</PremiumBadge>
              </div>

              {/* Title & Price */}
              <div className="flex flex-col gap-1.5 border-b border-pd-border/60 pb-6">
                <h2 className="text-4xl font-serif text-pd-green-900 leading-tight">
                  Premium Daab
                </h2>
                <span className="text-sm font-semibold text-pd-green-800/70 font-sans tracking-wide uppercase">
                  Young Coconut (Raw & Refreshing)
                </span>
                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-4xl font-sans font-extrabold text-pd-green-950">৳120</span>
                  <span className="text-sm text-pd-muted">/ single unit</span>
                </div>
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="flex flex-col gap-4 text-base text-pd-muted leading-relaxed font-sans">
              <p>
                Selected for optimal natural sweetness and water content. Each coconut is triple-washed, custom trimmed, and served with a clean straw entry. Premium hydration delivered fresh to your doorstep in Dhaka.
              </p>
              
              {/* Key Features bullet points */}
              <ul className="flex flex-col gap-3.5 mt-2">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FAF5EB] border border-pd-gold-400 flex items-center justify-center text-pd-gold-600 mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-pd-green-950">100% raw coconut water — zero added sugar, water, or chemical preservatives.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FAF5EB] border border-pd-gold-400 flex items-center justify-center text-pd-gold-600 mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-pd-green-950">Handled under rigorous hygiene standards from harvesting to trimming.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#FAF5EB] border border-pd-gold-400 flex items-center justify-center text-pd-gold-600 mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-pd-green-950">Sealed safety label and custom-drilled straw hole for an elegant drink experience.</span>
                </li>
              </ul>
            </div>

            {/* Interaction Box (Qty & Order Button) */}
            <div className="flex flex-col gap-4 border-t border-pd-border/60 pt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-pd-green-800 font-sans">
                Select Quantity
              </span>
              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border-2 border-pd-border bg-white rounded-2xl h-14 px-2 shadow-sm">
                  <button
                    onClick={decrementQty}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold rounded-xl hover:bg-pd-cream-100/50 disabled:opacity-30 disabled:hover:bg-transparent transition text-pd-green-900"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-lg font-bold text-pd-green-950">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQty}
                    disabled={quantity >= 50}
                    className="w-10 h-10 flex items-center justify-center text-xl font-bold rounded-xl hover:bg-pd-cream-100/50 disabled:opacity-30 disabled:hover:bg-transparent transition text-pd-green-900"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Action */}
                <Link href={`/order?quantity=${quantity}`} className="flex-1">
                  <button className="w-full h-14 bg-pd-green-900 hover:bg-pd-green-800 text-pd-cream-50 text-base font-bold rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(11,58,34,0.2)] active:translate-y-0">
                    Buy Now — ৳{quantity * 120}
                  </button>
                </Link>
              </div>
            </div>

            {/* Promotional Bundles Packs */}
            <div className="bg-[#FAF5EB]/60 rounded-3xl border border-pd-border/80 p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1 text-left">
                <h3 className="font-serif text-lg font-bold text-pd-green-950">Case Pack Options</h3>
                <p className="text-xs text-pd-muted font-sans">
                  Bundle cases pre-packaged and delivered fresh. Perfect for hosting or family consumption.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {/* 4 Pack */}
                <div className="bg-white rounded-2xl border border-pd-border/60 p-4 flex flex-col gap-3 text-left">
                  <div>
                    <span className="block text-xs font-bold text-pd-gold-600 uppercase">Hosting Bundle</span>
                    <span className="block font-serif text-base font-bold text-pd-green-900">4-Daab Pack</span>
                    <span className="font-sans font-bold text-pd-green-950 mt-1 block">৳480</span>
                  </div>
                  <Link href="/order?quantity=4" className="w-full">
                    <button className="w-full h-10 bg-transparent hover:bg-pd-green-900 hover:text-pd-cream-50 text-pd-green-900 border-2 border-pd-green-900 text-xs font-bold rounded-xl transition duration-200">
                      Select 4-Pack
                    </button>
                  </Link>
                </div>

                {/* 6 Pack */}
                <div className="bg-white rounded-2xl border border-pd-border/60 p-4 flex flex-col gap-3 text-left">
                  <div>
                    <span className="block text-xs font-bold text-pd-gold-600 uppercase">Family Bundle</span>
                    <span className="block font-serif text-base font-bold text-pd-green-900">6-Daab Pack</span>
                    <span className="font-sans font-bold text-pd-green-950 mt-1 block">৳720</span>
                  </div>
                  <Link href="/order?quantity=6" className="w-full">
                    <button className="w-full h-10 bg-transparent hover:bg-pd-green-900 hover:text-pd-cream-50 text-pd-green-900 border-2 border-pd-green-900 text-xs font-bold rounded-xl transition duration-200">
                      Select 6-Pack
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Detail Grid */}
      <section className="bg-white border-t border-b border-pd-border/40 py-20 mt-20">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl text-pd-green-900 mb-4">
            Uncompromising Excellence
          </h2>
          <p className="text-base text-pd-muted font-sans max-w-xl mx-auto mb-16 leading-relaxed">
            How we redefine Bangladesh&apos;s natural drink experience from orchard to serving.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col gap-4 text-left p-6 rounded-2xl hover:bg-pd-cream-50/50 transition">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-pd-cream-100 border border-pd-border/40 mb-2">
                <Image
                  src="/assets/premium-daab/product-top-straw.webp"
                  alt="Hygienic straw slot"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <h3 className="font-sans font-bold text-pd-green-950 text-lg">Safe Straw Slot</h3>
              <p className="text-sm text-pd-muted leading-relaxed font-sans">
                A customized drilled aperture allows spill-free insertion. No raw knife-cuts, keeping the inside pure.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-4 text-left p-6 rounded-2xl hover:bg-pd-cream-50/50 transition">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-pd-cream-100 border border-pd-border/40 mb-2">
                <Image
                  src="/assets/premium-daab/product-label-closeup.webp"
                  alt="Quality sealing badge"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <h3 className="font-sans font-bold text-pd-green-950 text-lg">Sealed Verification</h3>
              <p className="text-sm text-pd-muted leading-relaxed font-sans">
                Each young coconut is sealed with a brand wrapper detailing our 100% natural and raw purity metrics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-4 text-left p-6 rounded-2xl hover:bg-pd-cream-50/50 transition">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-pd-cream-100 border border-pd-border/40 mb-2">
                <Image
                  src="/assets/premium-daab/product-angle-left.webp"
                  alt="Triple washed clean husk"
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <h3 className="font-sans font-bold text-pd-green-950 text-lg">Hygienic Trim</h3>
              <p className="text-sm text-pd-muted leading-relaxed font-sans">
                Husks are carefully shaved, triple-washed, and custom trimmed to create a beautiful, elegant table serving experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
