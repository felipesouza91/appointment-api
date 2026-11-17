import z from "zod";
import { appointmentRequest } from "../dto/inputs/appointment-request";
import {
  appointmentResponse,
  createAppointmentResponse,
} from "../dto/outputs/appointments-output";
import { errorResponse } from "../dto/outputs/error-output";
import { authErrors, globalError } from "./global-error.schema";

export const getAppointmentsOpenApi = {
  summary: "Get All appointments",
  tags: ["Appointments"],
  security: [{ bearerAuth: [] }],
  response: {
    200: z.array(appointmentResponse).describe("Response data data"),
    ...authErrors,
    ...globalError,
  },
};

export const createAppointment = {
  summary: "Create a appointment",
  body: appointmentRequest,
  tags: ["Appointments"],
  response: {
    201: createAppointmentResponse.describe("Create appointment success"),
    400: errorResponse.describe("Validation error"),
    ...globalError,
  },
};
