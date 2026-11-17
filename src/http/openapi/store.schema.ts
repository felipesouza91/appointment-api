import { createStoreRequest } from "../dto/inputs/store-request";
import { errorResponse } from "../dto/outputs/error-output";
import { storeResponse } from "../dto/outputs/store-response";
import { globalError } from "./global-error.schema";

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
