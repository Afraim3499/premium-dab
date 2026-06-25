import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDbPool } from "@/lib/supabase/pg-pool";
import OrderDetailsPanel from "./OrderDetailsPanel";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const { id: orderId } = await params;

  const pool = getDbPool();
  const dbClient = await pool.connect();

  let order: any = null;

  try {
    const res = await dbClient.query(
      `SELECT o.*, p.name as product_name, p.slug as product_slug 
       FROM orders o
       JOIN products p ON o.product_id = p.id
       WHERE o.id = $1 
       LIMIT 1`,
      [orderId]
    );

    if (res.rows.length > 0) {
      order = res.rows[0];
    }
  } catch (error) {
    console.error("Order details query error:", error);
  } finally {
    dbClient.release();
  }

  if (!order) {
    notFound();
  }

  // Normalize order properties for client serialization
  const serializedOrder = {
    id: order.id,
    orderNumber: order.order_number,
    customerName: order.customer_name,
    customerPhone: order.customer_phone,
    city: order.city,
    area: order.area,
    fullAddress: order.full_address,
    deliveryNote: order.delivery_note,
    quantity: order.quantity,
    unitPriceBdt: order.unit_price_bdt,
    subtotalBdt: order.subtotal_bdt,
    deliveryChargeBdt: order.delivery_charge_bdt,
    totalBdt: order.total_bdt,
    status: order.status,
    whatsappMessage: order.whatsapp_message,
    whatsappRedirectUrl: order.whatsapp_redirect_url,
    adminNote: order.admin_note || "",
    confirmedAt: order.confirmed_at ? order.confirmed_at.toISOString() : null,
    cancelledAt: order.cancelled_at ? order.cancelled_at.toISOString() : null,
    deliveredAt: order.delivered_at ? order.delivered_at.toISOString() : null,
    createdAt: order.created_at.toISOString(),
    productName: order.product_name,
  };

  return (
    <div className="flex flex-col gap-6 text-left w-full h-full">
      {/* Back link */}
      <div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-xs font-bold text-pd-muted hover:text-pd-green-900 transition"
        >
          <span>←</span>
          <span>Back to Order Management</span>
        </Link>
      </div>

      <OrderDetailsPanel order={serializedOrder} />
    </div>
  );
}
