import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-pd-green-950 text-pd-cream-50/70 border-t border-pd-green-900 mt-auto">
      {/* Top Grid Area */}
      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Brand Description Column (4 cols) */}
        <div className="flex flex-col gap-5 lg:col-span-4 text-left">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full bg-pd-cream-50 flex items-center justify-center border border-pd-cream-200">
              <Image
                src="/assets/premium-daab/logo.webp"
                alt="Premium Dab Logo"
                width={36}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-pd-cream-50 leading-none">
              Premium Dab
            </span>
          </Link>
          <p className="text-base leading-relaxed text-pd-cream-100/60 max-w-sm font-sans">
            A clean, fresh, and hygienically served natural coconut experience for modern Bangladesh.
          </p>
        </div>

        {/* Shop Column (2 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-2 text-left">
          <h4 className="text-sm font-bold tracking-widest uppercase text-pd-gold-500 font-sans">
            Shop Flow
          </h4>
          <nav className="flex flex-col gap-3">
            <Link href="/" className="text-base hover:text-pd-cream-50 transition duration-150">
              Home
            </Link>
            <Link href="/product" className="text-base hover:text-pd-cream-50 transition duration-150">
              Product
            </Link>
            <Link href="/availability" className="text-base hover:text-pd-cream-50 transition duration-150">
              Check Availability
            </Link>
            <Link href="/order" className="text-base hover:text-pd-cream-50 transition duration-150">
              Place Order
            </Link>
          </nav>
        </div>

        {/* Company Column (2 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-2 text-left">
          <h4 className="text-sm font-bold tracking-widest uppercase text-pd-gold-500 font-sans">
            Company
          </h4>
          <nav className="flex flex-col gap-3">
            <Link href="/our-story" className="text-base hover:text-pd-cream-50 transition duration-150">
              Our Story
            </Link>
            <Link href="/events" className="text-base hover:text-pd-cream-50 transition duration-150">
              Events & Bulk Orders
            </Link>
            <Link href="/faq" className="text-base hover:text-pd-cream-50 transition duration-150">
              FAQ
            </Link>
            <Link href="/contact" className="text-base hover:text-pd-cream-50 transition duration-150">
              Contact
            </Link>
          </nav>
        </div>

        {/* Contact/Support Column (4 cols) */}
        <div className="flex flex-col gap-4 lg:col-span-4 text-left">
          <h4 className="text-sm font-bold tracking-widest uppercase text-pd-gold-500 font-sans">
            Get in Touch
          </h4>
          <div className="flex flex-col gap-3.5 text-base font-sans">
            <p className="flex items-center gap-2">
              <span className="text-pd-cream-100/40">Phone / WA:</span>
              <a
                href="https://wa.me/8801410120299"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pd-cream-50 transition font-semibold"
              >
                01410120299
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-pd-cream-100/40">Email:</span>
              <a
                href="mailto:Premiumdaab@gmail.com"
                className="hover:text-pd-cream-50 transition font-medium"
              >
                Premiumdaab@gmail.com
              </a>
            </p>
            <p className="text-sm text-pd-cream-100/40 leading-relaxed mt-2 border-t border-pd-green-900 pt-3">
              Service area: Bashundhara Residential Area, Dhaka, Bangladesh.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Proof Strip */}
      <div className="border-t border-pd-green-900 bg-pd-green-950/40 py-10 px-6 sm:px-12 text-center">
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-serif text-base font-semibold tracking-wider text-pd-gold-500">
            100% Natural · Premium Quality · Product of Bangladesh
          </div>
          <div className="text-sm text-pd-cream-100/30 font-sans">
            &copy; {new Date().getFullYear()} Premium Dab. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
