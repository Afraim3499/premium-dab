"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import { orderSchema } from "@/lib/validation/order";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

function OrderFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Quantity query parameter hydration
  const qStr = searchParams.get("quantity");
  const parsedQty = qStr ? parseInt(qStr, 10) : 1;
  const initialQty = isNaN(parsedQty) ? 1 : Math.max(1, Math.min(parsedQty, 50));

  const [quantity, setQuantity] = useState(initialQty);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [city] = useState("Dhaka");
  const [area, setArea] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  const [activeAreas, setActiveAreas] = useState<any[]>([]);
  const [isLoadingAreas, setIsLoadingAreas] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  
  // Checkout Redirect States
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    orderNumber: string;
    total: number;
    whatsappRedirectUrl: string;
  } | null>(null);

  // Fetch active service areas on mount
  useEffect(() => {
    async function fetchAreas() {
      try {
        const { data, error } = await supabase
          .from("service_areas")
          .select("*")
          .eq("is_available", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          setActiveAreas(data);
          setArea(data[0].area);
        }
      } catch (err) {
        console.error("Error fetching service areas:", err);
      } finally {
        setIsLoadingAreas(false);
      }
    }
    fetchAreas();
  }, []);

  // Update quantity state if query parameter changes
  useEffect(() => {
    setQuantity(initialQty);
  }, [initialQty]);

  // Pricing calculations
  const unitPrice = 120;
  const subtotal = quantity * unitPrice;
  const selectedAreaObj = activeAreas.find((a) => a.area === area);
  const deliveryCharge = selectedAreaObj ? selectedAreaObj.delivery_charge_bdt : 0;
  const total = subtotal + deliveryCharge;

  // Auto-redirect effect when order is created successfully
  useEffect(() => {
    if (isSuccess && orderDetails?.whatsappRedirectUrl) {
      const timer = setTimeout(() => {
        window.location.href = orderDetails.whatsappRedirectUrl;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, orderDetails]);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitError("");

    const orderData = {
      customerName,
      customerPhone,
      city,
      area,
      fullAddress,
      quantity,
      deliveryNote: deliveryNote || "",
    };

    // Client-side Zod validation
    const validation = orderSchema.safeParse(orderData);

    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
      setIsSubmitting(false);
      
      // Scroll to the first error input
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstErrorKey)[0];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      const response = await fetch("/api/orders/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOrderDetails({
          orderNumber: data.orderNumber,
          total: data.total,
          whatsappRedirectUrl: data.whatsappRedirectUrl,
        });
        setIsSuccess(true);
      } else {
        setSubmitError(data.error || "Something went wrong. Please check your inputs and try again.");
      }
    } catch (err) {
      console.error("Checkout order error:", err);
      setSubmitError("Network connection error. Please verify you are connected and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 bg-pd-cream-50 font-sans antialiased pb-24">
      {/* Editorial Header */}
      <div className="bg-[#FAF5EB] border-b border-pd-border/40 py-8 lg:py-12">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-12 text-left">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-pd-gold-600">
              Checkout Panel
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif text-pd-green-900 leading-tight">
              Place your Order
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-12 mt-12 lg:mt-16">
        {isSuccess && orderDetails ? (
          /* Handoff Success Screen */
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-pd-border/80 p-8 sm:p-12 shadow-md text-center animate-fadeIn">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 border-2 border-emerald-300">
                <svg className="w-12 h-12 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-serif text-pd-green-900">Order Prepared!</h2>
                <p className="text-sm text-pd-muted leading-relaxed max-w-sm mx-auto">
                  We are now redirecting you to WhatsApp to confirm your delivery and complete the purchase.
                </p>
              </div>

              {/* Loader Bar */}
              <div className="w-full h-1 bg-pd-cream-100 rounded-full overflow-hidden relative">
                <div className="h-full bg-pd-green-900 rounded-full absolute left-0 top-0 w-full animate-[loading-bar_2s_linear_infinite]" />
              </div>

              {/* Order Info Card */}
              <div className="w-full bg-[#FAF5EB]/50 rounded-2xl border border-pd-border/60 p-6 flex flex-col gap-3.5 text-left text-sm mt-2">
                <div className="flex justify-between items-center border-b border-pd-border/40 pb-3">
                  <span className="font-semibold text-pd-green-800">Order Number</span>
                  <span className="font-mono font-bold text-pd-green-950">{orderDetails.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pd-muted">Customer Name</span>
                  <span className="font-medium text-pd-green-950">{customerName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pd-muted">Destination Area</span>
                  <span className="font-medium text-pd-green-950">{area}, Dhaka</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-pd-muted">Total Quantity</span>
                  <span className="font-bold text-pd-green-950">{quantity} units</span>
                </div>
                <div className="flex justify-between items-center border-t border-pd-border/40 pt-3">
                  <span className="font-bold text-pd-green-900">Total Invoice</span>
                  <span className="text-lg font-bold text-pd-green-950">৳{orderDetails.total}</span>
                </div>
              </div>

              {/* Manual Button */}
              <div className="w-full flex flex-col gap-3 mt-4">
                <a href={orderDetails.whatsappRedirectUrl} className="w-full">
                  <Button variant="whatsapp" className="w-full h-14 text-base font-bold shadow-md hover:-translate-y-0.5">
                    Confirm Order via WhatsApp
                  </Button>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setOrderDetails(null);
                  }}
                  className="text-sm font-semibold text-pd-muted hover:text-pd-green-900 transition"
                >
                  Edit Order Details
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Primary Checkout Form Grid */
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
            
            {/* Left: Customer & Address Details (Col 1-7) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-pd-border/80 p-8 sm:p-10 shadow-md flex flex-col gap-6">
              <h2 className="font-serif text-2xl font-bold text-pd-green-900 border-b border-pd-border/40 pb-4">
                Delivery Details
              </h2>

              {submitError && (
                <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm font-medium">
                  {submitError}
                </div>
              )}

              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <Input
                  label="Customer Name"
                  name="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                  error={errors.customerName}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1">
                <Input
                  label="Contact Phone"
                  name="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 01712345678"
                  disabled={isSubmitting}
                  error={errors.customerPhone}
                  required
                />
              </div>

              {/* Location Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* City */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-sm font-medium text-pd-text select-none">
                    City
                  </label>
                  <select
                    value={city}
                    disabled
                    className="flex h-12 w-full rounded-xl border border-pd-border bg-pd-cream-50/50 px-4 text-base font-medium outline-none opacity-80 cursor-not-allowed select-none"
                  >
                    <option value="Dhaka">Dhaka</option>
                  </select>
                </div>

                {/* Area Selector */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-sm font-medium text-pd-text select-none">
                    Delivery Area
                  </label>
                  {isLoadingAreas ? (
                    <div className="flex h-12 w-full items-center justify-center rounded-xl border border-pd-border bg-pd-cream-50/30 text-sm text-pd-muted">
                      Loading service areas...
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        name="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        disabled={isSubmitting}
                        className="flex h-12 w-full rounded-xl border border-pd-border bg-white px-4 text-base font-medium outline-none transition duration-200 focus:border-pd-green-700 focus:ring-1 focus:ring-pd-green-700 disabled:opacity-50 appearance-none cursor-pointer"
                      >
                        {activeAreas.map((item) => (
                          <option key={item.id} value={item.area}>
                            {item.area}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-pd-green-800">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {errors.area && (
                    <span className="text-xs text-red-500 font-sans mt-0.5">{errors.area}</span>
                  )}
                  <div className="text-xs text-pd-muted mt-1">
                    Only active areas are shown.{" "}
                    <span 
                      onClick={() => router.push("/availability")}
                      className="text-pd-green-900 font-bold hover:underline cursor-pointer"
                    >
                      Check other coverage zones
                    </span>.
                  </div>
                </div>
              </div>

              {/* Full Address */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-sm font-medium text-pd-text select-none">
                  Delivery Address
                </label>
                <textarea
                  name="fullAddress"
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="Apartment, House, Building, Road details"
                  disabled={isSubmitting}
                  className={`flex min-h-[96px] w-full rounded-xl border border-pd-border bg-white p-4 text-base transition-all duration-200 outline-none placeholder:text-pd-muted/60 focus:border-pd-green-700 focus:ring-1 focus:ring-pd-green-700 disabled:opacity-50 ${
                    errors.fullAddress ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                  required
                />
                {errors.fullAddress ? (
                  <span className="text-xs text-red-500 font-sans mt-0.5">{errors.fullAddress}</span>
                ) : (
                  <span className="text-xs text-pd-muted">Min 10 characters detailing road/house code.</span>
                )}
              </div>

              {/* Delivery Note */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-sm font-medium text-pd-text select-none">
                  Delivery Note (Optional)
                </label>
                <textarea
                  name="deliveryNote"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="Gate code, drop-off details, or timing preferences..."
                  disabled={isSubmitting}
                  className={`flex min-h-[72px] w-full rounded-xl border border-pd-border bg-white p-4 text-base transition-all duration-200 outline-none placeholder:text-pd-muted/60 focus:border-pd-green-700 focus:ring-1 focus:ring-pd-green-700 disabled:opacity-50 ${
                    errors.deliveryNote ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {errors.deliveryNote && (
                  <span className="text-xs text-red-500 font-sans mt-0.5">{errors.deliveryNote}</span>
                )}
              </div>
            </div>

            {/* Right: Cart Summary & Invoice Calculations (Col 8-12) */}
            <div className="lg:col-span-5 flex flex-col gap-6 w-full">
              
              {/* Product Cart Card */}
              <div className="bg-white rounded-3xl border border-pd-border/80 p-6 shadow-md">
                <h3 className="font-serif text-lg font-bold text-pd-green-950 border-b border-pd-border/40 pb-3 mb-4">
                  Cart Items
                </h3>

                <div className="flex gap-4 items-center">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-2xl bg-pd-cream-50 border border-pd-border/60 overflow-hidden flex items-center justify-center p-2">
                    <Image
                      src="/assets/premium-daab/product-cutout.webp"
                      alt="Premium Daab Cutout"
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>

                  {/* Info and Quantity */}
                  <div className="flex-1 flex flex-col text-left">
                    <span className="font-serif font-bold text-pd-green-900 text-lg leading-snug">
                      Premium Daab
                    </span>
                    <span className="text-xs text-pd-muted font-sans font-medium uppercase tracking-wide mt-0.5">
                      Young Coconut
                    </span>
                    
                    <div className="flex items-center justify-between mt-3">
                      {/* Qty Adjustment Selector */}
                      <div className="flex items-center border border-pd-border bg-pd-cream-50/50 rounded-xl h-10 px-1.5">
                        <button
                          type="button"
                          onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                          disabled={quantity <= 1 || isSubmitting}
                          className="w-7 h-7 flex items-center justify-center text-base font-bold rounded-lg hover:bg-pd-cream-100/50 disabled:opacity-30 transition text-pd-green-900"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-pd-green-950">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity((prev) => Math.min(prev + 1, 50))}
                          disabled={quantity >= 50 || isSubmitting}
                          className="w-7 h-7 flex items-center justify-center text-base font-bold rounded-lg hover:bg-pd-cream-100/50 disabled:opacity-30 transition text-pd-green-900"
                        >
                          +
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <span className="font-sans font-bold text-pd-green-950 text-base">
                        ৳{quantity * unitPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice breakdown calculations card */}
              <div className="bg-white rounded-3xl border border-pd-border/80 p-6 shadow-md text-left flex flex-col gap-4">
                <h3 className="font-serif text-lg font-bold text-pd-green-950 border-b border-pd-border/40 pb-3">
                  Summary
                </h3>

                <div className="flex flex-col gap-3 font-sans text-sm">
                  <div className="flex justify-between text-pd-muted">
                    <span>Subtotal ({quantity} units)</span>
                    <span className="font-medium text-pd-green-950">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-pd-muted border-b border-pd-border/40 pb-3">
                    <span>Delivery Charge ({area || "Bashundhara R/A"})</span>
                    <span className="font-medium text-pd-green-950">
                      {isLoadingAreas ? "Loading..." : `৳${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="font-bold text-pd-green-900 text-base">Total Order</span>
                    <span className="text-2xl font-bold text-pd-green-950">৳{total}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    className="w-full h-14 text-base font-bold shadow-md bg-pd-green-900 hover:bg-pd-green-800 border-0"
                  >
                    Confirm & Redirect to WhatsApp
                  </Button>
                  <span className="text-[10px] text-pd-muted leading-relaxed text-center font-sans">
                    By submitting, your order will be reserved in our inventory database and redirected to WhatsApp for manual delivery validation.
                  </span>
                </div>
              </div>

            </div>

          </form>
        )}
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 bg-pd-cream-50 flex items-center justify-center font-sans py-24">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-4 border-pd-green-900/10 border-t-pd-green-900 animate-spin" />
          <span className="text-sm font-semibold text-pd-muted">Hydrating shopping cart...</span>
        </div>
      </div>
    }>
      <OrderFormContent />
    </Suspense>
  );
}
