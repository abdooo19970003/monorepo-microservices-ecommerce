import express, { Request, Response } from "express"
import cors from "cors"
import { clerkMiddleware } from "@clerk/express"
import { shouldBeUser } from "./middleware/authMiddleware.js"

import productRouter from "./routes/product.route"
import categoryRouter from "./routes/category.route"
import { consumer, producer } from "./utils/kafka.js"


const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8000", "http://localhost:8001"],
  credentials: true
}))
app.use(clerkMiddleware())


// Routes
app.use("/products", productRouter)
app.use("/categories", categoryRouter)

// Endpoints 
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

app.get("/test", shouldBeUser, (req: Request, res: Response) => {

  console.log("/test endpoint called from products-service");

  return res.status(200).json({ message: "User is authenticated", auth: req.userId })

})


// Errors handling 
app.use((err: any, req: Request, res: Response) => {
  console.log(err);
  res.status(err?.status || 500).json({ message: err?.message || "Something went wrong on server side" })

})

const start = async () => {
  await producer.connect()
  await consumer.connect()

  app.listen(8000, () => {
    console.log("Products service is running on port 8000")
  })
}

// run the app 
start()


