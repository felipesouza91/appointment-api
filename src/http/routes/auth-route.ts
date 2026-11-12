import type { FastifyPluginOptions } from "fastify";
import z from "zod";
import type { FastifyZodType } from "../server";

const signInSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
});

export async function authRoutes(
  serverInstance: FastifyZodType,
  options: FastifyPluginOptions,
) {
  serverInstance.post(
    "/auth/sign-in",
    { schema: { body: signInSchema } },
    async (req, replay) => {
      const createUseUseCase = req.diScope.resolve("createUserUseCase");
      await createUseUseCase.create(req.body);
      return replay.status(201);
    },
  );
}
