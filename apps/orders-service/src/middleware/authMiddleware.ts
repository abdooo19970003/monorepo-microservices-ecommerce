import clerk from "@clerk/fastify";
import { FastifyReply, FastifyRequest } from "fastify";
import { CustomJwtSessionClaims } from "@repo/types";

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

export const shouldBeAdmin = async (req: FastifyRequest, reply: FastifyReply) => {
  const auth = clerk.getAuth(req);
  if (!auth.userId) {
    return reply.status(401).send({ message: "User not authenticated" })
  }
  const claims = auth.sessionClaims as unknown as CustomJwtSessionClaims

  if (claims.metadata?.role !== "admin") {
    return reply.status(403).send({ message: "User not authorized" })
  }


}