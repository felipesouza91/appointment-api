export type Appointment = {
  id: string;
  scheduledAt: Date;
  clientName: string;
  clientPhone: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
};
