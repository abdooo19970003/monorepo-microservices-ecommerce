import clerk from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}



export const shouldBeUser = async (req: FastifyRequest, reply: FastifyReply) => {
  const auth = clerk.getAuth(req);
  if (!auth.userId) {
    return reply.status(401).send({ message: "User not authenticated" })
  }
  req.userId = auth.userId;
}