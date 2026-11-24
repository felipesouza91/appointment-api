import { UTCDate } from "@date-fns/utc";
import { BusinessError } from "@src/domain/errors/business-error";
import { EntityNotFound } from "@src/domain/errors/entity-not-found";
import type { Appointment } from "@src/domain/models/appointment";
import type { AppointmentRepository } from "@src/domain/repository/appointment-repository";
import type { StoreRepository } from "@src/domain/repository/store-repository";
import {
  eachMinuteOfInterval,
  format,
  isBefore,
  isEqual,
  parse,
} from "date-fns";

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
    const inputUTC = new UTCDate(input.scheduledAt);

    if (isBefore(inputUTC, new UTCDate())) {
      throw new BusinessError("Scheduled date don't allow past dates");
    }

    const existsStore = await this.storeRepository.findByIdAndEnabled(
      input.storeId,
    );

    if (!existsStore) {
      throw new EntityNotFound("Store not found");
    }

    const dayOfWeek = format(inputUTC, "EEEE").toUpperCase();

    const times = existsStore.configurations?.filter(
      (item) => item.day.toString() === dayOfWeek,
    );

    const exitsConfig = times
      ?.flatMap((item) => {
        const startDate = parse(item.startHour, "HH:mm", inputUTC);
        const endDate = parse(item.endHour, "HH:mm", inputUTC);
        return eachMinuteOfInterval(
          { start: startDate, end: endDate },
          { step: existsStore.scheduleDuration },
        );
      })
      .some((data) => {
        console.log(data);
        return isEqual(data, inputUTC);
      });

    if (!exitsConfig) {
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
