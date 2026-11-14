import z from "zod";

export const errorResponse = z.object({
  statusCode: z.number(),
  title: z.string(),
  detail: z.string(),
  erros: z.array(z.object({ name: z.string(), detail: z.string() })).optional(),
  timestamp: z.number(),
});
