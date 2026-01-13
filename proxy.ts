import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;
  auth();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api)(.*)", "/"],
};
