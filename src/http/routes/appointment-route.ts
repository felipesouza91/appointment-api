import type { FastifyPluginOptions } from "fastify";
import z from "zod";
import type { FastifyZodType } from "../server";

const appointmentSchema = z.object({
  id: z.string(),
  scheduledAt: z.date(),
  createdAt: z.date(),
  clientName: z.string(),
  clientPhone: z.string(),
  userId: z.string(),
});

async function appointmentRoutes(
  serverInstance: FastifyZodType,
  options: FastifyPluginOptions,
) {
  serverInstance.get(
    "/appointments",
    {
      schema: {
        summary: "Get All appointments",
        tags: ["Appointments"],
        response: {
          200: z.array(appointmentSchema).describe("Response data data"),
        },
      },
      preHandler: serverInstance.auth([serverInstance.verifyToken]),
    },
    async (req, replay) => {
      const getAppointmentsUseCase = req.diScope.resolve(
        "getAppointmentsUseCase",
      );
      const result = await getAppointmentsUseCase.find("1");
      return replay.send(result);
    },
  );
}

export default appointmentRoutes;
