import express, { NextFunction } from "express"
import cors from "cors"
import { Request, Response } from "express"
import { clerkMiddleware } from "@clerk/express"
import UserRouter from "./routes/user.route"
import { producer } from "./utils/kafka"
const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:8000", "http://localhost:8001"],
  credentials: true
}))
app.use(clerkMiddleware())


// Routers 
app.use("/users", UserRouter)



// Endpoints 
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})

app.get("/test", (req: Request, res: Response) => {

  console.log("/test endpoint called from products-service");

  return res.status(200).json({ message: "User is authenticated" })

})



// Errors handling 
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Something went wrong on the server side" });
});


const port = process.env.PORT || 8003
const start = async () => {
  try {
    await producer.connect();
    console.log("Kafka producer connected");
    app.listen(port, () => {
      console.log("Authantication service is running on port: " + port);
    })
  }
  catch (err) {
    console.log(err);

  }
}
start()