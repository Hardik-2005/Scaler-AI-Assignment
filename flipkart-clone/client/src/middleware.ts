import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the routes that strictly require authentication
const isProtectedRoute = createRouteMatcher([
  "/cart(.*)",
  "/checkout(.*)",
  "/orders(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // If the user tries to access a protected route without being authenticated,
  // they will be redirected to the sign-in page.
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};