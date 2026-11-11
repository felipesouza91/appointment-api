import { diContainer } from "@fastify/awilix";
import { GetAppointmentsUseCaseImpl } from "@src/domain/use-cases/get-appointment-use-case";
import { GetAppoitmentController } from "@src/http/controllers/get-appointments.controller";
import { asClass, Lifetime } from "awilix";

export interface ContainerInjection {
  dispose: () => void;
}

diContainer.register({
  getAppointmentsController: asClass(GetAppoitmentController, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module) => module.dispose(),
  }),
  getAppointmentsUseCase: asClass(GetAppointmentsUseCaseImpl, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module) => module.dispose(),
  }),
});

export default diContainer;
