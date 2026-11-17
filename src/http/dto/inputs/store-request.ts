import { UTCDate } from "@date-fns/utc";
import { DayEnum } from "@src/domain/models/store";
import { addHours, addMinutes, isAfter } from "date-fns";
import z from "zod";

function convertTimeToNumber(time: string) {
  return time.split(":").map((value) => {
    if (value.length === 0) {
      return null;
    }
    return Number(value);
  });
}

function validHoursAndMinutes(val: string) {
  const [hour, minutes] = convertTimeToNumber(val);
  if ((!hour && hour === null) || !(hour! >= 0 && hour! <= 23)) {
    return false;
  }
  if ((!minutes && minutes === null) || !(minutes! >= 0 && minutes! <= 59)) {
    return false;
  }
  return true;
}

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
  configuration: z.array(daysConfig),
});
