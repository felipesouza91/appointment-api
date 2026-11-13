import { diContainer } from "@fastify/awilix";
import { GetAppointmentsUseCaseImpl } from "@src/domain/use-cases/appointments/get-appointment-use-case";
import { CreateUserUseCase } from "@src/domain/use-cases/user/create-user-use-case";

import { UserRespositoryImpl } from "@src/infra/db/postgres/users/user-repository-impl";
import { asClass, Lifetime } from "awilix";
import { BunCryptography } from "../protocols/bun-cryptography";

export interface ContainerInjection {
  dispose: () => void;
}

diContainer.register({
  userRepository: asClass(UserRespositoryImpl, {
    lifetime: Lifetime.SINGLETON,
  }),
  createUserUseCase: asClass(CreateUserUseCase, {
    lifetime: Lifetime.SINGLETON,
  }),
  getAppointmentsUseCase: asClass(GetAppointmentsUseCaseImpl, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module) => module.dispose(),
  }),
  crypto: asClass(BunCryptography, {
    lifetime: Lifetime.SINGLETON,
  }),
});

export default diContainer;
