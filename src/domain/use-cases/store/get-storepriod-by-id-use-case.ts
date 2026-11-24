import { UTCDate } from "@date-fns/utc";
import { EntityNotFound } from "@src/domain/errors/entity-not-found";
import type { StorePeriod } from "@src/domain/models/store";
import type { AppointmentRepository } from "@src/domain/repository/appointment-repository";
import type { StoreRepository } from "@src/domain/repository/store-repository";
import {
  eachMinuteOfInterval,
  format,
  isBefore,
  isEqual,
  parse,
} from "date-fns";

export interface GetStorePeriodByIdUseCase {
  find(storeId: string, date: Date): Promise<StorePeriod[]>;
}

interface GetStorePeriodByIdUseCaseImplProps {
  storeRepository: StoreRepository;
  appointmentRepository: AppointmentRepository;
}

export class GetStorePeriodByIdUseCaseImpl implements GetStorePeriodByIdUseCase {
  private storeRepository: StoreRepository;
  private appointmentRepository: AppointmentRepository;
  constructor({
    storeRepository,
    appointmentRepository,
  }: GetStorePeriodByIdUseCaseImplProps) {
    this.storeRepository = storeRepository;
    this.appointmentRepository = appointmentRepository;
  }

  async find(storeId: string, date: Date): Promise<StorePeriod[]> {
    const existsStore = await this.storeRepository.findByIdAndEnabled(storeId);
    if (!existsStore) {
      throw new EntityNotFound("Store not found");
    }

    const inputUTC = new UTCDate(date);

    const dayOfWeek = format(inputUTC, "EEEE").toUpperCase();

    const times = existsStore.configurations?.filter(
      (item) => item.day.toString() === dayOfWeek,
    );

    const appointments = await this.appointmentRepository.findByStoreIdAndDate(
      storeId,
      inputUTC,
    );

    console.log(times);

    const periods: StorePeriod[] = times!
      .flatMap((item) => {
        const startDate = parse(item.startHour, "HH:mm", inputUTC);
        const endDate = parse(item.endHour, "HH:mm", inputUTC);
        return eachMinuteOfInterval(
          { start: startDate, end: endDate },
          { step: existsStore.scheduleDuration },
        );
      })
      .map((date) => {
        const isScheduled = appointments.some((appointment) =>
          isEqual(appointment.scheduledAt, date),
        );
        console.log("date" + date);
        console.log("new UTCDate() " + new UTCDate());
        console.log("isScheduled " + isScheduled);

        console.log("isBefore " + isBefore(date, new UTCDate()));
        return {
          date,
          available: !isScheduled && !isBefore(date, new UTCDate()),
        };
      });

    return periods;
  }
}
