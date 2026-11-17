import type { FastifyPluginOptions } from "fastify";
import { createStoreOpenApi } from "../openapi/store.schema";
import type { FastifyZodType } from "../server";

export async function storeRoute(
  serverInstance: FastifyZodType,
  options: FastifyPluginOptions,
) {
  serverInstance.addHook(
    "preHandler",
    serverInstance.auth([serverInstance.verifyToken]),
  );

  serverInstance.post(
    "/store",
    {
      schema: {
        ...createStoreOpenApi,
      },
    },
    async (req, replay) => {
      const createStoreUseCase = req.diScope.resolve("createStoreUseCase");
      const result = await createStoreUseCase.create(req.body, req.user);
      return replay.status(201).send();
    },
  );
}
