// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = { matcher: ["/visitor", "/visitor/:path*"] };

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Biarkan route lain lewat
  if (!pathname.startsWith("/visitor")) return NextResponse.next();

  const auth = req.headers.get("authorization") ?? "";
  const user = process.env.BASIC_USER ?? "";
  const pass = process.env.BASIC_PASS ?? "";

  // Kalau env belum diset, biar tidak mengunci kamu saat dev:
  const allowNoEnvInDev =
    process.env.NODE_ENV !== "production" && !user && !pass;

  if (allowNoEnvInDev) return NextResponse.next();

  if (!auth.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
    });
  }

  // Decode "Basic base64(username:password)" pakai atob (Edge-safe)
  let decoded = "";
  try {
    const base64 = auth.split(" ")[1] ?? "";
    decoded = atob(base64);
  } catch {
    return new NextResponse("Invalid auth header", { status: 400 });
  }

  const sep = decoded.indexOf(":");
  const u = sep >= 0 ? decoded.slice(0, sep) : "";
  const p = sep >= 0 ? decoded.slice(sep + 1) : "";

  if (u === user && p === pass) return NextResponse.next();

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
  });
}
