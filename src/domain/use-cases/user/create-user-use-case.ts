import type { User } from "@src/domain/models/user";
import type { UserRepository } from "@src/domain/repository/users/user-repository";

interface CreateUserUseCaseProps {
  userRepository: UserRepository;
}

export type CreateUserInput = Omit<User, "id" | "createdAt">;

export class CreateUserUseCase {
  private readonly useRepository: UserRepository;
  constructor({ userRepository }: CreateUserUseCaseProps) {
    this.useRepository = userRepository;
  }

  async create(input: CreateUserInput) {
    const userExists = await this.useRepository.findUserByEmailOrPhone(
      input.email,
      input.phone,
    );
    if (userExists) {
      throw new Error("Email alread exists");
    }
    await this.useRepository.create(input);
  }
}
