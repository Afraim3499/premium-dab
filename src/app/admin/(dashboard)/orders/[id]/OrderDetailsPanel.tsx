"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface OrderDetailsPanelProps {
  order: {
    id: string;
    orderNumber: string;
    customerName: string;
    customerPhone: string;
    city: string;
    area: string;
    fullAddress: string;
    deliveryNote: string | null;
    quantity: number;
    unitPriceBdt: number;
    subtotalBdt: number;
    deliveryChargeBdt: number;
    totalBdt: number;
    status: string;
    whatsappMessage: string;
    whatsappRedirectUrl: string;
    adminNote: string;
    confirmedAt: string | null;
    cancelledAt: string | null;
    deliveredAt: string | null;
    createdAt: string;
    productName: string;
  };
}

export const OrderDetailsPanel: React.FC<OrderDetailsPanelProps> = ({ order }) => {
  const router = useRouter();

  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [adminNote, setAdminNote] = useState(order.adminNote);
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [isShiftingStatus, setIsShiftingStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const statusBadges: Record<string, string> = {
    whatsapp_redirected: "bg-blue-50 text-blue-700 border-blue-200",
    contacted: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-red-50 text-red-700 border-red-200",
    delivered: "bg-gray-50 text-gray-700 border-gray-200",
  };

  const statusLabels: Record<string, string> = {
    whatsapp_redirected: "Redirected",
    contacted: "Contacted",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    delivered: "Delivered",
  };

  const handleSaveNote = async () => {
    setIsSubmittingNote(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch(`/api/admin/orders/${order.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminNote }),
      });

      if (response.ok) {
        setSuccessMsg("Internal admin notes updated successfully.");
        router.refresh();
      } else {
        const data = await response.json();
        setErrorMsg(data.error || "Failed to update internal notes.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Failed to save notes.");
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleStatusTransition = async (targetStatus: string) => {
    if (!confirm(`Are you sure you want to change status to ${statusLabels[targetStatus]}?`)) {
      return;
    }

    setIsShiftingStatus(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch(`/api/admin/orders/${order.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        setCurrentStatus(targetStatus);
        setSuccessMsg(`Status updated to ${statusLabels[targetStatus]}.`);
        router.refresh();
      } else {
        setErrorMsg(data.error || "Failed to transition order status.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Failed to update status.");
    } finally {
      setIsShiftingStatus(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Notifications bar */}
      {(errorMsg || successMsg) && (
        <div className="lg:col-span-12">
          {errorMsg && (
            <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm font-medium">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-medium">
              {successMsg}
            </div>
          )}
        </div>
      )}

      {/* Left panel: Order Details (Col 1-8) */}
      <div className="lg:col-span-8 flex flex-col gap-6 w-full">
        {/* Top summary card */}
        <div className="bg-white border border-pd-border/60 rounded-3xl p-6 sm:p-8 shadow-sm text-left flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pd-border/40 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-pd-muted block">
                Invoice Code
              </span>
              <h2 className="font-mono text-xl sm:text-2xl font-bold text-pd-green-950">
                {order.orderNumber}
              </h2>
            </div>
            <div className="flex flex-col sm:items-end">
              <span className="text-[10px] uppercase font-bold tracking-wider text-pd-muted block sm:text-right">
                Current Status
              </span>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold border mt-1 ${
                statusBadges[currentStatus] || "bg-gray-100 border-gray-300 text-gray-800"
              }`}>
                {statusLabels[currentStatus] || currentStatus}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm mt-2">
            <div>
              <span className="block text-xs text-pd-muted uppercase font-semibold">Date Ordered</span>
              <span className="font-medium text-pd-green-950 mt-1 block">
                {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div>
              <span className="block text-xs text-pd-muted uppercase font-semibold">Time Ordered</span>
              <span className="font-medium text-pd-green-950 mt-1 block">
                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div>
              <span className="block text-xs text-pd-muted uppercase font-semibold">Confirmed At</span>
              <span className="font-medium text-pd-green-950 mt-1 block">
                {order.confirmedAt ? new Date(order.confirmedAt).toLocaleDateString() : "—"}
              </span>
            </div>
            <div>
              <span className="block text-xs text-pd-muted uppercase font-semibold">Delivered At</span>
              <span className="font-medium text-pd-green-950 mt-1 block">
                {order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Customer & Address profile */}
        <div className="bg-white border border-pd-border/60 rounded-3xl p-6 sm:p-8 shadow-sm text-left flex flex-col gap-5">
          <h3 className="font-serif text-lg font-bold text-pd-green-950 border-b border-pd-border/40 pb-3">
            Customer Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-xs text-pd-muted font-semibold block">Full Name</span>
              <span className="font-bold text-pd-green-950 mt-1 block text-base">{order.customerName}</span>
            </div>
            <div>
              <span className="text-xs text-pd-muted font-semibold block">Mobile Number</span>
              <span className="font-bold text-pd-green-950 mt-1 block text-base">{order.customerPhone}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-xs text-pd-muted font-semibold block">Delivery Address</span>
              <span className="font-medium text-pd-green-950 mt-1 block text-base bg-[#FAF5EB]/40 p-4 border border-pd-border/40 rounded-xl leading-relaxed">
                {order.fullAddress}, {order.area}, {order.city}
              </span>
            </div>
            {order.deliveryNote && (
              <div className="sm:col-span-2">
                <span className="text-xs text-pd-muted font-semibold block">Delivery Note</span>
                <span className="font-sans font-medium text-amber-900 mt-1 block bg-amber-50/20 border border-amber-200/50 p-4 rounded-xl">
                  {order.deliveryNote}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="bg-white border border-pd-border/60 rounded-3xl p-6 sm:p-8 shadow-sm text-left flex flex-col gap-4">
          <h3 className="font-serif text-lg font-bold text-pd-green-950 border-b border-pd-border/40 pb-3">
            Invoice Summary
          </h3>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-pd-border/40 text-xs font-semibold text-pd-muted uppercase">
                  <th className="py-3 text-left">Item</th>
                  <th className="py-3 text-center">Quantity</th>
                  <th className="py-3 text-right">Unit Price</th>
                  <th className="py-3 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pd-border/20">
                <tr>
                  <td className="py-4 font-bold text-pd-green-950">{order.productName}</td>
                  <td className="py-4 text-center font-semibold text-pd-green-950">{order.quantity}</td>
                  <td className="py-4 text-right font-medium text-pd-green-950">৳{order.unitPriceBdt}</td>
                  <td className="py-4 text-right font-bold text-pd-green-950">৳{order.subtotalBdt}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border-t border-pd-border/40 pt-4 flex flex-col gap-3 font-sans text-sm max-w-xs ml-auto w-full">
            <div className="flex justify-between text-pd-muted">
              <span>Subtotal</span>
              <span className="font-medium text-pd-green-950">৳{order.subtotalBdt}</span>
            </div>
            <div className="flex justify-between text-pd-muted border-b border-pd-border/40 pb-2">
              <span>Delivery Charge</span>
              <span className="font-medium text-pd-green-950">৳{order.deliveryChargeBdt}</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-bold text-pd-green-900">Total Invoice</span>
              <span className="text-xl font-bold text-pd-green-950">৳{order.totalBdt}</span>
            </div>
          </div>
        </div>

        {/* Raw WhatsApp Message */}
        <div className="bg-white border border-pd-border/60 rounded-3xl p-6 sm:p-8 shadow-sm text-left flex flex-col gap-4">
          <h3 className="font-serif text-lg font-bold text-pd-green-950 border-b border-pd-border/40 pb-3">
            WhatsApp Dispatch Message
          </h3>
          <pre className="font-mono text-xs p-4 rounded-xl bg-pd-cream-50/50 border border-pd-border/40 overflow-x-auto text-pd-green-950 leading-relaxed whitespace-pre-wrap">
            {order.whatsappMessage}
          </pre>
          <a
            href={order.whatsappRedirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit"
          >
            <Button variant="whatsapp" className="h-10 text-xs font-bold px-4">
              Open WhatsApp Chat manually
            </Button>
          </a>
        </div>
      </div>

      {/* Right panel: Actions & Admin Operations (Col 9-12) */}
      <div className="lg:col-span-4 flex flex-col gap-6 w-full">
        {/* Status transitions control */}
        <div className="bg-white border border-pd-border/60 rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-left">
          <h3 className="font-serif text-lg font-bold text-pd-green-950 border-b border-pd-border/40 pb-3">
            Order Status Controls
          </h3>

          <div className="flex flex-col gap-3.5 mt-2">
            {/* Transition: Redirected/Contacted -> Contacted */}
            {(currentStatus === "whatsapp_redirected") && (
              <Button
                variant="secondary"
                isLoading={isShiftingStatus}
                onClick={() => handleStatusTransition("contacted")}
                className="w-full h-11 text-xs font-bold shadow-sm"
              >
                Mark as Contacted
              </Button>
            )}

            {/* Transition: Redirected/Contacted/Cancelled -> Confirmed */}
            {(currentStatus === "whatsapp_redirected" || currentStatus === "contacted" || currentStatus === "cancelled") && (
              <Button
                variant="primary"
                isLoading={isShiftingStatus}
                onClick={() => handleStatusTransition("confirmed")}
                className="w-full h-11 text-xs font-bold shadow-sm bg-pd-green-900 border-0 text-white"
              >
                Confirm Order & Reserve Inventory
              </Button>
            )}

            {/* Transition: Confirmed -> Delivered */}
            {currentStatus === "confirmed" && (
              <Button
                variant="primary"
                isLoading={isShiftingStatus}
                onClick={() => handleStatusTransition("delivered")}
                className="w-full h-11 text-xs font-bold shadow-sm bg-pd-green-900 border-0 text-white"
              >
                Mark as Delivered
              </Button>
            )}

            {/* Transition: Reserved/Confirmed/Delivered -> Cancelled */}
            {currentStatus !== "cancelled" && (
              <Button
                variant="ghost"
                isLoading={isShiftingStatus}
                onClick={() => handleStatusTransition("cancelled")}
                className="w-full h-11 text-xs font-bold border border-red-200 text-red-700 bg-red-50/20 hover:bg-red-50 hover:border-red-300 shadow-sm"
              >
                Cancel Order & Release Inventory
              </Button>
            )}

            {/* Terminal status notification */}
            {(currentStatus === "delivered") && (
              <div className="p-4 rounded-xl border border-pd-border bg-pd-cream-50/50 text-pd-muted text-xs font-semibold leading-relaxed text-center">
                This order is marked as delivered. No further actions are needed.
              </div>
            )}
            
            {currentStatus === "cancelled" && (
              <div className="p-4 rounded-xl border border-red-100 bg-red-50/20 text-red-700 text-xs font-semibold leading-relaxed text-center">
                This order is cancelled. Reserved stock has been released.
              </div>
            )}
          </div>
        </div>

        {/* Admin Internal Notes */}
        <div className="bg-white border border-pd-border/60 rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-left">
          <h3 className="font-serif text-lg font-bold text-pd-green-950 border-b border-pd-border/40 pb-3">
            Internal Operations Note
          </h3>

          <div className="flex flex-col gap-3.5">
            <textarea
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
              placeholder="Add internal notes about delivery status, contacting confirmation, customer preferences..."
              disabled={isSubmittingNote}
              className="flex min-h-[140px] w-full rounded-xl border border-pd-border bg-white p-4 text-sm font-medium outline-none placeholder:text-pd-muted/50 focus:border-pd-green-700 focus:ring-1 focus:ring-pd-green-700 disabled:opacity-50"
            />
            <Button
              isLoading={isSubmittingNote}
              onClick={handleSaveNote}
              className="w-full h-11 text-xs font-bold bg-pd-green-900 border-0"
            >
              Save Internal Note
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPanel;
