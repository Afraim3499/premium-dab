import { NextResponse } from "next/server";
import { z } from "zod";
import { getDbPool } from "@/lib/supabase/pg-pool";
import { bdPhoneRegex, normalizePhoneNumber } from "@/lib/validation/order";

const bulkInquirySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(100, { message: "Name must not exceed 100 characters." })
    .trim(),
  phone: z
    .string()
    .trim()
    .refine((val) => bdPhoneRegex.test(val), {
      message: "Please enter a valid Bangladeshi mobile number (e.g. 01712345678).",
    }),
  eventType: z
    .string()
    .min(2, { message: "Event type must be at least 2 characters." })
    .trim(),
  eventDate: z
    .string()
    .min(2, { message: "Event date is required." })
    .trim(),
  quantity: z
    .number()
    .int()
    .min(10, { message: "Minimum quantity for event bulk orders is 10 units." }),
  location: z
    .string()
    .min(5, { message: "Please specify the event location details." })
    .trim(),
  message: z
    .string()
    .max(1000, { message: "Message must not exceed 1000 characters." })
    .optional()
    .nullable()
    .or(z.literal("")),
});

export async function POST(request: Request) {
  const pool = getDbPool();
  const dbClient = await pool.connect();

  try {
    const body = await request.json().catch(() => ({}));
    const validation = bulkInquirySchema.safeParse(body);

    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid input data.";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, phone, eventType, eventDate, quantity, location, message } = validation.data;
    const normalizedPhone = normalizePhoneNumber(phone);

    // 1. Save to Supabase `bulk_inquiries` table
    await dbClient.query(
      `INSERT INTO bulk_inquiries (name, phone, event_type, event_date, quantity, location, message, status) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'new')`,
      [name, normalizedPhone, eventType, eventDate, quantity, location, message || null]
    );

    // 2. Generate WhatsApp redirection URL
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801410120299";
    const whatsappMessage = `Hello Premium Dab! 🥥

I would like to inquire about a bulk/event order. Here are my details:

Name: ${name}
Phone: ${normalizedPhone}
Event Type: ${eventType}
Event Date: ${eventDate}
Estimated Quantity: ${quantity} units
Location: ${location}
${message ? `\nMessage: ${message}\n` : ""}
Please contact me to discuss pricing and setup. Thank you!`;

    const whatsappRedirectUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json({
      success: true,
      whatsappRedirectUrl,
    });
  } catch (error) {
    console.error("Bulk inquiry API error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred while processing your bulk inquiry request." },
      { status: 500 }
    );
  } finally {
    dbClient.release();
  }
}
