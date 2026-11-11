import type { Appointment } from "@src/domain/models/appointment";
import { appointments } from "@src/utils/faker";

export interface GetAppointmentsUseCase {
  find: (userId: string) => Promise<Appointment[]>;
}

export class GetAppointmentsUseCaseImpl implements GetAppointmentsUseCase {
  async find(userId: string): Promise<Appointment[]> {
    const appointmentsUser = appointments.filter(
      (appointment) => appointment.userId === userId,
    );
    return appointmentsUser;
  }
}
