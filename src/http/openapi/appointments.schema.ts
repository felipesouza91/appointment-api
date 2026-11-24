import { UTCDate } from "@date-fns/utc";
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
  description:
    "Get all appointments from a user. Default result is basesd in current day",
  tags: ["Appointments"],
  querystring: z.object({
    date: z.coerce
      .date()
      .refine((val) => new UTCDate(val))
      .optional()
      .default(new UTCDate()),
    storeId: z.uuid().optional(),
  }),
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
