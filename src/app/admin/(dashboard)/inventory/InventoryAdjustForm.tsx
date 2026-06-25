"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface InventoryAdjustFormProps {
  productId: string;
}

export const InventoryAdjustForm: React.FC<InventoryAdjustFormProps> = ({ productId }) => {
  const router = useRouter();

  const [movementType, setMovementType] = useState("manual_add");
  const [quantity, setQuantity] = useState("1");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const parsedQty = parseInt(quantity, 10);
    if (isNaN(parsedQty) || parsedQty <= 0) {
      setErrorMsg("Please enter a valid positive quantity.");
      setIsLoading(false);
      return;
    }

    if (!note.trim()) {
      setErrorMsg("Please enter an audit reason note for this adjustment.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/inventory/adjust", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          movementType,
          quantity: parsedQty,
          note: note.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg("Inventory adjustment completed successfully.");
        setQuantity("1");
        setNote("");
        router.refresh();
      } else {
        setErrorMsg(data.error || "Failed to adjust inventory.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Failed to execute adjustment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleAdjustSubmit} className="flex flex-col gap-5 text-left">
      {(errorMsg || successMsg) && (
        <div>
          {errorMsg && (
            <div className="p-3.5 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs font-semibold">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold">
              {successMsg}
            </div>
          )}
        </div>
      )}

      {/* Select Adjustment Type */}
      <div className="flex flex-col gap-1.5 text-left">
        <label className="text-sm font-medium text-pd-text select-none">
          Adjustment Action
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMovementType("manual_add")}
            disabled={isLoading}
            className={`h-11 rounded-xl font-semibold text-xs border transition flex items-center justify-center gap-2 ${
              movementType === "manual_add"
                ? "bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-300/10"
                : "border-pd-border/60 hover:bg-pd-cream-100"
            }`}
          >
            <span className="text-base">+</span>
            <span>Add Stock</span>
          </button>

          <button
            type="button"
            onClick={() => setMovementType("manual_reduce")}
            disabled={isLoading}
            className={`h-11 rounded-xl font-semibold text-xs border transition flex items-center justify-center gap-2 ${
              movementType === "manual_reduce"
                ? "bg-red-50 text-red-700 border-red-300 ring-2 ring-red-300/10"
                : "border-pd-border/60 hover:bg-pd-cream-100"
            }`}
          >
            <span className="text-base">−</span>
            <span>Reduce Stock</span>
          </button>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex flex-col gap-1.5">
        <Input
          label="Adjustment Quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g. 50"
          disabled={isLoading}
          required
        />
      </div>

      {/* Audit Reason Note */}
      <div className="flex flex-col gap-1.5 text-left">
        <label className="text-sm font-medium text-pd-text select-none">
          Audit Note (Reason)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Received new shipment of 200 coconuts from farm, or corrected audit mismatch count..."
          disabled={isLoading}
          className="flex min-h-[96px] w-full rounded-xl border border-pd-border bg-white p-3.5 text-sm font-medium outline-none placeholder:text-pd-muted/50 focus:border-pd-green-700 focus:ring-1 focus:ring-pd-green-700 disabled:opacity-50"
          required
        />
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full h-12 bg-pd-green-900 border-0 text-white font-semibold rounded-xl mt-2"
      >
        Submit Inventory Audit
      </Button>
    </form>
  );
};

export default InventoryAdjustForm;
