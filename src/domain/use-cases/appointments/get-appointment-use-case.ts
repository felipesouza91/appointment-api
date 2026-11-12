import type { Appointment } from "@src/domain/models/appointment";
import type { ContainerInjection } from "@src/infra/cdi/cdi-config";
import { appointments } from "@src/utils/faker";

export interface GetAppointmentsUseCase {
  find: (userId: string) => Promise<Appointment[]>;
}

export class GetAppointmentsUseCaseImpl implements ContainerInjection {
  constructor() {}

  async find(userId: string): Promise<Appointment[]> {
    const appointmentsUser = appointments.filter(
      (appointment) => appointment.userId === userId,
    );
    return appointmentsUser;
  }

  dispose() {}
}
