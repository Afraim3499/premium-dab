import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-pd-cream-50 flex items-center justify-center p-6 font-sans antialiased select-none">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(198,154,61,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg bg-white border border-pd-border/80 p-8 sm:p-12 rounded-[32px] shadow-md flex flex-col gap-6 text-center">
        {/* Brand Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-[84px] h-[56px] flex items-center justify-center">
            <Image
              src="/assets/premium-daab/logo.webp"
              alt="Premium Daab Logo"
              width={84}
              height={56}
              className="object-contain"
            />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-pd-gold-600 font-sans mt-0.5">
            Error 404
          </span>
        </div>

        {/* Narrative Headline */}
        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-pd-green-900 leading-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-pd-muted leading-relaxed max-w-sm mx-auto">
            The page you are looking for does not exist or has been relocated to another serving category.
          </p>
        </div>

        {/* Divider */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-pd-gold-500/30 to-transparent rounded-full" />

        {/* Action Options */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <Link
            href="/"
            className="h-12 px-6 bg-pd-green-900 hover:bg-pd-green-800 text-white font-semibold rounded-xl flex items-center justify-center text-sm shadow-sm transition border-0"
          >
            Return to Homepage
          </Link>
          <Link
            href="/product"
            className="h-12 px-6 border border-pd-border bg-white text-pd-green-950 hover:bg-pd-cream-50 font-semibold rounded-xl flex items-center justify-center text-sm transition"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
