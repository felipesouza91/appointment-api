import { InvalidUserPassword } from "@src/domain/errors/invalid-user-password";
import type { User } from "@src/domain/models/user";
import type { Cryptography } from "@src/domain/protocols/cryptography";
import type { UserRepository } from "@src/domain/repository/users/user-repository";

interface CreateUserUseCaseProps {
  userRepository: UserRepository;
  crypto: Cryptography;
}

export type CreateUserInput = Omit<User, "id" | "createdAt">;

export class CreateUserUseCase {
  private readonly useRepository: UserRepository;
  private crypto: Cryptography;

  constructor({ userRepository, crypto }: CreateUserUseCaseProps) {
    this.useRepository = userRepository;
    this.crypto = crypto;
  }

  async create(input: CreateUserInput) {
    const userExists = await this.useRepository.findUserByEmailOrPhone(
      input.email,
      input.phone,
    );
    if (userExists) {
      throw new InvalidUserPassword("Email/phone alread exists");
    }
    const encodedPassword = await this.crypto.encrypt(input.password);
    await this.useRepository.create({ ...input, password: encodedPassword });
  }
}
