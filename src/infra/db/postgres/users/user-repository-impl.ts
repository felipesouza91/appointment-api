import type { User } from "@src/domain/models/user";
import type {
  CreateUserInput,
  UserRepository,
} from "@src/domain/repository/users/user-repository";
import { eq, or } from "drizzle-orm";
import db from "../../connection";
import { users } from "../../schema";

export class UserRespositoryImpl implements UserRepository {
  async create(input: CreateUserInput): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({ ...input })
      .returning();
    if (!user) {
      throw new Error("Error durring create user");
    }
    return user;
  }

  async findUserByEmailOrPhone(
    email: string,
    phone: string,
  ): Promise<User | undefined> {
    const [userExists] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.phone, phone)));
    return userExists;
  }
}
