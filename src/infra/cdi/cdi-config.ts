import { diContainer } from "@fastify/awilix";
import { GetAppointmentsUseCaseImpl } from "@src/domain/use-cases/appointments/get-appointment-use-case";

import { asClass, Lifetime } from "awilix";

export interface ContainerInjection {
  dispose: () => void;
}

diContainer.register({
  getAppointmentsUseCase: asClass(GetAppointmentsUseCaseImpl, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module) => module.dispose(),
  }),
});

export default diContainer;
