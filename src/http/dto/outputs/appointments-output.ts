import z from "zod";

export const storeAppointmentResponse = z.object({
  id: z.string(),
  name: z.string(),
});

export const appointmentResponse = z.object({
  id: z.string(),
  scheduledAt: z.date(),
  createdAt: z.date(),
  clientName: z.string(),
  clientPhone: z.string(),
  store: storeAppointmentResponse,
});

export const createAppointmentResponse = z.object({
  id: z.string(),
  scheduledAt: z.date(),
  createdAt: z.date(),
  clientName: z.string(),
  clientPhone: z.string(),
});
