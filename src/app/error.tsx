"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for diagnostics
    console.error("Unhandled client error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-pd-cream-50 flex items-center justify-center p-6 font-sans antialiased select-none">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(198,154,61,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg bg-white border border-pd-border/80 p-8 sm:p-12 rounded-[32px] shadow-md flex flex-col gap-6 text-center">
        {/* Brand Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-14 h-10 flex items-center justify-center">
            <Image
              src="/assets/premium-daab/logo.webp"
              alt="Premium Daab Logo"
              width={60}
              height={40}
              className="object-contain"
            />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-pd-gold-600 font-sans mt-0.5">
            System Alert
          </span>
        </div>

        {/* Narrative Headline */}
        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-pd-green-900 leading-tight">
            An Error Occurred
          </h1>
          <p className="text-sm text-pd-muted leading-relaxed max-w-sm mx-auto">
            An unexpected error occurred during rendering. We apologize for the inconvenience. Let's try recovering your session.
          </p>
          
          {error && (
            <div className="mt-2 p-3 bg-red-50/50 border border-red-100 rounded-xl text-left">
              <p className="text-xs font-mono text-red-700 break-words">
                <span className="font-semibold">Error Message:</span> {error.message || "Unknown error"}
              </p>
              {error.digest && (
                <p className="text-[10px] font-mono text-red-500 mt-1">
                  <span className="font-semibold">Digest:</span> {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-pd-gold-500/30 to-transparent rounded-full" />

        {/* Action Options */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            onClick={() => reset()}
            className="h-12 px-6 bg-pd-green-900 hover:bg-pd-green-800 text-white font-semibold rounded-xl flex items-center justify-center text-sm shadow-sm transition border-0 cursor-pointer"
          >
            Retry Session
          </button>
          <Link
            href="/"
            className="h-12 px-6 border border-pd-border bg-white text-pd-green-950 hover:bg-pd-cream-50 font-semibold rounded-xl flex items-center justify-center text-sm transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
