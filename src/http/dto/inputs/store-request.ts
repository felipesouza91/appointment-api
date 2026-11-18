import { UTCDate } from "@date-fns/utc";
import { DayEnum } from "@src/domain/models/store";
import {
  convertTimeToNumber,
  validHoursAndMinutes,
} from "@src/utils/date-util";
import { addHours, addMinutes, isAfter } from "date-fns";
import z from "zod";

export const daysConfig = z
  .object({
    day: z.enum(DayEnum),
    startHour: z.string().refine(validHoursAndMinutes, {
      error: "Invalid hour format. Correct format is HH:mm",
    }),
    endHour: z.string().refine(validHoursAndMinutes, {
      error: "Invalid hour format. Correct format is HH:mm",
    }),
  })
  .refine(
    (data) => {
      const [startHour, startMinutes] = convertTimeToNumber(data.startHour);
      const [endHour, endMinutes] = convertTimeToNumber(data.endHour);

      const startDate = addHours(
        addMinutes(new UTCDate(), startMinutes!),
        startHour!,
      );
      const endDate = addHours(
        addMinutes(new UTCDate(), endMinutes!),
        endHour!,
      );
      return !isAfter(startDate, endDate);
    },
    {
      error: "Start time need to be before end time",
    },
  );

export const createStoreRequest = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  scheduleDuration: z.number(),
  configurations: z.array(daysConfig),
});
