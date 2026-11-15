import type { Appointment } from "@src/domain/models/appointment";
import type {
  AppointmentRepository,
  CreateAppointmentInput,
} from "@src/domain/repository/appointment-repository";
import { and, eq } from "drizzle-orm";
import db from "../connection";
import { DbError } from "../errors/db-erro";
import { appointments } from "../schema";

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
      return appointment;
    } catch (error) {
      console.warn(error);
      throw new DbError("Error durring create appointment", { cause: error });
    }
  }
  async findByScheduledAtAndUserId(
    date: Date,
    userId: string,
  ): Promise<Appointment | undefined> {
    const [appointment] = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.scheduledAt, date),
          eq(appointments.userId, userId),
        ),
      );
    return appointment;
  }
}
