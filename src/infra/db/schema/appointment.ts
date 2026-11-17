import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { stores } from "./store";

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientName: varchar("client_name", { length: 200 }).notNull(),
  clientPhone: varchar("client_phone", { length: 150 }).notNull(),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "no action" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const appointmentRelation = relations(appointments, ({ one }) => {
  return {
    user: one(stores, {
      fields: [appointments.storeId],
      references: [stores.id],
    }),
  };
});
