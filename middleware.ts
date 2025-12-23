import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        // If user is authenticated and trying to access login page, redirect to admin
        if (req.nextUrl.pathname === "/admin/login" && req.nextauth.token) {
            return NextResponse.redirect(new URL("/admin", req.url))
        }
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Allow access to login page without authentication
                if (req.nextUrl.pathname === "/admin/login") {
                    return true
                }
                // Require authentication for all other admin routes
                if (req.nextUrl.pathname.startsWith("/admin")) {
                    return !!token
                }
                return true
            },
        },
    }
)

export const config = {
    matcher: ["/admin/:path*"],
}
