import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import type { Variables } from "hono/types";

export const shouldBeUser = createMiddleware<{ Variables: { userId: string } }>(async (c, next) => {
  const auth = getAuth(c)
  if (!auth?.userId) {
    return c.json({ message: "User is not authenticated" }, 401)
  } else {
    c.set('userId', auth.userId)
    await next()
  }
})