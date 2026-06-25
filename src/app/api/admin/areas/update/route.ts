import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/supabase/pg-pool";
import { validateAdminSession } from "@/lib/supabase/server-auth";

export async function POST(request: Request) {
  // Validate administrator session
  let adminProfile;
  try {
    adminProfile = await validateAdminSession();
  } catch (authErr: any) {
    const errMsg = authErr.message || "Unauthorized access.";
    return NextResponse.json(
      { error: errMsg },
      { status: errMsg.toLowerCase().includes("forbidden") ? 403 : 401 }
    );
  }

  const pool = getDbPool();
  const dbClient = await pool.connect();

  try {
    const body = await request.json().catch(() => ({}));
    const { id, isAvailable, deliveryCharge, estimatedDelivery } = body;

    const parsedCharge = parseInt(deliveryCharge, 10);

    if (!id || isAvailable === undefined || isNaN(parsedCharge) || parsedCharge < 0 || !estimatedDelivery) {
      return NextResponse.json(
        { error: "Area ID, availability status, delivery charge, and estimated delivery text are required." },
        { status: 400 }
      );
    }

    await dbClient.query(
      `UPDATE service_areas 
       SET is_available = $1, delivery_charge_bdt = $2, estimated_delivery_text = $3 
       WHERE id = $4`,
      [isAvailable, parsedCharge, estimatedDelivery, id]
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Area update API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  } finally {
    dbClient.release();
  }
}
