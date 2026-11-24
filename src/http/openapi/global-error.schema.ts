import { errorResponse } from "../dto/outputs/error-output";

export const globalError = {
  500: errorResponse.describe("Internal server error"),
};

export const authErrors = {
  401: errorResponse.describe("Authentication error"),
};
