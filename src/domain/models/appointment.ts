import type { Store } from "./store";

export type Appointment = {
  id: string;
  scheduledAt: Date;
  clientName: string;
  clientPhone: string;
  store: Store;
  createdAt: Date;
  updatedAt: Date | null;
};
