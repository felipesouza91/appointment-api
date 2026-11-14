import { AuthError } from "@src/domain/errors/auth-error";
import { InvalidUserPassword } from "@src/domain/errors/invalid-user-password";
import dayjs from "dayjs";
import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { TokenError } from "./dto/token-error";

export async function appErrorHanlder(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error.validation || (error.statusCode && error.statusCode < 500)) {
    return reply.send(error);
  }

  if (error instanceof AuthError) {
    return reply.status(400).send({
      statusCode: 400,
      title: "Authentication Error",
      detail: error.message,
      timestamp: dayjs().toDate().getTime(),
    });
  }

  if (error instanceof InvalidUserPassword) {
    return reply.status(400).send({
      statusCode: 400,
      title: "Bussines Error",
      detail: error.message,
      timestamp: dayjs().toDate().getTime(),
    });
  }

  if (error instanceof TokenError) {
    return reply.status(401).send({
      statusCode: 401,
      title: "Authentication Error",
      detail: error.message,
      timestamp: dayjs().toDate().getTime(),
    });
  }

  return reply.status(500).send({
    statusCode: 500,
    title: "Internal Server Error",
    detail: error.message,
    timestamp: dayjs().toDate().getTime(),
  });
}
