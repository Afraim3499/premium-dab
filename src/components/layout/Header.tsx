"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MobileNav from "./MobileNav";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
    { name: "Availability", href: "/availability" },
    { name: "Events", href: "/events" },
    { name: "Our Story", href: "/our-story" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-pd-border/40 bg-[#FAF5EB]/85 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex h-[88px] max-w-[1280px] items-center justify-between px-6 sm:px-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 transition hover:opacity-90">
            <div className="relative w-[84px] h-[56px] flex items-center justify-center">
              <Image
                src="/assets/premium-daab/logo.webp"
                alt="Premium Daab Logo"
                width={84}
                height={56}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-pd-green-900 leading-none">
              Premium Daab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium transition-colors duration-200 hover:text-pd-green-900 ${
                    isActive ? "text-pd-green-900 font-semibold" : "text-pd-muted"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Primary CTA Action Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/availability"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-pd-green-900 px-5 text-sm font-medium text-pd-cream-50 transition hover:bg-pd-green-800 focus:outline-none focus:ring-2 focus:ring-pd-green-700"
            >
              Check Availability
            </Link>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-pd-border text-pd-green-900 transition hover:bg-pd-cream-100 lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Panel */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        links={navLinks}
        pathname={pathname}
      />
    </>
  );
};

export default Header;
