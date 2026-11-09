import fastifyAuth from "@fastify/auth";
import Fastify from "fastify";
import { getAppointmentController } from "./controllers/get-appointments.controller";
import { verifyToken } from "./security/token-verify";

const server = Fastify({
  logger: true,
});

await server.register(fastifyAuth);
server.decorate("verifyToken", verifyToken);

server.get(
  "/appointments",
  { preHandler: server.auth([server.verifyToken]) },
  getAppointmentController,
);

export { server };
