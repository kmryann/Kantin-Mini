import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const COUNTER_ID = process.env.COUNTER_ID || "total_visits";
const DAY_MS = 24 * 60 * 60 * 1000;

export async function GET() {
  const { data, error } = await supabase.rpc("get_count", { p_id: COUNTER_ID });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ value: (data as number) ?? 0 });
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const force = searchParams.get("force") === "1";

  // Baca cookie throttle
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/(?:^|;\s*)v_seen=(\d+)/);
  const last = match ? Number(match[1]) : 0;
  const now = Date.now();
  const shouldHit = force || !last || now - last > DAY_MS;

  if (shouldHit) {
    const { error } = await supabase.rpc("increment_count", { p_id: COUNTER_ID });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Ambil nilai terbaru untuk ditampilkan di UI
  const { data: v, error: err2 } = await supabase.rpc("get_count", { p_id: COUNTER_ID });
  if (err2) return NextResponse.json({ error: err2.message }, { status: 500 });

  const res = NextResponse.json({
    value: (v as number) ?? 0,
    shouldHit,
    mode: "POST"
  });

  // Set cookie jika baru dihitung
  if (shouldHit) {
    res.headers.set(
      "Set-Cookie",
      `v_seen=${now}; Path=/; Max-Age=${30 * 24 * 60 * 60}; SameSite=Lax`
    );
  }

  return res;
}
