import fastify from "fastify";

const app = fastify()

app.get("/health", async (req, reply) => {
  return {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date()
  }

})


const start = async () => {
  try {
    await app.listen({ port: 8001 })
    console.log("Orders-service is runing on port 8001");

  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

start()

export default app;