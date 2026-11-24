import z from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  password: z.string(),
});

export const signInSchema = z.object({
  email: z.email(),
  password: z.string(),
});
