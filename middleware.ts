import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// export default clerkMiddleware();
const isProtectedRoute = createRouteMatcher(["/"]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  else return NextResponse.next();
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
