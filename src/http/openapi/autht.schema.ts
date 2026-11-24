import z from "zod";
import { registerSchema, signInSchema } from "../dto/inputs/auth-input";
import { signInResponse } from "../dto/outputs/auth-output";
import { errorResponse } from "../dto/outputs/error-output";
import { globalError } from "./global-error.schema";

export const registerOpenApi = {
  summary: "Create account",
  body: registerSchema,
  description: "Create a user",
  tags: ["Authenticate"],
  response: {
    201: z.undefined().describe("User create with success"),
    400: errorResponse.describe("Validation error"),
    ...globalError,
  },
};

export const signInOpenApi = {
  summary: "Authentication application",
  body: signInSchema,
  description: "Generate acesso token",
  tags: ["Authenticate"],
  response: {
    200: signInResponse.describe("Acess code token"),
    400: errorResponse.describe("Authentication error"),
    ...globalError,
  },
};
