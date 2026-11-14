import z from "zod";
import { registerSchema, signInSchema } from "../dto/inputs/auth-input";
import { signInResponse } from "../dto/outputs/auth-output";
import { errorResponse } from "../dto/outputs/error-output";

export const registerOpenApi = {
  body: registerSchema,
  description: "Create a user",
  tags: ["Authenticate"],
  response: {
    201: z.undefined().describe("User create with success"),
  },
};

export const signInOpenApi = {
  body: signInSchema,
  description: "Generate acesso token",
  tags: ["Authenticate"],
  response: {
    200: signInResponse.describe("Acess code token"),
    400: errorResponse.describe("Sign in erro merssage"),
  },
};
