import type { Appointment } from "@src/domain/models/appointment";
import type { AppointmentRepository } from "@src/domain/repository/appointment-repository";
import type { ContainerInjection } from "@src/infra/cdi/cdi-config";

export interface GetAppointmentsUseCase {
  find: (userId: string) => Promise<Appointment[]>;
}

type GetAppointmentsUseCaseImplProps = {
  appointmentRepository: AppointmentRepository;
};

export class GetAppointmentsUseCaseImpl implements ContainerInjection {
  private appointmentRepository: AppointmentRepository;

  constructor({ appointmentRepository }: GetAppointmentsUseCaseImplProps) {
    this.appointmentRepository = appointmentRepository;
  }

  async find(userId: string): Promise<Appointment[]> {
    const appointmentsUser =
      await this.appointmentRepository.findByUserId(userId);
    return appointmentsUser;
  }

  dispose() {}
}
