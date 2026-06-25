import React from "react";
import Link from "next/link";
import { getDbPool } from "@/lib/supabase/pg-pool";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const pool = getDbPool();
  const dbClient = await pool.connect();

  let stats = {
    ordersToday: 0,
    pendingOrders: 0,
    revenueToday: 0,
    stockOnHand: 0,
    stockReserved: 0,
    stockAvailable: 0,
    isLowStock: false,
  };

  let recentOrders: any[] = [];

  try {
    // 1. Orders Today count (excluding cancelled)
    const ordersTodayRes = await dbClient.query(
      "SELECT COUNT(*)::integer FROM orders WHERE created_at >= CURRENT_DATE AND status != 'cancelled'"
    );
    stats.ordersToday = ordersTodayRes.rows[0].count;

    // 2. Pending Orders count (waiting for admin action)
    const pendingOrdersRes = await dbClient.query(
      "SELECT COUNT(*)::integer FROM orders WHERE status IN ('whatsapp_redirected', 'contacted')"
    );
    stats.pendingOrders = pendingOrdersRes.rows[0].count;

    // 3. Revenue Today sum (from confirmed/delivered orders)
    const revenueTodayRes = await dbClient.query(
      "SELECT COALESCE(SUM(total_bdt), 0)::integer FROM orders WHERE created_at >= CURRENT_DATE AND status IN ('confirmed', 'delivered')"
    );
    stats.revenueToday = revenueTodayRes.rows[0].coalesce;

    // 4. Inventory status
    const inventoryRes = await dbClient.query(
      `SELECT stock_on_hand, stock_reserved, low_stock_threshold 
       FROM inventory 
       WHERE product_id = (SELECT id FROM products WHERE slug = 'premium-daab-single' LIMIT 1) 
       LIMIT 1`
    );

    if (inventoryRes.rows.length > 0) {
      const inv = inventoryRes.rows[0];
      stats.stockOnHand = inv.stock_on_hand;
      stats.stockReserved = inv.stock_reserved;
      stats.stockAvailable = inv.stock_on_hand - inv.stock_reserved;
      stats.isLowStock = stats.stockAvailable <= inv.low_stock_threshold;
    }

    // 5. Recent 5 orders
    const recentOrdersRes = await dbClient.query(
      `SELECT id, order_number, customer_name, customer_phone, quantity, total_bdt, status, created_at 
       FROM orders 
       ORDER BY created_at DESC 
       LIMIT 5`
    );
    recentOrders = recentOrdersRes.rows;

  } catch (error) {
    console.error("Dashboard database query error:", error);
  } finally {
    dbClient.release();
  }

  // Helper for status badge colors
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

  return (
    <div className="flex flex-col gap-8 text-left w-full h-full">
      {/* Title block */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-pd-green-900 leading-tight">
          Overview Dashboard
        </h1>
        <p className="text-sm text-pd-muted mt-1 font-sans">
          Real-time operations status and inventory logs.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Orders Today */}
        <div className="bg-white border border-pd-border/60 p-6 rounded-2xl shadow-sm flex flex-col gap-1.5 text-left">
          <span className="text-xs font-bold text-pd-muted uppercase tracking-wider">
            Orders Today
          </span>
          <span className="text-3xl font-bold font-sans text-pd-green-950">
            {stats.ordersToday}
          </span>
          <span className="text-xs text-pd-green-800/60 font-sans mt-1">
            Excluding cancelled orders
          </span>
        </div>

        {/* Card 2: Pending Processing */}
        <div className="bg-white border border-pd-border/60 p-6 rounded-2xl shadow-sm flex flex-col gap-1.5 text-left relative">
          <span className="text-xs font-bold text-pd-muted uppercase tracking-wider">
            Pending Processing
          </span>
          <span className="text-3xl font-bold font-sans text-pd-green-950">
            {stats.pendingOrders}
          </span>
          <span className="text-xs text-pd-gold-600 font-bold font-sans mt-1">
            {stats.pendingOrders > 0 ? "Requires action" : "All orders processed"}
          </span>
        </div>

        {/* Card 3: Revenue Today */}
        <div className="bg-white border border-pd-border/60 p-6 rounded-2xl shadow-sm flex flex-col gap-1.5 text-left">
          <span className="text-xs font-bold text-pd-muted uppercase tracking-wider">
            Revenue Today
          </span>
          <span className="text-3xl font-bold font-sans text-pd-green-950">
            ৳{stats.revenueToday}
          </span>
          <span className="text-xs text-pd-green-800/60 font-sans mt-1">
            Confirmed & delivered sales
          </span>
        </div>

        {/* Card 4: Available Stock */}
        <div className={`bg-white border p-6 rounded-2xl shadow-sm flex flex-col gap-1.5 text-left ${
          stats.isLowStock ? "border-amber-400 bg-amber-50/10" : "border-pd-border/60"
        }`}>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-pd-muted uppercase tracking-wider">
              Available Stock
            </span>
            {stats.isLowStock && (
              <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded">
                Low Stock
              </span>
            )}
          </div>
          <span className="text-3xl font-bold font-sans text-pd-green-950">
            {stats.stockAvailable} units
          </span>
          <span className="text-xs text-pd-muted font-sans mt-1">
            Reserved: {stats.stockReserved} / On-Hand: {stats.stockOnHand}
          </span>
        </div>
      </div>

      {/* Main Grid: Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Orders (Col 1-8) */}
        <div className="lg:col-span-8 bg-white border border-pd-border/60 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-pd-border/60 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-pd-green-950">
              Recent Orders
            </h3>
            <Link href="/admin/orders">
              <span className="text-xs font-bold text-pd-green-900 hover:underline cursor-pointer">
                View All Orders ➔
              </span>
            </Link>
          </div>

          <div className="overflow-x-auto w-full">
            {recentOrders.length === 0 ? (
              <div className="p-12 text-center text-pd-muted font-sans text-sm">
                No orders placed yet.
              </div>
            ) : (
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-pd-cream-50/50 border-b border-pd-border/40 text-xs font-bold text-pd-green-800/80 uppercase">
                    <th className="px-6 py-4">Order Code</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pd-border/40">
                  {recentOrders.map((ord) => (
                    <tr
                      key={ord.id}
                      className="hover:bg-pd-cream-50/30 cursor-pointer transition duration-150"
                    >
                      <td className="px-6 py-4.5 font-mono font-bold text-pd-green-950">
                        <Link href={`/admin/orders/${ord.id}`} className="hover:underline">
                          {ord.order_number.slice(0, 16)}...
                        </Link>
                      </td>
                      <td className="px-6 py-4.5">
                        <div className="font-semibold text-pd-green-950">{ord.customer_name}</div>
                        <div className="text-xs text-pd-muted mt-0.5">{ord.customer_phone}</div>
                      </td>
                      <td className="px-6 py-4.5 font-semibold text-pd-green-950">
                        {ord.quantity}
                      </td>
                      <td className="px-6 py-4.5 font-bold text-pd-green-950">
                        ৳{ord.total_bdt}
                      </td>
                      <td className="px-6 py-4.5">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          statusBadges[ord.status] || "bg-gray-100 border-gray-300 text-gray-800"
                        }`}>
                          {statusLabels[ord.status] || ord.status}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-xs text-pd-muted font-sans">
                        {new Date(ord.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column: Quick Operations (Col 9-12) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Inventory Summary */}
          <div className="bg-white border border-pd-border/60 rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-left">
            <h3 className="font-serif text-lg font-bold text-pd-green-950 border-b border-pd-border/40 pb-3">
              Stock Operations
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 text-sm font-sans">
                <div className="bg-[#FAF5EB] p-3.5 rounded-xl border border-pd-border/40">
                  <span className="block text-xs text-pd-muted mb-0.5">Stock On Hand</span>
                  <span className="font-bold text-lg text-pd-green-950">{stats.stockOnHand}</span>
                </div>
                <div className="bg-[#FAF5EB] p-3.5 rounded-xl border border-pd-border/40">
                  <span className="block text-xs text-pd-muted mb-0.5">Reserved Qty</span>
                  <span className="font-bold text-lg text-pd-green-950">{stats.stockReserved}</span>
                </div>
              </div>

              <Link href="/admin/inventory" className="w-full">
                <button className="w-full h-11 bg-pd-green-900 hover:bg-pd-green-800 text-pd-cream-50 text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Adjust Stock Audit
                </button>
              </Link>
            </div>
          </div>

          {/* Area Config shortcuts */}
          <div className="bg-white border border-pd-border/60 rounded-3xl p-6 shadow-sm flex flex-col gap-4 text-left">
            <h3 className="font-serif text-lg font-bold text-pd-green-950 border-b border-pd-border/40 pb-3">
              Service Network
            </h3>

            <div className="flex flex-col gap-3">
              <p className="text-xs text-pd-muted font-sans leading-relaxed">
                Toggle delivery status, change delivery fees, or add/remove coverage parameters.
              </p>
              
              <Link href="/admin/areas" className="w-full">
                <button className="w-full h-11 bg-transparent hover:bg-pd-cream-100 text-pd-green-900 border-2 border-pd-green-900 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Manage Locations
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
