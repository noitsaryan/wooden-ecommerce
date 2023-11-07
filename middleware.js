import { NextResponse } from "next/server";
export { default } from "next-auth/middleware";

export async function middleware(request) {
    if (request.nextUrl.pathname.startsWith("/admin-panel")) {
        const token = request.url.lastIndexOf("=");
        const slicedURL = request.url.slice(token + 1);
        const cookieToken = request.cookies.get('__admin_token')
            
        if(slicedURL !== cookieToken?.value) {
            return NextResponse.redirect('http://localhost:3000/admin-login')
        }
        return;
    }
    if(request.nextUrl.pathname.startsWith("/dashboard")){
        const checkCookie = request.cookies.has('next-auth.session-token')
        if(!checkCookie){
            return NextResponse.redirect('http://localhost:3000/login')
        }
    }
}

export const config = {
  matcher: ["/dashboard", "/admin-panel"],
};