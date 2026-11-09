import { faker } from "@faker-js/faker";
import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import { users } from "../../utils/faker";

export const verifyToken = (
  req: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) => {
  req.user = faker.helpers.arrayElement(users);

  done();
};
