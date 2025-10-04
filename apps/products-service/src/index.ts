import express, { Request, Response } from "express"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:8000", "http://localhost:8001"]
  ,
  credentials: true
}))

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

app.listen(8000, () => {
  console.log("Products service is running on port 8000")
})


