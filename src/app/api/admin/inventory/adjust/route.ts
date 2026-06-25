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
    const { productId, movementType, quantity, note } = body;

    const parsedQty = parseInt(quantity, 10);

    if (!productId || !movementType || isNaN(parsedQty) || parsedQty <= 0 || !note) {
      return NextResponse.json(
        { error: "Product ID, movement type, positive quantity, and audit note are required." },
        { status: 400 }
      );
    }

    const validMovementTypes = ["manual_add", "manual_reduce"];
    if (!validMovementTypes.includes(movementType)) {
      return NextResponse.json(
        { error: "Invalid movement type. Must be manual_add or manual_reduce." },
        { status: 400 }
      );
    }

    // Start transaction
    await dbClient.query("BEGIN");

    // 1. Fetch current inventory to validate bounds
    const invResult = await dbClient.query(
      "SELECT stock_on_hand, stock_reserved FROM inventory WHERE product_id = $1 FOR UPDATE",
      [productId]
    );

    if (invResult.rowCount === 0) {
      await dbClient.query("ROLLBACK");
      return NextResponse.json(
        { error: "Inventory record not found for the product." },
        { status: 404 }
      );
    }

    const { stock_on_hand, stock_reserved } = invResult.rows[0];
    let nextOnHand = stock_on_hand;

    if (movementType === "manual_add") {
      nextOnHand = stock_on_hand + parsedQty;
    } else if (movementType === "manual_reduce") {
      if (stock_on_hand - parsedQty < stock_reserved) {
        await dbClient.query("ROLLBACK");
        return NextResponse.json(
          { error: `Cannot reduce stock below reserved amount. Current reserved: ${stock_reserved} units.` },
          { status: 400 }
        );
      }
      nextOnHand = Math.max(0, stock_on_hand - parsedQty);
    }

    // 2. Update stock count
    await dbClient.query(
      "UPDATE inventory SET stock_on_hand = $1, updated_at = now() WHERE product_id = $2",
      [nextOnHand, productId]
    );

    // 3. Log movement audit trail
    await dbClient.query(
      `INSERT INTO inventory_movements (product_id, movement_type, quantity, note) 
       VALUES ($1, $2, $3, $4)`,
      [productId, movementType, parsedQty, note]
    );

    // Commit transaction
    await dbClient.query("COMMIT");

    return NextResponse.json({ success: true });

  } catch (error) {
    await dbClient.query("ROLLBACK");
    console.error("Manual inventory adjust API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  } finally {
    dbClient.release();
  }
}
