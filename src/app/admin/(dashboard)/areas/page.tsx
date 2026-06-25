import React from "react";
import { getDbPool } from "@/lib/supabase/pg-pool";
import AreasListPanel from "./AreasListPanel";

export const dynamic = "force-dynamic";

export default async function AdminAreasPage() {
  const pool = getDbPool();
  const dbClient = await pool.connect();

  let areas: any[] = [];

  try {
    const res = await dbClient.query(
      "SELECT * FROM service_areas ORDER BY sort_order ASC, area ASC"
    );
    areas = res.rows;
  } catch (error) {
    console.error("Areas page query error:", error);
  } finally {
    dbClient.release();
  }

  // Serialize areas data for client transmission
  const serializedAreas = areas.map((item) => ({
    id: item.id,
    city: item.city,
    area: item.area,
    isAvailable: item.is_available,
    deliveryChargeBdt: item.delivery_charge_bdt,
    estimatedDeliveryText: item.estimated_delivery_text || "",
    sortOrder: item.sort_order,
  }));

  return (
    <div className="flex flex-col gap-8 text-left w-full h-full font-sans antialiased">
      {/* Title block */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-pd-green-900 leading-tight">
          Delivery Service Areas
        </h1>
        <p className="text-sm text-pd-muted mt-1">
          Activate delivery zones, modify shipping fees, and configure estimated arrival times.
        </p>
      </div>

      {/* Main List panel */}
      <div className="bg-white border border-pd-border/60 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
        <AreasListPanel initialAreas={serializedAreas} />
      </div>
    </div>
  );
}
