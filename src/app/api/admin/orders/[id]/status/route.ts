import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/supabase/pg-pool";
import { validateAdminSession } from "@/lib/supabase/server-auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  const { id: orderId } = await params;
  const pool = getDbPool();
  const dbClient = await pool.connect();

  try {
    const body = await request.json().catch(() => ({}));
    const { status: newStatus, adminNote } = body;

    const validStatuses = ["whatsapp_redirected", "contacted", "confirmed", "cancelled", "delivered"];
    if (newStatus && !validStatuses.includes(newStatus)) {
      return NextResponse.json(
        { error: "Invalid status value provided." },
        { status: 400 }
      );
    }

    // Start transaction
    await dbClient.query("BEGIN");

    // 1. Fetch current order details with lock
    const orderResult = await dbClient.query(
      "SELECT status, quantity, product_id, order_number FROM orders WHERE id = $1 FOR UPDATE",
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      await dbClient.query("ROLLBACK");
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const { status: oldStatus, quantity, product_id: productId, order_number: orderNumber } = orderResult.rows[0];

    // Update order status and admin note if provided
    let updateFields: string[] = [];
    const updateParams: any[] = [];

    if (newStatus && newStatus !== oldStatus) {
      updateFields.push(`status = $${updateParams.length + 1}`);
      updateParams.push(newStatus);
      
      // Update confirmed/cancelled/delivered timestamps based on target state
      if (newStatus === "confirmed") {
        updateFields.push(`confirmed_at = now()`);
      } else if (newStatus === "cancelled") {
        updateFields.push(`cancelled_at = now()`);
      } else if (newStatus === "delivered") {
        updateFields.push(`delivered_at = now()`);
      }
    }

    if (adminNote !== undefined) {
      updateFields.push(`admin_note = $${updateParams.length + 1}`);
      updateParams.push(adminNote);
    }

    if (updateFields.length > 0) {
      updateParams.push(orderId);
      await dbClient.query(
        `UPDATE orders SET ${updateFields.join(", ")}, updated_at = now() WHERE id = $${updateParams.length}`,
        updateParams
      );
    }

    // 2. Handle stock changes based on status transitions
    if (newStatus && newStatus !== oldStatus) {
      // Fetch current inventory
      const invResult = await dbClient.query(
        "SELECT stock_on_hand, stock_reserved FROM inventory WHERE product_id = $1 FOR UPDATE",
        [productId]
      );
      
      if (invResult.rows.length > 0) {
        const { stock_on_hand, stock_reserved } = invResult.rows[0];
        let nextOnHand = stock_on_hand;
        let nextReserved = stock_reserved;
        let movementType: string | null = null;
        let movementNote = "";

        // Transition logic rules
        const isOldReserved = oldStatus === "whatsapp_redirected" || oldStatus === "contacted";
        const isOldDeducted = oldStatus === "confirmed" || oldStatus === "delivered";
        const isOldReleased = oldStatus === "cancelled";

        if (newStatus === "confirmed" || newStatus === "delivered") {
          if (isOldReserved) {
            // Reserved -> Confirmed: Deduct from On-Hand and release Reservation
            nextOnHand = Math.max(0, stock_on_hand - quantity);
            nextReserved = Math.max(0, stock_reserved - quantity);
            movementType = "confirmed_order_deducted";
            movementNote = `Order ${orderNumber} status shifted to ${newStatus}. Deducted stock.`;
          } else if (isOldReleased) {
            // Cancelled -> Confirmed: Re-check available stock and deduct from On-Hand
            const availableStock = stock_on_hand - stock_reserved;
            if (quantity > availableStock) {
              await dbClient.query("ROLLBACK");
              return NextResponse.json(
                { error: `Insufficient stock to confirm order. Only ${availableStock} units available.` },
                { status: 400 }
              );
            }
            nextOnHand = Math.max(0, stock_on_hand - quantity);
            movementType = "confirmed_order_deducted";
            movementNote = `Order ${orderNumber} re-confirmed. Deducted stock.`;
          }
          // If isOldDeducted (Confirmed <-> Delivered), no stock change is needed
        } 
        
        else if (newStatus === "cancelled") {
          if (isOldReserved) {
            // Reserved -> Cancelled: Release reserved stock
            nextReserved = Math.max(0, stock_reserved - quantity);
            movementType = "released_from_cancelled_order";
            movementNote = `Order ${orderNumber} cancelled. Released reservation.`;
          } else if (isOldDeducted) {
            // Confirmed -> Cancelled: Return stock back to On-Hand
            nextOnHand = stock_on_hand + quantity;
            movementType = "manual_add"; // Restore back to pool
            movementNote = `Order ${orderNumber} cancelled after confirmation. Restored ${quantity} units to stock.`;
          }
        } 
        
        else if (newStatus === "whatsapp_redirected" || newStatus === "contacted") {
          if (isOldReleased) {
            // Cancelled -> Reserved: Re-reserve stock
            const availableStock = stock_on_hand - stock_reserved;
            if (quantity > availableStock) {
              await dbClient.query("ROLLBACK");
              return NextResponse.json(
                { error: `Insufficient stock to reserve order. Only ${availableStock} units available.` },
                { status: 400 }
              );
            }
            nextReserved = stock_reserved + quantity;
            movementType = "reserved_for_order";
            movementNote = `Order ${orderNumber} set back to pending. Reserved stock.`;
          } else if (isOldDeducted) {
            // Confirmed -> Reserved: Restore On-Hand and add back to Reservation
            nextOnHand = stock_on_hand + quantity;
            nextReserved = stock_reserved + quantity;
            movementType = "reserved_for_order";
            movementNote = `Order ${orderNumber} reset from confirmed to pending. Restored stock and reserved it.`;
          }
        }

        // Apply inventory updates if values changed
        if (nextOnHand !== stock_on_hand || nextReserved !== stock_reserved) {
          await dbClient.query(
            "UPDATE inventory SET stock_on_hand = $1, stock_reserved = $2, updated_at = now() WHERE product_id = $3",
            [nextOnHand, nextReserved, productId]
          );
        }

        // Log movement if applicable
        if (movementType) {
          await dbClient.query(
            `INSERT INTO inventory_movements (product_id, order_id, movement_type, quantity, note) 
             VALUES ($1, $2, $3, $4, $5)`,
            [productId, orderId, movementType, quantity, movementNote]
          );
        }
      }
    }

    // Commit transaction
    await dbClient.query("COMMIT");

    return NextResponse.json({ success: true });

  } catch (error) {
    await dbClient.query("ROLLBACK");
    console.error("Order status update API error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  } finally {
    dbClient.release();
  }
}
