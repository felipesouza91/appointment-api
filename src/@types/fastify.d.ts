import type { Cryptography } from "@src/domain/protocols/cryptography";
import type { Token } from "@src/domain/protocols/token";
import type { UserRepository } from "@src/domain/repository/users/user-repository";
import type { CreateAppointmentUseCase } from "@src/domain/use-cases/appointments/create-appointment-use-case";
import type { GetAppointmentsUseCase } from "@src/domain/use-cases/appointments/get-appointment-use-case";
import type { CreateUserUseCase } from "@src/domain/use-cases/user/create-user-use-case";
import type { SignInUseCase } from "@src/domain/use-cases/user/sign-in-use-case";
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
    createUserUseCase: CreateUserUseCase;
    createAppointmentUseCase: CreateAppointmentUseCase;
    userRepository: UserRepository;
    appointmentRepository: AppointmentRepository;
    signInUseCase: SignInUseCase;
    crypto: Cryptography;
    token: Token;
  }
}
