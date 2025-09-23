import { NextResponse } from "next/server";

const NAMESPACE = process.env.COUNTAPI_NAMESPACE || "kantinmini";
const KEY = process.env.COUNTAPI_KEY || "total_visits";
const BASE = "https://api.countapi.xyz";

export async function GET() {
  try {
    const res = await fetch(`${BASE}/get/${NAMESPACE}/${KEY}`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json({ value: data.value ?? 0 });
  } catch {
    return NextResponse.json({ value: 0 }, { status: 200 });
  }
}

export async function POST(request: Request) {
  const cookies = request.headers.get("cookie") || "";
  const match = cookies.match(/(?:^|;\s*)v_seen=(\d+)/);
  const last = match ? Number(match[1]) : 0;
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  const shouldHit = !last || now - last > DAY;

  let current = 0;
  try {
    const url = shouldHit
      ? `${BASE}/hit/${NAMESPACE}/${KEY}`
      : `${BASE}/get/${NAMESPACE}/${KEY}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    current = data.value ?? 0;
  } catch {
    current = 0;
  }

  const response = NextResponse.json({ value: current });

  if (shouldHit) {
    const maxAge = 30 * 24 * 60 * 60;
    response.headers.set("Set-Cookie", `v_seen=${now}; Path=/; Max-Age=${maxAge}; SameSite=Lax`);
  }

  return response;
}
