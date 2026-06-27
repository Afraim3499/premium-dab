"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AvailabilityChecker from "@/components/availability/AvailabilityChecker";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function AvailabilityContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const cityParam = searchParams.get("city");
  const areaParam = searchParams.get("area");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // If city/area are provided, and they match our check, show waitlist form
  const showWaitlistForm = cityParam && areaParam;

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          city: cityParam,
          area: areaParam,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.error || "Failed to join the waitlist. Please try again.");
      }
    } catch (err) {
      console.error("Waitlist submit error:", err);
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-pd-cream-50 font-sans antialiased pb-24">
      {/* Editorial Header */}
      <div className="bg-[#FAF5EB] border-b border-pd-border/40 py-8 lg:py-12">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
              Coverage Network
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-pd-green-900 leading-tight">
              {showWaitlistForm ? "Join the Waitlist" : "Check Delivery Coverage"}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 mt-12 lg:mt-16 flex flex-col items-center">
        {!showWaitlistForm ? (
          /* Standard Checker Hub */
          <div className="w-full max-w-2xl flex flex-col gap-8 animate-fadeIn">
            <div className="text-center max-w-md mx-auto mb-2">
              <p className="text-base text-pd-muted leading-relaxed">
                Premium Daab delivers fresh young coconuts directly to homes, offices, and gyms. We are actively serving the entire <strong>Bashundhara Residential Area</strong>, with expansion to other areas in Dhaka coming soon. Select your location below to check active delivery coverage in your sector or block.
              </p>
            </div>
            <AvailabilityChecker />
          </div>
        ) : (
          /* Waitlist Submission Panel */
          <div className="w-full max-w-lg bg-white rounded-3xl border border-pd-border/80 p-8 sm:p-10 shadow-md animate-fadeIn text-left">
            {isSuccess ? (
              /* Success Panel */
              <div className="flex flex-col items-center text-center gap-6 py-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border-2 border-emerald-300">
                  <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans font-bold text-pd-green-950 text-2xl">You&apos;re on the list!</h3>
                  <p className="text-sm text-pd-muted leading-relaxed max-w-sm">
                    Thank you, <span className="font-bold text-pd-green-900">{name || "there"}</span>. We have registered your interest for <span className="font-bold text-pd-green-900">{areaParam}, {cityParam}</span>. We will text you at <span className="font-medium text-pd-green-900">{phone}</span> as soon as delivery launches in your zone!
                  </p>
                </div>
                
                <Button 
                  onClick={() => {
                    setIsSuccess(false);
                    setName("");
                    setPhone("");
                    router.push("/availability");
                  }} 
                  className="w-full h-12 text-sm font-semibold mt-4 shadow-sm"
                >
                  Check Another Location
                </Button>
              </div>
            ) : (
              /* Waitlist Form */
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-2xl font-bold text-pd-green-900">
                    We&apos;re not there yet!
                  </h3>
                  <p className="text-sm text-pd-muted leading-relaxed">
                    Premium Daab does not serve <span className="font-semibold text-pd-green-900">{areaParam}, {cityParam}</span> yet. Register your details below to join the launch waitlist.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold tracking-wide uppercase text-pd-green-800 select-none">
                    Your Name
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold tracking-wide uppercase text-pd-green-800 select-none">
                    Mobile Number
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 01712345678"
                    disabled={isLoading}
                    required
                  />
                </div>

                {/* Predefined City & Area */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold tracking-wide uppercase text-pd-muted select-none">
                      City
                    </label>
                    <div className="h-12 w-full rounded-xl border border-pd-border bg-pd-cream-50/50 flex items-center px-4 text-sm font-medium text-pd-green-900/60 select-none">
                      {cityParam}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold tracking-wide uppercase text-pd-muted select-none">
                      Area
                    </label>
                    <div className="h-12 w-full rounded-xl border border-pd-border bg-pd-cream-50/50 flex items-center px-4 text-sm font-medium text-pd-green-900/60 select-none overflow-hidden text-ellipsis whitespace-nowrap">
                      {areaParam}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full h-14 text-base font-bold bg-pd-green-900 hover:bg-pd-green-800 border-0"
                  >
                    Join Waitlist
                  </Button>
                  <button
                    type="button"
                    onClick={() => router.push("/availability")}
                    disabled={isLoading}
                    className="w-full h-11 text-sm font-semibold text-pd-muted hover:text-pd-green-900 transition-colors"
                  >
                    Go Back to Checker
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StandaloneAvailabilityPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 bg-pd-cream-50 flex items-center justify-center font-sans py-24">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-pd-green-900/10 border-t-pd-green-900 animate-spin" />
          <span className="text-sm font-semibold text-pd-muted">Loading network config...</span>
        </div>
      </div>
    }>
      <AvailabilityContent />
    </Suspense>
  );
}
