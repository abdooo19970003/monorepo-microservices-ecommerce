import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

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

