import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/sign-in", "/sign-up"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Get session cookie
  const sessionToken = request.cookies.get("better-auth.session_token");

  // If trying to access protected route without session, redirect to sign-in
  if (!isPublicRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If signed in and trying to access auth pages, redirect to dashboard
  // if (isPublicRoute && sessionToken && pathname !== "/") {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api)(.*)", "/"],
};
