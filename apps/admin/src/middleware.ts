import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { type CustomJwtSessionClaims } from "@repo/types"

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-out(.*)",
  "/forget-my-password(.*)",
  "/unauthorized"

])
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()

    const { userId, sessionClaims } = await auth()

    if (!userId || !sessionClaims) {
      await auth.protect()
    }

    const userRole = (sessionClaims as unknown as CustomJwtSessionClaims).metadata.role

    if (userRole !== "admin") {
      return Response.redirect(new URL("/unauthorized", req.url), 302)
    }


  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}