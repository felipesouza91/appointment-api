import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { storeConfigurations } from "./store-configuration";
import { users } from "./user";

export const stores = pgTable("store", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull().unique(),
  description: varchar("description", { length: 150 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  scheduleDuration: integer("schedule_duration").notNull(),
  enabled: boolean("enabled").notNull().default(true),
  ownerId: uuid("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "no action" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const storesRelations = relations(stores, ({ many }) => {
  return {
    configurations: many(storeConfigurations),
  };
});
