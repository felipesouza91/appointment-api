import type { User } from "@src/domain/models/user";
import type {
  CreateUserInput,
  UserRepository,
} from "@src/domain/repository/user-repository";
import { eq, or } from "drizzle-orm";
import db from "../connection";
import { DbError } from "../errors/db-erro";
import { users } from "../schema";

export class UserRespositoryImpl implements UserRepository {
  async create(input: CreateUserInput): Promise<User> {
    try {
      const [user] = await db
        .insert(users)
        .values({ ...input })
        .returning();
      if (!user) {
        throw new DbError("Error durring create user");
      }
      return user;
    } catch (error) {
      console.warn(error);
      throw new DbError("Error durring create user");
    }
  }

  async findUserByEmailOrPhone(
    email: string,
    phone: string,
  ): Promise<User | undefined> {
    try {
      const [userExists] = await db
        .select()
        .from(users)
        .where(or(eq(users.email, email), eq(users.phone, phone)));
      return userExists;
    } catch (error) {
      console.warn(error);
      throw new DbError("Error durring create user");
    }
  }

  async findyByEmail(email: string): Promise<User | undefined> {
    try {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      return user;
    } catch (error) {
      console.warn(error);
      throw new DbError("Error durring create user");
    }
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.warn(error);
      throw new DbError("Error durring create user");
    }
  }
}
