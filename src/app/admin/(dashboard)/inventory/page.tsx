import React from "react";
import { getDbPool } from "@/lib/supabase/pg-pool";
import InventoryAdjustForm from "./InventoryAdjustForm";

export const dynamic = "force-dynamic";

export default async function AdminInventoryPage() {
  const pool = getDbPool();
  const dbClient = await pool.connect();

  let inventory: any = null;
  let movements: any[] = [];

  try {
    // 1. Fetch current inventory metrics
    const invRes = await dbClient.query(
      `SELECT i.*, p.name as product_name, p.slug as product_slug 
       FROM inventory i
       JOIN products p ON i.product_id = p.id
       WHERE p.slug = 'premium-daab-single'
       LIMIT 1`
    );

    if (invRes.rows.length > 0) {
      inventory = invRes.rows[0];
    }

    // 2. Fetch recent 10 stock movements
    const movementsRes = await dbClient.query(
      `SELECT im.id, im.movement_type, im.quantity, im.note, im.created_at, o.order_number 
       FROM inventory_movements im
       LEFT JOIN orders o ON im.order_id = o.id
       ORDER BY im.created_at DESC 
       LIMIT 10`
    );
    movements = movementsRes.rows;

  } catch (error) {
    console.error("Inventory page queries error:", error);
  } finally {
    dbClient.release();
  }

  if (!inventory) {
    return (
      <div className="p-12 text-center text-pd-muted font-sans text-sm">
        Product inventory configuration is missing in the database.
      </div>
    );
  }

  const stockOnHand = inventory.stock_on_hand;
  const stockReserved = inventory.stock_reserved;
  const stockAvailable = stockOnHand - stockReserved;
  const isLowStock = stockAvailable <= inventory.low_stock_threshold;

  // Helper for movement labels
  const movementLabels: Record<string, string> = {
    manual_add: "Stock Added",
    manual_reduce: "Stock Reduced",
    reserved_for_order: "Order Reserved",
    released_from_cancelled_order: "Order Released",
    confirmed_order_deducted: "Order Confirmed",
  };

  const movementBadgeColors: Record<string, string> = {
    manual_add: "bg-emerald-50 text-emerald-700 border-emerald-200",
    manual_reduce: "bg-red-50 text-red-700 border-red-200",
    reserved_for_order: "bg-blue-50 text-blue-700 border-blue-200",
    released_from_cancelled_order: "bg-teal-50 text-teal-700 border-teal-200",
    confirmed_order_deducted: "bg-purple-50 text-purple-700 border-purple-200",
  };

  return (
    <div className="flex flex-col gap-8 text-left w-full h-full">
      {/* Title block */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-pd-green-900 leading-tight">
          Inventory Operations
        </h1>
        <p className="text-sm text-pd-muted mt-1 font-sans">
          Monitor inventory levels, view audit logs, and adjust stock counts.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-pd-border/60 p-6 rounded-2xl shadow-sm flex flex-col gap-1 text-left">
          <span className="text-xs font-bold text-pd-muted uppercase tracking-wider">Stock On Hand</span>
          <span className="text-3xl font-bold font-sans text-pd-green-950 mt-1">{stockOnHand} units</span>
          <span className="text-xs text-pd-muted mt-1 font-sans">Physical stock in warehouse</span>
        </div>
        
        <div className="bg-white border border-pd-border/60 p-6 rounded-2xl shadow-sm flex flex-col gap-1 text-left">
          <span className="text-xs font-bold text-pd-muted uppercase tracking-wider">Reserved Stock</span>
          <span className="text-3xl font-bold font-sans text-pd-green-950 mt-1">{stockReserved} units</span>
          <span className="text-xs text-pd-muted mt-1 font-sans">Locked for pending deliveries</span>
        </div>

        <div className={`bg-white border p-6 rounded-2xl shadow-sm flex flex-col gap-1 text-left ${
          isLowStock ? "border-amber-400 bg-amber-50/10" : "border-pd-border/60"
        }`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-pd-muted uppercase tracking-wider">Available to Sell</span>
            {isLowStock && (
              <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded">
                Low Stock
              </span>
            )}
          </div>
          <span className="text-3xl font-bold font-sans text-pd-green-950 mt-1">{stockAvailable} units</span>
          <span className="text-xs text-pd-muted mt-1 font-sans">
            Threshold setting: {inventory.low_stock_threshold} units
          </span>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Audit Log movements (Col 1-8) */}
        <div className="lg:col-span-8 bg-white border border-pd-border/60 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-pd-border/60">
            <h3 className="font-serif text-lg font-bold text-pd-green-950">
              Audit Logs (Recent Movements)
            </h3>
          </div>

          <div className="overflow-x-auto w-full">
            {movements.length === 0 ? (
              <div className="p-12 text-center text-pd-muted font-sans text-sm">
                No inventory logs recorded.
              </div>
            ) : (
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-pd-cream-50/50 border-b border-pd-border/40 text-xs font-bold text-pd-green-800/80 uppercase">
                    <th className="px-6 py-4">Action</th>
                    <th className="px-6 py-4 text-center">Qty</th>
                    <th className="px-6 py-4">Audit Note / Order Code</th>
                    <th className="px-6 py-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pd-border/40">
                  {movements.map((log) => (
                    <tr key={log.id} className="hover:bg-pd-cream-50/20 transition">
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold border ${
                          movementBadgeColors[log.movement_type] || "bg-gray-100 border-gray-300"
                        }`}>
                          {movementLabels[log.movement_type] || log.movement_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-pd-green-950">
                        {log.movement_type === "manual_reduce" || log.movement_type === "confirmed_order_deducted" ? "-" : "+"}
                        {log.quantity}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-pd-green-950 leading-normal">{log.note}</div>
                        {log.order_number && (
                          <div className="text-xs font-mono font-bold text-pd-muted mt-1 select-all">
                            Order Code: {log.order_number}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs text-pd-muted font-sans whitespace-nowrap">
                        <div>{new Date(log.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        <div className="mt-0.5 text-pd-muted/70">{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right: Manual adjustment form (Col 9-12) */}
        <div className="lg:col-span-4 bg-white border border-pd-border/60 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="font-serif text-lg font-bold text-pd-green-950 border-b border-pd-border/40 pb-3">
            Manual Stock Adjustment
          </h3>
          
          <InventoryAdjustForm productId={inventory.product_id} />
        </div>
      </div>
    </div>
  );
}
