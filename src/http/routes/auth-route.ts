import { appEnv } from "@src/infra/config/env";
import type { FastifyPluginOptions } from "fastify";
import { registerOpenApi, signInOpenApi } from "../openapi/autht.schema";
import type { FastifyZodType } from "../server";

export async function authRoutes(
  serverInstance: FastifyZodType,
  options: FastifyPluginOptions,
) {
  serverInstance.post(
    "/auth/register",
    {
      ...options,
      schema: { ...registerOpenApi },
    },
    async (req, replay) => {
      const createUseUseCase = req.diScope.resolve("createUserUseCase");
      await createUseUseCase.create(req.body);
      return replay.status(201).send();
    },
  );

  serverInstance.post(
    "/auth/sign-in",
    {
      ...options,
      schema: { ...signInOpenApi },
    },
    async (req, replay) => {
      const signInUseCase = req.diScope.resolve("signInUseCase");
      const token = await signInUseCase.execute(req.body);
      replay.setCookie("auth", token.accessToken, {
        httpOnly: true,
        maxAge: appEnv.COOKIE_EXPIRATION_TIME,
        path: "/",
      });
      return replay.send(token);
    },
  );
}
