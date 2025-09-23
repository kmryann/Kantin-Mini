// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Lindungi hanya /visitor (dan turunannya)
  if (!pathname.startsWith("/visitor")) return NextResponse.next();

  const auth = req.headers.get("authorization");
  const user = process.env.ADMIN_USER || "admin";
  const pass = process.env.ADMIN_PASS || "password";

  // Jika belum ada header Authorization -> minta login
  if (!auth?.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Protected"',
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
      },
    });
  }

  // Edge-safe decoding
  const base64 = auth.split(" ")[1] || "";
  const decoded = atob(base64);            // <— pakai atob, bukan Buffer
  const [u, p] = decoded.split(":");

  if (u === user && p === pass) {
    const res = NextResponse.next();
    // Pastikan response ini juga tidak dicache
    res.headers.set("Cache-Control", "no-store");
    return res;
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = { matcher: ["/visitor", "/visitor/:path*"] };
