import type { Store } from "@src/domain/models/store";
import type { StoreRepository } from "@src/domain/repository/store-repository";

export interface GetStoreUseCase {
  find(userId: string): Promise<Store[]>;
}

interface GetStoreUseCaseImplProps {
  storeRepository: StoreRepository;
}

export class GetStoreUseCaseImpl implements GetStoreUseCase {
  private storeRepository: StoreRepository;

  constructor({ storeRepository }: GetStoreUseCaseImplProps) {
    this.storeRepository = storeRepository;
  }

  async find(userId: string): Promise<Store[]> {
    const result = await this.storeRepository.findByOwnerId(userId);
    return result;
  }
}
