import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url().min(1),
  TOKEN_SECRET: z.string().min(64),
  TOKEN_EXPIRATION_TIME: z.coerce.number().min(1),
  COOKIE_SECRET: z.string(),
  COOKIE_EXPIRATION_TIME: z.coerce.number().min(1),
});

export const appEnv = envSchema.parse(process.env);
