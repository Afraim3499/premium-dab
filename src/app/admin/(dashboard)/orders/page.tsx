import React from "react";
import Link from "next/link";
import { getDbPool } from "@/lib/supabase/pg-pool";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ status?: string; search?: string }>;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentStatus = resolvedParams.status || "all";
  const searchQuery = resolvedParams.search || "";

  const pool = getDbPool();
  const dbClient = await pool.connect();

  let orders: any[] = [];

  try {
    let sql = `
      SELECT id, order_number, customer_name, customer_phone, city, area, quantity, total_bdt, status, created_at 
      FROM orders
      WHERE 1=1
    `;
    const params: any[] = [];

    // Apply status filter
    if (currentStatus !== "all") {
      params.push(currentStatus);
      sql += ` AND status = $${params.length}`;
    }

    // Apply search query
    if (searchQuery) {
      params.push(`%${searchQuery}%`);
      sql += ` AND (
        customer_name ILIKE $${params.length} OR 
        customer_phone ILIKE $${params.length} OR 
        order_number ILIKE $${params.length} OR
        area ILIKE $${params.length}
      )`;
    }

    sql += " ORDER BY created_at DESC";

    const result = await dbClient.query(sql, params);
    orders = result.rows;
  } catch (error) {
    console.error("Orders list query error:", error);
  } finally {
    dbClient.release();
  }

  // Filter tabs
  const tabs = [
    { label: "All Orders", value: "all" },
    { label: "Redirected", value: "whatsapp_redirected" },
    { label: "Contacted", value: "contacted" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancelled", value: "cancelled" },
  ];

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
      {/* Title Block */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-pd-green-900 leading-tight">
            Order Management
          </h1>
          <p className="text-sm text-pd-muted mt-1 font-sans">
            Filter, search, and manage customer orders and deliveries.
          </p>
        </div>
      </div>

      {/* Tabs and Search Bar Container */}
      <div className="bg-white border border-pd-border/60 rounded-3xl p-6 shadow-sm flex flex-col gap-6">
        
        {/* Search Form */}
        <form method="GET" action="/admin/orders" className="flex flex-col sm:flex-row gap-3 w-full">
          <input type="hidden" name="status" value={currentStatus} />
          
          <div className="relative flex-1">
            <input
              type="text"
              name="search"
              defaultValue={searchQuery}
              placeholder="Search by customer name, phone number, order code, or area..."
              className="flex h-12 w-full rounded-xl border border-pd-border bg-white px-4 pr-10 text-sm font-medium outline-none placeholder:text-pd-muted/50 focus:border-pd-green-700 focus:ring-1 focus:ring-pd-green-700"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-pd-muted hover:text-pd-green-900 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <button
            type="submit"
            className="h-12 px-6 rounded-xl bg-pd-green-900 text-pd-cream-50 hover:bg-pd-green-800 text-sm font-semibold transition flex-shrink-0"
          >
            Search Orders
          </button>
          
          {searchQuery && (
            <Link
              href={`/admin/orders?status=${currentStatus}`}
              className="h-12 px-4 rounded-xl border border-pd-border text-pd-muted hover:bg-pd-cream-50 text-sm font-semibold transition flex items-center justify-center flex-shrink-0"
            >
              Clear
            </Link>
          )}
        </form>

        {/* Tab Filters */}
        <div className="flex flex-wrap border-b border-pd-border/40 gap-2">
          {tabs.map((tab) => {
            const isActive = currentStatus === tab.value;
            return (
              <Link
                key={tab.value}
                href={`/admin/orders?status=${tab.value}&search=${searchQuery}`}
                className={`pb-3 px-4 text-sm font-semibold transition-all duration-200 border-b-2 -mb-[2px] ${
                  isActive
                    ? "border-pd-gold-500 text-pd-green-950 font-bold"
                    : "border-transparent text-pd-muted hover:text-pd-green-900 hover:border-pd-border"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto w-full -mx-6 px-6">
          {orders.length === 0 ? (
            <div className="py-16 text-center text-pd-muted font-sans text-sm">
              No matching orders found.
            </div>
          ) : (
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-pd-cream-50/50 border-b border-pd-border/40 text-xs font-bold text-pd-green-800/80 uppercase">
                  <th className="px-6 py-4">Order Code</th>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Delivery Zone</th>
                  <th className="px-6 py-4 text-center">Qty</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date / Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pd-border/40">
                {orders.map((ord) => (
                  <tr
                    key={ord.id}
                    className="hover:bg-pd-cream-50/30 transition duration-150 cursor-pointer"
                  >
                    {/* Order Link Column */}
                    <td className="px-6 py-4 font-mono font-bold text-pd-green-950">
                      <Link href={`/admin/orders/${ord.id}`} className="hover:underline">
                        {ord.order_number}
                      </Link>
                    </td>

                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-pd-green-950">{ord.customer_name}</div>
                      <div className="text-xs text-pd-muted mt-0.5">{ord.customer_phone}</div>
                    </td>

                    {/* Zone */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-pd-green-950">{ord.area}</div>
                      <div className="text-xs text-pd-muted mt-0.5">{ord.city}</div>
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4 text-center font-bold text-pd-green-950">
                      {ord.quantity}
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 font-extrabold text-pd-green-950">
                      ৳{ord.total_bdt}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        statusBadges[ord.status] || "bg-gray-100 border-gray-300 text-gray-800"
                      }`}>
                        {statusLabels[ord.status] || ord.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-xs text-pd-muted font-sans whitespace-nowrap">
                      <div>{new Date(ord.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      <div className="mt-0.5 text-pd-muted/70">{new Date(ord.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
