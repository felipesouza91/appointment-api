import type { FastifyReply, FastifyRequest } from "fastify";
import { appointments } from "../../utils/faker";

export function getAppointmentController(
  req: FastifyRequest,
  replay: FastifyReply,
) {
  const { id } = req.user;

  const appointmentsUser = appointments.filter(
    (appointment) => appointment.userId === id,
  );
  console.log("aqui");
  console.log(appointments);
  replay.send(appointmentsUser);
}
