import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isLogin = req.nextUrl.pathname.startsWith("/login");
  const isAPI = req.nextUrl.pathname.startsWith("/api"); // Allow API calls

  // Bypass authentication for API requests
  if (isAPI) {
    return NextResponse.next();
  }

  // If not logged in, redirect to login when accessing dashboard
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If already logged in, prevent accessing login page
  if (token && isLogin) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/api/predict"],
};
