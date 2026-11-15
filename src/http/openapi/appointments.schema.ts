import z from "zod";
import { appointmentRequest } from "../dto/inputs/appointment-request";
import { appointmentResponse } from "../dto/outputs/appointments-output";
import { errorResponse } from "../dto/outputs/error-output";
import { globalError } from "./global-error.schema";

export const getAppointmentsOpenApi = {
  summary: "Get All appointments",
  tags: ["Appointments"],
  security: [{ bearerAuth: [] }],
  response: {
    200: z.array(appointmentResponse).describe("Response data data"),
    ...globalError,
  },
};

export const createAppointment = {
  summary: "Create a appointment",
  body: appointmentRequest,
  tags: ["Appointments"],
  response: {
    201: appointmentResponse.describe("Create appointment success"),
    400: errorResponse.describe("Validation error"),
    ...globalError,
  },
};
