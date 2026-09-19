import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, customerId, rating, review, recommended } = body;

    if (!jobId || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "jobId and a rating from 1 to 5 are required" }, { status: 400 });
    }

    const { data: job, error: jobError } = await supabaseAdmin
      .from("jobs")
      .select("id, mechanic_id, customer_id, service_type, status")
      .eq("id", jobId)
      .single();

    if (jobError || !job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    if (job.status !== "completed") return NextResponse.json({ error: "Only completed jobs can be rated" }, { status: 409 });
    if (customerId && job.customer_id && customerId !== job.customer_id) {
      return NextResponse.json({ error: "You cannot rate this job" }, { status: 403 });
    }

    const { data, error } = await supabaseAdmin
      .from("mechanic_ratings")
      .insert({
        job_id: job.id,
        mechanic_id: job.mechanic_id,
        customer_id: customerId ?? job.customer_id ?? null,
        service_type: job.service_type,
        rating,
        review: review?.trim() || null,
        recommended: Boolean(recommended),
      })
      .select("id, mechanic_id, job_id, service_type, rating, review, recommended, created_at")
      .single();

    if (error) {
      if (error.code === "23505") return NextResponse.json({ error: "This completed job has already been rated" }, { status: 409 });
      throw error;
    }

    return NextResponse.json({ rating: data }, { status: 201 });
  } catch (error) {
    console.error("rating create failed", error);
    return NextResponse.json({ error: "Unable to save rating" }, { status: 500 });
  }
}
