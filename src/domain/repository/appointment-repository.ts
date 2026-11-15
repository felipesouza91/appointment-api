import type { Appointment } from "@src/domain/models/appointment";

export type CreateAppointmentInput = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt"
>;

export interface AppointmentRepository {
  create(input: CreateAppointmentInput): Promise<Appointment>;

  findByScheduledAtAndUserId(
    date: Date,
    userId: string,
  ): Promise<Appointment | undefined>;

  findByUserId(userId: string): Promise<Appointment[]>;
}
