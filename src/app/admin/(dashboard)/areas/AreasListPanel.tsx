"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface AreaItem {
  id: string;
  city: string;
  area: string;
  isAvailable: boolean;
  deliveryChargeBdt: number;
  estimatedDeliveryText: string;
  sortOrder: number;
}

interface AreasListPanelProps {
  initialAreas: AreaItem[];
}

export const AreasListPanel: React.FC<AreasListPanelProps> = ({ initialAreas }) => {
  const router = useRouter();

  const [areas, setAreas] = useState<AreaItem[]>(initialAreas);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form states for inline editing
  const [editIsAvailable, setEditIsAvailable] = useState(false);
  const [editDeliveryCharge, setEditDeliveryCharge] = useState("");
  const [editEstimatedDelivery, setEditEstimatedDelivery] = useState("");

  const handleStartEdit = (item: AreaItem) => {
    setEditingId(item.id);
    setEditIsAvailable(item.isAvailable);
    setEditDeliveryCharge(item.deliveryChargeBdt.toString());
    setEditEstimatedDelivery(item.estimatedDeliveryText);
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setErrorMsg("");
  };

  const handleSaveUpdate = async (id: string) => {
    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    const chargeNum = parseInt(editDeliveryCharge, 10);
    if (isNaN(chargeNum) || chargeNum < 0) {
      setErrorMsg("Please enter a valid non-negative delivery charge fee.");
      setIsSaving(false);
      return;
    }

    if (!editEstimatedDelivery.trim()) {
      setErrorMsg("Estimated delivery speed label text is required.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/areas/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          isAvailable: editIsAvailable,
          deliveryCharge: chargeNum,
          estimatedDelivery: editEstimatedDelivery.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg("Delivery coverage configurations updated.");
        
        // Update local state
        setAreas((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  isAvailable: editIsAvailable,
                  deliveryChargeBdt: chargeNum,
                  estimatedDeliveryText: editEstimatedDelivery.trim(),
                }
              : item
          )
        );
        setEditingId(null);
        router.refresh();
      } else {
        setErrorMsg(data.error || "Failed to update area configurations.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Failed to save location settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left w-full font-sans antialiased">
      {/* Notifications */}
      {(errorMsg || successMsg) && (
        <div>
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

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-pd-cream-50/50 border-b border-pd-border/40 text-xs font-bold text-pd-green-800/80 uppercase">
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Area / Neighborhood</th>
              <th className="px-6 py-4">Availability</th>
              <th className="px-6 py-4">Delivery Fee</th>
              <th className="px-6 py-4">Speed / Waitlist text</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pd-border/40">
            {areas.map((item) => {
              const isEditing = editingId === item.id;
              return (
                <tr key={item.id} className="hover:bg-pd-cream-50/20 transition duration-150">
                  {/* City */}
                  <td className="px-6 py-4 font-semibold text-pd-green-950">
                    {item.city}
                  </td>

                  {/* Area */}
                  <td className="px-6 py-4 font-bold text-pd-green-950">
                    {item.area}
                  </td>

                  {/* Availability */}
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`available-${item.id}`}
                          checked={editIsAvailable}
                          onChange={(e) => setEditIsAvailable(e.target.checked)}
                          disabled={isSaving}
                          className="w-5 h-5 accent-pd-green-900 border-2 border-pd-border rounded cursor-pointer"
                        />
                        <label htmlFor={`available-${item.id}`} className="text-xs font-semibold text-pd-green-900 cursor-pointer select-none">
                          {editIsAvailable ? "Active" : "Inactive"}
                        </label>
                      </div>
                    ) : (
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        item.isAvailable
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-red-50 border-red-200 text-red-700"
                      }`}>
                        {item.isAvailable ? "Active" : "Inactive"}
                      </span>
                    )}
                  </td>

                  {/* Delivery Fee */}
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <div className="flex items-center gap-1.5 max-w-[100px]">
                        <span className="text-pd-muted font-bold">৳</span>
                        <input
                          type="number"
                          value={editDeliveryCharge}
                          onChange={(e) => setEditDeliveryCharge(e.target.value)}
                          disabled={isSaving}
                          className="h-9 w-full rounded-lg border border-pd-border bg-white px-2.5 text-sm font-semibold outline-none focus:border-pd-green-700"
                        />
                      </div>
                    ) : (
                      <span className="font-extrabold text-pd-green-950">৳{item.deliveryChargeBdt}</span>
                    )}
                  </td>

                  {/* Speed / Label */}
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editEstimatedDelivery}
                        onChange={(e) => setEditEstimatedDelivery(e.target.value)}
                        disabled={isSaving}
                        className="h-9 w-full max-w-[200px] rounded-lg border border-pd-border bg-white px-2.5 text-sm font-semibold outline-none focus:border-pd-green-700"
                      />
                    ) : (
                      <span className="font-medium text-pd-muted">{item.estimatedDeliveryText}</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    {isEditing ? (
                      <div className="flex gap-2 justify-end">
                        <Button
                          isLoading={isSaving}
                          onClick={() => handleSaveUpdate(item.id)}
                          className="h-9 px-3 text-xs font-bold bg-pd-green-900 border-0 text-white hover:bg-pd-green-850"
                        >
                          Save
                        </Button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={isSaving}
                          className="h-9 px-3 text-xs font-semibold rounded-xl border border-pd-border hover:bg-pd-cream-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="h-9 px-4 rounded-xl border border-pd-green-900/40 text-pd-green-900 hover:bg-pd-green-900 hover:text-pd-cream-50 text-xs font-bold transition"
                      >
                        Edit Options
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AreasListPanel;
