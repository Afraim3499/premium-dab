import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/supabase/pg-pool";
import { orderSchema, normalizePhoneNumber } from "@/lib/validation/order";

export async function POST(request: Request) {
  const pool = getDbPool();
  const dbClient = await pool.connect();

  try {
    const body = await request.json().catch(() => ({}));
    
    // Validate request body against Zod schema
    const parseResult = orderSchema.safeParse({
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      city: body.city,
      area: body.area,
      fullAddress: body.fullAddress,
      quantity: Number(body.quantity),
      deliveryNote: body.deliveryNote || "",
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || "Invalid input data." },
        { status: 400 }
      );
    }

    const { customerName, customerPhone, city, area, fullAddress, quantity, deliveryNote } = parseResult.data;
    const normalizedPhone = normalizePhoneNumber(customerPhone);

    // Start database transaction
    await dbClient.query("BEGIN");

    // 1. Fetch products SKU info
    const productResult = await dbClient.query(
      "SELECT id, price_bdt FROM products WHERE slug = $1 AND is_active = true LIMIT 1",
      ["premium-daab-single"]
    );

    if (productResult.rowCount === 0) {
      await dbClient.query("ROLLBACK");
      return NextResponse.json(
        { error: "Product not found or currently unavailable." },
        { status: 404 }
      );
    }

    const product = productResult.rows[0];
    const productId = product.id;
    const unitPrice = product.price_bdt;

    // 2. Fetch inventory and lock row for update
    const inventoryResult = await dbClient.query(
      "SELECT stock_on_hand, stock_reserved FROM inventory WHERE product_id = $1 FOR UPDATE",
      [productId]
    );

    if (inventoryResult.rowCount === 0) {
      await dbClient.query("ROLLBACK");
      return NextResponse.json(
        { error: "Inventory record not found for product." },
        { status: 500 }
      );
    }

    const { stock_on_hand, stock_reserved } = inventoryResult.rows[0];
    const availableStock = stock_on_hand - stock_reserved;

    if (quantity > availableStock) {
      await dbClient.query("ROLLBACK");
      return NextResponse.json(
        { error: `Insufficient stock. Only ${availableStock} units remaining.` },
        { status: 400 }
      );
    }

    // 3. Fetch delivery charge for city/area
    const areaResult = await dbClient.query(
      "SELECT is_available, delivery_charge_bdt FROM service_areas WHERE city = $1 AND area = $2 LIMIT 1",
      [city, area]
    );

    if (areaResult.rowCount === 0) {
      await dbClient.query("ROLLBACK");
      return NextResponse.json(
        { error: `Delivery service is not configured for ${area}, ${city}.` },
        { status: 400 }
      );
    }

    const serviceArea = areaResult.rows[0];
    if (!serviceArea.is_available) {
      await dbClient.query("ROLLBACK");
      return NextResponse.json(
        { error: `Delivery is currently unavailable in ${area}, ${city}.` },
        { status: 400 }
      );
    }

    const deliveryCharge = serviceArea.delivery_charge_bdt;

    // Calculate totals
    const subtotal = quantity * unitPrice;
    const total = subtotal + deliveryCharge;

    // 4. Generate order number
    const countResult = await dbClient.query(
      "SELECT count(*) FROM orders WHERE created_at >= CURRENT_DATE"
    );
    const orderCountToday = parseInt(countResult.rows[0].count, 10);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `PD-${dateStr}-${(orderCountToday + 1).toString().padStart(4, "0")}-${randomSuffix}`;

    // 5. Build WhatsApp structured message & redirect link
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801410120299";
    const whatsappMessage = `Hello Premium Daab! 🥥

I would like to confirm my order. Here are my details:

Order Number: ${orderNumber}
Name: ${customerName}
Phone: ${normalizedPhone}
Address: ${fullAddress}, ${area}, ${city}
Quantity: ${quantity} x Premium Daab (৳${unitPrice}/unit)
Subtotal: ৳${subtotal}
Delivery Fee: ৳${deliveryCharge}
Total: ৳${total}
${deliveryNote ? `\nNotes: ${deliveryNote}\n` : ""}
Please confirm my delivery! Thank you.`;

    const whatsappRedirectUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // 6. Insert new order row
    const insertOrderResult = await dbClient.query(
      `INSERT INTO orders (
        order_number, customer_name, customer_phone, city, area, full_address, 
        delivery_note, product_id, quantity, unit_price_bdt, subtotal_bdt, 
        delivery_charge_bdt, total_bdt, status, whatsapp_message, whatsapp_redirect_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'whatsapp_redirected', $14, $15)
      RETURNING id`,
      [
        orderNumber, customerName, normalizedPhone, city, area, fullAddress,
        deliveryNote, productId, quantity, unitPrice, subtotal,
        deliveryCharge, total, whatsappMessage, whatsappRedirectUrl
      ]
    );

    const orderId = insertOrderResult.rows[0].id;

    // 7. Increment stock_reserved in inventory
    await dbClient.query(
      "UPDATE inventory SET stock_reserved = stock_reserved + $1, updated_at = now() WHERE product_id = $2",
      [quantity, productId]
    );

    // 8. Log inventory movement
    await dbClient.query(
      `INSERT INTO inventory_movements (
        product_id, order_id, movement_type, quantity, note
      ) VALUES ($1, $2, 'reserved_for_order', $3, $4)`,
      [productId, orderId, quantity, `Order ${orderNumber} stock reserved.`]
    );

    // Commit transaction
    await dbClient.query("COMMIT");

    return NextResponse.json({
      success: true,
      orderNumber,
      total,
      whatsappRedirectUrl
    });

  } catch (error) {
    await dbClient.query("ROLLBACK");
    console.error("Order prepare error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred while placing your order." },
      { status: 500 }
    );
  } finally {
    dbClient.release();
  }
}
