import { defineRelations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user";

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientName: varchar("client_name", { length: 200 }).notNull(),
  clientPhone: varchar("client_phone", { length: 150 }).notNull(),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "no action" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const appointmentRelation = defineRelations(
  { appointments, users },
  (relation) => {
    return {
      appointments: {
        user: relation.one.users({
          from: relation.appointments.userId,
          to: relation.users.id,
        }),
      },
    };
  },
);
