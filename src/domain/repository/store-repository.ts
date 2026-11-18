import type { Store, StoreDayConfig } from "../models/store";

type StoreDayConfigInput = Omit<StoreDayConfig, "id">;

export type StoreInputDb = Omit<
  Store,
  "id" | "createdAt" | "updatedAt" | "configuration"
> & {
  configuration: StoreDayConfigInput[];
};

export interface StoreRepository {
  create(input: StoreInputDb): Promise<Store>;
  findByNameAndUserId(name: string, userId: string): Promise<Store | undefined>;
  findByIdAndEnabled(id: string): Promise<Store | undefined>;
  findByOwnerId(ownerId: string): Promise<Store[]>;
}
