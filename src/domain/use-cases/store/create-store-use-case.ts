import { BusinessError } from "@src/domain/errors/business-error";
import type { Store } from "@src/domain/models/store";
import type { StoreRepository } from "@src/domain/repository/store-repository";

export type StoreInput = Omit<
  Store,
  "id" | "createdAt" | "updatedAt" | "ownerId"
>;

export interface CreateStoreUseCase {
  create: (data: StoreInput, userId: string) => Promise<Store>;
}

export interface CreateStroreUseCaseImplProps {
  storeRepository: StoreRepository;
}

export class CreateStoreUseCaseImpl implements CreateStoreUseCase {
  private storeRepository: StoreRepository;

  constructor({ storeRepository }: CreateStroreUseCaseImplProps) {
    this.storeRepository = storeRepository;
  }

  async create(data: StoreInput, userId: string): Promise<Store> {
    const storeNameExists = await this.storeRepository.findByNameAndUserId(
      data.name,
      userId,
    );

    if (storeNameExists) {
      throw new BusinessError("Already exists a store with this name");
    }

    const store = await this.storeRepository.create({
      ...data,
      ownerId: userId,
    });
    return store;
  }
}
