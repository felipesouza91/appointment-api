import type { Appointment } from "@src/domain/models/appointment";

export type CreateAppointmentInput = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt" | "store"
> & {
  storeId: string;
};

export type FindAppointmentWithFilter = {
  [filterName: string]: any;
};

export interface AppointmentRepository {
  create(input: CreateAppointmentInput): Promise<Appointment>;

  findByScheduledAtAndStoreId(
    date: Date,
    storeId: string,
  ): Promise<Appointment | undefined>;

  findByUserId(userId: string): Promise<Appointment[]>;

  findWitFilter(filter: FindAppointmentWithFilter): Promise<Appointment[]>;

  findByStoreIdAndDate(storeId: string, date: Date): Promise<Appointment[]>;
}
