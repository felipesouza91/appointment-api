import fastifyAuth from "@fastify/auth";
import Fastify from "fastify";
import appointmentRoutes from "./routes/appointment-route";
import { verifyToken } from "./security/token-verify";

const server = Fastify({
  logger: true,
});

await server.register(fastifyAuth);
server.decorate("verifyToken", verifyToken);

server.register(appointmentRoutes);

export { server };
