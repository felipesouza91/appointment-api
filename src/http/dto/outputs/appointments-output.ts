import z from "zod";

export const appointmentResponse = z.object({
  id: z.string(),
  scheduledAt: z.date(),
  createdAt: z.date(),
  clientName: z.string(),
  clientPhone: z.string(),
  userId: z.string(),
});
