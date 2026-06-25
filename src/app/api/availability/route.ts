import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { city, area } = body;
    
    if (!city || !area) {
      return NextResponse.json(
        { error: "City and area parameters are required." },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();
    
    // Query service areas with exact matching
    const { data: serviceArea, error } = await supabase
      .from("service_areas")
      .select("*")
      .eq("city", city)
      .eq("area", area)
      .maybeSingle(); // Returns null instead of throwing on zero rows

    if (error) {
      console.error("Database query error:", error);
      return NextResponse.json(
        { error: "Failed to check service area availability." },
        { status: 500 }
      );
    }

    if (!serviceArea) {
      return NextResponse.json({
        available: false,
        message: `Premium Dab does not deliver to ${area}, ${city} yet.`
      });
    }

    if (!serviceArea.is_available) {
      return NextResponse.json({
        available: false,
        message: `Premium Dab is not available in ${area} yet. We are expanding soon!`
      });
    }

    return NextResponse.json({
      available: true,
      deliveryChargeBdt: serviceArea.delivery_charge_bdt,
      estimatedDeliveryText: serviceArea.estimated_delivery_text
    });
  } catch (error) {
    console.error("Availability API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
