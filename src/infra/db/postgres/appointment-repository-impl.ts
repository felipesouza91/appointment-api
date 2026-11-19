import type { Appointment } from "@src/domain/models/appointment";
import type { Store } from "@src/domain/models/store";
import type {
  AppointmentRepository,
  CreateAppointmentInput,
} from "@src/domain/repository/appointment-repository";
import { endOfDay, startOfDay } from "date-fns";
import { and, between, eq } from "drizzle-orm";
import db from "../connection";
import { DbError } from "../errors/db-erro";
import { appointments, stores } from "../schema";

export class AppointmentRepositoryImpl implements AppointmentRepository {
  async create(input: CreateAppointmentInput): Promise<Appointment> {
    try {
      const [appointment] = await db
        .insert(appointments)
        .values({ ...input })
        .returning();
      if (!appointment) {
        throw new DbError("Error durring create appointment");
      }
      return { ...appointment, store: { id: input.storeId } as Store };
    } catch (error) {
      console.warn(error);
      throw new DbError("Error durring create appointment", { cause: error });
    }
  }

  async findByScheduledAtAndStoreId(
    date: Date,
    storeId: string,
  ): Promise<Appointment | undefined> {
    const [result] = await db
      .select()
      .from(appointments)
      .leftJoin(stores, eq(stores.id, appointments.storeId))
      .where(
        and(
          eq(appointments.scheduledAt, date),
          eq(appointments.storeId, storeId),
        ),
      );
    return result
      ? { ...result?.appointments, store: result.store! }
      : undefined;
  }

  async findByUserId(userId: string): Promise<Appointment[]> {
    try {
      const result = await db
        .select()
        .from(appointments)
        .leftJoin(stores, eq(stores.id, appointments.storeId))
        .where(eq(stores.ownerId, userId));
      return result.map((item) => ({
        ...item.appointments,
        store: item.store!,
      }));
    } catch (error) {
      console.log(error);
      throw new DbError("Erro durring find data", { cause: error });
    }
  }

  async findByStoreIdAndDate(
    storeId: string,
    date: Date,
  ): Promise<Appointment[]> {
    const result = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.storeId, storeId),
          between(appointments.scheduledAt, startOfDay(date), endOfDay(date)),
        ),
      );
    return result.map(({ storeId, ...data }) => ({
      ...data,
      store: { id: storeId } as Store,
    }));
  }
}
