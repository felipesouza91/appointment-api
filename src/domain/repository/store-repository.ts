import type { Store } from "../models/store";

type StoreInput = Omit<Store, "id" | "createdAt" | "updatedAt">;

export interface StoreRepository {
  create(input: StoreInput): Promise<Store>;
  findByNameAndUserId(name: string, userId: string): Promise<Store | undefined>;
}
