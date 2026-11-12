import fastifyAuth from "@fastify/auth";
import { fastifyAwilixPlugin } from "@fastify/awilix";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "@fastify/type-provider-zod";
import appDiContainer from "@src/infra/cdi/cdi-config";
import Fastify, {
  type FastifyBaseLogger,
  type FastifyInstance,
  type RawReplyDefaultExpression,
  type RawRequestDefaultExpression,
  type RawServerDefault,
} from "fastify";
import appointmentRoutes from "./routes/appointment-route";
import { authRoutes } from "./routes/auth-route";
import { verifyToken } from "./security/token-verify";

export type FastifyZodType = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>;

const server = Fastify({
  logger: true,
});

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.withTypeProvider<ZodTypeProvider>();
await server.register(fastifyAuth);

await server.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true,
  strictBooleanEnforced: true,
  container: appDiContainer,
});

server.decorate("verifyToken", verifyToken);

server.register(appointmentRoutes);
server.register(authRoutes);

export { server };
