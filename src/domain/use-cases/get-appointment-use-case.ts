import { appointments } from "../../utils/faker";
import type { Appointment } from "../models/appointment";

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
