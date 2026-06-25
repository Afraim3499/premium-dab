"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "../ui/Button";

interface AvailabilityResponse {
  available: boolean;
  deliveryChargeBdt?: number;
  estimatedDeliveryText?: string;
  message?: string;
}

export const AvailabilityChecker: React.FC = () => {
  const [city, setCity] = useState("Dhaka");
  const [area, setArea] = useState("Bashundhara R/A");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AvailabilityResponse | null>(null);

  const areas = ["Bashundhara R/A", "Gulshan", "Banani", "Dhanmondi", "Uttara"];

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, area }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setResult({
          available: false,
          message: "Something went wrong. Please try checking again.",
        });
      }
    } catch (err) {
      console.error("Check availability error:", err);
      setResult({
        available: false,
        message: "Network error. Please verify your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-3xl border border-pd-border/80 p-8 shadow-md">
      <h3 className="font-serif text-2xl font-bold text-pd-green-900 mb-2 text-center">
        Select Delivery Area
      </h3>
      <p className="text-sm text-pd-muted text-center mb-8 font-sans leading-relaxed">
        Actively delivering to Bashundhara Residential Area. Expanding to Gulshan, Banani, Dhanmondi, and Uttara soon. Select your area below to verify.
      </p>

      <form onSubmit={handleCheck} className="flex flex-col gap-5">
        {/* City Select */}
        <div className="flex flex-col gap-2 text-left">
          <label className="text-sm font-semibold tracking-wide uppercase text-pd-green-800 select-none">
            City
          </label>
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={isLoading}
              className="flex h-14 w-full rounded-xl border-2 border-pd-border bg-white px-4 text-base font-medium outline-none transition duration-200 focus:border-pd-green-700 focus:ring-1 focus:ring-pd-green-700 disabled:opacity-50 appearance-none cursor-pointer"
            >
              <option value="Dhaka">Dhaka</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-pd-green-800">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Area Select */}
        <div className="flex flex-col gap-2 text-left">
          <label className="text-sm font-semibold tracking-wide uppercase text-pd-green-800 select-none">
            Area
          </label>
          <div className="relative">
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              disabled={isLoading}
              className="flex h-14 w-full rounded-xl border-2 border-pd-border bg-white px-4 text-base font-medium outline-none transition duration-200 focus:border-pd-green-700 focus:ring-1 focus:ring-pd-green-700 disabled:opacity-50 appearance-none cursor-pointer"
            >
              {areas.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-pd-green-800">
              <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Check Button */}
        <Button type="submit" isLoading={isLoading} className="w-full h-14 text-lg font-semibold shadow-sm mt-3">
          Check Delivery Status
        </Button>
      </form>

      {/* Result Panel */}
      {result && (
        <div className="mt-8 pt-8 border-t-2 border-pd-cream-100 transition-all duration-300">
          {result.available ? (
            <div className="flex flex-col items-center text-center gap-5 p-8 rounded-3xl border border-emerald-200 bg-emerald-50/30 text-emerald-950 shadow-md animate-fadeIn">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border-2 border-emerald-300">
                <svg
                  className="w-9 h-9"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h4 className="font-sans font-bold text-emerald-900 text-2xl tracking-tight">
                Available in {area}
              </h4>
              <p className="text-base text-emerald-800/80 leading-relaxed font-sans max-w-sm">
                Fresh delivery is available in your area. Continue to order.
              </p>
              
              <div className="w-full bg-white rounded-2xl p-5 grid grid-cols-2 gap-4 text-sm border border-emerald-100 mt-2 shadow-sm">
                <div className="border-r border-emerald-100">
                  <span className="block text-emerald-800/60 uppercase font-semibold tracking-wider font-sans mb-1 text-xs">Delivery Fee</span>
                  <span className="font-sans font-bold text-emerald-900 text-lg">
                    ৳{result.deliveryChargeBdt}
                  </span>
                </div>
                <div>
                  <span className="block text-emerald-800/60 uppercase font-semibold tracking-wider font-sans mb-1 text-xs">Delivery Speed</span>
                  <span className="font-sans font-bold text-emerald-900 text-lg">
                    {result.estimatedDeliveryText}
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-3 mt-2">
                <Link href="/order" className="w-full">
                  <Button variant="primary" className="w-full h-14 text-base font-bold shadow-md bg-pd-green-900 hover:bg-pd-green-800 border-0">
                    Order Now
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="w-full h-12 text-sm font-semibold text-pd-muted hover:text-pd-green-900 transition-colors"
                >
                  Change Area
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-5 p-8 rounded-3xl border border-amber-200 bg-amber-50/30 text-amber-950 shadow-md animate-fadeIn">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 border-2 border-amber-300">
                <svg
                  className="w-9 h-9"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h4 className="font-sans font-bold text-amber-900 text-2xl tracking-tight">
                Coming soon to your area
              </h4>
              <p className="text-base text-amber-800/80 leading-relaxed font-sans max-w-sm">
                Join the waitlist and we will notify you when Premium Dab reaches your location.
              </p>
              <div className="w-full flex flex-col gap-3 mt-2">
                <Link
                  href={`/availability?city=${city}&area=${area}`}
                  className="w-full"
                >
                  <Button variant="secondary" className="w-full h-14 text-base font-bold border-amber-300 text-amber-900 hover:bg-amber-100/50">
                    Join Waitlist
                  </Button>
                </Link>
                <button
                  type="button"
                  onClick={() => setResult(null)}
                  className="w-full h-12 text-sm font-semibold text-pd-muted hover:text-pd-green-900 transition-colors"
                >
                  Change Area
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilityChecker;
