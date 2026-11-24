export enum DayEnum {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

export type StorePeriod = {
  date: Date;
  available: boolean;
};

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
  configurations?: StoreDayConfig[];
  ownerId: string;
  createdAt: Date;
  updatedAt: Date | null;
};
