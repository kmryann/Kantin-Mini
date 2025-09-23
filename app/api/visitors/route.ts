import { NextResponse } from "next/server";

const NAMESPACE = process.env.COUNTAPI_NAMESPACE || "kantinmini";
const KEY = process.env.COUNTAPI_KEY || "total_visits";
const BASE = "https://counterapi.dev/api";

export async function GET() {
  try {
    const res = await fetch(`${BASE}/${NAMESPACE}/${KEY}`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json({ value: data.value ?? 0 });
  } catch (e) {
    console.error("CounterAPI GET error:", e);
    return NextResponse.json({ value: 0 }, { status: 200 });
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const force = url.searchParams.get("force") === "1";

  const cookies = request.headers.get("cookie") || "";
  const match = cookies.match(/(?:^|;\s*)v_seen=(\d+)/);
  const last = match ? Number(match[1]) : 0;
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  const shouldHit = force || !last || now - last > DAY;

  let current = 0;
  try {
    const endpoint = shouldHit
      ? `${BASE}/${NAMESPACE}/${KEY}/incr`
      : `${BASE}/${NAMESPACE}/${KEY}`;
    const res = await fetch(endpoint, { method: "POST", cache: "no-store" });
    const data = await res.json();
    current = data.value ?? 0;
  } catch (e) {
    console.error("CounterAPI POST error:", e);
    current = 0;
  }

  const response = NextResponse.json({ value: current });

  if (shouldHit) {
    const maxAge = 30 * 24 * 60 * 60;
    response.headers.set("Set-Cookie", `v_seen=${now}; Path=/; Max-Age=${maxAge}; SameSite=Lax`);
  }

  return response;
}
