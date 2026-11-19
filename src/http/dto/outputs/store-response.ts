import { DayEnum } from "@src/domain/models/store";
import z from "zod";

export const storeResumeResponse = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  address: z.string(),
  scheduleDuration: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export const storeDayConfigResponse = z.object({
  id: z.string(),
  day: z.enum(DayEnum),
  startHour: z.string(),
  endHour: z.string(),
});

export const storeResponse = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  address: z.string(),
  scheduleDuration: z.number(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  configurations: z.array(storeDayConfigResponse).optional(),
});

export const storePeriod = z.object({
  date: z.date(),
  available: z.boolean(),
});
