import { diContainer } from "@fastify/awilix";
import { GetAppointmentsUseCaseImpl } from "@src/domain/use-cases/appointments/get-appointment-use-case";
import { CreateUserUseCase } from "@src/domain/use-cases/user/create-user-use-case";
import { SignInUseCase } from "@src/domain/use-cases/user/sign-in-use-case";

import { UserRespositoryImpl } from "@src/infra/db/postgres/users/user-repository-impl";
import { asClass, Lifetime } from "awilix";
import { BunCryptography } from "../protocols/bun-cryptography";
import { JwtToken } from "../protocols/jwt-token";

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
  signInUseCase: asClass(SignInUseCase, {
    lifetime: Lifetime.SINGLETON,
  }),
  crypto: asClass(BunCryptography, {
    lifetime: Lifetime.SINGLETON,
  }),
  token: asClass(JwtToken, {
    lifetime: Lifetime.SINGLETON,
  }),
});

export default diContainer;
