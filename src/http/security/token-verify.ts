import { faker } from "@faker-js/faker";
import { users } from "@src/utils/faker";
import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";

export const verifyToken = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  req.user = faker.helpers.arrayElement(users);

  done();
};
