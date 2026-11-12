import type { FastifyPluginOptions } from "fastify";
import type { FastifyZodType } from "../server";

async function appointmentRoutes(
  serverInstance: FastifyZodType,
  options: FastifyPluginOptions,
) {
  serverInstance.get(
    "/appointments",
    { preHandler: serverInstance.auth([serverInstance.verifyToken]) },
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
