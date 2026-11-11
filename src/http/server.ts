import fastifyAuth from "@fastify/auth";
import { fastifyAwilixPlugin } from "@fastify/awilix";
import appDiContainer from "@src/infra/cdi/cdi-config";
import Fastify from "fastify";
import appointmentRoutes from "./routes/appointment-route";
import { verifyToken } from "./security/token-verify";
const server = Fastify({
  logger: true,
});

await server.register(fastifyAuth);

await server.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true,
  strictBooleanEnforced: true,
  container: appDiContainer,
});

server.decorate("verifyToken", verifyToken);

server.register(appointmentRoutes);

export { server };
