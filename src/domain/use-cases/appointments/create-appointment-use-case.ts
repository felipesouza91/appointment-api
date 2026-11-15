import { BusinessError } from "@src/domain/errors/business-error";
import { EntityNotFound } from "@src/domain/errors/entity-not-found";
import type { Appointment } from "@src/domain/models/appointment";
import type { AppointmentRepository } from "@src/domain/repository/appointment-repository";
import type { UserRepository } from "@src/domain/repository/users/user-repository";

export type CreateAppointmentInput = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt"
>;

type ç = {
  appointmentRepository: AppointmentRepository;
  userRepository: UserRepository;
};

export interface CreateAppointmentUseCase {
  create(input: CreateAppointmentInput): Promise<Appointment>;
}

export class CreateAppointmentImpl implements CreateAppointmentUseCase {
  private userRepository: UserRepository;
  private appointmentRepository: AppointmentRepository;

  constructor({
    appointmentRepository,
    userRepository,
  }: CreateAppointmentImpl) {
    this.appointmentRepository = appointmentRepository;
    this.userRepository = userRepository;
  }

  async create(input: CreateAppointmentInput): Promise<Appointment> {
    const existsUser = await this.userRepository.findById(input.userId);
    if (!existsUser) {
      throw new EntityNotFound("User not found");
    }
    const existsScheduledAt =
      await this.appointmentRepository.findByScheduledAtAndUserId(
        input.scheduledAt,
        input.userId,
      );
    if (existsScheduledAt) {
      throw new BusinessError("Already exists an appointments for this date");
    }
    const appoint = await this.appointmentRepository.create(input);
    return appoint;
  }
}
