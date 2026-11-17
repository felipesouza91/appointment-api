import type { Store, StoreDayConfig } from "../models/store";

type StoreDayConfigInput = Omit<StoreDayConfig, "id">;

type StoreInput = Omit<
  Store,
  "id" | "createdAt" | "updatedAt" | "configuration"
> & {
  configuration: StoreDayConfigInput[];
};

export interface StoreRepository {
  create(input: StoreInput): Promise<Store>;
  findByNameAndUserId(name: string, userId: string): Promise<Store | undefined>;
  findByIdAndEnabled(id: string): Promise<Store | undefined>;
}
