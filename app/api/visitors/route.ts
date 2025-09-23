import { NextResponse } from "next/server";

const NAMESPACE = process.env.COUNTAPI_NAMESPACE || "kantinmini";
const KEY = process.env.COUNTAPI_KEY || "total_visits";
const BASE = "https://counterapi.dev/api";

// Ambil angka dari berbagai bentuk respons
function extractValue(data: any): number {
  return Number(
    data?.value ??
    data?.count ??
    data?.data?.value ??
    data?.data?.count ??
    data?.counter?.value ??
    data?.result ??
    data?.current ??
    0
  );
}

async function safeFetch(url: string, init?: RequestInit) {
  try {
    const res = await fetch(url, { cache: "no-store", ...init });
    const text = await res.text();
    let json: any = null;
    try { json = JSON.parse(text); } catch {}
    return { ok: res.ok, status: res.status, url, method: init?.method || "GET", text, json };
  } catch (e: any) {
    return { ok: false, status: 0, url, method: init?.method || "GET", text: String(e), json: null };
  }
}

export async function GET(req: Request) {
  const debug = new URL(req.url).searchParams.get("debug") === "1";
  const r = await safeFetch(`${BASE}/${NAMESPACE}/${KEY}`);
  const value = extractValue(r.json);

  // mode debug: kirim semua detail supaya kita bisa lihat bentuk JSON-nya
  if (debug) {
    return NextResponse.json({ mode: "GET", value, fetch: r });
  }
  return NextResponse.json({ value });
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";
  const force = url.searchParams.get("force") === "1";

  const cookies = req.headers.get("cookie") || "";
  const match = cookies.match(/(?:^|;\s*)v_seen=(\d+)/);
  const last = match ? Number(match[1]) : 0;
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  const shouldHit = force || !last || now - last > DAY;

  let first = await safeFetch(
    shouldHit ? `${BASE}/${NAMESPACE}/${KEY}/incr` : `${BASE}/${NAMESPACE}/${KEY}`,
    { method: shouldHit ? "POST" : "GET" }
  );

  // fallback: kalau gagal, coba GET ke /incr
  if (shouldHit && !first.ok) {
    first = await safeFetch(`${BASE}/${NAMESPACE}/${KEY}/incr`, { method: "GET" });
  }

  const value = extractValue(first.json);

  const responseBody = debug
    ? { mode: "POST", shouldHit, value, fetch: first }
    : { value };

  const resp = NextResponse.json(responseBody);

  if (shouldHit) {
    const maxAge = 30 * 24 * 60 * 60;
    resp.headers.set("Set-Cookie", `v_seen=${now}; Path=/; Max-Age=${maxAge}; SameSite=Lax`);
  }
  return resp;
}
