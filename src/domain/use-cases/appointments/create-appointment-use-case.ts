import { UTCDate } from "@date-fns/utc";
import { BusinessError } from "@src/domain/errors/business-error";
import { EntityNotFound } from "@src/domain/errors/entity-not-found";
import type { Appointment } from "@src/domain/models/appointment";
import type { AppointmentRepository } from "@src/domain/repository/appointment-repository";
import type { StoreRepository } from "@src/domain/repository/store-repository";
import { format, isAfter, isBefore, isEqual, parse } from "date-fns";

export type CreateAppointmentInput = Omit<
  Appointment,
  "id" | "createdAt" | "updatedAt" | "store"
> & {
  storeId: string;
};

type CreateAppointmentProps = {
  appointmentRepository: AppointmentRepository;
  storeRepository: StoreRepository;
};

export interface CreateAppointmentUseCase {
  create(input: CreateAppointmentInput): Promise<Appointment>;
}

export class CreateAppointmentImpl implements CreateAppointmentUseCase {
  private storeRepository: StoreRepository;
  private appointmentRepository: AppointmentRepository;

  constructor({
    appointmentRepository,
    storeRepository,
  }: CreateAppointmentProps) {
    this.appointmentRepository = appointmentRepository;
    this.storeRepository = storeRepository;
  }

  async create(input: CreateAppointmentInput): Promise<Appointment> {
    const currentDate = new UTCDate();
    const existsStore = await this.storeRepository.findByIdAndEnabled(
      input.storeId,
    );
    if (!existsStore) {
      throw new EntityNotFound("Store not found");
    }
    const inputUTC = new UTCDate(input.scheduledAt);
    const dayOfWeek = format(inputUTC, "EEEE").toUpperCase();

    const exitsConfig = existsStore.configurations?.filter((item) => {
      const startDate = parse(item.startHour, "HH:mm", currentDate);
      const endDate = parse(item.endHour, "HH:mm", currentDate);
      return (
        item.day.toString() === dayOfWeek &&
        (isEqual(inputUTC, startDate) || isAfter(inputUTC, startDate)) &&
        isBefore(inputUTC, endDate)
      );
    });

    if (!exitsConfig || exitsConfig.length === 0) {
      throw new BusinessError("Scheduled at period is not valid");
    }

    const existsScheduledAt =
      await this.appointmentRepository.findByScheduledAtAndStoreId(
        input.scheduledAt,
        input.storeId,
      );
    if (existsScheduledAt) {
      throw new BusinessError("Already exists an appointments for this date");
    }

    const appoint = await this.appointmentRepository.create(input);
    return appoint;
  }
}
