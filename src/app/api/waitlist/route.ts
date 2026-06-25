import { NextResponse } from "next/server";
import { getDbPool } from "@/lib/supabase/pg-pool";
import { bdPhoneRegex, normalizePhoneNumber } from "@/lib/validation/order";

export async function POST(request: Request) {
  const pool = getDbPool();
  const dbClient = await pool.connect();

  try {
    const body = await request.json().catch(() => ({}));
    const { name, phone, city, area } = body;

    if (!phone || !city || !area) {
      return NextResponse.json(
        { error: "Phone number, city, and area are required." },
        { status: 400 }
      );
    }

    if (!bdPhoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid Bangladeshi mobile number (e.g. 01712345678)." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhoneNumber(phone);

    await dbClient.query(
      `INSERT INTO waitlist (name, phone, city, area) VALUES ($1, $2, $3, $4)`,
      [name || null, normalizedPhone, city, area]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred while joining the waitlist." },
      { status: 500 }
    );
  } finally {
    dbClient.release();
  }
}
