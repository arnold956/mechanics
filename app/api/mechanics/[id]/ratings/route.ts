import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabaseAdmin
    .from("mechanic_ratings")
    .select("id, service_type, rating, review, recommended, created_at")
    .eq("mechanic_id", id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: "Unable to load reviews" }, { status: 500 });
  return NextResponse.json({ reviews: data ?? [] });
}
