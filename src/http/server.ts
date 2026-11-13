import fastifyAuth from "@fastify/auth";
import { fastifyAwilixPlugin } from "@fastify/awilix";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import {
  jsonSchemaTransform,
  jsonSchemaTransformObject,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "@fastify/type-provider-zod";

import appDiContainer from "@src/infra/cdi/cdi-config";

import Fastify, {
  type FastifyBaseLogger,
  type FastifyError,
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

await server.register(fastifySwagger, {
  openapi: {
    info: { title: "My API", version: "1.0.0" },
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  transform: jsonSchemaTransform,
  transformObject: jsonSchemaTransformObject,
});

await server.register(fastifySwaggerUi, { routePrefix: "/docs" });

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

server.setErrorHandler(function (error: FastifyError, request, reply) {
  if (error.validation || (error.statusCode && error.statusCode < 500)) {
    return reply.send(error);
  }
  console.log(error);
  this.log.error({ err: error }, "unhandled error");
  return reply.status(500).send({
    statusCode: 500,
    error: "Internal Server Error",
    message: "Internal Server Error",
  });
});

export { server };
