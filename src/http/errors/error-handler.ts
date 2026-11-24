import { UTCDate } from "@date-fns/utc";
import { AuthError } from "@src/domain/errors/auth-error";
import { BusinessError } from "@src/domain/errors/business-error";
import { EntityNotFound } from "@src/domain/errors/entity-not-found";
import { InvalidUserPassword } from "@src/domain/errors/invalid-user-password";
import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { TokenError } from "./dto/token-error";

export async function appErrorHanlder(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  request.log.error(error.stack ? error.stack : error);
  if (error.validation || (error.statusCode && error.statusCode < 500)) {
    return reply.status(400).send({
      statusCode: error.statusCode,
      title: "Validation Error",
      detail: "Input data invalid",
      erros: error.validation?.map((item) => {
        return {
          name: item.instancePath.substring(1),
          detail: item.message!,
        };
      }),
      timestamp: new UTCDate().getTime(),
    });
  }

  if (error instanceof BusinessError) {
    return reply.status(400).send({
      statusCode: 400,
      title: "Bussines Error",
      detail: error.message,
      timestamp: new UTCDate().getTime(),
    });
  }

  if (error instanceof EntityNotFound) {
    return reply.status(400).send({
      statusCode: 400,
      title: "Entity not found",
      detail: error.message,
      timestamp: new UTCDate().getTime(),
    });
  }

  if (error instanceof AuthError) {
    return reply.status(400).send({
      statusCode: 400,
      title: "Authentication Error",
      detail: error.message,
      timestamp: new UTCDate().getTime(),
    });
  }

  if (error instanceof InvalidUserPassword) {
    return reply.status(400).send({
      statusCode: 400,
      title: "Bussines Error",
      detail: error.message,
      timestamp: new UTCDate().getTime(),
    });
  }

  if (error instanceof TokenError) {
    return reply.status(401).send({
      statusCode: 401,
      title: "Authentication Error",
      detail: error.message,
      timestamp: new UTCDate().getTime(),
    });
  }

  return reply.status(500).send({
    statusCode: 500,
    title: "Internal Server Error",
    detail: error.message,
    timestamp: new UTCDate().getTime(),
  });
}
