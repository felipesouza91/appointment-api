import type { Appointment } from "@src/domain/models/appointment";
import type { AppointmentRepository } from "@src/domain/repository/appointment-repository";
import type { ContainerInjection } from "@src/infra/cdi/cdi-config";

export type GetAppointmentsUseCaseFilter = {
  userId: string;
  storeId?: string;
  date: Date;
};

export interface GetAppointmentsUseCase {
  find: (data: GetAppointmentsUseCaseFilter) => Promise<Appointment[]>;
}

type GetAppointmentsUseCaseImplProps = {
  appointmentRepository: AppointmentRepository;
};

export class GetAppointmentsUseCaseImpl implements ContainerInjection {
  private appointmentRepository: AppointmentRepository;

  constructor({ appointmentRepository }: GetAppointmentsUseCaseImplProps) {
    this.appointmentRepository = appointmentRepository;
  }

  async find({
    date,
    userId,
    storeId,
  }: GetAppointmentsUseCaseFilter): Promise<Appointment[]> {
    const appointmentsUser = await this.appointmentRepository.findWitFilter({
      date,
      userId,
      storeId,
    });
    return appointmentsUser;
  }

  dispose() {}
}
