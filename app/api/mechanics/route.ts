import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get("specialty");
  const limit = Math.min(Number(searchParams.get("limit") || 20), 50);

  let query = supabaseAdmin
    .from("mechanics")
    .select("id, full_name, business_name, specialties, service_radius_km, latitude, longitude, verified, rating_average, rating_count")
    .eq("verified", true)
    .limit(limit);

  if (specialty) query = query.contains("specialties", [specialty]);

  const { data, error } = await query.order("rating_average", { ascending: false });
  if (error) return NextResponse.json({ error: "Unable to load mechanics" }, { status: 500 });

  return NextResponse.json({ mechanics: data ?? [] });
}
