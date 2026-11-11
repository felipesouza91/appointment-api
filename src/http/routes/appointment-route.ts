import { GetAppointmentsUseCaseImpl } from "@src/domain/use-cases/get-appointment-use-case";
import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import { GetAppoitmentController } from "../controllers/get-appointments.controller";

async function appointmentRoutes(
  serverInstance: FastifyInstance,
  options: FastifyPluginOptions,
) {
  const getAppointmentUseCase = new GetAppointmentsUseCaseImpl();
  const getAppointmentController = new GetAppoitmentController(
    getAppointmentUseCase,
  );

  serverInstance.get(
    "/appointments",
    { preHandler: serverInstance.auth([serverInstance.verifyToken]) },
    (req, replay) => {
      return getAppointmentController.execute(req, replay);
    },
  );
}

export default appointmentRoutes;
