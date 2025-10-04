import express, { Request, Response } from "express"
import cors from "cors"
import { clerkClient, clerkMiddleware, getAuth, requireAuth } from "@clerk/express"
import { shouldBeUser } from "./middleware/authMiddleware.js"

const app = express()

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8000", "http://localhost:8001"]
  ,
  credentials: true
}))
app.use(clerkMiddleware())

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




app.listen(8000, () => {
  console.log("Products service is running on port 8000")
})


