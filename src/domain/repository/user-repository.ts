import type { User } from "@src/domain/models/user";

export type CreateUserInput = Omit<User, "id" | "createdAt">;

export interface UserRepository {
  create: (input: CreateUserInput) => Promise<User>;

  findUserByEmailOrPhone: (
    email: string,
    phone: string,
  ) => Promise<User | undefined>;

  findyByEmail(email: string): Promise<User | undefined>;

  findById(id: string): Promise<User | undefined>;
}
