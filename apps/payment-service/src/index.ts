import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { shouldBeUser } from './middleware/authMiddleware.js'

const app = new Hono()
app.use('*', clerkMiddleware())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.get("/health", async (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date()
  })
})
app.get("/test", shouldBeUser, async (c) => {
  console.log("/test endpoint called from payment-service");

  return c.json({ message: "User is authenticated", auth: c.get('userId') })
})



const start = async () => {
  try {
    serve({
      fetch: app.fetch,
      port: 8002
    }, (info) => {
      console.log(`Payment service is running on port ${info.port}`)
    })

  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}
start()

