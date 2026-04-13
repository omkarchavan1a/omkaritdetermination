import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Check credentials (hardcoded as requested)
    if (email === "omkarchavan@gmail.com" && password === "736200") {
      // Create a JWT token using jose
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_super_secret_key_123");
      const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(secret);

      // Create response and set HTTP-only cookie
      const response = NextResponse.json({ success: true }, { status: 200 });
      response.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
