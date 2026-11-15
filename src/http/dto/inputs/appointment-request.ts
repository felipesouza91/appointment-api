import dayjs from "dayjs";
import z from "zod";

export const appointmentRequest = z.object({
  clientName: z.string(),
  clientPhone: z.string(),
  scheduledAt: z.coerce
    .date()
    .refine((val) => !dayjs(val).isBefore(dayjs()), {
      error: "Scheduled date don't allow past dates",
    })
    .meta({
      description: "2026-11-13T23:00:00.000Z",
      example: "2026-11-14T23:00:00.000Z",
    }),
  userId: z.uuid(),
});
