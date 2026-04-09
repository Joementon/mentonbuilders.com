import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      deliverable_title,
      session_date,
      decision,
      commentary_text,
      audio_blob_base64,
      reviewer_name,
    } = body;

    if (!deliverable_title || !session_date || !decision) {
      return NextResponse.json(
        { error: "Missing required fields: deliverable_title, session_date, decision" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SECRET_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase credentials not configured" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("dashboard_approvals")
      .insert([
        {
          deliverable_title,
          session_date,
          decision,
          commentary_text: commentary_text || null,
          audio_blob_base64: audio_blob_base64 || null,
          reviewer_name: reviewer_name || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      // Table may not exist yet — return a clear message but don't crash
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        {
          error: "Database insert failed",
          detail: error.message,
          hint: "If the table does not exist yet, run: CREATE TABLE dashboard_approvals (id uuid default gen_random_uuid() primary key, deliverable_title text not null, session_date text not null, decision text not null, commentary_text text, audio_blob_base64 text, reviewer_name text, created_at timestamptz default now());",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("dashboard-approval route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
