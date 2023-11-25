import { decode } from "jsonwebtoken";
import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/admin-panel")) {
    const token = request.nextUrl.searchParams.get("token");
    const cookieToken = request.cookies.get("__admin_token");
    if (!cookieToken)
      return NextResponse.redirect("https://ashofy.com/admin-login");
    const decodedToken = decode(cookieToken.value);
    if (!decodedToken)
      return NextResponse.redirect("https://ashofy.com/admin-login");
    if (token !== decodedToken) {
      return NextResponse.redirect("https://ashofy.com/admin-login");
    }
    return;
  }
  if (request.nextUrl.pathname.startsWith("/account/:path*")) {
    const checkCookie = request.cookies.has("next-auth.session-token");
    if (!checkCookie) {
      return NextResponse.redirect("https://ashofy.com/login");
    }
  }
}

export const config = {
  matcher: ["/account", "/account/:path*", "/admin-panel"],
};
