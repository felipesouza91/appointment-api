import { DayEnum } from "@src/domain/models/store";
import { relations } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { stores } from "./store";

function enumToPgEnum<T extends object>(
  myEnum: T,
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum) as [T[keyof T], ...T[keyof T][]];
}

export const daysEnum = pgEnum("day_enum", enumToPgEnum(DayEnum));

export const storeConfigurations = pgTable("store_configurations", {
  id: uuid("id").primaryKey().defaultRandom(),
  day: daysEnum("day_enum").notNull(),
  startHour: varchar("start_hour").notNull(),
  endHour: varchar("end_hour").notNull(),
  storeId: uuid("store_id")
    .notNull()
    .references(() => stores.id, {
      onDelete: "no action",
      onUpdate: "cascade",
    }),
});

export const storeConfigurationsRelations = relations(
  storeConfigurations,
  ({ one }) => {
    return {
      store: one(stores, {
        fields: [storeConfigurations.storeId],
        references: [stores.id],
        relationName: "store_configuration_store",
      }),
    };
  },
);
