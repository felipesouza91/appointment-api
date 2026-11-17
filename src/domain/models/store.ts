export enum DayEnum {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

export type StoreDayConfig = {
  id: string;
  day: DayEnum;
  startHour: string;
  endHour: string;
};

export type Store = {
  id: string;
  name: string;
  description: string;
  address: string;
  scheduleDuration: number;
  configuration?: StoreDayConfig[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date | null;
};
