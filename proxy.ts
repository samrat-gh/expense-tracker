import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

const publicRoutes = ["/", "/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const isPublicRoute = publicRoutes.some((route) =>
    request.url.startsWith(route),
  );

  if (!isPublicRoute) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api)(.*)", "/"],
};
