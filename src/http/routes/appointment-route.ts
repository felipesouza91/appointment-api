import type { FastifyPluginOptions } from "fastify";
import {
  createAppointment,
  getAppointmentsOpenApi,
} from "../openapi/appointments.schema";
import type { FastifyZodType } from "../server";

async function appointmentRoutes(
  serverInstance: FastifyZodType,
  options: FastifyPluginOptions,
) {
  serverInstance.get(
    "/appointments",
    {
      schema: {
        ...getAppointmentsOpenApi,
      },
      preHandler: serverInstance.auth([serverInstance.verifyToken]),
    },
    async (req, replay) => {
      const getAppointmentsUseCase = req.diScope.resolve(
        "getAppointmentsUseCase",
      );
      const result = await getAppointmentsUseCase.find(req.user);
      return replay.send(result);
    },
  );

  serverInstance.post(
    "/appointments",
    {
      schema: { ...createAppointment },
    },
    async (req, replay) => {
      const createAppointmentUseCase = req.diScope.resolve(
        "createAppointmentUseCase",
      );
      const { id, clientName, clientPhone, createdAt, scheduledAt, userId } =
        await createAppointmentUseCase.create(req.body);
      return replay.status(201).send({
        id,
        clientName,
        clientPhone,
        createdAt,
        scheduledAt,
      });
    },
  );
}

export default appointmentRoutes;
