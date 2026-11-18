import type { Store } from "@src/domain/models/store";
import type {
  StoreInputDb,
  StoreRepository,
} from "@src/domain/repository/store-repository";
import { and, eq, type InferSelectModel } from "drizzle-orm";
import db from "../connection";
import { DbError } from "../errors/db-erro";
import { storeConfigurations } from "../schema";
import { stores } from "../schema/store";

export class StoreRepositoryImpl implements StoreRepository {
  async create(input: StoreInputDb): Promise<Store> {
    const { configuration, ...rest } = input;
    const result: Store = await db.transaction(async (tx) => {
      try {
        const [store] = await tx.insert(stores).values(rest).returning();
        if (!store) {
          throw new DbError("Error durring create user");
        }

        let savedConfig: InferSelectModel<typeof storeConfigurations>[] = [];
        if (configuration) {
          const formatedInput = configuration.map((config) => ({
            ...config,
            storeId: store.id,
          }));

          savedConfig = await tx
            .insert(storeConfigurations)
            .values(formatedInput)
            .returning();
        }

        return {
          ...store,
          configuration: savedConfig.map((item) => ({
            id: item.id,
            day: item.day,
            startHour: item.startHour,
            endHour: item.endHour,
          })),
        };
      } catch (error) {
        tx.rollback();
        throw new DbError("Error durring create store", { cause: error });
      }
    });
    return result;
  }

  async findByNameAndUserId(
    name: string,
    userId: string,
  ): Promise<Store | undefined> {
    const [result] = await db
      .select()
      .from(stores)
      .where(and(eq(stores.name, name), eq(stores.ownerId, userId)));
    return result ? { ...result, configuration: [] } : undefined;
  }

  async findByIdAndEnabled(id: string): Promise<Store | undefined> {
    const result = await db.query.stores.findFirst({
      where: (field, { and, eq }) =>
        and(eq(stores.id, id), eq(stores.enabled, true)),
      with: {
        configurations: true,
      },
    });
    return result;
  }

  async findByOwnerId(ownerId: string): Promise<Store[]> {
    const result = await db.query.stores.findMany({
      where: (feild, { eq }) => eq(feild.ownerId, ownerId),
      with: {
        configurations: true,
      },
    });
    return result;
  }
}
