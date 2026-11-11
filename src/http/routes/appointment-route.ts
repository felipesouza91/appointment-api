import type { FastifyInstance, FastifyPluginOptions } from "fastify";

async function appointmentRoutes(
  serverInstance: FastifyInstance,
  options: FastifyPluginOptions,
) {
  serverInstance.get(
    "/appointments",
    { preHandler: serverInstance.auth([serverInstance.verifyToken]) },
    (req, replay) => {
      const getAppointmentsController = req.diScope.resolve(
        "getAppointmentsController",
      );

      return getAppointmentsController.execute(req, replay);
    },
  );
}

export default appointmentRoutes;
