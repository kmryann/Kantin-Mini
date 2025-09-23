import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Proteksi hanya /visitor (dan turunannya)
  if (!pathname.startsWith("/visitor")) return NextResponse.next();

  const auth = req.headers.get("authorization");
  const user = process.env.ADMIN_USER || "admin";
  const pass = process.env.ADMIN_PASS || "password";

  if (!auth?.startsWith("Basic ")) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
    });
  }

  const base64 = auth.split(" ")[1] || "";
  const [u, p] = Buffer.from(base64, "base64").toString().split(":");

  if (u === user && p === pass) return NextResponse.next();

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
  });
}

export const config = { matcher: ["/visitor", "/visitor/:path*"] };
