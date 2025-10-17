import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import clerk from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { orderRoute } from "./routes/order.route.js";
import { ConnectOrderDb } from "@repo/orders-db";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscribtion } from "./utils/subscribitions.js";

const fastify = Fastify()

fastify.register(clerk.clerkPlugin)
fastify.register(orderRoute)

fastify.get("/health", async (req, reply) => {
  return {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date()
  }

})


fastify.get("/test", { preHandler: [shouldBeUser] }, async (req: FastifyRequest, reply: FastifyReply) => {
  console.log("/test endpoint called from orders-service");

  return { message: "User is authenticated", auth: req.userId }


})

const start = async () => {
  try {
    Promise.all([
      await ConnectOrderDb(),
      await producer.connect(),
      await consumer.connect()
    ])
    await runKafkaSubscribtion()
    await fastify.listen({ port: 8001 })
    console.log("Orders-service is runing on port 8001");

  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

start()

export default fastify;