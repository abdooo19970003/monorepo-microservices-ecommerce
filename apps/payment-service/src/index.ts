import { clerkMiddleware } from '@hono/clerk-auth'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { shouldBeUser } from './middleware/authMiddleware.js'
import { sessionRoute } from './routes/session.route.js'
import { cors } from 'hono/cors'
import { webhookRoute } from './routes/webhooks.route.js'
import { consumer, producer } from './utils/kafka.js'
import { runKafkaSubscribtion } from './utils/subscribtions.js'

const app = new Hono()
app.use('*', clerkMiddleware())
app.use('*', cors({
  origin: ['http://localhost:3000',],
  credentials: true,
}))

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
app.route("/session", sessionRoute)
app.route("/webhook", webhookRoute)


// app.get("/pay", shouldBeUser, async (c) => {
//   console.log("/pay endpoint called from payment-service");
//   const { products } = await c.req.json()
//   console.log(products);
//   const totalPrice = await Promise.all(
//     products.map(async (product: any) => {
//       const res = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products/${product.id}`)
//       const productInDb = await res.json()
//       return productInDb.price * product.quantity
//     })
//   )
// })



// app.post("/create-stripe-product", async (c) => {
//   const res = await stripe.products.create({
//     name: "Test Product",
//     default_price_data: {
//       currency: "usd",
//       unit_amount: 10 * 100,
//     },
//   })
//   console.log(res);
//   return c.json(res)
// })

// app.get("/stripe-product-price", async (c) => {
//   const res = await stripe.prices.list({
//     product: "prod_TBB08xVOEglnuP"
//   })
//   console.log(res);
//   return c.json(res)
// })

// app.get("/seed-stripe", async (c) => {
//   try {
//     const res = await fetch(`${process.env.PRODUCT_SERVICE_URL}/products`);
//     const products = await res.json();
//     console.log(products);

//     for (const product of products) {
//       const stripeProduct = {
//         name: product.name,
//         default_price_data: {
//           currency: "usd",
//           unit_amount: product.price * 100,
//         },
//         metadata: {
//           productId: String(product.id),
//         },
//         description: product.description,
//         category: product.category,
//       };

//       try {
//         const stripeRes = await stripe.products.create(stripeProduct);
//         console.log({
//           message: `PRODUCT CREATED IN STRIPE: ${product.name}`,
//           stripeRes,
//         });
//       } catch (error) {
//         console.error("Error creating product in Stripe:", error);
//         // optional: continue loop or throw
//       }
//     }

//     return c.json({ message: "PRODUCTS CREATED IN STRIPE" });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return c.json(
//       { message: "ERROR FETCHING DATA FROM PRODUCT SERVICE", error },
//       500
//     );
//   }
// });


const start = async () => {
  try {
    Promise.all([
      await producer.connect(),
      await consumer.connect()
    ])
    await runKafkaSubscribtion()
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

