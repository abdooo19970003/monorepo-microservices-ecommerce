import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import { type CustomJwtSessionClaims } from "@repo/types";

export const shouldBeUser = createMiddleware<{ Variables: { userId: string } }>(async (c, next) => {
  const auth = getAuth(c)
  if (!auth?.userId) {
    return c.json({ message: "User is not authenticated" }, 401)
  } else {
    c.set('userId', auth.userId)
    await next()
  }
})

export const shouldBeAdmin = createMiddleware<{ Variables: { userId: string } }>(async (c, next) => {
  const auth = getAuth(c)
  if (!auth?.userId)
    return c.json({ message: "User is not authenticated" }, 401)
  const claims = auth.sessionClaims as unknown as CustomJwtSessionClaims
  if (claims.metadata?.role !== "admin") {
    return c.json({ message: "User is not authorized" }, 403)
  } else {
    c.set('userId', auth.userId)
    await next()
  }


})