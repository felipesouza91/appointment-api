import { UTCDate } from "@date-fns/utc";
import z from "zod";
import { createStoreRequest } from "../dto/inputs/store-request";
import { errorResponse } from "../dto/outputs/error-output";
import {
  storePeriod,
  storeResponse,
  storeResumeResponse,
} from "../dto/outputs/store-response";
import { authErrors, globalError } from "./global-error.schema";

export const createStoreOpenApi = {
  summary: "Create a Store",
  body: createStoreRequest,
  security: [{ bearerAuth: [] }],
  description: "Create a store",
  tags: ["Store"],
  response: {
    201: storeResponse.describe("Create a store"),
    400: errorResponse.describe("Validation error"),
    ...globalError,
  },
};

export const getStoreOpenApi = {
  summary: "Get users Stores",
  security: [{ bearerAuth: [] }],
  description: "Get users Stores",
  tags: ["Store"],
  response: {
    200: z.array(storeResumeResponse).describe("Create a store"),
    ...authErrors,
    ...globalError,
  },
};

export const getStoreByIdPeriodsOpenApi = {
  params: z.object({
    storeId: z.uuid(),
  }),
  querystring: z.object({
    date: z.coerce.date().optional().default(new UTCDate()),
  }),
  summary: "Get store appointments",
  description: "Get store appointments",
  tags: ["Store"],
  response: {
    200: z.array(storePeriod).describe("Store appointments periods"),
    ...authErrors,
    ...globalError,
  },
};
