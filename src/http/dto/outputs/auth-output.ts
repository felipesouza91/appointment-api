import z from "zod";

export const signInResponse = z.object({
  accessToken: z.string(),
});
