import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  // Only protect the /admin route and /api/content route (if it's a POST/PUT)
  if (req.nextUrl.pathname.startsWith("/admin") || (req.nextUrl.pathname.startsWith("/api/content") && req.method !== "GET")) {
    const token = req.cookies.get("admin_session")?.value;

    if (!token) {
      if (req.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      if (req.nextUrl.pathname.startsWith("/api")) {
        return NextResponse.json({ message: "Invalid session" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/content/:path*"],
};
