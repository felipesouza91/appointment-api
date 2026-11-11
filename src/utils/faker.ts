import { faker } from "@faker-js/faker";
import type { Appointment } from "../domain/models/appointment";

const users = (function generateUsers() {
  return Array.from({ length: 1 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
  }));
})();

const appointments = (function generateAppointments(): Appointment[] {
  return Array.from({ length: 5 }).map((item) => {
    return {
      id: faker.string.uuid(),
      clientName: faker.person.fullName(),
      clientPhone: faker.phone.number(),
      createdAt: faker.date.recent(),
      scheduledAt: faker.date.recent(),
      userId: faker.helpers.arrayElement(users).id,
    };
  });
})();

export { appointments, users };
