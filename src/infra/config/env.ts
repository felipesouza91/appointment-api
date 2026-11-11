import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url().min(1),
});

export const appEnv = envSchema.parse(process.env);
