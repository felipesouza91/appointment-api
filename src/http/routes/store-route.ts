import type { FastifyPluginOptions } from "fastify";
import {
  createStoreOpenApi,
  getStoreByIdPeriodsOpenApi,
  getStoreOpenApi,
} from "../openapi/store.schema";
import type { FastifyZodType } from "../server";

export async function storeRoute(
  serverInstance: FastifyZodType,
  options: FastifyPluginOptions,
) {
  serverInstance.post(
    "/store",
    {
      schema: {
        ...createStoreOpenApi,
      },
      preHandler: serverInstance.auth([serverInstance.verifyToken]),
    },
    async (req, replay) => {
      const createStoreUseCase = req.diScope.resolve("createStoreUseCase");
      const result = await createStoreUseCase.create(req.body, req.user);
      return replay.status(201).send(result);
    },
  );

  serverInstance.get(
    "/store",
    {
      schema: {
        ...getStoreOpenApi,
      },
      preHandler: serverInstance.auth([serverInstance.verifyToken]),
    },
    async (req, replay) => {
      const getStoreUseCase = req.diScope.resolve("getStoreUseCase");
      const result = await getStoreUseCase.find(req.user);
      const formated = result.map((data) => ({
        id: data.id,
        address: data.address,
        createdAt: data.createdAt,
        description: data.description,
        name: data.name,
        scheduleDuration: data.scheduleDuration,
        updatedAt: data.updatedAt,
      }));
      return replay.status(200).send(formated);
    },
  );

  serverInstance.get(
    "/store/:storeId/periods",
    {
      schema: {
        ...getStoreByIdPeriodsOpenApi,
      },
    },
    async (req, replay) => {
      const getStorePeriodById = req.diScope.resolve("getStorePeriodById");
      const result = await getStorePeriodById.find(
        req.params.storeId,
        req.query.date,
      );
      return replay.status(200).send(result);
    },
  );
}
