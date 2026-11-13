import type { FastifyPluginOptions } from "fastify";
import z from "zod";
import type { FastifyZodType } from "../server";

const registerSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  password: z.string(),
});

export async function authRoutes(
  serverInstance: FastifyZodType,
  options: FastifyPluginOptions,
) {
  serverInstance.post(
    "/auth/register",
    { ...options, schema: { body: registerSchema } },
    async (req, replay) => {
      const createUseUseCase = req.diScope.resolve("createUserUseCase");
      await createUseUseCase.create(req.body);
      console.log("Aqui");
      return replay.status(201).send();
    },
  );
}
