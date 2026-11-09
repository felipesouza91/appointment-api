import { faker } from "@faker-js/faker";

const users = (function generateUsers() {
  return Array.from({ length: 1 }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
  }));
})();

const appointments = (function generateAppointments() {
  return Array.from({ length: 5 }).map((item) => ({
    id: faker.string.uuid(),
    clientName: faker.person.fullName(),
    scheduledDate: faker.date.anytime(),
    userId: faker.helpers.arrayElement(users).id,
    createdAt: faker.date.anytime(),
  }));
})();

export { appointments, users };
