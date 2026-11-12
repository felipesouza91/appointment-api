import type { GetAppointmentsUseCase } from "@src/domain/use-cases/appointments/get-appointment-use-case";
import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    verifyToken: (
      req: FastifyRequest,
      reply: FastifyReply,
      done: HookHandlerDoneFunction,
    ) => void;
  }
  interface FastifyRequest {
    user: {
      id: string;
    };
  }
}

declare module "@fastify/awilix" {
  interface Cradle {
    getAppointmentsUseCase: GetAppointmentsUseCase;
  }
}
